import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
const db = vi.hoisted(() => ({ solutions: vi.fn(), products: vi.fn(), blogs: vi.fn() }));
vi.mock('@/lib/db/prisma', () => ({ prisma: { solution: { findMany: db.solutions }, product: { findMany: db.products }, blogPost: { findMany: db.blogs } } }));
import { GET } from './route';
beforeEach(() => { vi.resetAllMocks(); db.solutions.mockResolvedValue([]); db.products.mockResolvedValue([]); db.blogs.mockResolvedValue([]); });
describe('universal blog search', () => {
 it('searches published article body, author, category and tags without returning the full content', async () => {
  db.blogs.mockResolvedValue([{ title:'Connected infrastructure', slug:'connected-infrastructure', excerpt:'A practical guide.', category:'Operations', author:'Editorial team', tags:['vibration'], content:'<h2>Commissioning</h2><p>Sensor maintenance workflows.</p>' }]);
  const response = await GET(new NextRequest('https://example.test/api/search?q=commissioning%20vibration&category=Blogs'));
  const result = await response.json();
  expect(db.blogs).toHaveBeenCalledWith(expect.objectContaining({ where: { isDraft:false, publishedAt:{not:null} } }));
  expect(result.results).toEqual([{title:'Connected infrastructure',href:'/blogs/connected-infrastructure',description:'A practical guide.',category:'Blogs'}]);
  expect(JSON.stringify(result)).not.toContain('Sensor maintenance');
  expect(result.partial).toBe(false);
 });
 it('includes the blog landing page in quick links even when the blog database is unavailable', async () => {
  db.blogs.mockRejectedValue(new Error('Database unavailable'));
  const response = await GET(new NextRequest('https://example.test/api/search?q=blogs'));
  const result = await response.json();
  expect(result.results).toContainEqual(expect.objectContaining({title:'Blogs',href:'/blogs'}));
  expect(result.partial).toBe(true);
 });
 it('excludes draft and undated records at the database boundary', async () => {
  await GET(new NextRequest('https://example.test/api/search?q=irrigation'));
  expect(db.blogs.mock.calls[0][0].where).toEqual({isDraft:false,publishedAt:{not:null}});
 });
});
