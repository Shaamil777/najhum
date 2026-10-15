import { z } from 'zod';
import { createSectionSchema } from '@/lib/validation/section-schemas';
import { createSolutionSchema } from '@/lib/validation/solution-schemas';
import { SectionType } from '@/types/section';
import { isSafeLink, isSafeMediaUrl } from '@/lib/utils/content-url';

export const DRAFT_PREFIX = '__solution_builder__';
export const draftKey = (id: string) => `${DRAFT_PREFIX}${id}`;

export const designSchema = z.object({
  paddingY: z.number().int().min(0).max(240).optional(),
  mobilePaddingY: z.number().int().min(0).max(160).optional(),
  headingSize: z.number().int().min(16).max(120).optional(),
  mobileHeadingSize: z.number().int().min(16).max(80).optional(),
  background: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  headingColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  textColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  alignment: z.enum(['left', 'center', 'right']).optional(),
  hideOnMobile: z.boolean().optional(),
  hideOnDesktop: z.boolean().optional(),
});
export type SectionDesign = z.infer<typeof designSchema>;
export interface BuilderSection {
  id: string;
  type: SectionType;
  content: Record<string, unknown>;
  isDraft: boolean;
  design: SectionDesign;
}
export interface BuilderDocument {
  title: string;
  slug: string;
  metaDescription: string;
  sections: BuilderSection[];
}
export interface BuilderSession {
  document: BuilderDocument;
  version: number;
  baseRevision: string;
  isPublished: boolean;
  hasDraft: boolean;
  products: BuilderProduct[];
  availableProducts?: BuilderProduct[];
}
export interface BuilderProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  brochureUrl: string | null;
}

export const safeDestination = isSafeLink;

// Empty optional image fields are useful while editing but should not be persisted.
export function normalizeContent(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalizeContent);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).filter(([key, item]) => !(item === '' && ['image', 'backgroundImage', 'avatar'].includes(key))).map(([key, item]) => [key, normalizeContent(item)]));
  }
  return value;
}

const sectionSchema = z.object({
  id: z.string().min(1).max(100),
  type: z.enum(SectionType),
  content: z.record(z.string(), z.unknown()),
  isDraft: z.boolean(),
  design: designSchema.default({}),
}).transform((section, ctx) => {
  const result = createSectionSchema.safeParse({ type: section.type, content: normalizeContent(section.content) });
  if (!result.success) {
    for (const issue of result.error.issues) ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    return z.NEVER;
  }
  function inspect(value: unknown, path: (string | number)[] = []) {
    if (Array.isArray(value)) value.forEach((item, index) => inspect(item, [...path, index]));
    else if (value && typeof value === 'object') for (const [key, item] of Object.entries(value)) {
      if (/link$/i.test(key) && typeof item === 'string' && item && !safeDestination(item)) ctx.addIssue({ code: 'custom', path: ['content', ...path, key], message: 'Use a page path, anchor, http(s), email, or phone link.' });
      if (['image', 'backgroundImage', 'avatar'].includes(key) && typeof item === 'string' && item && !isSafeMediaUrl(item)) ctx.addIssue({ code: 'custom', path: ['content', ...path, key], message: 'Use a local image path or an http(s) image URL.' });
      inspect(item, [...path, key]);
    }
  }
  inspect(result.data.content);
  return { ...section, content: result.data.content as Record<string, unknown> };
});

export const builderDocumentSchema = createSolutionSchema.extend({
  metaDescription: z.string().max(300).default(''),
  sections: z.array(sectionSchema).max(60, 'A page can contain at most 60 sections.'),
}).superRefine((doc, ctx) => {
  if (new Set(doc.sections.map(section => section.id)).size !== doc.sections.length) ctx.addIssue({ code: 'custom', path: ['sections'], message: 'Section IDs must be unique.' });
});

export const builderRequestSchema = z.object({
  document: builderDocumentSchema,
  version: z.number().int().min(0),
  baseRevision: z.string().length(64),
  action: z.enum(['save', 'publish', 'unpublish']).default('save'),
});

export const draftEnvelopeSchema = z.object({
  schemaVersion: z.literal(1),
  version: z.number().int().min(1),
  baseRevision: z.string().length(64),
  document: builderDocumentSchema,
});

export function sectionTitle(section: BuilderSection) {
  const content = section.content;
  if (typeof content.heading === 'string' && content.heading) return content.heading.replace(/<[^>]*>/g, '');
  if (section.type === SectionType.COMPARISON_TABLE && content.header && typeof content.header === 'object') {
    const header = content.header as Record<string, unknown>;
    return [header.leftTitle, 'vs', header.rightTitlePart1, header.rightTitlePart2].filter(value => typeof value === 'string').join(' ').replace(/<[^>]*>/g, '');
  }
  return section.type.replaceAll('_', ' ').toLowerCase();
}
