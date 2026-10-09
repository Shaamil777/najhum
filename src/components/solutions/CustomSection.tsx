/**
 * CustomSection Component
 * 
 * Public-facing custom HTML section for solution pages.
 * Displays heading and custom HTML content with prose styling.
 */

import type { CustomContent } from '@/types/section';
import { sanitizeContent } from '@/lib/utils/sanitize-content';

interface CustomSectionProps {
  content: CustomContent;
}

export default function CustomSection({ content }: CustomSectionProps) {
  const { heading, bodyHtml } = content;

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          {heading}
        </h2>
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizeContent(bodyHtml) }}
        />
      </div>
    </section>
  );
}
