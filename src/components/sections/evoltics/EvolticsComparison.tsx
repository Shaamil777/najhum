"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  XCircle,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  Split,
  Layers,
  Activity,
  Cpu
} from "lucide-react";

interface ComparisonItem {
  id: string;
  traditional: {
    title: string;
    description: string;
    details: string;
  };
  evoltics: {
    title: string;
    description: string;
    details: string;
  };
}

const comparisonData: ComparisonItem[] = [
  {
    id: "vendors",
    traditional: {
      title: "FRAGMENTED VENDORS",
      description: "Dealing with 5+ different contractors for one project.",
      details: "Siloed contracts, misaligned timelines, and passing the blame when issues arise."
    },
    evoltics: {
      title: "ONE PARTNER",
      description: "Single point of contact for design, build, and management.",
      details: "Turnkey accountability across licensing, hardware supply, civil works, and CPMS."
    }
  },
  {
    id: "silos",
    traditional: {
      title: "COMMUNICATION SILOS",
      description: "Manual data reconciliation between hardware and software.",
      details: "Delayed billing cycles, uncaptured socket errors, and proprietary hardware lock-in."
    },
    evoltics: {
      title: "UNIFIED PLATFORM",
      description: "Seamless hardware-to-software integration with real-time sync.",
      details: "Instant telemetry, automated tariff invoicing, and sub-second remote control."
    }
  },
  {
    id: "compliance",
    traditional: {
      title: "HIDDEN COMPLIANCE RISK",
      description: "Regulatory gaps due to lack of end-to-end oversight.",
      details: "Delayed utility grid energization and unexpected authority inspection penalties."
    },
    evoltics: {
      title: "FIXED COMPLIANCE",
      description: "Pre-approved regulatory workflows and certified licensing.",
      details: "Full statutory compliance with DEWA, TAQA, and FEWA standards from day zero."
    }
  }
];

export default function EvolticsComparison() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section className="w-full py-28 bg-background relative overflow-hidden font-sans border-b border-border">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-35">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_50%_at_50%_0%,#000_15%,transparent_100%)]" />
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
            Traditional Complexity vs. <br className="hidden sm:block" />
            <span className="text-primary">The Evoltics Advantage</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-muted text-base lg:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Why progressive asset owners and fleet operators transition from fractured multi-vendor setups to a cohesive, turnkey ecosystem.
          </motion.p>
        </div>

        {/* Comparison Matrix Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
          
          {/* Column 1: Traditional Path */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-surface-alt/80 border border-border/80 rounded-3xl p-8 lg:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            <div>
              {/* Column Header */}
              <div className="flex items-center justify-between pb-6 border-b border-border/80 mb-8">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase block mb-1">
                    The Conventional Model
                  </span>
                  <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
                    Traditional Path
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-danger/10 border border-danger/20 flex items-center justify-center text-danger shrink-0">
                  <XCircle className="w-5 h-5" />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-8">
                {comparisonData.map((item, idx) => (
                  <div 
                    key={item.id}
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`p-5 rounded-2xl border transition-all duration-300 ${
                      hoveredRow === idx 
                        ? 'bg-danger/5 border-danger/30 translate-x-1' 
                        : 'bg-surface border-border/60'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 mb-2">
                      <XCircle className="w-4 h-4 text-danger/80 shrink-0" />
                      <span className="text-xs font-bold tracking-wider text-danger uppercase">
                        {item.traditional.title}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-foreground mb-1.5">
                      {item.traditional.description}
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      {item.traditional.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/80 flex items-center justify-between text-xs text-muted">
              <span>Overall Project Friction:</span>
              <span className="font-bold text-danger">High Overhead & Delays</span>
            </div>
          </motion.div>

          {/* Column 2: The Evoltics Path (Recommended) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-surface border-2 border-primary rounded-3xl p-8 lg:p-10 flex flex-col justify-between shadow-xl shadow-primary/10 relative overflow-hidden"
          >
            {/* Top Ambient Highlight Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Column Header */}
              <div className="flex items-center justify-between pb-6 border-b border-border mb-8 relative z-10">
                <div>
                  <div className="inline-flex items-center space-x-1.5 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Recommended Standard</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
                    The Evoltics Path
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-primary-light border border-primary/25 flex items-center justify-center text-primary shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-8 relative z-10">
                {comparisonData.map((item, idx) => (
                  <div 
                    key={item.id}
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`p-5 rounded-2xl border transition-all duration-300 ${
                      hoveredRow === idx 
                        ? 'bg-primary-light/60 border-primary shadow-md -translate-x-1' 
                        : 'bg-surface-alt/50 border-border/80'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-xs font-bold tracking-wider text-primary uppercase">
                        {item.evoltics.title}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-foreground mb-1.5">
                      {item.evoltics.description}
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      {item.evoltics.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs text-muted relative z-10">
              <span>Deployment Timeline:</span>
              <span className="font-bold text-primary">Up to 60% Faster Delivery</span>
            </div>
          </motion.div>

        </div>


      </div>
    </section>
  );
}
