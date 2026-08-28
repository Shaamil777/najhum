"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  MapPinned,
  FileCheck2,
  Wrench,
  Rocket,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

import { evolticsContent } from "@/content/platforms";

const journeySteps = evolticsContent.journey.steps;

const stepIcons = [MessageSquare, MapPinned, FileCheck2, Wrench, Rocket, ShieldCheck];

const stepDetails = [
  {
    duration: "1–2 Weeks",
    deliverables: ["Needs assessment workshop", "Energy demand profiling", "Commercial model selection"],
    output: "Scoped deployment brief & financial model"
  },
  {
    duration: "2–3 Weeks",
    deliverables: ["Electrical load capacity audit", "Parking infrastructure review", "Grid connection feasibility"],
    output: "Technical site readiness report"
  },
  {
    duration: "4–8 Weeks",
    deliverables: ["DEWA / TAQA / FEWA submission", "Grid energization applications", "CPO licence procurement"],
    output: "Full regulatory clearance & utility approval"
  },
  {
    duration: "4–6 Weeks",
    deliverables: ["Civil & electrical works", "Charger mounting & wiring", "OCPP network integration"],
    output: "Commissioned & grid-connected hardware"
  },
  {
    duration: "1–2 Weeks",
    deliverables: ["CPMS cloud provisioning", "End-to-end load testing", "Operator training & handover"],
    output: "Fully operational charging station"
  },
  {
    duration: "Ongoing",
    deliverables: ["24/7 remote monitoring", "Preventive maintenance cycles", "Regulatory compliance audits"],
    output: "Maximized uptime & protected investment"
  }
];

export default function EvolticsJourney() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="w-full py-16 lg:py-28 bg-background relative overflow-hidden font-sans">
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      {/* Background Illustrations */}
      <div className="absolute top-[70%] -translate-y-1/2 left-[2%] w-[30%] opacity-[0.04] pointer-events-none z-0">
        <img src="/images/elvotics/journey_img_2.svg" alt="" className="w-full h-auto object-contain" />
      </div>
      <div className="absolute top-[40%] -translate-y-1/2 right-[2%] w-[30%] opacity-[0.04] pointer-events-none z-0">
        <img src="/images/elvotics/journey_img_1.svg" alt="" className="w-full h-auto object-contain" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-20">

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[1.65rem] sm:text-3xl md:text-4xl xl:text-[3.2rem] font-black tracking-tight text-foreground leading-[1.1] sm:leading-[1.05] uppercase"
          >
            Your Deployment Journey
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-3 sm:mt-4 text-muted text-[13px] sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            From first consultation to long-term maintenance — a structured, transparent path to operational EV charging infrastructure.
          </motion.p>
        </div>

        {/* Journey Visual Path — Desktop Horizontal */}
        <div className="hidden md:block mb-12 lg:mb-16">
          <div className="relative">
            
            {/* Horizontal Connected Line */}
            <div className="absolute top-[28px] left-[8%] right-[8%] h-[3px] bg-border rounded-full">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${((activeStep) / (journeySteps.length - 1)) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full bg-primary rounded-full"
              />
            </div>

            {/* Step Nodes */}
            <div className="grid grid-cols-6 gap-2 lg:gap-4 relative">
              {journeySteps.map((step, idx) => {
                const Icon = stepIcons[idx];
                const isActive = activeStep === idx;
                const isPast = idx < activeStep;

                return (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setActiveStep(idx)}
                    className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                  >
                    {/* Node Circle Wrapper to block the line */}
                    <div className="relative z-10 bg-background rounded-2xl mb-2 lg:mb-4">
                      <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${
                        isActive 
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-110' 
                          : isPast
                            ? 'bg-primary/15 text-primary border-primary/40'
                            : 'bg-surface text-muted border-border group-hover:border-primary/40 group-hover:text-primary'
                      }`}>
                        <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                      </div>
                    </div>

                    {/* Step Number */}
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1 transition-colors ${
                      isActive ? 'text-primary' : 'text-muted'
                    }`}>
                      Step {step.num}
                    </span>

                    {/* Step Title */}
                    <span className={`text-[11px] lg:text-sm font-bold transition-colors ${
                      isActive ? 'text-foreground' : 'text-muted'
                    }`}>
                      {step.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Journey Visual Path — Mobile 3x2 Grid */}
        <div className="md:hidden mb-6">
          <div className="grid grid-cols-3 gap-2">
            {journeySteps.map((step, idx) => {
              const Icon = stepIcons[idx];
              const isActive = activeStep === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`flex flex-col items-center text-center p-2.5 rounded-xl transition-all border ${
                    isActive 
                      ? 'bg-primary/10 border-primary/40 shadow-sm' 
                      : 'bg-surface border-border/60 hover:border-primary/30'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mb-1.5 transition-all ${
                    isActive ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-surface-alt text-muted border border-border'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[8px] font-bold uppercase tracking-wider block mb-0.5 ${isActive ? 'text-primary' : 'text-muted'}`}>
                    Step {step.num}
                  </span>
                  <span className={`text-[9px] font-bold leading-tight ${isActive ? 'text-foreground' : 'text-muted'}`}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Detail Briefing Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-surface border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-8 lg:p-10 shadow-sm relative overflow-hidden"
          >
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 md:gap-8 lg:gap-12 items-start relative z-10">
              
              {/* Left: Step Overview */}
              <div className="md:col-span-1 lg:col-span-7 space-y-3 sm:space-y-4 md:space-y-5">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary text-white items-center justify-center shadow-md shadow-primary/25 shrink-0">
                    {React.createElement(stepIcons[activeStep], { className: "w-5 h-5 sm:w-6 sm:h-6" })}
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-primary uppercase tracking-[0.2em] block">
                      Step {journeySteps[activeStep].num} of 6
                    </span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-foreground tracking-tight leading-tight">
                      {journeySteps[activeStep].title}
                    </h3>
                  </div>
                </div>

                <p className="text-[12px] sm:text-[13px] md:text-base text-foreground/80 leading-relaxed">
                  {journeySteps[activeStep].desc}
                </p>

                <div className="pt-1 md:pt-2">
                  <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-muted uppercase tracking-widest block mb-2 sm:mb-3">
                    Phase Deliverables
                  </span>
                  <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
                    {stepDetails[activeStep].deliverables.map((del, i) => (
                      <div key={i} className="flex items-start space-x-2 sm:space-x-2.5 bg-surface-alt/70 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl border border-border/60">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0 mt-0.5 sm:mt-0.5" />
                        <span className="text-[11px] sm:text-[12px] md:text-sm font-medium text-foreground leading-snug">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Timeline & Output Metrics */}
              <div className="md:col-span-1 lg:col-span-5 space-y-3 sm:space-y-4 md:space-y-6 flex flex-col justify-between h-full">
                
                <div className="flex sm:flex-col gap-3 sm:gap-4 md:gap-6">
                  <div className="flex-1 bg-surface-alt border border-border rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6">
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-muted uppercase tracking-[0.2em] block mb-1.5 sm:mb-2 md:mb-3">
                      Est. Duration
                    </span>
                    <div className="text-lg sm:text-2xl md:text-3xl font-black text-foreground tracking-tight">
                      {stepDetails[activeStep].duration}
                    </div>
                  </div>

                  <div className="flex-1 bg-primary/5 border border-primary/15 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6">
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-[0.2em] block mb-1.5 sm:mb-2">
                      Phase Output
                    </span>
                    <p className="text-[11px] sm:text-[13px] md:text-sm font-semibold text-foreground leading-relaxed">
                      {stepDetails[activeStep].output}
                    </p>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    disabled={activeStep === 0}
                    className="px-4 py-2 text-xs font-bold text-muted border border-border rounded-lg hover:border-primary/40 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setActiveStep((prev) => Math.min(journeySteps.length - 1, prev + 1))}
                    disabled={activeStep === journeySteps.length - 1}
                    className="px-4 py-2 text-xs font-bold text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center space-x-1.5"
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Journey Summary Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center"
        >
          <div className="bg-surface-alt border border-border rounded-xl p-3 sm:p-4">
            <span className="text-xl sm:text-2xl font-black text-foreground block">6</span>
            <span className="text-[9px] sm:text-[11px] text-muted font-semibold uppercase tracking-wider">Phases</span>
          </div>
          <div className="bg-surface-alt border border-border rounded-xl p-3 sm:p-4">
            <span className="text-xl sm:text-2xl font-black text-foreground block">12–20</span>
            <span className="text-[9px] sm:text-[11px] text-muted font-semibold uppercase tracking-wider">Weeks Average</span>
          </div>
          <div className="bg-surface-alt border border-border rounded-xl p-3 sm:p-4">
            <span className="text-xl sm:text-2xl font-black text-primary block">1</span>
            <span className="text-[9px] sm:text-[11px] text-muted font-semibold uppercase tracking-wider">Partner</span>
          </div>
          <div className="bg-surface-alt border border-border rounded-xl p-3 sm:p-4">
            <span className="text-xl sm:text-2xl font-black text-success block">100%</span>
            <span className="text-[9px] sm:text-[11px] text-muted font-semibold uppercase tracking-wider">Turnkey</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
