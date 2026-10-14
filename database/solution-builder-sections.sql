-- Run manually in Supabase SQL Editor if any enum labels are missing.
-- Adds enum labels only. Safe to run repeatedly.
BEGIN;
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'HERO';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'INTRO';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'CHALLENGE';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'FEATURES';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'BENEFITS';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'TESTIMONIALS';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'CTA';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'CUSTOM';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'USE_CASES';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'METHODOLOGY';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'SOLAAS';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'PRODUCTS_CAROUSEL';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'IMAGE';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'VIDEO';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'GRAPH';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'COMPARISON_TABLE';
ALTER TYPE public."SectionType" ADD VALUE IF NOT EXISTS 'PRODUCT_CARD';
COMMIT;

SELECT enumlabel FROM pg_enum
WHERE enumtypid = 'public."SectionType"'::regtype ORDER BY enumsortorder;
