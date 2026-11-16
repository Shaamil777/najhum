-- Run AFTER portfolio-html-import.sql.
-- Permanently deletes previously published legacy projects, including ones now hidden.
-- No backup, archive, replacement sample content or copy is created.
-- Never-published drafts, settings, products and solutions are left intact.
-- New HTML imports are excluded, so rerunning does not delete your new projects.
BEGIN;
DELETE FROM public."PortfolioProject"
 WHERE "contentMode" = 'LEGACY'
 AND ("isDraft" = false OR "publishedAt" IS NOT NULL);
COMMIT;
-- Media objects in R2/Blob are not deleted by SQL: shared files must not be removed blindly.
