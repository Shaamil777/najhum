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
import ImageSection from '@/components/solutions/ImageSection';
import VideoSection from '@/components/solutions/VideoSection';
import GraphSection from '@/components/solutions/GraphSection';
import ComparisonTableSection from '@/components/solutions/ComparisonTableSection';
import ProductCardServer from '@/components/solutions/ProductCardServer';
import type { Metadata } from 'next';
import { createSectionSchema } from '@/lib/validation/section-schemas';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let solution = null;
  try {
    solution = await getSolutionBySlug(slug, false);
  } catch (err) {
    console.error("Failed to query solution for metadata:", err);
  }

  if (!solution) {
    return {
      title: 'Solution Not Found',
    };
  }

  return {
    title: `${solution.title}${solution.isDraft ? ' (Draft)' : ''} | Najhum Technologies`,
    description: solution.metaDescription || solution.title,
    openGraph: {
      title: `${solution.title}${solution.isDraft ? ' (Draft)' : ''}`,
      description: solution.metaDescription || solution.title,
      type: 'website',
    },
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch solution (allows draft previewing so admins and testers don't get 404)
  let solution = null;
  try {
    solution = await getSolutionBySlug(slug, false);
  } catch (error) {
    console.error(`Failed to load solution for slug "${slug}":`, error);
  }

  // Return 404 only if solution does not exist in database
  if (!solution) {
    notFound();
  }

  // Filter and sort sections (for drafts, include all configured sections; for published, show published sections)
  const sections = (solution.sections || [])
    .filter((section) => !solution.isDraft ? !section.isDraft : true)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen">
      {/* Draft Notification Banner */}
      {solution.isDraft && (
        <div className="bg-amber-500 text-white px-4 py-2.5 text-center text-sm font-semibold flex flex-wrap items-center justify-center gap-2 sticky top-0 z-50 shadow-md">
          <span>⚠️ Draft Mode — This solution page is currently unpublished.</span>
          <a
            href={`/admin/solutions/${solution.id}/edit`}
            className="underline font-bold hover:text-amber-100 ml-1 inline-flex items-center gap-1"
          >
            Open in Admin Editor to Publish →
          </a>
        </div>
      )}
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
            return <SolutionProductsServer key={section.id} solutionSlug={solution.slug} content={validated.data.content} />;
          
          case SectionType.IMAGE:
            return <ImageSection key={section.id} content={validated.data.content} />;

          case SectionType.VIDEO:
            return <VideoSection key={section.id} content={validated.data.content} />;

          case SectionType.GRAPH:
            return <GraphSection key={section.id} content={validated.data.content} />;

          case SectionType.COMPARISON_TABLE:
            return <ComparisonTableSection key={section.id} content={validated.data.content} />;

          case SectionType.PRODUCT_CARD:
            return <ProductCardServer key={section.id} solutionSlug={solution.slug} content={validated.data.content} />;

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
