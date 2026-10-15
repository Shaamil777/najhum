"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const dummyProducts = [
  {
    id: 1,
    title: "AC Home Charger 7kW",
    category: "Residential",
    desc: "Smart, compact, and reliable AC charging for home use.",
    imagePlaceholder: "bg-slate-50",
  },
  {
    id: 2,
    title: "DC Fast Charger 60kW",
    category: "Commercial",
    desc: "High-speed charging solution for commercial fleets and public spaces.",
    imagePlaceholder: "bg-slate-50",
  },
  {
    id: 3,
    title: "Ultra-Fast DC 120kW",
    category: "Highway",
    desc: "Premium rapid charging for highway rest stops and heavy-duty EVs.",
    imagePlaceholder: "bg-slate-50",
  },
  {
    id: 4,
    title: "Fleet Management Node",
    category: "Enterprise",
    desc: "Centralized hardware node for managing multi-charger load balancing.",
    imagePlaceholder: "bg-slate-50",
  },
  {
    id: 5,
    title: "Cloud CSMP Gateway",
    category: "Software",
    desc: "Edge computing gateway connecting offline chargers to the cloud securely.",
    imagePlaceholder: "bg-slate-50",
  },
];

interface CarouselProduct {
  id: string | number;
  name?: string;
  title?: string;
  category?: string | null;
  description?: string | null;
  desc?: string;
  imageUrl?: string | null;
  imagePlaceholder?: string;
}

interface PlatformProductsCarouselProps {
  products?: CarouselProduct[];
  title?: string;
  eyebrow?: string;
  description?: string;
}

function formatProductTitle(str: string): string {
  if (!str) return "";
  if (/[a-z]/.test(str)) return str;

  const acronyms = new Set([
    "AI", "UV/IR", "GPS", "BLE", "IOT", "AC", "DC", "OCPP", "IP67", 
    "NTS600", "NT321", "NTGW4", "NT6000", "NQT02", "NUO3"
  ]);

  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      const upper = word.toUpperCase();
      if (acronyms.has(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export default function PlatformProductsCarousel({ 
  products = dummyProducts,
  title,
  description = "Cutting-edge hardware built for reliability and scale."
}: PlatformProductsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const productCount = products?.length || 0;

  // Track scroll position to disable/enable navigation arrows at boundaries
  const checkScrollBounds = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScrollBounds();
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScrollBounds, { passive: true });
    window.addEventListener("resize", checkScrollBounds);

    return () => {
      el.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, [checkScrollBounds, products]);

  if (productCount === 0) return null;

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
    <section className="w-full pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-14 lg:pb-16 bg-surface relative overflow-hidden font-sans border-b border-border">
      
      <div className="container mx-auto px-6 lg:px-16 max-w-[1400px] relative z-10 mb-6 sm:mb-8 lg:mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-0">
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-foreground leading-tight">
              {title || (
                <>
                  Explore Our <br className="hidden sm:block" />
                  <span className="text-primary font-bold">Product Range</span>
                </>
              )}
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-4 mt-2 md:mt-0">
            <p className="text-muted text-[13px] sm:text-base lg:text-lg max-w-sm italic text-center md:text-left hidden md:block mr-0 md:mr-6">
              {description}
            </p>
            {/* Slider Navigation Buttons (Hidden on Mobile & Tablet) */}
            <div className="hidden lg:flex gap-3">
              <button 
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center transition-all shadow-sm",
                  canScrollLeft
                    ? "text-foreground hover:bg-primary hover:text-white hover:border-primary cursor-pointer"
                    : "text-muted/30 border-border/40 cursor-not-allowed opacity-40 hover:bg-transparent hover:text-muted/30"
                )}
                aria-label="Previous product"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
              </button>
              <button 
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center transition-all shadow-sm",
                  canScrollRight
                    ? "text-foreground hover:bg-primary hover:text-white hover:border-primary cursor-pointer"
                    : "text-muted/30 border-border/40 cursor-not-allowed opacity-40 hover:bg-transparent hover:text-muted/30"
                )}
                aria-label="Next product"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Scroll Container (Cloudy mask-edges removed) */}
      <div className="relative w-full overflow-hidden flex flex-col justify-center h-[420px] md:h-[480px] lg:h-[596px]">
        <style dangerouslySetInnerHTML={{__html: `
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
          className="flex gap-6 lg:gap-8 px-6 lg:px-16 pt-0 pb-4 md:py-6 lg:py-12 overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full scroll-smooth"
        >
          {products.map((product, idx) => {
            // Stagger pattern: Even cards go up, Odd cards go down (only on lg desktop and above)
            const isEven = idx % 2 === 0;
            const staggerClass = isEven ? "lg:-translate-y-12" : "lg:translate-y-12";
            const productName = product.name || product.title || "";
            const productSlug = (product as { slug?: string }).slug || encodeURIComponent(productName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")) || String(product.id);

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
                  
                  {/* Top Image Area - Clean & crisp, no cloudy gradient overlay */}
                  <div className={cn("h-[55%] w-full relative overflow-hidden p-6 flex flex-col justify-center items-center border-b border-border/40", product.imagePlaceholder || "bg-slate-50")}>
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={productName} 
                        className="w-full h-full object-contain p-4 opacity-100 transition-transform duration-300 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="text-center opacity-40 group-hover:opacity-60 transition-opacity">
                        <span className="text-xs font-semibold uppercase tracking-widest text-foreground">Product Render</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Content Area */}
                  <div className="h-[45%] p-6 flex flex-col justify-between relative z-10 bg-background">
                    <div>
                      <h3 className="text-base lg:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        <Link href={`/products/${productSlug}`} className="hover:underline">
                          {formatProductTitle(productName)}
                        </Link>
                      </h3>
                      <p className="text-xs lg:text-sm text-muted leading-relaxed line-clamp-3">
                        {product.description || product.desc}
                      </p>
                    </div>

                    <Link 
                      href={`/products/${productSlug}`}
                      className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary group/btn mt-4 hover:underline"
                    >
                      <span>Explore Product</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
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
          disabled={!canScrollLeft}
          className={cn(
            "w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all shadow-sm",
            canScrollLeft
              ? "text-foreground hover:bg-primary hover:text-white hover:border-primary"
              : "text-muted/30 border-border/40 opacity-40 cursor-not-allowed"
          )}
          aria-label="Previous product"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
        </button>
        <button 
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={cn(
            "w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all shadow-sm",
            canScrollRight
              ? "text-foreground hover:bg-primary hover:text-white hover:border-primary"
              : "text-muted/30 border-border/40 opacity-40 cursor-not-allowed"
          )}
          aria-label="Next product"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
