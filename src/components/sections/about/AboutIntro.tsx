"use client";

import React, { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutIntro() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden">

      {/* ── Grid Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Finer sub-grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* ── Decorative Accent Lines ── */}
      <div className="absolute top-0 left-[10%] w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-neutral-200 to-transparent pointer-events-none" />
      <div className="absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none" />

      {/* ── Glow Blobs ── */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-48 -left-32 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">


        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left: Editorial Content */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-black font-display text-neutral-900 leading-[1.1] tracking-tight mb-8">
              An Uncompromising Approach to{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Industrial Data.</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/15 -z-0 rounded-sm" />
              </span>
            </h2>

            <p className="text-base md:text-lg text-neutral-500 leading-relaxed max-w-xl mb-10">
              Founded with a vision to redefine how industries interact with their
              operational environments, Najhum Group has evolved into a
              powerhouse of technical innovation. We believe that data is only as
              good as the infrastructure that captures it — and the intelligence that
              refines it.
            </p>

            {/* Ecosystem Flow Diagram */}
            <div className="flex flex-wrap items-center gap-3">
              {["SENSORS", "CONNECTIVITY", "CLOUD & ANALYTICS", "STRATEGIC DECISIONS"].map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="px-4 py-2 bg-neutral-900 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded-full">
                    {step}
                  </div>
                  {idx < 3 && (
                    <div className="w-6 h-px bg-neutral-300 hidden sm:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right: Stats Bento Grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">

              {/* Stat 1: Founded */}
              <div className="relative bg-neutral-950 text-white rounded-2xl p-6 overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/20 transition-colors" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">Founded</span>
                <span className="text-4xl md:text-5xl font-black font-display block mb-1">
                  <AnimatedCounter target={2017} />
                </span>
                <div className="w-8 h-1 bg-primary rounded-full mt-2" />
              </div>

              {/* Stat 2: Core Platforms */}
              <div className="relative bg-neutral-50 border border-neutral-100 rounded-2xl p-6 overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">Core Platforms</span>
                <span className="text-4xl md:text-5xl font-black font-display text-neutral-900 block mb-1">
                  <AnimatedCounter target={3} suffix="+" />
                </span>
                <div className="w-8 h-1 bg-primary rounded-full mt-2" />
              </div>

              {/* Stat 3: Global HQ */}
              <div className="relative bg-neutral-50 border border-neutral-100 rounded-2xl p-6 overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">Global HQ</span>
                <span className="text-4xl md:text-5xl font-black font-display text-neutral-900 block mb-1">Dubai</span>
                <div className="w-8 h-1 bg-blue-500 rounded-full mt-2" />
              </div>

              {/* Stat 4: IoT Expertise */}
              <div className="relative bg-neutral-950 text-white rounded-2xl p-6 overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-colors" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">IoT Expertise</span>
                <span className="text-3xl md:text-4xl font-black font-display block mb-1">Industrial</span>
                <div className="w-8 h-1 bg-emerald-500 rounded-full mt-2" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

