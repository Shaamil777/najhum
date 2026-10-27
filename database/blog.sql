-- Najhum blog: run in Supabase SQL Editor before deploying the updated code.
-- No sample articles are inserted. Existing site content is untouched.
BEGIN;
CREATE TABLE IF NOT EXISTS "BlogPost" (
  "id" TEXT PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL DEFAULT '',
  "content" TEXT NOT NULL DEFAULT '',
  "category" TEXT NOT NULL DEFAULT 'Insights',
  "author" TEXT NOT NULL DEFAULT 'Najhum Editorial',
  "coverImage" TEXT NOT NULL DEFAULT '',
  "coverAlt" TEXT NOT NULL DEFAULT '',
  "seoTitle" TEXT NOT NULL DEFAULT '',
  "seoDescription" TEXT NOT NULL DEFAULT '',
  "ogImage" TEXT NOT NULL DEFAULT '',
  "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "noIndex" BOOLEAN NOT NULL DEFAULT false,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "isDraft" BOOLEAN NOT NULL DEFAULT true,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_slug_key" ON "BlogPost"("slug");
CREATE INDEX IF NOT EXISTS "BlogPost_isDraft_publishedAt_idx" ON "BlogPost"("isDraft", "publishedAt");
CREATE TABLE IF NOT EXISTS "BlogSettings" (
  "id" TEXT PRIMARY KEY DEFAULT 'main',
  "heading" TEXT NOT NULL DEFAULT 'Ideas for a connected world.',
  "introduction" TEXT NOT NULL DEFAULT 'Perspectives on technology, infrastructure, and the systems that bring them together.',
  "seoTitle" TEXT NOT NULL DEFAULT 'Journal | Najhum Technologies',
  "seoDescription" TEXT NOT NULL DEFAULT 'Explore insights on industrial IoT, EV charging, smart buildings, and precision agriculture from Najhum Technologies.',
  "ogImage" TEXT NOT NULL DEFAULT '',
  "noIndex" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "BlogSettings" ("id") VALUES ('main') ON CONFLICT ("id") DO NOTHING;
-- Articles are served through the existing server-side Prisma connection.
-- No direct anon/authenticated Supabase client access is granted.
ALTER TABLE "BlogPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogSettings" ENABLE ROW LEVEL SECURITY;
COMMIT;
