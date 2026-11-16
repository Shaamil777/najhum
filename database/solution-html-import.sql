-- Run ONCE in Supabase SQL Editor before deploying the HTML import workflow.
-- Schema only: existing content is removed separately by solution-html-reset.sql.
BEGIN;
ALTER TABLE public."Solution"
 ADD COLUMN IF NOT EXISTS "contentMode" TEXT NOT NULL DEFAULT 'HTML',
 ADD COLUMN IF NOT EXISTS "seoTitle" TEXT,
 ADD COLUMN IF NOT EXISTS "menuDescription" TEXT,
 ADD COLUMN IF NOT EXISTS "menuIcon" TEXT,
 ADD COLUMN IF NOT EXISTS "socialImage" TEXT,
 ADD COLUMN IF NOT EXISTS "socialImageAlt" TEXT,
 ADD COLUMN IF NOT EXISTS "publishedRevisionId" TEXT;
-- New public rendering requires an HTML publishedRevisionId, so legacy pages
-- stop rendering without modifying their archived publication status.
CREATE TABLE IF NOT EXISTS public."SolutionRevision" (
 "id" TEXT PRIMARY KEY,
 "solutionId" TEXT NOT NULL REFERENCES public."Solution"("id") ON DELETE CASCADE,
 "number" INTEGER NOT NULL,
 "document" JSONB NOT NULL,
 "createdBy" TEXT NOT NULL,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE ("solutionId", "number")
);
CREATE INDEX IF NOT EXISTS "SolutionRevision_solutionId_createdAt_idx" ON public."SolutionRevision"("solutionId", "createdAt");
ALTER TABLE public."SolutionRevision" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."SolutionRevision" FROM anon, authenticated;
COMMIT;
