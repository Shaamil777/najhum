"use client";

import Link from "next/link";

export default function Cta() {
  return (
    <section
      id="cta"
      className="relative w-full overflow-hidden bg-najhum-black py-24 sm:py-32 text-white border-t border-white/10"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-najhum-blue/20 via-cyan-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400 backdrop-blur-md mb-8">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          Next-Generation Digital Excellence
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight">
          Ready to Transform Your{" "}
          <span className="bg-gradient-to-r from-najhum-blue via-cyan-400 to-blue-300 bg-clip-text text-transparent">
            Enterprise Operations?
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 mx-auto max-w-2xl text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
          Join leading businesses and municipalities across the region leveraging
          Najhum&apos;s intelligent IoT platforms, EV charging management, and
          sustainable infrastructure solutions.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#contact"
            className="rounded-full bg-gradient-to-r from-najhum-blue to-cyan-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-cyan-500/20 transition-all hover:scale-105 hover:shadow-cyan-500/40"
          >
            Start Your Transformation &rarr;
          </Link>
          <Link
            href="/#contact"
            className="rounded-full border border-white/30 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/10"
          >
            Contact Engineering Team
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 font-mono">
          <span>&bull; 100% HARDWARE AGNOSTIC</span>
          <span>&bull; REGIONAL COMPLIANT</span>
          <span>&bull; 24/7 DEDICATED SUPPORT</span>
        </div>
      </div>
    </section>
  );
}
