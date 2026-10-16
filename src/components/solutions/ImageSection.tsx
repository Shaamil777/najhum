"use client";

import RichText, { AccentHeading } from './RichText';
import React from "react";
import { motion } from "framer-motion";
import type { ImageSectionContent } from "@/types/section";

interface ImageSectionProps {
  content: ImageSectionContent;
}

export default function ImageSection({ content }: ImageSectionProps) {
  const {
    eyebrow,
    heading,
    description,
    imageUrl,
    altText = "Solution visual showcase",
    caption,
    layout = "contained",
    aspectRatio = "16:9",
    rounded = true,
    fit = 'cover',
  } = content;



  const getAspectClass = () => {
    switch (aspectRatio) {
      case "4:3":
        return "aspect-[4/3]";
      case "21:9":
        return "aspect-[21/9]";
      case "auto":
        return "h-auto";
      case "16:9":
      default:
        return "aspect-[16/9]";
    }
  };

  const isSplit = !!imageUrl && (layout === "split-left" || layout === "split-right");

  return (
    <section className="relative w-full py-16 lg:py-24 bg-white overflow-hidden font-sans border-b border-slate-100">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${layout === "full-width" ? "max-w-full px-0" : "max-w-7xl"}`}>
        
        {/* Header if not split layout */}
        {!isSplit && (heading || eyebrow || description) && (
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14 px-4">
            {eyebrow && (
              <span className="solution-eyebrow block">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                <AccentHeading value={heading} />
              </h2>
            )}
            {description && (
              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                <RichText value={description} />
              </p>
            )}
          </div>
        )}

        {/* Split Layout */}
        {isSplit ? (
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${layout === "split-right" ? "lg:flex-row-reverse" : ""}`}>
            <div className={layout === "split-right" ? "lg:order-2" : "lg:order-1"}>
              {eyebrow && (
                <span className="solution-eyebrow block">
                  {eyebrow}
                </span>
              )}
              {heading && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                  <AccentHeading value={heading} />
                </h2>
              )}
              {description && (
                <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium mb-6">
                  <RichText value={description} />
                </p>
              )}
              {caption && (
                <p className="text-xs text-slate-400 italic border-l-2 border-primary/40 pl-3">
                  {caption}
                </p>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative overflow-hidden shadow-lg ${rounded ? "rounded-3xl" : ""} ${getAspectClass()} ${layout === "split-right" ? "lg:order-1" : "lg:order-2"}`}
            >
              <img
                src={imageUrl}
                alt={altText}
                className={`w-full ${aspectRatio === "auto" ? "h-auto" : "h-full"} ${fit === "contain" ? "object-contain" : "object-cover"}`}
              />
            </motion.div>
          </div>
        ) : imageUrl ? (
          /* Standard / Full Width Image Showcase */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`relative mx-auto overflow-hidden ${layout === "card" ? "p-3 bg-slate-50 border border-slate-200/80 shadow-xl" : ""} ${rounded && layout !== "full-width" ? "rounded-3xl" : ""} ${getAspectClass()}`}
          >
            <img
              src={imageUrl}
              alt={altText}
              className={`w-full ${aspectRatio === "auto" ? "h-auto" : "h-full"} ${fit === "contain" ? "object-contain" : "object-cover"} ${rounded && layout !== "full-width" ? "rounded-2xl" : ""} hover:scale-102 transition-transform duration-700`}
            />

            {caption && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto max-w-lg bg-slate-950/80 backdrop-blur-md text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-white/10 shadow-lg">
                {caption}
              </div>
            )}
          </motion.div>
        ) : null}

      </div>
    </section>
  );
}
