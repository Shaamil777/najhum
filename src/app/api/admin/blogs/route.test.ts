import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
const mocks = vi.hoisted(() => ({ auth: vi.fn(), create: vi.fn(), find: vi.fn(), update: vi.fn(), remove: vi.fn(), tx: vi.fn(), refresh: vi.fn() }));
vi.mock('@/lib/auth/require-admin', () => ({ requireAdmin: mocks.auth, requireSameOrigin: vi.fn() }));
vi.mock('next/cache', () => ({ revalidatePath: mocks.refresh }));
vi.mock('@/lib/db/prisma', () => ({ prisma: { blogPost: { create: mocks.create, findUniqueOrThrow: mocks.find, update: mocks.update, delete: mocks.remove }, $transaction: mocks.tx } }));
import { POST } from './route';
import { PUT, DELETE } from './[id]/route';
import { ApiError } from '@/lib/utils/api-error';
const context = { params: Promise.resolve({ id: 'post-1' }) };
const input = { title: 'A perspective', slug: 'perspective', content: '<p>A complete story.</p>', excerpt: 'An introduction.' };
const request = (method: string, data = input) => new NextRequest('https://example.test/api/admin/blogs/post-1', { method, headers: { 'Content-Type': 'application/json' }, body: method === 'DELETE' ? undefined : JSON.stringify(data) });
beforeEach(() => { vi.resetAllMocks(); mocks.auth.mockResolvedValue({ sub: 'admin' }); mocks.tx.mockImplementation(async (callback) => callback({ blogPost: { findUniqueOrThrow: mocks.find, update: mocks.update } })); });
describe('authenticated article management', () => {
    it('rejects unauthenticated writes before accessing storage', async () => {
        mocks.auth.mockRejectedValue(new ApiError('Unauthorised', 401));
        expect((await POST(request('POST'))).status).toBe(401);
        expect(mocks.create).not.toHaveBeenCalled();
    });
    it('creates a private draft without a publication date by default', async () => {
        mocks.create.mockResolvedValue({ id: 'post-1', slug: 'perspective' });
        expect((await POST(request('POST'))).status).toBe(201);
        expect(mocks.create).toHaveBeenCalledWith({ data: expect.objectContaining({ isDraft: true, publishedAt: null }) });
    });
    it('sets a publication timestamp only when publishing', async () => {
        mocks.create.mockResolvedValue({ id: 'post-1', slug: 'perspective' });
        expect((await POST(request('POST', { ...input, isDraft: false } as typeof input))).status).toBe(201);
        expect(mocks.create).toHaveBeenCalledWith({ data: expect.objectContaining({ isDraft: false, publishedAt: expect.any(Date) }) });
    });
    it('keeps the original publication date while updating a published article and refreshes old URLs', async () => {
        const publishedAt = new Date('2026-01-01');
        mocks.find.mockResolvedValue({ slug: 'old-url', publishedAt });
        mocks.update.mockResolvedValue({ slug: 'perspective' });
        expect((await PUT(request('PUT', { ...input, isDraft: false } as typeof input), context)).status).toBe(200);
        expect(mocks.update).toHaveBeenCalledWith({ where: { id: 'post-1' }, data: expect.objectContaining({ publishedAt, isDraft: false }) });
        expect(mocks.refresh).toHaveBeenCalledWith('/blogs/old-url');
        expect(mocks.refresh).toHaveBeenCalledWith('/blogs/perspective');
    });
    it('can move a published post back to a private draft', async () => {
        mocks.find.mockResolvedValue({ slug: 'perspective', publishedAt: new Date() });
        mocks.update.mockResolvedValue({ slug: 'perspective' });
        expect((await PUT(request('PUT'), context)).status).toBe(200);
        expect(mocks.update).toHaveBeenCalledWith({ where: { id: 'post-1' }, data: expect.objectContaining({ isDraft: true }) });
    });
    it('deletes the record and invalidates its public page', async () => {
        mocks.remove.mockResolvedValue({ slug: 'removed' });
        expect((await DELETE(request('DELETE'), context)).status).toBe(204);
        expect(mocks.remove).toHaveBeenCalledWith({ where: { id: 'post-1' } });
        expect(mocks.refresh).toHaveBeenCalledWith('/blogs/removed');
    });
});
