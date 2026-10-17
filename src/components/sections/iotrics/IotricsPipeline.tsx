"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Factory, Cpu, Signal, Cloud, BarChart3, Target } from "lucide-react";

import { iotricsContent } from "@/content/iotrics";

const pipelineNodesConfig = iotricsContent.about.pipeline;

const pipelineNodes = [
  { icon: Factory, label: pipelineNodesConfig[0].label, text: pipelineNodesConfig[0].text },
  { icon: Cpu, label: pipelineNodesConfig[1].label, text: pipelineNodesConfig[1].text },
  { icon: Signal, label: pipelineNodesConfig[2].label, text: pipelineNodesConfig[2].text },
  { icon: Cloud, label: pipelineNodesConfig[3].label, text: pipelineNodesConfig[3].text },
  { icon: BarChart3, label: pipelineNodesConfig[4].label, text: pipelineNodesConfig[4].text },
  { icon: Target, label: pipelineNodesConfig[5].label, text: pipelineNodesConfig[5].text },
];

export default function IotricsPipeline() {
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
    <section
      aria-label="IoTRICs Architecture Pipeline"
      id="iotrics-pipeline"
      className="w-full pt-14 sm:pt-16 lg:pt-20 pb-12 sm:pb-14 bg-white text-neutral-900 overflow-hidden font-poppins border-b border-neutral-100"
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Pipeline/Timeline */}
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
                );
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
