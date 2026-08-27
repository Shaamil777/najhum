"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplets, CloudRain, Zap, Signal, Activity, Wifi, Bluetooth, Satellite, Cloud, Target, BarChart3, Factory, Cpu, ChevronRight, Bell } from "lucide-react";

export default function IotricsAbout() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 6);
    }, 1500); // 1.5 seconds per step
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-24 bg-white text-neutral-900 border-b border-neutral-200 overflow-hidden font-[family-name:var(--font-poppins)]">
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
        
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
              From Physical Assets <br className="hidden md:block" />
              to Actionable Intelligence
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-neutral-500 text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed"
          >
            IoTRICs connects your physical infrastructure to a unified IoT platform. 
            Collect data in real-time, transmit it securely, and turn it into actionable 
            insights for smarter operations.
          </motion.p>
        </div>

        {/* Three Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative mb-24">
          
          {/* Card 1: COLLECT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col p-8 md:p-10 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-500 relative group"
          >
            <div className="flex items-center mb-6 gap-3">
              <span className="text-blue-600 font-bold text-2xl">01</span>
              <span className="text-sm font-bold tracking-widest text-blue-600 uppercase">COLLECT</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-neutral-900">Capture What Matters</h3>
            <p className="text-neutral-600 mb-12 leading-relaxed flex-grow">
              Industrial-grade sensors capture critical environmental and operational data across your assets.
            </p>
            
            {/* Arrow */}
            <div className="hidden lg:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.08)] items-center justify-center text-blue-600 z-10">
              <ChevronRight className="w-6 h-6" />
            </div>

            {/* Dummy Icons Row */}
            <div className="grid grid-cols-4 gap-2 text-neutral-400 mt-auto pt-8 border-t border-neutral-100">
              <div className="flex flex-col items-center text-center gap-2"><Thermometer className="w-6 h-6 text-blue-500" /><span className="text-[9px] uppercase font-semibold">Temp.</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Droplets className="w-6 h-6 text-blue-500" /><span className="text-[9px] uppercase font-semibold">Humidity</span></div>
              <div className="flex flex-col items-center text-center gap-2"><CloudRain className="w-6 h-6 text-blue-500" /><span className="text-[9px] uppercase font-semibold">Air Quality</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Zap className="w-6 h-6 text-blue-500" /><span className="text-[9px] uppercase font-semibold">Energy</span></div>
            </div>
          </motion.div>

          {/* Card 2: CONNECT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col p-8 md:p-10 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-500 relative group"
          >
            <div className="flex items-center mb-6 gap-3">
              <span className="text-emerald-500 font-bold text-2xl">02</span>
              <span className="text-sm font-bold tracking-widest text-emerald-500 uppercase">CONNECT</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-neutral-900">Move Data Reliably</h3>
            <p className="text-neutral-600 mb-12 leading-relaxed flex-grow">
              Resilient connectivity options ensure your data reaches the platform from anywhere, every time.
            </p>

            {/* Arrow */}
            <div className="hidden lg:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.08)] items-center justify-center text-emerald-500 z-10">
              <ChevronRight className="w-6 h-6" />
            </div>

            {/* Dummy Icons Row */}
            <div className="grid grid-cols-5 gap-2 text-neutral-400 mt-auto pt-8 border-t border-neutral-100">
              <div className="flex flex-col items-center text-center gap-2"><Signal className="w-6 h-6 text-emerald-500" /><span className="text-[9px] uppercase font-semibold">Cellular</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Activity className="w-6 h-6 text-emerald-500" /><span className="text-[9px] uppercase font-semibold">Fiber</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Wifi className="w-6 h-6 text-emerald-500" /><span className="text-[9px] uppercase font-semibold">LoRaWAN</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Bluetooth className="w-6 h-6 text-emerald-500" /><span className="text-[9px] uppercase font-semibold">BLE</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Satellite className="w-6 h-6 text-emerald-500" /><span className="text-[9px] uppercase font-semibold">Satellite</span></div>
            </div>
          </motion.div>

          {/* Card 3: COLLABORATE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col p-8 md:p-10 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-500 relative group"
          >
            <div className="flex items-center mb-6 gap-3">
              <span className="text-indigo-600 font-bold text-2xl">03</span>
              <span className="text-sm font-bold tracking-widest text-indigo-600 uppercase">COLLABORATE</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-neutral-900">Turn Data Into Decisions</h3>
            <p className="text-neutral-600 mb-12 leading-relaxed flex-grow">
              Powerful cloud intelligence delivers real-time visualization, alerts, and predictive insights to help you act faster.
            </p>

            {/* Dummy Icons Row */}
            <div className="grid grid-cols-4 gap-2 text-neutral-400 mt-auto pt-8 border-t border-neutral-100">
              <div className="flex flex-col items-center text-center gap-2"><Cloud className="w-6 h-6 text-indigo-500" /><span className="text-[9px] uppercase font-semibold">Platform</span></div>
              <div className="flex flex-col items-center text-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-500" /><span className="text-[9px] uppercase font-semibold">Analytics</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Bell className="w-6 h-6 text-indigo-500" /><span className="text-[9px] uppercase font-semibold">Alerts</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Target className="w-6 h-6 text-indigo-500" /><span className="text-[9px] uppercase font-semibold">Predictive</span></div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Pipeline/Timeline */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-4xl relative flex items-center justify-between mb-8 px-4">
            
            {/* Background Dashed line */}
            <div className="absolute top-1/2 left-[5%] right-[5%] h-[2px] bg-neutral-200 -z-20 translate-y-[-50%] border-t-2 border-dashed border-neutral-300" />
            
            {/* Moving Pulse Animation */}
            <div className="absolute top-1/2 left-[5%] right-[5%] h-[2px] -z-10 translate-y-[-50%] overflow-hidden">
              <motion.div 
                className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent absolute top-0"
                animate={{
                  left: ["-33%", "100%"]
                }}
                transition={{
                  duration: 9, // 6 nodes * 1.5s
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            
            {/* Pipeline Nodes */}
            {[
              { icon: Factory, label: "ASSETS" },
              { icon: Cpu, label: "SENSORS" },
              { icon: Signal, label: "CONNECTIVITY" },
              { icon: Cloud, label: "IOTRICS CLOUD" },
              { icon: BarChart3, label: "INSIGHTS" },
              { icon: Target, label: "ACTION" },
            ].map((node, i) => {
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;

              return (
              <div key={i} className="flex flex-col items-center bg-white px-2 z-10">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 bg-white transition-all duration-500 ${isActive ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-110' : isPast ? 'border-blue-200' : 'border-neutral-100 text-neutral-300'}`}>
                   <node.icon className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-500 ${isActive ? 'text-blue-500' : isPast ? 'text-blue-400' : 'text-neutral-300'}`} />
                </div>
                <span className={`mt-4 text-[9px] md:text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${isActive ? 'text-blue-600' : isPast ? 'text-blue-400' : 'text-neutral-400'}`}>
                  {node.label}
                </span>
              </div>
            )})}
          </div>
          <p className="text-center text-lg font-medium text-neutral-800">
            One connected intelligence layer for your entire infrastructure.
          </p>
        </div>

      </div>
    </section>
  );
}
