import RichText from './RichText';
import Image from 'next/image';
import type { TestimonialsContent } from '@/types/section';

interface TestimonialsSectionProps {
  content: TestimonialsContent;
}

export default function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const { testimonials = [] } = content;

  return (
    <section className="py-20 lg:py-28 bg-zinc-50 border-b border-zinc-200/80 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
            CUSTOMER SUCCESS
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4 uppercase">
            Proven Results From Field Implementations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Quote */}
              <div className="mb-6">
                <svg
                  className="w-8 h-8 text-primary mb-4 opacity-80"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className="text-zinc-700 font-medium leading-relaxed italic text-base">
                  <RichText as="div" value={testimonial.quote} />
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-100">
                {/* Avatar */}
                {testimonial.avatar ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-primary/20">
                    <Image
                      unoptimized
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                      sizes="48px"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold text-base border border-primary/20">
                    {testimonial.author.charAt(0)}
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-zinc-900 text-sm">
                    {testimonial.author}
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-0.5">
                    {testimonial.role} · {testimonial.company}
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