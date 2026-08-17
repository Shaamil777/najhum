"use client";

import React, { useRef, useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

import { evolticsContent } from "@/content/platforms";

const cards = evolticsContent.ecosystem.cards;

export default function EvolticsEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [cardWidth, setCardWidth] = useState(800);

  useEffect(() => {
    const updateSize = () => {
      setCardWidth(Math.min(window.innerWidth * 0.9, 800));
    };
    updateSize(); // Initial call
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Increased sticky offset so more of the underlying cards are visible when stacked
  const STICKY_OFFSET = 160; 
  const GAP = 16; 
  const CARD_SPACING = cardWidth + GAP;
  const N = cards.length;

  return (
    <section 
      ref={containerRef} 
      className={`w-full bg-neutral-50 text-neutral-900 ${poppins.className} relative h-[400vh]`}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-20 lg:py-32">
        
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-20 mb-12 md:mb-16 shrink-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase">
            EXPLORE THE EVOLTICS ECOSYSTEM
          </h2>
        </div>

        {/* Cards Wrapper */}
        <div className="relative w-full h-[450px] md:h-[500px]">
          {cards.map((card, index) => (
            <EcosystemCard 
              key={index}
              index={index}
              card={card}
              scrollYProgress={scrollYProgress}
              N={N}
              CARD_SPACING={CARD_SPACING}
              STICKY_OFFSET={STICKY_OFFSET}
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
}

function EcosystemCard({ index, card, scrollYProgress, N, CARD_SPACING, STICKY_OFFSET }: CardProps) {
  const x = useTransform(scrollYProgress, (p) => {
    // Total distance the entire group needs to scroll left
    const maxScroll = (N - 1) * (CARD_SPACING - STICKY_OFFSET);
    const currentScroll = p * maxScroll;
    
    // Calculate the physical left position (targetX)
    const targetX = index * CARD_SPACING - currentScroll;
    
    // The position where this card should stop and stack
    const stickyX = index * STICKY_OFFSET;
    
    // We add 32px (2rem) as initial left padding for the whole stack
    const paddingLeft = 32; 
    
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
        width: '90vw',
        maxWidth: '800px',
        zIndex: index, // Natural stacking order
      }}
    >
      <div className="p-8 md:p-12 h-full flex flex-col justify-between relative">
        {/* Decorative Dot */}
        <div className={`absolute top-10 right-10 w-3 h-3 rounded-full opacity-80 ${dotClass}`} />

        {/* Top section: Title and Description */}
        <div className="mt-4">
          <h3 className="text-2xl md:text-3xl lg:text-[32px] font-semibold mb-6 leading-tight pr-12 text-white">
            <span className={`${textSubtleClass} mr-3`}>{card.num} —</span>
            {card.title}
          </h3>
          <p className={`${textMutedClass} text-sm md:text-base leading-relaxed max-w-[90%] font-medium`}>
            {card.description}
          </p>
        </div>

        {/* Bottom section: Metadata */}
        <div className={`flex justify-between items-end text-xs md:text-sm font-semibold uppercase tracking-wide ${textSubtleClass}`}>
          <div className="flex gap-8 md:gap-12">
            <span className={textMutedClass}>{card.category}</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors group">
            <span className="capitalize normal-case text-sm">Read article</span>
            <span className={`text-lg group-hover:translate-x-1 transition-transform group-hover:text-white ${textMutedClass}`}>›</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
