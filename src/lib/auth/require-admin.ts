import type { NextRequest } from 'next/server';
import { verifyToken } from './jwt';
import { apiErrors } from '@/lib/utils/api-error';

export async function requireAdmin(request: NextRequest) {
  const header = request.headers.get('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : request.cookies.get('admin_token')?.value;
  if (!token) throw apiErrors.unauthorized();
  try { return await verifyToken(token); }
  catch { throw apiErrors.unauthorized('Your session has expired. Sign in again.'); }
}

export function requireSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return;
  // Next may reconstruct nextUrl with an internal hostname behind a proxy or in dev.
  // The browser's public origin must match the incoming Host and forwarded protocol.
  const host = request.headers.get('host') || request.nextUrl.host;
  const protocol = request.headers.get('x-forwarded-proto')?.split(',')[0].trim() || request.nextUrl.protocol.replace(':', '');
  if (origin !== `${protocol}://${host}`) throw apiErrors.forbidden('Cross-origin admin writes are not allowed.');
}
