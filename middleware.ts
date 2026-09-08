import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const ADMIN_PATH = "/admin/analytics";
// The analytics API routes serve the same data as the admin page; until
// 2026-09-08 they were reachable without any token (measured live: 200 on
// /api/analytics/kpi-snapshot with no cookie). They are gated here, in one
// place, with the same token: cookie (browser) or Authorization: Bearer (tools).
const ADMIN_API_PATH = "/api/analytics";
const ADMIN_COOKIE = "admin_analytics_auth";

function unauthorized(asJson: boolean) {
  return new NextResponse(asJson ? JSON.stringify({ error: "Unauthorized" }) : "Unauthorized", {
    status: 401,
    headers: {
      "content-type": asJson ? "application/json; charset=utf-8" : "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function bearerToken(req: NextRequest): string | undefined {
  const header = req.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header.trim());
  return match?.[1];
}

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

  const isAdminPage = pathname.startsWith(ADMIN_PATH);
  const isAdminApi = pathname === ADMIN_API_PATH || pathname.startsWith(`${ADMIN_API_PATH}/`);

  if (isAdminPage || isAdminApi) {
    const configuredToken = process.env.ADMIN_ANALYTICS_TOKEN;

    // Fail secure in production if no token is configured.
    if (!configuredToken && process.env.NODE_ENV === "production") {
      return unauthorized(isAdminApi);
    }

    // If token is configured, enforce it.
    if (configuredToken) {
      const cookieToken = req.cookies.get(ADMIN_COOKIE)?.value;
      const presented = cookieToken === configuredToken || (isAdminApi && bearerToken(req) === configuredToken);
      if (!presented) {
        // The ?token= login flow (redirect + cookie) is for the admin PAGE only;
        // an API client sends the token in a header, it never gets a redirect.
        const urlToken = isAdminPage ? req.nextUrl.searchParams.get("token") : null;

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

        return unauthorized(isAdminApi);
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
