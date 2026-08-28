"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, Zap, Shield, Cpu, Cloud, BatteryCharging } from "lucide-react";
import { cn } from "@/lib/utils";

const dummyProducts = [
  {
    id: 1,
    title: "AC Home Charger 7kW",
    category: "Residential",
    desc: "Smart, compact, and reliable AC charging for home use.",
    imagePlaceholder: "bg-gradient-to-br from-blue-100 to-blue-50",
  },
  {
    id: 2,
    title: "DC Fast Charger 60kW",
    category: "Commercial",
    desc: "High-speed charging solution for commercial fleets and public spaces.",
    imagePlaceholder: "bg-gradient-to-br from-blue-100 to-blue-50",
  },
  {
    id: 3,
    title: "Ultra-Fast DC 120kW",
    category: "Highway",
    desc: "Premium rapid charging for highway rest stops and heavy-duty EVs.",
    imagePlaceholder: "bg-gradient-to-br from-blue-100 to-blue-50",
  },
  {
    id: 4,
    title: "Fleet Management Node",
    category: "Enterprise",
    desc: "Centralized hardware node for managing multi-charger load balancing.",
    imagePlaceholder: "bg-gradient-to-br from-blue-100 to-blue-50",
  },
  {
    id: 5,
    title: "Cloud CPMS Gateway",
    category: "Software",
    desc: "Edge computing gateway connecting offline chargers to the cloud securely.",
    imagePlaceholder: "bg-gradient-to-br from-blue-100 to-blue-50",
  },
];

export default function EvolticsProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // We duplicate the array multiple times to create a long scrolling list
  const duplicatedProducts = [...dummyProducts, ...dummyProducts, ...dummyProducts, ...dummyProducts];

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const cardWidth = window.innerWidth >= 1024 ? 372 : 304; // 340+32 gap vs 280+24 gap
        
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 3500);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = window.innerWidth >= 1024 ? 372 : 304;
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = window.innerWidth >= 1024 ? 372 : 304;
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-24 lg:py-32 bg-surface relative overflow-hidden font-sans">
      
      <div className="container mx-auto px-6 lg:px-16 max-w-[1400px] relative z-10 mb-0 lg:mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-0 lg:mb-0">
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-primary uppercase mb-2 sm:mb-3 block">
              Hardware & Solutions
            </span>
            <h2 className="text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2rem] xl:text-[3.2rem] font-black tracking-tight text-foreground leading-[1.1] sm:leading-[1.05] uppercase">
              Explore Our <br className="hidden sm:block" />
              <span className="text-primary font-black">Product Range</span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-4 mt-2 md:mt-0">
            <p className="text-muted text-[13px] sm:text-base lg:text-lg max-w-sm italic text-center md:text-left hidden md:block mr-0 md:mr-6">
              Cutting-edge EV charging hardware built for reliability and scale.
            </p>
            {/* Slider Navigation Buttons (Hidden on Mobile & Tablet) */}
            <div className="hidden lg:flex gap-3">
              <button 
                onClick={scrollLeft}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                aria-label="Previous product"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
              </button>
              <button 
                onClick={scrollRight}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                aria-label="Next product"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Manual & Auto Scroll Container */}
      <div className="relative w-full overflow-hidden flex flex-col justify-center h-[420px] md:h-[480px] lg:h-[650px] mask-edges">
        <style dangerouslySetInnerHTML={{__html: `
          .mask-edges {
            mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
        
        <div 
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 lg:gap-8 px-[10vw] pt-0 pb-4 md:py-6 lg:py-12 overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full scroll-smooth"
        >
          {duplicatedProducts.map((product, idx) => {
            // Stagger pattern: Even cards go up, Odd cards go down (only on lg desktop and above)
            const isEven = idx % 2 === 0;
            const staggerClass = isEven ? "lg:-translate-y-12" : "lg:translate-y-12";

            return (
              <div 
                key={`${product.id}-${idx}`}
                className={cn(
                  "w-[280px] md:w-[320px] lg:w-[340px] shrink-0 group relative transition-transform duration-500 ease-out snap-center",
                  staggerClass
                )}
              >
                {/* Card Background / Border wrapper */}
                <div className="bg-background rounded-3xl border border-border overflow-hidden h-[400px] md:h-[440px] lg:h-[480px] flex flex-col group-hover:border-primary/40 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-300">
                  
                  {/* Top Image Area */}
                  <div className={cn("h-[55%] w-full relative overflow-hidden p-6 flex flex-col justify-between", product.imagePlaceholder)}>
                    <div className="flex justify-end items-start relative z-10">
                      <span className="text-[10px] font-bold tracking-widest text-foreground/60 uppercase bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                        {product.category}
                      </span>
                    </div>
                    
                    {/* Mockup Placeholder Text inside Image area */}
                    <div className="relative z-10 text-center opacity-40 group-hover:opacity-60 transition-opacity">
                      <span className="text-xs font-bold uppercase tracking-widest text-foreground mix-blend-overlay">Product Render</span>
                    </div>

                    {/* Gradient Overlay for bottom blending */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent z-0" />
                  </div>

                  {/* Bottom Content Area */}
                  <div className="h-[45%] p-6 flex flex-col justify-between relative z-10 bg-background">
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {product.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-muted leading-relaxed line-clamp-3">
                        {product.desc}
                      </p>
                    </div>

                    <button className="flex items-center text-xs font-bold uppercase tracking-wider text-primary group/btn mt-4">
                      Explore Product
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile & Tablet Only Navigation Buttons */}
      <div className="flex lg:hidden items-center justify-center gap-4 mt-6">
        <button 
          onClick={scrollLeft}
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
          aria-label="Previous product"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
        </button>
        <button 
          onClick={scrollRight}
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
          aria-label="Next product"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
