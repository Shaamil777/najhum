/**
 * Database query functions for sections
 * 
 * Provides CRUD operations for solution sections with proper error handling,
 * ordering logic, and draft status management.
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.10, 5.11
 */

import { prisma } from '../prisma';
import { Section, SectionType, Prisma } from '@prisma/client';
import { SectionContent } from '@/types/section';

/**
 * Get all sections for a solution
 * 
 * @param solutionId - Solution ID
 * @param publishedOnly - If true, only return published sections (isDraft=false)
 * @returns Array of sections ordered by order ascending
 * @throws Error if database query fails
 * 
 * Requirements: 4.1, 5.10
 */
export async function getSectionsBySolutionId(
  solutionId: string,
  publishedOnly: boolean = false
): Promise<Section[]> {
  try {
    const whereClause: Prisma.SectionWhereInput = {
      solutionId,
    };

    if (publishedOnly) {
      whereClause.isDraft = false;
    }

    return await prisma.section.findMany({
      where: whereClause,
      orderBy: {
        order: 'asc',
      },
    });
  } catch (error) {
    console.error(`Failed to fetch sections for solution ${solutionId}:`, error);
    throw new Error('Failed to fetch sections from database');
  }
}

/**
 * Create a new section for a solution
 * Automatically assigns next available order number
 * 
 * @param solutionId - Solution ID
 * @param type - Section type
 * @param content - Section content (JSON)
 * @returns Created section
 * @throws Error if database operation fails
 * 
 * Requirements: 4.2, 5.11
 */
export async function createSection(
  solutionId: string,
  type: SectionType,
  content: SectionContent
): Promise<Section> {
  try {
    // Get max order value for this solution
    const maxOrderSection = await prisma.section.findFirst({
      where: { solutionId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const nextOrder = maxOrderSection ? maxOrderSection.order + 1 : 0;

    // Create section with next order
    return await prisma.section.create({
      data: {
        solutionId,
        type,
        order: nextOrder,
        isDraft: false, // New sections are enabled by default
        content: content as unknown as Prisma.InputJsonValue,
      },
    });
  } catch (error) {
    console.error('Failed to create section:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        throw new Error('Solution not found');
      }
    }

    throw new Error('Failed to create section in database');
  }
}

/**
 * Update section content
 * 
 * @param id - Section ID
 * @param content - Updated content (JSON)
 * @returns Updated section
 * @throws Error if section not found or database operation fails
 * 
 * Requirements: 4.3
 */
export async function updateSection(
  id: string,
  content: SectionContent
): Promise<Section> {
  try {
    return await prisma.section.update({
      where: { id },
      data: {
        content: content as unknown as Prisma.InputJsonValue,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error(`Failed to update section ${id}:`, error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new Error('Section not found');
      }
    }

    throw new Error('Failed to update section in database');
  }
}

/**
 * Delete a section and reorder remaining sections
 * 
 * @param id - Section ID
 * @returns Deleted section
 * @throws Error if section not found or database operation fails
 * 
 * Requirements: 4.4
 */
export async function deleteSection(id: string): Promise<Section> {
  try {
    return await prisma.$transaction(async (tx) => {
      // Get the section to be deleted
      const section = await tx.section.findUnique({
        where: { id },
      });

      if (!section) {
        throw new Error('Section not found');
      }

      // Delete the section
      const deletedSection = await tx.section.delete({
        where: { id },
      });

      // Decrement order values for sections with higher order in the same solution
      await tx.section.updateMany({
        where: {
          solutionId: section.solutionId,
          order: { gt: section.order },
        },
        data: {
          order: { decrement: 1 },
        },
      });

      return deletedSection;
    });
  } catch (error) {
    console.error(`Failed to delete section ${id}:`, error);

    if (error instanceof Error && error.message === 'Section not found') {
      throw error;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new Error('Section not found');
      }
    }

    throw new Error('Failed to delete section from database');
  }
}

/**
 * Reorder sections for a solution
 * Updates order field based on array index
 * 
 * @param solutionId - Solution ID
 * @param orderedSectionIds - Array of section IDs in desired order
 * @returns Updated sections
 * @throws Error if database operation fails
 * 
 * Requirements: 4.5
 */
export async function reorderSections(
  solutionId: string,
  orderedSectionIds: string[]
): Promise<Section[]> {
  try {
    return await prisma.$transaction(async (tx) => {
      // Verify all sections belong to this solution
      const sections = await tx.section.findMany({
        where: {
          id: { in: orderedSectionIds },
          solutionId,
        },
      });

      if (sections.length !== orderedSectionIds.length) {
        throw new Error('Some sections do not exist or do not belong to this solution');
      }

      // Update order for each section
      const updatePromises = orderedSectionIds.map((sectionId, index) =>
        tx.section.update({
          where: { id: sectionId },
          data: { order: index },
        })
      );

      return await Promise.all(updatePromises);
    });
  } catch (error) {
    console.error(`Failed to reorder sections for solution ${solutionId}:`, error);

    if (error instanceof Error && error.message.includes('do not exist')) {
      throw error;
    }

    throw new Error('Failed to reorder sections in database');
  }
}

/**
 * Toggle section draft status
 * Controls whether section appears when solution is published
 * 
 * @param id - Section ID
 * @param isDraft - Draft status (true = hidden, false = visible when published)
 * @returns Updated section
 * @throws Error if section not found or database operation fails
 * 
 * Requirements: 7.3, 7.4
 */
export async function toggleSectionDraft(
  id: string,
  isDraft: boolean
): Promise<Section> {
  try {
    return await prisma.section.update({
      where: { id },
      data: { isDraft },
    });
  } catch (error) {
    console.error(`Failed to toggle draft status for section ${id}:`, error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new Error('Section not found');
      }
    }

    throw new Error('Failed to update section draft status');
  }
}

/**
 * Get a single section by ID
 * 
 * @param id - Section ID
 * @returns Section or null if not found
 * @throws Error if database query fails
 */
export async function getSectionById(id: string): Promise<Section | null> {
  try {
    return await prisma.section.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Failed to fetch section ${id}:`, error);
    throw new Error('Failed to fetch section from database');
  }
}
