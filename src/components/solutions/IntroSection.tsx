"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { IntroContent } from '@/types/section';
import { Container } from '@/design-system/primitives/layout/Container';
import { sanitizeContent } from '@/lib/utils/sanitize-content';

export default function IntroSection({ content }: { content: IntroContent }) {
  const highlights = content.highlights || [];
  const stats = content.stats || [];
  const buttonLink = content.buttonLink && (
    /^\/(?!\/)/.test(content.buttonLink) ||
    content.buttonLink.startsWith('#') ||
    /^https?:\/\//i.test(content.buttonLink)
  ) ? content.buttonLink : undefined;

  const isDark = content.theme === 'dark';
  const themeClasses = isDark 
    ? "bg-[#0b0c10] text-zinc-100 border-zinc-800" 
    : "bg-zinc-50 text-zinc-900 border-zinc-200";

  return (
    <section className={`relative w-full flex items-center overflow-hidden py-12 md:py-16 border-b ${themeClasses}`}>
      
      {/* Dynamic Angled Shape on the left */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 opacity-15 sm:w-1/3 sm:opacity-100 lg:w-[30%] z-0">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          className={`w-full h-full text-primary overflow-visible ${isDark ? 'drop-shadow-[10px_0_30px_rgba(26,136,248,0.15)]' : 'drop-shadow-[10px_0_30px_rgba(26,136,248,0.3)]'}`}
        >
          <polygon 
            points="-5,-5 100,50 -5,105 0,75 50,50 0,25" 
            fill="currentColor"
          />
        </svg>
        <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-black/50' : 'from-black/10'} to-transparent pointer-events-none`} />
      </div>

      <Container className="relative z-10 flex flex-col md:flex-row justify-end items-center" size="xl">
        <div className={`w-full sm:w-[85%] md:w-3/4 lg:w-[75%] sm:pl-16 md:pl-24 lg:pl-32 py-4 ${content.image ? 'grid lg:grid-cols-2 gap-x-8 items-start' : ''}`}>
          {content.image && <figure className={`min-w-0 mb-8 ${content.imagePosition === 'left' ? 'lg:col-start-1' : 'lg:col-start-2'} lg:row-start-1 lg:row-span-4`}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-primary/20 shadow-lg">
              <Image src={content.image} alt={content.imageAlt || content.heading} fill unoptimized className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
            {content.imageCaption && <figcaption className={`mt-3 text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{content.imageCaption}</figcaption>}
          </figure>}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
              {content.eyebrow || 'THE PLATFORM'}
            </p>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black font-display mb-6 leading-tight tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              {content.heading.split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? <span key={i} className="text-primary">{word}</span> : word + ' '
              )}
            </h2>
            
            {content.summary && <p className={`mb-5 text-lg leading-relaxed font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>{content.summary}</p>}
            <div className={`text-base md:text-lg leading-relaxed font-medium mb-8 max-w-3xl ${isDark ? 'text-zinc-400 [&_p]:text-zinc-400' : 'text-zinc-600 [&_p]:text-zinc-600'}`}>
              {content.bodyFormat === 'text' ? (
                <p className="whitespace-pre-line">{content.bodyText}</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: sanitizeContent(content.bodyText) }} />
              )}
            </div>
          </motion.div>

          {/* Highlights Grid matching CropifAI */}
          {highlights.length > 0 && (
            <div className={`grid grid-cols-1 ${content.image ? 'sm:grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-4 lg:gap-6 mb-8`}>
              {highlights.map((highlight, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className={`border rounded-xl p-5 shadow-lg transition-all group relative overflow-hidden ${
                    isDark 
                      ? 'bg-zinc-900/80 border-zinc-800 shadow-black/50 hover:border-primary/50 hover:shadow-primary/10' 
                      : 'bg-white border-zinc-100 shadow-zinc-200/50 hover:border-primary/30 hover:shadow-primary/5'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] transition-transform group-hover:scale-110 pointer-events-none" />
                  
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 relative z-10 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="text-xs font-bold font-mono">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className={`text-sm font-black uppercase tracking-widest mb-3 relative z-10 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    {highlight.title}
                  </h3>
                  {highlight.description && (
                    <p className={`text-sm font-medium leading-relaxed relative z-10 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {highlight.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Stats if available */}
          {stats.length > 0 && (
            <div className={`grid gap-4 mb-8 ${stats.length === 1 ? 'grid-cols-1' : stats.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="text-3xl md:text-4xl font-black text-primary">
                    {stat.value}
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          {content.buttonText && buttonLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6"
            >
              <a 
                href={buttonLink} 
                className="group relative overflow-hidden inline-flex items-center justify-center space-x-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold text-sm tracking-wide uppercase transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                {/* Tiny grid effect inside button */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:0.5rem_0.5rem] opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none" />
                
                <span className="relative z-10">{content.buttonText}</span>
                <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          )}
          
        </div>
      </Container>
    </section>
  );
}
