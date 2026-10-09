/**
 * Solution Unpublish API Route
 * 
 * POST /api/admin/solutions/[id]/unpublish - Unpublish a solution
 * Sets isDraft=true on solution, hiding it from the public site.
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidateSolutions } from '@/lib/utils/revalidate-solutions';
import { verifyToken } from '@/lib/auth/jwt';
import { unpublishSolution, getSolutionById } from '@/lib/db/queries/solutions';
import { handleApiError } from '@/lib/utils/api-error';

/**
 * POST handler - Unpublish solution
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify JWT token
    const token = req.cookies.get('admin_token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      await verifyToken(token);
    } catch {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get solution ID from params
    const { id: solutionId } = await params;

    // Get solution to retrieve slug before unpublishing
    const solution = await getSolutionById(solutionId);

    if (!solution) {
      return NextResponse.json(
        { error: 'Solution not found' },
        { status: 404 }
      );
    }

    // Unpublish the solution
    const updatedSolution = await unpublishSolution(solutionId);

    // Trigger revalidation to remove from public cache
    try {
      revalidateSolutions(solution.slug);
    } catch (revalidateError) {
      console.error('Failed to revalidate path:', revalidateError);
      // Continue even if revalidation fails
    }

    return NextResponse.json(updatedSolution, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}