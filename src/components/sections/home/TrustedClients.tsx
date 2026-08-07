"use client";

import React from "react";
import { Hexagon, Triangle, Circle, Square, Box, Shield, Cloud, Activity } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

const clients = [
  { name: "Lumina", icon: Hexagon },
  { name: "Nexis", icon: Triangle },
  { name: "Altira", icon: Circle },
  { name: "Vortex", icon: Square },
  { name: "Axiom", icon: Box },
  { name: "Sentia", icon: Shield },
  { name: "Equinox", icon: Cloud },
  { name: "Quantis", icon: Activity },
];

export default function TrustedClients() {
  return (
    <section 
      className={`w-full bg-white py-16 border-b border-neutral-200 ${poppins.variable} ${poppins.className}`}
      style={{
        '--font-display': 'var(--font-poppins)',
        '--font-sans': 'var(--font-poppins)'
      } as React.CSSProperties}
    >
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12">
        <p className="text-xs font-medium text-zinc-400 text-center mb-10">
          TRUSTED BY INDUSTRY LEADERS
        </p>
        
        {/* Dotted Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t-2 border-l-2 border-zinc-200 border-dotted mx-auto max-w-5xl">
          {clients.map((client, i) => {
            const Icon = client.icon;
            return (
              <div 
                key={i} 
                className="flex items-center justify-center gap-3 py-12 border-b-2 border-r-2 border-zinc-200 border-dotted grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300 group cursor-default"
              >
                <Icon className="w-5 h-5 text-zinc-800 group-hover:text-[#4c3bcf] transition-colors" />
                <span className="font-display font-bold text-lg tracking-tight text-zinc-800">
                  {client.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
