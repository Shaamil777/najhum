"use client";

import React, { useEffect, useRef, useState } from "react";
import { Radar, Wifi, BrainCircuit } from "lucide-react";

export default function AboutMethodology() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const phases = [
    {
      code: "PHASE_01",
      title: "COLLECT",
      tag: "Real-time Insight",
      tagDot: "bg-blue-500",
      description:
        "We deploy ruggedized sensors across your physical infrastructure to capture high-fidelity operational data at the source.",
      icon: Radar,
      titleColor: "text-blue-600",
      badgeBg: "bg-blue-600",
      ringBorder:
        "border-blue-200/80 bg-blue-50/50 group-hover:border-blue-400/90 group-hover:bg-blue-50/80 group-hover:shadow-[0_0_35px_rgba(59,130,246,0.18)]",
      iconBg:
        "bg-blue-100/70 border border-blue-200/70 group-hover:bg-blue-100 group-hover:border-blue-300",
      iconColor: "text-blue-600",
    },
    {
      code: "PHASE_02",
      title: "CONNECT",
      tag: "Secure Connectivity",
      tagDot: "bg-emerald-500",
      description:
        "Data is securely transmitted via NB-IoT, LoRaWAN, or 5G private networks to our central processing ecosystem.",
      icon: Wifi,
      titleColor: "text-emerald-500",
      badgeBg: "bg-emerald-500",
      ringBorder:
        "border-emerald-200/80 bg-emerald-50/50 group-hover:border-emerald-400/90 group-hover:bg-emerald-50/80 group-hover:shadow-[0_0_35px_rgba(16,185,129,0.18)]",
      iconBg:
        "bg-emerald-100/70 border border-emerald-200/70 group-hover:bg-emerald-100 group-hover:border-emerald-300",
      iconColor: "text-emerald-600",
    },
    {
      code: "PHASE_03",
      title: "COLLABORATE",
      tag: "Intelligent Outcomes",
      tagDot: "bg-violet-500",
      description:
        "Proprietary ML models convert raw signals into actionable boardroom intelligence and autonomous field responses.",
      icon: BrainCircuit,
      titleColor: "text-violet-600",
      badgeBg: "bg-violet-600",
      ringBorder:
        "border-violet-200/80 bg-violet-50/50 group-hover:border-violet-400/90 group-hover:bg-violet-50/80 group-hover:shadow-[0_0_35px_rgba(139,92,246,0.18)]",
      iconBg:
        "bg-violet-100/70 border border-violet-200/70 group-hover:bg-violet-100 group-hover:border-violet-300",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-[#f4f7fa] text-slate-900 overflow-hidden"
    >
      {/* ── Keyframe Animations for Flowing Data Line ── */}
      <style>{`
        @keyframes flowDashHorizontal {
          0% {
            stroke-dashoffset: 48;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes flowDashVertical {
          0% {
            stroke-dashoffset: 48;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-data-flow-h {
          animation: flowDashHorizontal 3s linear infinite;
        }
        .animate-data-flow-v {
          animation: flowDashVertical 3s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-data-flow-h,
          .animate-data-flow-v {
            animation: none !important;
          }
        }
      `}</style>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-slate-300" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-slate-400">
              The Methodology
            </span>
            <span className="h-px w-8 bg-slate-300" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-slate-900 leading-tight tracking-tight mb-5">
            HOW DATA BECOMES <span className="text-blue-600">DECISIONS</span>
          </h2>
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-bold tracking-widest uppercase">
            <span className="text-blue-600">Collect</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-500">Connect</span>
            <span className="text-slate-300">•</span>
            <span className="text-violet-600">Collaborate</span>
          </div>
        </div>

        {/* ── Phase Cards with Animated Flowing Connectors ── */}
        <div className="relative">
          {/* Desktop/Tablet Animated SVG Connector Line (Behind Circles) */}
          <div className="hidden lg:block absolute top-0 left-0 w-full h-[110px] pointer-events-none z-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 110"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient
                  id="methodologyFlowGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#10b981" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.75" />
                </linearGradient>
              </defs>

              {/* Gently curved flowing dashed path */}
              <path
                d="M 166.6 55 Q 333.3 42 500 55 T 833.3 55"
                stroke="url(#methodologyFlowGrad)"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="animate-data-flow-h transition-opacity duration-1000"
                style={{ opacity: isVisible ? 1 : 0 }}
              />

              {/* Intermediate data pulse nodes midway */}
              <circle
                cx="333.3"
                cy="48.5"
                r="4.5"
                fill="#3b82f6"
                className="animate-pulse"
              />
              <circle
                cx="333.3"
                cy="48.5"
                r="8"
                fill="#3b82f6"
                opacity="0.25"
              />

              <circle
                cx="666.6"
                cy="61.5"
                r="4.5"
                fill="#10b981"
                className="animate-pulse"
              />
              <circle
                cx="666.6"
                cy="61.5"
                r="8"
                fill="#10b981"
                opacity="0.25"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-12 relative z-10">
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              return (
                <div
                  key={idx}
                  className={`group relative flex flex-col items-center text-center transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${idx * 180}ms` }}
                >
                  {/* Animated Icon Ring with Interactive Hover */}
                  <div className="relative mb-8 cursor-pointer">
                    {/* Outer hover scale container */}
                    <div
                      tabIndex={0}
                      role="button"
                      aria-label={`${phase.title} phase`}
                      className={`w-[110px] h-[110px] rounded-full border ${phase.ringBorder} flex items-center justify-center relative transition-all duration-300 ease-out group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/50`}
                    >
                      {/* Inner icon circle */}
                      <div
                        className={`w-16 h-16 rounded-full ${phase.iconBg} flex items-center justify-center ${phase.iconColor} transition-all duration-300 group-hover:scale-105 shadow-xs`}
                      >
                        <Icon
                          className="w-7 h-7 transition-transform duration-300 group-hover:rotate-3"
                          strokeWidth={1.75}
                        />
                      </div>
                    </div>

                    {/* Step number badge */}
                    <div
                      className={`absolute -top-1 -right-1 w-7 h-7 rounded-full ${phase.badgeBg} flex items-center justify-center text-xs font-bold text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                    >
                      {idx + 1}
                    </div>
                  </div>

                  {/* Code */}
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">
                    {phase.code}
                  </span>

                  {/* Title */}
                  <h3
                    className={`text-2xl sm:text-3xl font-black font-display mb-3.5 tracking-tight transition-colors duration-300 ${phase.titleColor}`}
                  >
                    {phase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mx-auto mb-6">
                    {phase.description}
                  </p>

                  {/* Sub-tag pill */}
                  <div className="mt-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/70 shadow-xs text-[11px] sm:text-xs font-medium text-slate-700 transition-all duration-300 group-hover:border-slate-300 group-hover:shadow-sm">
                    <span
                      className={`w-2 h-2 rounded-full ${phase.tagDot}`}
                    />
                    <span>{phase.tag}</span>
                  </div>

                  {/* Mobile Vertical Flow Connector (between items on small screens) */}
                  {idx < phases.length - 1 && (
                    <div className="lg:hidden flex flex-col items-center my-6">
                      <svg
                        className="w-4 h-12"
                        viewBox="0 0 16 48"
                        fill="none"
                      >
                        <line
                          x1="8"
                          y1="0"
                          x2="8"
                          y2="48"
                          stroke={idx === 0 ? "#3b82f6" : "#10b981"}
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          className="animate-data-flow-v"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Footer Statement */}
        <div className="mt-20 md:mt-24 text-center">
          <div className="inline-flex items-center justify-center gap-4 max-w-full">
            <span className="h-px w-12 sm:w-20 bg-slate-300/80" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-slate-400 text-center">
              Technology For A More Resilient Tomorrow
            </span>
            <span className="h-px w-12 sm:w-20 bg-slate-300/80" />
          </div>
        </div>
      </div>
    </section>
  );
}
