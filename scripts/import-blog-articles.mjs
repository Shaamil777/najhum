import 'dotenv/config';
import { readFile, access } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import assert from 'node:assert/strict';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import sanitizeHtml from 'sanitize-html';

// Curated original articles. This importer never updates existing posts or publishes content.
const articles = JSON.parse(await readFile(new URL('../database/content/journal-launch-articles.json', import.meta.url), 'utf8'));
assert.equal(articles.length, 5);
assert.equal(new Set(articles.map(post => post.slug)).size, 5);
for (const article of articles) {
  assert.match(article.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(article.title && article.excerpt && article.coverAlt);
  assert.ok(article.seoTitle.length <= 100 && article.seoDescription.length <= 160);
  assert.equal(article.isDraft, true);
  assert.equal(article.content.includes('<script'), false);
  assert.ok(sanitizeHtml(article.content, { allowedTags: [], allowedAttributes: {} }).split(/\s+/).length >= 400);
  await access(new URL(`../public${article.coverImage}`, import.meta.url));
}
let connectionString = process.env.DATABASE_URL;
if (connectionString?.startsWith('prisma+postgres://')) {
  const key = new URL(connectionString).searchParams.get('api_key');
  connectionString = JSON.parse(Buffer.from(key, 'base64').toString()).databaseUrl;
}
const pool = new pg.Pool({ connectionString, connectionTimeoutMillis: 10000 });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
try {
  const slugs = articles.map(article => article.slug);
  const existing = await prisma.blogPost.findMany({ where: { slug: { in: slugs } }, select: { slug: true } });
  if (!process.argv.includes('--apply')) {
    console.log(JSON.stringify({ mode: 'preview', existing: existing.map(post => post.slug), wouldCreate: articles.filter(article => !existing.some(post => post.slug === article.slug)).map(article => ({ title: article.title, slug: article.slug, isDraft: true })) }, null, 2));
  } else {
    const result = await prisma.$transaction(async tx => {
      const inserted = await tx.blogPost.createMany({ data: articles.map(article => ({ ...article, id: randomUUID(), isDraft: true, publishedAt: null })), skipDuplicates: true });
      const posts = await tx.blogPost.findMany({ where: { slug: { in: slugs } }, select: { id: true, slug: true, title: true, isDraft: true, publishedAt: true, coverImage: true, seoTitle: true, seoDescription: true }, orderBy: { title: 'asc' } });
      assert.equal(posts.length, 5);
      return { created: inserted.count, posts };
    });
    console.log(JSON.stringify(result, null, 2));
  }
} catch (error) {
  console.error('Blog article import failed:', error.code || error.name);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
  await pool.end();
}
