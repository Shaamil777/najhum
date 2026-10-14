"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

interface SolutionItem {
  id: string;
  title: string;
  slug: string;
  metaDescription?: string | null;
  coverImage?: string | null;
  sections?: Array<{
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any;
  }>;
  images?: Array<{
    url: string;
    altText?: string | null;
  }>;
}

interface PlatformSolutionsCarouselProps {
  solutions: SolutionItem[];
  platformId: string;
  title?: string;
  eyebrow?: string;
  description?: string;
}

export default function PlatformSolutionsCarousel({
  solutions,
  platformId,
  title,
  description = "Production-grade, end-to-end industrial solutions built on our proven hardware and cloud architecture.",
}: PlatformSolutionsCarouselProps) {
  if (!solutions || solutions.length === 0) return null;

  const defaultTitle = (
    <>
      Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Solutions</span>
    </>
  );

  return (
    <section className="relative w-full py-10 md:py-14 bg-slate-50/60 border-y border-slate-200/60 overflow-hidden font-sans">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1536px] relative z-10">
        {/* Header - Compact, no badge saying Solutions & Architectures, no nav buttons */}
        <div className="max-w-3xl mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black font-display text-slate-900 leading-tight tracking-tight">
            {title ?? defaultTitle}
          </h2>

          {description && (
            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed mt-2 max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Swiper Carousel with Standardized Card Sizes */}
        <div className="w-full">
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={18}
            slidesPerView={1.15}
            grabCursor={true}
            freeMode={{
              enabled: true,
              momentum: true,
              momentumRatio: 0.85,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.1,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 3.1,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 3.8,
                spaceBetween: 22,
              },
            }}
            className="w-full !overflow-visible cursor-grab active:cursor-grabbing pb-2"
          >
            {solutions.map((solution, idx) => {
              const cardImage = solution.coverImage || solution.images?.[0]?.url;
              const heroSection = solution.sections?.find((s) => s.type === "HERO")?.content;
              const subtitle =
                solution.metaDescription ||
                heroSection?.subheading ||
                "Production-ready deployment framework and cloud connectivity.";

              const codeNumber = `SOL-${String(idx + 1).padStart(2, "0")}`;

              return (
                <SwiperSlide key={solution.id} className="h-auto">
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="group relative bg-[#edf4ff] border border-blue-100 rounded-[1.75rem] p-5 sm:p-6 flex flex-col justify-between h-[270px] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden select-none"
                  >
                    {/* Background Graphic / Image with smooth gradient fade matching CropifAI / About style */}
                    <div className="absolute top-0 right-0 bottom-0 w-[56%] sm:w-[58%] pointer-events-none overflow-hidden rounded-r-[1.75rem]">
                      {cardImage ? (
                        <img
                          src={cardImage}
                          alt={solution.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full relative bg-gradient-to-br from-blue-100/60 to-indigo-100/40">
                          {/* Geometric blueprint mesh */}
                          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]" />
                        </div>
                      )}
                      {/* Gradient overlay so text on left stays 100% crisp and readable */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#edf4ff] via-[#edf4ff]/90 to-transparent" />
                    </div>

                    {/* Floating Corner Icon Badge */}
                    <div className="absolute top-4 right-4 z-10 pointer-events-none">
                      <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-white/80 shadow-xs flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                        <Layers className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Card Content Top & Middle */}
                    <div className="relative z-10 max-w-[64%]">
                      {/* Code / Platform indicator */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">
                          {codeNumber}
                        </span>
                        <div className="w-5 h-px bg-slate-300" />
                      </div>

                      {/* Standardized Title */}
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-2 tracking-tight line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">
                        {solution.title}
                      </h3>

                      {/* Standardized Subtitle / Description */}
                      <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                        {subtitle}
                      </p>
                    </div>

                    {/* Card CTA Bottom */}
                    <div className="relative z-10 pt-3 mt-auto flex items-center">
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 group-hover:text-blue-700">
                        <span>View Solution</span>
                        <div className="w-6 h-6 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:bg-blue-600 group-hover:text-white">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
