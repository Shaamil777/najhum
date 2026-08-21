"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  BatteryCharging,
  Leaf,
  Milestone,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe2,
  Cpu,
  Layers,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react";

interface MilestoneData {
  year: string;
  phase: string;
  tag: string;
  status: "completed" | "active" | "upcoming" | "target";
  title: string;
  desc: string;
  deliverables: string[];
  impactMetric: string;
}

const timelineData: MilestoneData[] = [
  {
    year: "2023",
    phase: "Phase 01",
    tag: "FOUNDATION",
    status: "completed",
    title: "Green Mobility Inception",
    desc: "Dubai Green Mobility Initiative v1 launch and foundational CPO regulatory framework establishment.",
    deliverables: [
      "Initial public charging network rollout",
      "DEWA EV Green Charger integration",
      "Unified tariff & billing sandbox"
    ],
    impactMetric: "Network Genesis"
  },
  {
    year: "2026",
    phase: "Phase 02",
    tag: "EXPANSION",
    status: "active",
    title: "Mandatory Infrastructure",
    desc: "Enforcement of mandatory EV charging infrastructure requirements for all new commercial and residential developments.",
    deliverables: [
      "Mandatory parking bay electrification",
      "Interoperable OCPP 2.0.1 compliance",
      "Standardized municipal building codes"
    ],
    impactMetric: "+350% Deployment Rate"
  },
  {
    year: "2030",
    phase: "Phase 03",
    tag: "OPTIMISATION",
    status: "upcoming",
    title: "Smart Grid & V2G Integration",
    desc: "Nationwide smart grid orchestration enabling Vehicle-to-Grid (V2G) bidirectional power flow and dynamic load balancing.",
    deliverables: [
      "V2G bidirectional energy exchange",
      "AI-driven peak demand shifting",
      "Automated renewable energy absorption"
    ],
    impactMetric: "40% EV Adoption"
  },
  {
    year: "2050",
    phase: "Phase 04",
    tag: "NET ZERO",
    status: "target",
    title: "100% Electrified Mobility",
    desc: "Complete decarbonization of public, commercial, and private transport in full lockstep with the UAE Net Zero 2050 Charter.",
    deliverables: [
      "100% zero-emission fleet transition",
      "Autonomous green logistics corridors",
      "Fully closed-loop renewable grid"
    ],
    impactMetric: "Net Zero Emissions"
  }
];

export default function EvolticsAbout() {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(1); // Default to 2026 (Expansion)

  return (
    <section className="w-full py-16 sm:py-20 lg:py-28 bg-white text-foreground relative overflow-hidden font-sans">
      {/* Background Architectural Grid & Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_10%,#000_15%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-7xl">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 lg:mb-20 gap-4 sm:gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[1.75rem] sm:text-3xl lg:text-[2rem] xl:text-[3.2rem] font-black tracking-tight text-foreground leading-[1.1] sm:leading-[1.05] uppercase"
            >
              UAE EV Market Outlook
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed"
          >
            Positioned at the nexus of the UAE’s green mobility vision, aligning cutting-edge CPMS infrastructure with federal electrification goals.
          </motion.p>
        </div>

        {/* 3 Creative Strategic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20">
          
          {/* Pillar 1: Projection 2030 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-surface border border-border hover:border-primary/40 rounded-xl sm:rounded-2xl p-4 sm:p-7 lg:p-8 relative flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
            
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.2em] text-muted uppercase">
                  PROJECTION_2030
                </span>
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </div>
              </div>

              {/* Visual Circular Gauge + Metric */}
              <div className="flex items-baseline gap-2 sm:gap-4 my-1 sm:my-2">
                <span className="text-4xl sm:text-6xl font-black font-display text-foreground tracking-tight">
                  40%
                </span>
                <span className="inline-flex items-center text-[9px] sm:text-xs font-bold text-primary bg-primary/10 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded sm:rounded-md">
                  Target
                </span>
              </div>

              {/* Visual Progress Arc */}
              <div className="w-full bg-surface-alt h-1.5 sm:h-2.5 rounded-full mt-2 sm:mt-4 mb-3 sm:mb-5 overflow-hidden p-[1px] sm:p-0.5 border border-border">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "40%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
                />
              </div>

              <p className="text-[11px] sm:text-sm text-muted leading-relaxed">
                Projected EV adoption in UAE by 2030, accelerated by the federal <span className="font-semibold text-foreground">Green Mobility Strategy</span> and smart city initiatives.
              </p>
            </div>

            <div className="mt-4 sm:mt-8 pt-3 sm:pt-4 border-t border-border flex items-center justify-between text-[10px] sm:text-xs text-muted">
              <span>National Fleet Shift</span>
              <span className="font-bold text-foreground">1 in 2.5 Vehicles</span>
            </div>
          </motion.div>

          {/* Pillar 2: Capacity Required */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-surface border border-border hover:border-primary/40 rounded-xl sm:rounded-2xl p-4 sm:p-7 lg:p-8 relative flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.2em] text-muted uppercase">
                  CAPACITY REQUIRED
                </span>
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                  <BatteryCharging className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </div>
              </div>

              <div className="flex items-baseline gap-2 sm:gap-4 my-1 sm:my-2">
                <span className="text-4xl sm:text-6xl font-black font-display text-foreground tracking-tight">
                  42k+
                </span>
                <span className="inline-flex items-center text-[9px] sm:text-xs font-bold text-amber-600 bg-amber-500/10 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded sm:rounded-md">
                  By 2035
                </span>
              </div>

              {/* Segmented Capacity Visual */}
              <div className="grid grid-cols-6 gap-1 sm:gap-1.5 mt-2 sm:mt-4 mb-3 sm:mb-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 sm:h-2.5 rounded-[1px] sm:rounded-sm ${i <= 5 ? 'bg-amber-500/80' : 'bg-surface-alt border border-border'}`} 
                  />
                ))}
              </div>

              <p className="text-[11px] sm:text-sm text-muted leading-relaxed">
                New charging points required across the UAE by 2035 to sustain the surging electric vehicle fleet and inter-emirate transit.
              </p>
            </div>

            <div className="mt-4 sm:mt-8 pt-3 sm:pt-4 border-t border-border flex items-center justify-between text-[10px] sm:text-xs text-muted">
              <span>Grid Density Demand</span>
              <span className="font-bold text-foreground">High Growth (AC & DC)</span>
            </div>
          </motion.div>

          {/* Pillar 3: Target Goal */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-surface border border-border hover:border-success/40 rounded-xl sm:rounded-2xl p-4 sm:p-7 lg:p-8 relative flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden md:col-span-2 lg:col-span-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-full blur-2xl pointer-events-none group-hover:bg-success/10 transition-colors" />

            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.2em] text-muted uppercase">
                  TARGET GOAL
                </span>
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-success/10 flex items-center justify-center text-success group-hover:scale-110 transition-transform">
                  <Leaf className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </div>
              </div>

              <div className="flex items-baseline gap-2 sm:gap-4 my-1 sm:my-2">
                <span className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-success tracking-tight">
                  NET ZERO
                </span>
              </div>

              {/* Status Pill Strip */}
              <div className="flex items-center space-x-2 mt-2 sm:mt-4 mb-3 sm:mb-5">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-success bg-success/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  UAE Net Zero 2050 Charter
                </span>
              </div>

              <p className="text-[11px] sm:text-sm text-muted leading-relaxed">
                Full alignment with the <span className="font-semibold text-foreground">UAE Net Zero 2050 Charter</span> through resilient, sustainable, and smart IoT infrastructure.
              </p>
            </div>

            <div className="mt-4 sm:mt-8 pt-3 sm:pt-4 border-t border-border flex items-center justify-between text-[10px] sm:text-xs text-muted">
              <span>Emissions Reductions</span>
              <span className="font-bold text-success">100% Decarbonized</span>
            </div>
          </motion.div>

        </div>

        {/* Interactive Strategic Roadmap Container */}
        <div className="bg-surface border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 shadow-sm relative overflow-hidden">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 sm:pb-8 border-b border-border mb-8 sm:mb-10 gap-3 sm:gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Milestone className="w-4 h-4 text-primary" />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
                  Regulatory & Engineering Roadmap
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight">
                National Electrification Timeline
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-muted max-w-sm">
              Click milestones below to explore phase deliverables, grid protocols, and strategic milestones.
            </p>
          </div>

          {/* Stepper Tabs Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4 mb-8 sm:mb-10">
            {timelineData.map((item, idx) => {
              const isSelected = selectedMilestone === idx;
              return (
                <button
                  key={item.year}
                  onClick={() => setSelectedMilestone(idx)}
                  className={`flex flex-col p-3 sm:p-4 rounded-xl text-left border transition-all relative ${
                    isSelected 
                      ? 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-[1.02] z-10' 
                      : 'bg-surface-alt hover:bg-surface border-border text-foreground hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`text-lg sm:text-2xl font-black ${isSelected ? 'text-white' : 'text-foreground'}`}>
                      {item.year}
                    </span>
                    <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : item.status === 'completed'
                          ? 'bg-success/15 text-success'
                          : item.status === 'active'
                            ? 'bg-primary/15 text-primary'
                            : 'bg-muted/15 text-muted'
                    }`}>
                      {item.tag}
                    </span>
                  </div>
                  <span className={`text-[10px] sm:text-xs font-semibold ${isSelected ? 'text-white/80' : 'text-muted'}`}>
                    {item.phase}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Detailed Briefing Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMilestone}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-surface-alt/70 border border-border/80 rounded-2xl p-5 sm:p-6 lg:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                
                {/* Left Overview */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-2xl sm:text-3xl font-black text-foreground">
                      {timelineData[selectedMilestone].year}
                    </span>
                    <div className="h-4 w-px bg-border" />
                    <span className="text-[11px] sm:text-sm font-bold text-primary tracking-wide uppercase leading-tight">
                      {timelineData[selectedMilestone].title}
                    </span>
                  </div>

                  <p className="text-[13px] sm:text-base text-foreground/80 leading-relaxed">
                    {timelineData[selectedMilestone].desc}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] sm:text-[11px] font-bold text-muted uppercase tracking-widest block mb-2 sm:mb-3">
                      Key Technical & Regulatory Deliverables
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                      {timelineData[selectedMilestone].deliverables.map((del, i) => (
                        <div key={i} className="flex items-start space-x-2 bg-surface p-2.5 rounded-lg border border-border/60">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-[11px] sm:text-xs font-medium text-foreground">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Stat Radar Card */}
                <div className="lg:col-span-5 bg-surface border border-border rounded-xl p-5 sm:p-6 flex flex-col justify-between h-full shadow-sm mt-2 lg:mt-0">
                  <div>
                    <div className="mb-4">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase">
                        Strategic Target Indicator
                      </span>
                    </div>
                    <div className="text-2xl font-black text-foreground mb-1">
                      {timelineData[selectedMilestone].impactMetric}
                    </div>
                    <span className="text-xs text-muted block mb-4">
                      National mandate priority index
                    </span>
                  </div>

                  <div className="p-3.5 bg-primary/5 rounded-lg border border-primary/10 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-foreground">DEWA / TAQA / FEWA Compliant</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
