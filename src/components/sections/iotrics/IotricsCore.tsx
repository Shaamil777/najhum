"use client";

import React, { useState } from "react";
import Image from "next/image";
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 w-full text-left items-center">
          
          {/* Left Column: Accordion List (shown second on mobile, first on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col border-t border-neutral-200">
            {coreModules.map((module, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={module.id}
                  className="border-b border-neutral-200 cursor-pointer overflow-hidden group"
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="flex items-center py-4 sm:py-5 gap-3 sm:gap-4">
                    <module.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-neutral-900' : 'text-neutral-400 group-hover:text-neutral-600'}`} />
                    <h3 className={`text-xs sm:text-sm lg:text-base font-bold tracking-widest uppercase transition-colors ${isActive ? 'text-neutral-900' : 'text-neutral-400 group-hover:text-neutral-600'}`}>
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
                        <div className="pr-2 sm:pr-4 pb-6 text-neutral-500 leading-relaxed text-[13px] sm:text-sm lg:text-base">
                          <p className="mb-5">{module.description}</p>
                          
                          {/* ═══ MOBILE-ONLY: Rich details inside accordion ═══ */}
                          <div className="lg:hidden bg-neutral-50 rounded-xl p-4 sm:p-5 border border-neutral-100">
                            <h5 className="text-[10px] sm:text-xs font-bold text-neutral-900 uppercase tracking-widest mb-3 border-b border-neutral-200 pb-2 inline-block">
                              Key Capabilities
                            </h5>
                            <ul className="grid grid-cols-1 gap-y-2 mb-5">
                              {module.keyCapabilities.map((cap, i) => (
                                <li key={i} className="flex items-start gap-2 text-neutral-600 text-[12px] sm:text-[13px]">
                                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 shrink-0 mt-0.5" />
                                  <span>{cap}</span>
                                </li>
                              ))}
                            </ul>
                            
                            {/* Tags Bottom Bar */}
                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-200">
                              {module.tags.map((tag, i) => (
                                <span key={i} className="px-2 py-1 bg-white border border-neutral-200 rounded text-[8px] sm:text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>
                        <div className="w-1/3 h-[2px] bg-neutral-900 mb-6 hidden lg:block" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            
            <div className="mt-8 lg:mt-10 pt-2 flex justify-center lg:justify-start">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-md transition-colors text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-blue-500/20 w-full sm:w-auto">
                EXPLORE OUR MODULES
              </button>
            </div>
          </div>

          {/* Right Column: Live Enterprise Dashboard Showcase (shown first on mobile, second on desktop) */}
          <div className="order-1 lg:order-2 flex flex-col lg:col-span-7 w-full justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-neutral-50 rounded-2xl border border-neutral-200/80 shadow-2xl overflow-hidden relative w-full flex flex-col group"
            >
              {/* Dashboard Image Content - Full Natural Dimensions, Never Cropped */}
              <div className="relative z-10 w-full overflow-hidden bg-neutral-50">
                <Image
                  src="/images/iotrics/dashboardiortics.png"
                  alt="IoTRICs Enterprise Dashboard Interface"
                  width={2880}
                  height={1572}
                  priority
                  className="w-full h-auto block object-contain select-none"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 60vw, 900px"
                />
              </div>

              {/* Decorative faint background grid */}
              <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              </div>
            </motion.div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
