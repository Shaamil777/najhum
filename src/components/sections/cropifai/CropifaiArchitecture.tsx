"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cloud, Cpu, RadioTower, Database, LayoutDashboard, Wifi, Layers, Globe } from "lucide-react";
import { Container } from "@/design-system/primitives/layout/Container";

export default function CropifaiArchitecture() {
  const nodes = [
    { name: "Field Sensors", icon: Cpu, position: "middle" },
    { name: "LoRaWAN Gateway", icon: RadioTower, position: "bottom" },
    { name: "Internet / 4G", icon: Globe, position: "top" },
    { name: "CropifAI Cloud", icon: Cloud, position: "middle", isMain: true },
    { name: "Cloud Integration", icon: Database, position: "top" },
    { name: "Dashboard", icon: LayoutDashboard, position: "bottom" },
  ];

  const features = [
    {
      title: "LoRaWAN Network",
      desc: "Sensors transmit over Long-Range, Low-Power networks up to 15km line of sight.",
      icon: RadioTower
    },
    {
      title: "Any Cloud Integration",
      desc: "API-ready for AWS, Azure, Google Cloud, or local servers.",
      icon: Cloud
    },
    {
      title: "Scalable Architecture",
      desc: "Easily add thousands of sensors across multiple zones without changing core infrastructure.",
      icon: Layers
    },
    {
      title: "Dual Connectivity",
      desc: "Gateway support for Cellular (4G/LTE), Wi-Fi, and Ethernet backhaul.",
      icon: Wifi
    }
  ];

  return (
    <section className="relative w-full py-24 lg:py-32 bg-primary overflow-hidden font-sans text-white">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />

      <Container size="xl" className="relative z-10">
        
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/70 mb-4">
            SYSTEM ARCHITECTURE
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-white leading-tight tracking-tight mb-6">
            Seamless Interoperability
          </h2>
          <p className="text-lg text-white/80 font-medium">
            An ecosystem built for scale and flexibility, connecting your physical fields to any digital platform.
          </p>
        </div>

        {/* Visual Flow Timeline */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-between min-h-[300px] px-2 sm:px-6 mb-24 hidden md:flex">
          
          {/* Main Horizontal Connecting Line with Animation */}
          <div className="absolute left-[5%] right-[5%] top-1/2 -translate-y-1/2 h-[4px] z-0 pointer-events-none">
            <svg className="w-full h-full">
              <motion.line
                x1="0" y1="50%" x2="100%" y2="50%"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Traveling Data Packet Glow */}
          <div className="absolute left-[5%] right-[5%] top-1/2 -translate-y-1/2 h-[4px] z-10 pointer-events-none overflow-visible">
             <motion.div 
               className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_20px_4px_rgba(255,255,255,0.8)]"
               initial={{ left: "0%", opacity: 0 }}
               whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
               viewport={{ once: true }}
               transition={{ duration: 2.5, delay: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
             />
          </div>

          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isMain = node.isMain;
            const isTop = node.position === "top";
            const isBottom = node.position === "bottom";

            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`relative z-10 flex flex-col items-center min-w-[70px] sm:min-w-[120px] ${isTop ? '-translate-y-16' : isBottom ? 'translate-y-16' : ''}`}
              >
                {/* Animated Vertical Connectors */}
                {isTop && (
                  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[4px] h-[64px] z-0 pointer-events-none">
                    <svg className="w-full h-full">
                      <motion.line
                        x1="50%" y1="100%" x2="50%" y2="0"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                      />
                    </svg>
                  </div>
                )}
                {isBottom && (
                  <div className="absolute bottom-[100%] left-1/2 -translate-x-1/2 w-[4px] h-[64px] z-0 pointer-events-none">
                    <svg className="w-full h-full">
                      <motion.line
                        x1="50%" y1="0" x2="50%" y2="100%"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                      />
                    </svg>
                  </div>
                )}

                {/* Node Content */}
                <div className={`flex items-center gap-3 relative z-10 ${isTop ? 'flex-col-reverse' : 'flex-col'}`}>
                  {isMain ? (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-3xl flex items-center justify-center text-primary shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-transform hover:scale-110 cursor-pointer">
                      <Icon className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={2} />
                    </div>
                  ) : (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:border-white hover:bg-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
                    </div>
                  )}
                  
                  <h3 className={`text-sm font-bold text-white/90 text-center leading-tight max-w-[100px] ${isMain ? 'text-white text-base' : ''}`}>
                    {node.name.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex gap-6 hover:bg-white/20 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-white/80 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}
