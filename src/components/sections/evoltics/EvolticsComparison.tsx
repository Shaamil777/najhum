"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonItem {
  id: string;
  traditional: {
    title: string;
    description: string;
    details: string;
  };
  evoltics: {
    title: string;
    description: string;
    details: string;
  };
}

const comparisonData: ComparisonItem[] = [
  {
    id: "vendors",
    traditional: {
      title: "FRAGMENTED VENDORS",
      description: "Dealing with 5+ different contractors for one project.",
      details: "Siloed contracts, misaligned timelines, and passing the blame when issues arise."
    },
    evoltics: {
      title: "ONE PARTNER",
      description: "Single point of contact for design, build, and management.",
      details: "Turnkey accountability across licensing, hardware supply, civil works, and CPMS."
    }
  },
  {
    id: "silos",
    traditional: {
      title: "COMMUNICATION SILOS",
      description: "Manual data reconciliation between hardware and software.",
      details: "Delayed billing cycles, uncaptured socket errors, and proprietary hardware lock-in."
    },
    evoltics: {
      title: "UNIFIED PLATFORM",
      description: "Seamless hardware-to-software integration with real-time sync.",
      details: "Instant telemetry, automated tariff invoicing, and sub-second remote control."
    }
  },
  {
    id: "compliance",
    traditional: {
      title: "HIDDEN COMPLIANCE RISK",
      description: "Regulatory gaps due to lack of end-to-end oversight.",
      details: "Delayed utility grid energization and unexpected authority inspection penalties."
    },
    evoltics: {
      title: "FIXED COMPLIANCE",
      description: "Pre-approved regulatory workflows and certified licensing.",
      details: "Full statutory compliance with DEWA, TAQA, and FEWA standards from day zero."
    }
  }
];

export default function EvolticsComparison() {
  return (
    <section className="w-full relative overflow-hidden font-sans">
      
      {/* Background Split (Desktop Only) */}
      <div className="absolute inset-0 pointer-events-none hidden lg:flex">
        {/* Left Side Bg */}
        <div className="w-1/2 bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-200/40 rounded-full blur-[120px]" />
        </div>
        {/* Right Side Bg */}
        <div className="w-1/2 bg-blue-50/40 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
        </div>
      </div>

      <div className="container mx-auto relative z-10 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 xl:gap-32">
          
          {/* LEFT COLUMN: Traditional */}
          <div className="py-20 lg:py-32 px-6 flex flex-col items-center lg:items-end border-b lg:border-b-0 border-border/40 bg-white lg:bg-transparent">
            
            <h2 className="text-3xl lg:text-4xl font-medium tracking-tight text-zinc-600 mb-16 text-center lg:text-right w-full">
              Instead of
            </h2>

            <div className="space-y-6 w-full flex flex-col items-center lg:items-end">
              {comparisonData.map((item, idx) => {
                let staggerClass = "";
                if (idx === 0) staggerClass = "lg:mr-12";
                if (idx === 1) staggerClass = "lg:mr-0";
                if (idx === 2) staggerClass = "lg:mr-16";

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={cn(
                      "bg-white border border-zinc-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-8 max-w-[420px] w-full transition-transform hover:-translate-y-1",
                      staggerClass
                    )}
                  >
                    <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-2 block">
                      {item.traditional.title}
                    </span>
                    <h4 className="text-base font-semibold text-zinc-800 mb-2 leading-snug">
                      {item.traditional.description}
                    </h4>
                    <p className="text-[13px] text-zinc-500 leading-relaxed">
                      {item.traditional.details}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Left Col Bottom Tag */}
            <div className="mt-12 w-full max-w-[400px] text-center lg:text-right">
               <p className="text-xs text-zinc-500">Overall Project Friction: <span className="font-bold text-zinc-700">High Overhead & Delays</span></p>
            </div>
          </div>

          {/* RIGHT COLUMN: Evoltics */}
          <div className="py-20 lg:py-32 px-6 flex flex-col items-center lg:items-start bg-blue-50/30 lg:bg-transparent">
            
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900 mb-16 text-center lg:text-left w-full">
              Evoltics <span className="font-serif italic font-normal text-primary">gives</span>
            </h2>

            <div className="space-y-6 w-full flex flex-col items-center lg:items-start">
              {comparisonData.map((item, idx) => {
                let staggerClass = "";
                if (idx === 0) staggerClass = "lg:ml-0";
                if (idx === 1) staggerClass = "lg:ml-12";
                if (idx === 2) staggerClass = "lg:ml-6";

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={cn(
                      "bg-white lg:bg-[#f6f9fc] backdrop-blur-sm border border-primary/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-primary/5 rounded-[2.5rem] p-8 max-w-[420px] w-full transition-transform hover:-translate-y-1",
                      staggerClass
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 shrink-0">
                        <Check className="w-5 h-5 text-primary" strokeWidth={3} />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold tracking-wider text-primary/70 uppercase mb-2 block">
                          {item.evoltics.title}
                        </span>
                        <h4 className="text-base font-bold text-zinc-900 mb-2 leading-snug">
                          {item.evoltics.description}
                        </h4>
                        <p className="text-[13px] text-zinc-600 leading-relaxed">
                          {item.evoltics.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Col Bottom Tag */}
            <div className="mt-12 w-full max-w-[400px] text-center lg:text-left">
               <p className="text-xs text-primary/80">Deployment Timeline: <span className="font-bold text-primary">Up to 60% Faster Delivery</span></p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
