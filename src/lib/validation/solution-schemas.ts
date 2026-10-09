import { z } from 'zod';

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
});

export const updateSolutionSchema = createSolutionSchema.partial();

export type CreateSolutionData = z.infer<typeof createSolutionSchema>;
export type UpdateSolutionData = z.infer<typeof updateSolutionSchema>;
