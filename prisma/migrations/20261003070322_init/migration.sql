-- CreateEnum
CREATE TYPE "SectionType" AS ENUM ('HERO', 'INTRO', 'FEATURES', 'BENEFITS', 'TESTIMONIALS', 'CTA', 'CUSTOM');

-- CreateTable
CREATE TABLE "Solution" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metaDescription" TEXT,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "solutionId" TEXT NOT NULL,
    "type" "SectionType" NOT NULL,
    "order" INTEGER NOT NULL,
    "isDraft" BOOLEAN NOT NULL DEFAULT false,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "solutionId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "storageKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Solution_slug_key" ON "Solution"("slug");

-- CreateIndex
CREATE INDEX "Solution_slug_idx" ON "Solution"("slug");

-- CreateIndex
CREATE INDEX "Solution_isDraft_idx" ON "Solution"("isDraft");

-- CreateIndex
CREATE INDEX "Section_solutionId_order_idx" ON "Section"("solutionId", "order");

-- CreateIndex
CREATE INDEX "Section_solutionId_isDraft_idx" ON "Section"("solutionId", "isDraft");

-- CreateIndex
CREATE INDEX "Image_solutionId_idx" ON "Image"("solutionId");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "Solution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "Solution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
