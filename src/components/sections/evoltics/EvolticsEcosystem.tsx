"use client";

import React, { useRef, useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

import { evolticsContent } from "@/content/evoltics";

const cards = evolticsContent.ecosystem.cards;

export default function EvolticsEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [dimensions, setDimensions] = useState({ cardWidth: 760, stickyOffset: 120, paddingLeft: 80 });

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      const count = cards.length;
      const stackGaps = Math.max(count - 1, 1);

      // 1. Establish consistent, comfortable card widths based on screen size
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
        cWidth = 750;
        padLeft = 80;
        rightMargin = 32;
        maxAllowedOffset = 140;
      } else if (w >= 1024) {
        cWidth = 680;
        padLeft = 64;
        rightMargin = 28;
        maxAllowedOffset = 110;
      } else if (w >= 768) {
        cWidth = Math.min(Math.round(w * 0.72), 600);
        padLeft = 48;
        rightMargin = 24;
        maxAllowedOffset = 60;
      } else if (w >= 640) {
        cWidth = Math.min(Math.round(w * 0.82), 520);
        padLeft = 28;
        rightMargin = 20;
        maxAllowedOffset = 36;
      } else {
        padLeft = 16;
        rightMargin = 16;
        cWidth = Math.max(Math.min(w - 32, 380), 280);
        maxAllowedOffset = 16;
      }

      // 2. Calculate available space for the stacked offsets so cards never overflow the right edge
      const availableStackSpace = w - padLeft - rightMargin;
      const spaceForOffsets = availableStackSpace - cWidth;

      // 3. Dynamically set stickyOffset to fit the remaining space
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

    updateSize(); // Initial call
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const { cardWidth, stickyOffset: STICKY_OFFSET, paddingLeft } = dimensions;
  const GAP = 16; 
  const CARD_SPACING = cardWidth + GAP;
  const N = cards.length;

  return (
    <section 
      ref={containerRef} 
      className={`w-full bg-white text-neutral-900 ${poppins.className} relative h-[400vh]`}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-20 lg:py-32">
        
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-20 mb-8 md:mb-16 shrink-0 max-w-4xl">
          <h2 className="text-3xl lg:text-[2rem] xl:text-[3.2rem] font-black tracking-tight text-neutral-900 leading-[1.05] uppercase mb-4">
            EXPLORE THE EVOLTICS ECOSYSTEM
          </h2>
          <p className="text-neutral-600 text-lg md:text-xl leading-relaxed">
            Integrated solutions for smarter, scalable EV charging infrastructure.
          </p>
        </div>

        {/* Cards Wrapper */}
        <div className="relative w-full h-[420px] sm:h-[460px] md:h-[500px] lg:h-[520px]">
          {cards.map((card, index) => (
            <EcosystemCard 
              key={index}
              index={index}
              card={card}
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
  card: typeof cards[0];
  scrollYProgress: MotionValue<number>;
  N: number;
  CARD_SPACING: number;
  STICKY_OFFSET: number;
  cardWidth: number;
  paddingLeft: number;
}

function EcosystemCard({ index, card, scrollYProgress, N, CARD_SPACING, STICKY_OFFSET, cardWidth, paddingLeft }: CardProps) {
  const x = useTransform(scrollYProgress, (p) => {
    // Total distance the entire group needs to scroll left
    const maxScroll = (N - 1) * (CARD_SPACING - STICKY_OFFSET);
    const currentScroll = p * maxScroll;
    
    // Calculate the physical left position (targetX)
    const targetX = index * CARD_SPACING - currentScroll;
    
    // The position where this card should stop and stack
    const stickyX = index * STICKY_OFFSET;
    
    return Math.max(stickyX + paddingLeft, targetX + paddingLeft);
  });

  const isBlue = index % 2 === 1;
  const bgClass = isBlue ? "bg-[#3B82F6]/95 border-blue-800/50" : "bg-[#2a2a2a]/95 border-neutral-800/80";
  const textMutedClass = isBlue ? "text-blue-200" : "text-zinc-400";
  const textSubtleClass = isBlue ? "text-blue-300" : "text-zinc-500";
  const dotClass = isBlue ? "bg-blue-400" : "bg-zinc-700";

  return (
    <motion.div
      className={`absolute top-0 h-full border-l shadow-[-12px_0_30px_rgba(0,0,0,0.4)] backdrop-blur-md rounded-2xl md:rounded-3xl overflow-hidden ${bgClass}`}
      style={{
        x,
        width: `${cardWidth}px`,
        maxWidth: '800px',
        zIndex: index, // Natural stacking order
      }}
    >
      <div className="p-6 sm:p-8 md:p-10 lg:p-12 h-full flex flex-col justify-between relative">
        {/* Decorative Dot */}
        <div className={`absolute top-6 right-6 md:top-10 md:right-10 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full opacity-80 ${dotClass}`} />

        {/* Top section: Title and Description */}
        <div className="mt-1 md:mt-2">
          <h3 className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] xl:text-[32px] font-semibold mb-3 md:mb-5 leading-tight pr-6 md:pr-10 text-white">
            <span className={`${textSubtleClass} mr-2 md:mr-3 inline-block mb-1 sm:mb-0`}>{card.num} —</span>
            {card.title}
          </h3>
          <p className={`${textMutedClass} text-xs sm:text-sm md:text-base leading-relaxed max-w-full md:max-w-[92%] font-medium`}>
            {card.description}
          </p>
        </div>

        {/* Bottom section: Metadata */}
        <div className={`flex justify-between items-end text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-wide pt-4 ${textSubtleClass}`}>
          <div className="flex gap-4 md:gap-12">
            <span className={textMutedClass}>{card.category}</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors group">
            <span className="capitalize normal-case text-xs sm:text-sm">Explore solution</span>
            <span className={`text-sm md:text-lg group-hover:translate-x-1 transition-transform group-hover:text-white ${textMutedClass}`}>›</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
