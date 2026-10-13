import Image from 'next/image';
import Link from 'next/link';
import type { HeroContent } from '@/types/section';
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  content: HeroContent;
}

import ClientMarquee from "@/components/ui/ClientMarquee";

export default function HeroSection({ content }: HeroSectionProps) {
  const { heading, subheading, backgroundImage, ctaText, ctaLink } = content;

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-center overflow-hidden bg-black">
      
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          priority
          sizes="100vw"
        />
      )}

      {/* Vignette Overlay for readable text */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-0"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto flex-grow h-full mb-24 mt-20">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-[1.1] uppercase font-display">
          {heading}
        </h1>
        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mb-10 leading-relaxed">
          {subheading}
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
          {ctaText && ctaLink && (
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center space-x-2.5 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-md font-bold text-sm transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Logo Marquee at Bottom */}
      <div className="absolute bottom-0 left-0 w-full border-t-2 border-dotted border-white/20 bg-transparent z-20 py-2">
        <ClientMarquee showFadeMask={false} />
      </div>
    </section>
  );
}