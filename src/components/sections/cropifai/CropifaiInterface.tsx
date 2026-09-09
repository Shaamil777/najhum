"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Map, Activity, RefreshCw, BarChart3, Bell, Users, Code, Droplets } from "lucide-react";
import Image from "next/image";
import { Container } from "@/design-system/primitives/layout/Container";

export default function CropifaiInterface() {
  const features = [
    { icon: Map, title: "Visual Map Representation", desc: "Pinpoint exact device locations across large farms" },
    { icon: Activity, title: "Real-Time Monitoring", desc: "Live sensor dashboards for soil moisture, weather, etc." },
    { icon: RefreshCw, title: "Over-the-Air (OTA) Updates", desc: "Remote configuration and firmware updates" },
    { icon: BarChart3, title: "Data Analytics & Trends", desc: "Historical charts to analyze water consumption" },
    { icon: Bell, title: "Alarm & Event Logging", desc: "Push notifications for leak detection or low moisture" },
    { icon: Users, title: "User Role Management", desc: "Admin, operator, and viewer access levels" },
    { icon: Code, title: "API Integration", desc: "Ready for third-party ERP systems" },
  ];

  return (
    <section className="relative w-full py-24 lg:py-32 bg-[#0a0a0a] text-white overflow-hidden font-sans">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
              CLOUD PLATFORM
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-white leading-tight mb-6">
              Centralized Management
            </h2>
            <p className="text-lg text-zinc-400 mb-10 leading-relaxed font-medium">
              Powered by IoTRICs (our in-house CPMS dashboard), providing an intuitive, multi-tenant interface for remote agricultural management and device oversight.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <feature.icon className="w-3 h-3 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-200 mb-1 leading-tight">{feature.title}</h4>
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Mockup Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Main Mockup Window */}
            <div className="relative w-full aspect-[16/10] bg-[#111111] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              {/* Window Header */}
              <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              
              {/* Mockup Content (Placeholder since we lack exact image) */}
              <div className="absolute inset-x-0 bottom-0 top-10 flex items-center justify-center bg-zinc-900/50">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative z-10 text-center">
                  <Activity className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" />
                  <span className="text-sm font-bold text-zinc-500 tracking-widest uppercase">IoTRICs Dashboard</span>
                </div>
              </div>
            </div>

            {/* Floating Element 1 */}
            <div className="absolute -left-12 top-1/4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl hidden md:flex items-center gap-4 animate-[bounce_4s_infinite]">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">Moisture Level</p>
                <p className="text-lg font-bold text-white">42%</p>
              </div>
            </div>

            {/* Floating Element 2 */}
            <div className="absolute -right-8 bottom-1/4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl hidden md:flex items-center gap-4 animate-[bounce_5s_infinite]">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">System Status</p>
                <p className="text-lg font-bold text-white">Online</p>
              </div>
            </div>

          </motion.div>
          
        </div>

      </Container>
    </section>
  );
}
