/**
 * General File Upload API Route
 * 
 * POST /api/admin/upload
 * Handles general file and document uploads (PDFs, images, brochures) directly to Cloudflare R2.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { uploadToR2 } from '@/lib/storage/r2';
import { handleApiError } from '@/lib/utils/api-error';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
];

export async function POST(req: NextRequest) {
  try {
    // 1. Verify admin authentication
    const token =
      req.cookies.get('admin_token')?.value ||
      req.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      await verifyToken(token);
    } catch {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 3. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum allowed limit (50MB).' },
        { status: 400 }
      );
    }

    // 4. Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `File type "${file.type}" is not supported. Allowed: PDF, JPG, PNG, WebP, GIF, SVG.` },
        { status: 400 }
      );
    }

    // 5. Generate unique key
    const extension = file.name.split('.').pop()?.toLowerCase() || 'bin';
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '');
    const storageKey = `${sanitizedFolder}/${crypto.randomUUID()}.${extension}`;

    // 6. Upload directly to Cloudflare R2
    const uploadResult = await uploadToR2(file, storageKey);

    return NextResponse.json(
      {
        url: uploadResult.url,
        storageKey: uploadResult.storageKey,
        name: file.name,
        size: file.size,
        type: file.type,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token =
      req.cookies.get('admin_token')?.value ||
      req.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      await verifyToken(token);
    } catch {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const body = await req.json();
    let storageKey = body.storageKey as string | undefined;

    if (!storageKey && body.url) {
      const publicUrl = process.env.R2_PUBLIC_URL || '';
      if (publicUrl && body.url.startsWith(publicUrl)) {
        storageKey = body.url.replace(`${publicUrl}/`, '');
      }
    }

    if (!storageKey) {
      return NextResponse.json({ error: 'storageKey or url is required' }, { status: 400 });
    }

    const { deleteFromR2 } = await import('@/lib/storage/r2');
    await deleteFromR2(storageKey);

    return NextResponse.json({ success: true, message: 'File deleted from storage' });
  } catch (error) {
    return handleApiError(error);
  }
}
