// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    try {
      const response = await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
        headers: {
          Cookie: `session=${session.value}`
        }
      });

      if (!response.ok) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      const data = await response.json();
      console.log('Verify response:', data);
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  if (session && (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/signin', '/signup']
};