"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Droplets, Zap, Clock, FlaskConical, AlertTriangle, ListTree, Activity, Wind, Cpu } from "lucide-react";
import { Container } from "@/design-system/primitives/layout/Container";

export default function CropifaiHardware() {
  const hardwareSpecs = [
    {
      title: "Intelligent Soil Sensors",
      desc: "Multi-depth probes providing real-time data on soil moisture, EC, pH, NPK levels, and temperature.",
      icon: Activity,
      color: "bg-emerald-500",
      glow: "shadow-[0_0_40px_rgba(16,185,129,0.3)]",
      span: "col-span-1 lg:col-span-2",
      image: "soil"
    },
    {
      title: "Weather Stations",
      desc: "Solar-powered microclimate tracking (wind, humidity, rain).",
      icon: Wind,
      color: "bg-teal-500",
      glow: "shadow-[0_0_40px_rgba(20,184,166,0.3)]",
      span: "col-span-1",
      image: "weather"
    },
    {
      title: "Smart Valve Controllers",
      desc: "100% automated fertigation and solenoid control.",
      icon: Cpu,
      color: "bg-blue-500",
      glow: "shadow-[0_0_40px_rgba(59,130,246,0.3)]",
      span: "col-span-1 lg:col-span-1 lg:row-span-2",
      image: "valve"
    },
    {
      title: "Water Quality Analysis",
      desc: "Continuous TDS, hardness, and salinity monitoring for fertigation.",
      icon: FlaskConical,
      color: "bg-indigo-500",
      glow: "shadow-[0_0_40px_rgba(99,102,241,0.3)]",
      span: "col-span-1 lg:col-span-2",
      image: "water"
    }
  ];

  const tags = ["Ruggedized for Desert", "LoRaWAN Connectivity", "IP67 Rated", "Low Maintenance", "NFC Configuration"];

  const flowControls = [
    { icon: Droplets, title: "Solenoid Control", desc: "Percentage control 0–100%, open/close precision" },
    { icon: Zap, title: "Autonomous Operation", desc: "Solar-powered, battery backup, works off-grid" },
    { icon: Clock, title: "Cycle Irrigation", desc: "Set start time, duration, capacity, cycle number" },
    { icon: FlaskConical, title: "Fertigation Dosing", desc: "Automated nutrient dosing, variable-rate application" },
    { icon: AlertTriangle, title: "Safety Alarms", desc: "Web notifications for flow, pressure, sensor breakdown" },
    { icon: ListTree, title: "Multicast Control", desc: "Bulk valve control across multiple zones simultaneously" },
  ];

  return (
    <section className="w-full py-24 md:py-32 bg-[#09090b] relative overflow-hidden font-sans border-t border-white/5">
      
      {/* Decorative background meshes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-[100%] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <Container size="xl" className="relative z-10">
        
        {/* Header */}
        <div className="mb-20 md:mb-28 text-center max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white text-xs font-bold tracking-[0.25em] uppercase mb-8"
          >
            <Cpu className="w-4 h-4 text-primary" />
            Hardware & Infrastructure
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black font-display text-white leading-[1.1] tracking-tight mb-8"
          >
            Industrial-Grade <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-blue-500">IoT Ecosystem</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed max-w-2xl"
          >
            Built to withstand harsh desert conditions while delivering pinpoint accuracy across thousands of acres.
          </motion.p>
        </div>

        {/* Bento Box Sensors Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {hardwareSpecs.map((spec, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7, ease: "easeOut" }}
              className={`group relative rounded-[2.5rem] bg-white/5 border border-white/10 p-8 lg:p-10 flex flex-col justify-between overflow-hidden backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-white/20 ${spec.span}`}
            >
              <div className={`absolute top-0 right-0 w-64 h-64 ${spec.color} opacity-10 rounded-full blur-[80px] group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-8 ${spec.color} text-white ${spec.glow} transition-transform duration-500 group-hover:scale-110`}>
                  <spec.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="mt-auto">
                  <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                    {spec.title}
                  </h3>
                  <p className="text-sm lg:text-base text-zinc-400 font-medium leading-relaxed max-w-md">
                    {spec.desc}
                  </p>
                </div>
              </div>

              {/* Decorative Tech Elements */}
              <div className="absolute right-8 top-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none mix-blend-screen">
                {spec.image === 'soil' && <div className="w-32 h-32 border-[1px] border-dashed border-white rounded-full flex items-center justify-center"><div className="w-16 h-16 border-[1px] border-white rounded-full" /></div>}
                {spec.image === 'weather' && <div className="w-24 h-24 border-[2px] border-white rounded-xl rotate-45" />}
                {spec.image === 'valve' && <div className="w-20 h-40 border-[1px] border-white rounded-full" />}
                {spec.image === 'water' && <div className="w-32 h-16 border-[1px] border-dashed border-white rounded-full" />}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Specs Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-32"
        >
          {tags.map((tag, idx) => (
            <div key={idx} className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:border-primary/50 transition-colors">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-zinc-300 tracking-widest uppercase">{tag}</span>
            </div>
          ))}
        </motion.div>

        {/* Automated Water Flow Control Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 lg:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-[100%] blur-[100px] pointer-events-none" />
          
          <div className="text-center mb-16 relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black font-display text-white leading-tight tracking-tight mb-6">
              Automated Water Flow Control
            </h2>
            <p className="text-lg text-zinc-400 font-medium leading-relaxed">
              Precision irrigation management for large-scale agricultural applications, completely automated via our cloud ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10 mb-16">
            {flowControls.map((control, idx) => (
              <div key={idx} className="bg-black/40 rounded-3xl p-8 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <control.icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 tracking-wide">{control.title}</h4>
                <p className="text-sm text-zinc-400 font-medium leading-relaxed">{control.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
