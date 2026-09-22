"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Poppins } from "next/font/google";
import { homeContent } from "@/content/home";
import { Card } from "@/design-system/primitives/surfaces/Card";
import { MarketingButton } from "@/design-system/primitives/actions/MarketingButton";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const platformImages: Record<string, { src: string; alt: string }> = {
  evoltics: {
    src: "/images/platforms/evoltics_hub.jpg",
    alt: "EVOLTICS - Ultra-fast EV charging station infrastructure and load balancing",
  },
  iotrics: {
    src: "/images/platforms/iotrics_factory.jpg",
    alt: "IoTRICS - Industrial IoT edge gateway and telemetry sensors in modern manufacturing",
  },
  cropifai: {
    src: "/images/platforms/cropifai_agriculture.jpg",
    alt: "CropifAI - Precision agriculture IoT weather station and soil sensor monitoring",
  },
};

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

export default function Platforms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  const platforms = homeContent.platforms.items;

  return (
    <section 
      className={`relative w-full pt-16 sm:pt-24 lg:pt-32 pb-0 text-zinc-900 ${poppins.variable} ${poppins.className} z-10`}
      style={{
        '--font-display': 'var(--font-poppins)',
        '--font-sans': 'var(--font-poppins)'
      } as React.CSSProperties}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12" ref={containerRef}>
        
        {/* Panel Layout Grid Wrapper with Header */}
        <div className="bg-[#2a2a2a] relative p-3 sm:p-4 rounded-[1.5rem] lg:rounded-[2rem] shadow-2xl w-full flex flex-col overflow-hidden border border-zinc-700">
          
          {/* Subtle Dotted Grid Background */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#404040_1px,transparent_1px)] [background-size:20px_20px]" />
          
          {/* Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 px-4 lg:px-8 gap-6 md:gap-12">
            <div className="flex items-center gap-4 shrink-0 mb-2 md:mb-2">
              <span className="w-10 sm:w-16 h-[2px] bg-[#3B82F6] block"></span>
              <p className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-[0.2em]">
                {homeContent.platforms.label}
              </p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.05] text-left md:text-right max-w-[20ch]">
              {homeContent.platforms.title}
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-3">
            
            {platforms.map((card, i) => {
              const isMiddle = i === 1;
              const cardBg = isMiddle ? 'bg-[#3B82F6]' : 'bg-[#141414]';
              const titleColor = 'text-white';
              const textColor = isMiddle ? 'text-white/80' : 'text-zinc-400';
              const borderColor = isMiddle ? 'border-[#3B82F6]' : 'border-zinc-800';
              const dividerColor = isMiddle ? 'border-white/20' : 'border-zinc-700';

              return (
                <Link
                  key={card.id}
                  href={`/platforms/${card.id}`}
                  className={`group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-2xl ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                  <Card 
                    variant="outlined" 
                    className={`${cardBg} ${borderColor} border shadow-xl rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col relative h-full min-h-[400px] sm:min-h-[450px] lg:min-h-[550px] transition-all duration-300 group-hover:-translate-y-2 cursor-pointer`}
                  >
                    <div className="relative z-10 flex flex-col h-full">
                      
                      {/* Header: Title & Interactive Arrow */}
                      <div className="flex justify-between items-start mb-6 gap-4">
                        <h3 className={`font-display font-bold normal-case ${titleColor} tracking-tighter leading-[1.1] text-3xl sm:text-4xl lg:text-5xl`}>
                          {card.title}
                        </h3>
                        <div className={`w-10 h-10 rounded-full border ${isMiddle ? 'border-white/30 text-white bg-white/10' : 'border-zinc-700 text-zinc-300 bg-zinc-800/60'} flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black group-hover:border-white shadow-sm`}>
                          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className={`text-sm ${textColor} leading-relaxed mb-6`}>
                        {card.description}
                      </p>
                      
                      {/* Divider & Image Section */}
                      <div className={`w-full border-t ${dividerColor} mt-auto pt-6 flex-grow flex flex-col relative`}>
                        <div className="w-full flex-grow min-h-[220px] sm:min-h-[250px] lg:min-h-[260px] bg-black/40 rounded-[1.5rem] relative overflow-hidden flex items-center justify-center shadow-inner">
                          {platformImages[card.id] ? (
                            <>
                              <Image
                                src={platformImages[card.id].src}
                                alt={platformImages[card.id].alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-all duration-700 ease-out grayscale contrast-90 brightness-90 opacity-80 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 group-hover:from-black/30 transition-colors duration-700 pointer-events-none" />
                            </>
                          ) : (
                            <span className="text-xs font-bold uppercase tracking-widest text-white/20">Platform Visual</span>
                          )}
                        </div>
                      </div>
                      
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* 3C Methodology Process Section */}
          <div className="relative z-10 mt-12 pt-16 pb-8 border-t border-zinc-700/50 flex flex-col px-4 lg:px-8">
            
            {/* Massive Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="flex flex-col max-w-2xl">
                <h3 className="text-white text-3xl sm:text-4xl lg:text-6xl font-display font-bold tracking-tighter leading-tight">
                  The 3C Methodology
                </h3>
              </div>
              <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                Our proprietary framework for transforming legacy industrial infrastructure into autonomous, intelligent ecosystems.
              </p>
            </div>
            
            {/* Aurora Beam Cards Grid */}
            <div className="relative z-10 mt-8">
              {/* Connecting Aurora Line (Desktop Only) */}
              <div className="absolute top-[45%] left-8 right-8 h-[5px] -translate-y-1/2 hidden md:block z-0 bg-zinc-900 rounded-full overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.8)] border border-zinc-800/50">
                 <div className="w-full h-full bg-gradient-to-r from-transparent via-[#60a5fa] to-transparent opacity-100 animate-pulse" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                {[
                  { 
                    step: "01", 
                    title: "Collect", 
                    desc: "Seamlessly integrate industrial infrastructure, legacy sensors, EV chargers, and enterprise systems into a unified operational ecosystem using open communication protocols.",
                    metric: "100% Hardware Agnostic"
                  },
                  { 
                    step: "02", 
                    title: "Connect", 
                    desc: "Process millions of data points in real-time across cloud and edge. We utilize advanced predictive analytics to transform raw telemetry into actionable intelligence.",
                    metric: "Sub-millisecond Latency"
                  },
                  { 
                    step: "03", 
                    title: "Collaborate", 
                    desc: "Automate mission-critical decisions and orchestrate operations autonomously. Execute load balancing, preemptive maintenance, and dynamic workflows.",
                    metric: "Zero-Touch Operations"
                  }
                ].map((c, i) => (
                  <div 
                    key={c.step} 
                    className={`relative p-[5px] rounded-[1.75rem] overflow-hidden flex shadow-2xl ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                  >
                    {/* Rotating Aurora Border */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] aspect-square animate-spin [animation-duration:4s] bg-[conic-gradient(from_0deg,transparent_0%,transparent_35%,#3B82F6_45%,#93c5fd_50%,transparent_55%,transparent_100%)] opacity-100" />
                    
                    {/* Static Border Fallback */}
                    <div className="absolute inset-0 bg-[#2a2a2a] rounded-[1.75rem]" />
                    
                    {/* Inner Card */}
                    <div className="relative z-10 flex flex-col flex-grow bg-[#000000] rounded-[1.5rem] p-6 sm:p-8 lg:p-10 overflow-hidden">
                      {/* Step Number */}
                      <span className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-900 mb-6 lg:mb-8 block">
                        {c.step}
                      </span>
                      
                      {/* Content */}
                      <h4 className="text-2xl sm:text-3xl font-bold text-white mb-3 lg:mb-4">{c.title}</h4>
                      <p className="text-zinc-400 text-sm sm:text-base leading-relaxed flex-grow mb-6 lg:mb-8">
                        {c.desc}
                      </p>
                      
                      {/* Metric Footer */}
                      <div className="mt-auto pt-6 border-t border-zinc-800/80 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,1)] animate-pulse" />
                        <span className="text-sm font-bold text-zinc-300 uppercase tracking-wider">{c.metric}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

