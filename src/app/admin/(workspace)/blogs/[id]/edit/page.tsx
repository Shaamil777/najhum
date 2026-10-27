import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { blogInputSchema } from '@/lib/blog/schema';
import BlogEditor from '@/components/admin/blogs/BlogEditor';
export const metadata = { title: 'Edit journal article' };
export default async function EditArticle({ params }: {
    params: Promise<{
        id: string;
    }>;
}) {
    const post = await prisma.blogPost.findUnique({ where: { id: (await params).id } });
    if (!post)
        notFound();
    return <BlogEditor id={post.id} initialData={blogInputSchema.parse(post)}/>;
}
