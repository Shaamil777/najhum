"use client";

import React from "react";
import { motion } from "framer-motion";
import { homeContent } from "@/content/home";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function About() {
  const { about } = homeContent;

  return (
    <section className="w-full bg-[#f8f8f8] text-neutral-900 font-sans border-t border-neutral-200">
      
      {/* 
        Main 4-column Grid Container 
        Using grid-cols-4 on large screens to perfectly match the reference layout.
      */}
      <div className="w-full px-4 md:px-6 lg:px-8 pb-4 lg:pb-8 mx-auto grid grid-cols-1 lg:grid-cols-4 border-l border-r border-dashed border-neutral-300">
        
        {/* =======================
            TOP ROW (Content) 
        ======================= */}
        
        {/* Column 1: Left Content */}
        <div className="p-8 lg:p-12 lg:border-r border-dashed border-neutral-300 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase text-neutral-500 mb-16 lg:mb-24 flex items-center gap-2">
              <span className="text-neutral-900">+</span> {about.badge.replace("+ ", "")}
            </p>
            
            <p className="text-base lg:text-lg text-neutral-600 leading-relaxed max-w-[280px]">
              {about.leftContent}
            </p>
          </div>
        </div>

        {/* Columns 2 & 3: Huge Headline */}
        <div className="col-span-1 lg:col-span-2 p-8 lg:p-12 lg:border-r border-dashed border-neutral-300 flex items-start lg:pt-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-neutral-900 whitespace-pre-line"
          >
            {about.headline}
          </motion.h2>
        </div>

        {/* Column 4: Description */}
        <div className="p-8 lg:p-12 flex flex-col justify-center lg:pt-32">
          <p className="text-base lg:text-lg text-neutral-600 leading-relaxed font-medium">
            {about.description}
          </p>
        </div>


        {/* =======================
            MIDDLE ROW (Marquee) 
        ======================= */}
        <div className="col-span-1 lg:col-span-4 border-t border-b border-dashed border-neutral-300 flex items-center justify-between bg-[#f8f8f8] relative overflow-hidden h-16 lg:h-20">
          
          <div className="flex-1 flex overflow-hidden mask-image-linear-gradient">
            <motion.div 
              className="flex items-center gap-12 lg:gap-24 whitespace-nowrap w-max"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {/* Group 1 - Trust Strip */}
              <div className="flex items-center gap-12 lg:gap-24">
                {about.trustStrip.map((item: string, index: number) => (
                  <div key={`g1-${index}`} className="flex items-center gap-12 lg:gap-24">
                    <span className="text-sm lg:text-base font-black tracking-widest text-neutral-500 uppercase">{item}</span>
                    <span className="text-neutral-300">•</span>
                  </div>
                ))}
              </div>
              {/* Group 2 - Exact Duplicate for seamless loop */}
              <div className="flex items-center gap-12 lg:gap-24">
                {about.trustStrip.map((item: string, index: number) => (
                  <div key={`g2-${index}`} className="flex items-center gap-12 lg:gap-24">
                    <span className="text-sm lg:text-base font-black tracking-widest text-neutral-500 uppercase">{item}</span>
                    <span className="text-neutral-300">•</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <button className="h-full px-8 bg-neutral-200/50 hover:bg-neutral-200 transition-colors flex items-center gap-4 text-xs font-bold tracking-tight z-10 border-l border-dashed border-neutral-300 shrink-0">
            {about.buttonLabel}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>


        {/* =======================
            BOTTOM ROW (Cards) 
        ======================= */}
        
        {about.stats.map((stat, i) => (
          <div 
            key={stat.id} 
            className={`p-6 lg:p-8 ${i !== 3 ? 'lg:border-r border-dashed border-neutral-300' : ''}`}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-lg p-6 lg:p-8 shadow-sm h-full flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="mb-12">
                <div className="w-8 flex gap-1 mb-4">
                  <div className="w-2 h-2 rounded-full bg-neutral-800"></div>
                  <div className="w-2 h-2 rounded-full bg-neutral-800"></div>
                  <div className="w-2 h-2 rounded-full bg-neutral-800"></div>
                  <div className="w-2 h-2 rounded-full bg-neutral-800"></div>
                </div>
                <h3 className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 leading-relaxed">
                  {stat.title}
                </h3>
              </div>
              
              <div>
                <div className="text-4xl lg:text-6xl font-black text-neutral-900 tracking-tighter mb-4">
                  {stat.value}
                </div>
                <p className="text-xs lg:text-sm text-neutral-500 font-medium leading-relaxed max-w-[160px]">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          </div>
        ))}

      </div>
    </section>
  );
}