"use client";

import RichText, { AccentHeading } from './RichText';
import React from "react";
import Link from "next/link";
import { ArrowRight, Tag, Box, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ProductCardSectionContent } from "@/types/section";

export interface DisplayProduct {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  platforms?: string[];
  brochureUrl?: string | null;
}

interface ProductCardSectionProps {
  content: ProductCardSectionContent;
  products?: DisplayProduct[];
}

export default function ProductCardSection({ content, products = [] }: ProductCardSectionProps) {
  const {
    eyebrow = "Compatible Hardware & Software",
    heading = "Featured Platform Products",
    description = "Integrated industrial equipment and edge hardware optimized for this deployment architecture.",
    columns = 3,
  } = content;

  if (!products || products.length === 0) return null;

  const getColClass = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
      case 3:
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <section className="relative w-full py-16 lg:py-24 bg-white border-b border-slate-200/70 overflow-hidden font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          {eyebrow && (
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase mb-3 border border-primary/20">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              <AccentHeading value={heading} />
            </h2>
          )}
          {description && (
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
              <RichText value={description} />
            </p>
          )}
        </div>

        {/* Product Cards Grid */}
        <div className={`grid gap-6 ${getColClass()}`}>
          {products.map((product, idx) => {
            const productHref = `/products/${product.id}`;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
              >
                <Link
                  href={productHref}
                  className="group relative bg-[#edf4ff] border border-blue-100/80 rounded-[1.75rem] p-6 h-full flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                >
                  {/* Top Platform Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold tracking-wider uppercase rounded-full border border-primary/20 shadow-xs">
                      <Tag className="w-2.5 h-2.5" />
                      {product.platforms?.[0] || "Hardware"}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white/90 text-slate-400 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Image Display */}
                  <div className="w-full h-44 rounded-2xl bg-white border border-primary/10 flex items-center justify-center p-4 mb-5 overflow-hidden relative shadow-xs">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-primary/40">
                        <Box className="w-12 h-12" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col flex-1 relative z-10">
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2 mb-5 flex-1">
                      <RichText value={product.description} />
                    </p>

                    <div className="pt-3 border-t border-primary/20 flex items-center justify-between text-primary font-bold text-xs">
                      <span>View Product Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
