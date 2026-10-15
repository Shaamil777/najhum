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
  PRODUCTS_CAROUSEL = 'PRODUCTS_CAROUSEL',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  GRAPH = 'GRAPH',
  COMPARISON_TABLE = 'COMPARISON_TABLE',
  PRODUCT_CARD = 'PRODUCT_CARD',
}

/**
 * Hero Section Content
 * Large header with background image and CTA
 */
export interface HeroContent {
  layout?: 'centered' | 'hero-split' | 'hero-video' | 'hero-editorial';
  eyebrow?: string;
  videoUrl?: string;
  imageAlt?: string;
  mediaCards?: { title: string; image?: string; imageAlt?: string }[];
  heading: string;
  subheading: string;
  badge?: string;
  backgroundImage?: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

/**
 * Intro Section Content
 * Introduction text with optional image
 */
export interface IntroContent {
  heading: string;
  headingAccent?: string;
  bodyText: string;
  image?: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  eyebrow?: string;
  summary?: string;
  bodyFormat?: 'text' | 'html';
  imageAlt?: string;
  imageCaption?: string;
  imagePosition?: 'left' | 'right';
  theme?: 'light' | 'dark';
  surfaceTone?: 'warm' | 'cool' | 'white';
  accentTone?: 'blue' | 'teal' | 'clay';
  imageLayout?: 'single' | 'collage';
  headingStyle?: 'uppercase' | 'sentence';
  decorationStyle?: 'none' | 'grid' | 'lines';
  animationStyle?: 'none' | 'subtle';
  metricStyle?: 'cards' | 'inline';
  featuredMetricIndex?: number;
  featuredMetricTone?: 'soft' | 'blue';
  buttonStyle?: 'solid' | 'outline';
  highlights?: { title: string; description?: string; icon?: 'network' | 'layers' | 'shield' | 'cpu' | 'chart' | 'none'; tone?: 'white' | 'soft' | 'neutral' }[];
  stats?: { value: string; label: string }[];
  flowSteps?: { label: string }[];
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
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  features: Feature[];
}

/**
 * Single Benefit Item
 */
export interface Benefit {
  title: string;
  description: string;
  image?: string;
  metricValue?: string;
  metricLabel?: string;
}

/**
 * Benefits Section Content
 * Multiple benefits with optional images
 */
export interface BenefitsContent {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
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
  eyebrow?: string;
  heading?: string;
  subheading?: string;
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
  rawData?: unknown;
  layout?: 'rich-text' | 'faq' | 'case-studies' | 'resources' | 'statistics' | 'image-cards' | 'overlay-cards' | 'image-bento' | 'split-stories' | 'video-cards';
  eyebrow?: string;
  theme?: 'light' | 'soft' | 'dark';
  headingAlign?: 'left' | 'center';
  mediaRatio?: '16:9' | '4:3' | '1:1' | '3:4';
  columns?: 2 | 3 | 4;
  entries?: { title: string; description: string; image?: string; imageAlt?: string; videoUrl?: string; aspectRatio?: '16:9' | '4:3' | '1:1' | '3:4'; link?: string; linkText?: string; value?: string }[];
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
  eyebrow?: string;
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
  eyebrow?: string;
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
 * Products Carousel Section Content
 */
export interface ProductsCarouselContent {
  heading?: string;
  description?: string;
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
  | SolaasContent
  | ProductsCarouselContent
  | ImageSectionContent
  | VideoSectionContent
  | GraphSectionContent
  | ComparisonTableSectionContent
  | ProductCardSectionContent;

export interface ProductsCarouselContent {
  heading?: string;
  description?: string;
}

export interface ImageSectionContent {
  eyebrow?: string;
  heading?: string;
  description?: string;
  imageUrl: string;
  altText?: string;
  caption?: string;
  layout?: 'full-width' | 'contained' | 'card' | 'split-left' | 'split-right';
  aspectRatio?: '16:9' | '4:3' | '21:9' | 'auto';
  rounded?: boolean;
  fit?: 'cover' | 'contain';
}

export interface VideoSectionContent {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  videoUrl: string;
  posterUrl?: string;
  layout?: 'contained' | 'cinema' | 'split-right';
  caption?: string;
}

export interface GraphDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  unit?: string;
}

export interface GraphMetric {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface GraphSectionContent {
  eyebrow?: string;
  heading?: string;
  description?: string;
  chartType?: 'bar' | 'comparison-bars' | 'telemetry-stream';
  primaryLabel?: string;
  secondaryLabel?: string;
  dataPoints: GraphDataPoint[];
  metrics?: GraphMetric[];
}

export interface ComparisonItem {
  id: string;
  traditional: {
    title: string;
    description: string;
    details: string;
  };
  solution: {
    title: string;
    description: string;
    details: string;
  };
}

export interface ComparisonTableSectionContent {
  header: {
    leftTitle: string;
    rightTitlePart1: string;
    rightTitlePart2: string;
    eyebrow?: string;
  };
  items: ComparisonItem[];
  footer?: {
    leftLabel?: string;
    leftValue?: string;
    rightLabel?: string;
    rightValue?: string;
  };
}

export interface ProductCardSectionContent {
  eyebrow?: string;
  heading?: string;
  description?: string;
  displayMode?: 'solution-tagged' | 'all' | 'manual';
  productIds?: string[];
  columns?: number;
}

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

export function isProductsCarouselContent(content: SectionContent): content is ProductsCarouselContent {
  // It's hard to distinguish based purely on optional properties, 
  // but usually it's passed with the PRODUCTS_CAROUSEL section type.
  // We can just return true if it's not any of the other types that have required specific keys.
  return true;
}
