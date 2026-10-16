/**
 * Image Upload API Route
 * 
 * POST /api/admin/images - Upload a new image file
 * Handles file validation, upload to cloud storage, and database record creation.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { uploadImage } from '@/lib/storage/image-service';
import { createImage } from '@/lib/db/queries/images';
import { handleApiError } from '@/lib/utils/api-error';

/**
 * POST handler - Upload new image
 */
export async function POST(req: NextRequest) {
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

    // Parse form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const solutionId = formData.get('solutionId') as string | null;
    const altText = formData.get('altText') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const folder = solutionId || 'solutions';

    // Upload to cloud storage
    const uploadResult = await uploadImage(file, folder);

    if (solutionId) {
      try {
        // Create database record if solution exists in database
        const image = await createImage({
          solutionId,
          url: uploadResult.url,
          storageKey: uploadResult.storageKey,
          altText: altText || undefined,
        });

        return NextResponse.json(image, { status: 201 });
      } catch (dbErr) {
        // If solution record does not exist in DB yet, still return uploaded image URL
        return NextResponse.json(
          {
            url: uploadResult.url,
            storageKey: uploadResult.storageKey,
            altText: altText || undefined,
          },
          { status: 201 }
        );
      }
    }

    return NextResponse.json(
      {
        url: uploadResult.url,
        storageKey: uploadResult.storageKey,
        altText: altText || undefined,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
