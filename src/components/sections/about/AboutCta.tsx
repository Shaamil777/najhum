"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";

export default function AboutCta() {
  const [isHovered, setIsHovered] = useState(false);
  const [pixelState, setPixelState] = useState<Map<number, 'solid' | 'light'>>(new Map());

  useEffect(() => {
    if (!isHovered) {
      setPixelState(new Map());
      return;
    }

    const generatePixels = () => {
      const newState = new Map<number, 'solid' | 'light'>();
      for (let i = 0; i < 8; i++) {
        newState.set(Math.floor(Math.random() * 600), 'solid');
      }
      for (let i = 0; i < 15; i++) {
        const idx = Math.floor(Math.random() * 600);
        if (!newState.has(idx)) newState.set(idx, 'light');
      }
      setPixelState(newState);
    };

    generatePixels();

    const interval = setInterval(generatePixels, 1200);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="relative w-full bg-white py-16 sm:py-24 lg:py-32 overflow-hidden">
      
      {/* Background Interactive Pixel Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:64px_64px] z-0 pointer-events-none" />
         
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
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-20 flex flex-col items-center justify-center min-h-[40vh] pointer-events-none lg:scale-[0.85] xl:scale-[0.9] 2xl:scale-100 lg:origin-top transition-transform duration-300 lg:-mb-32 xl:-mb-16 2xl:mb-0">
          <div className="flex flex-col items-center text-center max-w-4xl pointer-events-auto">
             
             <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-xs font-bold tracking-[0.2em] uppercase text-primary mb-8 backdrop-blur-sm">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               Next_Steps
             </div>

             <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-zinc-900 mb-6 leading-[1.05]">
                Ready to Build <br className="hidden sm:block" />
                <span className="text-primary">Smarter Operations?</span>
             </h2>
             <p className="text-lg sm:text-xl text-zinc-500 mb-12 leading-relaxed max-w-2xl mx-auto">
                We don&apos;t do slide decks. We do live deployments. Let us show you what your data looks like when it&apos;s connected.
             </p>
             
             <div 
               className="scale-110 sm:scale-125 transition-transform duration-300"
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
             >
                <Link href="/contact" className="focus-visible:outline-none block">
                  <AntiMetalButton 
                    label="Contact Us" 
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

