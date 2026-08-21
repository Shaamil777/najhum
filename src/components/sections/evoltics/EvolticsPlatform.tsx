"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Zap,
  Scale,
  BadgeDollarSign,
  Wrench,
  Receipt,
  Truck,
  Network,
  CheckCircle2,
  MapPin,
  BarChart3,
  Cpu,
  Layers,
  Radio,
  Sliders,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Server
} from "lucide-react";

type DashboardTab = "fleet" | "load" | "revenue";

const features = [
  { icon: Server, title: "Hardware Agnostic", desc: "Integrate and setup any OCPP-compliant charger in a few clicks and start charging." },
  { icon: BarChart3, title: "Dashboard & Analytics", desc: "Monitor your charging network with real-time data insights, charts and statistics." },
  { icon: Layers, title: "White Label Ready", desc: "Host a self-branded CPMS from your custom domain with personal brand logo and colors." },
  { icon: BadgeDollarSign, title: "Dynamic Price Plans", desc: "Create multiple pricing groups with independent rates for public and private users." },
  { icon: Receipt, title: "Auto-Payment Settlements", desc: "Smart settlement system auto-calculates fees and distributes net revenue monthly." },
  { icon: ShieldCheck, title: "Public-Private Mode", desc: "Set charger accessibility for employees or visitors as private, or open to the public." },
];

export default function EvolticsPlatform() {
  return (
    <section className="w-full py-28 bg-white relative overflow-hidden font-sans ">
      
      {/* Background Architectural Grid & Radial Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_15%,transparent_100%)]" />
      </div>

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-16 gap-3 sm:gap-8">
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2rem] xl:text-[3.2rem] font-black tracking-tight text-foreground leading-[1.1] sm:leading-[1.05] uppercase"
            >
              CPMS — Charge Point <br className="hidden sm:block" />
              <span className="text-primary font-black">Management System</span>
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted text-[13px] sm:text-base lg:text-lg max-w-md leading-relaxed italic text-center lg:text-left mx-auto lg:mx-0 mt-2 sm:mt-0"
          >
            World's first IoT-enabled EV Charger Management Platform.
          </motion.p>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Left Column: 4 Feature Capabilities */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="mb-4 sm:mb-6 text-center lg:text-left">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3 leading-tight">
                Everything you need <br className="hidden lg:block"/> in one CPMS
              </h3>
              <p className="text-[12px] sm:text-sm md:text-base text-muted leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Connect and control all your EV infrastructure from a single platform. Manage revenue, users, energy output, and more with our open, interoperable, hardware-agnostic software.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="p-3 sm:p-4 rounded-xl bg-surface border border-border/80 hover:border-primary/40 hover:bg-surface-alt/50 transition-all flex flex-col sm:flex-row lg:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-4 group shadow-sm"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-1 sm:mb-0">
                        {feat.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-muted leading-relaxed sm:mt-1 line-clamp-3 sm:line-clamp-none">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Enterprise Dashboard Showcase */}
          <div className="lg:col-span-8 lg:mt-12 xl:mt-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-surface-alt rounded-2xl border border-border shadow-sm overflow-hidden relative min-h-[400px] sm:min-h-[500px] flex flex-col"
            >
              
              {/* Dashboard Browser Frame Bar */}
              <div className="bg-surface px-4 sm:px-5 py-3 sm:py-3.5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 relative z-20">
                <div className="flex items-center space-x-3 w-full sm:w-auto overflow-hidden">
                  <div className="flex space-x-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="h-3 w-px bg-border shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-mono text-muted truncate">
                    evoltics.cloud/admin/control-hub
                  </span>
                </div>
              </div>

              {/* Placeholder Content */}
              <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 text-center relative z-10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_70%)] opacity-[0.03] pointer-events-none" />
                
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black text-foreground mb-3 tracking-tight">
                  CPMS Dashboard
                </h3>
                <p className="text-sm sm:text-base text-muted max-w-md mx-auto mb-8 leading-relaxed">
                  Connect your charging endpoints to unlock real-time monitoring, dynamic load balancing, and automated revenue settlements.
                </p>
                
                <button className="bg-primary text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 hover:-translate-y-0.5 transition-all flex items-center gap-2 group">
                  <span>View Dashboard</span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Decorative faint background grid */}
              <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              </div>

            </motion.div>

            {/* Enterprise Compatibility Footer & Prominent OCPP Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 w-full"
            >
              {/* Infrastructure Partners Card */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 w-full sm:w-auto bg-surface sm:bg-transparent border border-border sm:border-transparent px-4 py-3 sm:p-0 rounded-xl shadow-sm sm:shadow-none">
                <span className="text-[10px] sm:text-xs font-semibold text-muted uppercase tracking-wider text-center sm:text-left">
                  Infrastructure Partners:
                </span>
                <div className="flex items-center justify-center space-x-4 sm:space-x-4 opacity-80 mt-1 sm:mt-0">
                  <span className="text-sm font-black text-foreground hover:text-primary transition-colors cursor-pointer">DEWA</span>
                  <span className="text-sm font-black text-foreground hover:text-primary transition-colors cursor-pointer">TAQA</span>
                  <span className="text-sm font-black text-foreground hover:text-primary transition-colors cursor-pointer">FEWA</span>
                </div>
              </div>

              {/* Prominent Outside Certification Badge */}
              <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4 bg-surface border border-border px-4 sm:px-5 py-2 sm:py-3 rounded-xl shadow-sm cursor-pointer group hover:border-primary/40 transition-colors overflow-hidden shrink-0 w-full sm:w-auto">
                <div className="w-10 h-10 sm:w-14 sm:h-14 relative flex items-center justify-center -ml-1">
                  <Image 
                    src="/logo/occplogo.png" 
                    alt="OCPP 2.0.1 Certified" 
                    width={96} 
                    height={96} 
                    className="object-contain opacity-90 group-hover:opacity-100 transition-all scale-[1.3] group-hover:scale-[1.4]" 
                  />
                </div>
                <div className="flex flex-col pr-1 sm:pr-2 text-left">
                  <span className="text-xs sm:text-sm font-bold text-foreground leading-none mb-1">OCPP 2.0.1</span>
                  <span className="text-[9px] sm:text-[10px] text-muted uppercase tracking-widest font-semibold">Certified Network Protocol</span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
