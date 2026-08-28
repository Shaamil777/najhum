import React from "react";
import { MapPin, Phone, Globe2, ArrowUpRight } from "lucide-react";

export default function AboutPresence() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#f5f7fa] overflow-hidden">

      {/* ── Geometric Background Elements ── */}

      {/* Large circle outline */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border-2 border-neutral-200/60 pointer-events-none" />
      <div className="absolute -bottom-64 -left-64 w-[700px] h-[700px] rounded-full border border-neutral-200/40 pointer-events-none" />

      {/* Rotated diamond */}
      <div className="absolute top-1/3 right-[8%] w-24 h-24 border border-primary/15 rotate-45 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-[15%] left-[12%] w-16 h-16 border border-neutral-300/40 rotate-12 rounded-lg pointer-events-none hidden lg:block" />

      {/* Dot cluster */}
      <div className="absolute top-20 left-[20%] pointer-events-none hidden lg:block">
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-neutral-300/50" />
          ))}
        </div>
      </div>

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-[30%] w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent pointer-events-none" />

      {/* Soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* ── Asymmetric Grid Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left Column — Content (narrower, offset) */}
          <div className="lg:col-span-5 lg:pt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-primary" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-primary">
                Global Presence
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-neutral-900 leading-[1.1] tracking-tight mb-6">
              Strategic Hub <br />
              in the <span className="text-primary">UAE</span>
            </h2>

            <p className="text-base text-neutral-500 leading-relaxed mb-10 max-w-md">
              Expanding globally through cloud-first platforms and industry partnerships.
            </p>

            {/* Contact Cards */}
            <div className="flex flex-col gap-4 mb-10">
              {/* Address Card */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 mb-1">Dubai, United Arab Emirates</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      in5 Design — Zaa&apos;beel Second — Dubai Design District
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 mb-1">Get in Touch</h4>
                    <a href="tel:+971525699979" className="text-sm text-primary font-semibold hover:underline">
                      +971 52 569 9979
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Cloud-first badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-neutral-900 text-white text-xs font-bold tracking-widest uppercase">
              <Globe2 className="w-4 h-4 text-primary" />
              Cloud-First Global Reach
            </div>
          </div>

          {/* Right Column — Map (wider, asymmetric) */}
          <div className="lg:col-span-7 relative">
            {/* Map container with unique shape */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-neutral-300/30 border border-neutral-200/60">
              {/* Decorative top-right badge */}
              <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-neutral-100 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-neutral-900">Najhum HQ — Live</span>
              </div>

              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.2!2d55.2708!3d25.1972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0x6719b50b6dda70c!2sNajhum%20Technologies!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[400px] md:h-[500px] lg:h-[550px]"
                title="Najhum Technologies Location"
              />
            </div>

            {/* Floating "View on Maps" button */}
            <a
              href="https://maps.google.com/?q=Najhum+Technologies+Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-5 left-8 z-20 inline-flex items-center gap-2 bg-neutral-950 text-white px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-2xl hover:bg-primary transition-colors group"
            >
              View on Google Maps
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

