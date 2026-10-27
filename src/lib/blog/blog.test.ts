import { beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('@/lib/db/prisma', () => ({ prisma: { blogPost: { findFirst: vi.fn() } } }));
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));
import { prisma } from '@/lib/db/prisma';
import { blogInputSchema, blogSettingsSchema } from './schema';
import { articleText, readingMinutes, sanitizeBlogContent, presentArticle } from './content';
import { getPublishedPost, prepareBlog } from './server';
const draft = { title: 'A real perspective', slug: 'real-perspective' };
beforeEach(() => vi.clearAllMocks());
describe('blog content and publication', () => {
    it('starts private and supports incomplete drafts', () => {
        expect(prepareBlog(draft)).toMatchObject({ isDraft: true, content: '', tags: [] });
    });
    it('requires real content and an excerpt for publication', () => {
        expect(() => prepareBlog({ ...draft, isDraft: false, content: '<script>unsafe()</script>', excerpt: 'Intro' })).toThrow();
        expect(() => prepareBlog({ ...draft, isDraft: false, content: '<p>Story</p>' })).toThrow();
        expect(prepareBlog({ ...draft, isDraft: false, content: '<h2>Context</h2><p>A story.</p>', excerpt: 'Intro' }).isDraft).toBe(false);
    });
    it('requires accessible cover descriptions before publishing', () => {
        expect(() => prepareBlog({ ...draft, isDraft: false, content: '<p>Story.</p>', excerpt: 'Intro', coverImage: '/cover.jpg' })).toThrow();
    });
    it('removes unsafe markup while preserving editorial structure and images', () => {
        const value = sanitizeBlogContent('<script>bad()</script><h2>Context</h2><p onclick="bad()">Story</p><img src="/cover.jpg" alt="Cover" onerror="bad()"><a href="javascript:bad()">Click</a><pre><code>const x = 1;</code></pre>');
        expect(value).not.toMatch(/script|onclick|onerror|javascript:/);
        expect(value).toContain('<h2>Context</h2>');
        expect(value).toContain('src="/cover.jpg"');
        expect(value).toContain('<pre><code>');
    });
    it('validates URL slugs, image protocols, and SEO data', () => {
        expect(blogInputSchema.safeParse({ ...draft, slug: '../admin' }).success).toBe(false);
        expect(blogInputSchema.safeParse({ ...draft, coverImage: 'javascript:alert(1)' }).success).toBe(false);
        expect(blogSettingsSchema.safeParse({ seoTitle: '' }).success).toBe(false);
    });
    it('derives reading time from text, not HTML attributes', () => {
        expect(readingMinutes(`<p>${'word '.repeat(441)}</p>`)).toBe(3);
        expect(readingMinutes('')).toBe(1);
        expect(articleText('<h2>Hello</h2>')).toBe('Hello');
    });
    it('never resolves a draft through the public article query', async () => {
        vi.mocked(prisma.blogPost.findFirst).mockResolvedValue(null);
        expect(await getPublishedPost('private')).toBeNull();
        expect(prisma.blogPost.findFirst).toHaveBeenCalledWith({ where: { slug: 'private', isDraft: false, publishedAt: { not: null } } });
    });
});
it('uses authored SEO titles and accurate sharing images', async () => {
    const { blogMetadata } = await import('./metadata');
    const metadata = blogMetadata({ title: 'An exact editorial title', description: 'A concise perspective.', path: '/blogs/editorial', image: '/cover.webp', noIndex: true });
    expect(metadata.title).toEqual({ absolute: 'An exact editorial title' });
    expect(metadata.alternates?.canonical).toBe('https://najhumgroup.com/blogs/editorial');
    expect(metadata.openGraph?.images).toEqual([{ url: 'https://najhumgroup.com/cover.webp', alt: 'An exact editorial title' }]);
    expect(metadata.robots).toMatchObject({ index: false });
});


describe('article navigation and rich content', () => {
  it('generates unique contents anchors from safe headings, including repeated labels', () => {
    const result = presentArticle('<h2>Scope &amp; context</h2><p>Text</p><h3>A detail</h3><h2>Scope &amp; context</h2>');
    expect(result.headings).toEqual([
      { id: 'article-section-1', text: 'Scope & context', level: 2 },
      { id: 'article-section-2', text: 'A detail', level: 3 },
      { id: 'article-section-3', text: 'Scope & context', level: 2 },
    ]);
    for (const heading of result.headings) expect(result.html).toContain(`id="${heading.id}"`);
  });
  it('sanitises user IDs and dangerous content before creating anchors', () => {
    const result = presentArticle('<h2 id="bad" onclick="bad()">Safe <strong>heading</strong></h2><script>bad()</script><img src="javascript:bad()" onerror="bad()">');
    expect(result.html).not.toMatch(/onclick|onerror|javascript:|<script|id="bad"/);
    expect(result.headings[0].text).toBe('Safe heading');
  });
  it('preserves multiple inline images, captions, and list markup', () => {
    const result = presentArticle('<h2>Installation</h2><figure><img src="/first.jpg" alt="First"><figcaption>Field context</figcaption></figure><ul><li>Check placement</li></ul><figure><img src="/second.jpg" alt="Second"></figure>');
    expect(result.html.match(/<img /g)).toHaveLength(2);
    expect(result.html).toContain('<figcaption>Field context</figcaption>');
    expect(result.html).toContain('<li>Check placement</li>');
  });
});
