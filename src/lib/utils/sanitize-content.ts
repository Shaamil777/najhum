import sanitizeHtml from 'sanitize-html';

/** Shared by public rendering and the builder preview. */
export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'ul', 'ol', 'li', 'blockquote', 'h3', 'h4', 'a', 'span', 'div', 'hr'],
    allowedAttributes: { a: ['href', 'title'] },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowProtocolRelative: false,
  });
}
