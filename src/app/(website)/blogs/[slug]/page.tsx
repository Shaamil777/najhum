import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db/prisma';
import { getPublishedPost, publicBlogWhere } from '@/lib/blog/server';
import { absoluteSiteUrl } from '@/lib/seo';
import { blogMetadata } from '@/lib/blog/metadata';
import { siteConfig } from '@/config/site';
import BlogArticle, { PostCard } from '@/components/blog/BlogArticle';
import StructuredData from '@/components/seo/StructuredData';
export const dynamic = 'force-dynamic';
type Props = {
    params: Promise<{
        slug: string;
    }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPublishedPost((await params).slug);
    if (!post)
        notFound();
    const metadata = blogMetadata({ title: post.seoTitle || `${post.title} | Najhum`, description: post.seoDescription || post.excerpt, path: `/blogs/${post.slug}`, keywords: post.tags, image: post.ogImage || post.coverImage, noIndex: post.noIndex });
    return { ...metadata, openGraph: { ...metadata.openGraph, type: 'article', publishedTime: post.publishedAt!.toISOString(), modifiedTime: post.updatedAt.toISOString(), authors: [post.author], section: post.category, tags: post.tags } };
}
export default async function ArticlePage({ params }: Props) {
    const post = await getPublishedPost((await params).slug);
    if (!post)
        notFound();
    const related = await prisma.blogPost.findMany({ where: { ...publicBlogWhere, id: { not: post.id } }, orderBy: { publishedAt: 'desc' }, take: 3 });
    return <><StructuredData data={{ '@context': 'https://schema.org', '@graph': [{ '@type': 'BlogPosting', headline: post.title, description: post.excerpt, datePublished: post.publishedAt!.toISOString(), dateModified: post.updatedAt.toISOString(), author: { '@type': 'Person', name: post.author }, publisher: { '@type': 'Organization', name: siteConfig.name, logo: { '@type': 'ImageObject', url: absoluteSiteUrl('/logo/logo.png') } }, ...(post.coverImage ? { image: absoluteSiteUrl(post.coverImage) } : {}), mainEntityOfPage: absoluteSiteUrl(`/blogs/${post.slug}`) }, { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Journal', item: absoluteSiteUrl('/blogs') }, { '@type': 'ListItem', position: 3, name: post.title, item: absoluteSiteUrl(`/blogs/${post.slug}`) }] }] }}/><BlogArticle post={post}/>{!!related.length && <section className="journal" style={{ paddingTop: 0 }}><div className="journal-wrap journal-related"><div className="journal-section-title"><h2>Keep exploring.</h2><span>More perspectives from the journal</span></div><div className="journal-grid">{related.map(item => <PostCard post={item} key={item.id}/>)}</div></div></section>}</>;
}
