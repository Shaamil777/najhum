"use client";

import RichText, { AccentHeading } from './RichText';
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, BarChart2 } from "lucide-react";
import type { GraphSectionContent } from "@/types/section";

interface GraphSectionProps {
  content: GraphSectionContent;
}

export default function GraphSection({ content }: GraphSectionProps) {
  const {
    eyebrow,
    heading,
    description,
    chartType = "bar",
    primaryLabel = "Current Performance",
    secondaryLabel = "Target / Benchmark",
    dataPoints = [],
    metrics = [],
  } = content;

  if (!dataPoints || dataPoints.length === 0) return null;

  // Calculate highest value for relative percentage bar widths
  const maxValue = Math.max(
    ...dataPoints.map((dp) => Math.max(dp.value, dp.secondaryValue || 0)),
    10
  );

  return (
    <section className="relative w-full py-16 lg:py-24 bg-slate-50 border-y border-slate-200/80 overflow-hidden font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          {eyebrow && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase mb-3 border border-primary/20">
              <Activity className="w-3.5 h-3.5" />
              <span>{eyebrow}</span>
            </span>
          )}
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              <AccentHeading value={heading} />
            </h2>
          )}
          {description && (
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
              <RichText value={description} />
            </p>
          )}
        </div>

        {/* Top Metrics Cards (if any) */}
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <span className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-2">
                  {metric.title}
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {metric.value}
                  </span>
                  {metric.change && (
                    <span
                      className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                        metric.isPositive !== false
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {metric.isPositive !== false ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {metric.change}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Visual Chart Card */}
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm">
          
          {/* Chart Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <BarChart2 className="w-4 h-4 text-primary" />
              <span>Comparative Metrics Breakdown</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-primary" />
                <span className="text-slate-700">{primaryLabel}</span>
              </div>
              {dataPoints.some((dp) => dp.secondaryValue !== undefined) && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-slate-300" />
                  <span className="text-slate-500">{secondaryLabel}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="space-y-6">
            {dataPoints.map((dp, idx) => {
              const primaryPercent = Math.min(100, Math.round((dp.value / maxValue) * 100));
              const secondaryPercent = dp.secondaryValue
                ? Math.min(100, Math.round((dp.secondaryValue / maxValue) * 100))
                : null;

              return (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="font-bold text-slate-800 tracking-tight">{dp.label}</span>
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="font-bold text-primary">
                        {dp.value} {dp.unit || ""}
                      </span>
                      {dp.secondaryValue !== undefined && (
                        <span className="text-slate-400">
                          / {dp.secondaryValue} {dp.unit || ""}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative w-full h-4 sm:h-5 bg-slate-100 rounded-full overflow-hidden flex items-center">
                    {/* Primary Bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${primaryPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.08, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-primary-hover rounded-full relative z-10"
                    />

                    {/* Secondary Bar (Ghost/Target) */}
                    {secondaryPercent !== null && (
                      <div
                        style={{ width: `${secondaryPercent}%` }}
                        className="absolute left-0 top-0 bottom-0 bg-slate-200/90 rounded-full"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
