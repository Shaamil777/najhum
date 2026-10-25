-- Apply before deploying the updated application. Safe to rerun.
BEGIN;
DO $$ BEGIN
  CREATE TYPE "SolutionClassification" AS ENUM ('INDUSTRY', 'USE_CASE', 'BOTH');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = current_schema() AND table_name = 'Solution' AND column_name = 'classification'
  ) THEN
    ALTER TABLE "Solution" ADD COLUMN "classification" "SolutionClassification" NOT NULL DEFAULT 'INDUSTRY';
    -- These five solutions appeared in both tabs before classification was editable.
    UPDATE "Solution" SET "classification" = 'BOTH'
    WHERE "slug" IN ('cold-storage', 'energy-monitoring', 'facilities-management', 'industrial', 'hospitality');
  END IF;
END $$;
COMMIT;
