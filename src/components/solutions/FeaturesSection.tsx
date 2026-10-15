import RichText, { AccentHeading } from './RichText';
import type { FeaturesContent } from '@/types/section';

interface FeaturesSectionProps {
  content: FeaturesContent;
}

export default function FeaturesSection({ content }: FeaturesSectionProps) {
  const { eyebrow, heading, subheading, features = [] } = content;

  return (
    <section className="py-20 lg:py-28 bg-zinc-50 border-b border-zinc-200/80 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || heading || subheading) && (
          <div className="max-w-3xl mb-14">
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

        <div className="solution-card-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-7 border border-zinc-200 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Brand Primary Icon Badge */}
                {feature.icon && (
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-200 shadow-xs">
                    <span className="text-xl font-bold">
                      {feature.icon}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-primary transition-colors">
                  <RichText value={feature.title} />
                </h3>

                {/* Description */}
                <div className="text-zinc-600 text-sm md:text-base leading-relaxed font-medium">
                  <RichText as="div" value={feature.description} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}