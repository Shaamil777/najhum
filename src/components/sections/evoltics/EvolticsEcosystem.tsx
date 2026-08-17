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

  const [dimensions, setDimensions] = useState({ cardWidth: 800, stickyOffset: 160, paddingLeft: 32 });

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      
      // Scale down the sticky offset for smaller screens so the stack fits
      let offset = 160;
      if (w < 640) offset = 16;
      else if (w < 768) offset = 32;
      else if (w < 1024) offset = 48; // Optimized offset for tablets
      else if (w < 1280) offset = 120;
      else offset = 160;
      
      // Calculate max width for the card so the entire stack fits on screen
      // We want the total stack to take up ~90vw (up to a max container width of 1400px)
      const desiredStackWidth = Math.min(w * 0.9, 1400);
      const calculatedCWidth = desiredStackWidth - (cards.length - 1) * offset;
      
      // Card width should ideally fit the stack math, bounded by reasonable card limits
      let cWidth = Math.max(Math.min(calculatedCWidth, 800), 280);
      
      const actualStackWidth = cWidth + (cards.length - 1) * offset;
      let centeredPadding = Math.max((w - actualStackWidth) / 2, 16);
      
      // RESTORE DESKTOP BEHAVIOR: keep original left alignment and card size logic
      if (w >= 1024) {
         centeredPadding = 80; // Restored original fixed left padding aligned with header
         
         // Optimize for MacBook sizes: shrink card width so it doesn't overflow the right edge
         const maxAvailableDesktop = w - centeredPadding - 32; // 32px safe area on the right
         const calculatedDesktopCard = maxAvailableDesktop - (cards.length - 1) * offset;
         
         cWidth = Math.max(Math.min(calculatedDesktopCard, 800), 400); 
      }
      
      setDimensions({ cardWidth: cWidth, stickyOffset: offset, paddingLeft: centeredPadding });
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
        <div className="px-6 md:px-12 lg:px-20 mb-8 md:mb-16 shrink-0">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase">
            EXPLORE THE EVOLTICS ECOSYSTEM
          </h2>
        </div>

        {/* Cards Wrapper */}
        <div className="relative w-full h-[380px] sm:h-[450px] md:h-[500px]">
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
        zIndex: index, // Natural stacking order
      }}
    >
      <div className="p-6 md:p-12 h-full flex flex-col justify-between relative">
        {/* Decorative Dot */}
        <div className={`absolute top-6 right-6 md:top-10 md:right-10 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full opacity-80 ${dotClass}`} />

        {/* Top section: Title and Description */}
        <div className="mt-2 md:mt-4">
          <h3 className="text-xl md:text-3xl lg:text-[32px] font-semibold mb-3 md:mb-6 leading-tight pr-6 md:pr-12 text-white">
            <span className={`${textSubtleClass} mr-2 md:mr-3 block sm:inline mb-1 sm:mb-0`}>{card.num} —</span>
            {card.title}
          </h3>
          <p className={`${textMutedClass} text-xs md:text-base leading-relaxed max-w-[95%] md:max-w-[90%] font-medium`}>
            {card.description}
          </p>
        </div>

        {/* Bottom section: Metadata */}
        <div className={`flex justify-between items-end text-[10px] md:text-sm font-semibold uppercase tracking-wide ${textSubtleClass}`}>
          <div className="flex gap-4 md:gap-12">
            <span className={textMutedClass}>{card.category}</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors group">
            <span className="capitalize normal-case text-xs md:text-sm">Explore solution</span>
            <span className={`text-sm md:text-lg group-hover:translate-x-1 transition-transform group-hover:text-white ${textMutedClass}`}>›</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
