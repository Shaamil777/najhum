import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      // Allow access to login page
      return addSecurityHeaders(NextResponse.next());
    }

    // Check for JWT token in cookie
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // Redirect to login if no token present
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify token
      await verifyToken(token);
      // Token is valid, allow request to proceed
      return addSecurityHeaders(NextResponse.next());
    } catch (error) {
      // Token is invalid or expired, redirect to login
      console.log('[MIDDLEWARE] Token verification failed:', error);
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      // Clear the invalid token
      response.cookies.delete('admin_token');
      return addSecurityHeaders(response);
    }
  }

  // For non-admin routes, just add security headers
  return addSecurityHeaders(NextResponse.next());
}

/**
 * Adds security headers to the response
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  // Prevent clickjacking attacks
  response.headers.set('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-inline and unsafe-eval
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Tailwind and Google Fonts require unsafe-inline
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  );

  return response;
}

// Configure which routes the middleware applies to
export const config = {
  matcher: [
    '/admin/:path*',
    // Match all routes for security headers, but auth check only on /admin/*
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
