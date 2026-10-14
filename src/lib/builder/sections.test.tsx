import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  SectionType,
  type ComparisonTableSectionContent,
  type ProductCardSectionContent,
  type GraphSectionContent,
} from '@/types/section';
import { makeSection, previewDocument } from './catalog';
import { builderDocumentSchema } from './document';
import { embedVideoUrl, isSafeMediaUrl } from '@/lib/utils/content-url';
import GraphSection from '@/components/solutions/GraphSection';
import ComparisonTableSection from '@/components/solutions/ComparisonTableSection';
import ProductCardSection from '@/components/solutions/ProductCardSection';

describe('solution section validation and rendering with earlier section types', () => {
  it('validates comparison table document schema and renders side-by-side comparison', () => {
    const section = makeSection(SectionType.COMPARISON_TABLE);
    const document = { ...previewDocument(), sections: [section] };
    expect(builderDocumentSchema.safeParse(document).success).toBe(true);
    const html = renderToStaticMarkup(<ComparisonTableSection content={section.content as unknown as ComparisonTableSectionContent} />);
    expect(html).toContain('Traditional');
  });

  it('uses product IDs and renders product cards', () => {
    const products = [{ id: 'real-product', name: 'Smart sensor', description: 'Live product', imageUrl: '/builder-samples/sensor.svg', brochureUrl: null }];
    const section = makeSection(SectionType.PRODUCT_CARD, products);
    expect(section.content.productIds).toEqual(['real-product']);
    const html = renderToStaticMarkup(<ProductCardSection content={section.content as unknown as ProductCardSectionContent} products={products} />);
    expect(html).toContain('href="/products/real-product"');
    expect(html).toContain('Smart sensor');
  });

  it('validates graph section document schema and renders data points and metrics', () => {
    const section = makeSection(SectionType.GRAPH);
    const document = { ...previewDocument(), sections: [section] };
    expect(builderDocumentSchema.safeParse(document).success).toBe(true);
    const html = renderToStaticMarkup(<GraphSection content={section.content as unknown as GraphSectionContent} />);
    expect(html).toContain('PERFORMANCE METRICS');
    expect(html).toContain('Quantifiable Industrial Impact');
  });

  it('rejects arbitrary embed hosts and unsafe media while preserving local media', () => {
    expect(embedVideoUrl('youtube', 'https://youtu.be/dQw4w9WgXcQ')).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
    expect(embedVideoUrl('vimeo', 'https://vimeo.com/123456')).toBe('https://player.vimeo.com/video/123456');
    expect(embedVideoUrl('youtube', 'https://youtube.com.attacker.test/watch?v=dQw4w9WgXcQ')).toBeNull();
    expect(embedVideoUrl('vimeo', 'javascript:alert(1)')).toBeNull();
    expect(isSafeMediaUrl('/videos/hero-bg-video.mp4')).toBe(true);
    for (const url of ['javascript:alert(1)', '//attacker.test/a.jpg', '/\\attacker.test/a.jpg', 'data:image/svg+xml,test']) expect(isSafeMediaUrl(url)).toBe(false);
  });
});
