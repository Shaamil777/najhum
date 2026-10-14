"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { VideoSectionContent } from "@/types/section";

interface VideoSectionProps {
  content: VideoSectionContent;
}

export default function VideoSection({ content }: VideoSectionProps) {
  const {
    eyebrow,
    heading,
    subheading,
    videoUrl,
    posterUrl,
    layout = "contained",
    caption,
  } = content;

  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoUrl) return null;

  // Helper to extract YouTube/Vimeo embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return null;

    // YouTube
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }

    // Direct MP4 or unknown
    return null;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const isDirectVideo = !embedUrl;

  return (
    <section className="relative w-full py-16 lg:py-24 bg-slate-900 text-white overflow-hidden font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className={`mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${layout === "cinema" ? "max-w-full px-0" : "max-w-[1440px]"}`}>
        
        {/* Header */}
        {(heading || eyebrow || subheading) && (
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14 px-4">
            {eyebrow && (
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase mb-3 border border-blue-500/20">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-slate-400 text-base md:text-lg leading-relaxed font-medium">
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Video Player Box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`relative mx-auto overflow-hidden bg-black aspect-[16/9] shadow-2xl border border-white/10 ${layout === "cinema" ? "" : "max-w-5xl rounded-3xl"}`}
        >
          {!isPlaying && posterUrl && embedUrl ? (
            /* Poster with play button */
            <div 
              onClick={() => setIsPlaying(true)}
              className="relative w-full h-full cursor-pointer group flex items-center justify-center overflow-hidden"
            >
              <img
                src={posterUrl}
                alt="Video poster"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors" />
              <div className="relative z-10 w-20 h-20 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </div>
          ) : embedUrl ? (
            /* Iframe embed */
            <iframe
              src={embedUrl}
              title={heading || "Video showcase"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            /* Direct MP4 / HTML5 video */
            <video
              src={videoUrl}
              poster={posterUrl}
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          )}
        </motion.div>

        {caption && (
          <p className="text-center text-xs text-slate-400 mt-4 max-w-xl mx-auto">
            {caption}
          </p>
        )}

      </div>
    </section>
  );
}
