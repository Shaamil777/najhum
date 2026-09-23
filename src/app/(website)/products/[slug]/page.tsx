"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Cta from "@/components/sections/home/Cta";
import { 
  Download, 
  Check, 
  ArrowRight,
  FileText
} from "lucide-react";

// Mock Product Data
const product = {
  name: "Evoltx Pro Industrial Router",
  model: "EV-RT-9000",
  shortDesc: "High-performance industrial 5G router built for mission-critical IoT and edge computing applications in harsh environments.",
  images: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop"
  ],
  overview: "The Evoltx Pro Industrial Router offers unprecedented connectivity, combining dual-SIM 5G failover with advanced edge processing capabilities. Engineered for maximum reliability, it ensures seamless data transmission for remote industrial sites, smart cities, and autonomous fleets. The ruggedized enclosure and industrial-grade components guarantee uptime even in the most demanding conditions.",
  features: [
    "Dual-SIM 5G / LTE Advanced Pro with automatic failover.",
    "Integrated Edge Computing capabilities (Quad-core ARM).",
    "Military-grade encryption and secure VPN tunneling.",
    "Ruggedized aluminum enclosure with IP64 rating.",
    "Wide operating temperature range (-40°C to +75°C).",
    "Comprehensive remote management via cloud dashboard."
  ],
  specs: [
    { property: "Dimensions (W x D x H)", value: "150 x 120 x 45", unit: "mm", remarks: "Excluding antennas" },
    { property: "Weight", value: "850", unit: "g", remarks: "Full aluminum body" },
    { property: "Processor", value: "Quad-Core ARM Cortex-A53", unit: "-", remarks: "Up to 1.5 GHz" },
    { property: "Memory", value: "2GB DDR4 / 16GB eMMC", unit: "-", remarks: "Expandable via MicroSD" },
    { property: "Interfaces", value: "4x GbE RJ45, 1x RS232, 1x RS485", unit: "-", remarks: "Industrial terminal block" },
    { property: "Power Supply", value: "9-36V DC", unit: "V", remarks: "Reverse polarity protection" },
    { property: "Cellular", value: "5G NR Sub-6 GHz, LTE Cat 20", unit: "-", remarks: "Global bands supported" },
    { property: "Wi-Fi", value: "802.11ax (Wi-Fi 6) 2x2 MIMO", unit: "-", remarks: "Dual-band (2.4 & 5 GHz)" }
  ],
  applications: [
    "Smart Grid & Energy Automation",
    "Industrial IoT (IIoT) & Manufacturing",
    "Autonomous Vehicles & Fleet Management",
    "Remote Security & Video Surveillance",
    "Smart City Infrastructure"
  ],
  environment: [
    { label: "Operating Temp", value: "-40°C to +75°C" },
    { label: "Humidity", value: "5% to 95% (non-condensing)" },
    { label: "Ingress Protection", value: "IP64 Rating" },
    { label: "Power Isolation", value: "1.5 kV RMS" }
  ],
  reliability: [
    "Vibration: EN 61373, MIL-STD-810G",
    "Shock & Drop: IEC 60068-2-27",
    "Thermal Shock: IEC 60068-2-14",
    "MTBF: > 300,000 hours"
  ],
  downloads: [
    { title: "Datasheet (PDF)", size: "1.2 MB", type: "pdf" },
    { title: "User Manual (PDF)", size: "4.5 MB", type: "pdf" },
    { title: "CAD Model (STEP)", size: "8.1 MB", type: "step" }
  ]
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  // In a real scenario, fetch product by slug here.
  const [activeImage, setActiveImage] = useState(product.images[0]);

  return (
    <div className="flex flex-col w-full bg-white text-neutral-900 pt-28 pb-12">
      
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* 1. Hero & Overview (Simplified) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="w-full aspect-square bg-neutral-100 rounded-xl overflow-hidden relative border border-neutral-200">
              <Image 
                src={activeImage} 
                alt={product.name} 
                fill
                className="object-cover mix-blend-multiply transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-neutral-900 opacity-100' : 'border-transparent opacity-60 hover:opacity-100 hover:border-neutral-200'}`}
                >
                  <Image 
                    src={img} 
                    alt={`${product.name} thumbnail ${idx + 1}`} 
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-2">
              Model: {product.model}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-neutral-900 mb-4 tracking-tight">
              {product.name}
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              {product.shortDesc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10 pb-10 border-b border-neutral-100">
              <Button className="gap-2">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText className="w-4 h-4" /> Request Brochure
              </Button>
            </div>

            <div>
               <h3 className="text-xl font-bold mb-3 text-neutral-900">Product Overview</h3>
               <p className="text-neutral-600 leading-relaxed">
                 {product.overview}
               </p>
            </div>
          </div>
        </div>

        {/* 2. Features & Applications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 p-8 rounded-2xl bg-neutral-50 border border-neutral-200">
          <div>
            <h2 className="text-xl font-bold mb-5 text-neutral-900">Key Features</h2>
            <ul className="space-y-3">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-neutral-700">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-5 text-neutral-900">Applications</h2>
            <ul className="list-disc pl-5 space-y-2 text-neutral-700">
              {product.applications.map((app, idx) => (
                <li key={idx}>{app}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Specifications Table */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900">Technical Specifications</h2>
          <div className="overflow-x-auto border border-neutral-200 rounded-lg shadow-sm">
            <table className="w-full text-left text-neutral-700 border-collapse min-w-[600px]">
              <thead className="bg-neutral-50 text-neutral-900 font-semibold text-sm uppercase tracking-wide">
                <tr>
                  <th className="p-4 border-b border-neutral-200">Property</th>
                  <th className="p-4 border-b border-neutral-200">Value</th>
                  <th className="p-4 border-b border-neutral-200">Unit</th>
                  <th className="p-4 border-b border-neutral-200">Remarks</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {product.specs.map((spec, idx) => (
                  <tr key={idx} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                    <td className="p-4 font-medium text-neutral-900">{spec.property}</td>
                    <td className="p-4">{spec.value}</td>
                    <td className="p-4 text-neutral-500">{spec.unit !== "-" ? spec.unit : ""}</td>
                    <td className="p-4 text-neutral-500 text-sm">{spec.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Environment & Reliability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
           <div>
            <h2 className="text-xl font-bold mb-6 text-neutral-900">Operating Conditions</h2>
            <ul className="space-y-4 bg-white border border-neutral-200 rounded-lg p-6">
              {product.environment.map((env, idx) => (
                <li key={idx} className="flex justify-between border-b border-neutral-100 pb-3 last:pb-0 last:border-0 text-neutral-700">
                  <span className="font-medium">{env.label}</span>
                  <span className="text-neutral-500">{env.value}</span>
                </li>
              ))}
            </ul>
           </div>
           <div>
            <h2 className="text-xl font-bold mb-6 text-neutral-900">Reliability & Testing</h2>
            <ul className="list-disc pl-5 space-y-3 text-neutral-700 bg-white border border-neutral-200 rounded-lg p-6 pb-8">
              {product.reliability.map((test, idx) => (
                <li key={idx} className="ml-2">{test}</li>
              ))}
            </ul>
           </div>
        </div>

        {/* 5. Request Brochure & Contact CTA */}
        <div className="mb-20 bg-neutral-50 border border-neutral-200 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-4 text-neutral-900">Need more detailed information?</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Get the complete product brochure, including full technical specifications, compliance certificates, and detailed dimension drawings.
          </p>
          <Button className="gap-2" size="lg">
            <FileText className="w-5 h-5" /> Request Brochure
          </Button>
        </div>

      </div>

      <Cta />
    </div>
  );
}
