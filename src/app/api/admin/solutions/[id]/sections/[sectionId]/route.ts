/**
 * Section Detail API Routes
 * 
 * PUT and DELETE endpoints for individual section management.
 * 
 * Requirements: 4.6, 4.7, 10.11, 10.12
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { updateSection, deleteSection, getSectionById } from '@/lib/db/queries/sections';
import { handleApiError, apiErrors } from '@/lib/utils/api-error';
import { SectionContent } from '@/types/section';
import { createSectionSchema } from '@/lib/validation/section-schemas';
import { revalidateSolutionById } from '@/lib/utils/revalidate-solutions';

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
  } catch {
    throw apiErrors.unauthorized('Invalid or expired token');
  }
}

/**
 * PUT /api/admin/solutions/[id]/sections/[sectionId]
 * 
 * Updates section content.
 * 
 * @param id - Solution ID from URL params
 * @param sectionId - Section ID from URL params
 * @body content - Updated section content
 * @returns Updated section
 * @status 200 - Section updated successfully
 * @status 400 - Validation error
 * @status 401 - Unauthorized
 * @status 404 - Section not found
 * @status 500 - Server error
 * 
 * Requirements: 4.6, 10.11
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    // Authenticate request
    await authenticateRequest(request);
    
    // Await params (Next.js 15 requirement)
    const { id, sectionId } = await params;
    
    // Parse request body
    const body = await request.json();
    
    // Validate that content exists
    if (!body.content) {
      throw apiErrors.badRequest('Content is required');
    }

    const existing = await getSectionById(sectionId);
    if (!existing || existing.solutionId !== id) {
      throw apiErrors.notFound('Section not found');
    }
    const validation = createSectionSchema.safeParse({ type: existing.type, content: body.content });
    if (!validation.success) {
      throw apiErrors.badRequest(validation.error.issues.map((issue) => issue.message).join('; '));
    }
    const content: SectionContent = validation.data.content;
    
    // Update section
    try {
      const section = await updateSection(sectionId, content);
      await revalidateSolutionById(id);
      
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
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof Error && error.message === 'Section not found') {
        throw apiErrors.notFound('Section not found');
      }
      throw error;
    }
    
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/admin/solutions/[id]/sections/[sectionId]
 * 
 * Deletes a section and reorders remaining sections automatically.
 * 
 * @param id - Solution ID from URL params
 * @param sectionId - Section ID from URL params
 * @returns Empty response
 * @status 204 - Section deleted successfully
 * @status 401 - Unauthorized
 * @status 404 - Section not found
 * @status 500 - Server error
 * 
 * Requirements: 4.7, 10.12
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    // Authenticate request
    await authenticateRequest(request);
    
    // Await params (Next.js 15 requirement)
    const { id, sectionId } = await params;
    const existing = await getSectionById(sectionId);
    if (!existing || existing.solutionId !== id) throw apiErrors.notFound('Section not found');
    
    // Delete section (automatic reordering handled in query function)
    try {
      await deleteSection(sectionId);
      await revalidateSolutionById(id);
      
      // Return 204 No Content
      return new NextResponse(null, { status: 204 });
    } catch (error) {
      if (error instanceof Error && error.message === 'Section not found') {
        throw apiErrors.notFound('Section not found');
      }
      throw error;
    }
    
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PATCH /api/admin/solutions/[id]/sections/[sectionId]
 * 
 * Toggle section draft status.
 * 
 * @param id - Solution ID from URL params
 * @param sectionId - Section ID from URL params
 * @body isDraft - Draft status (boolean)
 * @returns Updated section
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    // Authenticate request
    await authenticateRequest(request);
    
    // Await params
    const { id, sectionId } = await params;
    const existing = await getSectionById(sectionId);
    if (!existing || existing.solutionId !== id) throw apiErrors.notFound('Section not found');
    
    // Parse request body
    const body = await request.json();
    
    if (typeof body.isDraft !== 'boolean') {
      throw apiErrors.badRequest('isDraft must be a boolean');
    }
    
    // Import toggleSectionDraft here to avoid circular dependency
    const { toggleSectionDraft } = await import('@/lib/db/queries/sections');
    
    try {
      const section = await toggleSectionDraft(sectionId, body.isDraft);
      await revalidateSolutionById(id);
      
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
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof Error && error.message === 'Section not found') {
        throw apiErrors.notFound('Section not found');
      }
      throw error;
    }
    
  } catch (error) {
    return handleApiError(error);
  }
}
