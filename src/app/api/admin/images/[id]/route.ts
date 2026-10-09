/**
 * Image Management API Route
 * 
 * DELETE /api/admin/images/[id] - Delete an image
 * Removes the image from both cloud storage and the database.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { getImageById, deleteImageRecord } from '@/lib/db/queries/images';
import { deleteImage } from '@/lib/storage/image-service';
import { handleApiError } from '@/lib/utils/api-error';

/**
 * DELETE handler - Delete image from storage and database
 */
export async function DELETE(
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

    // Get image ID from params
    const { id: imageId } = await params;

    // Get image record to retrieve storage key
    const image = await getImageById(imageId);

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Delete from cloud storage
    try {
      await deleteImage(image.storageKey);
    } catch (storageError) {
      console.error('Failed to delete from storage:', storageError);
      // Continue with database deletion even if storage deletion fails
      // This prevents orphaned database records
    }

    // Delete database record
    await deleteImageRecord(imageId);

    return NextResponse.json(
      { message: 'Image deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}