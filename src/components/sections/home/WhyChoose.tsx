"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { homeContent } from "@/content/home";
import Link from "next/link";

export default function WhyChoose() {
  const { whyChoose } = homeContent;

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-24 overflow-hidden font-sans bg-white">
      
      {/* Background Split (Desktop Only) */}
      <div className="absolute inset-0 pointer-events-none hidden lg:flex">
        {/* Left Side Bg */}
        <div className="w-1/2 bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-200/40 rounded-full blur-[120px]" />
        </div>
        {/* Right Side Bg */}
        <div className="w-1/2 bg-blue-50/40 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
        </div>
      </div>

      <div className="container mx-auto relative z-10 max-w-[1400px] px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-0 lg:hidden relative z-20">
          <span className="text-sm font-semibold tracking-widest text-primary uppercase mb-4 flex items-center gap-4 before:h-px before:w-8 before:bg-blue-200 after:h-px after:w-8 after:bg-blue-200">
            {whyChoose.label}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 mb-6">
            Smarter. Unified. <span className="text-primary">Future-Ready.</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-500 max-w-2xl">
            {whyChoose.subtitle}
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════════════════════
            DESKTOP SPLIT VIEW (lg and up)
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid grid-cols-2 gap-8 xl:gap-32">
          
          {/* LEFT COLUMN: Traditional */}
          <div className="py-24 flex flex-col items-end bg-transparent">
            
            <h2 className="text-4xl font-medium tracking-tight text-zinc-600 mb-16 text-right w-full">
              Instead of
            </h2>

            <div className="space-y-6 w-full flex flex-col items-end">
              {whyChoose.features.map((f, idx) => {
                // simple stagger
                let staggerClass = "mr-6";
                if (idx % 3 === 0) staggerClass = "mr-12";
                if (idx % 3 === 1) staggerClass = "mr-0";
                
                return (
                  <motion.div
                    key={`desktop-trad-${idx}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={cn(
                      "bg-white border border-zinc-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-8 max-w-[420px] w-full transition-transform hover:-translate-y-1",
                      staggerClass
                    )}
                  >
                    <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-1.5 block">
                      {f.name}
                    </span>
                    <h4 className="text-base font-semibold text-zinc-800 leading-snug">
                      {f.competitor}
                    </h4>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Najhum */}
          <div className="py-24 flex flex-col items-start bg-transparent">
            
            <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 mb-16 text-left w-full">
              Najhum <span className="font-serif italic font-normal text-primary">gives</span>
            </h2>

            <div className="space-y-6 w-full flex flex-col items-start">
              {whyChoose.features.map((f, idx) => {
                let staggerClass = "ml-6";
                if (idx % 3 === 0) staggerClass = "ml-0";
                if (idx % 3 === 1) staggerClass = "ml-12";

                return (
                  <motion.div
                    key={`desktop-najhum-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={cn(
                      "bg-[#f6f9fc] backdrop-blur-sm border border-primary/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-primary/5 rounded-[2.5rem] p-8 max-w-[420px] w-full transition-transform hover:-translate-y-1",
                      staggerClass
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 shrink-0">
                        <Check className="w-5 h-5 text-primary" strokeWidth={3} />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold tracking-wider text-primary/70 uppercase mb-1.5 block">
                          {f.name}
                        </span>
                        <h4 className="text-base font-bold text-zinc-900 leading-snug">
                          {f.najhum}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════════
            MOBILE COMBINED VIEW (< lg)
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="flex lg:hidden flex-col items-center py-8">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-10 text-center w-full max-w-sm md:max-w-2xl">
            {whyChoose.competitorLabel} <span className="text-zinc-400 font-normal">vs</span> <span className="font-serif italic font-normal text-primary">{whyChoose.najhumLabel}</span>
          </h2>

          <div className="space-y-5 w-full max-w-md md:max-w-3xl">
            {whyChoose.features.map((f, idx) => (
              <motion.div
                key={`mobile-combined-${idx}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border border-border shadow-sm rounded-3xl p-5 sm:p-6 md:p-8 w-full relative overflow-hidden flex flex-col md:flex-row md:items-stretch gap-5 md:gap-0"
              >
                {/* Traditional Side */}
                <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-border/50 pb-5 md:pb-0 md:pr-8 mb-5 md:mb-0">
                  <span className="text-[10px] md:text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-1.5 md:mb-2 block">
                    Instead of: {f.name}
                  </span>
                  <h4 className="text-[14px] md:text-[15px] font-semibold text-zinc-500 leading-snug line-through decoration-zinc-300">
                    {f.competitor}
                  </h4>
                </div>

                {/* Najhum Side */}
                <div className="w-full md:w-1/2 relative md:pl-8">
                  <div className="absolute -left-5 sm:-left-6 md:-left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md opacity-70 hidden md:block" />
                  <div className="absolute -left-6 top-0 bottom-0 w-1 bg-primary rounded-r-md opacity-70 md:hidden" />
                  
                  <span className="text-[10px] md:text-[11px] font-bold tracking-wider text-primary uppercase mb-2 block">
                    {whyChoose.najhumLabel} Gives: {f.name}
                  </span>
                  <div className="flex items-start gap-2.5 md:gap-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0 mt-0.5" strokeWidth={3} />
                    <div>
                      <h4 className="text-[14px] md:text-[15px] font-bold text-zinc-900 leading-snug">
                        {f.najhum}
                      </h4>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 lg:mt-20 bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative z-20 max-w-5xl mx-auto">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                 <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                 <h4 className="text-lg md:text-xl font-bold text-zinc-900">Move from legacy limitations to limitless possibilities.</h4>
                 <p className="text-zinc-500 text-sm md:text-base max-w-xl">Najhum Platform empowers industries with real-time intelligence, automation, and efficiency at every level.</p>
              </div>
           </div>
           
           <div className="flex flex-col items-center md:items-end gap-3 flex-shrink-0 w-full md:w-auto mt-4 md:mt-0 md:pl-8 md:border-l border-zinc-100">
              <span className="text-sm font-medium text-zinc-500">Ready to transform your operations?</span>
              <Link href="/contact" className="w-full md:w-auto">
                <button className="w-full bg-primary hover:bg-blue-700 transition-colors text-white font-semibold py-3 px-8 rounded-full flex items-center justify-center gap-2">
                   Request a Demo <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
           </div>
        </div>

      </div>
    </section>
  );
}