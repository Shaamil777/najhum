"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { homeContent } from "@/content/home";
import EnergyBeam from "./platforms/EnergyBeam";
import PlatformCard from "./platforms/PlatformCard";

/**
 * Platforms — "Najhum Ecosystem"
 *
 * Matches the Analytics section's editorial Najhum branding:
 * - Dark #0d0d0d and white cards with rounded-[2rem]
 * - Uppercase tracking-widest labels
 * - Stark monochrome + beam accent colors
 * - Energy beams connect from a central hub down into card borders
 */

/* ── SVG viewport ── */
const SVG_W = 1200;
const SVG_H = 180;
const HUB_X = SVG_W / 2;
const HUB_Y = 0;

/* ── Beam endpoints (one per card, aligned to grid columns) ── */
const BEAM_TARGETS = [
  { x: 150, y: SVG_H },   // IoTRICS
  { x: 450, y: SVG_H },   // EVOLTICS
  { x: 750, y: SVG_H },   // CropifAI
  { x: 1050, y: SVG_H },  // SOLAAS
];

function generateBeamPath(tx: number, ty: number): string {
  const midY = ty * 0.5;
  const cpX = HUB_X + (tx - HUB_X) * 0.3;
  return `M ${HUB_X} ${HUB_Y} C ${cpX} ${midY - 20}, ${tx} ${midY + 30}, ${tx} ${ty}`;
}

export default function Platforms() {
  const { platforms } = homeContent;
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowIntensity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.2]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const beamPaths = BEAM_TARGETS.map((t) => generateBeamPath(t.x, t.y));

  /* Card variant pattern: dark / light / light / dark (matches Analytics bento) */
  const cardVariants: Array<"dark" | "light"> = ["dark", "light", "light", "dark"];

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-20 bg-white"
    >
      <div className="w-full max-w-full mx-auto px-8 lg:px-16">

        {/* ── Header — matching Analytics editorial style ── */}
        <div className="mb-10 lg:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 border-b border-neutral-200 pb-8 lg:pb-10">
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-neutral-900 mb-4"
            >
              {platforms.label}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[5rem] font-black text-neutral-900 tracking-tighter uppercase leading-[0.9]"
            >
              Enterprise<br />
              <span className="text-neutral-300 italic">Platforms</span>
            </motion.h2>
          </div>
          <div className="lg:w-1/3 lg:max-w-[320px]">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-relaxed"
            >
              {platforms.description}
            </motion.p>
          </div>
        </div>

        {/* ── Central Hub + Energy Beams ── */}
        <div className="hidden lg:block relative mb-0">
          {/* Hub node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center mb-0 relative z-20"
          >
            <div className="animate-pulse-glow w-14 h-14 rounded-full bg-white border border-neutral-200 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#0EA5FF]/8 to-transparent" />
              <span className="text-lg font-black tracking-tighter text-neutral-900 relative z-10">N</span>
            </div>
          </motion.div>

          {/* SVG Beam Canvas */}
          <motion.div style={{ opacity: glowIntensity }} className="relative -mt-7 z-10">
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="w-full"
              style={{ height: "140px" }}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {platforms.items.map((item, i) => (
                <EnergyBeam
                  key={item.id}
                  beamId={item.id}
                  pathD={beamPaths[i]}
                  accentColor={item.accent}
                  delay={0.5 + i * 0.2}
                  isVisible={isInView}
                />
              ))}
            </svg>
          </motion.div>
        </div>

        {/* ── Mobile Hub ── */}
        <div className="lg:hidden flex flex-col items-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="animate-pulse-glow w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
              <span className="text-base font-black tracking-tighter text-neutral-900">N</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-[2px] h-10 origin-top mt-2"
            style={{ background: "linear-gradient(to bottom, #0EA5FF, #3EC7FF40, transparent)" }}
          />
        </div>

        {/* ── Bento Grid — matching Analytics layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 -mt-1 lg:-mt-1">
          {platforms.items.map((item, i) => (
            <PlatformCard
              key={item.id}
              {...item}
              index={i}
              isVisible={isInView}
              delay={1.0 + i * 0.15}
              variant={cardVariants[i]}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
