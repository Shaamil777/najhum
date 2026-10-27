import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import BlogArticle from '@/components/blog/BlogArticle';
import Link from 'next/link';
export const metadata = { title: 'Private article preview', robots: { index: false, follow: false } };
export default async function Preview({ params }: {
    params: Promise<{
        id: string;
    }>;
}) {
    const post = await prisma.blogPost.findUnique({ where: { id: (await params).id } });
    if (!post)
        notFound();
    return <><Link href={`/admin/blogs/${post.id}/edit`} className="blog-admin-button mb-4"><ArrowLeft size={16}/>Back to editing</Link><BlogArticle post={post} preview/></>;
}
