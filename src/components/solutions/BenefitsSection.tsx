import RichText, { AccentHeading } from './RichText';
import Image from 'next/image';
import type { BenefitsContent } from '@/types/section';

interface BenefitsSectionProps {
  content: BenefitsContent;
}

export default function BenefitsSection({ content }: BenefitsSectionProps) {
  const { eyebrow, heading, subheading, benefits = [] } = content;

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-zinc-200/80 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || heading || subheading) && (
          <div className="max-w-3xl mb-16">
            {eyebrow && (
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4 uppercase">
                <AccentHeading value={heading} />
              </h2>
            )}
            {subheading && (
              <div className="text-zinc-600 text-base md:text-lg leading-relaxed font-medium">
                <RichText as="div" value={subheading} />
              </div>
            )}
          </div>
        )}

        <div className="space-y-8 lg:space-y-12">
          {benefits.map((benefit, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={index}
                className={`grid grid-cols-1 ${benefit.image ? 'lg:grid-cols-2' : ''} gap-6 lg:gap-10 items-center ${isReversed && benefit.image ? 'lg:grid-flow-dense' : ''}`}
              >
                {/* Text Content */}
                <div className={isReversed && benefit.image ? 'lg:col-start-2' : ''}>
                  {/* Metric Pill if present */}
                  {benefit.metricValue && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-wider uppercase mb-4 border border-primary/20">
                      <span>{benefit.metricValue}</span>
                      {benefit.metricLabel && (
                        <span className="text-zinc-500 font-medium normal-case">— {benefit.metricLabel}</span>
                      )}
                    </div>
                  )}

                  <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 mb-4 tracking-tight">
                    <RichText value={benefit.title} />
                  </h3>
                  <div className="text-base sm:text-lg text-zinc-600 leading-relaxed font-medium">
                    <RichText as="div" value={benefit.description} />
                  </div>
                </div>

                {/* Image */}
                {benefit.image && (
                  <div className={`relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg border border-zinc-200/80 bg-zinc-50 ${isReversed ? 'lg:col-start-1' : ''}`}>
                    <Image
                      unoptimized
                      src={benefit.image}
                      alt={benefit.title.replace(/<[^>]*>/g, '')}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}