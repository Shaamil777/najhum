"use client";
import RichText from './RichText';


import { useState, useEffect } from "react";
import Link from 'next/link';
import type { CTAContent } from '@/types/section';


interface CTASectionProps {
  content: CTAContent;
}

export default function CTASection({ content }: CTASectionProps) {
  const { heading, bodyText, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink } = content;
  
  const [isHovered, setIsHovered] = useState(false);
  const [pixelState, setPixelState] = useState<Map<number, 'solid' | 'light'>>(new Map());

  useEffect(() => {
    if (!isHovered) return;

    // Function to generate a new set of random pixels
    const generatePixels = () => {
      const newState = new Map<number, 'solid' | 'light'>();
      // Pick 8 solid primary pixels
      for (let i = 0; i < 8; i++) {
        newState.set(Math.floor(Math.random() * 600), 'solid');
      }
      // Pick 15 light primary pixels
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
    <section className="relative w-full bg-white py-16 sm:py-24 lg:py-32 overflow-hidden border-t border-zinc-200">
      
      {/* Background Interactive Pixel Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden">
         {/* The faint background lines are provided by this div */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:64px_64px] z-0 pointer-events-none" />
         
         {/* Interactive Grid Cells */}
         <div className="absolute inset-0 flex flex-wrap content-start">
            {Array.from({ length: 600 }).map((_, i) => {
               const pState = (isHovered ? pixelState.get(i) : undefined);
               
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
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-20 flex flex-col items-center justify-center pointer-events-none">
          {/* Content & Button */}
          <div className="flex flex-col items-center text-center max-w-4xl pointer-events-auto">
             <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 mb-6 leading-[1.05]">
                <RichText value={heading} />
             </h2>
             <div className="text-lg sm:text-xl text-zinc-500 mb-12 leading-relaxed max-w-2xl"><RichText as="div" value={bodyText} /></div>
             
             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full">
               {/* Primary Button */}
               {primaryButtonText && primaryButtonLink && (
                 <div 
                   className="max-w-full w-full sm:w-auto"
                   onMouseEnter={() => setIsHovered(true)}
                   onMouseLeave={() => setIsHovered(false)}
                 >
                    <Link href={primaryButtonLink} className="inline-flex w-full items-center justify-center rounded-lg bg-primary text-white px-6 py-3.5 text-sm font-semibold hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                      {primaryButtonText}
                    </Link>
                 </div>
               )}

               {/* Secondary Button */}
               {secondaryButtonText && secondaryButtonLink && (
                 <div className="max-w-full w-full sm:w-auto">
                   <Link
                     href={secondaryButtonLink}
                     className="inline-flex w-full min-h-[48px] text-center py-3 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200 bg-white text-zinc-950 shadow-sm"
                   >
                     {secondaryButtonText}
                   </Link>
                 </div>
               )}
             </div>
          </div>
      </div>
    </section>
  );
}