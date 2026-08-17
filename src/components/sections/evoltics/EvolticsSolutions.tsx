"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { evolticsContent } from "@/content/platforms";

const cards = evolticsContent.solutions.cards;

export default function EvolticsSolutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [dimensions, setDimensions] = useState({ cardWidth: 450, gap: 48, windowWidth: 1200 });

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setDimensions({ cardWidth: w * 0.80, gap: 16, windowWidth: w });
      } else if (w < 1024) {
        setDimensions({ cardWidth: 380, gap: 32, windowWidth: w });
      } else {
        setDimensions({ cardWidth: 450, gap: 48, windowWidth: w });
      }
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const totalWidth = cards.length * dimensions.cardWidth + (cards.length - 1) * dimensions.gap;
  const maxTranslate = Math.max(1, totalWidth - dimensions.windowWidth + 200);
  
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    // The padding inside the viewport so the first card is visible, and the last card stops at the right edge
    ["0%", `-${maxTranslate}px`]
  );

  return (
    <section className="w-full bg-[#2a2a2a] border-b border-neutral-800">
      
      {/* Header content in normal DOM flow (scrolls away) */}
      <div className="w-full px-6 md:px-24 py-32 md:py-48 z-10">
        <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-blue-400 mb-2 md:mb-4">
          EVOLTICS CORE
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white lg:max-w-2xl xl:max-w-3xl">
            What Powers the Evoltics Advantage
          </h2>
          <p className="text-neutral-300 text-base md:text-xl leading-relaxed lg:max-w-lg lg:pb-2">
            A connected approach that brings together technology, regulatory expertise, flexibility and long-term operational support to deliver a seamless EV charging experience.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div ref={containerRef} className="h-[500vh] w-full relative">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
          {/* Scrollable Track */}
          <motion.div 
            className="flex items-start pl-6 md:pl-24" 
            style={{ x, gap: `${dimensions.gap}px` }}
          >
          {cards.map((card, index) => (
            <SolutionCard 
              key={index}
              index={index}
              card={card}
              cardWidth={dimensions.cardWidth}
              gap={dimensions.gap}
              windowWidth={dimensions.windowWidth}
              scrollYProgress={scrollYProgress}
              maxTranslate={maxTranslate}
            />
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
}

function SolutionCard({ 
  index, 
  card, 
  cardWidth, 
  gap,
  windowWidth,
  scrollYProgress,
  maxTranslate
}: { 
  index: number; 
  card: typeof cards[0]; 
  cardWidth: number;
  gap: number;
  windowWidth: number;
  scrollYProgress: MotionValue<number>;
  maxTranslate: number;
}) {
  // Staggered pattern based on the reference image (High, Lowest, Middle)
  const pattern = index % 3;
  let marginTop = "0px";
  if (pattern === 0) marginTop = "0px";
  else if (pattern === 1) marginTop = "min(140px, 15vh)"; // Scales down if viewport is short
  else marginTop = "min(70px, 7.5vh)";
  
  const isUp = index % 2 === 0;

  // Calculate the scroll progress needed to center this specific card
  const localX = index * (cardWidth + gap);
  const leftPadding = windowWidth >= 768 ? 96 : 24; // pl-24 is 96px, pl-6 is 24px
  const targetTrackX = (windowWidth / 2) - (cardWidth / 2) - localX - leftPadding;
  
  const centerP = -targetTrackX / maxTranslate;
  const clampedCenterP = Math.max(0, Math.min(1, centerP));
  
  const screenRange = (windowWidth / maxTranslate) * 0.8;
  
  const scale = useTransform(scrollYProgress, (val) => {
    const distance = Math.abs(val - clampedCenterP);
    // Add safety check to prevent divide by zero
    const safeRange = Math.max(0.01, screenRange);
    if (distance > safeRange) return 0.85;
    
    // progress is 0 at center, 1 at the edge of the range
    const progress = distance / safeRange;
    return 1 - (progress * 0.15); // scales smoothly from 1 down to 0.85
  });

  return (
    <motion.div 
      className="shrink-0 relative overflow-hidden rounded-[5px] bg-[#0d52c6] border border-blue-500/30 shadow-2xl flex flex-col"
      style={{ 
        width: `${cardWidth}px`, 
        height: 'min(600px, 65vh)', // Increased height dynamically
        marginTop,
        scale
      }}
    >
      {/* Inner Decorative Border (5px inset) */}
      <div className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] border border-blue-400/30 rounded-[3px] pointer-events-none z-20"></div>

      {/* Top Left Badge */}
      <div className="absolute top-6 left-6 z-10">
        <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded text-white text-xs font-semibold tracking-widest border border-white/20">
          {card.num}
        </span>
      </div>

      {/* Top Right Arrow Box */}
      <div className="absolute top-6 right-6 z-10 w-8 h-8 bg-white flex items-center justify-center rounded shadow-sm hover:scale-105 transition-transform cursor-pointer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0b3a8c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>

      {/* Background Image Decor */}
      <div className="absolute inset-x-8 md:inset-x-12 top-16 md:top-24 bottom-24 md:bottom-32 z-0 pointer-events-none opacity-80">
        <Image 
          src={`/images/elvotics/card_${index + 1}.png`} 
          alt="Card pattern" 
          fill
          className="object-contain object-top"
          sizes="(max-width: 768px) 80vw, 450px"
        />
      </div>

      {/* Content Bottom */}
      <div className="mt-auto p-6 md:p-8 z-10">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
          {card.title}
        </h3>
        <p className="text-blue-100 text-sm md:text-base leading-relaxed opacity-90">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}
