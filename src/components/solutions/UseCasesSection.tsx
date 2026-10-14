"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { UseCasesContent } from '@/types/section';
import { Sparkles, CheckCircle2, TrendingUp, Layers } from 'lucide-react';
import { Container } from '@/design-system/primitives/layout/Container';

export default function UseCasesSection({ content }: { content: UseCasesContent }) {
  const tabs = content.tabs || [];
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  if (!tabs || tabs.length === 0) {
    return null;
  }

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  return (
    <section className="relative w-full py-20 lg:py-32 bg-neutral-950 text-white overflow-hidden border-b border-neutral-800">
      {/* Background Ambient Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-[0.02]" />
      </div>

      <Container className="relative z-10" size="xl">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-bold tracking-widest uppercase text-primary-300 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{content.eyebrow || 'ENTERPRISE DEPLOYMENTS'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.1] mb-8 [text-wrap:balance]">
            {content.heading}
          </h2>

          {/* Tab Navigation Pills */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {tabs.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={`px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary/30 border border-primary scale-[1.02]' 
                      : 'bg-neutral-900/80 text-neutral-400 border border-neutral-800 hover:border-neutral-700 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="pt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Solution & Implementation Details */}
              <div className="lg:col-span-7 h-full flex flex-col justify-between bg-neutral-900/60 border border-neutral-800 rounded-3xl p-7 sm:p-10 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-mono font-bold tracking-widest text-primary-300 uppercase">
                      Architecture & Equipment
                    </span>
                  </div>

                  <p className="text-lg sm:text-xl font-bold text-white mb-6 leading-relaxed [text-wrap:pretty]">
                    {activeTab.solutionDetails}
                  </p>

                  {/* Bullet Capabilities */}
                  <ul className="space-y-3.5 mt-6">
                    {activeTab.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-sm sm:text-base font-medium text-neutral-300 flex items-start gap-3.5">
                        <span className="w-5 h-5 mt-0.5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 border border-primary/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
                  <span>Standard Production Deployment</span>
                  <span className="text-primary font-medium">Active Configuration</span>
                </div>
              </div>

              {/* Quantified Outcome & Stat Card */}
              <div className="lg:col-span-5 h-full min-h-[300px] sm:min-h-[340px] flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-neutral-900 to-neutral-950 relative overflow-hidden shadow-2xl">
                {/* Internal Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-[11px] font-mono font-bold uppercase tracking-wider text-primary-200 mb-6">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Measured Impact</span>
                  </div>

                  <div className="text-5xl sm:text-6xl md:text-7xl font-black font-mono text-primary tracking-tight mb-4">
                    {activeTab.statValue}
                  </div>

                  <p className="text-base sm:text-lg font-medium text-neutral-200 max-w-sm mx-auto leading-relaxed [text-wrap:pretty]">
                    {activeTab.statDescription}
                  </p>

                  <div className="mt-8 pt-4 border-t border-primary/20 text-xs text-neutral-400 font-mono">
                    Validated by Najhum Engineering
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
