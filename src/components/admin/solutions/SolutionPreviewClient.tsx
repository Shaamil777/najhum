"use client";

import { useState } from "react";
import Link from "next/link";
import { Monitor, Tablet, Smartphone, ArrowLeft, ExternalLink, Eye } from "lucide-react";
import { SectionType } from "@/types/section";
import { createSectionSchema } from "@/lib/validation/section-schemas";
import HeroSection from "@/components/solutions/HeroSection";
import IntroSection from "@/components/solutions/IntroSection";
import FeaturesSection from "@/components/solutions/FeaturesSection";
import BenefitsSection from "@/components/solutions/BenefitsSection";
import TestimonialsSection from "@/components/solutions/TestimonialsSection";
import CTASection from "@/components/solutions/CTASection";
import CustomSection from "@/components/solutions/CustomSection";
import ChallengeSection from "@/components/solutions/ChallengeSection";
import UseCasesSection from "@/components/solutions/UseCasesSection";
import MethodologySection from "@/components/solutions/MethodologySection";
import SolaasSection from "@/components/solutions/SolaasSection";
import PlatformProductsCarousel from "@/components/shared/PlatformProductsCarousel";
import ImageSection from "@/components/solutions/ImageSection";
import VideoSection from "@/components/solutions/VideoSection";
import GraphSection from "@/components/solutions/GraphSection";
import ComparisonTableSection from "@/components/solutions/ComparisonTableSection";
import ProductCardSection from "@/components/solutions/ProductCardSection";

interface SectionItem {
  id: string;
  type: SectionType | string;
  order: number;
  isDraft: boolean;
  content: unknown;
}

interface SolutionData {
  id: string;
  slug: string;
  title: string;
  metaDescription?: string | null;
  isDraft: boolean;
  sections?: SectionItem[];
}

interface ProductItem {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  brochureUrl?: string | null;
  features?: unknown;
  details?: unknown;
}

interface SolutionPreviewClientProps {
  solution: SolutionData;
  products: ProductItem[];
}

type DeviceView = "desktop" | "tablet" | "mobile";

export default function SolutionPreviewClient({ solution, products }: SolutionPreviewClientProps) {
  const [device, setDevice] = useState<DeviceView>("desktop");
  const [showDraftNotice, setShowDraftNotice] = useState(true);

  const sections = (solution.sections || []).slice().sort((a, b) => a.order - b.order);

  const getContainerClass = () => {
    switch (device) {
      case "mobile":
        return "max-w-[390px] mx-auto border-8 border-slate-800 rounded-[40px] shadow-2xl overflow-hidden my-6 bg-white min-h-[750px]";
      case "tablet":
        return "max-w-[768px] mx-auto border-8 border-slate-700 rounded-[28px] shadow-2xl overflow-hidden my-6 bg-white min-h-[850px]";
      case "desktop":
      default:
        return "w-full bg-white";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Sticky Preview Header */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left: Back & Title */}
          <div className="flex items-center gap-3">
            <Link
              href={`/admin/solutions/${solution.id}/edit`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Editor
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                  {solution.title}
                </h1>
                {solution.isDraft ? (
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Draft
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Published
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">/solutions/{solution.slug}</p>
            </div>
          </div>

          {/* Center: Device View Switcher */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setDevice("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                device === "desktop"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
              title="Desktop View (Full Width)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                device === "tablet"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tablet (768px)</span>
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                device === "mobile"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
              title="Mobile View (390px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile (390px)</span>
            </button>
          </div>

          {/* Right: Info & Actions */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 hidden md:inline">
              {sections.length} {sections.length === 1 ? "Section" : "Sections"}
            </span>
            {!solution.isDraft && (
              <a
                href={`/solutions/${solution.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                Live Page
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Draft Notification Banner */}
      {showDraftNotice && solution.isDraft && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>
              <strong>Draft Preview Mode:</strong> This page includes all configured sections (active and draft). Only published pages are publicly accessible.
            </span>
            <button
              onClick={() => setShowDraftNotice(false)}
              className="ml-auto text-amber-700 hover:text-amber-900 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Preview Container */}
      <main className="flex-1 w-full overflow-y-auto">
        <div className={getContainerClass()}>
          {sections.length === 0 ? (
            <div className="py-24 text-center px-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Sections Configured</h2>
              <p className="text-gray-500 text-sm mb-6">
                Add sections in the editor to preview how your landing page looks across devices.
              </p>
              <Link
                href={`/admin/solutions/${solution.id}/edit`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Open Editor & Add Sections
              </Link>
            </div>
          ) : (
            sections.map((section) => {
              const validated = createSectionSchema.safeParse({
                type: section.type,
                content: section.content,
              });

              if (!validated.success) {
                return (
                  <div key={section.id} className="p-4 bg-red-50 border-l-4 border-red-500 text-xs text-red-700">
                    <strong>Section Error ({section.type}):</strong> Content does not conform to the schema.
                  </div>
                );
              }

              const isSectionDisabled = section.isDraft;

              return (
                <div key={section.id} className="relative group">
                  {isSectionDisabled && (
                    <div className="bg-slate-900/80 text-white text-[11px] font-semibold px-3 py-1 flex items-center justify-between sticky top-12 z-20">
                      <span>⚠️ {section.type} Section (Disabled in production)</span>
                      <span className="text-slate-300">Visible in preview only</span>
                    </div>
                  )}

                  {(() => {
                    switch (validated.data.type) {
                      case SectionType.HERO:
                        return <HeroSection content={validated.data.content} />;
                      case SectionType.INTRO:
                        return <IntroSection content={validated.data.content} />;
                      case SectionType.CHALLENGE:
                        return <ChallengeSection content={validated.data.content} />;
                      case SectionType.FEATURES:
                        return <FeaturesSection content={validated.data.content} />;
                      case SectionType.BENEFITS:
                        return <BenefitsSection content={validated.data.content} />;
                      case SectionType.TESTIMONIALS:
                        return <TestimonialsSection content={validated.data.content} />;
                      case SectionType.CTA:
                        return <CTASection content={validated.data.content} />;
                      case SectionType.CUSTOM:
                        return <CustomSection content={validated.data.content} />;
                      case SectionType.USE_CASES:
                        return <UseCasesSection content={validated.data.content} />;
                      case SectionType.METHODOLOGY:
                        return <MethodologySection content={validated.data.content} />;
                      case SectionType.SOLAAS:
                        return <SolaasSection content={validated.data.content} />;
                      case SectionType.PRODUCTS_CAROUSEL:
                        return products.length > 0 ? (
                          <PlatformProductsCarousel
                            products={products as any}
                            title={validated.data.content?.heading || "Compatible Ecosystem Hardware"}
                            description={validated.data.content?.description || "Field-proven edge appliances and devices engineered specifically to power this solution."}
                          />
                        ) : (
                          <div className="py-12 text-center text-sm text-gray-500 border border-dashed border-gray-200">
                            Products Carousel Section (No products currently tagged with &quot;{solution.slug}&quot;)
                          </div>
                        );
                      case SectionType.IMAGE:
                        return <ImageSection content={validated.data.content} />;
                      case SectionType.VIDEO:
                        return <VideoSection content={validated.data.content} />;
                      case SectionType.GRAPH:
                        return <GraphSection content={validated.data.content} />;
                      case SectionType.COMPARISON_TABLE:
                        return <ComparisonTableSection content={validated.data.content} />;
                      case SectionType.PRODUCT_CARD:
                        return <ProductCardSection content={validated.data.content} products={products as any} />;
                      default:
                        return null;
                    }
                  })()}
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
