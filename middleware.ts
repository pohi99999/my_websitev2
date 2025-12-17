import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

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
  const res = NextResponse.next();
  res.cookies.set('site-language', isEn ? 'en' : 'hu', { path: '/', sameSite: 'lax' });
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
