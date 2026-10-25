import { z } from 'zod';
import { solutionClassifications } from '@/lib/solution-classification';

export const createSolutionSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be 200 characters or less'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(100, 'Slug must be 100 characters or less')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must contain only lowercase letters, numbers, and hyphens'
    ),
  metaDescription: z
    .string()
    .max(300, 'Meta description must be 300 characters or less')
    .optional(),
  coverImage: z.string().optional().nullable().default(null),
  platforms: z.array(z.string()).default([]),
  classification: z.enum(solutionClassifications).default('INDUSTRY'),
});

// Defaults belong to creation only; omitted fields must survive metadata-only edits.
export const updateSolutionSchema = createSolutionSchema.partial().extend({
  classification: z.enum(solutionClassifications).optional(),
  platforms: z.array(z.string()).optional(),
  coverImage: z.string().nullable().optional(),
});

export type CreateSolutionData = z.infer<typeof createSolutionSchema>;
export type UpdateSolutionData = z.infer<typeof updateSolutionSchema>;
