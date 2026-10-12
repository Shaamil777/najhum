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
    <div className="overflow-hidden flex m-0 relative w-full">
      <motion.div className="flex whitespace-nowrap flex-nowrap w-max items-center" style={{ x }}>
        {/* Render 4 identical sets to seamlessly loop */}
        <div className="flex gap-3 sm:gap-6 pr-3 sm:pr-6">{children}</div>
        <div className="flex gap-3 sm:gap-6 pr-3 sm:pr-6">{children}</div>
        <div className="flex gap-3 sm:gap-6 pr-3 sm:pr-6">{children}</div>
        <div className="flex gap-3 sm:gap-6 pr-3 sm:pr-6">{children}</div>
      </motion.div>
    </div>
  );
}

// Reusable card for the analytics data
function AnalyticsCard({ data, label }: { data: { title: string; description: string; kpiValue: string }, label?: string }) {
  const isLong = data.kpiValue.length > 9;
  return (
    <div className="w-[185px] sm:w-[250px] md:w-[280px] lg:w-[310px] min-h-[145px] sm:min-h-[165px] lg:min-h-[175px] flex-shrink-0 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between group hover:border-zinc-300 transition-colors duration-300 shadow-2xs">
       <div className="flex flex-col gap-1 sm:gap-2 whitespace-normal">
         {label && (
           <span className="text-primary text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-0.5 sm:mb-1">
             {label}
           </span>
         )}
         <h3 className="text-sm sm:text-base lg:text-lg font-bold text-zinc-900 leading-tight font-poppins">{data.title}</h3>
         <p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-none">{data.description}</p>
       </div>
       <div className="mt-3 sm:mt-6 pt-2 sm:pt-3 border-t border-zinc-100/60">
         <span className={`font-bold font-poppins tracking-tight text-zinc-400 line-clamp-1 ${isLong ? "text-base sm:text-lg lg:text-xl" : "text-2xl sm:text-3xl lg:text-4xl"}`}>{data.kpiValue}</span>
       </div>
    </div>
  );
}

export default function Analytics() {
  const { analytics } = homeContent;
  
  const trustSignals = analytics.trustSignals || [];
  const operationalIntelligence = analytics.operationalIntelligence || [];

  return (
    <section className="w-full bg-[#fffff] text-zinc-900 pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-12 lg:pb-14 overflow-hidden relative font-poppins">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-80" />
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-10 relative z-20 px-4 sm:px-6">
        <span className="text-xs sm:text-sm font-semibold tracking-widest text-primary uppercase mb-2 sm:mb-4 flex items-center gap-3 sm:gap-4 before:h-px before:w-6 sm:before:w-8 before:bg-blue-200 after:h-px after:w-6 sm:after:w-8 after:bg-blue-200">
          {analytics.badge}
        </span>
        <h2 className="font-poppins normal-case text-2xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-zinc-900 mb-3 sm:mb-6">
          {analytics.headline} <span className="text-primary">{analytics.headlineItalic}</span>
        </h2>
        <p className="text-xs sm:text-base lg:text-xl text-zinc-500 max-w-2xl px-2">
          {analytics.description}
        </p>
      </div>

      {/* Infinite Scroll Velocity Parallax Rows - Edge-to-Edge Full Width */}
      <div className="relative z-10 flex flex-col gap-3 sm:gap-4 md:gap-5 w-full mt-4 sm:mt-8 overflow-hidden">
        <ParallaxRow baseVelocity={-0.8}>
           {trustSignals.map((data, i) => (
             <AnalyticsCard key={`row1-${i}`} data={data} label={"row1Label" in analytics ? (analytics.row1Label as string) : "The Company"} />
           ))}
        </ParallaxRow>
        
        <ParallaxRow baseVelocity={0.8}>
           {operationalIntelligence.map((data, i) => (
             <AnalyticsCard key={`row2-${i}`} data={data} label={"row2Label" in analytics ? (analytics.row2Label as string) : "The Platform"} />
           ))}
        </ParallaxRow>
      </div>
    </section>
  );
}
