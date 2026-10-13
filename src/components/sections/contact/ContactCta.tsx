"use client";

import { useState, useEffect } from "react";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { contactContent } from "@/content/contact";
import { Container } from "@/design-system/primitives/layout/Container";

export default function ContactCta() {
  const { cta } = contactContent;
  const [isHovered, setIsHovered] = useState(false);
  const [pixelState, setPixelState] = useState<Map<number, 'solid' | 'light'>>(new Map());

  useEffect(() => {
    if (!isHovered) return;

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

  const handleScrollToForm = () => {
    const firstField = document.getElementById("fullName");
    firstField?.scrollIntoView({
      block: "center",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
    firstField?.focus({ preventScroll: true });
  };

  return (
    <section className="relative w-full bg-white py-16 sm:py-24 lg:py-32 overflow-hidden border-t border-neutral-200">
      
      {/* Background Interactive Pixel Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:64px_64px] z-0 pointer-events-none" />
        
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
      
      {/* Interactive Main Content Container */}
      <Container size="xl" className="relative z-20 flex flex-col items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center text-center max-w-4xl pointer-events-auto">
          
          <h2 className="font-poppins text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-zinc-900 mb-6 leading-[1.08]">
            {cta.titlePart1} <br className="hidden sm:block" />
            {cta.titlePart2} <span className="text-primary">{cta.titlePart3}</span>
          </h2>

          <p className="text-lg sm:text-xl text-zinc-500 mb-12 leading-relaxed max-w-2xl">
            {cta.descriptionPart1}<span className="text-primary font-semibold">{cta.descriptionHighlight}</span>{cta.descriptionPart2}
          </p>
          
          {/* Scaled-up Action Button */}
          <div 
            className="scale-110 sm:scale-125 transition-transform duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AntiMetalButton
              type="button"
              onClick={handleScrollToForm}
              label={cta.buttonLabel}
              accentFrom="var(--color-primary)"
              accentTo="var(--color-primary)"
              dotColor="#ffffff"
              className="dark shadow-xl hover:shadow-primary/30 focus-visible:ring-blue-500"
            />
          </div>

        </div>
      </Container>
    </section>
  );
}
