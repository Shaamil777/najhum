import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { requireAdmin, requireSameOrigin } from '@/lib/auth/require-admin';
import { handleApiError } from '@/lib/utils/api-error';

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/api/admin/') && pathname !== '/api/admin/auth/login') {
    try {
      await requireAdmin(request);
      if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method)) requireSameOrigin(request);
      return addSecurityHeaders(NextResponse.next());
    } catch (error) { return addSecurityHeaders(handleApiError(error)); }
  }

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
      return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
    }

    try {
      // Verify token
      await verifyToken(token);
      // Token is valid, allow request to proceed
      return addSecurityHeaders(NextResponse.next());
    } catch (error) {
      // Token is invalid or expired, redirect to login
      console.log('[MIDDLEWARE] Token verification failed:', error);
      const response = NextResponse.redirect(new URL('/admin/login', request.nextUrl));
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
  // Prevent clickjacking attacks while allowing same-origin embedding for interactive dashboard demos
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://challenges.cloudflare.com", // Allow Three.js CDNs and Cloudflare Turnstile
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Tailwind and Google Fonts require unsafe-inline
      "img-src 'self' data: https: blob:",
      "media-src 'self' https: blob:",
      "frame-src 'self' https://www.youtube-nocookie.com https://player.vimeo.com https://challenges.cloudflare.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' data: blob: https://challenges.cloudflare.com https://*.challenges.cloudflare.com https://*.cloudflare.com",
      "worker-src 'self' blob: https://challenges.cloudflare.com",
      "frame-ancestors 'self'",
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
