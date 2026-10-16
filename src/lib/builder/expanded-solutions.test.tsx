import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import solutions from '@/content/expanded-solutions.json';
import products from '@/content/brochure-products.json';
import { builderDocumentSchema } from './document';
import { makeTemplate, type PageTemplateId } from './catalog';

describe('catalogue expansion', () => {
  it('validates ten independently editable templates with distinct images and compositions', () => {
    expect(solutions).toHaveLength(10);
    expect(new Set(solutions.map(doc => doc.coverImage)).size).toBe(10);
    expect(new Set(solutions.map(doc => doc.sections.map(section => section.content.layout || section.type).join(','))).size).toBe(10);
    for (const doc of solutions) {
      const parsed = builderDocumentSchema.safeParse(doc);
      expect(parsed.success, JSON.stringify(parsed.success ? doc.slug : parsed.error.issues)).toBe(true);
      expect(existsSync(path.join(process.cwd(), 'public', doc.coverImage))).toBe(true);
      expect(doc.platforms.every(platform => ['iotrics', 'evoltics', 'cropifai'].includes(platform))).toBe(true);
      const first = makeTemplate(doc.slug as PageTemplateId), second = makeTemplate(doc.slug as PageTemplateId);
      expect(first).toHaveLength(doc.sections.length);
      expect(first[0].id).not.toBe(second[0].id);
      first[0].content.heading = 'Client edit';
      expect(second[0].content.heading).toBe(doc.sections[0].content.heading);
      expect(first.some(section => section.content.layout === 'image-banner')).toBe(true);
      expect(first.some(section => section.content.layout === 'table')).toBe(doc.slug !== 'ev-charging');
    }
  });
  it('accounts for every brochure once and keeps similarly named models distinct', () => {
    expect(products).toHaveLength(30);
    const files = products.flatMap(product => product.sourceFiles);
    expect(files).toHaveLength(31); expect(new Set(files).size).toBe(31);
    expect(new Set(products.map(product => product.id)).size).toBe(30);
    expect(products.find(product => product.key === 'nu03-controller')!.sourceFiles).toHaveLength(2);
    for (const key of ['nt400-rodent', 'nt400-udl', 'nu03-controller', 'nt-u03', 'nt3xx', 'nctx']) expect(products.some(product => product.key === key)).toBe(true);
    for (const product of products) {
      expect(product.details.specs.length).toBeGreaterThan(5);
      expect(product.details.images).toEqual([]);
      expect(product.imageUrl).toBe('/products/product-image-placeholder.svg');
      expect(product.brochureUrl).toBeNull();
      expect(product.solutions.every(slug => [...solutions.map(doc => doc.slug), 'facilities-management', 'hospitality', 'cold-storage', 'industrial', 'energy-monitoring'].includes(slug))).toBe(true);
    }
  });
});
