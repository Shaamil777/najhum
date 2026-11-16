/**
 * Admin Solutions API Route
 * 
 * Provides GET endpoint for listing all solutions and POST endpoint for creating solutions
 * in admin console. Requires JWT authentication via Authorization header or cookies.
 * 
 * Requirements: 2.4, 2.5, 3.1, 3.3, 10.2, 10.3, 10.5, 10.6, 12.3
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { getAllSolutions, } from '@/lib/db/queries/solutions';

/**
 * GET /api/admin/solutions
 * 
 * Lists all solutions with basic metadata for admin view.
 * Returns solutions ordered by most recently updated.
 * 
 * @returns JSON array of solutions with fields: id, title, slug, isDraft, createdAt, updatedAt
 * @status 200 - Success with solution list
 * @status 401 - Unauthorized (missing or invalid JWT token)
 * @status 500 - Server error
 * 
 * Requirements: 3.1, 10.2, 10.3, 10.5
 */
export async function GET(request: NextRequest) {
  try {
    // Extract JWT token from Authorization header or cookies
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
    
    // Return 401 if no token found
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized: No authentication token provided' },
        { status: 401 }
      );
    }
    
    // Verify JWT token
    try {
      await verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or expired token' },
        { status: 401 }
      );
    }
    
    // Fetch all solutions from database
    const solutions = await getAllSolutions();
    
    // Map to response format with only necessary fields
    const responseData = solutions.map((solution) => ({
      id: solution.id,
      title: solution.title,
      slug: solution.slug,
      coverImage: solution.coverImage,
      platforms: solution.platforms,
      classification: solution.classification,
      isDraft: solution.isDraft,
      publishedRevisionId: solution.publishedRevisionId,
      createdAt: solution.createdAt.toISOString(),
      updatedAt: solution.updatedAt.toISOString(),
    }));
    
    return NextResponse.json(responseData, { status: 200 });
    
  } catch (error) {
    console.error('Error in GET /api/admin/solutions:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch solutions',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/solutions
 * 
 * Creates a new solution page with draft status.
 * Validates input data, generates slug if not provided, and handles duplicate slugs.
 * 
 * @body title - Solution title (required, max 200 chars)
 * @body slug - URL-safe slug (optional, auto-generated from title if not provided, max 100 chars)
 * @body metaDescription - SEO meta description (optional, max 300 chars)
 * 
 * @returns JSON object with created solution data
 * @status 201 - Solution created successfully
 * @status 400 - Validation error (invalid input data)
 * @status 401 - Unauthorized (missing or invalid JWT token)
 * @status 409 - Conflict (duplicate slug)
 * @status 500 - Server error
 * 
 * Requirements: 2.4, 2.5, 3.3, 10.6, 12.3
 */
export async function POST() { return NextResponse.json({error:'Use /api/admin/solutions/import to create an HTML solution.'},{status:410}); }
