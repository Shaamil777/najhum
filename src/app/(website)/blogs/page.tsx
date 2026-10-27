import Link from 'next/link';
import { Search, ArrowUpRight } from 'lucide-react';
import { Container } from '@/design-system/primitives/layout/Container';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db/prisma';
import { getBlogSettings, publicBlogWhere } from '@/lib/blog/server';
import { blogSettingsSchema } from '@/lib/blog/schema';
import { absoluteSiteUrl } from '@/lib/seo';
import { blogMetadata } from '@/lib/blog/metadata';
import StructuredData from '@/components/seo/StructuredData';
import { PostCard } from '@/components/blog/BlogArticle';
export const dynamic = 'force-dynamic';
type Props = {
    searchParams: Promise<{
        q?: string;
        category?: string;
        page?: string;
    }>;
};
export async function generateMetadata({ searchParams }: Props) {
    const params = await searchParams;
    try {
        const s = await getBlogSettings();
        return blogMetadata({ title: s.seoTitle, description: s.seoDescription, path: '/blogs', image: s.ogImage, noIndex: s.noIndex || !!(params.q || params.category || params.page) });
    }
    catch {
        return blogMetadata({ title: 'Journal | Najhum', description: 'Perspectives from Najhum Technologies.', path: '/blogs', noIndex: true });
    }
}
export default async function BlogsPage({ searchParams }: Props) {
    const params = await searchParams;
    const q = (params.q || '').trim().slice(0, 150);
    const category = (params.category || '').slice(0, 80);
    const page = Math.max(1, Math.min(10000, Number.parseInt(params.page || '1') || 1));
    let settings = blogSettingsSchema.parse({});
    let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
    let categories: string[] = [];
    let total = 0;
    let unavailable = false;
    try {
        const where: Prisma.BlogPostWhereInput = { ...publicBlogWhere, ...(category ? { category } : {}), ...(q ? { OR: [{ title: { contains: q, mode: 'insensitive' } }, { excerpt: { contains: q, mode: 'insensitive' } }] } : {}) };
        const result = await Promise.all([getBlogSettings(), prisma.blogPost.findMany({ where, orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }, { id: 'asc' }], take: 9, skip: (page - 1) * 9 }), prisma.blogPost.count({ where }), prisma.blogPost.findMany({ where: publicBlogWhere, distinct: ['category'], select: { category: true }, orderBy: { category: 'asc' } })]);
        settings = result[0];
        posts = result[1];
        total = result[2];
        categories = result[3].map(item => item.category);
    }
    catch {
        unavailable = true;
    }
    const urlFor = (next: {
        page?: number;
        category?: string;
    }) => { const values = new URLSearchParams(); if (q)
        values.set('q', q); if (next.category ?? category)
        values.set('category', next.category ?? category); if ((next.page || 1) > 1)
        values.set('page', String(next.page)); return `/blogs${values.size ? `?${values}` : ''}`; };
    return <div className="journal journal-listing"><section className="journal-hero"><Container size="full" padded={false} className="journal-wrap"><div className="journal-kicker">The Najhum journal</div><header className="journal-head"><h1>{settings.heading}</h1><p>{settings.introduction}</p></header></Container></section><Container size="full" padded={false} className="journal-wrap journal-content">
    <div className="journal-toolbar"><nav className="journal-filters" aria-label="Article categories"><Link className="journal-chip" aria-current={!category ? 'page' : undefined} href={urlFor({ category: '' })}>All stories</Link>{categories.map(item => <Link key={item} className="journal-chip" aria-current={category === item ? 'page' : undefined} href={urlFor({ category: item })}>{item}</Link>)}</nav><form className="journal-search" action="/blogs"><label htmlFor="journal-search" className="sr-only">Search articles</label><Search size={18} aria-hidden="true"/><input id="journal-search" name="q" defaultValue={q} placeholder="Find a perspective…"/>{category && <input type="hidden" name="category" value={category}/>}<button type="submit">Search <ArrowUpRight size={16} aria-hidden="true"/></button></form></div>
    {unavailable ? <div className="journal-error" role="alert">The journal is temporarily unavailable. Please try again shortly.</div> : !posts.length ? <section className="journal-empty"><span className="journal-tag">The journal</span><h2>{q || category || page > 1 ? 'No stories found.' : 'A new perspective is on its way.'}</h2><p>{q || category || page > 1 ? 'Try another search or explore all stories.' : 'Our team is preparing insights from the connected world. Come back soon for our first story.'}</p>{(q || category || page > 1) && <Link className="journal-read" href="/blogs">Explore all stories ↗</Link>}</section> : <>
      <div className="journal-section-title"><h2>{q ? `Results for “${q}”` : 'Explore the journal'}</h2><span>{total} {total === 1 ? 'story' : 'stories'}</span></div><div className="journal-grid">{posts.map(post => <PostCard key={post.id} post={post}/>)}</div>
      <nav className="journal-pagination" aria-label="Article pages">{page > 1 && <Link href={urlFor({ page: page - 1 })}>← Previous</Link>}<span>Page {page} of {Math.max(1, Math.ceil(total / 9))}</span>{page * 9 < total && <Link href={urlFor({ page: page + 1 })}>Next →</Link>}</nav>
    </>}
    {!unavailable && <StructuredData data={{ '@context': 'https://schema.org', '@type': 'Blog', name: settings.heading, description: settings.introduction, url: absoluteSiteUrl('/blogs'), blogPost: posts.filter(post => !post.noIndex).map(post => ({ '@type': 'BlogPosting', headline: post.title, url: absoluteSiteUrl(`/blogs/${post.slug}`) })) }}/>}
  </Container></div>;
}
