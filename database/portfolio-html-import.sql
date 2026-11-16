-- Run first in Supabase SQL Editor. Adds HTML publishing; no records are deleted.
BEGIN;
ALTER TABLE public."PortfolioProject"
 ADD COLUMN IF NOT EXISTS "contentMode" TEXT NOT NULL DEFAULT 'LEGACY',
 ADD COLUMN IF NOT EXISTS "publishedRevisionId" TEXT;
CREATE TABLE IF NOT EXISTS public."PortfolioRevision" (
 "id" TEXT PRIMARY KEY,
 "projectId" TEXT NOT NULL REFERENCES public."PortfolioProject"("id") ON DELETE CASCADE,
 "number" INTEGER NOT NULL,
 "document" JSONB NOT NULL,
 "createdBy" TEXT NOT NULL,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE ("projectId", "number")
);
CREATE INDEX IF NOT EXISTS "PortfolioRevision_projectId_createdAt_idx"
 ON public."PortfolioRevision"("projectId", "createdAt");
ALTER TABLE public."PortfolioRevision" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."PortfolioRevision" FROM anon, authenticated;
COMMIT;
