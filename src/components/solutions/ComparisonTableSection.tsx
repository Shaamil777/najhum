"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ComparisonTableSectionContent } from "@/types/section";

interface ComparisonTableSectionProps {
  content: ComparisonTableSectionContent;
}

export default function ComparisonTableSection({ content }: ComparisonTableSectionProps) {
  const { header, items = [], footer } = content;

  if (!items || items.length === 0) return null;

  return (
    <section className="w-full relative overflow-hidden font-sans border-b border-slate-200/60">
      
      {/* Background Split (Desktop Only) matching Evoltics style */}
      <div className="absolute inset-0 pointer-events-none hidden lg:flex">
        {/* Left Side: Traditional */}
        <div className="w-1/2 bg-white relative overflow-hidden comparison-bg-left">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-slate-100/60 rounded-full blur-[120px]" />
        </div>
        {/* Right Side: Modern Solution */}
        <div className="w-1/2 bg-blue-50/40 relative overflow-hidden comparison-bg-right">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[120px]" />
        </div>
      </div>

      <div className="container mx-auto relative z-10 max-w-[1400px]">
        
        {/* ════════════════════════════════════════════════════════════════════════
            DESKTOP SPLIT VIEW (lg and up)
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid grid-cols-2 gap-8 xl:gap-28">
          
          {/* LEFT COLUMN: Traditional */}
          <div className="py-24 xl:py-32 flex flex-col items-end bg-transparent">
            {header.eyebrow && (
              <span className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3 text-right w-full">
                {header.eyebrow}
              </span>
            )}
            <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-slate-500 mb-14 text-right w-full">
              {header.leftTitle}
            </h2>

            <div className="space-y-6 w-full flex flex-col items-end">
              {items.map((item, idx) => {
                let staggerClass = "";
                if (idx % 3 === 0) staggerClass = "mr-10";
                if (idx % 3 === 1) staggerClass = "mr-0";
                if (idx % 3 === 2) staggerClass = "mr-14";

                return (
                  <motion.div
                    key={`desktop-trad-${item.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className={`bg-white border border-slate-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-7 max-w-[420px] w-full transition-transform hover:-translate-y-1 ${staggerClass}`}
                  >
                    <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1.5 block">
                      {item.traditional.title}
                    </span>
                    <h4 className="text-base font-semibold text-slate-800 mb-2 leading-snug">
                      {item.traditional.description}
                    </h4>
                    <p className="text-[13px] text-slate-500 leading-relaxed">
                      {item.traditional.details}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Left Col Bottom Tag */}
            {footer?.leftLabel && (
              <div className="mt-12 w-full max-w-[400px] text-right">
                <p className="text-xs text-slate-500">
                  {footer.leftLabel}{" "}
                  <span className="font-bold text-slate-700">{footer.leftValue}</span>
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Modern Platform Solution */}
          <div className="py-24 xl:py-32 flex flex-col items-start bg-transparent">
            {header.eyebrow && (
              <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 text-left w-full">
                Proven Advantage
              </span>
            )}
            <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-slate-900 mb-14 text-left w-full">
              {header.rightTitlePart1}{" "}
              <span className="text-primary italic font-serif font-normal">
                {header.rightTitlePart2}
              </span>
            </h2>

            <div className="space-y-6 w-full flex flex-col items-start">
              {items.map((item, idx) => {
                let staggerClass = "";
                if (idx % 3 === 0) staggerClass = "ml-0";
                if (idx % 3 === 1) staggerClass = "ml-10";
                if (idx % 3 === 2) staggerClass = "ml-5";

                return (
                  <motion.div
                    key={`desktop-sol-${item.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className={`bg-[#f6f9fc] backdrop-blur-sm border border-primary/20 shadow-[0_8px_30px_rgb(37,99,235,0.06)] rounded-[2rem] p-7 max-w-[420px] w-full transition-transform hover:-translate-y-1 ${staggerClass}`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold tracking-wider text-primary uppercase mb-1.5 block">
                          {item.solution.title}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                          {item.solution.description}
                        </h4>
                        <p className="text-[13px] text-slate-600 leading-relaxed">
                          {item.solution.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Col Bottom Tag */}
            {footer?.rightLabel && (
              <div className="mt-12 w-full max-w-[400px] text-left">
                <p className="text-xs text-primary/80">
                  {footer.rightLabel}{" "}
                  <span className="font-bold text-primary">{footer.rightValue}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════════
            MOBILE COMBINED VIEW (< lg)
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="flex lg:hidden flex-col items-center px-4 sm:px-6 py-16 bg-blue-50/20 comparison-mobile-container">
          
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-8 text-center w-full">
            {header.leftTitle}{" "}
            <span className="text-slate-400 font-normal">vs</span>{" "}
            <span className="text-primary italic font-serif">
              {header.rightTitlePart1} {header.rightTitlePart2}
            </span>
          </h2>

          <div className="space-y-4 w-full max-w-md md:max-w-3xl">
            {items.map((item, idx) => (
              <motion.div
                key={`mobile-combined-${item.id}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 md:p-6 w-full flex flex-col md:flex-row md:items-stretch gap-4 md:gap-0"
              >
                {/* Traditional Side */}
                <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6 mb-2 md:mb-0">
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1 block">
                    {header.leftTitle}: {item.traditional.title}
                  </span>
                  <h4 className="text-sm font-semibold text-slate-500 leading-snug line-through decoration-slate-300">
                    {item.traditional.description}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2">
                    {item.traditional.details}
                  </p>
                </div>

                {/* Solution Side */}
                <div className="w-full md:w-1/2 md:pl-6 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-primary uppercase mb-1 block">
                      {header.rightTitlePart1}: {item.solution.title}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.solution.description}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      {item.solution.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
