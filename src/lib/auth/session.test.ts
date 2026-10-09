import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { SignJWT } from 'jose';

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv('JWT_SECRET', 'test-secret'.repeat(4));
  vi.stubEnv('ADMIN_USERNAME', 'test-admin');
  vi.stubEnv('ADMIN_PASSWORD', 'test-password');
  vi.spyOn(console, 'log').mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

const loginRequest = (password = 'test-password') => new NextRequest('https://example.test/api/admin/auth/login', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'test-admin', password }),
});

it('sets a secure HttpOnly cookie and does not expose the JWT in JSON', async () => {
  const { POST } = await import('@/app/api/admin/auth/login/route');
  const response = await POST(loginRequest());
  expect(response.status).toBe(200);
  const cookie = response.cookies.get('admin_token');
  expect(cookie).toMatchObject({ httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 86400 });
  expect(await response.json()).not.toHaveProperty('token');
  const { verifyToken } = await import('./jwt');
  expect(await verifyToken(cookie!.value)).toMatchObject({ sub: 'test-admin', type: 'admin' });
});
it('rejects incorrect credentials without granting a session', async () => {
  const { POST } = await import('@/app/api/admin/auth/login/route');
  const response = await POST(loginRequest('incorrect'));
  expect(response.status).toBe(401);
  expect(response.cookies.get('admin_token')).toBeUndefined();
});
it('rate limits repeated login attempts', async () => {
  const { POST } = await import('@/app/api/admin/auth/login/route');
  for (let i = 0; i < 5; i++) await POST(loginRequest('incorrect'));
  expect((await POST(loginRequest())).status).toBe(429);
});
it('rejects a correctly signed token with the wrong session type', async () => {
  const { verifyToken } = await import('./jwt');
  const token = await new SignJWT({ sub: 'test-admin', type: 'user' })
    .setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('1h')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  await expect(verifyToken(token)).rejects.toThrow('Invalid admin session');
});
it('expires the session cookie on logout', async () => {
  const { POST } = await import('@/app/api/admin/auth/logout/route');
  const response = await POST(new NextRequest('https://example.test/api/admin/auth/logout', { method: 'POST' }));
  expect(response.cookies.get('admin_token')).toMatchObject({ value: '', maxAge: 0, httpOnly: true, path: '/' });
});
