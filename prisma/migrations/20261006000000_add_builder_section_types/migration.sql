-- Preserve existing content while supporting every section exposed by the builder.
ALTER TYPE "SectionType" ADD VALUE IF NOT EXISTS 'CHALLENGE';
ALTER TYPE "SectionType" ADD VALUE IF NOT EXISTS 'USE_CASES';
ALTER TYPE "SectionType" ADD VALUE IF NOT EXISTS 'METHODOLOGY';
ALTER TYPE "SectionType" ADD VALUE IF NOT EXISTS 'SOLAAS';
