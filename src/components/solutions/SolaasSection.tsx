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
  CheckCircle2,
  Zap,
  Layers
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
  Zap,
  Layers,
];

function getSolaasIcon(title?: string, index: number = 0) {
  const t = (title || "").toLowerCase();
  if (t.includes("capex") || t.includes("cost") || t.includes("invest") || t.includes("price") || t.includes("budget") || t.includes("expense")) {
    return DollarSign;
  }
  if (t.includes("manage") || t.includes("support") || t.includes("service") || t.includes("config") || t.includes("maintenance")) {
    return Wrench;
  }
  if (t.includes("scale") || t.includes("growth") || t.includes("expand") || t.includes("capacity")) {
    return BarChart3;
  }
  if (t.includes("innovat") || t.includes("update") || t.includes("continuous") || t.includes("firmware")) {
    return RefreshCcw;
  }
  if (t.includes("platform") || t.includes("access") || t.includes("api") || t.includes("multi") || t.includes("mobile") || t.includes("web")) {
    return Layout;
  }
  return SOLAAS_ICONS[index % SOLAAS_ICONS.length];
}

export default function SolaasSection({ content = {} }: { content?: SolaasContent }) {
  const cards = content.cards || defaultSolaasContent.cards || [];
  const heading = content.heading || defaultSolaasContent.heading;
  const bodyText = content.bodyText || defaultSolaasContent.bodyText;

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-24 lg:py-32 bg-white text-neutral-900 overflow-hidden border-b border-neutral-200">
      {/* Precision Ambient Lighting & Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <Container className="relative z-10" size="xl">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 uppercase font-display leading-[1.12] [text-wrap:balance]">
            {heading}
          </h2>

          {bodyText && (
            <p className="mt-4 text-base sm:text-lg text-neutral-500 leading-relaxed max-w-2xl [text-wrap:pretty]">
              {bodyText}
            </p>
          )}
        </div>

        {/* Balanced Responsive Grid */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {cards.map((card, i) => {
            const IconComp = getSolaasIcon(card.title, i);

            // Responsive card sizing based on count:
            // For 5 cards: 3 on top row, 2 centered on bottom row
            // For 4 cards: 2 on top, 2 on bottom (or 4 on wide)
            // For 3 cards: 3 across
            const cardWidthClass = 
              cards.length === 1 
                ? 'w-full max-w-lg'
                : cards.length === 2 
                ? 'w-full md:w-[calc(50%-16px)] max-w-xl'
                : cards.length === 4 
                ? 'w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]'
                : 'w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)]';

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className={`${cardWidthClass} flex flex-col justify-between p-8 rounded-2xl border border-neutral-200/90 bg-white hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Top Accent Gradient Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Corner Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all pointer-events-none" />

                <div>
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center text-primary group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300 shadow-xs">
                      <IconComp className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Title (Enforcing min-height clamp to align row heights) */}
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 uppercase tracking-tight line-clamp-2 min-h-[3rem] flex items-center group-hover:text-primary transition-colors leading-snug">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-neutral-500 group-hover:text-neutral-600 leading-relaxed line-clamp-4 font-normal">
                    {card.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-neutral-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    Subscription Benefit
                  </span>
                  <span className="w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                </div>

                {/* Bottom Active Line on Hover */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
