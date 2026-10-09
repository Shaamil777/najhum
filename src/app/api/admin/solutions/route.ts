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
import { getAllSolutions, createSolution } from '@/lib/db/queries/solutions';
import { createSolutionSchema } from '@/lib/validation/solution-schemas';
import { generateSlug } from '@/lib/utils/slug';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

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
      isDraft: solution.isDraft,
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
export async function POST(request: NextRequest) {
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
    
    // Parse request body
    const body = await request.json();
    
    // Generate slug from title if slug not provided
    if (!body.slug && body.title) {
      body.slug = generateSlug(body.title);
    }
    
    // Validate request body with Zod schema
    let validatedData;
    try {
      validatedData = createSolutionSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            error: 'Validation failed',
            details: error.issues.map((err) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          },
          { status: 400 }
        );
      }
      throw error; // Re-throw unexpected errors
    }
    
    // Create solution in database
    try {
      const solution = await createSolution({
        title: validatedData.title,
        slug: validatedData.slug,
        metaDescription: validatedData.metaDescription,
      });
      
      // Return created solution with 201 status
      return NextResponse.json(
        {
          id: solution.id,
          slug: solution.slug,
          title: solution.title,
          metaDescription: solution.metaDescription,
          isDraft: solution.isDraft,
          createdAt: solution.createdAt.toISOString(),
          updatedAt: solution.updatedAt.toISOString(),
        },
        { status: 201 }
      );
    } catch (error) {
      // Handle Prisma unique constraint violation (duplicate slug)
      if (error instanceof Error && error.message === 'A solution with this slug already exists') {
        return NextResponse.json(
          { error: 'A solution with this slug already exists' },
          { status: 409 }
        );
      }
      throw error; // Re-throw other errors to outer catch block
    }
    
  } catch (error) {
    console.error('Error in POST /api/admin/solutions:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create solution',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}
