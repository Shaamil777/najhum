"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { homeContent } from "@/content/home";
import { ChevronRight } from "lucide-react";

export default function About() {
  const { about } = homeContent;
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yHeadline = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yLeft = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={containerRef} className="w-full bg-background text-foreground font-sans relative overflow-hidden">
      {/* Section Dotted Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.25] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(var(--color-muted) 1px, transparent 1px)', backgroundSize: '16px 16px' }} 
      />
      
      {/* 
        Main 4-column Grid Container 
      */}
      <div className="max-w-[var(--spacing-container)] w-full px-4 md:px-6 lg:px-8 pb-4 lg:pb-12 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
        
        {/* =======================
            TOP ROW (Content) 
        ======================= */}
        
        {/* Column 1: Left Content */}
        <div className="col-span-1 p-8 lg:p-10 flex flex-col justify-between bg-white/60 backdrop-blur-md border border-border/50 rounded-3xl shadow-sm relative min-h-[300px] lg:min-h-[480px] hover:bg-white/80 transition-colors duration-500">
          <motion.div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted mb-16 lg:mb-24 flex items-center gap-3">
              <span className="text-primary font-mono text-xs">/</span> {about.badge.replace("+ ", "")}
            </p>
            
            <p className="text-base lg:text-lg text-muted leading-relaxed max-w-[280px]">
              {about.leftContent}
            </p>
          </motion.div>
        </div>

        {/* Columns 2 & 3: Huge Headline */}
        <div className="col-span-1 lg:col-span-2 p-6 lg:p-10 flex items-center justify-center bg-white/60 backdrop-blur-md border border-border/50 rounded-3xl shadow-sm relative min-h-[300px] lg:min-h-[480px] hover:bg-white/80 transition-colors duration-500 text-center">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
            }}
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-black tracking-tighter leading-[1] text-foreground whitespace-pre-line"
          >
            {about.headline.split(' ').map((word, i) => {
              const isAccent = word.toLowerCase() === 'impossible' || word.toLowerCase() === 'future';
              return (
                <motion.span 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
                  }}
                  className={`inline-block mr-2 lg:mr-4 ${isAccent ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent' : ''}`}
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.h2>
        </div>

        {/* Column 4: Description */}
        <div className="col-span-1 p-8 lg:p-10 flex flex-col justify-center bg-white/60 backdrop-blur-md border border-border/50 rounded-3xl shadow-sm relative min-h-[300px] lg:min-h-[480px] hover:bg-white/80 transition-colors duration-500">
          <p className="text-base lg:text-lg text-muted leading-relaxed font-medium">
            {about.description}
          </p>
        </div>





        {/* =======================
            BOTTOM ROW (Cards removed per request)
        ======================= */}

      </div>
    </section>
  );
}