/**
 * BenefitsSection Component
 * 
 * Public-facing benefits section for solution pages.
 * Displays benefits in alternating layout with images.
 */

import Image from 'next/image';
import type { BenefitsContent } from '@/types/section';

interface BenefitsSectionProps {
  content: BenefitsContent;
}

export default function BenefitsSection({ content }: BenefitsSectionProps) {
  const { benefits } = content;

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ' + (index % 2 === 1 ? 'lg:flex-row-reverse' : '')}
            >
              {/* Text Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>

              {/* Image */}
              {benefit.image && (
                <div className={'relative h-80 rounded-lg overflow-hidden shadow-lg ' + (index % 2 === 1 ? 'lg:order-1' : '')}>
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}