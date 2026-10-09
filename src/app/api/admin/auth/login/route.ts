import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth/jwt';
import { checkRateLimit, LOGIN_RATE_LIMIT } from '@/lib/auth/rate-limit';
import { loginSchema } from '@/lib/validation/auth-schemas';

/**
 * Extracts IP address from request headers
 * Checks x-forwarded-for header first (for proxied requests), falls back to connection info
 */
function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwardedFor.split(',')[0].trim();
  }
  
  // Fallback to other headers
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Default fallback
  return 'unknown';
}

/**
 * Logs authentication attempts for security monitoring
 */
function logAuthAttempt(
  timestamp: Date,
  ip: string,
  username: string,
  result: 'success' | 'failure' | 'rate-limited'
): void {
  const logEntry = {
    timestamp: timestamp.toISOString(),
    ip,
    username,
    result,
  };
  
  // In production, this should be sent to a proper logging service
  console.log('[AUTH]', JSON.stringify(logEntry));
}

export async function POST(request: NextRequest) {
  const timestamp = new Date();
  const clientIp = getClientIp(request);

  try {
    // Check rate limit
    if (!checkRateLimit(clientIp, LOGIN_RATE_LIMIT)) {
      logAuthAttempt(timestamp, clientIp, 'unknown', 'rate-limited');
      return NextResponse.json(
        { error: 'Too many login attempts. Try again in 15 minutes.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { username, password } = validation.data;

    // Validate credentials against environment variables
    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validUsername || !validPassword) {
      console.error('[AUTH] ADMIN_USERNAME or ADMIN_PASSWORD not configured');
      return NextResponse.json(
        { error: 'Authentication service not configured' },
        { status: 500 }
      );
    }

    // Check credentials
    if (username !== validUsername || password !== validPassword) {
      logAuthAttempt(timestamp, clientIp, username, 'failure');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await generateToken({ sub: username });
    
    // Calculate expiration timestamp (24 hours from now)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    logAuthAttempt(timestamp, clientIp, username, 'success');

    const response = NextResponse.json(
      {
        expiresAt,
      },
      { status: 200 }
    );
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: request.nextUrl.protocol === 'https:',
      sameSite: 'strict',
      path: '/',
      maxAge: 24 * 60 * 60,
    });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    console.error('[AUTH] Login error:', error);
    logAuthAttempt(timestamp, clientIp, 'unknown', 'failure');
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
