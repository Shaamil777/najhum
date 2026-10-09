"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import type { ChallengeContent } from '@/types/section';

interface ChallengeSectionProps {
  content: ChallengeContent;
}

export default function ChallengeSection({ content }: ChallengeSectionProps) {
  const { heading, description, challenges } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [dimensions, setDimensions] = useState({ cardWidth: 800, stickyOffset: 160, paddingLeft: 32 });

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      
      let offset = 160;
      if (w < 640) offset = 16;
      else if (w < 768) offset = 32;
      else if (w < 1024) offset = 48; 
      else if (w < 1280) offset = 120;
      else offset = 160;
      
      const desiredStackWidth = Math.min(w * 0.9, 1400);
      const calculatedCWidth = desiredStackWidth - (challenges.length - 1) * offset;
      
      let cWidth = Math.max(Math.min(calculatedCWidth, 800), 280);
      
      const actualStackWidth = cWidth + (challenges.length - 1) * offset;
      let centeredPadding = Math.max((w - actualStackWidth) / 2, 16);
      
      if (w >= 1024) {
         centeredPadding = 80; 
         
         const maxAvailableDesktop = w - centeredPadding - 32; 
         const calculatedDesktopCard = maxAvailableDesktop - (challenges.length - 1) * offset;
         
         cWidth = Math.max(Math.min(calculatedDesktopCard, 800), 400); 
      }
      
      setDimensions({ cardWidth: cWidth, stickyOffset: offset, paddingLeft: centeredPadding });
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [challenges.length]);

  const { cardWidth, stickyOffset: STICKY_OFFSET, paddingLeft } = dimensions;
  const GAP = 16; 
  const CARD_SPACING = cardWidth + GAP;
  const N = challenges.length;

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-white text-neutral-900 relative"
      // Total height allows the user to scroll through the animation comfortably
      style={{ height: `${Math.max(400, (N) * 100)}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-20 lg:py-32">
        
        {/* Header matched to Evoltics Ecosystem styling */}
        <div className="px-6 md:px-12 lg:px-20 mb-8 md:mb-16 shrink-0 max-w-4xl">
          <h2 className="text-3xl lg:text-[2rem] xl:text-[3.2rem] font-black tracking-tight text-neutral-900 leading-[1.05] uppercase mb-4">
            {heading}
          </h2>
          {description && (
            <p className="text-neutral-600 text-lg md:text-xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Cards Wrapper */}
        <div className="relative w-full h-[380px] sm:h-[450px] md:h-[500px]">
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

function ChallengeCard({ index, challenge, scrollYProgress, N, CARD_SPACING, STICKY_OFFSET, cardWidth, paddingLeft }: CardProps) {
  const x = useTransform(scrollYProgress, (p) => {
    const maxScroll = (N - 1) * (CARD_SPACING - STICKY_OFFSET);
    const currentScroll = p * maxScroll;
    const targetX = index * CARD_SPACING - currentScroll;
    const stickyX = index * STICKY_OFFSET;
    return Math.max(stickyX + paddingLeft, targetX + paddingLeft);
  });

  const isBlue = index % 2 === 1;
  const bgClass = isBlue ? "bg-[#4c3bcf]/95 border-blue-800/50" : "bg-[#2a2a2a]/95 border-neutral-800/80";
  const textMutedClass = isBlue ? "text-blue-200" : "text-zinc-400";
  const textSubtleClass = isBlue ? "text-blue-300" : "text-zinc-500";
  const dotClass = isBlue ? "bg-blue-400" : "bg-zinc-700";

  return (
    <motion.div
      className={`absolute top-0 h-full border-l shadow-[-12px_0_30px_rgba(0,0,0,0.4)] backdrop-blur-md rounded-2xl md:rounded-3xl ${bgClass}`}
      style={{
        x,
        width: `${cardWidth}px`,
        maxWidth: '800px',
        zIndex: index, 
      }}
    >
      <div className="p-6 md:p-12 h-full flex flex-col justify-between relative">
        {/* Decorative Dot */}
        <div className={`absolute top-6 right-6 md:top-10 md:right-10 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full opacity-80 ${dotClass}`} />

        {/* Top section: Title and Description */}
        <div className="mt-2 md:mt-4">
          <h3 className="text-xl md:text-3xl lg:text-[32px] font-semibold mb-3 md:mb-6 leading-tight pr-6 md:pr-12 text-white">
            <span className={`${textSubtleClass} mr-2 md:mr-3 block sm:inline mb-1 sm:mb-0`}>
              {String(index + 1).padStart(2, '0')} —
            </span>
            {challenge.title}
          </h3>
          <p className={`${textMutedClass} text-xs md:text-base leading-relaxed max-w-[95%] md:max-w-[90%] font-medium`}>
            {challenge.description}
          </p>
        </div>

        {/* Bottom section: Metadata & Link */}
        <div className={`flex justify-between items-end text-[10px] md:text-sm font-semibold uppercase tracking-wide ${textSubtleClass}`}>
          <div className="flex gap-4 md:gap-12">
            <span className={textMutedClass}>{challenge.category || 'Challenge'}</span>
          </div>
          {(challenge.exploreLink || true) && (
            <a href={challenge.exploreLink || '#'} className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors group">
              <span className="capitalize normal-case text-xs md:text-sm">Explore solution</span>
              <span className={`text-sm md:text-lg group-hover:translate-x-1 transition-transform group-hover:text-white ${textMutedClass}`}>›</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
