"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cta from "@/components/sections/home/Cta";
import { Check } from "lucide-react";
import BrochureDownloadButton from "@/components/shared/BrochureDownloadButton";

export interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    model?: string;
    shortDesc: string;
    images: string[];
    brochureUrl?: string | null;
    overview?: string;
    features?: string[];
    specs?: Array<{ property: string; value: string; unit: string; remarks: string }>;
    applications?: string[];
    environment?: Array<{ label: string; value: string }>;
    reliability?: string[];
    downloads?: Array<{ title: string; size: string; type: string }>;
  };
}

export default function ProductDetailClient({ product }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(product.images[0] || "");

  const hasFeatures = Array.isArray(product.features) && product.features.length > 0;
  const hasApplications = Array.isArray(product.applications) && product.applications.length > 0;
  const hasSpecs = Array.isArray(product.specs) && product.specs.length > 0;
  const hasDistinctOverview = Boolean(
    product.overview && 
    product.overview.trim() !== "" && 
    product.overview.trim() !== product.shortDesc?.trim()
  );

  return (
    <div className="flex flex-col w-full bg-white text-neutral-900 pt-28 pb-12 font-sans">
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* 1. Hero & Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="w-full aspect-square bg-white rounded-2xl overflow-hidden relative border border-neutral-200/80 p-6 sm:p-8 flex items-center justify-center shadow-xs">
              {activeImage ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={activeImage} 
                    alt={product.name} 
                    fill
                    className="object-contain transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400 font-bold text-2xl">
                  {product.name}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all p-2 bg-white ${activeImage === img ? 'border-primary ring-2 ring-primary/20 opacity-100' : 'border-neutral-200 opacity-60 hover:opacity-100 hover:border-neutral-300'}`}
                  >
                    <div className="relative w-full h-full">
                      <Image 
                        src={img} 
                        alt={`${product.name} thumbnail ${idx + 1}`} 
                        fill
                        className="object-contain"
                        sizes="100px"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <div className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
              {product.model || "Production Hardware"}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-4 tracking-tight">
              {product.name}
            </h1>
            
            <p className="text-base text-neutral-600 mb-8 leading-relaxed">
              {product.shortDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <BrochureDownloadButton
                brochureUrl={product.brochureUrl}
                productName={product.name}
                size="lg"
                className="bg-primary text-white hover:bg-primary/90"
              />
              <Link
                href="/contact#contact-form"
                className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 rounded-md text-sm font-semibold text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
              >
                Request a Demo
              </Link>
            </div>

            {hasFeatures && (
              <div className="border-t border-neutral-200 pt-6">
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Key Highlights</h4>
                <ul className="grid grid-cols-1 gap-2">
                  {product.features!.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-neutral-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 2. Detailed Overview (only if distinct from short description) */}
        {hasDistinctOverview && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">System Overview</h2>
            <p className="text-neutral-600 leading-relaxed text-base max-w-4xl">
              {product.overview}
            </p>
          </div>
        )}

        {/* 3. Features & Applications */}
        {(hasFeatures || hasApplications) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {hasFeatures && (
              <div>
                <h3 className="text-xl font-bold mb-6 text-neutral-900">Features & Capabilities</h3>
                <ul className="space-y-3">
                  {product.features!.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-neutral-700 leading-normal">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hasApplications && (
              <div>
                <h3 className="text-xl font-bold mb-6 text-neutral-900">Target Applications</h3>
                <ul className="space-y-3">
                  {product.applications!.map((app, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-sm text-neutral-700 leading-normal">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 4. Specifications Table */}
        {hasSpecs && (
          <div id="specs" className="mb-20 scroll-mt-28">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">Technical Specifications</h2>
              <span className="sm:hidden text-xs text-neutral-500 font-medium flex items-center gap-1.5 self-start bg-neutral-100 px-2.5 py-1 rounded-full">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Swipe table horizontally</span>
              </span>
            </div>
            <div className="w-full overflow-x-auto border border-neutral-200 rounded-xl shadow-xs">
              <table className="w-full text-left text-sm min-w-[560px]">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-semibold uppercase text-xs">
                  <tr>
                    <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-semibold">Parameter</th>
                    <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-semibold">Specification</th>
                    <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-semibold">Unit</th>
                    <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  {product.specs!.map((spec, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="px-4 sm:px-6 py-3.5 sm:py-4 font-medium text-neutral-900 whitespace-nowrap">
                        {spec.property}
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-neutral-700">
                        {spec.value}
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-neutral-500 whitespace-nowrap">
                        {spec.unit && spec.unit.trim() !== "" ? spec.unit : "—"}
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-neutral-400 text-xs">
                        {spec.remarks && spec.remarks.trim() !== "" ? spec.remarks : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      <Cta />
    </div>
  );
}
