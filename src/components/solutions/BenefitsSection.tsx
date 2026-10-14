"use client";

import React from 'react';
import Image from 'next/image';
import type { BenefitsContent } from '@/types/section';
import { TrendingUp, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Container } from '@/design-system/primitives/layout/Container';

interface BenefitsSectionProps {
  content: BenefitsContent;
}

export default function BenefitsSection({ content }: BenefitsSectionProps) {
  const { benefits = [], heading, subheading } = content;

  if (!benefits || benefits.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-neutral-950 text-white border-b border-neutral-800">
      {/* Ambient Lighting & Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[160px]" />
        <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <Container className="relative z-10" size="xl">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24 flex flex-col items-center">


          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.1] [text-wrap:balance]">
            {heading || 'TRANSFORMATIVE RESULTS FOR ENTERPRISE OPERATORS'}
          </h2>

          {subheading && (
            <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed [text-wrap:pretty]">
              {subheading}
            </p>
          )}
        </div>

        {/* Alternating Showcase Rows */}
        <div className="space-y-20 lg:space-y-32">
          {benefits.map((benefit, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Text Content Column */}
                <div 
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  {/* Step Index & Metric Pill */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-neutral-800 text-primary border border-neutral-700/80">
                      Outcome #{String(index + 1).padStart(2, '0')}
                    </span>

                    {benefit.metricValue && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/20 border border-primary/30 text-white font-mono text-xs font-bold shadow-sm">
                        <TrendingUp className="w-3.5 h-3.5 text-primary-300" />
                        <span className="text-primary-200">{benefit.metricValue}</span>
                        {benefit.metricLabel && (
                          <span className="text-neutral-300 font-sans font-normal">
                            {benefit.metricLabel}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Title (2 lines clamp) */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight uppercase font-display line-clamp-2">
                    {benefit.title}
                  </h3>

                  {/* Description (4 lines clamp) */}
                  <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed line-clamp-4">
                    {benefit.description}
                  </p>

                  {/* Key Highlights list */}
                  <div className="mt-6 pt-6 border-t border-neutral-800/80 flex flex-wrap gap-4 text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      Measurable ROI
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      Guaranteed SLA
                    </span>
                  </div>
                </div>

                {/* Media Column */}
                <div 
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {benefit.image ? (
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
                      <Image
                        src={benefit.image}
                        alt={benefit.title}
                        fill
                        unoptimized
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    /* Fallback Tech Graphics Card if no image is uploaded */
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden border border-neutral-800/80 bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 p-8 sm:p-10 flex flex-col justify-between shadow-2xl">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                      <div className="flex items-center justify-between relative z-10">
                        <span className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                          <TrendingUp className="w-5 h-5" />
                        </span>
                        <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                          Verified Metric
                        </span>
                      </div>

                      <div className="relative z-10">
                        <span className="text-4xl sm:text-5xl font-black font-mono text-primary tracking-tight">
                          {benefit.metricValue || '100%'}
                        </span>
                        <p className="mt-2 text-sm text-neutral-300 font-medium">
                          {benefit.metricLabel || benefit.title}
                        </p>
                      </div>

                      <div className="relative z-10 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                        <span>Antigravity Architecture</span>
                        <span className="text-primary font-medium">Active Deployment</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}