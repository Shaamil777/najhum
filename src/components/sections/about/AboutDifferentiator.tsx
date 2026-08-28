"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutDifferentiator() {
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

  const differentiators = [
    {
      code: "DIFFERENTIATOR_01",
      title: "Performance Driven",
      stat: "99.9%",
      statLabel: "Uptime",
      description:
        "Our systems are built for 99.9% uptime in the harshest industrial environments, from sub-zero logistics to desert smart cities.",
      image: "/images/performancce.png",
      accentColor: "text-blue-500",
      accentBg: "bg-blue-500",
      accentBorder: "border-blue-500/20",
      glowColor: "bg-blue-500/10",
    },
    {
      code: "DIFFERENTIATOR_02",
      title: "Hardware Agnostic",
      stat: "100+",
      statLabel: "Integrations",
      description:
        "We don't lock you into a single vendor. Our platforms integrate seamlessly with existing legacy systems and future-proof sensors.",
      image: "/images/hardware.png",
      accentColor: "text-primary",
      accentBg: "bg-primary",
      accentBorder: "border-primary/20",
      glowColor: "bg-primary/10",
    },
    {
      code: "DIFFERENTIATOR_03",
      title: "Operational Savings",
      stat: "22%",
      statLabel: "Cost Reduction",
      description:
        "On average, our clients see a 22% reduction in operational expenditure through predictive maintenance and energy optimization.",
      image: "/images/operational.png",
      accentColor: "text-amber-500",
      accentBg: "bg-amber-500",
      accentBorder: "border-amber-500/20",
      glowColor: "bg-amber-500/10",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Cards */}
        <div className="flex flex-col gap-20 md:gap-28">
          {differentiators.map((diff, idx) => {
            const isReversed = idx % 2 !== 0;

            return (
              <div
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {/* Image */}
                <div
                  className={`relative ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className={`relative rounded-3xl overflow-hidden border ${diff.accentBorder} bg-neutral-50 p-6 md:p-10 group`}>
                    {/* Glow behind image */}
                    <div
                      className={`absolute inset-0 ${diff.glowColor} opacity-40 blur-3xl pointer-events-none`}
                    />
                    <div className="relative z-10 aspect-[4/3] flex items-center justify-center">
                      <Image
                        src={diff.image}
                        alt={diff.title}
                        width={500}
                        height={375}
                        className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                  {/* Floating stat badge */}
                  <div
                    className={`absolute -bottom-5 ${
                      isReversed ? "-left-3 md:-left-5" : "-right-3 md:-right-5"
                    } bg-neutral-950 text-white rounded-2xl px-6 py-4 shadow-2xl z-20`}
                  >
                    <span className={`text-3xl md:text-4xl font-black ${diff.accentColor}`}>
                      {diff.stat}
                    </span>
                    <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 mt-1">
                      {diff.statLabel}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div
                  className={`${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >

                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-neutral-900 leading-tight tracking-tight mb-6">
                    {diff.title}
                  </h3>

                  <p className="text-base md:text-lg text-neutral-500 leading-relaxed max-w-lg">
                    {diff.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

