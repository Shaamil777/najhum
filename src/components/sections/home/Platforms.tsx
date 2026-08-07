"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { Poppins } from "next/font/google";
import { homeContent } from "@/content/home";
import { Card } from "@/design-system/primitives/surfaces/Card";
import { MarketingButton } from "@/design-system/primitives/actions/MarketingButton";
import { ArrowRight } from "lucide-react";

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
      className={`relative w-full pt-24 sm:pt-32 pb-0 text-zinc-900 ${poppins.variable} ${poppins.className} z-10`}
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
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between pt-16 pb-20 lg:pt-20 lg:pb-24 px-4 lg:px-8 gap-8 md:gap-12">
            <div className="flex items-center gap-4 shrink-0 mb-4 md:mb-2">
              <span className="w-12 sm:w-16 h-[2px] bg-[#4c3bcf] hidden sm:block"></span>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em]">
                {homeContent.platforms.label}
              </p>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.05] text-left md:text-right max-w-[20ch]">
              {homeContent.platforms.title}
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
            
            {platforms.map((card, i) => {
              const isMiddle = i === 1;
              const cardBg = isMiddle ? 'bg-[#4c3bcf]' : 'bg-[#141414]';
              const titleColor = 'text-white';
              const textColor = isMiddle ? 'text-white/80' : 'text-zinc-400';
              const borderColor = isMiddle ? 'border-[#4c3bcf]' : 'border-zinc-800';
              const dividerColor = isMiddle ? 'border-white/20' : 'border-zinc-700';

              return (
                <Card 
                  key={card.id} 
                  variant="outlined" 
                  className={`${cardBg} ${borderColor} border shadow-xl rounded-2xl p-6 lg:p-8 flex flex-col relative group h-full min-h-[450px] lg:min-h-[550px] transition-all duration-300 hover:-translate-y-2`}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    
                    {/* Header: Title */}
                    <div className="flex justify-between items-start mb-6">
                      <h3 className={`font-display font-bold ${titleColor} tracking-tighter leading-[1.1] text-4xl lg:text-5xl pr-4`}>
                        {card.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className={`text-sm ${textColor} leading-relaxed mb-6`}>
                      {card.description}
                    </p>
                    
                    {/* Divider & Image Section */}
                    <div className={`w-full border-t ${dividerColor} mt-auto pt-6 flex-grow flex flex-col relative`}>
                      <div className="w-full flex-grow min-h-[220px] bg-black/20 rounded-[1.5rem] relative overflow-hidden flex items-center justify-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-white/20">Platform Visual</span>
                      </div>
                    </div>
                    
                  </div>
                </Card>
              );
            })}
          </div>

          {/* 3C Methodology Process Section */}
          <div className="relative z-10 mt-12 pt-16 pb-8 border-t border-zinc-700/50 flex flex-col px-4 lg:px-8">
            
            {/* Massive Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="flex flex-col max-w-2xl">
                <h3 className="text-white text-5xl lg:text-6xl font-display font-bold tracking-tighter leading-tight">
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
              <div className="absolute top-[45%] left-8 right-8 h-[5px] -translate-y-1/2 hidden md:block z-0 bg-zinc-900 rounded-full overflow-hidden shadow-[0_0_20px_rgba(76,59,207,0.8)] border border-zinc-800/50">
                 <div className="w-full h-full bg-gradient-to-r from-transparent via-[#816bf9] to-transparent opacity-100 animate-pulse" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                {[
                  { 
                    step: "01", 
                    title: "Connect", 
                    desc: "Seamlessly integrate industrial infrastructure, legacy sensors, EV chargers, and enterprise systems into a unified operational ecosystem using open communication protocols.",
                    metric: "100% Hardware Agnostic"
                  },
                  { 
                    step: "02", 
                    title: "Compute", 
                    desc: "Process millions of data points in real-time across cloud and edge. We utilize advanced predictive analytics to transform raw telemetry into actionable intelligence.",
                    metric: "Sub-millisecond Latency"
                  },
                  { 
                    step: "03", 
                    title: "Control", 
                    desc: "Automate mission-critical decisions and orchestrate operations autonomously. Execute load balancing, preemptive maintenance, and dynamic workflows.",
                    metric: "Zero-Touch Operations"
                  }
                ].map((c) => (
                  <div 
                    key={c.step} 
                    className="relative p-[5px] rounded-[1.75rem] overflow-hidden flex shadow-2xl"
                  >
                    {/* Rotating Aurora Border */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] aspect-square animate-spin [animation-duration:4s] bg-[conic-gradient(from_0deg,transparent_0%,transparent_35%,#4c3bcf_45%,#a397ff_50%,transparent_55%,transparent_100%)] opacity-100" />
                    
                    {/* Static Border Fallback */}
                    <div className="absolute inset-0 bg-[#2a2a2a] rounded-[1.75rem]" />
                    
                    {/* Inner Card */}
                    <div className="relative z-10 flex flex-col flex-grow bg-[#000000] rounded-[1.5rem] p-8 lg:p-10 overflow-hidden">
                      {/* Step Number */}
                      <span className="text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-900 mb-8 block">
                        {c.step}
                      </span>
                      
                      {/* Content */}
                      <h4 className="text-3xl font-bold text-white mb-4">{c.title}</h4>
                      <p className="text-zinc-400 text-base leading-relaxed flex-grow mb-8">
                        {c.desc}
                      </p>
                      
                      {/* Metric Footer */}
                      <div className="mt-auto pt-6 border-t border-zinc-800/80 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#4c3bcf] shadow-[0_0_15px_rgba(76,59,207,1)] animate-pulse" />
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

