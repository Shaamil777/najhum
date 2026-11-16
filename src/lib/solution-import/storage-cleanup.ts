import { prisma } from '@/lib/db/prisma';
import type { ImportedDocument } from './types';

/** Only delete owned solution uploads which no retained page or catalogue entry uses. */
export async function cleanUnusedImportAssets(obsolete: ImportedDocument[]) {
 if (!obsolete.length) return;
 const candidates = new Map<string, string>();
 const r2Base = process.env.R2_PUBLIC_URL?.replace(/\/$/, '');
 const addUrl = (url: string) => {
  if (r2Base && url.startsWith(`${r2Base}/`)) {
   const key = url.slice(r2Base.length + 1);
   if (/^(solutions\/imports\/|solution-media\/)/.test(key)) candidates.set(url, key);
  } else {
   try { const parsed = new URL(url); if (/^[a-z0-9-]+\.public\.blob\.vercel-storage\.com$/.test(parsed.hostname) && /^\/(solutions\/imports\/|solution-media\/)/.test(parsed.pathname)) candidates.set(url, url); } catch {}
  }
 };
 for (const doc of obsolete) {
  for (const asset of doc.assets || []) addUrl(asset.url);
  for (const url of [doc.metadata.coverImage, doc.metadata.socialImage, doc.metadata.menuIcon]) if (url) addUrl(url);
 }
 if (!candidates.size) return;
 const [documents, solutions, products, images] = await Promise.all([
  prisma.solutionRevision.findMany({select:{document:true}}),
  prisma.solution.findMany({select:{coverImage:true,socialImage:true,menuIcon:true}}),
  prisma.product.findMany({select:{imageUrl:true,details:true}}),
  prisma.image.findMany({select:{url:true}}),
 ]);
 const references = JSON.stringify([documents, solutions, products, images]);
 for (const [url, key] of candidates) {
  if (references.includes(url)) continue;
  if (key.startsWith('https://')) { const {del} = await import('@vercel/blob'); await del(key); }
  else { const {deleteFromR2} = await import('@/lib/storage/r2'); await deleteFromR2(key); }
 }
}
