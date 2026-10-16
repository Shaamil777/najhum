"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Factory, Cpu, Signal, Cloud, BarChart3, Target } from "lucide-react";

import { iotricsContent } from "@/content/iotrics";

const pipelineNodesConfig = iotricsContent.about.pipeline;
const cardsData = iotricsContent.about.cards;

const pipelineNodes = [
  { icon: Factory, label: pipelineNodesConfig[0].label, text: pipelineNodesConfig[0].text },
  { icon: Cpu, label: pipelineNodesConfig[1].label, text: pipelineNodesConfig[1].text },
  { icon: Signal, label: pipelineNodesConfig[2].label, text: pipelineNodesConfig[2].text },
  { icon: Cloud, label: pipelineNodesConfig[3].label, text: pipelineNodesConfig[3].text },
  { icon: BarChart3, label: pipelineNodesConfig[4].label, text: pipelineNodesConfig[4].text },
  { icon: Target, label: pipelineNodesConfig[5].label, text: pipelineNodesConfig[5].text },
];

export default function IotricsAbout() {
  const { about } = iotricsContent;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 6);
    }, 2000); // 2 seconds per step
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section id="solutions" className="w-full pt-20 sm:pt-24 pb-14 sm:pb-16 lg:pb-8 bg-white text-neutral-900 overflow-hidden font-poppins">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">

        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 lg:mb-20 gap-4 sm:gap-8">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[1.75rem] sm:text-3xl lg:text-[2rem] xl:text-[3.2rem] font-black tracking-tight text-neutral-900 leading-[1.1] sm:leading-[1.05] uppercase"
            >
              {about.header.titlePart1} <br className="hidden md:block" />
              {about.header.titlePart2}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-neutral-500 text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed"
          >
            {about.header.description}
          </motion.p>
        </div>

        {/* Three Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative mb-16 sm:mb-24">

          {/* Card 1: COLLECT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col p-6 sm:p-8 rounded-[24px] bg-white hover:bg-[#0B1B33] border border-[#E3E8F0] hover:border-[#0B1B33] shadow-[0_1px_2px_rgba(11,15,23,0.04),0_12px_32px_-16px_rgba(11,15,23,0.12)] hover:shadow-[0_24px_48px_-20px_rgba(11,27,51,0.45)] hover:-translate-y-1.5 transition-all duration-300 relative group gap-7 cursor-pointer"
          >
            {/* Header Badge & Accent Line */}
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-[#EAF3FD] text-[#167DE4] group-hover:bg-[#167DE4] group-hover:text-white flex items-center justify-center text-[15px] font-bold shrink-0 transition-colors duration-300 shadow-sm">
                {cardsData[0].num}
              </span>
              <span className="text-sm font-semibold text-[#167DE4] group-hover:text-[#7CB8F5] tracking-[0.08em] uppercase transition-colors duration-300">
                {cardsData[0].label}
              </span>
              <div className="relative flex-1 h-[2px]">
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#167DE4] to-transparent rounded-full transition-opacity duration-300 group-hover:opacity-0" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#7CB8F5] to-transparent rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#0B0F17] group-hover:text-white leading-snug tracking-tight transition-colors duration-300">
                {cardsData[0].title}
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] group-hover:text-[#C3CEDD] leading-[1.65] transition-colors duration-300">
                {cardsData[0].description}
              </p>
            </div>

            {/* Icons Row */}
            <div className="mt-auto pt-6 border-t border-[rgba(127,140,160,0.25)] flex items-start justify-between gap-1 sm:gap-2">
              <div className="flex-1 min-w-0 flex flex-col items-center gap-2.5 text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 p-2.5 sm:p-3 bg-[#EAF3FD] text-[#167DE4] group-hover:bg-white/[0.08] group-hover:text-[#7CB8F5] rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <svg aria-hidden="true" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-[#4B5563] group-hover:text-[#C3CEDD] truncate w-full transition-colors duration-300">Temperature</span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col items-center gap-2.5 text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 p-2.5 sm:p-3 bg-[#EAF3FD] text-[#167DE4] group-hover:bg-white/[0.08] group-hover:text-[#7CB8F5] rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <svg aria-hidden="true" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-[#4B5563] group-hover:text-[#C3CEDD] truncate w-full transition-colors duration-300">Humidity</span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col items-center gap-2.5 text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 p-2.5 sm:p-3 bg-[#EAF3FD] text-[#167DE4] group-hover:bg-white/[0.08] group-hover:text-[#7CB8F5] rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <svg aria-hidden="true" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-[#4B5563] group-hover:text-[#C3CEDD] truncate w-full transition-colors duration-300">Air quality</span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col items-center gap-2.5 text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 p-2.5 sm:p-3 bg-[#EAF3FD] text-[#167DE4] group-hover:bg-white/[0.08] group-hover:text-[#7CB8F5] rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <svg aria-hidden="true" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-[#4B5563] group-hover:text-[#C3CEDD] truncate w-full transition-colors duration-300">Energy</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: CONNECT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col p-6 sm:p-8 rounded-[24px] bg-white hover:bg-[#0B1B33] border border-[#E3E8F0] hover:border-[#0B1B33] shadow-[0_1px_2px_rgba(11,15,23,0.04),0_12px_32px_-16px_rgba(11,15,23,0.12)] hover:shadow-[0_24px_48px_-20px_rgba(11,27,51,0.45)] hover:-translate-y-1.5 transition-all duration-300 relative group gap-7 cursor-pointer"
          >
            {/* Header Badge & Accent Line */}
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-[#EAF3FD] text-[#167DE4] group-hover:bg-[#167DE4] group-hover:text-white flex items-center justify-center text-[15px] font-bold shrink-0 transition-colors duration-300 shadow-sm">
                {cardsData[1].num}
              </span>
              <span className="text-sm font-semibold text-[#167DE4] group-hover:text-[#7CB8F5] tracking-[0.08em] uppercase transition-colors duration-300">
                {cardsData[1].label}
              </span>
              <div className="relative flex-1 h-[2px]">
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#167DE4] to-transparent rounded-full transition-opacity duration-300 group-hover:opacity-0" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#7CB8F5] to-transparent rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#0B0F17] group-hover:text-white leading-snug tracking-tight transition-colors duration-300">
                {cardsData[1].title}
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] group-hover:text-[#C3CEDD] leading-[1.65] transition-colors duration-300">
                {cardsData[1].description}
              </p>
            </div>

            {/* Icons Row */}
            <div className="mt-auto pt-6 border-t border-[rgba(127,140,160,0.25)] flex items-start justify-between gap-1">
              <div className="flex-1 min-w-0 flex flex-col items-center gap-2 text-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 xl:w-11 xl:h-11 p-2 sm:p-2.5 xl:p-3 bg-[#EAF3FD] text-[#167DE4] group-hover:bg-white/[0.08] group-hover:text-[#7CB8F5] rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <svg aria-hidden="true" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-[11px] xl:text-xs font-medium text-[#4B5563] group-hover:text-[#C3CEDD] truncate w-full transition-colors duration-300">Cellular</span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col items-center gap-2 text-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 xl:w-11 xl:h-11 p-2 sm:p-2.5 xl:p-3 bg-[#EAF3FD] text-[#167DE4] group-hover:bg-white/[0.08] group-hover:text-[#7CB8F5] rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <svg aria-hidden="true" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-[11px] xl:text-xs font-medium text-[#4B5563] group-hover:text-[#C3CEDD] truncate w-full transition-colors duration-300">Fiber</span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col items-center gap-2 text-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 xl:w-11 xl:h-11 p-2 sm:p-2.5 xl:p-3 bg-[#EAF3FD] text-[#167DE4] group-hover:bg-white/[0.08] group-hover:text-[#7CB8F5] rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <svg aria-hidden="true" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-[11px] xl:text-xs font-medium text-[#4B5563] group-hover:text-[#C3CEDD] truncate w-full transition-colors duration-300">LoRaWAN</span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col items-center gap-2 text-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 xl:w-11 xl:h-11 p-2 sm:p-2.5 xl:p-3 bg-[#EAF3FD] text-[#167DE4] group-hover:bg-white/[0.08] group-hover:text-[#7CB8F5] rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <svg aria-hidden="true" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-[11px] xl:text-xs font-medium text-[#4B5563] group-hover:text-[#C3CEDD] truncate w-full transition-colors duration-300">BLE</span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col items-center gap-2 text-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 xl:w-11 xl:h-11 p-2 sm:p-2.5 xl:p-3 bg-[#EAF3FD] text-[#167DE4] group-hover:bg-white/[0.08] group-hover:text-[#7CB8F5] rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <svg aria-hidden="true" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 7 9 3 5 7l4 4" /><path d="m17 11 4 4-4 4-4-4" /><path d="m8 12 4 4 6-6-4-4Z" /><path d="m16 8 3-3" /><path d="M9 21a6 6 0 0 0-6-6" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-[11px] xl:text-xs font-medium text-[#4B5563] group-hover:text-[#C3CEDD] truncate w-full transition-colors duration-300">Satellite</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: COLLABORATE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col p-6 sm:p-8 rounded-[24px] bg-white hover:bg-[#0B1B33] border border-[#E3E8F0] hover:border-[#0B1B33] shadow-[0_1px_2px_rgba(11,15,23,0.04),0_12px_32px_-16px_rgba(11,15,23,0.12)] hover:shadow-[0_24px_48px_-20px_rgba(11,27,51,0.45)] hover:-translate-y-1.5 transition-all duration-300 relative group gap-7 cursor-pointer"
          >
            {/* Header Badge & Accent Line */}
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-[#EAF3FD] text-[#167DE4] group-hover:bg-[#167DE4] group-hover:text-white flex items-center justify-center text-[15px] font-bold shrink-0 transition-colors duration-300 shadow-sm">
                {cardsData[2].num}
              </span>
              <span className="text-sm font-semibold text-[#167DE4] group-hover:text-[#7CB8F5] tracking-[0.08em] uppercase transition-colors duration-300">
                {cardsData[2].label}
              </span>
              <div className="relative flex-1 h-[2px]">
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#167DE4] to-transparent rounded-full transition-opacity duration-300 group-hover:opacity-0" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#7CB8F5] to-transparent rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#0B0F17] group-hover:text-white leading-snug tracking-tight transition-colors duration-300">
                {cardsData[2].title}
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] group-hover:text-[#C3CEDD] leading-[1.65] transition-colors duration-300">
                {cardsData[2].description}
              </p>
            </div>

            {/* Icons Row */}
            <div className="mt-auto pt-6 border-t border-[rgba(127,140,160,0.25)] flex items-start justify-between gap-1 sm:gap-2">
              <div className="flex-1 min-w-0 flex flex-col items-center gap-2.5 text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 p-2.5 sm:p-3 bg-[#EAF3FD] text-[#167DE4] group-hover:bg-white/[0.08] group-hover:text-[#7CB8F5] rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <svg aria-hidden="true" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-[#4B5563] group-hover:text-[#C3CEDD] truncate w-full transition-colors duration-300">Platform</span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col items-center gap-2.5 text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 p-2.5 sm:p-3 bg-[#EAF3FD] text-[#167DE4] group-hover:bg-white/[0.08] group-hover:text-[#7CB8F5] rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <svg aria-hidden="true" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18" /><path d="M8 17v-4M13 17V9M18 17v-7" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-[#4B5563] group-hover:text-[#C3CEDD] truncate w-full transition-colors duration-300">Analytics</span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col items-center gap-2.5 text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 p-2.5 sm:p-3 bg-[#EAF3FD] text-[#167DE4] group-hover:bg-white/[0.08] group-hover:text-[#7CB8F5] rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <svg aria-hidden="true" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-[#4B5563] group-hover:text-[#C3CEDD] truncate w-full transition-colors duration-300">Alerts</span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col items-center gap-2.5 text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 p-2.5 sm:p-3 bg-[#EAF3FD] text-[#167DE4] group-hover:bg-white/[0.08] group-hover:text-[#7CB8F5] rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <svg aria-hidden="true" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-[#4B5563] group-hover:text-[#C3CEDD] truncate w-full transition-colors duration-300">Predictive</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Pipeline/Timeline */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-4xl relative mb-10 lg:mb-8 px-2 sm:px-4">

            {/* Background Dashed line (desktop only) */}
            <div className="hidden lg:block absolute top-[32px] left-[5%] right-[5%] h-[2px] bg-neutral-200 -z-20 border-t-2 border-dashed border-neutral-300" />

            {/* Moving Pulse Animation (desktop only) */}
            <div className="hidden lg:block absolute top-[32px] left-[5%] right-[5%] h-[2px] -z-10 overflow-visible pointer-events-none">
              <motion.div
                className="w-20 h-[3px] rounded-full bg-blue-500 shadow-[0_0_12px_4px_rgba(59,130,246,0.8)] absolute top-0 -translate-y-1/2"
                animate={{
                  left: ["0%", "100%"]
                }}
                transition={{
                  duration: 9, // 6 nodes * 1.5s
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            {/* Pipeline Nodes */}
            <div className="grid grid-cols-3 gap-y-10 gap-x-2 sm:gap-x-4 lg:flex lg:justify-between lg:gap-0 relative">
              {pipelineNodes.map((node, i) => {
                const isActive = i === activeIndex;
                const isPast = i < activeIndex;

                return (
                  <div
                    key={i}
                    className="flex flex-col items-center bg-white px-1 sm:px-2 z-10 cursor-pointer group"
                    onMouseEnter={() => {
                      setActiveIndex(i);
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 bg-white transition-all duration-500 ${isActive ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-110' : isPast ? 'border-blue-200' : 'border-neutral-100 text-neutral-300'} group-hover:border-blue-400`}>
                      <node.icon className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-500 ${isActive ? 'text-blue-500' : isPast ? 'text-blue-400' : 'text-neutral-300'} group-hover:text-blue-500`} />
                    </div>
                    <span className={`mt-3 md:mt-4 text-[9px] md:text-xs font-bold uppercase tracking-wider text-center transition-colors duration-500 ${isActive ? 'text-blue-600' : isPast ? 'text-blue-400' : 'text-neutral-400'} group-hover:text-blue-500`}>
                      {node.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Dynamic tagline */}
          <div className="h-12 flex items-center justify-center overflow-hidden w-full px-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={`tagline-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center text-[14px] sm:text-[17px] font-medium text-neutral-800"
              >
                {pipelineNodes[activeIndex].text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
