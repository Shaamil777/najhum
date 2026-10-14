"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  Wrench, 
  BarChart3, 
  RefreshCcw, 
  Layout, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2 
} from "lucide-react";
import { defaultSolaasContent } from '@/content/solaas';
import type { SolaasContent } from '@/types/section';
import { Container } from '@/design-system/primitives/layout/Container';

const SOLAAS_ICONS = [
  DollarSign,
  Wrench,
  BarChart3,
  RefreshCcw,
  Layout,
  ShieldCheck,
];

export default function SolaasSection({ content = {} }: { content?: SolaasContent }) {
  const cards = content.cards || defaultSolaasContent.cards || [];
  const eyebrow = content.eyebrow || defaultSolaasContent.eyebrow || "SOLAAS DELIVERY MODEL";
  const heading = content.heading || defaultSolaasContent.heading;
  const bodyText = content.bodyText || defaultSolaasContent.bodyText;

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-20 lg:py-32 bg-neutral-950 text-white overflow-hidden border-b border-neutral-800">
      {/* Background Ambient Glow & Grid Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-[0.02]" />
      </div>

      <Container className="relative z-10" size="xl">
        {/* Section Header */}
        <div className="mb-16 lg:mb-20 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-bold tracking-widest uppercase text-primary-300 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.1] [text-wrap:balance]">
            {heading}
          </h2>

          {bodyText && (
            <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl [text-wrap:pretty]">
              {bodyText}
            </p>
          )}
        </div>

        {/* Responsive Balanced Grid (Never squishes 5 items into 1 row) */}
        <div className={`grid gap-6 lg:gap-8 justify-center ${
          cards.length === 1 
            ? 'grid-cols-1 max-w-md mx-auto'
            : cards.length === 2 
            ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
            : cards.length === 3 
            ? 'grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto'
            : cards.length === 4 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {cards.map((card, i) => {
            const IconComp = SOLAAS_ICONS[i % SOLAAS_ICONS.length];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="h-full flex flex-col justify-between p-7 rounded-2xl border border-neutral-800/90 bg-neutral-900/60 backdrop-blur-md hover:border-primary/50 hover:bg-neutral-900/90 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Corner Ambient Glow */}
                <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/15 transition-all duration-300 pointer-events-none" />

                <div>
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-800/60">
                      #{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title (2 lines clamp to keep row heights aligned) */}
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight line-clamp-2 min-h-[3rem] flex items-center group-hover:text-primary-100 transition-colors">
                    {card.title}
                  </h3>

                  {/* Description (4 lines clamp) */}
                  <p className="mt-3 text-sm text-neutral-400 group-hover:text-neutral-300 leading-relaxed line-clamp-4">
                    {card.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
                  <span className="flex items-center gap-1.5 font-medium text-neutral-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    Subscription Benefit
                  </span>
                  <span className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                </div>

                {/* Bottom active line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
