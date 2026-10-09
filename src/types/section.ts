/**
 * Section Content Type Definitions
 * 
 * TypeScript types for all section content structures.
 * Each section type has its own content interface.
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7
 */

/**
 * Section Type Enum
 * Matches Prisma schema SectionType enum
 */
export enum SectionType {
  HERO = 'HERO',
  INTRO = 'INTRO',
  CHALLENGE = 'CHALLENGE',
  FEATURES = 'FEATURES',
  BENEFITS = 'BENEFITS',
  TESTIMONIALS = 'TESTIMONIALS',
  CTA = 'CTA',
  CUSTOM = 'CUSTOM',
  USE_CASES = 'USE_CASES',
  METHODOLOGY = 'METHODOLOGY',
  SOLAAS = 'SOLAAS',
}

/**
 * Hero Section Content
 * Large header with background image and CTA
 */
export interface HeroContent {
  heading: string;
  subheading: string;
  backgroundImage?: string;
  ctaText: string;
  ctaLink: string;
}

/**
 * Intro Section Content
 * Introduction text with optional image
 */
export interface IntroContent {
  heading: string;
  bodyText: string;
  image?: string;
  eyebrow?: string;
  summary?: string;
  bodyFormat?: 'text' | 'html';
  imageAlt?: string;
  imageCaption?: string;
  imagePosition?: 'left' | 'right';
  theme?: 'light' | 'dark';
  highlights?: { title: string; description?: string }[];
  stats?: { value: string; label: string }[];
  buttonText?: string;
  buttonLink?: string;
}

/**
 * Single Feature Item
 */
export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

/**
 * Features Section Content
 * Multiple feature items in a grid/list
 */
export interface FeaturesContent {
  features: Feature[];
}

/**
 * Single Benefit Item
 */
export interface Benefit {
  title: string;
  description: string;
  image?: string;
}

/**
 * Benefits Section Content
 * Multiple benefits with optional images
 */
export interface BenefitsContent {
  benefits: Benefit[];
}

/**
 * Single Testimonial Item
 */
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

/**
 * Testimonials Section Content
 * Customer testimonials/reviews
 */
export interface TestimonialsContent {
  testimonials: Testimonial[];
}

/**
 * CTA (Call-to-Action) Section Content
 * Prominent call to action with buttons
 */
export interface CTAContent {
  heading: string;
  bodyText: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

/**
 * Custom Section Content
 * Freeform HTML content
 */
export interface CustomContent {
  heading: string;
  bodyHtml: string;
}

/**
 * Single Challenge Item
 */
export interface ChallengeItem {
  title: string;
  description: string;
  category?: string;
  exploreLink?: string;
}

/**
 * Challenge Section Content
 */
export interface ChallengeContent {
  heading: string;
  description?: string;
  challenges: ChallengeItem[];
}

/**
 * Single Use Case Tab
 */
export interface UseCaseTab {
  id: string;
  label: string;
  solutionDetails: string;
  statValue: string;
  statDescription: string;
  bullets: string[];
}

/**
 * Use Cases Section Content
 */
export interface UseCasesContent {
  eyebrow: string;
  heading: string;
  tabs: UseCaseTab[];
}

/**
 * Single Methodology Step
 */
export interface MethodologyStep {
  title: string;
  description: string;
}

/**
 * Methodology Section Content
 */
export interface MethodologyContent {
  eyebrow: string;
  heading: string;
  bodyText: string;
  steps: MethodologyStep[];
}

/**
 * SolaaS Section Content
 * Static component, no editable content required
 */
export interface SolaasContent {
  eyebrow?: string;
  heading?: string;
  bodyText?: string;
  cards?: { title: string; description: string }[];
}

/**
 * Union type for all section content types
 * Used for type-safe section content handling
 */
export type SectionContent =
  | HeroContent
  | IntroContent
  | ChallengeContent
  | FeaturesContent
  | BenefitsContent
  | TestimonialsContent
  | CTAContent
  | CustomContent
  | UseCasesContent
  | MethodologyContent
  | SolaasContent;

/**
 * Section with typed content
 * Extends base section with discriminated union
 */
export interface TypedSection {
  id: string;
  solutionId: string;
  type: SectionType;
  order: number;
  isDraft: boolean;
  content: SectionContent;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Type guard to check section type
 */
export function isHeroContent(content: SectionContent): content is HeroContent {
  return 'heading' in content && 'subheading' in content && 'ctaText' in content;
}

export function isIntroContent(content: SectionContent): content is IntroContent {
  return 'heading' in content && 'bodyText' in content && !('ctaText' in content);
}

export function isChallengeContent(content: SectionContent): content is ChallengeContent {
  return 'challenges' in content;
}

export function isFeaturesContent(content: SectionContent): content is FeaturesContent {
  return 'features' in content;
}

export function isBenefitsContent(content: SectionContent): content is BenefitsContent {
  return 'benefits' in content;
}

export function isTestimonialsContent(content: SectionContent): content is TestimonialsContent {
  return 'testimonials' in content;
}

export function isCTAContent(content: SectionContent): content is CTAContent {
  return 'primaryButtonText' in content && 'primaryButtonLink' in content;
}

export function isCustomContent(content: SectionContent): content is CustomContent {
  return 'bodyHtml' in content;
}

export function isUseCasesContent(content: SectionContent): content is UseCasesContent {
  return 'tabs' in content;
}

export function isMethodologyContent(content: SectionContent): content is MethodologyContent {
  return 'steps' in content;
}
