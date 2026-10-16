import { describe, expect, it } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import documents from '@/content/industry-solutions.json';
import { builderDocumentSchema } from './document';
import { makePreset, makeTemplate } from './catalog';
import { SectionType, type CustomContent } from '@/types/section';
import CustomSection from '@/components/solutions/CustomSection';

describe('industry solution designs', () => {
  it('validates all five editable page templates and gives each a distinct composition', () => {
    expect(documents).toHaveLength(5);
    const compositions = new Set<string>();
    for (const document of documents) {
      const parsed = builderDocumentSchema.safeParse(document);
      expect(parsed.success, JSON.stringify(parsed.success ? document.slug : parsed.error.issues)).toBe(true);
      const template = makeTemplate(document.slug as Parameters<typeof makeTemplate>[0]);
      expect(template).toHaveLength(document.sections.length);
      expect(template.some(section => section.content.layout === 'faded-image-cards')).toBe(true);
      expect(template.some(section => section.content.layout === 'image-banner')).toBe(true);
      compositions.add(template.map(section => section.content.layout || section.type).join(','));
    }
    expect(compositions.size).toBe(5);
  });
  it('keeps the 31 application topics accessible in expandable sections', () => {
    const applications = (slug: string) => documents.find(doc => doc.slug === slug)!.sections.find(section => section.content.layout === 'faq')!.content.entries;
    expect(applications('facilities-management')).toHaveLength(9);
    expect(applications('hospitality')).toHaveLength(11);
    expect(applications('industrial')).toHaveLength(11);
  });
  it('renders the industrial measurement table with native headers and every row', () => {
    const section = makeTemplate('industrial').find(section => section.content.layout === 'table')!;
    const html = renderToStaticMarkup(<CustomSection content={section.content as unknown as CustomContent}/>);
    expect(html).toContain('scope="col"');
    expect(html).toContain('Are fuel records consistent?');
    expect(html).toContain('Readiness checks and operating history');
    expect(section.content.tableRows).toHaveLength(6);
  });
  it('preserves background image, overlay style, editable links and image cards through saving', () => {
    for (const id of ['image-banner', 'image-banner-side', 'faded-image-cards'] as const) {
      const section = makePreset(id);
      if (id !== 'faded-image-cards') section.content.backgroundImage = '/solutions/hospitality.jpg';
      const saved = builderDocumentSchema.parse({ title: 'Visual page', slug: 'visual-page', metaDescription: '', sections: [section] });
      expect(saved.sections[0].content.layout).toBe(section.content.layout);
      if (id !== 'faded-image-cards') {
        expect(saved.sections[0].content.overlayStyle).toBe(id === 'image-banner-side' ? 'side' : 'full');
        expect(saved.sections[0].content.backgroundImage).toBe('/solutions/hospitality.jpg');
      }
    }
  });
  it('renders About-style images with readable copy, links and optional empty content', () => {
    const section = makeTemplate('hospitality').find(section => section.content.layout === 'faded-image-cards')!;
    const html = renderToStaticMarkup(<CustomSection content={section.content as unknown as CustomContent}/>);
    expect(html).toContain('solution-faded-photo');
    expect(html).toContain('/solutions/hospitality.jpg');
    expect(html).toContain('Spaces that feel right');
    expect(html).toContain('href="/contact"');
    const blank = makePreset('image-banner');
    blank.content.heading = ''; blank.content.bodyHtml = ''; blank.content.buttonLink = ''; blank.content.buttonText = '';
    expect(builderDocumentSchema.safeParse({ title: 'Optional', slug: 'optional', sections: [blank] }).success).toBe(true);
  });
  it('allows optional statistics and empty application details', () => {
    const document = { title: 'Optional page', slug: 'optional-page', sections: [{ id: 'optional', type: SectionType.USE_CASES, isDraft: false, design: {}, content: { heading: '', tabs: [{ id: 'app', label: '', solutionDetails: '', statValue: '', statDescription: '', bullets: [] }] } }] };
    expect(builderDocumentSchema.safeParse(document).success).toBe(true);
  });
});
