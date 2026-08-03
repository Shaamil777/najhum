"use client";

import { useState, useEffect, useRef } from "react";

export default function Hero() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [hoveredGridId, setHoveredGridId] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const videos = [
    {
      src: "/hero-bg-video.mp4",
      type: "video/mp4",
    },
    {
      src: "/hero-bg-video2.mp4",
      type: "video/mp4",
    },
  ];

  // Video playback loop
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    videos.forEach((_, idx) => {
      const videoEl = videoRefs.current[idx];
      if (!videoEl) return;

      if (idx === activeVideoIndex) {
        videoEl.currentTime = 0;
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            videoEl.load();
            videoEl.play().catch(() => { });
          });
        }
      } else {
        const timer = setTimeout(() => {
          if (videoEl) {
            videoEl.pause();
            videoEl.currentTime = 0;
          }
        }, 1200);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [activeVideoIndex]);

  const handleVideoEnded = () => {
    setActiveVideoIndex((prev) => (prev + 1) % videos.length);
  };

  // Decorative blueprint filler cells removed so there are ZERO gaps and ZERO empty grid slots
  const decorativeCells: Array<{ id: string; spanClass: string; tag: string; symbol: string }> = [];

  // 4 High-Tech Engineering Image Cells with Unsplash photos, placed in strategic non-overlapping grid slots
  const imageGridCells = [
    {
      id: "img-1",
      spanClass: "col-span-1 sm:col-span-1 md:col-span-1 lg:col-start-1 lg:col-span-4 lg:row-start-3 lg:row-span-1",
      tag: "SYS // 01-RADAR",
      title: "IoT SATELLITE RADAR",
      badge: "LIVE FEED",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      borderHover: "hover:border-cyan-400 hover:shadow-[0_0_50px_rgba(34,211,238,0.45)]",
      accentColor: "text-cyan-400",
      badgeBg: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
      subtitle: "ORBITAL ARRAY #08 // ACTIVE TELEMETRY",
      footerLeft: "RADAR SYNC",
      footerRight: "● 99.98% ACCURACY",
    },
    {
      id: "img-2",
      spanClass: "col-span-1 sm:col-span-1 md:col-span-1 lg:col-start-8 lg:col-span-2 lg:row-start-1 lg:row-span-1",
      tag: "SYS // 02-EV-NET",
      title: "EV CHARGING GRID",
      badge: "350 kW",
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
      borderHover: "hover:border-emerald-400 hover:shadow-[0_0_50px_rgba(16,185,129,0.45)]",
      accentColor: "text-emerald-400",
      badgeBg: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
      subtitle: "STATION #04 // 98% BATTERY BOOST",
      footerLeft: "OCPP 2.0.1",
      footerRight: "● ULTRA-FAST",
    },
    {
      id: "img-3",
      spanClass: "col-span-1 sm:col-span-1 md:col-span-1 lg:col-start-8 lg:col-span-2 lg:row-start-4 lg:row-span-1",
      tag: "SYS // 03-NEURAL",
      title: "AI SILICON CORE",
      badge: "128 TFLOPS",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      borderHover: "hover:border-purple-400 hover:shadow-[0_0_50px_rgba(168,85,247,0.45)]",
      accentColor: "text-purple-400",
      badgeBg: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
      subtitle: "TENSOR V4 // 0.12ms INFERENCE",
      footerLeft: "EDGE INFERENCE",
      footerRight: "● ZERO LATENCY",
    },
    {
      id: "img-4",
      spanClass: "col-span-1 sm:col-span-1 md:col-span-1 lg:col-start-11 lg:col-span-2 lg:row-start-5 lg:row-span-2",
      tag: "SYS // 04-ENERGY",
      title: "SMART ENERGY GRID",
      badge: "WIND + SOLAR",
      imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
      borderHover: "hover:border-amber-400 hover:shadow-[0_0_50px_rgba(245,158,11,0.45)]",
      accentColor: "text-amber-400",
      badgeBg: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
      subtitle: "4,250 MWh GENERATED // 50.00 Hz",
      footerLeft: "CARBON OFFSET",
      footerRight: "● -4,250t CO₂",
    },
  ];

  // Architectural Bento Grid items scattered in random coordinates across left and right sides
  const gridCells = [
  {
    id: 1,
    type: "metric",
    spanClass:
      "col-span-1 sm:col-span-1 md:col-span-2 lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:row-span-2",
    tag: "01 // PLATFORM",
    metric: "IoTRICs",
    title: "INDUSTRIAL IoT",
    desc: "Cloud platform for real-time asset monitoring and operational intelligence.",
    badge: "IoT PLATFORM",
  },
  {
    id: 2,
    type: "metric",
    spanClass:
      "col-span-1 sm:col-span-1 md:col-span-1 lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:row-span-1",
    tag: "02 // ENERGY",
    metric: "IEMS",
    title: "SMART ENERGY",
    desc: "Integrated energy and carbon management for sustainable operations.",
    badge: "ENERGY",
  },
  {
    id: 3,
    type: "image",
    imageType: "mesh",
    spanClass:
      "col-span-1 sm:col-span-1 md:col-span-1 lg:col-start-5 lg:col-span-3 lg:row-start-2 lg:row-span-2",
    tag: "03 // CONNECTIVITY",
    title: "CONNECTED INFRASTRUCTURE",
    desc: "Unified connectivity across sensors, assets, and industrial systems.",
    badge: "IoT NETWORK",
  },
  {
    id: 4,
    type: "image",
    imageType: "telemetry",
    spanClass:
      "col-span-1 sm:col-span-1 md:col-span-1 lg:col-start-8 lg:col-span-3 lg:row-start-2 lg:row-span-2",
    tag: "04 // INSIGHTS",
    title: "REAL-TIME DASHBOARDS",
    desc: "Live monitoring, intelligent alerts, and operational analytics.",
    badge: "LIVE INSIGHTS",
  },
  {
    id: 5,
    type: "metric",
    spanClass:
      "col-span-1 sm:col-span-1 md:col-span-1 lg:col-start-5 lg:col-span-3 lg:row-start-1 lg:row-span-1",
    tag: "05 // MOBILITY",
    metric: "EVOLTICS",
    title: "EV CHARGING",
    desc: "Hardware-agnostic charging station management platform.",
    badge: "EV PLATFORM",
  },
  {
    id: 6,
    type: "metric",
    spanClass:
      "col-span-1 sm:col-span-1 md:col-span-1 lg:col-start-10 lg:col-span-3 lg:row-start-4 lg:row-span-1",
    tag: "06 // SUSTAINABILITY",
    metric: "ESG",
    title: "CARBON MANAGEMENT",
    desc: "Monitor carbon emissions, optimize energy, and support ESG compliance.",
    badge: "GREEN TECH",
  },
  {
    id: 7,
    type: "cta",
    ctaText: "BOOK TECHNICAL DEMO",
    spanClass:
      "col-span-1 sm:col-span-2 md:col-span-2 lg:col-start-8 lg:col-span-3 lg:row-start-5 lg:row-span-2",
    tag: "07 // ACTION",
    title: "READY TO TRANSFORM?",
    desc: "Book a personalized solution consultation with our experts.",
    badge: "GET STARTED",
  },
  {
    id: 8,
    type: "metric",
    spanClass:
      "col-span-1 sm:col-span-1 md:col-span-1 lg:col-start-11 lg:col-span-2 lg:row-start-2 lg:row-span-2",
    tag: "08 // CONNECTIVITY",
    metric: "OCPP",
    title: "HARDWARE AGNOSTIC",
    desc: "Manage OCPP-compliant charging networks from one unified platform.",
    badge: "COMPATIBLE",
  },

];


  const enterpriseLogos = [
    {
      name: "Trafigura",
      render: () => (
        <span className="text-xl sm:text-2xl font-light tracking-tight text-neutral-800">
          trafigura
        </span>
      ),
    },
    {
      name: "Schroders",
      render: () => (
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-800">
          Schroders
        </span>
      ),
    },
    {
      name: "Liberty Specialty Markets",
      render: () => (
        <div className="flex items-center gap-2 text-neutral-800">
          <svg className="w-6 h-6 text-neutral-700" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" />
          </svg>
          <div className="flex flex-col text-left leading-none">
            <span className="text-sm font-serif font-bold">Liberty</span>
            <span className="text-[9px] font-serif tracking-tight text-neutral-600">
              Specialty Markets
            </span>
          </div>
        </div>
      ),
    },
    {
      name: "pepsico",
      render: () => (
        <div className="flex items-center gap-2 text-neutral-800">
          <svg className="w-6 h-6 text-neutral-800" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M7 12C10 9 14 15 17 12" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-xl sm:text-2xl font-bold tracking-tight lowercase">
            pepsico
          </span>
        </div>
      ),
    },
    {
      name: "BURGER KING",
      render: () => (
        <div className="flex flex-col items-center justify-center border-2 border-neutral-800 rounded-full px-3 py-1 leading-none text-neutral-800">
          <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase">
            BURGER
          </span>
          <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase">
            KING
          </span>
        </div>
      ),
    },
    {
      name: "BlackRock",
      render: () => (
        <span className="text-xl sm:text-2xl font-black tracking-tight text-neutral-800">
          BlackRock
        </span>
      ),
    },
    {
      name: "Morgan Stanley",
      render: () => (
        <span className="text-lg sm:text-xl font-serif font-bold tracking-tight text-neutral-800">
          Morgan Stanley
        </span>
      ),
    },
  ];

  const duplicatedLogos = [...enterpriseLogos, ...enterpriseLogos];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative w-full bg-najhum-black text-white overflow-hidden">
      {/* 100% Full-Screen Video Background + Borderless Grid */}
      <div className="relative w-full min-h-screen md:h-screen overflow-hidden select-none">
        {/* Full-Screen Background Videos */}
        {videos.map((video, index) => (
          <video
            key={index}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            autoPlay={index === 0}
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              activeVideoIndex === index ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
          >
            <source src={video.src} type={video.type} />
            <source src={video.src} type="video/mp4" />
          </video>
        ))}

        {/* Crisp dark film overlay so video is bright & visible */}
        <div className="absolute inset-0 bg-black/15 z-0 pointer-events-none" />

        {/* Absolute Header Bar: Brand on Left, Technical Categories on FAR RIGHT */}
        <div className="absolute top-4 left-6 right-6 sm:top-5 sm:left-8 sm:right-8 lg:top-5 lg:left-10 lg:right-10 xl:left-14 xl:right-14 z-30 flex items-start justify-between pointer-events-none">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-white/75 pointer-events-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>NAJHUM &bull; REAL-TIME ARCHITECTURE</span>
          </div>

          <div className="flex flex-col items-end text-right pointer-events-auto">
            <div className="text-[9px] sm:text-[10px] lg:text-[11px] font-mono tracking-[0.18em] text-white/80 uppercase">
              INDUSTRIAL IoT &bull; EV PLATFORMS &bull; SMART ENERGY &bull; AI
            </div>
            <div className="mt-0.5 text-[8px] sm:text-[9px] lg:text-[10px] font-mono tracking-[0.15em] text-white/45 uppercase">
              Industry &bull; Mobility &bull; Energy &bull; Agriculture
            </div>
          </div>
        </div>

        {/* =====================================================================================
            1. MOBILE, IPAD & TABLET HERO LAYOUT (< lg: under 1024px)
            No scattered Bento/Image grids — Clean Title, Description & CTAs with matching Analytics below
           ===================================================================================== */}
        <div className="relative z-10 w-full block lg:hidden pt-24 pb-16 px-5 sm:px-8">
          {/* Main Title, Description & CTAs Box */}
          <div className="w-full  bg-najhum-black/30  p-6 sm:p-10 relative overflow-hidden">
            {/* Subtle architectural grid pattern background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-cyan-400 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>01 // ARCHITECTURE &bull; IOT &amp; AI</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bricolage font-black tracking-tight uppercase leading-none">
                <span className="block text-white">Powering Intelligent</span>
                <span className="block bg-gradient-to-r from-najhum-blue via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                  Infrastructure
                </span>
              </h1>

              <p className="mt-3.5 text-sm sm:text-base text-neutral-300 max-w-xl font-light leading-relaxed">
                Najhum Technologies empowers businesses with intelligent IoT platforms, EV charging management, and energy solutions that simplify operations, reduce costs, and accelerate sustainable growth.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => scrollToSection("process")}
                  className="flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider text-najhum-black shadow-lg transition-transform active:scale-95 uppercase cursor-pointer"
                >
                  <span>EXPLORE SOLUTIONS</span>
                  <span className="text-xs sm:text-sm font-black">&rarr;</span>
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wider text-white backdrop-blur-md transition-all active:scale-95 uppercase cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-black">&#9658;</span> WATCH COMPANY PROFILE
                </button>
              </div>
            </div>
          </div>

          {/* Analytics & Live Systems Section Below Title/CTA */}
          <div className="mt-10 w-full">
            <div className="flex items-center justify-between pb-3 border-b border-white/20 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/90">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>TELEMETRY // LIVE SYSTEM ANALYTICS &amp; MODULES</span>
              </div>
              <span className="text-[10px] font-mono text-white/50 hidden sm:inline">100% ONLINE</span>
            </div>

            {/* Matching 2-col / 3-col Analytics Grid (White Architectural Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 border border-neutral-200/40">
              {[
                {
                  id: "m-iot",
                  badge: "01 // PLATFORM",
                  metric: "IoTRICs",
                  title: "INDUSTRIAL IoT",
                  desc: "Cloud platform for real-time asset monitoring, telemetry & predictive maintenance.",
                  accent: "text-najhum-blue",
                },
                {
                  id: "m-energy",
                  badge: "02 // ENERGY",
                  metric: "IEMS",
                  title: "SMART ENERGY",
                  desc: "Integrated energy & carbon management for factories and commercial facilities.",
                  accent: "text-emerald-600",
                },
                {
                  id: "m-ev",
                  badge: "03 // MOBILITY",
                  metric: "EVOLTICS",
                  title: "EV CHARGING",
                  desc: "Hardware-agnostic charging platform for fleet operators & public infrastructure.",
                  accent: "text-blue-600",
                },
                {
                  id: "m-esg",
                  badge: "04 // SUSTAINABILITY",
                  metric: "ESG",
                  title: "CARBON MANAGEMENT",
                  desc: "Monitor emissions, track sustainability KPIs & automate ESG compliance.",
                  accent: "text-teal-600",
                },
                {
                  id: "m-telemetry",
                  badge: "05 // CONNECTIVITY",
                  metric: "99.98%",
                  title: "REAL-TIME DASHBOARDS",
                  desc: "Live system telemetry, instant alert routing & automated operational workflows.",
                  accent: "text-cyan-600",
                },
                {
                  id: "m-ocpp",
                  badge: "06 // PROTOCOL",
                  metric: "OCPP 2.0.1",
                  title: "HARDWARE AGNOSTIC",
                  desc: "Seamless compatibility across diverse charger hardware & industrial sensor vendors.",
                  accent: "text-indigo-600",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="border border-neutral-200 -ml-px -mt-px p-5 sm:p-6 bg-white text-najhum-black shadow-lg transition-all hover:scale-[1.01] hover:z-20 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-500 mb-3">
                    <span>{item.badge}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-najhum-black/30" />
                  </div>
                  <div>
                    <div className={`text-2xl sm:text-3xl font-black tracking-tight font-bricolage ${item.accent}`}>
                      {item.metric}
                    </div>
                    <div className="mt-1 text-xs font-mono font-bold uppercase tracking-wider text-najhum-black">
                      {item.title}
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-neutral-600 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================================================
            2. DESKTOP & MACBOOK COMMAND CENTER GRID (lg: 1024px+ only)
            Seamless 12x6 zero-gap grid with interactive hover illumination
           ===================================================================================== */}
        <div className="relative z-10 w-full hidden lg:grid lg:h-screen lg:grid-cols-12 lg:grid-rows-6 gap-0 pt-16 pb-4 px-10 xl:px-14">
          {/* Main Title, Description & CTAs Block — Bordered Grid Cell with subtle blueprint grid */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-start-1 lg:col-span-7 lg:row-start-4 lg:row-span-3 flex flex-col justify-center p-6 sm:p-7 lg:p-8 xl:p-10 2xl:p-12 border border-white/25 -ml-px -mt-px rounded-none relative overflow-hidden z-20">
            {/* Subtle architectural grid pattern background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bricolage font-black tracking-tight uppercase leading-none">
                <span className="block text-white">Powering Intelligent</span>
                <span className="block bg-gradient-to-r from-najhum-blue via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                  Infrastructure
                </span>
              </h1>

              <p className="mt-3 lg:mt-3.5 xl:mt-4 text-xs sm:text-sm lg:text-sm xl:text-base 2xl:text-lg text-neutral-300 max-w-xl font-light leading-relaxed line-clamp-2">
                Najhum Technologies empowers businesses with intelligent IoT platforms, EV charging management, and energy solutions that simplify operations, reduce costs, and accelerate sustainable growth.
              </p>

              <div className="mt-5 lg:mt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToSection("process");
                  }}
                  className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-xs sm:text-sm font-bold tracking-wider text-najhum-black shadow-lg transition-transform hover:scale-105 uppercase cursor-pointer"
                >
                  <span>EXPLORE SOLUTIONS</span>
                  <span className="text-xs sm:text-sm font-black">&rarr;</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToSection("about");
                  }}
                  className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/10 uppercase cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-black">&#9658;</span> WATCH COMPANY PROFILE
                </button>
              </div>
            </div>
          </div>

          {/* 4 High-Tech Engineering Image Cells — Transparent by default, pure Unsplash photo revealed on hover without any data/text */}
          {imageGridCells.map((img) => (
            <div
              key={img.id}
              className={`${img.spanClass} group relative border border-white/25 -ml-px -mt-px rounded-none overflow-hidden transition-all duration-500 ease-out cursor-pointer select-none bg-transparent hover:scale-[1.01] hover:border-white hover:shadow-[0_0_50px_rgba(255,255,255,0.45)] hover:z-30 ${img.borderHover}`}
            >
              {/* Unsplash Image: 100% visible on mobile/tablet (<lg), 0% by default on desktop (lg:opacity-0), revealing 100% on hover */}
              <img
                src={img.imageUrl}
                alt={img.title}
                className="absolute inset-0 w-full h-full object-cover opacity-100 lg:opacity-0 lg:group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            </div>
          ))}

          {/* Bento Cards: Scattered across Left & Right in Random Spaces */}
          {gridCells.map((cell) => {
            const isHovered = hoveredGridId === cell.id;

            return (
              <div
                key={cell.id}
                onMouseEnter={() => setHoveredGridId(cell.id)}
                onMouseLeave={() => setHoveredGridId(null)}
                className={`${cell.spanClass} border border-white/25 -ml-px -mt-px rounded-none p-3 sm:p-4 lg:p-4 xl:p-5 flex flex-col justify-between transition-all duration-500 ease-out cursor-pointer select-none ${
                  isHovered
                    ? "bg-white text-najhum-black shadow-[0_0_50px_rgba(255,255,255,0.45)] border-white scale-[1.01] z-20"
                    : "bg-transparent text-white hover:bg-white hover:text-najhum-black hover:border-white hover:shadow-[0_0_50px_rgba(255,255,255,0.45)] hover:scale-[1.01] hover:z-20"
                }`}
              >
                {/* Inner Container: Always visible on mobile/tablet (<lg), hidden on desktop until hovered */}
                <div
                  className={`flex flex-col justify-between h-full transition-opacity duration-500 ${
                    isHovered
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-100 lg:opacity-0 lg:hover:opacity-100 pointer-events-auto"
                  }`}
                >
                  {/* Top Header of Bento Box */}
                  <div className="flex items-center justify-between font-mono text-[9px] tracking-widest uppercase">
                    <span className="text-najhum-black/60 font-bold">
                      {cell.tag}
                    </span>
                    <span className="px-2 py-0.5 rounded-none text-[8px] font-extrabold uppercase bg-najhum-blue text-white">
                      {cell.badge}
                    </span>
                  </div>

                  {/* Metric Card Layout */}
                  {cell.type === "metric" && (
                    <div className="my-auto py-1">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                        {cell.metric}
                      </div>
                      <div className="mt-1 text-xs sm:text-sm font-mono tracking-[0.16em] uppercase text-najhum-blue font-bold">
                        {cell.title}
                      </div>
                    </div>
                  )}

                  {/* Image / SVG Visual Schematic Layout */}
                  {cell.type === "image" && (
                    <div className="my-auto flex flex-col items-center justify-center py-1.5 border-y border-najhum-black/10">
                      {cell.imageType === "mesh" ? (
                        <svg className="w-14 h-10 sm:w-16 sm:h-11" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="20" cy="30" r="5" fill="currentColor" className="animate-pulse" />
                          <circle cx="50" cy="15" r="4" fill="currentColor" />
                          <circle cx="50" cy="45" r="4" fill="currentColor" />
                          <circle cx="80" cy="30" r="5" fill="currentColor" className="animate-pulse" />
                          <line x1="20" y1="30" x2="50" y2="15" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                          <line x1="20" y1="30" x2="50" y2="45" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="50" y1="15" x2="80" y2="30" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="50" y1="45" x2="80" y2="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                          <line x1="50" y1="15" x2="50" y2="45" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      ) : (
                        <svg className="w-16 h-10 sm:w-20 sm:h-11" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="10" y="25" width="8" height="25" fill="currentColor" opacity="0.6" />
                          <rect x="25" y="15" width="8" height="35" fill="currentColor" />
                          <rect x="40" y="30" width="8" height="20" fill="currentColor" opacity="0.4" />
                          <rect x="55" y="10" width="8" height="40" fill="currentColor" className="animate-pulse" />
                          <rect x="70" y="20" width="8" height="30" fill="currentColor" opacity="0.8" />
                          <rect x="85" y="5" width="8" height="45" fill="currentColor" />
                          <rect x="100" y="18" width="8" height="32" fill="currentColor" opacity="0.5" />
                        </svg>
                      )}
                      <div className="mt-1 text-xs sm:text-sm font-mono tracking-[0.16em] uppercase text-najhum-blue font-bold">
                        {cell.title}
                      </div>
                    </div>
                  )}

                  {/* CTA Bento Block Layout */}
                  {cell.type === "cta" && (
                    <div className="my-auto py-1">
                      <div className="text-lg sm:text-xl font-black tracking-tight uppercase leading-tight">
                        {cell.title}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToSection("process");
                        }}
                        className="mt-3 flex items-center justify-between w-full px-3.5 py-2 rounded text-xs font-mono font-bold tracking-wider uppercase transition-transform hover:scale-105 bg-najhum-black text-white"
                      >
                        <span>{cell.ctaText || "EXPLORE"}</span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  )}

                  {/* Footer Description */}
                  <p className="text-[10px] sm:text-[11px] font-normal leading-snug line-clamp-2 text-neutral-500">
                    {cell.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trusted by Leading Enterprises Auto-Loop Logo Marquee below Hero */}
      <div className="w-full bg-[#F8F8F8] py-16 sm:py-20 text-najhum-black flex flex-col items-center justify-center overflow-hidden border-t border-neutral-200">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-najhum-black">
            Trusted by Leading Enterprises
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-neutral-500 max-w-2xl mx-auto font-normal leading-relaxed">
            We work with some of the world&apos;s most recognized companies. Here are just a few who trust us with their Data &amp; AI transformation.
          </p>
        </div>

        {/* Auto-Loop Slide Marquee Container with Blueprint Grid Border & Intersection Dots */}
        <div className="relative mt-8 sm:mt-10 w-full max-w-6xl mx-auto [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">
          {/* Top/Bottom Intersection Dots */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-najhum-black/60 z-20" />
          <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-najhum-black/60 z-20" />
          <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-najhum-black/60 z-20" />
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-najhum-black/60 z-20" />

          {/* Left and Right Fade Masks for a Smooth Cinematic Edge */}
          <div className="absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#F8F8F8] via-[#F8F8F8]/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#F8F8F8] via-[#F8F8F8]/60 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Marquee */}
          <div className="overflow-hidden py-6 sm:py-8">
            <div className="animate-marquee items-center">
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center px-10 sm:px-14 border-r border-neutral-200/80 group cursor-pointer transition-transform hover:scale-105"
                >
                  {/* Intersection Dots at Cell Corners */}
                  <div className="absolute -top-[25px] sm:-top-[33px] right-0 translate-x-1/2 w-1 h-1 rounded-full bg-neutral-400" />
                  <div className="absolute -bottom-[25px] sm:-bottom-[33px] right-0 translate-x-1/2 w-1 h-1 rounded-full bg-neutral-400" />

                  <div className="opacity-75 group-hover:opacity-100 transition-opacity">
                    {logo.render()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
