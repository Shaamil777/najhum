"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Zap, Leaf, Cloud } from "lucide-react";

const platformIcons: Record<string, React.ElementType> = {
  iotrics: Cpu,
  evoltics: Zap,
  cropifai: Leaf,
  solaas: Cloud,
};

interface PlatformCardProps {
  id: string;
  title: string;
  description: string;
  accent: string;
  cta: string;
  index: number;
  isVisible: boolean;
  delay: number;
  variant?: "dark" | "light";
}

/**
 * PlatformCard — Najhum-branded editorial card.
 *
 * Matches the Analytics section aesthetic:
 * - Dark (#0d0d0d) or white with border
 * - rounded-[2rem]
 * - Uppercase tracking-widest labels
 * - Bold KPI-style typography
 * - Border evolves from beam accent color on hover
 */
export default function PlatformCard({
  id,
  title,
  description,
  accent,
  cta,
  index,
  isVisible,
  delay,
  variant = "light",
}: PlatformCardProps) {
  const Icon = platformIcons[id] ?? Cpu;
  const isDark = variant === "dark";
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full"
    >
      <div
        className="group relative w-full h-full rounded-[2rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-1"
        style={{
          background: isDark ? "#0d0d0d" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e5e7eb",
        }}
      >
        {/* Animated border glow — evolves from beam accent */}
        <div
          className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1.5px ${accent}, 0 0 40px ${accent}15, 0 0 80px ${accent}08`,
          }}
        />

        {/* Accent beam entry point — top edge glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] rounded-full opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-700"
          style={{ background: accent, boxShadow: `0 0 20px ${accent}60` }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <p
              className="text-[10px] font-black tracking-widest uppercase"
              style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}
            >
              {number}
            </p>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
              style={{
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : accent + "30"}`,
                background: isDark ? "rgba(255,255,255,0.03)" : accent + "08",
              }}
            >
              <Icon
                className="w-5 h-5 transition-colors duration-500"
                style={{ color: isDark ? "rgba(255,255,255,0.6)" : accent }}
              />
            </div>
          </div>

          <h3
            className="text-2xl md:text-3xl font-black tracking-tighter mb-3"
            style={{ color: isDark ? "#ffffff" : "#111827" }}
          >
            {title}
          </h3>
          <p
            className="text-xs leading-relaxed max-w-xs"
            style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#6b7280" }}
          >
            {description}
          </p>
        </div>

        {/* Bottom: CTA */}
        <div className="relative z-10 mt-8 flex items-end justify-between">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 group/cta"
            style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#111827" }}
          >
            <span className="group-hover/cta:underline underline-offset-4">{cta.replace("→", "")}</span>
            <ArrowRight className="w-3 h-3 group-hover/cta:translate-x-1 transition-transform" />
          </a>
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: accent, boxShadow: `0 0 8px ${accent}80` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
