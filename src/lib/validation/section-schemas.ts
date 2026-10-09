/**
 * Section Validation Schemas
 * 
 * Zod schemas for validating section content data.
 * Each section type has its own content schema with required field validation.
 * 
 * Requirements: 5.9, 10.10, 10.13
 */

import { z } from 'zod';
import { SectionType } from '@/types/section';

/**
 * Hero Section Content Schema
 */
export const heroContentSchema = z.object({
  heading: z.string().min(1, 'Heading is required').max(200, 'Heading must be 200 characters or less'),
  subheading: z.string().min(1, 'Subheading is required').max(300, 'Subheading must be 300 characters or less'),
  backgroundImage: z.string().url('Must be a valid URL').optional(),
  ctaText: z.string().min(1, 'CTA text is required').max(50, 'CTA text must be 50 characters or less'),
  ctaLink: z.string().min(1, 'CTA link is required'),
});

/**
 * Intro Section Content Schema
 */
const introContentFields = z.object({
  heading: z.string().min(1, 'Heading is required').max(200, 'Heading must be 200 characters or less'),
  bodyText: z.string().min(1, 'Body text is required').max(2000, 'Body text must be 2000 characters or less'),
  image: z.union([z.literal(''), z.string().url('Must be a valid URL')]).optional(),
  eyebrow: z.string().max(60).optional(),
  summary: z.string().max(300).optional(),
  bodyFormat: z.enum(['text', 'html']).optional(),
  imageAlt: z.string().max(200).optional(),
  imageCaption: z.string().max(160).optional(),
  imagePosition: z.enum(['left', 'right']).optional(),
  theme: z.enum(['light', 'dark']).optional(),
  highlights: z.array(z.object({
    title: z.string().trim().min(1, 'Highlight title is required').max(100),
    description: z.string().max(250).optional(),
  })).max(4).optional(),
  stats: z.array(z.object({
    value: z.string().trim().min(1, 'Value is required').max(30),
    label: z.string().trim().min(1, 'Label is required').max(80),
  })).max(3).optional(),
  buttonText: z.string().max(50).optional(),
  buttonLink: z.string().refine(
    (value) => !value || /^\/(?!\/)/.test(value) || /^#[^\s]*$/.test(value) || /^https?:\/\//i.test(value) && URL.canParse(value),
    'Use a page path, anchor, or http(s) URL',
  ).optional(),
});

export const introContentSchema = introContentFields.superRefine((content, context) => {
  if (Boolean(content.buttonText?.trim()) !== Boolean(content.buttonLink?.trim())) {
    context.addIssue({
      code: 'custom',
      path: [content.buttonText?.trim() ? 'buttonLink' : 'buttonText'],
      message: 'Provide both button text and a destination',
    });
  }
});

/**
 * Feature Item Schema
 */
const featureSchema = z.object({
  title: z.string().min(1, 'Feature title is required').max(100, 'Feature title must be 100 characters or less'),
  description: z.string().min(1, 'Feature description is required').max(500, 'Feature description must be 500 characters or less'),
  icon: z.string().optional(),
});

/**
 * Features Section Content Schema
 */
export const featuresContentSchema = z.object({
  features: z.array(featureSchema).min(1, 'At least one feature is required').max(12, 'Maximum 12 features allowed'),
});

/**
 * Challenge Item Schema
 */
const challengeSchema = z.object({
  title: z.string().min(1, 'Challenge title is required').max(100, 'Challenge title must be 100 characters or less'),
  description: z.string().min(1, 'Challenge description is required').max(500, 'Challenge description must be 500 characters or less'),
  category: z.string().max(100, 'Category must be 100 characters or less').optional(),
  exploreLink: z.string().max(200, 'Explore link must be 200 characters or less').optional(),
});

/**
 * Challenge Section Content Schema
 */
export const challengeContentSchema = z.object({
  heading: z.string().min(1, 'Heading is required').max(200, 'Heading must be 200 characters or less'),
  description: z.string().max(1000, 'Description must be 1000 characters or less').optional(),
  challenges: z.array(challengeSchema).min(1, 'At least one challenge is required').max(12, 'Maximum 12 challenges allowed'),
});

/**
 * Use Case Tab Schema
 */
const useCaseTabSchema = z.object({
  id: z.string().min(1, 'Tab ID is required'),
  label: z.string().min(1, 'Tab label is required').max(100),
  solutionDetails: z.string().min(1, 'Solution details are required').max(1000),
  statValue: z.string().min(1, 'Stat value is required').max(20),
  statDescription: z.string().min(1, 'Stat description is required').max(200),
  bullets: z.array(z.string().min(1, 'Bullet point cannot be empty').max(100)).min(1, 'At least one bullet is required').max(10),
});

/**
 * Use Cases Section Content Schema
 */
export const useCasesContentSchema = z.object({
  eyebrow: z.string().max(100, 'Eyebrow must be 100 characters or less'),
  heading: z.string().min(1, 'Heading is required').max(200, 'Heading must be 200 characters or less'),
  tabs: z.array(useCaseTabSchema).min(1, 'At least one tab is required').max(10, 'Maximum 10 tabs allowed'),
});

/**
 * Methodology Step Schema
 */
const methodologyStepSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be 500 characters or less'),
});

/**
 * Methodology Section Content Schema
 */
export const methodologyContentSchema = z.object({
  eyebrow: z.string().max(100, 'Eyebrow must be 100 characters or less'),
  heading: z.string().min(1, 'Heading is required').max(200, 'Heading must be 200 characters or less'),
  bodyText: z.string().min(1, 'Body text is required').max(2000, 'Body text must be 2000 characters or less'),
  steps: z.array(methodologyStepSchema).min(1, 'At least one step is required').max(6, 'Maximum 6 steps allowed'),
});

/**
 * SolaaS Section Content Schema
 */
export const solaasContentSchema = z.object({
  eyebrow: z.string().max(100).optional(),
  heading: z.string().trim().min(1, 'Heading is required').max(200).optional(),
  bodyText: z.string().trim().min(1, 'Description is required').max(2000).optional(),
  cards: z.array(z.object({
    title: z.string().trim().min(1, 'Card title is required').max(100),
    description: z.string().trim().min(1, 'Card description is required').max(500),
  })).min(1, 'Add at least one card').max(6, 'Maximum six cards').optional(),
});

/**
 * Benefit Item Schema
 */
const benefitSchema = z.object({
  title: z.string().min(1, 'Benefit title is required').max(100, 'Benefit title must be 100 characters or less'),
  description: z.string().min(1, 'Benefit description is required').max(500, 'Benefit description must be 500 characters or less'),
  image: z.string().url('Must be a valid URL').optional(),
});

/**
 * Benefits Section Content Schema
 */
export const benefitsContentSchema = z.object({
  benefits: z.array(benefitSchema).min(1, 'At least one benefit is required').max(8, 'Maximum 8 benefits allowed'),
});

/**
 * Testimonial Item Schema
 */
const testimonialSchema = z.object({
  quote: z.string().min(1, 'Quote is required').max(500, 'Quote must be 500 characters or less'),
  author: z.string().min(1, 'Author name is required').max(100, 'Author name must be 100 characters or less'),
  role: z.string().min(1, 'Role is required').max(100, 'Role must be 100 characters or less'),
  company: z.string().min(1, 'Company is required').max(100, 'Company must be 100 characters or less'),
  avatar: z.string().url('Must be a valid URL').optional(),
});

/**
 * Testimonials Section Content Schema
 */
export const testimonialsContentSchema = z.object({
  testimonials: z.array(testimonialSchema).min(1, 'At least one testimonial is required').max(10, 'Maximum 10 testimonials allowed'),
});

/**
 * CTA Section Content Schema
 */
export const ctaContentSchema = z.object({
  heading: z.string().min(1, 'Heading is required').max(200, 'Heading must be 200 characters or less'),
  bodyText: z.string().min(1, 'Body text is required').max(500, 'Body text must be 500 characters or less'),
  primaryButtonText: z.string().min(1, 'Primary button text is required').max(50, 'Primary button text must be 50 characters or less'),
  primaryButtonLink: z.string().min(1, 'Primary button link is required'),
  secondaryButtonText: z.string().max(50, 'Secondary button text must be 50 characters or less').optional(),
  secondaryButtonLink: z.string().optional(),
});

/**
 * Custom Section Content Schema
 */
export const customContentSchema = z.object({
  heading: z.string().min(1, 'Heading is required').max(200, 'Heading must be 200 characters or less'),
  bodyHtml: z.string().min(1, 'Content is required').max(10000, 'Content must be 10000 characters or less'),
  rawData: z.any().optional(),
});

/**
 * Products Carousel Section Content Schema
 */
export const productsCarouselContentSchema = z.object({
  heading: z.string().min(1, 'Heading is required').max(100).optional(),
  description: z.string().max(300).optional(),
});

/**
 * Create Section Schema
 * Discriminated union based on section type
 */
export const createSectionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(SectionType.HERO),
    content: heroContentSchema,
  }),
  z.object({
    type: z.literal(SectionType.INTRO),
    content: introContentSchema,
  }),
  z.object({
    type: z.literal(SectionType.CHALLENGE),
    content: challengeContentSchema,
  }),
  z.object({
    type: z.literal(SectionType.FEATURES),
    content: featuresContentSchema,
  }),
  z.object({
    type: z.literal(SectionType.BENEFITS),
    content: benefitsContentSchema,
  }),
  z.object({
    type: z.literal(SectionType.TESTIMONIALS),
    content: testimonialsContentSchema,
  }),
  z.object({
    type: z.literal(SectionType.CTA),
    content: ctaContentSchema,
  }),
  z.object({
    type: z.literal(SectionType.CUSTOM),
    content: customContentSchema,
  }),
  z.object({
    type: z.literal(SectionType.USE_CASES),
    content: useCasesContentSchema,
  }),
  z.object({
    type: z.literal(SectionType.METHODOLOGY),
    content: methodologyContentSchema,
  }),
  z.object({
    type: z.literal(SectionType.SOLAAS),
    content: solaasContentSchema,
  }),
  z.object({
    type: z.literal(SectionType.PRODUCTS_CAROUSEL),
    content: productsCarouselContentSchema,
  }),
]);

/**
 * Update Section Schema
 * Partial content for updates
 */
export const updateSectionContentSchema = z.union([
  heroContentSchema.partial(),
  introContentFields.partial(),
  challengeContentSchema.partial(),
  featuresContentSchema.partial(),
  benefitsContentSchema.partial(),
  testimonialsContentSchema.partial(),
  ctaContentSchema.partial(),
  customContentSchema.partial(),
  useCasesContentSchema.partial(),
  methodologyContentSchema.partial(),
  solaasContentSchema.partial(),
  productsCarouselContentSchema.partial(),
]);

/**
 * Reorder Sections Schema
 */
export const reorderSectionsSchema = z.object({
  sectionIds: z.array(z.string()).min(1, 'At least one section ID is required'),
});

/**
 * Toggle Section Draft Schema
 */
export const toggleSectionDraftSchema = z.object({
  isDraft: z.boolean(),
});

/**
 * TypeScript types inferred from schemas
 */
export type CreateSectionData = z.infer<typeof createSectionSchema>;
export type UpdateSectionContentData = z.infer<typeof updateSectionContentSchema>;
export type ReorderSectionsData = z.infer<typeof reorderSectionsSchema>;
export type ToggleSectionDraftData = z.infer<typeof toggleSectionDraftSchema>;
