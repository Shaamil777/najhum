/**
 * Database query functions for solutions
 * 
 * Provides CRUD operations for solution pages with proper error handling,
 * draft/publish workflows, and cascading operations.
 * 
 * Requirements: 2.1, 3.3, 3.5, 3.7, 7.2, 7.3, 7.8, 13.6
 */

import { prisma } from '../prisma';
import { Solution, Section, Prisma } from '@prisma/client';

/**
 * Solution with optional sections included
 */
export type SolutionWithSections = Solution & {
  sections?: Section[];
};

/**
 * Get all solutions ordered by updatedAt descending
 * Used in admin console for listing all solutions
 * 
 * @returns Array of all solutions ordered by most recently updated
 * @throws Error if database query fails
 * 
 * Requirements: 3.1, 13.6
 */
export async function getAllSolutions(): Promise<Solution[]> {
  try {
    return await prisma.solution.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Failed to fetch all solutions:', error);
    throw new Error('Failed to fetch solutions from database');
  }
}

/**
 * Get a solution by ID with optional sections
 * 
 * @param id - Solution ID (cuid)
 * @param includeSections - Whether to include sections (default: false)
 * @returns Solution with optional sections, or null if not found
 * @throws Error if database query fails
 * 
 * Requirements: 3.4, 3.5, 13.6
 */
export async function getSolutionById(
  id: string,
  includeSections: boolean = false
): Promise<SolutionWithSections | null> {
  try {
    return await prisma.solution.findUnique({
      where: { id },
      include: includeSections
        ? {
            sections: {
              orderBy: {
                order: 'asc',
              },
            },
          }
        : undefined,
    });
  } catch (error) {
    console.error(`Failed to fetch solution by id ${id}:`, error);
    throw new Error('Failed to fetch solution from database');
  }
}

/**
 * Get a solution by slug with optional published-only filter
 * Used for public solution pages and admin editing
 * 
 * @param slug - Solution slug (URL-safe identifier)
 * @param publishedOnly - If true, only return published solutions (default: false)
 * @returns Solution with sections, or null if not found
 * @throws Error if database query fails
 * 
 * Requirements: 7.4, 8.1, 8.2, 8.3, 13.6
 */
export async function getSolutionBySlug(
  slug: string,
  publishedOnly: boolean = false
): Promise<SolutionWithSections | null> {
  try {
    const whereClause: Prisma.SolutionWhereInput = { slug };
    
    // Filter by draft status if publishedOnly is true
    if (publishedOnly) {
      whereClause.isDraft = false;
    }

    return await prisma.solution.findFirst({
      where: whereClause,
      include: {
        sections: {
          where: publishedOnly ? { isDraft: false } : undefined,
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  } catch (error) {
    console.error(`Failed to fetch solution by slug ${slug}:`, error);
    throw new Error('Failed to fetch solution from database');
  }
}

/**
 * Create a new solution with draft status
 * 
 * @param data - Solution creation data
 * @param data.title - Solution title
 * @param data.slug - URL-safe slug (must be unique)
 * @param data.metaDescription - Optional meta description for SEO
 * @returns Created solution
 * @throws Error if slug already exists or database operation fails
 * 
 * Requirements: 2.1, 3.3, 7.1
 */
export async function createSolution(data: {
  title: string;
  slug: string;
  metaDescription?: string;
}): Promise<Solution> {
  try {
    return await prisma.solution.create({
      data: {
        title: data.title,
        slug: data.slug,
        metaDescription: data.metaDescription,
        isDraft: true, // All new solutions start as drafts
      },
    });
  } catch (error) {
    console.error('Failed to create solution:', error);
    
    // Check for unique constraint violation on slug
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('A solution with this slug already exists');
      }
    }
    
    throw new Error('Failed to create solution in database');
  }
}

/**
 * Update solution metadata
 * Allows partial updates of solution fields
 * 
 * @param id - Solution ID
 * @param data - Partial solution data to update
 * @returns Updated solution
 * @throws Error if solution not found or database operation fails
 * 
 * Requirements: 3.5, 7.2
 */
export async function updateSolution(
  id: string,
  data: Partial<Omit<Solution, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Solution> {
  try {
    return await prisma.solution.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(), // Explicitly update timestamp
      },
    });
  } catch (error) {
    console.error(`Failed to update solution ${id}:`, error);
    
    // Check for not found error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new Error('Solution not found');
      }
      if (error.code === 'P2002') {
        throw new Error('A solution with this slug already exists');
      }
    }
    
    throw new Error('Failed to update solution in database');
  }
}

/**
 * Delete a solution and all associated sections and images (cascade)
 * 
 * @param id - Solution ID
 * @returns Deleted solution
 * @throws Error if solution not found or database operation fails
 * 
 * Requirements: 2.8, 3.6, 3.7
 */
export async function deleteSolution(id: string): Promise<Solution> {
  try {
    // Prisma will cascade delete sections and images automatically
    // due to onDelete: Cascade in schema
    return await prisma.solution.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Failed to delete solution ${id}:`, error);
    
    // Check for not found error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new Error('Solution not found');
      }
    }
    
    throw new Error('Failed to delete solution from database');
  }
}

/**
 * Publish a solution: sets isDraft=false on solution and all enabled sections
 * Enabled sections are those where isDraft=false
 * 
 * @param id - Solution ID
 * @returns Updated solution with sections
 * @throws Error if solution not found or database operation fails
 * 
 * Requirements: 7.3, 7.4, 7.5
 */
export async function publishSolution(id: string): Promise<SolutionWithSections> {
  try {
    // Use transaction to ensure atomicity
    return await prisma.$transaction(async (tx) => {
      // Update solution to published
      const solution = await tx.solution.update({
        where: { id },
        data: { isDraft: false },
      });

      // Update all enabled sections (where isDraft=false) to published
      // This maintains the section's individual draft state
      await tx.section.updateMany({
        where: {
          solutionId: id,
          isDraft: false, // Only publish sections that are enabled
        },
        data: { isDraft: false },
      });

      // Fetch and return the updated solution with sections
      const result = await tx.solution.findUnique({
        where: { id },
        include: {
          sections: {
            orderBy: { order: 'asc' },
          },
        },
      });

      if (!result) {
        throw new Error('Solution not found after update');
      }

      return result;
    });
  } catch (error) {
    console.error(`Failed to publish solution ${id}:`, error);
    
    // Check for not found error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new Error('Solution not found');
      }
    }
    
    throw new Error('Failed to publish solution');
  }
}

/**
 * Unpublish a solution: sets isDraft=true on solution
 * This hides the solution from public view
 * 
 * @param id - Solution ID
 * @returns Updated solution
 * @throws Error if solution not found or database operation fails
 * 
 * Requirements: 7.8
 */
export async function unpublishSolution(id: string): Promise<Solution> {
  try {
    return await prisma.solution.update({
      where: { id },
      data: { isDraft: true },
    });
  } catch (error) {
    console.error(`Failed to unpublish solution ${id}:`, error);
    
    // Check for not found error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new Error('Solution not found');
      }
    }
    
    throw new Error('Failed to unpublish solution');
  }
}
