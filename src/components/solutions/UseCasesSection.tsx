"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { UseCasesContent, UseCaseTab } from '@/types/section';

export default function UseCasesSection({ content }: { content: UseCasesContent }) {
  const [activeTabId, setActiveTabId] = useState(content.tabs[0]?.id);

  const activeTab = content.tabs.find(t => t.id === activeTabId) || content.tabs[0];

  return (
    <section className="relative w-full py-24 bg-zinc-50 text-zinc-900 overflow-hidden font-sans border-b border-zinc-200">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
            {content.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight text-zinc-900 mb-10">
            {content.heading.split(' ').map((word, i, arr) => 
              i === arr.length - 1 ? <span key={i} className="text-primary">{word}</span> : word + ' '
            )}
          </h2>
          
          {/* Tabs Navigation */}
          <div className="flex flex-wrap gap-3">
            {content.tabs.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`px-6 py-3 text-sm font-bold rounded-full transition-all duration-300 shadow-sm ${
                    isActive 
                      ? 'bg-primary text-white shadow-primary/25 -translate-y-0.5' 
                      : 'bg-white text-zinc-500 border border-zinc-200 hover:border-primary/30 hover:text-primary hover:bg-zinc-50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="pt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Solution Box */}
                <div className="bg-white border border-zinc-100 shadow-xl shadow-zinc-200/50 rounded-3xl p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none transition-transform duration-500 group-hover:scale-110" />
                  
                  <p className="text-xs font-black tracking-widest text-primary uppercase mb-6 relative z-10">
                    SOLUTION
                  </p>
                  <p className="text-lg font-bold text-zinc-800 mb-8 leading-relaxed relative z-10">
                    {activeTab.solutionDetails}
                  </p>
                  
                  <ul className="space-y-3">
                    {activeTab.bullets.slice(0, 4).map((bullet, idx) => (
                      <li key={idx} className="text-sm font-medium text-zinc-600 flex items-start gap-4">
                        <span className="w-5 h-5 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stat Box */}
                <div className="bg-primary/5 border border-primary/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                  {/* Subtle animated grid background inside stat box */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,136,248,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,136,248,0.05)_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="text-6xl md:text-7xl font-black text-primary mb-6 relative z-10 tracking-tight">
                    {activeTab.statValue}
                  </div>
                  <p className="text-base md:text-lg font-bold text-zinc-700 max-w-sm mx-auto relative z-10">
                    {activeTab.statDescription}
                  </p>
                </div>
              </div>

              {/* Bottom Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {activeTab.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(26,136,248,0.6)]" />
                    <span className="text-sm font-bold text-zinc-700">{bullet}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
