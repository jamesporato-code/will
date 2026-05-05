import { NextResponse, type NextRequest } from 'next/server';

const ADMIN_COOKIE_NAME = 'will_admin_token';

// Protege /admin/* sauf la page de login. Si pas de cookie → redirect /admin/login.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin')) return NextResponse.next();
  if (pathname === '/admin/login') return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
