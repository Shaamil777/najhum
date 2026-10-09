/**
 * Solution Publish API Route
 * 
 * POST /api/admin/solutions/[id]/publish - Publish a solution
 * Sets isDraft=false on solution and all enabled sections (where section.isDraft=false).
 * Triggers on-demand revalidation for the public solution page.
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidateSolutions } from '@/lib/utils/revalidate-solutions';
import { verifyToken } from '@/lib/auth/jwt';
import { publishSolution, getSolutionById } from '@/lib/db/queries/solutions';
import { handleApiError } from '@/lib/utils/api-error';

/**
 * POST handler - Publish solution
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

    // Publish the solution
    const solution = await publishSolution(solutionId);

    // Trigger on-demand revalidation for the public solution page
    try {
      revalidateSolutions(solution.slug);
    } catch (revalidateError) {
      console.error('Failed to revalidate path:', revalidateError);
      // Continue even if revalidation fails
    }

    return NextResponse.json(solution, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}