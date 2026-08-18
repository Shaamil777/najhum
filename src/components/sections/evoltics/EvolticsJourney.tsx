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
    <section className="w-full py-28 bg-background relative overflow-hidden font-sans border-b border-border">
      
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
        <div className="text-center max-w-3xl mx-auto mb-20">

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]"
          >
            Your Deployment Journey
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-muted text-base lg:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            From first consultation to long-term maintenance — a structured, transparent path to operational EV charging infrastructure.
          </motion.p>
        </div>

        {/* Journey Visual Path — Desktop Horizontal */}
        <div className="hidden lg:block mb-16">
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
            <div className="grid grid-cols-6 gap-4 relative">
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
                    {/* Node Circle */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 border-2 relative z-10 ${
                      isActive 
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-110' 
                        : isPast
                          ? 'bg-primary/15 text-primary border-primary/40'
                          : 'bg-surface text-muted border-border group-hover:border-primary/40 group-hover:text-primary'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Step Number */}
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1 transition-colors ${
                      isActive ? 'text-primary' : 'text-muted'
                    }`}>
                      Step {step.num}
                    </span>

                    {/* Step Title */}
                    <span className={`text-sm font-bold transition-colors ${
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

        {/* Journey Visual Path — Mobile Vertical */}
        <div className="lg:hidden mb-10">
          <div className="flex flex-col">
            {journeySteps.map((step, idx) => {
              const Icon = stepIcons[idx];
              const isActive = activeStep === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center space-x-4 p-4 rounded-xl text-left transition-all border mb-2 ${
                    isActive 
                      ? 'bg-primary/10 border-primary/40' 
                      : 'bg-surface border-border/60 hover:border-primary/30'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isActive ? 'bg-primary text-white' : 'bg-surface-alt text-muted border border-border'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider block ${isActive ? 'text-primary' : 'text-muted'}`}>
                      Step {step.num}
                    </span>
                    <span className={`text-sm font-bold ${isActive ? 'text-foreground' : 'text-muted'}`}>
                      {step.title}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ml-auto shrink-0 transition-colors ${isActive ? 'text-primary' : 'text-muted/40'}`} />
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
            className="bg-surface border border-border rounded-3xl p-8 lg:p-10 shadow-sm relative overflow-hidden"
          >
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
              
              {/* Left: Step Overview */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/25">
                    {React.createElement(stepIcons[activeStep], { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] block">
                      Step {journeySteps[activeStep].num} of 6
                    </span>
                    <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
                      {journeySteps[activeStep].title}
                    </h3>
                  </div>
                </div>

                <p className="text-base text-foreground/80 leading-relaxed">
                  {journeySteps[activeStep].desc}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-bold text-muted uppercase tracking-widest block mb-3">
                    Phase Deliverables
                  </span>
                  <div className="space-y-2.5">
                    {stepDetails[activeStep].deliverables.map((del, i) => (
                      <div key={i} className="flex items-start space-x-2.5 bg-surface-alt/70 p-3 rounded-xl border border-border/60">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-foreground">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Timeline & Output Metrics */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="bg-surface-alt border border-border rounded-2xl p-6">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] block mb-3">
                    Estimated Duration
                  </span>
                  <div className="text-3xl font-black text-foreground tracking-tight">
                    {stepDetails[activeStep].duration}
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] block mb-2">
                    Phase Output
                  </span>
                  <p className="text-sm font-semibold text-foreground leading-relaxed">
                    {stepDetails[activeStep].output}
                  </p>
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
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
        >
          <div className="bg-surface-alt border border-border rounded-xl p-4">
            <span className="text-2xl font-black text-foreground block">6</span>
            <span className="text-[11px] text-muted font-semibold uppercase tracking-wider">Phases</span>
          </div>
          <div className="bg-surface-alt border border-border rounded-xl p-4">
            <span className="text-2xl font-black text-foreground block">12–20</span>
            <span className="text-[11px] text-muted font-semibold uppercase tracking-wider">Weeks Average</span>
          </div>
          <div className="bg-surface-alt border border-border rounded-xl p-4">
            <span className="text-2xl font-black text-primary block">1</span>
            <span className="text-[11px] text-muted font-semibold uppercase tracking-wider">Partner</span>
          </div>
          <div className="bg-surface-alt border border-border rounded-xl p-4">
            <span className="text-2xl font-black text-success block">100%</span>
            <span className="text-[11px] text-muted font-semibold uppercase tracking-wider">Turnkey</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
