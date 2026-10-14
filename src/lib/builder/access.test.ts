import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const sessions = vi.hoisted(() => ({ getBuilderSession: vi.fn(), saveBuilderDocument: vi.fn(), discardBuilderDraft: vi.fn() }));
vi.mock('./server', () => sessions);
vi.mock('@/lib/utils/revalidate-solutions', () => ({ revalidateSolutions: vi.fn() }));
import { GET, PUT, DELETE } from '@/app/api/admin/solutions/[id]/builder/route';
import { generateToken } from '@/lib/auth/jwt';
import proxy from '@/proxy';
import { requireSameOrigin } from '@/lib/auth/require-admin';

beforeEach(() => { vi.resetAllMocks(); vi.stubEnv('JWT_SECRET', 'builder-test-secret'.repeat(3)); vi.spyOn(console, 'error').mockImplementation(() => {}); });
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });
const context = { params: Promise.resolve({ id: 'solution-1' }) };

it('requires authentication for reading, saving, and discarding drafts', async () => {
  for (const [method, handler] of [['GET', GET], ['PUT', PUT], ['DELETE', DELETE]] as const) {
    const response = await handler(new NextRequest('https://example.test/api/admin/solutions/solution-1/builder', { method }), context);
    expect(response.status).toBe(401);
  }
  expect(sessions.getBuilderSession).not.toHaveBeenCalled(); expect(sessions.saveBuilderDocument).not.toHaveBeenCalled(); expect(sessions.discardBuilderDraft).not.toHaveBeenCalled();
});
it('blocks cross-origin writes even with a valid admin session', async () => {
  const token = await generateToken({ sub: 'admin' });
  const response = await PUT(new NextRequest('https://example.test/api/admin/solutions/solution-1/builder', { method: 'PUT', headers: { authorization: `Bearer ${token}`, origin: 'https://elsewhere.test' }, body: '{}' }), context);
  expect(response.status).toBe(403); expect(sessions.saveBuilderDocument).not.toHaveBeenCalled();
});
it('protects the legacy Pages and Products APIs that could expose or modify builder data', async () => {
  for (const path of ['/api/admin/pages', '/api/admin/pages/draft-id', '/api/admin/products']) {
    const response = await proxy(new NextRequest(`https://example.test${path}`));
    expect(response.status).toBe(401);
  }
});

it('accepts the browser origin when Next reconstructs its URL with an internal hostname', () => {
  const request = new NextRequest('http://localhost:3210/api/admin/solutions/id/builder', {
    method: 'PUT', headers: { host: '127.0.0.1:3210', origin: 'http://127.0.0.1:3210', 'x-forwarded-proto': 'http' },
  });
  expect(() => requireSameOrigin(request)).not.toThrow();
});
