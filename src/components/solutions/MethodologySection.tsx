"use client";

import React from "react";
import type { MethodologyContent } from "@/types/section";
import { 
  CheckCircle2, 
  ArrowRight,
  Workflow, 
  Cpu, 
  Settings, 
  Activity, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Database 
} from "lucide-react";
import { Container } from "@/design-system/primitives/layout/Container";

const stepIcons = [Workflow, Cpu, Settings, Activity, Layers, Zap, ShieldCheck, Database];

export default function MethodologySection({ content }: { content: MethodologyContent }) {
  const steps = content.steps || [];

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden bg-white text-neutral-900 border-b border-neutral-200">
      {/* Precision Ambient Lighting & Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <Container className="relative z-10" size="xl">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 uppercase font-display leading-[1.12] [text-wrap:balance]">
            {content.heading}
          </h2>

          {content.bodyText && (
            <p className="mt-4 text-base sm:text-lg text-neutral-500 leading-relaxed max-w-2xl [text-wrap:pretty]">
              {content.bodyText}
            </p>
          )}
        </div>

        {/* Steps Symmetrical Grid */}
        <div className={`grid gap-6 lg:gap-8 ${
          steps.length === 1 
            ? 'grid-cols-1 max-w-lg mx-auto'
            : steps.length === 2 
            ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {steps.map((step, index) => {
            const Icon = stepIcons[index % stepIcons.length];
            return (
              <div
                key={index}
                className="h-full flex flex-col justify-between p-8 rounded-2xl border border-neutral-200/90 bg-white hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Top Accent Gradient Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Subtle Corner Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all pointer-events-none" />

                <div>
                  {/* Header Icon */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center text-primary group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300 shadow-xs">
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 uppercase tracking-tight line-clamp-2 leading-snug group-hover:text-primary transition-colors min-h-[3rem] flex items-center">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-neutral-500 group-hover:text-neutral-600 leading-relaxed line-clamp-4 font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-neutral-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    Execution Standard
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] uppercase text-neutral-400 group-hover:text-primary transition-colors">
                    Methodology
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
