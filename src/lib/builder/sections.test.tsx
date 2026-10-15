import ChallengeSection from '@/components/solutions/ChallengeSection';
import type { ChallengeContent } from '@/types/section';
import CustomSection from '@/components/solutions/CustomSection';
import VideoSection from '@/components/solutions/VideoSection';
import ImageSection from '@/components/solutions/ImageSection';
import { makePreset } from './catalog';
import type { CustomContent, ImageSectionContent } from '@/types/section';
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
    expect(html.replace(/<[^>]*>/g, '')).toContain('Quantifiable Industrial Impact');
  });

  it('renders every challenge in normal document flow without a viewport-height spacer', () => {
    const section = makeSection(SectionType.CHALLENGE);
    const content = section.content as unknown as ChallengeContent;
    content.challenges = Array.from({ length: 12 }, (_, index) => ({ title: `Problem ${index + 1}`, description: 'An editable customer challenge.' }));
    const html = renderToStaticMarkup(<ChallengeSection content={content} />);
    expect(html.match(/<article/g)).toHaveLength(12);
    expect(html).not.toContain('vh');
    expect(html).not.toContain('position:absolute');
  });
  it('renders FAQs as accessible disclosures and resource links as safe destinations', () => {
    const section = makePreset('faq');
    const html = renderToStaticMarkup(<CustomSection content={section.content as unknown as CustomContent} />);
    expect(html.match(/<details/g)).toHaveLength(3);
    expect(html).toContain('<summary');
    const resource = makePreset('resources');
    (resource.content.entries as { link: string }[])[0].link = 'javascript:alert(1)';
    expect(renderToStaticMarkup(<CustomSection content={resource.content as unknown as CustomContent} />)).not.toContain('javascript:');
  });
  it('uses allowed video embeds and preserves a full width player in split layouts', () => {
    const html = renderToStaticMarkup(<VideoSection content={{ videoUrl: 'https://youtu.be/dQw4w9WgXcQ', layout: 'split-right' }} />);
    expect(html).toContain('aria-label="Play Solution video"');
    expect(html).not.toContain('<iframe');
    expect(html).toContain('w-full mx-auto');
    expect(html).toContain('grid lg:grid-cols-2');
  });
  it('renders empty video slots as labelled boxes without unrelated videos', () => {
    const section = makePreset('video-cards');
    const html = renderToStaticMarkup(<CustomSection content={section.content as unknown as CustomContent} />);
    expect(html.match(/aria-label="Video placeholder, 16:9"/g)).toHaveLength(3);
    expect(html).not.toContain('<video');
    expect(html).not.toContain('mobile_mockup');
  });
  it('uses the site heading scale and neutral ratio labels for visual card sections', () => {
    const section = makePreset('overlay-cards');
    const html = renderToStaticMarkup(<CustomSection content={section.content as unknown as CustomContent} />);
    expect(html).toContain('lg:text-5xl');
    expect(html).toContain('font-black');
    expect(html).toContain('1200'); // neutral media guidance remains readable in the placeholder
    expect(html).not.toContain('builder-samples');
    expect(html).toContain('is-overlay');
  });
  it('keeps architecture images at their natural aspect ratio without cropping', () => {
    const section = makeSection(SectionType.IMAGE);
    const html = renderToStaticMarkup(<ImageSection content={section.content as unknown as ImageSectionContent} />);
    expect(html).toContain('w-full h-auto object-contain');
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
