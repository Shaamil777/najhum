/**
 * Dynamic Solution Page
 * 
 * Public-facing page that renders solution content based on slug.
 * Server component with static generation and on-demand revalidation.
 */

import { notFound } from 'next/navigation';
import { getSolutionBySlug } from '@/lib/db/queries/solutions';
import { SectionType } from '@/types/section';
import HeroSection from '@/components/solutions/HeroSection';
import IntroSection from '@/components/solutions/IntroSection';
import FeaturesSection from '@/components/solutions/FeaturesSection';
import BenefitsSection from '@/components/solutions/BenefitsSection';
import TestimonialsSection from '@/components/solutions/TestimonialsSection';
import CTASection from '@/components/solutions/CTASection';
import CustomSection from '@/components/solutions/CustomSection';
import ChallengeSection from '@/components/solutions/ChallengeSection';
import UseCasesSection from '@/components/solutions/UseCasesSection';
import MethodologySection from '@/components/solutions/MethodologySection';
import SolaasSection from '@/components/solutions/SolaasSection';
import SolutionProductsServer from '@/components/solutions/SolutionProductsServer';
import type { Metadata } from 'next';
import { createSectionSchema } from '@/lib/validation/section-schemas';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug, true);

  if (!solution || solution.isDraft) {
    return {
      title: 'Solution Not Found',
    };
  }

  return {
    title: solution.title,
    description: solution.metaDescription || solution.title,
    openGraph: {
      title: solution.title,
      description: solution.metaDescription || solution.title,
      type: 'website',
    },
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch solution with published sections only
  const solution = await getSolutionBySlug(slug, true);

  // Return 404 if solution not found or is draft
  if (!solution || solution.isDraft) {
    notFound();
  }

  // Filter and sort sections (only published, ordered by order field)
  const sections = (solution.sections || [])
    .filter((section) => !section.isDraft)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen">
      {/* Render sections dynamically based on type */}
      {sections.map((section) => {
        const validated = createSectionSchema.safeParse({ type: section.type, content: section.content });
        if (!validated.success) return null;
        switch (validated.data.type) {
          case SectionType.HERO:
            return <HeroSection key={section.id} content={validated.data.content} />;
          
          case SectionType.INTRO:
            return <IntroSection key={section.id} content={validated.data.content} />;
          
          case SectionType.CHALLENGE:
            return <ChallengeSection key={section.id} content={validated.data.content} />;
          
          case SectionType.FEATURES:
            return <FeaturesSection key={section.id} content={validated.data.content} />;
          
          case SectionType.BENEFITS:
            return <BenefitsSection key={section.id} content={validated.data.content} />;
          
          case SectionType.TESTIMONIALS:
            return <TestimonialsSection key={section.id} content={validated.data.content} />;
          
          case SectionType.CTA:
            return <CTASection key={section.id} content={validated.data.content} />;
          
          case SectionType.CUSTOM:
            return <CustomSection key={section.id} content={validated.data.content} />;
          
          case SectionType.USE_CASES:
            return <UseCasesSection key={section.id} content={validated.data.content} />;
          
          case SectionType.METHODOLOGY:
            return <MethodologySection key={section.id} content={validated.data.content} />;
          
          case SectionType.SOLAAS:
            return <SolaasSection key={section.id} content={validated.data.content} />;
          
          case SectionType.PRODUCTS_CAROUSEL:
            return <SolutionProductsServer key={section.id} solutionSlug={solution.slug} />;
          
          default:
            return null;
        }
      })}

      {/* Empty state if no sections */}
      {sections.length === 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {solution.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This solution is currently being set up. Please check back later.
          </p>
        </div>
      )}
    </main>
  );
}

// Read current published content at request time; builds do not require a database.
export const dynamic = 'force-dynamic';
