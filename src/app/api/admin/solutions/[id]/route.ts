/**
 * Admin Solution Detail API Routes
 * 
 * Provides GET, PUT, and DELETE endpoints for individual solution management.
 * Requires JWT authentication via Authorization header or cookies.
 * 
 * Requirements: 3.5, 3.6, 3.7, 10.7, 10.8, 10.9
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidateSolutions } from '@/lib/utils/revalidate-solutions';
import { verifyToken } from '@/lib/auth/jwt';
import {
  getSolutionById,
  updateSolution,
  deleteSolution,
} from '@/lib/db/queries/solutions';
import { updateSolutionSchema } from '@/lib/validation/solution-schemas';
import { handleApiError, apiErrors } from '@/lib/utils/api-error';
import { ZodError } from 'zod';

/**
 * Extract and verify JWT token from request
 */
async function authenticateRequest(request: NextRequest): Promise<void> {
  let token: string | undefined;
  
  // Try Authorization header first (Bearer token)
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }
  
  // Fallback to cookie if header not present
  if (!token) {
    token = request.cookies.get('admin_token')?.value;
  }
  
  // Throw error if no token found
  if (!token) {
    throw apiErrors.unauthorized('No authentication token provided');
  }
  
  // Verify JWT token
  try {
    await verifyToken(token);
  } catch (error) {
    throw apiErrors.unauthorized('Invalid or expired token');
  }
}

/**
 * GET /api/admin/solutions/[id]
 * 
 * Gets a solution by ID with all sections included.
 * 
 * @param id - Solution ID from URL params
 * @returns Solution object with sections array
 * @status 200 - Success with solution data
 * @status 401 - Unauthorized
 * @status 404 - Solution not found
 * @status 500 - Server error
 * 
 * Requirements: 3.5, 10.7
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate request
    await authenticateRequest(request);
    
    // Await params (Next.js 15 requirement)
    const { id } = await params;
    
    // Fetch solution with sections
    const solution = await getSolutionById(id, true);
    
    // Return 404 if not found
    if (!solution) {
      throw apiErrors.notFound('Solution not found');
    }
    
    // Format response
    const responseData = {
      id: solution.id,
      title: solution.title,
      slug: solution.slug,
      metaDescription: solution.metaDescription,
      isDraft: solution.isDraft,
      createdAt: solution.createdAt.toISOString(),
      updatedAt: solution.updatedAt.toISOString(),
      sections: solution.sections?.map((section) => ({
        id: section.id,
        type: section.type,
        order: section.order,
        isDraft: section.isDraft,
        content: section.content,
        createdAt: section.createdAt.toISOString(),
        updatedAt: section.updatedAt.toISOString(),
      })),
    };
    
    return NextResponse.json(responseData, { status: 200 });
    
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/admin/solutions/[id]
 * 
 * Updates solution metadata (title, slug, metaDescription).
 * 
 * @param id - Solution ID from URL params
 * @body Partial solution data (title?, slug?, metaDescription?)
 * @returns Updated solution object
 * @status 200 - Success with updated solution
 * @status 400 - Validation error
 * @status 401 - Unauthorized
 * @status 404 - Solution not found
 * @status 409 - Duplicate slug
 * @status 500 - Server error
 * 
 * Requirements: 3.6, 10.8
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate request
    await authenticateRequest(request);
    
    // Await params (Next.js 15 requirement)
    const { id } = await params;
    
    // Parse request body
    const body = await request.json();
    
    // Validate request body with Zod schema
    let validatedData;
    try {
      validatedData = updateSolutionSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        throw error; // Will be handled by handleApiError
      }
      throw error;
    }
    
    // Update solution in database
    try {
      const previous = await getSolutionById(id);
      const solution = await updateSolution(id, validatedData);
      revalidateSolutions(previous?.slug);
      revalidateSolutions(solution.slug);
      
      // Format response
      return NextResponse.json(
        {
          id: solution.id,
          title: solution.title,
          slug: solution.slug,
          metaDescription: solution.metaDescription,
          isDraft: solution.isDraft,
          createdAt: solution.createdAt.toISOString(),
          updatedAt: solution.updatedAt.toISOString(),
        },
        { status: 200 }
      );
    } catch (error) {
      // Handle specific database errors
      if (error instanceof Error) {
        if (error.message === 'Solution not found') {
          throw apiErrors.notFound('Solution not found');
        }
        if (error.message === 'A solution with this slug already exists') {
          throw apiErrors.conflict('A solution with this slug already exists');
        }
      }
      throw error;
    }
    
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/admin/solutions/[id]
 * 
 * Deletes a solution and all associated sections and images (cascade).
 * 
 * @param id - Solution ID from URL params
 * @returns Empty response
 * @status 204 - Success (no content)
 * @status 401 - Unauthorized
 * @status 404 - Solution not found
 * @status 500 - Server error
 * 
 * Requirements: 3.7, 10.9
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate request
    await authenticateRequest(request);
    
    // Await params (Next.js 15 requirement)
    const { id } = await params;
    
    // Delete solution from database
    try {
      const previous = await getSolutionById(id);
      await deleteSolution(id);
      revalidateSolutions(previous?.slug);
      
      // Return 204 No Content on success
      return new NextResponse(null, { status: 204 });
    } catch (error) {
      // Handle specific database errors
      if (error instanceof Error && error.message === 'Solution not found') {
        throw apiErrors.notFound('Solution not found');
      }
      throw error;
    }
    
  } catch (error) {
    return handleApiError(error);
  }
}
