import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { recommendedPages, rankSearch, searchableText, type SearchEntry } from '@/lib/search';
import { iotricsContent } from '@/content/iotrics';
import { evolticsContent } from '@/content/evoltics';
import { cropifaiContent } from '@/content/cropifai';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get('q') || '').slice(0,120);
  const category = request.nextUrl.searchParams.get('category') || 'All';
  const entries: SearchEntry[] = recommendedPages.map(entry => ({ ...entry, keywords: `${entry.keywords || ''} ${entry.href === '/platforms/iotrics' ? searchableText(iotricsContent) : entry.href === '/platforms/evoltics' ? searchableText(evolticsContent) : entry.href === '/platforms/cropifai' ? searchableText(cropifaiContent) : ''}` }));
  const results = await Promise.allSettled([
    prisma.solution.findMany({ where: { isDraft: false }, select: { title: true, slug: true, metaDescription: true, platforms: true, sections: { where: { isDraft: false }, select: { content: true } } }, orderBy: { title: 'asc' } }),
    prisma.blogPost.findMany({ where: { isDraft: false, publishedAt: { not: null } }, select: { title: true, slug: true, excerpt: true, category: true, author: true, tags: true, content: true }, orderBy: { publishedAt: 'desc' } }),
    prisma.product.findMany({ where: { isDraft: false }, select: { id: true, name: true, description: true, features: true, details: true, platforms: true }, orderBy: { order: 'asc' } }),
  ]);
  const [solutions, blogs, products] = results;
  if (solutions.status === 'fulfilled') for (const item of solutions.value) entries.push({ title: item.title, href: `/solutions/${encodeURIComponent(item.slug)}`, description: item.metaDescription || 'Explore this solution.', category: 'Solutions', keywords: searchableText([item.platforms,item.sections]) });
  if (blogs.status === 'fulfilled') for (const post of blogs.value) entries.push({ title: post.title, href: `/blogs/${encodeURIComponent(post.slug)}`, description: post.excerpt, category: 'Blogs', keywords: searchableText([post.category, post.author, post.tags, post.content]) });
  if (products.status === 'fulfilled') for (const item of products.value) entries.push({ title: item.name, href: `/products/${encodeURIComponent(item.id)}`, description: searchableText(item.description).slice(0,200), category: 'Products', keywords: searchableText([item.features,item.details,item.platforms]) });
  return NextResponse.json({ results: rankSearch(entries,q,category), query: q, partial: results.some(result => result.status === 'rejected') }, { headers: { 'Cache-Control': 'no-store' } });
}
