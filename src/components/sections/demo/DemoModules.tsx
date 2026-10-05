"use client";

import React from "react";
import { Activity, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function DemoModules() {
  const modules = [
    {
      platform: "IoTRICs",
      title: "Unified IoT Platform",
      description: "Connect physical assets, sensors, and infrastructure. Deliver real-time visibility, intelligent alerts, and actionable insights to operate smarter and more efficiently.",
      image: "/images/iotrics/dashboardiortics.png",
      color: "bg-blue-500",
      textColor: "text-blue-500",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      platform: "EVOLTICS",
      title: "Intelligent EV Charging",
      description: "Deploy and scale intelligent EV charging networks with real-time IoT telemetry, automated load management, and complete operational control.",
      image: "/images/elvotics/cpmsDahsboard.jpeg",
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      platform: "CropifAI",
      title: "Smart Agriculture Solutions",
      description: "A revolutionary IoT-based agriculture and irrigation system using sensors, devices, and data analytics to monitor and optimize farming operations.",
      image: "/images/cropify/dashboardcropify.png",
      color: "bg-amber-500",
      textColor: "text-amber-500",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-100",
    }
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24  overflow-hidden font-sans relative">
      
      <div className="container-base max-w-[1100px] relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div className="flex flex-col items-start text-left max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200"
            >
              <Activity className="w-3.5 h-3.5 text-neutral-500" />
              <p className="text-[9px] font-bold tracking-widest text-neutral-500 uppercase">
                Live Environments
              </p>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 leading-tight"
            >
              Launch Command Dashboards.
            </motion.h2>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 max-w-sm text-sm md:text-base text-left md:text-right"
          >
            Explore real-time data streams and predictive analytics across our live infrastructure instances.
          </motion.p>
        </div>

        {/* Alternating Dashboard Rows */}
        <div className="flex flex-col gap-16 md:gap-24">
          {modules.map((mod, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div 
                key={index} 
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}
              >
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full lg:w-1/2 group relative perspective-[1000px]"
                >
                  <div className="relative bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-1.5">
                    
                    {/* Browser-like Header (Dots Removed) */}
                    <div className="h-10 bg-neutral-50/80 backdrop-blur-md border-b border-neutral-200 flex items-center justify-center px-4 relative z-10 shrink-0">
                      {/* URL Bar Mock */}
                      <div className="flex items-center justify-center w-full max-w-[220px] h-6 bg-white border border-neutral-200 rounded-md">
                        <span className="text-[9px] font-mono text-neutral-400 truncate px-2">
                          demo.najhum.com/{mod.platform.toLowerCase()}
                        </span>
                      </div>
                    </div>

                    {/* Dashboard Image - Now uncropped */}
                    <div className="relative w-full bg-neutral-50 overflow-hidden flex items-center justify-center group">
                      <img 
                        src={mod.image} 
                        alt={`${mod.title} Dashboard`}
                        className="w-full h-auto block object-contain"
                      />
                      
                      {/* Very light overlay to ensure it looks like a screen */}
                      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                    </div>
                  </div>
                  
                  {/* Decorative Glow behind the image */}
                  <div className={`absolute -inset-8 -z-10 rounded-full blur-[80px] opacity-20 ${mod.color}`} />
                </motion.div>

                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isReversed ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                  className="w-full lg:w-1/2 flex flex-col items-start text-left relative z-10"
                >
                  <div className={`px-2.5 py-1 rounded-full border ${mod.badgeColor} mb-4 flex items-center gap-1.5 bg-white`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${mod.color} animate-pulse`} />
                    <span className="text-[9px] font-bold tracking-widest uppercase">
                      {mod.platform} ACTIVE
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3 leading-tight">
                    {mod.title}
                  </h3>
                  
                  <p className="text-sm text-neutral-500 leading-relaxed mb-8 max-w-[400px]">
                    {mod.description}
                  </p>
                  
                  <button className="group flex items-center gap-2.5 px-6 py-3 bg-black text-white rounded-full font-bold uppercase tracking-wider text-[10px] hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                    Launch Dashboard
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                      <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </button>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}