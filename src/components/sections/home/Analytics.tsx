"use client";

import React, { useRef } from "react";
import { homeContent } from "@/content/home";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

// Helper to wrap numbers infinitely
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxRow({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth the scroll velocity
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  // Map scroll velocity to a speed multiplier (e.g., scroll at 1000px/s -> 1.5x speed)
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1.5], {
    clamp: false
  });

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Change direction based on scroll direction
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // Apply the scroll-induced speed boost
    // We add the base movement plus the scroll-boosted movement
    moveBy += directionFactor.current * Math.abs(baseVelocity * (delta / 1000)) * velocityFactor.get();
    
    baseX.set(baseX.get() + moveBy);
  });

  // We duplicate the children 4 times to ensure it covers ultra-wide screens.
  // Each set takes up 25% of the total width. We wrap between -25% and 0%.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div className="overflow-hidden flex m-0 relative max-w-[100vw]">
      <motion.div className="flex whitespace-nowrap flex-nowrap w-max items-center" style={{ x }}>
        {/* Render 4 identical sets to seamlessly loop */}
        <div className="flex gap-6 pr-6">{children}</div>
        <div className="flex gap-6 pr-6">{children}</div>
        <div className="flex gap-6 pr-6">{children}</div>
        <div className="flex gap-6 pr-6">{children}</div>
      </motion.div>
    </div>
  );
}

// Reusable card for the analytics data
function AnalyticsCard({ data, label }: { data: any, label?: string }) {
  return (
    <div className="w-[260px] sm:w-[320px] min-h-[180px] flex-shrink-0 bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between group hover:border-zinc-300 transition-colors duration-300">
       <div className="flex flex-col gap-2 whitespace-normal">
         {label && (
           <span className="text-primary text-[10px] font-bold tracking-widest uppercase mb-1">
             {label}
           </span>
         )}
         <h3 className="text-lg font-semibold text-zinc-900 leading-tight font-poppins">{data.title}</h3>
         <p className="text-zinc-500 text-xs leading-relaxed">{data.description}</p>
       </div>
       <div className="mt-6 pt-3">
         <span className="text-4xl font-bold font-poppins tracking-tight text-zinc-400 line-clamp-1 break-all">{data.kpiValue}</span>
       </div>
    </div>
  );
}

export default function Analytics() {
  const { analytics } = homeContent;
  
  const trustSignals = analytics.trustSignals || [];
  const operationalIntelligence = analytics.operationalIntelligence || [];

  return (
    <section className="w-full bg-[#fffff] text-zinc-900 py-16 sm:py-24 lg:py-32 overflow-hidden relative font-poppins">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-80" />
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-20 px-6">
        <span className="text-sm font-semibold tracking-widest text-primary uppercase mb-4 flex items-center gap-4 before:h-px before:w-8 before:bg-blue-200 after:h-px after:w-8 after:bg-blue-200">
          {analytics.badge}
        </span>
        <h2 className="font-poppins normal-case text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-zinc-900 mb-6">
          {analytics.headline} <span className="text-primary">{analytics.headlineItalic}</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-zinc-500 max-w-2xl">
          {analytics.description}
        </p>
      </div>

      <div className="lg:scale-[0.85] xl:scale-[0.9] 2xl:scale-100 lg:origin-top transition-transform duration-300 lg:-mb-32 xl:-mb-16 2xl:mb-0">

      {/* Infinite Scroll Velocity Parallax Rows */}
      <div className="relative z-10 flex flex-col gap-4 w-full mt-12 overflow-visible">
        <ParallaxRow baseVelocity={-0.8}>
           {trustSignals.map((data, i) => (
             <AnalyticsCard key={`row1-${i}`} data={data} label="Verified Trust Signal" />
           ))}
        </ParallaxRow>
        
        <ParallaxRow baseVelocity={0.8}>
           {operationalIntelligence.map((data, i) => (
             <AnalyticsCard key={`row2-${i}`} data={data} label="Operational Intelligence" />
           ))}
        </ParallaxRow>
      </div>

      </div>
    </section>
  );
}
