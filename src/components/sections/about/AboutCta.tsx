import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, ArrowUpRight } from "lucide-react";

export default function AboutCta() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-neutral-950 text-white overflow-hidden">
      {/* ── Background Effects ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Glow sweeps */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        {/* Center radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.2em] uppercase text-primary mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Next_Steps
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-white leading-tight tracking-tight mb-8">
          Ready to Build{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
            Smarter Operations?
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-12">
          We don&apos;t do slide decks. We do live deployments. Let us show you what your data looks like when it&apos;s connected.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/contact"
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-sm overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Contact Us
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-emerald-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </Link>

          <Link
            href="/demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 text-white rounded-full font-bold uppercase tracking-widest text-sm border border-white/10 hover:bg-white/10 transition-colors group"
          >
            Book a Demo
            <Calendar className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
          </Link>
        </div>

      </div>
    </section>
  );
}

