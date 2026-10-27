import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, requireSameOrigin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db/prisma';
import { blogSettingsSchema } from '@/lib/blog/schema';
import { refreshBlog } from '@/lib/blog/server';
import { handleApiError } from '@/lib/utils/api-error';
export async function PUT(request: NextRequest) {
    try {
        await requireAdmin(request);
        requireSameOrigin(request);
        const data = blogSettingsSchema.parse(await request.json());
        const settings = await prisma.blogSettings.upsert({ where: { id: 'main' }, create: { id: 'main', ...data }, update: data });
        refreshBlog();
        return NextResponse.json({ settings });
    }
    catch (error) {
        return handleApiError(error);
    }
}
