"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";

export default function EvolticsCta() {
  const [isHovered, setIsHovered] = useState(false);
  const [pixelState, setPixelState] = useState<Map<number, 'solid' | 'light'>>(new Map());

  useEffect(() => {
    if (!isHovered) {
      setPixelState(new Map());
      return;
    }

    // Function to generate a new set of random pixels
    const generatePixels = () => {
      const newState = new Map<number, 'solid' | 'light'>();
      // Pick 8 solid blue pixels
      for (let i = 0; i < 8; i++) {
        newState.set(Math.floor(Math.random() * 600), 'solid');
      }
      // Pick 15 light blue pixels
      for (let i = 0; i < 15; i++) {
        const idx = Math.floor(Math.random() * 600);
        if (!newState.has(idx)) newState.set(idx, 'light');
      }
      setPixelState(newState);
    };

    // Initial generation immediately when hovered
    generatePixels();

    // Re-generate every 1200ms for a slower, calmer twinkling effect
    const interval = setInterval(generatePixels, 1200);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="relative w-full bg-white py-20 sm:py-28 lg:py-36 overflow-hidden border-t border-border">
      
      {/* Background Interactive Pixel Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* The faint background grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:64px_64px] z-0 pointer-events-none" />
        
        {/* Interactive Grid Cells */}
        <div className="absolute inset-0 flex flex-wrap content-start">
          {Array.from({ length: 600 }).map((_, i) => {
            const pState = pixelState.get(i);
            
            let bgClass = '';
            if (isHovered && pState) {
              if (pState === 'solid') bgClass = 'bg-primary shadow-sm';
              else if (pState === 'light') bgClass = 'bg-primary/20';
            }
            
            return (
              <div 
                key={i}
                className={`w-[64px] h-[64px] border border-transparent rounded-md transition-all duration-[1200ms] ease-in-out z-0 hover:z-10 hover:border-primary hover:bg-primary/5 ${bgClass}`}
              />
            );
          })}
        </div>
      </div>
      
      {/* Interactive Main Content Container */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-20 flex flex-col items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center text-center max-w-4xl pointer-events-auto">
          
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-zinc-900 mb-6 leading-[1.08]">
            Ready to Electrify <br className="hidden sm:block" />
            Your <span className="text-primary">Charging Network?</span>
          </h2>

          <p className="text-lg sm:text-xl text-zinc-500 mb-12 leading-relaxed max-w-2xl">
            Partner with <span className="text-primary font-semibold">Evoltics</span> for end-to-end CPO licensing, hardware deployment, and intelligent CPMS cloud orchestration across the UAE.
          </p>
          
          {/* Scaled-up Contact / Action Button */}
          <div 
            className="scale-110 sm:scale-125 transition-transform duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link href="/contact" className="focus-visible:outline-none block">
              <AntiMetalButton 
                label="Get Started" 
                accentFrom="var(--color-primary)" 
                accentTo="var(--color-primary)" 
                dotColor="#ffffff"
                className="dark shadow-xl hover:shadow-primary/30"
              />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
