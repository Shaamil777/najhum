import { sanitizeContent } from '@/lib/utils/sanitize-content';

export function plainText(value: string) { return value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'); }
export default function RichText({ value, as = 'span', className = '' }: { value: string; as?: 'span' | 'div'; className?: string }) {
  const Tag = as;
  const html = sanitizeContent(value);
  const renderedHtml = as === 'span' ? html.replace(/<\/(?:p|div|ul|ol|li|blockquote|h3|h4)>/gi, '<br>').replace(/<(?:p|div|ul|ol|li|blockquote|h3|h4)(?:\s[^>]*)?>/gi, '') : html;
  return /<\/?[a-z][\s\S]*>/i.test(value) ? <Tag className={`rich-text ${className}`} dangerouslySetInnerHTML={{ __html: renderedHtml }} /> : <Tag className={`rich-text whitespace-pre-line ${className}`}>{value}</Tag>;
}
export function AccentHeading({ value }: { value: string }) {
  if (/<\/?[a-z][\s\S]*>/i.test(value)) return <RichText value={value} />;
  const words = value.split(' ');
  return <>{words.slice(0, -1).join(' ')}{words.length > 1 ? ' ' : ''}<span className="text-primary">{words[words.length - 1]}</span></>;
}
