"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import type { ChallengeContent } from '@/types/section';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ChallengeSectionProps {
  content: ChallengeContent;
}

export default function ChallengeSection({ content }: ChallengeSectionProps) {
  const { heading, description, challenges = [] } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [dimensions, setDimensions] = useState({ cardWidth: 760, stickyOffset: 120, paddingLeft: 80 });

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      const count = challenges.length;
      const stackGaps = Math.max(count - 1, 1);

      let cWidth: number;
      let padLeft: number;
      let rightMargin: number;
      let maxAllowedOffset: number;

      if (w >= 1536) {
        cWidth = 800;
        padLeft = 80;
        rightMargin = 40;
        maxAllowedOffset = 160;
      } else if (w >= 1280) {
        cWidth = 740;
        padLeft = 80;
        rightMargin = 32;
        maxAllowedOffset = 140;
      } else if (w >= 1024) {
        cWidth = 660;
        padLeft = 64;
        rightMargin = 28;
        maxAllowedOffset = 110;
      } else if (w >= 768) {
        cWidth = Math.min(Math.round(w * 0.72), 580);
        padLeft = 48;
        rightMargin = 24;
        maxAllowedOffset = 60;
      } else if (w >= 640) {
        cWidth = Math.min(Math.round(w * 0.82), 500);
        padLeft = 28;
        rightMargin = 20;
        maxAllowedOffset = 36;
      } else {
        padLeft = 16;
        rightMargin = 16;
        cWidth = Math.max(Math.min(w - 32, 360), 280);
        maxAllowedOffset = 16;
      }

      const availableStackSpace = w - padLeft - rightMargin;
      const spaceForOffsets = availableStackSpace - cWidth;

      let offset: number;
      if (spaceForOffsets > 0) {
        const computedOffset = Math.floor(spaceForOffsets / stackGaps);
        offset = Math.min(computedOffset, maxAllowedOffset);
      } else {
        offset = w < 640 ? 10 : 28;
        cWidth = Math.max(w - padLeft - rightMargin - (stackGaps * offset), 260);
      }

      const minOffset = w < 640 ? 8 : (w < 768 ? 20 : (w < 1024 ? 36 : 50));
      offset = Math.max(offset, minOffset);

      setDimensions({ cardWidth: cWidth, stickyOffset: offset, paddingLeft: padLeft });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [challenges.length]);

  const { cardWidth, stickyOffset: STICKY_OFFSET, paddingLeft } = dimensions;
  const GAP = 16; 
  const CARD_SPACING = cardWidth + GAP;
  const N = challenges.length;

  if (!challenges || challenges.length === 0) {
    return null;
  }

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-neutral-950 text-white relative border-b border-neutral-800"
      style={{ height: `${Math.max(300, N * 100)}vh` }}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-16 sm:py-20 lg:py-28">
        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />

        {/* Section Header */}
        <div className="px-6 md:px-12 lg:px-20 mb-8 sm:mb-12 shrink-0 max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-bold tracking-widest uppercase text-primary-300 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INDUSTRY LANDSCAPE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.08] uppercase font-display [text-wrap:balance]">
            {heading}
          </h2>
          {description && (
            <p className="mt-4 text-neutral-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl [text-wrap:pretty]">
              {description}
            </p>
          )}
        </div>

        {/* Cards Wrapper */}
        <div className="relative w-full h-[400px] sm:h-[450px] md:h-[480px] lg:h-[500px]">
          {challenges.map((challenge, index) => (
            <ChallengeCard 
              key={index}
              index={index}
              challenge={challenge}
              scrollYProgress={scrollYProgress}
              N={N}
              CARD_SPACING={CARD_SPACING}
              STICKY_OFFSET={STICKY_OFFSET}
              cardWidth={cardWidth}
              paddingLeft={paddingLeft}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  index: number;
  challenge: ChallengeContent['challenges'][0];
  scrollYProgress: MotionValue<number>;
  N: number;
  CARD_SPACING: number;
  STICKY_OFFSET: number;
  cardWidth: number;
  paddingLeft: number;
}

function ChallengeCard({ 
  index, 
  challenge, 
  scrollYProgress, 
  N, 
  CARD_SPACING, 
  STICKY_OFFSET, 
  cardWidth, 
  paddingLeft 
}: CardProps) {
  const x = useTransform(scrollYProgress, (p) => {
    const maxScroll = (N - 1) * (CARD_SPACING - STICKY_OFFSET);
    const currentScroll = p * maxScroll;
    const targetX = index * CARD_SPACING - currentScroll;
    const stickyX = index * STICKY_OFFSET;
    return Math.max(stickyX + paddingLeft, targetX + paddingLeft);
  });

  const isBrandColor = index % 2 === 1;
  const bgClass = isBrandColor 
    ? "bg-gradient-to-br from-[#4c3bcf] to-[#342896] border-[#6756f5]/40 text-white" 
    : "bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border-neutral-700/60 text-white";
  
  const textMutedClass = isBrandColor ? "text-violet-200" : "text-neutral-300";
  const textSubtleClass = isBrandColor ? "text-violet-300" : "text-neutral-400";
  const dotClass = isBrandColor ? "bg-violet-300 shadow-[0_0_12px_rgba(167,139,250,0.8)]" : "bg-primary shadow-[0_0_12px_rgba(76,59,207,0.8)]";

  return (
    <motion.div
      className={`absolute top-0 h-full border shadow-[-16px_0_40px_rgba(0,0,0,0.6)] backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden transition-colors ${bgClass}`}
      style={{
        x,
        width: `${cardWidth}px`,
        maxWidth: '800px',
        zIndex: index, 
      }}
    >
      <div className="p-6 sm:p-8 md:p-10 h-full flex flex-col justify-between relative">
        {/* Decorative Glowing Dot */}
        <div className={`absolute top-6 right-6 md:top-8 md:right-8 w-2.5 h-2.5 rounded-full ${dotClass}`} />

        {/* Top: Index, Title & Description (Enforcing line clamps for alignment) */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-white/10 ${textSubtleClass}`}>
              Step {String(index + 1).padStart(2, '0')}
            </span>
            {challenge.category && (
              <span className={`text-xs font-semibold uppercase tracking-wider ${textSubtleClass}`}>
                • {challenge.category}
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 leading-tight text-white pr-6 line-clamp-2">
            {challenge.title}
          </h3>

          <p className={`${textMutedClass} text-xs sm:text-sm md:text-base leading-relaxed line-clamp-4 md:line-clamp-5 font-normal`}>
            {challenge.description}
          </p>
        </div>

        {/* Bottom: Action Link */}
        <div className="pt-4 mt-auto border-t border-white/10 flex items-center justify-between text-xs sm:text-sm">
          <span className={`font-medium ${textSubtleClass}`}>
            Enterprise Capability
          </span>
          {challenge.exploreLink ? (
            <a 
              href={challenge.exploreLink} 
              className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-white/80 transition-colors group"
            >
              <span>Explore Solution</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-semibold text-white/70">
              <span>Standard Feature</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
