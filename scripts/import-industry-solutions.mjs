import 'dotenv/config';
import { createHash, randomUUID } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
let connectionString = process.env.DATABASE_URL;
if (connectionString?.startsWith('prisma+postgres://')) { const key = new URL(connectionString).searchParams.get('api_key'); connectionString = JSON.parse(Buffer.from(key,'base64').toString()).databaseUrl; }
const pool = new pg.Pool({ connectionString });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
const documents = JSON.parse(await readFile(new URL('../src/content/industry-solutions.json',import.meta.url),'utf8'));
try {
  const existing = await prisma.solution.findMany({ where: { slug: { in: documents.map(document => document.slug) } }, select: { id: true, slug: true, title: true, isDraft: true, _count: { select: { sections: true } } } });
  if (!process.argv.includes('--apply')) console.log(JSON.stringify({ mode: 'preview', existing, wouldCreate: documents.filter(document => !existing.some(page => page.slug === document.slug)).map(document => ({ slug: document.slug, title: document.title, sections: document.sections.length, isDraft: true })) },null,2));
  else {
    const created = [];
    for (const document of documents) {
      const previous = existing.find(page => page.slug === document.slug);
      if (previous) {
        const staged = await prisma.$transaction(async tx => {
          const solution = await tx.solution.findUniqueOrThrow({ where: { id: previous.id }, include: { sections: true } });
          const slug = `__solution_builder__${solution.id}`;
          const oldDraft = await tx.pageContent.findUnique({ where: { slug } });
          const revision = createHash('sha256').update(JSON.stringify({ title: solution.title, slug: solution.slug, metaDescription: solution.metaDescription, isDraft: solution.isDraft, updatedAt: solution.updatedAt.toISOString(), sections: [...solution.sections].sort((a,b) => a.order-b.order || a.id.localeCompare(b.id)).map(section => ({ id: section.id, type: section.type, order: section.order, isDraft: section.isDraft, content: section.content, updatedAt: section.updatedAt.toISOString() })) })).digest('hex');
          const backupDirectory = new URL('../work/industry-import-backups/',import.meta.url);
          await mkdir(backupDirectory,{ recursive: true });
          await writeFile(new URL(`${document.slug}-${Date.now()}.json`,backupDirectory),JSON.stringify({ solution, oldDraft },null,2));
          const version = Number(oldDraft?.content?.version || 0)+1;
          const envelope = { schemaVersion: 1, version, baseRevision: revision, document: { title: document.title, slug: document.slug, metaDescription: document.metaDescription, sections: document.sections.map(section => ({ ...section, id: randomUUID() })) } };
          await tx.pageContent.upsert({ where: { slug }, create: { slug, title: `Solution draft: ${document.title}`, content: envelope }, update: { title: `Solution draft: ${document.title}`, content: envelope } });
          return { id: solution.id, slug: solution.slug, title: solution.title, status: 'builder-draft-staged', liveUnchanged: true, version };
        },{ isolationLevel: 'Serializable' });
        created.push(staged); continue;
      }
      const page = await prisma.solution.create({ data: { slug: document.slug, title: document.title, metaDescription: document.metaDescription, coverImage: document.coverImage, platforms: document.platforms, isDraft: true, sections: { create: document.sections.map((section,order) => ({ type: section.type, order, isDraft: false, content: { ...section.content, _design: section.design } })) } }, select: { id: true, slug: true, title: true, isDraft: true } });
      created.push(page);
    }
    console.log(JSON.stringify({ mode: 'applied', staged: created },null,2));
  }
} finally { await prisma.$disconnect(); await pool.end(); }
