import { createHash } from 'node:crypto';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db/prisma';
import { apiErrors } from '@/lib/utils/api-error';
import { builderRequestSchema, draftEnvelopeSchema, draftKey, type BuilderDocument, type BuilderSession, designSchema } from './document';
import { SectionType } from '@/types/section';

type LiveSolution = Prisma.SolutionGetPayload<{ include: { sections: true } }>;

export function liveRevision(solution: LiveSolution) {
  return createHash('sha256').update(JSON.stringify({
    title: solution.title, slug: solution.slug, metaDescription: solution.metaDescription,
    isDraft: solution.isDraft, updatedAt: solution.updatedAt.toISOString(),
    sections: [...solution.sections].sort((a, b) => a.order - b.order || a.id.localeCompare(b.id)).map(section => ({ id: section.id, type: section.type, order: section.order, isDraft: section.isDraft, content: section.content, updatedAt: section.updatedAt.toISOString() })),
  })).digest('hex');
}

export function liveDocument(solution: LiveSolution): BuilderDocument {
  return {
    title: solution.title, slug: solution.slug, metaDescription: solution.metaDescription || '',
    sections: [...solution.sections].sort((a, b) => a.order - b.order).map(section => {
      const content = section.content as Record<string, unknown>;
      const { _design, ...fields } = content;
      const design = designSchema.safeParse(_design || {});
      return { id: section.id, type: section.type as SectionType, isDraft: section.isDraft, content: fields, design: design.success ? design.data : {} };
    }),
  };
}

async function readSession(tx: Prisma.TransactionClient, id: string): Promise<BuilderSession> {
  const solution = await tx.solution.findUnique({ where: { id }, include: { sections: true } });
  if (!solution) throw apiErrors.notFound('Solution not found.');
  const draft = await tx.pageContent.findUnique({ where: { slug: draftKey(id) } });
  const envelope = draft ? draftEnvelopeSchema.parse(draft.content) : null;
  const products = await tx.product.findMany({ where: { isDraft: false, solutions: { has: solution.slug } }, orderBy: { order: 'asc' }, select: { id: true, name: true, description: true, imageUrl: true, brochureUrl: true } });
  const availableProducts = await tx.product.findMany({ where: { isDraft: false }, orderBy: { order: 'asc' }, select: { id: true, name: true, description: true, imageUrl: true, brochureUrl: true } });
  return {
    document: envelope?.document || liveDocument(solution),
    version: envelope?.version || 0, baseRevision: envelope?.baseRevision || liveRevision(solution),
    isPublished: !solution.isDraft, hasDraft: !!draft, products, availableProducts,
  };
}

export async function getBuilderSession(id: string) {
  return prisma.$transaction(tx => readSession(tx, id), { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead });
}

export async function saveBuilderDocument(id: string, input: unknown) {
  const request = builderRequestSchema.parse(input);
  if (request.action === 'publish' && !request.document.sections.some(section => !section.isDraft)) throw apiErrors.badRequest('Add at least one visible section before publishing.');
  try {
    return await prisma.$transaction(async tx => {
      const solution = await tx.solution.findUnique({ where: { id }, include: { sections: true } });
      if (!solution) throw apiErrors.notFound('Solution not found.');
      const draft = await tx.pageContent.findUnique({ where: { slug: draftKey(id) } });
      const previous = draft ? draftEnvelopeSchema.parse(draft.content) : null;
      if ((previous?.version || 0) !== request.version || (previous?.baseRevision || liveRevision(solution)) !== request.baseRevision || liveRevision(solution) !== request.baseRevision) {
        throw apiErrors.conflict('This solution changed in another editor. Reload before saving; copy any changes you want to keep.');
      }
      let baseRevision = request.baseRevision;
      if (request.action === 'publish') {
        const productSections = request.document.sections.filter(section => !section.isDraft && section.type === SectionType.PRODUCT_CARD);
        const chosenIds = [...new Set(productSections.flatMap(section => (section.content.productIds as string[]) || []))];
        if (productSections.some(section => section.content.displayMode === 'manual' && !(section.content.productIds as string[])?.length)) throw apiErrors.badRequest('Choose at least one product for each visible Product cards section in manual mode.');
        if (chosenIds.length) {
          const available = await tx.product.findMany({ where: { id: { in: chosenIds }, isDraft: false }, select: { id: true } });
          if (available.length !== chosenIds.length) throw apiErrors.badRequest('A selected product is unavailable or unpublished. Choose published products before publishing.');
        }
        // The section replacement and metadata publication are one atomic transaction.
        await tx.section.deleteMany({ where: { solutionId: id } });
        await tx.section.createMany({ data: request.document.sections.map((section, order) => ({
          id: section.id, solutionId: id, type: section.type, order, isDraft: section.isDraft,
          content: { ...section.content, _design: section.design } as Prisma.InputJsonObject,
        })) });
        await tx.solution.update({ where: { id }, data: { title: request.document.title, slug: request.document.slug, metaDescription: request.document.metaDescription, isDraft: false } });
        // Product associations currently use slugs; keep them valid when a solution is renamed.
        if (solution.slug !== request.document.slug) {
          const linked = await tx.product.findMany({ where: { solutions: { has: solution.slug } } });
          for (const product of linked) await tx.product.update({ where: { id: product.id }, data: { solutions: [...new Set(product.solutions.map(slug => slug === solution.slug ? request.document.slug : slug))] } });
        }
      } else if (request.action === 'unpublish') {
        await tx.solution.update({ where: { id }, data: { isDraft: true } });
      }
      if (request.action !== 'save') {
        const published = await tx.solution.findUniqueOrThrow({ where: { id }, include: { sections: true } });
        baseRevision = liveRevision(published);
      }
      const envelope = { schemaVersion: 1, version: request.version + 1, baseRevision, document: request.document };
      const data = { title: `Solution draft: ${request.document.title}`, content: envelope as unknown as Prisma.InputJsonObject };
      if (draft) await tx.pageContent.update({ where: { id: draft.id }, data });
      else await tx.pageContent.create({ data: { ...data, slug: draftKey(id) } });
      return { ...(await readSession(tx, id)), oldSlug: solution.slug };
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && ['P2034', 'P2002'].includes(error.code)) throw apiErrors.conflict('Another save or a duplicate URL prevented this update. Reload, or choose a unique page URL.');
    if (error instanceof Error && /invalid input value for enum/i.test(error.message)) throw apiErrors.badRequest('The database does not support these section types yet. Apply database/solution-builder-sections.sql manually, following database/SETUP.md.');
    throw error;
  }
}

export async function discardBuilderDraft(id: string, version: number) {
  return prisma.$transaction(async tx => {
    const draft = await tx.pageContent.findUnique({ where: { slug: draftKey(id) } });
    if (draft && draftEnvelopeSchema.parse(draft.content).version !== version) throw apiErrors.conflict('A newer draft exists. Reload before discarding.');
    if (draft) await tx.pageContent.delete({ where: { id: draft.id } });
    return readSession(tx, id);
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}
