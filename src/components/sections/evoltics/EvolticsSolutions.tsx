"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { evolticsContent } from "@/content/platforms";
import {
  Layers,
  ShieldCheck,
  Cpu,
  Activity,
  Sparkles,
  Headphones,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Flame,
  Workflow
} from "lucide-react";

const rawCards = evolticsContent.solutions.cards;

const enhancedCards = [
  {
    ...rawCards[0],
    icon: Layers,
    tag: "END-TO-END",
    badge: "Single SLA Accountability",
    highlights: ["Licensing & Approvals", "Hardware & Installation", "Unified Operator CPMS"],
    accentColor: "from-blue-500/20 to-primary/10"
  },
  {
    ...rawCards[1],
    icon: ShieldCheck,
    tag: "REGULATORY",
    badge: "DEWA • TAQA • FEWA",
    highlights: ["CPO License Acceleration", "Grid Authority Liaison", "Statutory Compliance Audit"],
    accentColor: "from-emerald-500/20 to-teal-500/10"
  },
  {
    ...rawCards[2],
    icon: Cpu,
    tag: "HARDWARE AGNOSTIC",
    badge: "OCPP 1.6J / 2.0.1",
    highlights: ["Zero Brand Lock-in", "Multi-Vendor AC & DC", "Direct Firmware Management"],
    accentColor: "from-purple-500/20 to-indigo-500/10"
  },
  {
    ...rawCards[3],
    icon: Activity,
    tag: "TELEMETRY",
    badge: "Sub-Second Monitoring",
    highlights: ["Live Power Distribution", "Remote Diagnostics & Reset", "Smart Dynamic Load Balancing"],
    accentColor: "from-cyan-500/20 to-blue-500/10"
  },
  {
    ...rawCards[4],
    icon: Sparkles,
    tag: "BRANDING",
    badge: "Tenant Branded Apps",
    highlights: ["Custom Driver Mobile App", "White-Label CPMS Portal", "Custom Invoicing & Tariffs"],
    accentColor: "from-amber-500/20 to-orange-500/10"
  },
  {
    ...rawCards[5],
    icon: Headphones,
    tag: "RELIABILITY",
    badge: "99.9% Uptime SLA",
    highlights: ["24/7 Field Engineering", "Predictive Maintenance", "Rapid-Response Dispatch"],
    accentColor: "from-sky-500/20 to-primary/10"
  }
];

export default function EvolticsSolutions() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="w-full py-32 bg-dark text-white relative overflow-hidden font-sans border-b border-neutral-800">
      
      {/* Background Architectural Tech Grid & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_20%,transparent_100%)]" />
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-7xl">
        
        {/* Header Area */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              What Powers the <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-400 via-primary to-cyan-300 bg-clip-text text-transparent">
                Evoltics Advantage
              </span>
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-neutral-400 text-base lg:text-lg max-w-md leading-relaxed"
          >
            A connected approach that unifies technology, regulatory compliance, hardware flexibility, and 24/7 SLA operational support.
          </motion.p>
        </div>

        {/* 6-Card Enterprise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {enhancedCards.map((card, idx) => {
            const Icon = card.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative bg-dark-surface/60 hover:bg-dark-surface/90 border border-white/10 hover:border-primary/50 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
              >
                {/* Background Ambient Card Glow */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${card.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} 
                />

                {/* Card Top Strip */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase bg-white/5 px-2.5 py-1 rounded border border-white/5">
                        {card.tag}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-neutral-500 group-hover:text-primary transition-colors">
                      {card.num}
                    </span>
                  </div>

                  {/* Visual Pattern Image Container */}
                  <div className="w-full h-36 relative mb-6 rounded-xl bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center p-4">
                    <Image
                      src={`/images/elvotics/card_${idx + 1}.png`}
                      alt={card.title}
                      fill
                      className="object-contain p-2 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/90 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Card Bottom Highlights */}
                <div className="relative z-10 pt-4 border-t border-white/10 space-y-2">
                  {card.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-center space-x-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}

                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      {card.badge}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-primary/20 flex items-center justify-center text-neutral-400 group-hover:text-primary transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-dark-surface via-dark-surface/80 to-dark-surface border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-0.5">
                Ready to deploy an enterprise-grade charging network?
              </h4>
              <p className="text-xs text-neutral-400">
                Experience seamless integration across DEWA, TAQA, and FEWA utility jurisdictions.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-xl">
              100% Turnkey Solution
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
