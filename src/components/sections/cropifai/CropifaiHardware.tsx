"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Droplets, Zap, Clock, FlaskConical, AlertTriangle, ListTree, CheckCircle2 } from "lucide-react";
import Image from "next/image";
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

  const timelineProducts = [
    { 
      name: "Industrial Soil Sensor", 
      image: "/products/cropifai/soilsensor.png",
      description: "Multi-parameter soil sensing for precision agriculture.",
      features: ["Soil Moisture & Temp", "Electrical Conductivity (EC)", "pH Level", "NPK (N, P, K)"]
    },
    { 
      name: "LoRaWAN Weather Station", 
      image: "/products/cropifai/LoRaWan_iotWeatherStation.png",
      description: "Comprehensive environmental monitoring with 15km range.",
      features: ["Wind Speed & Direction", "Humidity & Temperature", "Rainfall Measurement", "Solar-Powered"]
    },
    { 
      name: "Solenoid Valve Controller", 
      image: "/products/cropifai/solenoidValveController.png",
      description: "Automated irrigation control for multiple zones.",
      features: ["0–100% Flow Control", "Open/Close Precision", "Multicast Control"]
    },
    { 
      name: "Smart Valve Controller", 
      image: "/products/cropifai/SmartValveController.png",
      description: "Intelligent autonomous operation for off-grid deployment.",
      features: ["Autonomous Operation", "Battery Backup", "NFC Configuration"]
    },
    { 
      name: "Industrial pH Sensor", 
      image: "/products/cropifai/Phsensor.png",
      description: "High-precision pH monitoring for optimal nutrient uptake.",
      features: ["Real-time pH Tracking", "Anti-Fouling Design", "Automatic Calibration"]
    },

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

        {/* Tags Bar */}
        <div className="bg-white/60 backdrop-blur-md border border-zinc-200 shadow-sm rounded-3xl p-6 lg:p-8 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 mb-32 max-w-5xl mx-auto">
          {tags.map((tag, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm lg:text-base font-bold text-zinc-800 tracking-widest uppercase">{tag}</span>
            </div>
          ))}
        </div>

        {/* Scroll Timeline Product Showcase */}
        <div className="relative w-full max-w-6xl mx-auto pt-10 mb-40">
          
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight">Our Smart Ecosystem</h2>
          </div>

          {/* Central Line (Desktop) / Side Line (Mobile) */}
          <div className="absolute left-8 md:left-1/2 top-40 bottom-0 w-[2px] bg-zinc-200 md:-translate-x-1/2 rounded-full" />

          {timelineProducts.map((prod, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0 mb-32 last:mb-0 group">
                
                {/* Center Timeline Node */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="absolute left-[26px] md:left-1/2 w-4 h-4 bg-white border-4 border-primary rounded-full md:-translate-x-1/2 shadow-[0_0_15px_rgba(34,197,94,0.4)] z-10"
                />

                {/* Image Block */}
                <div className={`w-full md:w-1/2 pl-20 pr-4 md:px-16 flex ${isEven ? 'md:justify-end' : 'md:justify-start'} order-1 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                   <motion.div 
                     initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className="relative w-full max-w-[400px] aspect-square bg-white rounded-[2rem] border border-zinc-200 shadow-xl shadow-zinc-200/50 flex items-center justify-center p-8 overflow-hidden group-hover:border-primary/30 transition-colors"
                   >
                     <Image src={prod.image} alt={prod.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain p-8 transition-transform duration-700 group-hover:scale-110" />
                   </motion.div>
                </div>

                {/* Text Block */}
                <div className={`w-full md:w-1/2 pl-20 pr-4 md:px-16 flex flex-col justify-center order-2 ${isEven ? 'md:order-2 md:text-left' : 'md:order-1 md:text-right md:items-end'}`}>
                   <motion.div 
                     initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className="w-full max-w-[400px]"
                   >
                     <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">0{idx + 1}</span>
                     <h3 className="text-2xl lg:text-4xl font-black text-zinc-900 mb-4 leading-tight tracking-tight">{prod.name}</h3>
                     <p className="text-base lg:text-lg text-zinc-500 mb-8 leading-relaxed">{prod.description}</p>
                     <ul className="space-y-4 inline-flex flex-col text-left">
                       {prod.features.map((f, i) => (
                         <li key={i} className={`flex items-center gap-3 text-zinc-700 font-semibold ${!isEven ? 'md:flex-row-reverse md:text-right' : ''}`}>
                           <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> {f}
                         </li>
                       ))}
                     </ul>
                   </motion.div>
                </div>

              </div>
            );
          })}
        </div>



      </Container>
    </section>
  );
}
