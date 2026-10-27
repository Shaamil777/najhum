import sanitizeHtml from 'sanitize-html';
export function sanitizeBlogContent(value: string) {
    return sanitizeHtml(value, {
        allowedTags: ['p', 'br', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 's', 'blockquote', 'ul', 'ol', 'li', 'a', 'hr', 'pre', 'code', 'img', 'figure', 'figcaption'],
        allowedAttributes: { a: ['href', 'title', 'rel'], img: ['src', 'alt', 'width', 'height', 'loading'] },
        allowedSchemes: ['http', 'https', 'mailto', 'tel'], allowProtocolRelative: false,
        transformTags: { a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }), img: sanitizeHtml.simpleTransform('img', { loading: 'lazy' }) },
    });
}
export function articleText(value: string) { return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).replace(/&nbsp;/g, ' ').trim(); }
export function readingMinutes(value: string) { return Math.max(1, Math.ceil(articleText(value).split(/\s+/).filter(Boolean).length / 220)); }


export interface ArticleHeading { id: string; text: string; level: number }
function decodeHeading(value: string) {
  return value.replace(/&(amp|lt|gt|quot|apos|nbsp);|&#(x[0-9a-f]+|[0-9]+);/gi, (_, entity: string, numeric: string) => {
    if (entity) return ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' } as Record<string, string>)[entity.toLowerCase()];
    const point = numeric[0].toLowerCase() === 'x' ? Number.parseInt(numeric.slice(1), 16) : Number.parseInt(numeric, 10);
    return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : '';
  });
}
export function presentArticle(value: string) {
  const headings: ArticleHeading[] = [];
  const html = sanitizeBlogContent(value).replace(/<h([23])>([\s\S]*?)<\/h\1>/gi, (whole, level: string, content: string) => {
    const text = decodeHeading(articleText(content));
    if (!text) return whole;
    const id = `article-section-${headings.length + 1}`;
    headings.push({ id, text, level: Number(level) });
    return `<h${level} id="${id}" tabindex="-1">${content}</h${level}>`;
  });
  return { html, headings };
}
