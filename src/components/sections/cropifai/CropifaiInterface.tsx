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
    <section className="relative w-full py-24 lg:py-32 bg-white text-slate-900 overflow-hidden font-sans border-b border-slate-200/60">
      
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        
        {/* Top Text Content */}
        <div className="max-w-5xl mx-auto text-center mb-20 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
              CLOUD PLATFORM
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-slate-900 leading-tight mb-6">
              Centralized Management
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto">
              Powered by IoTRICs (our in-house CPMS dashboard), providing an intuitive, multi-tenant interface for remote agricultural management and device oversight.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 text-left border-t border-slate-100 pt-16"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-primary shadow-sm">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1.5 leading-tight">{feature.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Massive Full-Screen Mockup Content */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="w-full px-4 md:px-8 xl:px-12 mx-auto relative mt-12"
      >
        {/* Main Mockup Window */}
        <div className="relative w-full bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-200/80 flex flex-col min-h-[70vh]">
          
          {/* Native Window Header */}
          <div className="h-12 border-b border-slate-200 bg-slate-50/80 flex items-center px-4 gap-3 shrink-0">
            <div className="flex gap-2 shrink-0">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-300" />
              <div className="w-3.5 h-3.5 rounded-full bg-slate-300" />
              <div className="w-3.5 h-3.5 rounded-full bg-slate-300" />
            </div>
            <div className="mx-auto bg-white border border-slate-200 rounded-md py-1.5 px-32 text-xs font-semibold text-slate-400 text-center shadow-sm truncate max-w-[50%] hidden md:block">
              iotrics.cropifai.com
            </div>
            <div className="flex-1 md:hidden" />
          </div>
          
          {/* Dashboard Interface */}
          <div className="flex-1 flex bg-slate-50/50">
            
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-100 flex-col hidden lg:flex shrink-0">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-10">
                  <Activity className="w-7 h-7 text-primary" />
                  <span className="text-xl font-black tracking-tight text-slate-900">IoTRICs</span>
                </div>
                <div className="space-y-1.5 flex-1">
                  {['Dashboard', 'Farm Map', 'Devices', 'Analytics', 'Alerts', 'Settings'].map((item, i) => (
                    <div key={i} className={`px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-3 cursor-default transition-colors ${i === 0 ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                      {i === 0 && <Activity className="w-4.5 h-4.5" />}
                      {i === 1 && <Map className="w-4.5 h-4.5" />}
                      {i === 2 && <Droplets className="w-4.5 h-4.5" />}
                      {i === 3 && <BarChart3 className="w-4.5 h-4.5" />}
                      {i === 4 && <Bell className="w-4.5 h-4.5" />}
                      {i === 5 && <Code className="w-4.5 h-4.5" />}
                      {item}
                    </div>
                  ))}
                </div>
                
                {/* User Profile Footer */}
                <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">Admin User</p>
                    <p className="text-xs text-slate-500">Master Control</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 p-6 lg:p-10 flex flex-col gap-8">
              
              {/* Header */}
              <div className="flex justify-between items-end shrink-0">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">Farm Overview</h1>
                  <p className="text-sm text-slate-500">Live monitoring across 4 sectors.</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    System Online
                  </span>
                </div>
              </div>

              {/* KPI Cards (Replaces floating elements) */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 shrink-0">
                {[
                  { label: "Avg Moisture", value: "42%", icon: Droplets, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
                  { label: "Active Sensors", value: "1,204", icon: Activity, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
                  { label: "System Alerts", value: "0", icon: Bell, color: "text-slate-400", bg: "bg-slate-100", border: "border-slate-200" },
                  { label: "Last Sync", value: "Just now", icon: RefreshCw, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.border} border flex items-center justify-center shrink-0`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1.5">{stat.label}</p>
                      <p className="text-2xl lg:text-3xl font-black text-slate-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Main Graph/Map area */}
              <div className="flex-1 bg-white border border-slate-100 rounded-2xl shadow-sm p-6 relative overflow-hidden min-h-[350px]">
                {/* Subtle background map pattern */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-[0.05]" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-base font-bold text-slate-800">Moisture Map - Sector A</h3>
                    <button className="text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                      View Full Map
                    </button>
                  </div>
                  
                  {/* Render a realistic grid of nodes */}
                  <div className="flex-1 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 grid-rows-3 gap-3">
                    {Array.from({length: 24}).map((_, i) => {
                      const isWarning = i % 11 === 0;
                      const isCritical = i % 17 === 0;
                      const statusClass = isCritical 
                        ? 'bg-red-50 border-red-200 text-red-600' 
                        : isWarning 
                          ? 'bg-yellow-50 border-yellow-200 text-yellow-600' 
                          : 'bg-emerald-50 border-emerald-200 text-emerald-600';
                      
                      const val = isCritical ? '22%' : isWarning ? '31%' : '44%';

                      return (
                        <div key={i} className={`rounded-xl flex flex-col items-center justify-center border transition-all hover:scale-105 cursor-default ${statusClass}`}>
                          <Droplets className="w-4 h-4 mb-1 opacity-50" />
                          <span className="text-xs font-black">{val}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
