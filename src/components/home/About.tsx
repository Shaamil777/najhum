"use client";

import { useState } from "react";

export default function About() {
  const [activeStage, setActiveStage] = useState<number | null>(4); // Default highlight on Stage 05 (Decisions)

  const architectureStages = [
  {
    id: 0,
    stage: "01",
    title: "CONNECTED ASSETS",
    subtitle: "Industrial Equipment, EV Chargers & Energy Infrastructure",
    protocol: "HARDWARE LAYER",
    tags: ["Industrial Equipment", "EV Chargers", "Energy Infrastructure"],
    accent:
      "border-neutral-200/90 bg-white lg:hover:border-najhum-blue shadow-sm lg:hover:shadow-xl",
    textAccent: "text-najhum-blue",
  },
  {
    id: 1,
    stage: "02",
    title: "INTELLIGENT SENSING",
    subtitle: "Environmental Monitoring, Asset Tracking & Operational Data",
    protocol: "SENSOR LAYER",
    tags: ["Temperature", "Humidity", "Energy"],
    accent:
      "border-neutral-200/90 bg-white lg:hover:border-najhum-blue shadow-sm lg:hover:shadow-xl",
    textAccent: "text-najhum-blue",
  },
  {
    id: 2,
    stage: "03",
    title: "SECURE CONNECTIVITY",
    subtitle: "MQTT, LoRaWAN, Cellular, Fiber & BLE",
    protocol: "CONNECTIVITY",
    tags: ["MQTT", "LoRaWAN", "Cellular"],
    accent:
      "border-neutral-200/90 bg-white lg:hover:border-najhum-blue shadow-sm lg:hover:shadow-xl",
    textAccent: "text-najhum-blue",
  },
  {
    id: 3,
    stage: "04",
    title: "CLOUD INTELLIGENCE",
    subtitle: "Real-Time Dashboards, Automated Alerts & Predictive Analytics",
    protocol: "CLOUD PLATFORM",
    tags: ["Dashboards", "Alerts", "Analytics"],
    accent:
      "border-neutral-200/90 bg-white lg:hover:border-najhum-blue shadow-sm lg:hover:shadow-xl",
    textAccent: "text-najhum-blue",
  },
  {
    id: 4,
    stage: "05",
    title: "ACTIONABLE INSIGHTS",
    subtitle: "Optimize Operations, Reduce Costs & Improve Sustainability",
    protocol: "OPERATIONAL INTELLIGENCE",
    tags: ["Automation", "AI Insights", "ESG"],
    accent:
      "border-najhum-black bg-najhum-black text-white shadow-2xl scale-[1.02]",
    textAccent: "text-white",
  },
];

  // Staggered row starting offsets (in 32px grid rows) for each vertical column to create an organic, randomized architectural waterfall feel at the top
  const colOffsets = [
    3, 1, 4, 2, 6, 1, 5, 2, 7, 3, 1, 4, 2, 8, 3, 5, 1, 6, 2, 4,
    1, 7, 3, 2, 5, 1, 4, 6, 2, 8, 3, 1, 5, 2, 7, 4, 1, 6, 3, 2,
    5, 1, 4, 2, 7, 3, 6, 1, 5, 2, 4, 8, 3, 1, 6, 2, 5, 4, 1, 7,
  ];

  // Staggered row ending offsets (in 32px grid rows) for each vertical column to create a matching randomized architectural skyline at the bottom
  const endOffsets = [
    2, 5, 1, 6, 3, 7, 2, 4, 1, 5, 8, 2, 6, 1, 4, 3, 7, 2, 5, 1,
    6, 3, 8, 2, 4, 7, 1, 5, 3, 2, 6, 4, 1, 8, 3, 5, 2, 7, 1, 4,
    6, 2, 5, 3, 1, 8, 4, 2, 7, 3, 6, 1, 5, 2, 4, 7, 3, 6, 2, 5,
  ];

  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-white text-najhum-black py-14 sm:py-20 lg:py-20 xl:py-24 2xl:py-32 px-4 sm:px-8 lg:px-12 xl:px-20 2xl:px-24 overflow-hidden"
    >
      {/* Staggered Architectural Blueprint Grid — Columns start and end at varying row offsets for a dynamic, randomized engineering feel */}
      <div className="absolute inset-0 flex w-full h-full overflow-hidden pointer-events-none">
        {colOffsets.map((startRow, idx) => {
          const endRow = endOffsets[idx % endOffsets.length] || 2;
          return (
            <div
              key={idx}
              className="w-8 shrink-0 h-full border-r border-neutral-200/50 flex flex-col"
              style={{
                paddingTop: `${startRow * 32}px`,
                paddingBottom: `${endRow * 32}px`,
              }}
            >
              <div className="w-full flex-1 bg-[linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:100%_32px] border-t border-b border-neutral-200/60 relative flex flex-col justify-between">
                {/* Top Staggered Architectural Accent Square */}
                {startRow > 0 && (
                  <div
                    className={`w-full h-8 border-b border-neutral-200/50 ${
                      idx % 5 === 0
                        ? "bg-blue-50/60"
                        : idx % 3 === 0
                        ? "bg-neutral-100/70"
                        : "bg-transparent"
                    }`}
                  />
                )}
                {/* Bottom Staggered Architectural Accent Square */}
                {endRow > 0 && (
                  <div
                    className={`w-full h-8 border-t border-neutral-200/50 mt-auto ${
                      idx % 4 === 0
                        ? "bg-blue-50/60"
                        : idx % 2 === 0
                        ? "bg-neutral-100/70"
                        : "bg-transparent"
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute top-1/4 left-0 -translate-y-1/2 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Two-Part About Grid Container */}
      <div className="relative z-10 max-w-[1440px] 2xl:max-w-[1536px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-20 2xl:gap-28 items-center">
        {/* =====================================================================================
            LEFT PART — WHO WE ARE & CORE IIoT CAPABILITIES (Matches Image 1 exactly on White BG)
           ===================================================================================== */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          {/* WHO WE ARE & ESTABLISHED 2017 Badge Row */}
          <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-5">
            <span className="text-najhum-blue text-xs font-mono tracking-widest uppercase font-bold">
              WHO WE ARE
            </span>
            <span className="h-3 w-[1px] bg-neutral-300" />
            <span className="inline-flex items-center text-[10px] font-mono font-semibold tracking-widest uppercase text-neutral-600">
              <span className="w-1.5 h-1.5" />
              ESTABLISHED 2017
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bricolage font-black tracking-tight leading-[1.12] 2xl:leading-[1.08] text-najhum-black">
            Connecting Physical <br className="hidden sm:block" />
            <span className="text-najhum-blue">
              Infrastructure
            </span>{" "}
            <br />
            With Digital Intelligence
          </h2>

          <p className="mt-3 2xl:mt-5 text-xs sm:text-sm lg:text-sm xl:text-base 2xl:text-base text-neutral-600 font-normal leading-relaxed max-w-lg 2xl:max-w-xl">
            Najhum Technologies delivers Industrial IoT, EV charging management, and smart energy platforms that connect physical infrastructure with real-time operational intelligence.
          </p>

          {/* 3 Sleek Industrial Capability Strips: Compact 3-Column Bento on Mobile/Tablet (<lg), Full Horizontal Strips on Laptop/Desktop (>=lg) */}
          <div className="mt-6 sm:mt-8 2xl:mt-10 grid grid-cols-3 gap-2 sm:gap-3 lg:flex lg:flex-col lg:gap-3 2xl:gap-3.5">
            {/* Strip 1: REAL-TIME IoT */}
            <div className="group relative flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left gap-2 lg:gap-3.5 2xl:gap-4 p-2.5 sm:p-3.5 lg:p-4 2xl:p-5 rounded-xl 2xl:rounded-2xl border border-neutral-200/80 bg-white/70 lg:hover:bg-white lg:hover:border-najhum-blue lg:hover:shadow-[0_12px_35px_rgba(22,125,228,0.12)] lg:hover:translate-x-1.5 transition-all duration-300 cursor-default">
              {/* Vertical Accent Glow Bar (Desktop Only) */}
              <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 2xl:h-8 rounded-r-full bg-neutral-200 lg:group-hover:bg-najhum-blue lg:group-hover:h-11 2xl:lg:group-hover:h-12 lg:group-hover:w-1.5 transition-all duration-300" />

              {/* Icon Square */}
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 2xl:w-11 2xl:h-11 rounded-lg 2xl:rounded-xl bg-neutral-100 border border-neutral-200/80 text-neutral-600 shadow-xs shrink-0 lg:group-hover:bg-blue-50 lg:group-hover:text-najhum-blue lg:group-hover:border-blue-200 lg:group-hover:scale-110 transition-all duration-300 mx-auto lg:mx-0">
                {/* Wireless / IIoT Radar Icon ((•)) */}
                <svg
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 2xl:w-5 2xl:h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
                  <path d="M7.76 16.24a6 6 0 0 1 0-8.49" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
                </svg>
              </div>

              {/* Content Area */}
              <div className="flex-1 w-full lg:pr-1">
                <div className="flex items-center justify-center lg:justify-between w-full">
                  <h3 className="text-[10px] sm:text-xs lg:text-sm 2xl:text-base font-bricolage font-bold tracking-tight uppercase text-najhum-black lg:group-hover:text-najhum-blue transition-colors">
                    REAL-TIME IoT
                  </h3>
                  {/* Subtle Diagonal Arrow Circle Badge (Desktop Only) */}
                  <span className="hidden lg:flex w-6 h-6 2xl:w-7 2xl:h-7 rounded-full bg-neutral-100 items-center justify-center text-neutral-400 lg:group-hover:bg-najhum-blue lg:group-hover:text-white lg:group-hover:translate-x-0.5 lg:group-hover:-translate-y-0.5 transition-all duration-300">
                    <svg
                      className="w-3 h-3 2xl:w-3.5 2xl:h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </div>
                <p className="hidden lg:block mt-0.5 text-[11px] sm:text-xs 2xl:text-sm text-neutral-600 font-normal leading-snug">
                  Connect industrial assets through intelligent sensing, live monitoring, and centralized dashboards.
                </p>
              </div>
            </div>

            {/* Strip 2: SMART ENERGY */}
            <div className="group relative flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left gap-2 lg:gap-3.5 2xl:gap-4 p-2.5 sm:p-3.5 lg:p-4 2xl:p-5 rounded-xl 2xl:rounded-2xl border border-neutral-200/80 bg-white/70 lg:hover:bg-white lg:hover:border-emerald-500 lg:hover:shadow-[0_12px_35px_rgba(16,185,129,0.12)] lg:hover:translate-x-1.5 transition-all duration-300 cursor-default">
              {/* Vertical Accent Glow Bar (Desktop Only) */}
              <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 2xl:h-8 rounded-r-full bg-neutral-200 lg:group-hover:bg-emerald-500 lg:group-hover:h-11 2xl:lg:group-hover:h-12 lg:group-hover:w-1.5 transition-all duration-300" />

              {/* Icon Square */}
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 2xl:w-11 2xl:h-11 rounded-lg 2xl:rounded-xl bg-neutral-100 border border-neutral-200/80 text-neutral-600 shadow-xs shrink-0 lg:group-hover:bg-emerald-50 lg:group-hover:text-emerald-600 lg:group-hover:border-emerald-200 lg:group-hover:scale-110 transition-all duration-300 mx-auto lg:mx-0">
                {/* Lightning Bolt Icon */}
                <svg
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 2xl:w-5 2xl:h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>

              {/* Content Area */}
              <div className="flex-1 w-full lg:pr-1">
                <div className="flex items-center justify-center lg:justify-between w-full">
                  <h3 className="text-[10px] sm:text-xs lg:text-sm 2xl:text-base font-bricolage font-bold tracking-tight uppercase text-najhum-black lg:group-hover:text-emerald-600 transition-colors">
                    SMART ENERGY
                  </h3>
                  {/* Subtle Diagonal Arrow Circle Badge (Desktop Only) */}
                  <span className="hidden lg:flex w-6 h-6 2xl:w-7 2xl:h-7 rounded-full bg-neutral-100 items-center justify-center text-neutral-400 lg:group-hover:bg-emerald-600 lg:group-hover:text-white lg:group-hover:translate-x-0.5 lg:group-hover:-translate-y-0.5 transition-all duration-300">
                    <svg
                      className="w-3 h-3 2xl:w-3.5 2xl:h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </div>
                <p className="hidden lg:block mt-0.5 text-[11px] sm:text-xs 2xl:text-sm text-neutral-600 font-normal leading-snug">
                  Optimize energy consumption, monitor carbon emissions, and improve operational efficiency.
                </p>
              </div>
            </div>

            {/* Strip 3: CONNECTED OPERATIONS */}
            <div className="group relative flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left gap-2 lg:gap-3.5 2xl:gap-4 p-2.5 sm:p-3.5 lg:p-4 2xl:p-5 rounded-xl 2xl:rounded-2xl border border-neutral-200/80 bg-white/70 lg:hover:bg-white lg:hover:border-indigo-500 lg:hover:shadow-[0_12px_35px_rgba(99,102,241,0.12)] lg:hover:translate-x-1.5 transition-all duration-300 cursor-default">
              {/* Vertical Accent Glow Bar (Desktop Only) */}
              <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 2xl:h-8 rounded-r-full bg-neutral-200 lg:group-hover:bg-indigo-500 lg:group-hover:h-11 2xl:lg:group-hover:h-12 lg:group-hover:w-1.5 transition-all duration-300" />

              {/* Icon Square */}
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 2xl:w-11 2xl:h-11 rounded-lg 2xl:rounded-xl bg-neutral-100 border border-neutral-200/80 text-neutral-600 shadow-xs shrink-0 lg:group-hover:bg-indigo-50 lg:group-hover:text-indigo-600 lg:group-hover:border-indigo-200 lg:group-hover:scale-110 transition-all duration-300 mx-auto lg:mx-0">
                {/* Enterprise Automation / Gear Sparkle Icon */}
                <svg
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 2xl:w-5 2xl:h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>

              {/* Content Area */}
              <div className="flex-1 w-full lg:pr-1">
                <div className="flex items-center justify-center lg:justify-between w-full">
                  <h3 className="text-[10px] sm:text-xs lg:text-sm 2xl:text-base font-bricolage font-bold tracking-tight uppercase text-najhum-black lg:group-hover:text-indigo-600 transition-colors">
                    <span className="lg:hidden">CONNECTED OPS</span>
                    <span className="hidden lg:inline">CONNECTED OPERATIONS</span>
                  </h3>
                  {/* Subtle Diagonal Arrow Circle Badge (Desktop Only) */}
                  <span className="hidden lg:flex w-6 h-6 2xl:w-7 2xl:h-7 rounded-full bg-neutral-100 items-center justify-center text-neutral-400 lg:group-hover:bg-indigo-600 lg:group-hover:text-white lg:group-hover:translate-x-0.5 lg:group-hover:-translate-y-0.5 transition-all duration-300">
                    <svg
                      className="w-3 h-3 2xl:w-3.5 2xl:h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </div>
                <p className="hidden lg:block mt-0.5 text-[11px] sm:text-xs 2xl:text-sm text-neutral-600 font-normal leading-relaxed">
                  Manage assets, automate alerts, and unify operations through one platform.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================================
            RIGHT PART — COMPACT ZIG-ZAG ARCHITECTURAL FLOW WITH TILTED 1-TO-1 BLACK ARROWS
           ===================================================================================== */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="flex flex-col gap-1 sm:gap-1.5 w-full">
            {architectureStages.map((item, index) => {
              const isSelected = activeStage === item.id;
              const isFinalStage = index === architectureStages.length - 1;
              // Zig-zag alignment: Even index (0, 2, 4) left aligned; Odd index (1, 3) right aligned
              const isLeftAligned = index % 2 === 0;

              return (
                <div key={item.id} className="w-full flex flex-col">
                  {/* Compact Step Box in Zig-Zag Position */}
                  <div
                    className={`w-full sm:w-[82%] md:w-[76%] lg:w-[80%] xl:w-[75%] 2xl:w-[78%] ${
                      isLeftAligned ? "self-start" : "self-end"
                    }`}
                  >
                    <div
                      onClick={() => setActiveStage(item.id)}
                      onMouseEnter={() => setActiveStage(item.id)}
                      className={`w-full p-3 sm:p-3.5 lg:p-3.5 2xl:p-4 border rounded-xl transition-all duration-300 cursor-pointer select-none relative overflow-hidden ${
                        item.id === 4
                          ? "border-najhum-black bg-najhum-black text-white shadow-xl z-20"
                          : isSelected
                          ? "border-najhum-blue bg-white shadow-md -translate-y-0.5 z-20"
                          : "border-neutral-200 bg-white/90 lg:hover:bg-white lg:hover:border-neutral-300 shadow-sm lg:hover:shadow opacity-95 lg:hover:opacity-100"
                      }`}
                    >
                      {/* Top Header Row: Compact Stage Number + Protocol Label */}
                      <div className="flex items-center justify-between gap-2 mb-1 2xl:mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`inline-flex items-center justify-center w-4.5 h-4.5 2xl:w-5 2xl:h-5 rounded text-[10px] 2xl:text-[11px] font-mono font-bold ${
                              item.id === 4
                                ? "bg-white text-najhum-black"
                                : "bg-neutral-900 text-white"
                            }`}
                          >
                            {item.stage}
                          </span>
                          <span
                            className={`text-[9px] 2xl:text-[10px] font-mono tracking-widest uppercase font-semibold ${
                              item.id === 4 ? "text-neutral-300" : "text-neutral-400"
                            }`}
                          >
                            {item.protocol}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4
                        className={`text-xs sm:text-sm lg:text-sm 2xl:text-base font-bricolage font-bold tracking-tight uppercase ${
                          item.id === 4 ? "text-white" : "text-najhum-black"
                        }`}
                      >
                        {item.title}
                      </h4>

                      {/* Subtitle / Description */}
                      <p
                        className={`mt-0.5 text-[10px] sm:text-[11px] 2xl:text-xs font-normal leading-snug ${
                          item.id === 4 ? "text-neutral-300" : "text-neutral-600"
                        }`}
                      >
                        {item.subtitle}
                      </p>

                      {/* Tech Pill Tags */}
                      <div className="mt-1.5 2xl:mt-2.5 flex flex-wrap items-center gap-1">
                        {item.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className={`px-1.5 2xl:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] 2xl:text-[9.5px] font-mono font-medium tracking-wider uppercase border ${
                              item.id === 4
                                ? "border-neutral-700 bg-neutral-800/80 text-neutral-300"
                                : "border-neutral-200 bg-neutral-50 text-neutral-600"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Slim, Tilted Black 1-to-1 Arrow Connecting Steps */}
                  {!isFinalStage && (
                    <div
                      className={`my-0.5 sm:my-1 2xl:my-1.5 flex items-center justify-center text-najhum-black transition-transform duration-300 ${
                        isLeftAligned ? "sm:-rotate-[22deg]" : "sm:rotate-[22deg]"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6 stroke-[1.5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="4" x2="12" y2="18" />
                        <polyline points="7 13 12 18 17 13" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
