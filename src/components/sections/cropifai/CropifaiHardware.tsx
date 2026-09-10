"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Droplets, Zap, Clock, FlaskConical, AlertTriangle, ListTree } from "lucide-react";
import { Container } from "@/design-system/primitives/layout/Container";

export default function CropifaiHardware() {
  const categories = [
    {
      title: "Soil Sensors",
      color: "text-emerald-700",
      borderColor: "border-emerald-200",
      bgColor: "bg-emerald-50",
      glow: "group-hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)]",
      features: ["Soil Moisture", "Electrical Conductivity (EC)", "pH Level", "Temperature", "NPK (N, P, K)", "Soil Heat Flux"]
    },
    {
      title: "Water Sensors",
      color: "text-blue-700",
      borderColor: "border-blue-200",
      bgColor: "bg-blue-50",
      glow: "group-hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)]",
      features: ["pH", "Electrical Conductivity (EC)", "Hardness (Ca²⁺, Mg²⁺)", "TDS", "Salinity (Fertigation)"]
    },
    {
      title: "Weather Station",
      color: "text-teal-700",
      borderColor: "border-teal-200",
      bgColor: "bg-teal-50",
      glow: "group-hover:shadow-[0_20px_60px_-15px_rgba(20,184,166,0.3)]",
      features: ["Wind Speed & Direction", "Humidity & Temperature", "Rainfall", "Solar-Powered", "LoRaWAN (15km range)"]
    }
  ];

  const products = [
    { name: "Ph Sensor", image: "/images/cropifai/sensor.jpg" },
    { name: "Soil Sensor", image: "/images/cropifai/soil.jpg" },
    { name: "Solenoid Valve", image: "/images/cropifai/solenoid.jpg" },
    { name: "Smart Controller", image: "/images/cropifai/smart-valve.jpg" },
    { name: "Weather Station", image: "/images/cropifai/weather.jpg" },
  ];

  const tags = ["Ruggedized for Desert", "LoRaWAN Connectivity", "IP67 Rated", "Low Maintenance", "NFC Configuration"];

  const flowControls = [
    { icon: Droplets, title: "Solenoid Valve Control", desc: "Percentage control 0–100%, open/close precision" },
    { icon: Zap, title: "Autonomous Operation", desc: "Solar-powered, battery backup, works off-grid" },
    { icon: Clock, title: "Cycle Irrigation", desc: "Set start time, duration, capacity, cycle number" },
    { icon: FlaskConical, title: "Fertigation Dosing", desc: "Automated nutrient dosing, variable-rate application" },
    { icon: AlertTriangle, title: "Safety Alarms", desc: "Web notifications for flow, pressure, sensor breakdown" },
    { icon: ListTree, title: "Multicast Control", desc: "Bulk valve control across multiple zones simultaneously" },
  ];

  return (
    <section className="w-full py-24 md:py-32 bg-zinc-50 relative overflow-hidden font-sans border-b border-zinc-200">
      
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        
        {/* Header */}
        <div className="mb-20 md:mb-28 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Hardware & Sensors
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-zinc-900 leading-tight tracking-tight mb-6"
          >
            Crop & Soil Sensing <br /> Systems
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-500 font-medium leading-relaxed"
          >
            Industrial-grade IoT devices built to withstand harsh desert conditions while delivering pinpoint accuracy.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-32">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
              className={`group relative rounded-[2.5rem] border ${cat.borderColor} bg-white p-8 lg:p-10 flex flex-col h-full transition-all duration-500 hover:-translate-y-2 ${cat.glow} overflow-hidden`}
            >
              {/* Soft background shape */}
              <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full blur-[40px] opacity-20 ${cat.bgColor} pointer-events-none transition-transform duration-500 group-hover:scale-150`} />
              
              <h3 className={`relative z-10 text-2xl lg:text-3xl font-black mb-8 ${cat.color} tracking-tight`}>
                {cat.title}
              </h3>
              
              <ul className="relative z-10 flex flex-col gap-5 flex-1">
                {cat.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-4 text-zinc-700">
                    <span className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full ${cat.bgColor.replace('50', '500')}`} />
                    <span className="font-semibold leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Products Display Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#09090b] rounded-[3rem] p-10 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl mb-32 border border-white/10"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          
          <div className="relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-20">
              {products.map((prod, idx) => (
                <div key={idx} className="flex flex-col items-center text-center gap-6 group cursor-pointer">
                  <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-500 shadow-xl group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:-translate-y-2 group-hover:bg-white/10">
                    {/* Placeholder content since we don't have the actual images */}
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors duration-500">
                       <Zap className="w-6 h-6 opacity-50" />
                    </div>
                  </div>
                  <p className="text-sm lg:text-base font-bold text-zinc-400 leading-tight group-hover:text-white transition-colors duration-300">
                    {prod.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Tags Bar */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
              {tags.map((tag, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="text-sm lg:text-base font-bold text-white tracking-widest uppercase">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Automated Water Flow Control Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-zinc-200 shadow-xl shadow-zinc-200/50 rounded-[3rem] p-10 md:p-16 lg:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-[100%] blur-[80px] pointer-events-none" />
          
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black font-display text-zinc-900 leading-tight tracking-tight mb-6">
              Automated Water <span className="text-primary">Flow Control</span>
            </h2>
            <p className="text-lg text-zinc-500 font-medium max-w-2xl mx-auto">
              Precision irrigation management for large-scale agricultural applications, completely automated via the cloud.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 mb-16">
            {flowControls.map((control, idx) => (
              <div key={idx} className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  <control.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-primary transition-colors">{control.title}</h4>
                <p className="text-zinc-500 font-medium leading-relaxed">{control.desc}</p>
              </div>
            ))}
          </div>

          {/* Footer block */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-zinc-400 uppercase tracking-widest relative z-10">
            <span>IP67 Rated</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Solar / Battery / Mains</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>External Antenna</span>
          </div>

        </motion.div>

      </Container>
    </section>
  );
}
