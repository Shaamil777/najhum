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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const phases = [
    {
      code: "PHASE_01",
      title: "Collect",
      description:
        "We deploy ruggedized sensors across your physical infrastructure to capture high-fidelity operational data at the source.",
      icon: Radar,
      gradient: "from-blue-500 to-cyan-400",
      glowColor: "bg-blue-500/20",
      ringColor: "ring-blue-500/30",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      code: "PHASE_02",
      title: "Connect",
      description:
        "Data is securely transmitted via NB-IoT, LoRaWAN, or 5G private networks to our central processing ecosystem.",
      icon: Wifi,
      gradient: "from-primary to-emerald-400",
      glowColor: "bg-primary/20",
      ringColor: "ring-primary/30",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      code: "PHASE_03",
      title: "Decide",
      description:
        "Proprietary ML models convert raw signals into actionable boardroom intelligence and autonomous field responses.",
      icon: BrainCircuit,
      gradient: "from-violet-500 to-fuchsia-400",
      glowColor: "bg-violet-500/20",
      ringColor: "ring-violet-500/30",
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 bg-[#0a0a0f] text-white overflow-hidden"
    >
      {/* ── Animated Background Layers ── */}

      {/* Radial pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border border-white/[0.03] animate-[ping_4s_ease-in-out_infinite]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-white/[0.04]" />
      </div>

      {/* Diagonal scanlines */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0px, transparent 1px, transparent 8px, #fff 9px)",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-neutral-500 block mb-4">
            The Methodology
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-white leading-tight tracking-tight mb-6">
            How Data Becomes Decisions
          </h2>
          <div className="flex items-center justify-center gap-3 text-sm md:text-base font-bold tracking-widest uppercase text-neutral-400">
            <span className="text-blue-400">Collect</span>
            <span className="text-neutral-600">•</span>
            <span className="text-primary">Connect</span>
            <span className="text-neutral-600">•</span>
            <span className="text-violet-400">Decide</span>
          </div>
        </div>

        {/* ── Phase Cards with SVG Connectors ── */}
        <div className="relative">
          {/* SVG connector line (desktop only) */}
          <svg
            className="hidden lg:block absolute top-[88px] left-0 w-full h-8 z-0"
            preserveAspectRatio="none"
          >
            <line
              x1="16.6%"
              y1="50%"
              x2="83.4%"
              y2="50%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="8 4"
              className={`transition-all duration-[2s] ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#22c55e" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col items-center text-center transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${idx * 200}ms` }}
                >
                  {/* Animated Icon Ring */}
                  <div className="relative mb-10">
                    {/* Outer pulsing ring */}
                    <div
                      className={`absolute inset-0 w-[100px] h-[100px] rounded-full ${phase.glowColor} blur-xl opacity-60 animate-pulse pointer-events-none`}
                      style={{ animationDelay: `${idx * 400}ms` }}
                    />
                    {/* Middle ring */}
                    <div
                      className={`w-[100px] h-[100px] rounded-full ring-2 ${phase.ringColor} flex items-center justify-center relative`}
                    >
                      {/* Inner icon circle */}
                      <div
                        className={`w-16 h-16 rounded-full ${phase.iconBg} flex items-center justify-center ${phase.iconColor} backdrop-blur-sm`}
                      >
                        <Icon className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Step number badge */}
                    <div
                      className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${phase.gradient} flex items-center justify-center text-[11px] font-black text-white shadow-lg`}
                    >
                      {idx + 1}
                    </div>
                  </div>

                  {/* Code */}
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-3">
                    {phase.code}
                  </span>

                  {/* Title */}
                  <h3
                    className={`text-3xl font-black font-display mb-4 bg-gradient-to-r ${phase.gradient} bg-clip-text text-transparent`}
                  >
                    {phase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 leading-relaxed max-w-xs mx-auto">
                    {phase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

