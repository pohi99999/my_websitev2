import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const ADMIN_PATH = "/admin/analytics";
const ADMIN_COOKIE = "admin_analytics_auth";

function isBypassedPath(pathname: string) {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap') ||
    PUBLIC_FILE.test(pathname)
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith(ADMIN_PATH)) {
    const configuredToken = process.env.ADMIN_ANALYTICS_TOKEN;

    // If no token is configured, keep route open (safe for local/dev).
    if (configuredToken) {
      const cookieToken = req.cookies.get(ADMIN_COOKIE)?.value;
      if (cookieToken !== configuredToken) {
        const urlToken = req.nextUrl.searchParams.get("token");

        if (urlToken === configuredToken) {
          const cleanUrl = req.nextUrl.clone();
          cleanUrl.searchParams.delete("token");

          const response = NextResponse.redirect(cleanUrl);
          response.cookies.set(ADMIN_COOKIE, configuredToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 8,
          });
          return response;
        }

        return new NextResponse("Unauthorized", {
          status: 401,
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "no-store",
          },
        });
      }
    }
  }

  if (isBypassedPath(pathname)) return NextResponse.next();

  // Optional /hu prefix: redirect to canonical HU (no prefix)
  if (pathname === '/hu' || pathname.startsWith('/hu/')) {
    const targetPath = pathname === '/hu' ? '/' : pathname.replace(/^\/hu/, '') || '/';
    const url = req.nextUrl.clone();
    url.pathname = targetPath;

    const res = NextResponse.redirect(url, 308);
    res.cookies.set('site-language', 'hu', { path: '/', sameSite: 'lax' });
    return res;
  }

  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  const isDe = pathname === '/de' || pathname.startsWith('/de/');
  const lang = isEn ? 'en' : isDe ? 'de' : 'hu';
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-site-language', lang);

  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  res.cookies.set('site-language', lang, { path: '/', sameSite: 'lax' });
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
