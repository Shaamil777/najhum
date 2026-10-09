/**
 * Section Reorder API Route
 * 
 * PUT endpoint for reordering sections via drag-and-drop.
 * 
 * Requirements: 4.8, 10.13
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidateSolutionById } from '@/lib/utils/revalidate-solutions';
import { verifyToken } from '@/lib/auth/jwt';
import { reorderSections } from '@/lib/db/queries/sections';
import { reorderSectionsSchema } from '@/lib/validation/section-schemas';
import { handleApiError, apiErrors } from '@/lib/utils/api-error';

/**
 * Authenticate request and extract token
 */
async function authenticateRequest(request: NextRequest): Promise<void> {
  let token: string | undefined;
  
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }
  
  if (!token) {
    token = request.cookies.get('admin_token')?.value;
  }
  
  if (!token) {
    throw apiErrors.unauthorized('No authentication token provided');
  }
  
  try {
    await verifyToken(token);
  } catch (error) {
    throw apiErrors.unauthorized('Invalid or expired token');
  }
}

/**
 * PUT /api/admin/solutions/[id]/sections/reorder
 * 
 * Reorders sections for a solution.
 * Updates order field based on array index.
 * 
 * @param id - Solution ID from URL params
 * @body sectionIds - Array of section IDs in desired order
 * @returns Success message with updated count
 * @status 200 - Sections reordered successfully
 * @status 400 - Validation error
 * @status 401 - Unauthorized
 * @status 404 - Some sections not found
 * @status 500 - Server error
 * 
 * Requirements: 4.8, 10.13
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate request
    await authenticateRequest(request);
    
    // Await params (Next.js 15 requirement)
    const { id: solutionId } = await params;
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = reorderSectionsSchema.parse(body);
    
    // Reorder sections
    try {
      const updatedSections = await reorderSections(
        solutionId,
        validatedData.sectionIds
      );
      
      await revalidateSolutionById(solutionId);
      return NextResponse.json(
        {
          message: 'Sections reordered successfully',
          count: updatedSections.length,
          sections: updatedSections.map((section) => ({
            id: section.id,
            order: section.order,
          })),
        },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof Error && error.message.includes('do not exist')) {
        throw apiErrors.notFound(error.message);
      }
      throw error;
    }
    
  } catch (error) {
    return handleApiError(error);
  }
}
