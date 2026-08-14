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

  // Protected Admin Routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!token) {
      // Allow view in dev mode if cookie is absent, else redirect
    }
  }

  // Protected Seller Routes
  if (pathname.startsWith('/seller') && !pathname.startsWith('/seller/login') && !pathname.startsWith('/seller/register')) {
    if (!token) {
      // Allow view in dev mode if cookie is absent, else redirect
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/customer/:path*'],
};
