import { cache } from 'react';
import { prisma } from '@/lib/db/prisma';
import { blogInputSchema, blogSettingsSchema } from './schema';
import { articleText, sanitizeBlogContent } from './content';
import { apiErrors } from '@/lib/utils/api-error';
import { revalidatePath } from 'next/cache';
export const publicBlogWhere = { isDraft: false, publishedAt: { not: null } } as const;
export const getBlogSettings = cache(async () => blogSettingsSchema.parse(await prisma.blogSettings.findUnique({ where: { id: 'main' } }) ?? {}));
export const getPublishedPost = cache((slug: string) => prisma.blogPost.findFirst({ where: { slug, ...publicBlogWhere } }));
export function prepareBlog(input: unknown) {
    const data = blogInputSchema.parse(input);
    data.content = sanitizeBlogContent(data.content);
    if (!data.isDraft && (!articleText(data.content) || !data.excerpt))
        throw apiErrors.badRequest('Add article content and an excerpt before publishing.');
    if (!data.isDraft && data.coverImage && !data.coverAlt)
        throw apiErrors.badRequest('Add an image description before publishing.');
    return data;
}
export function refreshBlog(...slugs: string[]) {
    revalidatePath('/blogs');
    revalidatePath('/sitemap.xml');
    revalidatePath('/admin/blogs');
    for (const slug of slugs)
        revalidatePath(`/blogs/${slug}`);
}
