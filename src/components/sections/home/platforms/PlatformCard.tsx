"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Zap, Leaf, Cloud } from "lucide-react";

const platformIcons: Record<string, React.ElementType> = {
  iotrics: Cpu,
  evoltics: Zap,
  cropifai: Leaf,
  solaas: Cloud,
};

interface Metric {
  label: string;
  value: string;
}

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
  metrics?: Metric[];
  tags?: string[];
}

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
  metrics = [],
  tags = []
}: PlatformCardProps) {
  const Icon = platformIcons[id] ?? Cpu;
  const isDark = variant === "dark";
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.98 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full relative group"
    >
      <div
        className={`w-full h-full rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-700 
          ${isDark 
            ? "bg-[#09090b] border border-white/10 text-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] hover:border-white/20" 
            : "bg-[#f8f9fa] border border-neutral-200 text-neutral-900 hover:shadow-[10px_10px_30px_#e1e3e6,-10px_-10px_30px_#ffffff]"
          }`}
      >
        {/* Soft Neumorphic / Brutalist Accent Glow */}
        {isDark && (
          <div 
            className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none transition-all duration-700 group-hover:opacity-40 group-hover:scale-110"
            style={{ background: accent }}
          />
        )}
        
        {/* Magazine-inspired Top Section */}
        <div className="relative z-10 flex justify-between items-start">
          <div className="flex gap-2 items-center">
            <span className={`text-[11px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border ${isDark ? "border-white/10 bg-white/5" : "border-black/5 bg-black/5"}`}>
              NO {number}
            </span>
            {tags.length > 0 && (
              <span className={`hidden md:inline-block text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border ${isDark ? "border-white/10 bg-white/5" : "border-black/5 bg-black/5"}`} style={{ color: isDark ? accent : "#111827" }}>
                {tags[0]}
              </span>
            )}
          </div>
          
          <div 
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12 ${isDark ? "bg-white/5 border border-white/10" : "bg-white shadow-sm border border-neutral-100"}`}
          >
            <Icon 
              className="w-6 h-6" 
              style={{ color: isDark ? accent : "#111827" }} 
            />
          </div>
        </div>

        {/* Center Content: Experimental Layout / Typography */}
        <div className="relative z-10 mt-8 mb-6 flex-grow flex flex-col justify-center">
          <h3 
            className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 leading-[0.9]`}
            style={{ color: isDark ? "#ffffff" : "#0f0f0f" }}
          >
            {title}
          </h3>
          <p 
            className={`text-sm md:text-base leading-relaxed max-w-sm font-medium ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
          >
            {description}
          </p>
        </div>

        {/* Bottom Metrics & CTA Grid (Bento within Bento) */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto items-end">
          {/* Metrics block */}
          {metrics.length > 0 ? (
            <div className={`flex gap-4 pt-5 border-t ${isDark ? "border-white/10" : "border-neutral-200"}`}>
              {metrics.map((metric, i) => (
                <div key={i} className="flex flex-col">
                  <span className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                    {metric.label}
                  </span>
                  <span className={`text-2xl md:text-3xl font-black tracking-tight`} style={{ color: isDark ? accent : "#111827" }}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className={`pt-5 border-t ${isDark ? "border-white/10" : "border-neutral-200"}`} />
          )}

          {/* CTA Block */}
          <div className={`pt-5 sm:border-t ${isDark ? "border-white/10" : "border-neutral-200"} flex items-end justify-start sm:justify-end`}>
            <a 
              href="#" 
              className={`group/cta inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest py-3 px-5 rounded-full transition-all duration-300 ${isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-neutral-900 text-white hover:bg-neutral-800"}`}
            >
              <span>{cta.replace("→", "").trim()}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
