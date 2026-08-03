"use client";

import { useState, useEffect, useRef } from "react";

export default function Hero() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
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
            videoEl.play().catch(() => {});
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

  const analyticsMetrics = [
    {
      value: "2017",
      label: "ESTABLISHED",
      valueColor: "text-white",
    },
    {
      value: "02",
      label: "TECHNOLOGY PLATFORMS",
      valueColor: "text-cyan-400",
    },
    {
      value: "100%",
      label: "HARDWARE AGNOSTIC",
      valueColor: "text-white",
    },
    {
      value: "24/7",
      label: "REAL-TIME INTELLIGENCE",
      valueColor: "text-cyan-400",
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
    {
      name: "Siemens",
      render: () => (
        <span className="text-xl sm:text-2xl font-extrabold tracking-widest text-neutral-800 uppercase">
          SIEMENS
        </span>
      ),
    },
    {
      name: "ABB",
      render: () => (
        <span className="text-2xl sm:text-3xl font-black tracking-tighter text-neutral-800">
          ABB
        </span>
      ),
    },
    {
      name: "Schneider Electric",
      render: () => (
        <div className="flex items-center gap-2 text-neutral-800">
          <svg className="w-5 h-5 text-neutral-800" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5 16 5 22C11 20 18 16 19 8H17Z" />
          </svg>
          <span className="text-lg sm:text-xl font-bold tracking-tight">
            Schneider Electric
          </span>
        </div>
      ),
    },
  ];

  const duplicatedLogos = [...enterpriseLogos, ...enterpriseLogos];

  return (
    <section
      id="hero"
      className="w-full min-h-screen bg-[#F8F8F8] px-4 sm:px-6 md:px-8 pt-20 sm:pt-19 pb-12 flex flex-col"
    >
      <div className="relative w-full h-[94vh] sm:h-[98vh] rounded-3xl overflow-hidden bg-najhum-black flex flex-col justify-between text-white shadow-2xl shrink-0">
      {/* Dynamic Switching Video Background with Smooth Crossfade Transition */}
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
            activeVideoIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <source src={video.src} type={video.type} />
          <source src={video.src} type="video/mp4" />
        </video>
      ))}

      {/* High-Contrast Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent z-10 pointer-events-none" />

      {/* Left Side Vertical Video Indicators & Scroll Badge */}
      <div className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveVideoIndex(index)}
              aria-label={`Switch to video ${index + 1}`}
              className={`w-1 rounded-full transition-all duration-700 cursor-pointer ${
                activeVideoIndex === index
                  ? "h-28 bg-white shadow-[0_0_16px_rgba(255,255,255,0.9)]"
                  : "h-16 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 mt-8 text-white/50">
          <span
            className="text-[10px] tracking-[0.3em] font-mono uppercase"
            style={{ writingMode: "vertical-lr" }}
          >
            SCROLL
          </span>
          <span className="text-white text-xs">&darr;</span>
        </div>
      </div>

      {/* Left-Aligned Hero Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-20 lg:px-28 flex flex-col justify-center flex-1 my-auto py-4 sm:py-6">
        <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-[0.25em] text-white/70 uppercase">
          INNOVATION &bull; IoT &bull; AI &bull; SUSTAINABILITY
        </div>

        <h1 className="mt-3 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-tight">
          <span className="block text-white">Turning Complex</span>
          <span className="block text-white">Infrastructure Into</span>
          <span className="block bg-gradient-to-r from-najhum-blue via-cyan-400 to-blue-300 bg-clip-text text-transparent">
            Intelligent Operations
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-neutral-300 max-w-xl font-light leading-relaxed">
          Najhum Technologies empowers businesses with intelligent IoT platforms, EV charging management, and energy solutions that simplify operations, reduce costs, and accelerate sustainable growth.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-xs sm:text-sm font-bold tracking-wider text-najhum-black shadow-lg transition-transform hover:scale-105 uppercase cursor-pointer">
            <span>EXPLORE SOLUTIONS</span>
            <span className="text-sm font-black">&rarr;</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/10 uppercase cursor-pointer">
            <span className="text-sm font-black">&#9658;</span> WATCH COMPANY PROFILE
          </button>
        </div>
      </div>

      {/* Bottom Horizontal Analytics & Metric Strip (Mapped Array) */}
      <div className="relative z-20 w-full border-t border-white/10 bg-black/60 backdrop-blur-md px-4 sm:px-10 py-3 sm:py-3.5">
        <div className="mx-auto flex max-w-7xl flex-nowrap items-center justify-between gap-2 sm:gap-6 text-white/85 overflow-x-auto">
          {analyticsMetrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-2 sm:gap-6 whitespace-nowrap">
              <div className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer hover:text-white transition-colors">
                <span className={`text-sm sm:text-base md:text-lg font-medium tracking-normal ${metric.valueColor}`}>
                  {metric.value}
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.15em] text-white/70 group-hover:text-white transition-colors uppercase">
                  {metric.label}
                </span>
              </div>
              {index < analyticsMetrics.length - 1 && (
                <div className="h-5 sm:h-6 w-[1px] bg-white/15 flex-shrink-0 ml-2 sm:ml-4" />
              )}
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Trusted by Leading Enterprises Auto-Loop Logo Marquee (Part of Hero Section) */}
      <div className="w-full mt-14 sm:mt-20 flex flex-col items-center justify-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-najhum-black">
            Trusted by Leading Enterprises
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-neutral-500 max-w-2xl mx-auto font-normal leading-relaxed">
            We work with some of the world&apos;s most recognized companies. Here are just a few who trust us with their Data &amp; AI transformation.
          </p>
        </div>

        {/* Auto-Loop Slide Marquee Container with Blueprint Grid Border & Intersection Dots (Reduced Width + Both-End Fade) */}
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
