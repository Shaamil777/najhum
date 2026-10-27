import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, requireSameOrigin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db/prisma';
import { prepareBlog, refreshBlog } from '@/lib/blog/server';
import { handleApiError } from '@/lib/utils/api-error';
export async function GET(request: NextRequest) {
    try {
        await requireAdmin(request);
        return NextResponse.json({ posts: await prisma.blogPost.findMany({ orderBy: { updatedAt: 'desc' } }) });
    }
    catch (error) {
        return handleApiError(error);
    }
}
export async function POST(request: NextRequest) {
    try {
        await requireAdmin(request);
        requireSameOrigin(request);
        const data = prepareBlog(await request.json());
        const post = await prisma.blogPost.create({ data: { ...data, publishedAt: data.isDraft ? null : new Date() } });
        refreshBlog(post.slug);
        return NextResponse.json({ post }, { status: 201 });
    }
    catch (error) {
        return handleApiError(error);
    }
}
