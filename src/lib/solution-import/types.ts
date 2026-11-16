import { z } from 'zod';
export const MAX_UPLOAD = 4 * 1024 * 1024;
export const MAX_EXPANDED = 40 * 1024 * 1024;
export const metadataSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z.string().max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  seoTitle: z.string().trim().min(1).max(200),
  metaDescription: z.string().trim().max(300).default(''),
  menuDescription: z.string().trim().max(180).default(''),
  menuIcon: z.string().max(1000).default('snowflake'),
  coverImage: z.string().max(2000).default(''),
  socialImage: z.string().max(2000).default(''),
  socialImageAlt: z.string().max(200).default(''),
  classification: z.enum(['INDUSTRY','USE_CASE','BOTH']).default('INDUSTRY'),
  platforms: z.array(z.enum(['iotrics','evoltics','cropifai'])).max(3).default([]),
  clientName: z.string().trim().max(200).optional(),
  industry: z.string().trim().max(100).optional(),
  location: z.string().trim().max(200).optional(),
  year: z.string().trim().max(20).optional(),
  productIds: z.array(z.string().max(100)).max(100).default([]),
});
export type ImportMetadata = z.infer<typeof metadataSchema>;
export type ImportedAsset = { path: string; url: string; storageKey: string; type: string; size: number; altText?: string };
export type ImportedDocument = { schemaVersion: 1; html: string; css: string; scripts: string[]; metadata: ImportMetadata; assets: ImportedAsset[]; warnings: string[]; sourceName: string; checksum: string; sourceKey?: string };
