import { describe, expect, it } from 'vitest';
import { builderDocumentSchema } from './document';
import { makeSection, makeTemplate, previewDocument, sectionLibrary } from './catalog';
import { SectionType } from '@/types/section';

describe('solution builder documents', () => {
  it('supports every library section and both starter templates', () => {
    for (const item of sectionLibrary) expect(builderDocumentSchema.safeParse({ ...previewDocument(), sections: [makeSection(item.type)] }).success, item.type).toBe(true);
    for (const kind of ['overview', 'full'] as const) expect(builderDocumentSchema.safeParse({ ...previewDocument(), sections: makeTemplate(kind) }).success).toBe(true);
  });
  it('removes empty optional images while preserving responsive design and hidden sections', () => {
    const section = makeSection(SectionType.HERO);
    section.content.backgroundImage = '';
    section.isDraft = true; section.design = { headingSize: 72, mobileHeadingSize: 30, mobilePaddingY: 0, hideOnDesktop: true };
    const parsed = builderDocumentSchema.parse({ ...previewDocument(), sections: [section] });
    expect(parsed.sections[0].content).not.toHaveProperty('backgroundImage');
    expect(parsed.sections[0]).toMatchObject({ isDraft: true, design: section.design });
  });
  it('rejects unsafe destinations, duplicate section identities, and invalid styling', () => {
    const doc = previewDocument();
    doc.sections[0].content.ctaLink = 'javascript:alert(1)';
    expect(builderDocumentSchema.safeParse(doc).success).toBe(false);
    doc.sections[0].content.ctaLink = '/contact';
    doc.sections.push(doc.sections[0]);
    expect(builderDocumentSchema.safeParse(doc).success).toBe(false);
    doc.sections.pop(); doc.sections[0].design.background = 'url(https://example.test)';
    expect(builderDocumentSchema.safeParse(doc).success).toBe(false);
  });
  it('rejects empty required content with an actionable section field path', () => {
    const doc = previewDocument(); doc.sections[0].content.heading = '';
    const result = builderDocumentSchema.safeParse(doc);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues[0].path).toEqual(['sections', 0, 'content', 'heading']);
  });
});
