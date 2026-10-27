import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, requireSameOrigin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db/prisma';
import { prepareBlog, refreshBlog } from '@/lib/blog/server';
import { handleApiError } from '@/lib/utils/api-error';
type Context = {
    params: Promise<{
        id: string;
    }>;
};
export async function GET(request: NextRequest, { params }: Context) {
    try {
        await requireAdmin(request);
        const { id } = await params;
        const post = await prisma.blogPost.findUniqueOrThrow({ where: { id } });
        return NextResponse.json({ post });
    }
    catch (error) {
        return handleApiError(error);
    }
}
export async function PUT(request: NextRequest, { params }: Context) {
    try {
        await requireAdmin(request);
        requireSameOrigin(request);
        const { id } = await params;
        const data = prepareBlog(await request.json());
        const result = await prisma.$transaction(async (tx) => {
            const previous = await tx.blogPost.findUniqueOrThrow({ where: { id } });
            const post = await tx.blogPost.update({ where: { id }, data: { ...data, publishedAt: data.isDraft ? previous.publishedAt : previous.publishedAt ?? new Date() } });
            return { post, oldSlug: previous.slug };
        });
        refreshBlog(result.oldSlug, result.post.slug);
        return NextResponse.json({ post: result.post });
    }
    catch (error) {
        return handleApiError(error);
    }
}
export async function DELETE(request: NextRequest, { params }: Context) {
    try {
        await requireAdmin(request);
        requireSameOrigin(request);
        const { id } = await params;
        const post = await prisma.blogPost.delete({ where: { id } });
        refreshBlog(post.slug);
        return new NextResponse(null, { status: 204 });
    }
    catch (error) {
        return handleApiError(error);
    }
}
