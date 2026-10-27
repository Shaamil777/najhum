import { z } from 'zod';
import { isSafeMediaUrl } from '@/lib/utils/content-url';
const media = z.string().max(2000).refine(value => !value || isSafeMediaUrl(value), 'Use a local path or an HTTPS image URL.');
export const blogInputSchema = z.object({
    title: z.string().trim().min(1, 'Add an article title.').max(200),
    slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens for the URL.'),
    excerpt: z.string().trim().max(500).default(''),
    content: z.string().max(200000).default(''),
    category: z.string().trim().min(1).max(80).default('Insights'),
    author: z.string().trim().min(1).max(120).default('Najhum Editorial'),
    coverImage: media.default(''), coverAlt: z.string().trim().max(250).default(''),
    seoTitle: z.string().trim().max(100).default(''), seoDescription: z.string().trim().max(300).default(''),
    ogImage: media.default(''), tags: z.array(z.string().trim().min(1).max(60)).max(20).default([]),
    noIndex: z.boolean().default(false), featured: z.boolean().default(false), isDraft: z.boolean().default(true),
});
export type BlogInput = z.infer<typeof blogInputSchema>;
export const blogSettingsSchema = z.object({
    heading: z.string().trim().min(1).max(160).default('Ideas for a connected world.'),
    introduction: z.string().trim().max(500).default('Perspectives on technology, infrastructure, and the systems that bring them together.'),
    seoTitle: z.string().trim().min(1).max(100).default('Journal | Najhum Technologies'),
    seoDescription: z.string().trim().min(1).max(300).default('Explore insights on industrial IoT, EV charging, smart buildings, and precision agriculture from Najhum Technologies.'),
    ogImage: media.default(''), noIndex: z.boolean().default(false),
});
export type BlogSettingsInput = z.infer<typeof blogSettingsSchema>;
