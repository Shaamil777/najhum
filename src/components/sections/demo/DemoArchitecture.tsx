"use client";

import React, { useRef } from "react";
import { Activity, Router, Wifi, Cloud, BarChart3, LayoutDashboard, Settings2, Target } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { demoContent } from "@/content/demo";

export default function DemoArchitecture() {
  const { architecture } = demoContent;
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const iconMap: Record<string, React.ElementType> = {
    Activity, Router, Wifi, Cloud, BarChart3, LayoutDashboard, Settings2, Target
  };

  const steps = architecture.steps.map(step => {
    const Icon = iconMap[step.iconName] || Activity;
    const isEnd = step.isEnd;
    return {
      ...step,
      icon: <Icon className={`w-4 h-4 md:w-5 md:h-5 ${isEnd ? 'text-white' : ''}`} />
    };
  });

  return (
    <section className="w-full bg-white py-16 md:py-20 border-b border-neutral-200 overflow-hidden font-sans">
      <div className="container-base max-w-[1200px]" ref={containerRef}>
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-neutral-900 leading-tight">
              {architecture.title}
            </h2>
          </div>
          <p className="text-neutral-500 text-sm md:text-base max-w-sm text-center md:text-right">
            {architecture.description}
          </p>
        </div>

        {/* Desktop Horizontal Pipeline */}
        <div className="hidden md:block w-full overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
          <div className="min-w-[900px] relative pt-2">
            
            {/* The Connecting Track */}
            <div className="absolute top-[26px] md:top-[30px] left-8 right-8 h-[3px] bg-neutral-200 rounded-full overflow-hidden">
              {/* Animated Data Pulse */}
              <motion.div 
                className="h-full w-1/4 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                animate={isInView ? { x: ["-100%", "400%"] } : {}}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="relative flex justify-between items-start w-full">
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center group w-24 md:w-28 shrink-0"
                >
                  {/* Icon Node */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center relative z-10 mb-4 transition-all duration-300 shadow-sm
                    ${step.isEnd 
                      ? 'bg-black text-white border-2 border-black shadow-[0_0_20px_rgba(0,0,0,0.2)] transform group-hover:scale-110' 
                      : 'bg-white border-2 border-neutral-200 text-neutral-500 group-hover:border-black group-hover:text-black group-hover:shadow-md transform group-hover:-translate-y-1'
                    }
                  `}>
                    {step.icon}
                  </div>
                  
                  {/* Labels */}
                  <h4 className="text-[10px] md:text-xs font-black text-neutral-900 text-center uppercase tracking-widest mb-1 group-hover:text-black transition-colors">
                    {step.label}
                  </h4>
                  <p className="text-[9px] md:text-[10px] text-neutral-500 text-center leading-tight font-medium">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Grid Pipeline */}
        <div className="block md:hidden mt-8">
          <div className="grid grid-cols-3 gap-y-10 gap-x-2">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center group relative"
              >
                {/* Icon Node */}
                <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center relative z-10 mb-3 transition-all duration-300 shadow-sm
                  ${step.isEnd 
                    ? 'bg-black text-white border-2 border-black shadow-[0_0_15px_rgba(0,0,0,0.2)]' 
                    : 'bg-white border-2 border-neutral-200 text-neutral-500'
                  }
                `}>
                  {step.icon}
                </div>
                
                {/* Labels */}
                <h4 className="text-[9px] sm:text-[10px] font-black text-neutral-900 text-center uppercase tracking-widest mb-1 leading-tight">
                  {step.label}
                </h4>
                <p className="text-[8px] sm:text-[9px] text-neutral-500 text-center leading-tight font-medium px-1">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}