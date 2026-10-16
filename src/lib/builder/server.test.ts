import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SectionType } from '@/types/section';
import { makeSection, previewDocument } from './catalog';
import { draftKey } from './document';

const db = vi.hoisted(() => ({
  solution: { findUnique: vi.fn(), findUniqueOrThrow: vi.fn(), update: vi.fn() },
  section: { deleteMany: vi.fn(), createMany: vi.fn() },
  pageContent: { findUnique: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() },
  product: { findMany: vi.fn(), update: vi.fn() },
  $transaction: vi.fn(),
}));
vi.mock('@/lib/db/prisma', () => ({ prisma: db }));
import { discardBuilderDraft, getBuilderSession, liveRevision, saveBuilderDocument } from './server';

const fixture = () => ({ id: 'solution-1', title: 'Live title', slug: 'live-title', metaDescription: 'Live description', isDraft: false, createdAt: new Date('2026-01-01'), updatedAt: new Date('2026-01-01'), sections: [{ id: 'section-1', solutionId: 'solution-1', type: SectionType.HERO, order: 0, isDraft: false, content: { heading: 'Live heading', subheading: 'Live subtitle', ctaText: 'Contact', ctaLink: '/contact' }, createdAt: new Date('2026-01-01'), updatedAt: new Date('2026-01-01') }] });

beforeEach(() => {
  vi.resetAllMocks();
  db.$transaction.mockImplementation(async (callback: (tx: typeof db) => Promise<unknown>) => callback(db));
  db.solution.findUnique.mockResolvedValue(fixture());
  db.solution.findUniqueOrThrow.mockResolvedValue(fixture());
  db.pageContent.findUnique.mockResolvedValue(null);
  db.product.findMany.mockResolvedValue([]);
});

describe('draft and publish boundaries', () => {
  it('imports the current page without writing a draft or touching live content', async () => {
    const session = await getBuilderSession('solution-1');
    expect(session.document.sections[0].content.heading).toBe('Live heading');
    expect(session.version).toBe(0); expect(session.isPublished).toBe(true);
    expect(db.pageContent.create).not.toHaveBeenCalled(); expect(db.solution.update).not.toHaveBeenCalled();
  });
  it('saves a separate draft and never updates published metadata or sections', async () => {
    await saveBuilderDocument('solution-1', { document: previewDocument(), version: 0, baseRevision: liveRevision(fixture()), action: 'save' });
    expect(db.pageContent.create).toHaveBeenCalledWith({ data: expect.objectContaining({ slug: draftKey('solution-1'), content: expect.objectContaining({ version: 1 }) }) });
    expect(db.solution.update).not.toHaveBeenCalled(); expect(db.section.deleteMany).not.toHaveBeenCalled(); expect(db.section.createMany).not.toHaveBeenCalled();
  });
  it('rejects stale drafts and concurrent legacy edits before writing anything', async () => {
    const baseRevision = liveRevision(fixture());
    db.pageContent.findUnique.mockResolvedValue({ id: 'draft-1', content: { schemaVersion: 1, version: 2, baseRevision, document: previewDocument() } });
    await expect(saveBuilderDocument('solution-1', { document: previewDocument(), version: 1, baseRevision })).rejects.toMatchObject({ statusCode: 409 });
    db.pageContent.findUnique.mockResolvedValue(null);
    const changed = fixture(); changed.sections[0].content.heading = 'Someone else edited'; db.solution.findUnique.mockResolvedValue(changed);
    await expect(saveBuilderDocument('solution-1', { document: previewDocument(), version: 0, baseRevision })).rejects.toMatchObject({ statusCode: 409 });
    expect(db.section.deleteMany).not.toHaveBeenCalled(); expect(db.pageContent.create).not.toHaveBeenCalled();
  });
  it('publishes content, design, ordering and metadata inside a serializable transaction', async () => {
    const doc = previewDocument(); doc.sections[1].design.mobileHeadingSize = 28; doc.sections[2].isDraft = true;
    await saveBuilderDocument('solution-1', { document: doc, version: 0, baseRevision: liveRevision(fixture()), action: 'publish' });
    expect(db.$transaction).toHaveBeenCalledWith(expect.any(Function), { isolationLevel: 'Serializable' });
    expect(db.section.deleteMany).toHaveBeenCalledWith({ where: { solutionId: 'solution-1' } });
    expect(db.section.createMany).toHaveBeenCalledWith({ data: expect.arrayContaining([expect.objectContaining({ order: 1, content: expect.objectContaining({ _design: { mobileHeadingSize: 28 } }) }), expect.objectContaining({ order: 2, isDraft: true })]) });
    expect(db.solution.update).toHaveBeenCalledWith({ where: { id: 'solution-1' }, data: expect.objectContaining({ title: doc.title, slug: doc.slug, isDraft: false }) });
  });
  it('refuses to publish an empty page and protects newer drafts from discard', async () => {
    await expect(saveBuilderDocument('solution-1', { document: { ...previewDocument(), sections: [] }, version: 0, baseRevision: liveRevision(fixture()), action: 'publish' })).rejects.toMatchObject({ statusCode: 400 });
    db.pageContent.findUnique.mockResolvedValue({ id: 'draft-1', content: { schemaVersion: 1, version: 3, baseRevision: liveRevision(fixture()), document: previewDocument() } });
    await expect(discardBuilderDraft('solution-1', 2)).rejects.toMatchObject({ statusCode: 409 });
    expect(db.pageContent.delete).not.toHaveBeenCalled();
  });
});

it('refuses publication of unavailable selected products before modifying live sections', async () => {
 const section = makeSection(SectionType.PRODUCT_CARD);
 section.content.displayMode = 'manual';
 const doc = { ...previewDocument(), sections: [section] };
 const request = { document: doc, version: 0, baseRevision: liveRevision(fixture()), action: 'publish' };
 doc.sections[0].content.productIds = ['unpublished-product'];
 await expect(saveBuilderDocument('solution-1', request)).rejects.toMatchObject({ statusCode: 400 });
 expect(db.section.deleteMany).not.toHaveBeenCalled(); expect(db.section.createMany).not.toHaveBeenCalled();
});

it('allows an intentionally empty product section without forcing product selection', async () => {
 const section = makeSection(SectionType.PRODUCT_CARD);
 section.content.displayMode = 'manual'; section.content.productIds = [];
 await saveBuilderDocument('solution-1', { document: { ...previewDocument(), sections: [section] }, version: 0, baseRevision: liveRevision(fixture()), action: 'publish' });
 expect(db.solution.update).toHaveBeenCalled();
});
