import sanitizeHtml from 'sanitize-html';

/** Shared by public rendering and the builder preview. */
export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'ul', 'ol', 'li', 'blockquote', 'h2', 'h3', 'h4', 'a', 'span', 'div', 'hr'],
    allowedAttributes: { a: ['href', 'title'], span: ['style'], p: ['style'], div: ['style'] },
    allowedStyles: {
      '*': {
        color: [/^#[0-9a-fA-F]{3,8}$/, /^rgb\(\d{1,3}, ?\d{1,3}, ?\d{1,3}\)$/],
        'background-color': [/^#[0-9a-fA-F]{3,8}$/, /^rgb\(\d{1,3}, ?\d{1,3}, ?\d{1,3}\)$/],
        'font-size': [/^(?:1[2-9]|[2-8]\d|9[0-6])px$/],
        'text-align': [/^(?:left|center|right)$/],
      },
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowProtocolRelative: false,
  });
}
