"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Bell, Eye, Zap, Map, BarChart3, CheckCircle2 } from "lucide-react";

const coreModules = [
  {
    id: "monitoring",
    title: "01 — MONITORING & DATA ACQUISITION",
    icon: Activity,
    subtitle: "Capture What Matters",
    description: "IoTRICs continuously collects real-time data from physical assets across geographically distributed locations, supporting multiple sensor types and deployment environments.",
    keyCapabilities: [
      "Multi-sensor data collection",
      "Real-time asset monitoring",
      "Fixed and mobile deployments",
      "Environmental and operational data capture",
      "Support for geographically distributed assets"
    ],
    tags: ["REAL-TIME", "MULTI-SENSOR", "ANY ASSET", "ANY LOCATION"]
  },
  {
    id: "alerts",
    title: "02 — INTELLIGENT ALERTS & EVENTS",
    icon: Bell,
    subtitle: "Know When Something Needs Attention",
    description: "IoTRICs identifies abnormal conditions and triggers configurable alerts so teams can respond quickly when operational thresholds are exceeded.",
    keyCapabilities: [
      "Threshold-based alerts",
      "SMS, email & push notifications",
      "Abnormal-condition detection",
      "Event logging",
      "Faster operational response"
    ],
    tags: ["SMART ALERTS", "THRESHOLDS", "NOTIFICATIONS", "EVENT LOGGING"]
  },
  {
    id: "visibility",
    title: "03 — ENVIRONMENTAL & ASSET VISIBILITY",
    icon: Eye,
    subtitle: "See Your Infrastructure in Real Time",
    description: "Monitor critical environmental and asset conditions from a centralized platform. IoTRICs brings information such as temperature, humidity, water levels, air quality, energy, pressure, and vibration into a unified operational view.",
    keyCapabilities: [
      "Temperature & Humidity monitoring",
      "Water-level & Air-quality monitoring",
      "Energy, pressure & vibration monitoring",
      "Asset condition visibility",
      "Centralized dashboard view"
    ],
    tags: ["TEMPERATURE", "HUMIDITY", "WATER", "AIR QUALITY"]
  },
  {
    id: "energy",
    title: "04 — ENERGY & RESOURCE INTELLIGENCE",
    icon: Zap,
    subtitle: "Turn Consumption Data Into Efficiency",
    description: "IoTRICs enables advanced monitoring of energy and resource consumption, helping organizations understand load patterns and identify opportunities for greater efficiency and sustainability.",
    keyCapabilities: [
      "Consumption monitoring",
      "Load-pattern analysis",
      "Energy & Resource visibility",
      "Efficiency insights",
      "Sustainability initiatives",
      "Peak-load and demand management"
    ],
    tags: ["ENERGY", "CONSUMPTION", "LOAD ANALYSIS", "EFFICIENCY"]
  },
  {
    id: "tracking",
    title: "05 — MOVEMENT & UTILISATION TRACKING",
    icon: Map,
    subtitle: "Know Where Your Assets Are — And How They're Used",
    description: "Track asset utilization and operational movement to improve visibility across fleets, equipment, and mobile assets.",
    keyCapabilities: [
      "Asset utilization tracking",
      "Mobile asset visibility",
      "Fleet monitoring",
      "Equipment tracking",
      "Movement visibility",
      "Data-driven performance evaluation"
    ],
    tags: ["ASSET TRACKING", "UTILISATION", "FLEET", "MOBILITY"]
  },
  {
    id: "analytics",
    title: "06 — ANALYTICS, REPORTING & COMPLIANCE",
    icon: BarChart3,
    subtitle: "Turn Data Into Better Decisions",
    description: "IoTRICs transforms collected operational data into actionable intelligence through real-time dashboards, historical analysis, predictive analytics, reporting, and compliance support.",
    keyCapabilities: [
      "Real-time dashboards",
      "Historical data & Trend analysis",
      "Predictive analytics",
      "Reporting & Audit support",
      "Performance evaluation",
      "Compliance visibility"
    ],
    tags: ["DASHBOARDS", "ANALYTICS", "REPORTING", "COMPLIANCE"]
  }
];

export default function IotricsCore() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full py-24 sm:py-32 bg-white text-neutral-900 font-poppins">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] flex flex-col items-center">
        
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center mb-16 lg:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[1.75rem] sm:text-3xl lg:text-[2rem] xl:text-[3.2rem] font-black tracking-tight text-neutral-900 leading-[1.1] sm:leading-[1.05] uppercase mb-6"
          >
            The Intelligence Layer Behind Your Operations
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 text-lg sm:text-xl max-w-2xl leading-relaxed"
          >
            End-to-end capabilities to capture data, monitor assets, and generate actionable insights for your operations in real time.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full text-left">
          
          {/* Left Column: Accordion List */}
          <div className="lg:col-span-5 flex flex-col border-t border-neutral-200">
            {coreModules.map((module, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={module.id}
                  className="border-b border-neutral-200 cursor-pointer overflow-hidden group"
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="flex items-center py-5 gap-4">
                    <module.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-neutral-900' : 'text-neutral-400 group-hover:text-neutral-600'}`} />
                    <h3 className={`text-sm sm:text-base font-medium tracking-widest uppercase transition-colors ${isActive ? 'text-neutral-900' : 'text-neutral-400 group-hover:text-neutral-600'}`}>
                      {module.title}
                    </h3>
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="pr-4 pb-6 text-neutral-500 leading-relaxed text-sm sm:text-base">
                          {module.description}
                        </div>
                        <div className="w-1/3 h-[2px] bg-neutral-900 mb-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            
            <div className="mt-10 pt-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-md transition-colors text-sm tracking-wider uppercase shadow-md shadow-blue-500/20">
                EXPLORE OUR MODULES
              </button>
            </div>
          </div>

          {/* Right Column: Detailed Data Box */}
          <div className="lg:col-span-7 w-full flex items-stretch h-full">
            <div className="w-full flex flex-col justify-between p-8 sm:p-10 lg:p-12 bg-neutral-950 rounded-2xl text-white shadow-2xl relative overflow-hidden">
              
              {/* Subtle background glow for right column */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col relative z-10 h-full"
                >
                  <div className="mb-10">
                    <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-3 block">
                      Core Capability
                    </span>
                    <h4 className="text-3xl sm:text-4xl font-bold mb-6 text-white leading-tight">
                      {coreModules[activeIndex].subtitle}
                    </h4>
                    <p className="text-neutral-400 leading-relaxed text-base sm:text-lg mb-8">
                      {coreModules[activeIndex].description}
                    </p>
                    
                    {/* Key Capabilities List */}
                    <div className="mb-8">
                      <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2 inline-block">
                        Key Capabilities
                      </h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                        {coreModules[activeIndex].keyCapabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2 text-neutral-300 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tags Bottom Bar */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10 mt-auto">
                    {coreModules[activeIndex].tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold tracking-widest text-neutral-300 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
