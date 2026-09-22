"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, RadioTower, Cloud, Database, LayoutDashboard } from "lucide-react";
import { Container } from "@/design-system/primitives/layout/Container";

const pipelineNodes = [
  {
    icon: Cpu,
    label: "FIELD SENSORS",
    text: "Industrial soil moisture, weather, and environmental sensors capture real-time agricultural telemetry."
  },
  {
    icon: RadioTower,
    label: "LoRaWAN GATEWAY",
    text: "Long-range, low-power LoRaWAN gateways collect telemetry across up to 15km radius without cellular dependencies."
  },
  {
    icon: Cloud,
    label: "CROPIFAI CLOUD",
    text: "A unified IoT cloud platform to ingest, process, and analyze high-frequency field telemetry in real-time."
  },
  {
    icon: Database,
    label: "CLOUD INTEGRATION",
    text: "API-ready integrations connecting farm operations to ERPs, SCADA systems, AWS, Azure, and local servers."
  },
  {
    icon: LayoutDashboard,
    label: "DASHBOARD",
    text: "Intuitive farm maps, live moisture analytics, automated valve control triggers, and instant alerts."
  },
];

export default function CropifaiArchitecture() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % pipelineNodes.length);
    }, 2500); // 2.5 seconds per step
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="relative w-full py-24 lg:py-32 bg-white overflow-hidden font-sans border-b border-slate-200/60">
      
      {/* Background Architectural Grid & Radial Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_15%,transparent_100%)]" />
      </div>

      <Container size="xl" className="relative z-10">
        
        {/* Header Content */}
        <div className="text-center mb-16 sm:mb-20 max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
            SYSTEM ARCHITECTURE
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-slate-900 leading-tight tracking-tight mb-6">
            Seamless Interoperability
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            An ecosystem built for scale and flexibility, connecting your physical fields to any digital platform.
          </p>
        </div>

        {/* Interactive Pipeline Stepper */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-5xl relative mb-8 px-2 sm:px-6">
            
            {/* Background Dashed Connecting Line (desktop only) */}
            <div className="hidden lg:block absolute top-[36px] md:top-[40px] left-[8%] right-[8%] h-[2px] -z-20 border-t-2 border-dashed border-slate-200" />
            
            {/* Traveling Glow Pulse Animation (desktop only) */}
            <div className="hidden lg:block absolute top-[36px] md:top-[40px] left-[8%] right-[8%] h-[2px] -z-10 overflow-visible pointer-events-none">
              <motion.div 
                className="w-24 h-[3px] rounded-full bg-primary shadow-[0_0_14px_4px_rgba(59,130,246,0.65)] absolute top-0 -translate-y-1/2"
                animate={{
                  left: ["0%", "100%"]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            
            {/* Pipeline Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-between gap-6 sm:gap-8 lg:gap-0 relative">
              {pipelineNodes.map((node, i) => {
                const isActive = i === activeIndex;
                const isPast = i < activeIndex;

                return (
                  <div 
                    key={i} 
                    className="flex flex-col items-center bg-white px-2 z-10 cursor-pointer group select-none"
                    onMouseEnter={() => {
                      setActiveIndex(i);
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setActiveIndex(i)}
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 bg-white transition-all duration-500 ${
                      isActive 
                        ? 'border-primary shadow-[0_0_24px_rgba(59,130,246,0.35)] scale-110' 
                        : isPast 
                          ? 'border-primary/40' 
                          : 'border-slate-100 text-slate-300'
                    } group-hover:border-primary/60`}>
                      <node.icon className={`w-6 h-6 md:w-7 md:h-7 transition-colors duration-500 ${
                        isActive 
                          ? 'text-primary' 
                          : isPast 
                            ? 'text-primary/70' 
                            : 'text-slate-400'
                      } group-hover:text-primary`} />
                    </div>
                    <span className={`mt-3 md:mt-4 text-[10px] md:text-xs font-bold tracking-wider text-center transition-colors duration-500 ${
                      isActive 
                        ? 'text-primary' 
                        : isPast 
                          ? 'text-primary/70' 
                          : 'text-slate-400'
                    } group-hover:text-primary`}>
                      {node.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Dynamic Tagline Text */}
          <div className="h-16 flex items-center justify-center overflow-hidden w-full px-4 mt-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={`tagline-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center text-base sm:text-lg lg:text-xl font-medium text-slate-700 max-w-2xl mx-auto leading-relaxed"
              >
                {pipelineNodes[activeIndex].text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

      </Container>
    </section>
  );
}
