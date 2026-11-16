-- Run AFTER solution-html-import.sql in Supabase SQL Editor.
-- PERMANENT legacy solution deletion: no archive or recovery copy is created.
-- Also removes LegacySolutionArchive if a previous reset created it.
-- Preserves new HTML revisions, product records, unrelated pages and storage files.
BEGIN;

-- Capture legacy IDs/slugs once so all deletions use the same set.
CREATE TEMP TABLE legacy_solution_reset_targets ON COMMIT DROP AS
 SELECT s.id, s.slug FROM public."Solution" s
 WHERE NOT EXISTS (SELECT 1 FROM public."SolutionRevision" r WHERE r."solutionId"=s.id);

-- Remove only legacy solution associations, retaining products and new HTML links.
UPDATE public."Product" p
 SET solutions=ARRAY(
   SELECT slug FROM unnest(p.solutions) AS linked(slug)
   WHERE NOT EXISTS (SELECT 1 FROM legacy_solution_reset_targets old WHERE old.slug=linked.slug)
 )
 WHERE EXISTS (SELECT 1 FROM legacy_solution_reset_targets old WHERE old.slug=ANY(p.solutions));

DELETE FROM public."PageContent" WHERE left(slug,20)='__solution_builder__';
DELETE FROM public."Section" WHERE "solutionId" IN (SELECT id FROM legacy_solution_reset_targets);
DELETE FROM public."Image" WHERE "solutionId" IN (SELECT id FROM legacy_solution_reset_targets);
DELETE FROM public."Solution" WHERE id IN (SELECT id FROM legacy_solution_reset_targets);

-- Permanently discard any recovery archive left by the previous script.
DROP TABLE IF EXISTS public."LegacySolutionArchive";
COMMIT;
