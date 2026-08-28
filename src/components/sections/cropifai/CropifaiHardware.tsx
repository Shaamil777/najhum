import React from "react";
import { ArrowRight, Activity, Target, Box, Radio, CloudSun, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default function CropifaiHardware() {
  const categories = [
    {
      title: "Soil Sensors",
      color: "text-emerald-700",
      borderColor: "border-emerald-500",
      bgColor: "bg-emerald-50/50",
      features: [
        "Soil Moisture",
        "Electrical Conductivity (EC)",
        "pH Level",
        "Temperature",
        "NPK (N, P, K)",
        "Soil Heat Flux"
      ]
    },
    {
      title: "Water Quality Sensors",
      color: "text-blue-700",
      borderColor: "border-blue-500",
      bgColor: "bg-blue-50/50",
      features: [
        "pH",
        "Electrical Conductivity (EC)",
        "Hardness (Ca²⁺, Mg²⁺)",
        "TDS",
        "Salinity (Fertigation)"
      ]
    },
    {
      title: "Weather Station",
      color: "text-teal-700",
      borderColor: "border-teal-500",
      bgColor: "bg-teal-50/50",
      features: [
        "Wind Speed & Direction",
        "Humidity & Temperature",
        "Rainfall",
        "Solar-Powered",
        "LoRaWAN (15km range)"
      ]
    }
  ];

  const products = [
    { name: "Najhum Ph Sensor", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400&auto=format&fit=crop" },
    { name: "Najhum Soil Sensor", image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=400&auto=format&fit=crop" },
    { name: "Solenoid Valve Controller", image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=400&auto=format&fit=crop" },
    { name: "Smart Valve Controller", image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=400&auto=format&fit=crop" },
    { name: "Najhum Weather Station", image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=400&auto=format&fit=crop" },
  ];

  const tags = [
    "Ruggedized for Desert",
    "LoRaWAN Connectivity",
    "IP67 Rated",
    "Low Maintenance",
    "NFC Configuration"
  ];

  return (
    <section className="w-full py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-6 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Smart Irrigation & Automation
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-neutral-900 leading-tight">
              Crop & Soil Sensing <br className="hidden md:block" /> Systems
            </h2>
          </div>
          <Link 
            href="/products" 
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-full font-bold uppercase tracking-widest text-xs overflow-hidden transition-all hover:shadow-xl hover:shadow-neutral-900/20 shrink-0"
          >
            <span className="relative z-10 flex items-center gap-2">
              View More Hardware
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-[2rem] border-2 ${cat.borderColor} ${cat.bgColor} p-8 lg:p-10 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden group`}
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <h3 className={`relative z-10 text-2xl lg:text-3xl font-black mb-8 ${cat.color} tracking-tight`}>
                {cat.title}
              </h3>
              <ul className="relative z-10 flex flex-col gap-4 flex-1">
                {cat.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-neutral-700">
                    <span className={`mt-1 flex-shrink-0 font-bold ${cat.color}`}>•</span>
                    <span className="font-medium leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Products Display & Bottom Bar Container */}
        <div className="bg-neutral-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8 mb-12">
              {products.map((prod, idx) => {
                return (
                  <div key={idx} className="flex flex-col items-center text-center gap-4 group cursor-pointer">
                    <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-primary/50 transition-all duration-300 shadow-xl">
                      <Image 
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                        sizes="(max-width: 768px) 96px, 128px"
                      />
                      {/* Subtle dark overlay to blend with the dark bento box theme */}
                      <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-neutral-900/10 transition-colors duration-500 pointer-events-none" />
                    </div>
                    <p className="text-xs lg:text-sm font-bold text-neutral-300 leading-tight group-hover:text-white transition-colors">
                      {prod.name}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Tags Marquee / Bar */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 lg:p-6">
              <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
                {tags.map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs lg:text-sm font-bold text-white uppercase tracking-wider">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
