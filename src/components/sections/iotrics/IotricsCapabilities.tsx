"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, TrendingUp } from "lucide-react";

import { iotricsContent } from "@/content/iotrics";

const capabilitiesData = iotricsContent.capabilities.items;

export default function IotricsCapabilities() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = capabilitiesData[currentIndex];

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? capabilitiesData.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === capabilitiesData.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="w-full bg-white py-20 sm:py-28 lg:py-32 relative overflow-hidden font-sans border-b border-zinc-200">
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B82F6]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 max-w-[1440px] relative z-10">
        
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#3B82F6] mb-3 block">
              {iotricsContent.capabilities.header.tag}
            </span>
            <h2
              className="normal-case text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight"
              style={{ textTransform: "none" }}
            >
              {iotricsContent.capabilities.header.title}
            </h2>
          </div>

          {/* Carousel Arrows & Counter */}
          <div className="flex items-center gap-4 self-start lg:self-end">
            <div className="text-xs font-semibold text-zinc-400 tracking-widest uppercase font-mono mr-2">
              <span className="text-zinc-900 font-bold font-mono text-sm">
                {current.num}
              </span>{" "}
              / 06
            </div>

            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous capability"
              className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 hover:text-white hover:bg-[#3B82F6] hover:border-[#3B82F6] transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next capability"
              className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 hover:text-white hover:bg-[#3B82F6] hover:border-[#3B82F6] transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick-Switch Pill Tabs (Desktop & Tablet) */}
        <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {capabilitiesData.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#3B82F6] text-white shadow-sm"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                <span className={`font-mono text-[10px] ${isActive ? "text-white/80" : "text-zinc-400"}`}>
                  {item.num}
                </span>
                <span>{item.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Carousel Content Showcase (Matching Wireframe) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Real-World Photorealistic Visual Showcase (8 Cols on desktop) */}
          <div className="lg:col-span-8 relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-zinc-200/80 bg-zinc-950 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] min-h-[320px] sm:min-h-[420px] lg:min-h-[500px] flex items-center justify-center group">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/20" />

                {/* Top Left Badge (Matches wireframe placeholder position) */}
                <div className="absolute top-5 sm:top-7 left-5 sm:left-7 z-10">
                  <div className="px-4 py-2 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-2.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                    <span>{current.badge}</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Capability Details Card (4 Cols on desktop) */}
          <div className="lg:col-span-4 bg-white border border-zinc-200/80 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] flex flex-col justify-between relative overflow-hidden">
            {/* Subtle background radial tint */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#3B82F6]/10 rounded-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10 flex flex-col h-full justify-between"
              >
                {/* Top Section: Title & Description */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold tracking-widest text-[#3B82F6] uppercase font-mono">
                      Module {current.num}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                  </div>

                  <h3
                    className="normal-case text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight mb-4 tracking-tight"
                    style={{ textTransform: "none" }}
                  >
                    {current.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Bottom Section: Tag & Trend Icon (Matching Wireframe) */}
                <div className="border-t border-zinc-100 pt-6 mt-8 sm:mt-12 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold tracking-wider text-zinc-800 font-mono uppercase">
                    {current.tag}
                  </span>

                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#3B82F6] shadow-sm">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Navigation Indicator Bar (Pills) */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-12">
          {capabilitiesData.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to capability ${item.num}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "w-10 bg-[#3B82F6]"
                    : "w-2 bg-zinc-200 hover:bg-zinc-300"
                }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
