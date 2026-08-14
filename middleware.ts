import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static assets and internal next routes bypass middleware checks
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('authorization');
  const cookieToken = request.cookies.get('zyvora_token')?.value;
  const token = authHeader?.replace('Bearer ', '') || cookieToken;

  let decodedRole: string | null = null;
  if (token) {
    try {
      const parsed = JSON.parse(atob(token));
      decodedRole = parsed.role || null;
    } catch {
      // Decode fallback
    }
  }

  // Protected Admin Routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (decodedRole && decodedRole !== 'ADMIN' && decodedRole !== 'SUPER_ADMIN') {
      // Return 403 Forbidden or redirect unauthorized users
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.searchParams.set('error', 'UnauthorizedAdminAccess');
      return NextResponse.redirect(url);
    }
  }

  // Protected Seller Routes
  if (pathname.startsWith('/seller') && !pathname.startsWith('/seller/login') && !pathname.startsWith('/seller/register')) {
    if (decodedRole && decodedRole === 'CUSTOMER') {
      const url = request.nextUrl.clone();
      url.pathname = '/seller/register';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/customer/:path*'],
};
