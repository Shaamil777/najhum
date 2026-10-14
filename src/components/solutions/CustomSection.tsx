import RichText, { AccentHeading } from './RichText';
import type { CustomContent } from '@/types/section';
import { sanitizeContent } from '@/lib/utils/sanitize-content';

interface CustomSectionProps {
  content: CustomContent;
}

export default function CustomSection({ content }: CustomSectionProps) {
  const { heading, bodyHtml } = content;

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-zinc-200/80 overflow-hidden font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-8 uppercase">
            <AccentHeading value={heading} />
          </h2>
        )}
        <div
          className="rich-text prose prose-lg max-w-none text-zinc-600 leading-relaxed font-medium"
          dangerouslySetInnerHTML={{ __html: sanitizeContent(bodyHtml) }}
        />
      </div>
    </section>
  );
}
