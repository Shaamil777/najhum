/**
 * TestimonialsSection Component
 * 
 * Public-facing testimonials section for solution pages.
 * Displays testimonials in card grid layout with avatars.
 */

import Image from 'next/image';
import type { TestimonialsContent } from '@/types/section';

interface TestimonialsSectionProps {
  content: TestimonialsContent;
}

export default function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const { testimonials } = content;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md"
            >
              {/* Quote */}
              <div className="mb-6">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  {testimonial.quote}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                {testimonial.avatar ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                      sizes="48px"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Name and Title */}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                    {testimonial.company && (
                      <span> at {testimonial.company}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}