import 'dotenv/config';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const solutions = JSON.parse(await readFile(new URL('../src/content/expanded-solutions.json', import.meta.url), 'utf8'));
const products = JSON.parse(await readFile(new URL('../src/content/brochure-products.json', import.meta.url), 'utf8'));
const normalize = value => String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const legacyModels = { nt321: ['NT321'], nts600: ['NTS600'], ntgw4: ['NTGW4'], 'nt800-system': ['NT800 Detector + NT6000 II Controller'] };
const digest = product => createHash('sha256').update(JSON.stringify(product)).digest('hex');
function matchProduct(records, item) {
  const models = [item.details.model, ...(legacyModels[item.key] || [])].map(normalize);
  const matches = records.filter(record => record.id === item.id || record.details?.catalogSource?.key === item.key || models.includes(normalize(record.details?.model)));
  if (matches.length > 1) throw new Error(`Ambiguous product match: ${item.key}`);
  return matches[0];
}
function updates(record, item) {
  const details = record?.details && typeof record.details === 'object' ? record.details : {};
  const specs = [...item.details.specs, ...(Array.isArray(details.specs) ? details.specs.filter(spec => !item.details.specs.some(newSpec => normalize(newSpec.property) === normalize(spec.property))) : [])];
  return { description: item.description, features: item.features, solutions: [...new Set([...(record?.solutions || []), ...item.solutions])], details: { ...details, ...item.details, specs, images: record ? (details.images || []) : [], catalogSource: { key: item.key, digest: digest(item), files: item.sourceFiles, hashes: item.sourceHashes, notes: item.sourceNotes || '' } } };
}
let connectionString = process.env.DATABASE_URL;
if (connectionString?.startsWith('prisma+postgres://')) { const key = new URL(connectionString).searchParams.get('api_key'); connectionString = JSON.parse(Buffer.from(key, 'base64').toString()).databaseUrl; }
const pool = new pg.Pool({ connectionString });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
try {
  await prisma.$queryRaw`SELECT 1`;
  const records = await prisma.product.findMany();
  const pages = await prisma.solution.findMany({ select: { id: true, slug: true } });
  const plan = { createSolutions: solutions.filter(doc => !pages.some(page => page.slug === doc.slug)).map(doc => doc.slug), createProducts: [], updateProducts: [], skipProducts: [] };
  for (const item of products) {
    const record = matchProduct(records, item);
    plan[!record ? 'createProducts' : record.details?.catalogSource?.digest === digest(item) ? 'skipProducts' : 'updateProducts'].push(item.key);
  }
  if (!process.argv.includes('--apply')) console.log(JSON.stringify({ mode: 'preview', ...plan }, null, 2));
  else {
    const backupDirectory = new URL('../work/industry-import-backups/', import.meta.url);
    await mkdir(backupDirectory, { recursive: true });
    const backup = new URL(`catalog-expansion-${Date.now()}.json`, backupDirectory);
    await writeFile(backup, JSON.stringify({ products: records, solutions: pages }, null, 2));
    const result = await prisma.$transaction(async tx => {
      const imported = { solutions: [], products: [] };
      for (const document of solutions) {
        if (await tx.solution.findUnique({ where: { slug: document.slug } })) continue;
        const page = await tx.solution.create({ data: { title: document.title, slug: document.slug, metaDescription: document.metaDescription, coverImage: document.coverImage, platforms: document.platforms, isDraft: true, sections: { create: document.sections.map((section, order) => ({ type: section.type, order, isDraft: false, content: { ...section.content, _design: section.design } })) } }, select: { id: true, slug: true, isDraft: true } });
        imported.solutions.push(page);
      }
      let order = Math.max(0, ...records.map(record => record.order)) + 1;
      for (const item of products) {
        // Re-read inside the serializable transaction to avoid overwriting a concurrent edit.
        const record = matchProduct(await tx.product.findMany(), item);
        if (record?.details?.catalogSource?.digest === digest(item)) continue;
        const product = record ? await tx.product.update({ where: { id: record.id }, data: updates(record, item) }) : await tx.product.create({ data: { id: item.id, name: item.name, ...updates(null, item), platforms: item.platforms, imageUrl: item.imageUrl, brochureUrl: null, isDraft: true, order: order++ } });
        imported.products.push({ id: product.id, key: item.key, name: product.name, action: record ? 'updated' : 'created', isDraft: product.isDraft });
      }
      return imported;
    }, { isolationLevel: 'Serializable', maxWait: 30000, timeout: 30000 });
    const report = { mode: 'applied', date: new Date().toISOString(), ...plan, ...result, backup: backup.pathname, sourcePdfCount: 31, uniqueProducts: 30, mergedDuplicate: ['Najhum Fuel Sensor with Controller.pdf', 'Najhum Wireless Level Sensor.pdf'], brochureDownloads: 'No new PDFs published; existing brochure links preserved.' };
    const destination = process.argv.find(arg => arg.startsWith('--report='))?.slice(9);
    if (destination) await writeFile(destination, JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  }
} finally { await prisma.$disconnect(); await pool.end(); }
