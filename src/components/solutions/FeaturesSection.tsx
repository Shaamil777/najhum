/**
 * FeaturesSection Component
 * 
 * Public-facing features section for solution pages.
 * Displays features in responsive grid layout with icons, titles, and descriptions.
 */

import type { FeaturesContent } from '@/types/section';

interface FeaturesSectionProps {
  content: FeaturesContent;
}

export default function FeaturesSection({ content }: FeaturesSectionProps) {
  const { features } = content;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Icon */}
              {feature.icon && (
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </span>
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}