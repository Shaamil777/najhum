/**
 * Database Query Functions for Image Management
 * 
 * Provides CRUD operations for image records in the database.
 * Images are associated with solutions and stored in cloud storage (R2/S3/Blob).
 */

import { prisma } from '@/lib/db/prisma';
import type { Image } from '@prisma/client';

/**
 * Create a new image record in the database
 */
export async function createImage(data: {
  solutionId: string;
  url: string;
  storageKey: string;
  altText?: string;
}): Promise<Image> {
  return await prisma.image.create({
    data: {
      solutionId: data.solutionId,
      url: data.url,
      storageKey: data.storageKey,
      altText: data.altText || null,
    },
  });
}

/**
 * Get all images for a specific solution
 */
export async function getImagesBySolutionId(solutionId: string): Promise<Image[]> {
  return await prisma.image.findMany({
    where: {
      solutionId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * Get a single image by ID
 */
export async function getImageById(id: string): Promise<Image | null> {
  return await prisma.image.findUnique({
    where: { id },
  });
}

/**
 * Update image metadata (alt text)
 */
export async function updateImage(id: string, data: { altText?: string }): Promise<Image> {
  return await prisma.image.update({
    where: { id },
    data: {
      altText: data.altText || null,
    },
  });
}

/**
 * Delete an image record from the database
 * Note: This does NOT delete the file from storage - use deleteImage from image-service.ts
 */
export async function deleteImageRecord(id: string): Promise<void> {
  await prisma.image.delete({
    where: { id },
  });
}

/**
 * Get image by storage key
 */
export async function getImageByStorageKey(storageKey: string): Promise<Image | null> {
  return await prisma.image.findFirst({
    where: {
      storageKey,
    },
  });
}

/**
 * Get total image count for a solution
 */
export async function getImageCount(solutionId: string): Promise<number> {
  return await prisma.image.count({
    where: {
      solutionId,
    },
  });
}
