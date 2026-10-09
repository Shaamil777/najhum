"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Droplets, CloudRain, Zap, Signal, Activity, Wifi, Bluetooth, Satellite, Cloud, Target, BarChart3, Factory, Cpu, ChevronRight, Bell } from "lucide-react";

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
    <section id="solutions" className="w-full py-24 bg-white text-neutral-900 overflow-hidden font-poppins">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 relative mb-16 sm:mb-24">
          
          {/* Card 1: COLLECT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col p-6 sm:p-8 md:p-10 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-500 relative group"
          >
            <div className="flex items-center mb-4 sm:mb-6 gap-3">
              <span className="text-blue-600 font-bold text-xl sm:text-2xl">{cardsData[0].num}</span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 uppercase">{cardsData[0].label}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-neutral-900">{cardsData[0].title}</h3>
            <p className="text-sm sm:text-base text-neutral-600 mb-8 sm:mb-12 leading-relaxed flex-grow">
              {cardsData[0].description}
            </p>
            
            {/* Arrow */}
            <div className="hidden lg:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.08)] items-center justify-center text-blue-600 z-10">
              <ChevronRight className="w-6 h-6" />
            </div>

            {/* Dummy Icons Row */}
            <div className="grid grid-cols-4 gap-2 text-neutral-400 mt-auto pt-6 sm:pt-8 border-t border-neutral-100">
              <div className="flex flex-col items-center text-center gap-2"><Thermometer className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" /><span className="text-[8px] sm:text-[9px] uppercase font-semibold">Temp.</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" /><span className="text-[8px] sm:text-[9px] uppercase font-semibold">Humidity</span></div>
              <div className="flex flex-col items-center text-center gap-2"><CloudRain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" /><span className="text-[8px] sm:text-[9px] uppercase font-semibold">Air Quality</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" /><span className="text-[8px] sm:text-[9px] uppercase font-semibold">Energy</span></div>
            </div>
          </motion.div>

          {/* Card 2: CONNECT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col p-6 sm:p-8 md:p-10 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-500 relative group"
          >
            <div className="flex items-center mb-4 sm:mb-6 gap-3">
              <span className="text-emerald-500 font-bold text-xl sm:text-2xl">{cardsData[1].num}</span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-emerald-500 uppercase">{cardsData[1].label}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-neutral-900">{cardsData[1].title}</h3>
            <p className="text-sm sm:text-base text-neutral-600 mb-8 sm:mb-12 leading-relaxed flex-grow">
              {cardsData[1].description}
            </p>

            {/* Arrow */}
            <div className="hidden lg:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.08)] items-center justify-center text-emerald-500 z-10">
              <ChevronRight className="w-6 h-6" />
            </div>

            {/* Dummy Icons Row */}
            <div className="grid grid-cols-5 gap-2 text-neutral-400 mt-auto pt-6 sm:pt-8 border-t border-neutral-100">
              <div className="flex flex-col items-center text-center gap-2"><Signal className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" /><span className="text-[8px] sm:text-[9px] uppercase font-semibold">Cellular</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Activity className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" /><span className="text-[8px] sm:text-[9px] uppercase font-semibold">Fiber</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" /><span className="text-[8px] sm:text-[9px] font-semibold tracking-wider">LoRaWAN</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Bluetooth className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" /><span className="text-[8px] sm:text-[9px] uppercase font-semibold">BLE</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Satellite className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" /><span className="text-[8px] sm:text-[9px] uppercase font-semibold">Satellite</span></div>
            </div>
          </motion.div>

          {/* Card 3: COLLABORATE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col p-6 sm:p-8 md:p-10 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-500 relative group"
          >
            <div className="flex items-center mb-4 sm:mb-6 gap-3">
              <span className="text-indigo-600 font-bold text-xl sm:text-2xl">{cardsData[2].num}</span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-indigo-600 uppercase">{cardsData[2].label}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-neutral-900">{cardsData[2].title}</h3>
            <p className="text-sm sm:text-base text-neutral-600 mb-8 sm:mb-12 leading-relaxed flex-grow">
              {cardsData[2].description}
            </p>

            {/* Dummy Icons Row */}
            <div className="grid grid-cols-4 gap-2 text-neutral-400 mt-auto pt-6 sm:pt-8 border-t border-neutral-100">
              <div className="flex flex-col items-center text-center gap-2"><Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" /><span className="text-[8px] sm:text-[9px] uppercase font-semibold">Platform</span></div>
              <div className="flex flex-col items-center text-center gap-2"><BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" /><span className="text-[8px] sm:text-[9px] uppercase font-semibold">Analytics</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Bell className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" /><span className="text-[8px] sm:text-[9px] uppercase font-semibold">Alerts</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Target className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" /><span className="text-[8px] sm:text-[9px] uppercase font-semibold">Predictive</span></div>
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
              )})}
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
