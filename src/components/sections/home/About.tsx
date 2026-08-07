import React from "react";
import { Poppins } from "next/font/google";
import { homeContent } from "@/content/home";
import DottedWorldMap from "./about/DottedWorldMap";
import { ArrowRight } from "lucide-react";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

export default function About() {
  return (
    <section 
      className={`relative w-full bg-[#f8f9fa] py-24 sm:py-32 ${poppins.variable} ${poppins.className} overflow-hidden sticky top-0 z-0`}
      style={{
        '--font-display': 'var(--font-poppins)',
        '--font-sans': 'var(--font-poppins)'
      } as React.CSSProperties}
    >
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-sm font-medium text-zinc-500">
                {homeContent.about.badge}
              </span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900 mb-6 whitespace-pre-line">
              {homeContent.about.headline}
            </h2>
            
            <p className="text-base text-zinc-500 mb-4 leading-relaxed">
              {homeContent.about.leftContent}
            </p>
            
            <p className="text-base text-zinc-500 mb-10 leading-relaxed">
              {homeContent.about.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              {homeContent.about.stats.slice(0, 2).map((stat) => (
                <div key={stat.id} className="flex flex-col border-l-2 border-zinc-200 pl-6">
                  <span className="text-3xl font-black tracking-tighter text-zinc-900 mb-2">{stat.value}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">{stat.title}</span>
                  <p className="text-xs text-zinc-400 leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>
            
            <div>
              <a href="/about" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#4c3bcf] group">
                <span className="group-hover:underline underline-offset-4">{homeContent.about.buttonLabel}</span>
                <div className="w-8 h-8 rounded-full bg-[#4c3bcf]/10 flex items-center justify-center group-hover:bg-[#4c3bcf] group-hover:text-white transition-colors duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Dotted World Map */}
          <div className="relative w-full">
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-blue-100/50 rounded-full blur-3xl opacity-50 pointer-events-none transform -translate-x-1/4" />
            <DottedWorldMap />
          </div>

        </div>
      </div>
    </section>
  );
}

