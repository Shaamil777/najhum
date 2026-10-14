"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
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

  return (
    <section 
      className={`relative w-full py-20 lg:py-28 overflow-hidden transition-colors ${
        isDark 
          ? "bg-neutral-950 text-white border-b border-neutral-800" 
          : "bg-white text-neutral-900 border-b border-neutral-200"
      }`}
    >
      {/* Ambient Backdrop Accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className={`absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20 ${
            isDark ? 'bg-primary' : 'bg-primary/60'
          }`} 
        />
        <div 
          className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:3rem_3rem]" 
        />
      </div>

      <Container className="relative z-10" size="xl">
        {content.image ? (
          /* Two-Column Layout (Content + Image) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Media Column */}
            <div 
              className={`lg:col-span-5 ${
                content.imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden rounded-3xl border border-primary/20 shadow-2xl shadow-primary/10">
                  <Image
                    src={content.image}
                    alt={content.imageAlt || content.heading}
                    fill
                    unoptimized
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent pointer-events-none" />
                </div>
                {content.imageCaption && (
                  <p className={`mt-3 text-xs leading-relaxed text-center ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {content.imageCaption}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Editorial Text Column */}
            <div 
              className={`lg:col-span-7 flex flex-col justify-center ${
                content.imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Eyebrow Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-bold tracking-widest uppercase text-primary mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{content.eyebrow || 'THE SOLUTION'}</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] uppercase font-display [text-wrap:balance]">
                  {content.heading}
                </h2>

                {/* Summary */}
                {content.summary && (
                  <p className={`mt-5 text-lg sm:text-xl font-medium leading-relaxed [text-wrap:pretty] ${
                    isDark ? 'text-neutral-200' : 'text-neutral-800'
                  }`}>
                    {content.summary}
                  </p>
                )}

                {/* Main Body */}
                <div className={`mt-4 text-base sm:text-lg leading-relaxed ${
                  isDark ? 'text-neutral-400 [&_p]:text-neutral-400' : 'text-neutral-600 [&_p]:text-neutral-600'
                }`}>
                  {content.bodyFormat === 'text' ? (
                    <p className="whitespace-pre-line">{content.bodyText}</p>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: sanitizeContent(content.bodyText) }} />
                  )}
                </div>

                {/* Stats Row */}
                {stats.length > 0 && (
                  <div className={`grid gap-6 pt-8 mt-8 border-t ${
                    isDark ? 'border-neutral-800' : 'border-neutral-200'
                  } ${
                    stats.length === 1 ? 'grid-cols-1' : stats.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'
                  }`}>
                    {stats.map((stat, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="text-3xl sm:text-4xl font-extrabold font-mono text-primary tracking-tight">
                          {stat.value}
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-wider mt-1 ${
                          isDark ? 'text-neutral-400' : 'text-neutral-500'
                        }`}>
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                {content.buttonText && buttonLink && (
                  <div className="mt-8">
                    <a
                      href={buttonLink}
                      className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-hover text-white px-7 py-3.5 rounded-lg font-bold text-sm tracking-wide uppercase transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>{content.buttonText}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        ) : (
          /* Clean Centered Editorial Layout (No Image) */
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-bold tracking-widest uppercase text-primary mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{content.eyebrow || 'THE SOLUTION'}</span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] uppercase font-display max-w-3xl [text-wrap:balance]">
                {content.heading}
              </h2>

              {/* Summary */}
              {content.summary && (
                <p className={`mt-6 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl [text-wrap:pretty] ${
                  isDark ? 'text-neutral-200' : 'text-neutral-800'
                }`}>
                  {content.summary}
                </p>
              )}

              {/* Body Text */}
              <div className={`mt-4 text-base sm:text-lg leading-relaxed max-w-2xl ${
                isDark ? 'text-neutral-400 [&_p]:text-neutral-400' : 'text-neutral-600 [&_p]:text-neutral-600'
              }`}>
                {content.bodyFormat === 'text' ? (
                  <p className="whitespace-pre-line">{content.bodyText}</p>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: sanitizeContent(content.bodyText) }} />
                )}
              </div>

              {/* Stats Row */}
              {stats.length > 0 && (
                <div className={`grid gap-8 pt-10 mt-10 border-t w-full max-w-2xl ${
                  isDark ? 'border-neutral-800' : 'border-neutral-200'
                } ${
                  stats.length === 1 ? 'grid-cols-1' : stats.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                }`}>
                  {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-primary tracking-tight">
                        {stat.value}
                      </span>
                      <span className={`text-xs font-bold uppercase tracking-wider mt-1.5 ${
                        isDark ? 'text-neutral-400' : 'text-neutral-500'
                      }`}>
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Button */}
              {content.buttonText && buttonLink && (
                <div className="mt-10">
                  <a
                    href={buttonLink}
                    className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-bold text-sm tracking-wide uppercase transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>{content.buttonText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Highlights Grid (Balanced Symmetrical Heights with mt-16) */}
        {highlights.length > 0 && (
          <div className="mt-16 pt-12 border-t border-dashed border-neutral-500/20">
            <div className={`grid gap-6 ${
              highlights.length === 1
                ? 'grid-cols-1 max-w-md mx-auto'
                : highlights.length === 2
                ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                : highlights.length === 3
                ? 'grid-cols-1 md:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}>
              {highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className={`h-full flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden ${
                    isDark
                      ? 'bg-neutral-900/70 border-neutral-800 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10'
                      : 'bg-white border-neutral-200 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5'
                  }`}
                >
                  <div>
                    {/* Index Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
                    </div>

                    {/* Card Title (2 lines clamp) */}
                    <h3 className={`text-base font-bold uppercase tracking-tight line-clamp-2 ${
                      isDark ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {highlight.title}
                    </h3>

                    {/* Card Description (4 lines clamp) */}
                    {highlight.description && (
                      <p className={`mt-2 text-sm leading-relaxed line-clamp-4 ${
                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        {highlight.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
