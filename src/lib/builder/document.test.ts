import { describe, expect, it } from 'vitest';
import { builderDocumentSchema } from './document';
import { makeSection, makeTemplate, previewDocument, sectionLibrary, sectionPresets, makePreset, pageTemplates, editableContent } from './catalog';
import { SectionType } from '@/types/section';

describe('solution builder documents', () => {
  it('supports every library section, ready-made section, and page template', () => {
    for (const item of sectionLibrary) expect(builderDocumentSchema.safeParse({ ...previewDocument(), sections: [makeSection(item.type)] }).success, item.type).toBe(true);
    for (const preset of sectionPresets) expect(builderDocumentSchema.safeParse({ ...previewDocument(), sections: [makePreset(preset.id)] }).success, preset.id).toBe(true);
    for (const template of pageTemplates) expect(builderDocumentSchema.safeParse({ ...previewDocument(), sections: makeTemplate(template.id) }).success, template.id).toBe(true);
  });
  it('preserves editable structured sections through save normalization and creates independent templates', () => {
    const original = makeTemplate('healthcare');
    const saved = builderDocumentSchema.parse({ ...previewDocument(), sections: original });
    const faq = saved.sections.find(section => section.content.layout === 'faq')!;
    expect(faq.content.entries).toHaveLength(3);
    expect(saved.sections.find(section => section.type === SectionType.IMAGE)?.content).toMatchObject({ fit: 'contain', aspectRatio: 'auto' });
    const fresh = makeTemplate('healthcare');
    expect(fresh.map(section => section.id).some(id => original.some(section => section.id === id))).toBe(false);
    original[0].content.heading = 'Edited by the client';
    expect(fresh[0].content.heading).toBe('Connected facilities. Better care environments.');
  });
  it('preserves all hero variants and visual template settings through saving', () => {
    for (const id of ['hero-split', 'hero-video', 'hero-editorial'] as const) {
      const section = makePreset(id);
      const parsed = builderDocumentSchema.parse({ ...previewDocument(), sections: [section] });
      expect(parsed.sections[0].type).toBe(SectionType.HERO);
      expect(parsed.sections[0].content.layout).toBe(id);
      if (id === 'hero-editorial') expect((editableContent(parsed.sections[0]).mediaCards as { image: string }[]).every(card => card.image === '')).toBe(true);
    }
    const parsed = builderDocumentSchema.parse({ ...previewDocument(), sections: makeTemplate('dark-showcase') });
    expect(parsed.sections.filter(section => section.type === SectionType.CUSTOM).every(section => section.content.theme === 'dark')).toBe(true);
    for (const id of ['visual-overview', 'image-editorial', 'video-showcase', 'dark-showcase', 'application-gallery'] as const) {
      const serialized = JSON.stringify(makeTemplate(id));
      expect(serialized).not.toContain('/builder-samples/');
      expect(serialized).not.toContain('mobile_mockup');
    }
  });
  it('validates nested resource destinations and media', () => {
    const resource = makePreset('resources');
    (resource.content.entries as { link: string }[])[0].link = 'javascript:alert(1)';
    expect(builderDocumentSchema.safeParse({ ...previewDocument(), sections: [resource] }).success).toBe(false);
    const project = makePreset('case-studies');
    (project.content.entries as { image: string }[])[0].image = '//unsafe.test/image.jpg';
    expect(builderDocumentSchema.safeParse({ ...previewDocument(), sections: [project] }).success).toBe(false);
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
  it('accepts empty optional section fields while retaining required page identity', () => {
    const doc = previewDocument();
    doc.sections[0].content.heading = ''; doc.sections[0].content.subheading = ''; doc.sections[0].content.ctaText = ''; doc.sections[0].content.ctaLink = '';
    expect(builderDocumentSchema.safeParse(doc).success).toBe(true);
    doc.title = ''; expect(builderDocumentSchema.safeParse(doc).success).toBe(false);
  });
});
