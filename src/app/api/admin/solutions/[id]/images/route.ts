/**
 * Solution Images API Route
 * 
 * GET /api/admin/solutions/[id]/images - Get all images for a solution
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { getImagesBySolutionId } from '@/lib/db/queries/images';
import { handleApiError } from '@/lib/utils/api-error';

/**
 * GET handler - Fetch all images for a solution
 */
export async function GET(
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

    // Fetch images
    const images = await getImagesBySolutionId(solutionId);

    return NextResponse.json(images);
  } catch (error) {
    return handleApiError(error);
  }
}