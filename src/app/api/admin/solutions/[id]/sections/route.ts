/**
 * Section Creation API Route
 * 
 * POST endpoint for creating new sections in a solution.
 * Validates content based on section type.
 * 
 * Requirements: 4.3, 4.4, 10.10
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidateSolutionById } from '@/lib/utils/revalidate-solutions';
import { verifyToken } from '@/lib/auth/jwt';
import { createSection } from '@/lib/db/queries/sections';
import { createSectionSchema } from '@/lib/validation/section-schemas';
import { handleApiError, apiErrors } from '@/lib/utils/api-error';
import { SectionType as PrismaSectionType } from '@prisma/client';

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
 * POST /api/admin/solutions/[id]/sections
 * 
 * Creates a new section for a solution.
 * Automatically assigns next available order number.
 * 
 * @param id - Solution ID from URL params
 * @body type - Section type (HERO, INTRO, FEATURES, etc.)
 * @body content - Section content (validated based on type)
 * @returns Created section with 201 status
 * @status 201 - Section created successfully
 * @status 400 - Validation error
 * @status 401 - Unauthorized
 * @status 404 - Solution not found
 * @status 500 - Server error
 * 
 * Requirements: 4.3, 4.4, 10.10
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate request
    await authenticateRequest(request);
    
    // Await params (Next.js 15 requirement)
    const { id: solutionId } = await params;
    
    // Parse request body
    const body = await request.json();
    
    // Validate with discriminated union schema
    const validatedData = createSectionSchema.parse(body);
    
    // Create section in database
    try {
      const section = await createSection(
        solutionId,
        validatedData.type as PrismaSectionType,
        validatedData.content
      );
      
      await revalidateSolutionById(solutionId);
      // Format response
      return NextResponse.json(
        {
          id: section.id,
          solutionId: section.solutionId,
          type: section.type,
          order: section.order,
          isDraft: section.isDraft,
          content: section.content,
          createdAt: section.createdAt.toISOString(),
          updatedAt: section.updatedAt.toISOString(),
        },
        { status: 201 }
      );
    } catch (error) {
      if (error instanceof Error && error.message === 'Solution not found') {
        throw apiErrors.notFound('Solution not found');
      }
      throw error;
    }
    
  } catch (error) {
    console.error("SECTION CREATE ERROR:", error);
    return handleApiError(error);
  }
}
