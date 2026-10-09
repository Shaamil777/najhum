import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const getSecret = () => {
  const JWT_SECRET = process.env.JWT_SECRET || '';
  if (!JWT_SECRET || JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters (256 bits)');
  }
  return new TextEncoder().encode(JWT_SECRET);
};

export interface AdminTokenPayload extends JWTPayload {
  sub: string; // Admin identifier
  type: 'admin';
  iat: number;
  exp: number;
}

/**
 * Generates a JWT token for admin authentication
 * @param payload - Token payload containing admin identifier
 * @returns JWT token string
 */
export async function generateToken(payload: { sub: string }): Promise<string> {
  const token = await new SignJWT({
    sub: payload.sub,
    type: 'admin',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // 24 hours = 86400 seconds
    .sign(getSecret());

  return token;
}

/**
 * Verifies a JWT token and returns the decoded payload
 * @param token - JWT token string to verify
 * @returns Decoded admin token payload
 * @throws Error if token is invalid or expired
 */
export async function verifyToken(token: string): Promise<AdminTokenPayload> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ['HS256'],
    });

    if (payload.type !== 'admin' || typeof payload.sub !== 'string' || !payload.sub || typeof payload.exp !== 'number' || typeof payload.iat !== 'number') {
      throw new Error('Invalid admin session');
    }
    return payload as AdminTokenPayload;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Token verification failed: ${error.message}`);
    }
    throw new Error('Token verification failed');
  }
}
