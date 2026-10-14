import { uploadToR2, deleteFromR2 } from './r2';
import { put, del } from '@vercel/blob';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

interface UploadResult {
  url: string;
  storageKey: string;
}

export async function validateImageFile(file: File): Promise<void> {
  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP, GIF, and PDF files are allowed.');
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size must be less than 25MB.');
  }

  // Validate file extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || !['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'].includes(extension)) {
    throw new Error('Invalid file extension. Only .jpg, .jpeg, .png, .webp, .gif, and .pdf files are allowed.');
  }

  // Validate file headers (magic numbers) for security
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  // Check magic numbers for common image formats and PDF
  const isPNG = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47;
  const isJPEG = bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF;
  const isGIF = bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46;
  const isWebP = bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
  const isPDF = bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46; // %PDF

  if (!isPNG && !isJPEG && !isGIF && !isWebP && !isPDF) {
    throw new Error('File header validation failed. The file does not appear to be a valid image or PDF document.');
  }
}

export async function uploadImage(file: File, solutionId: string): Promise<UploadResult> {
  // Validate the file
  await validateImageFile(file);

  // Generate unique storage key
  const extension = file.name.split('.').pop()?.toLowerCase();
  const storageKey = `${solutionId}/${crypto.randomUUID()}.${extension}`;

  // Detect storage provider
  const storageProvider = process.env.STORAGE_PROVIDER || 'r2';

  // Route to appropriate upload function
  if (storageProvider === 'r2') {
    if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
      throw new Error('R2 storage credentials are not configured.');
    }
    return await uploadToR2(file, storageKey);
  } else if (storageProvider === 'vercel-blob') {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) throw new Error('Vercel Blob storage credentials are not configured.');
    const blob = await put(storageKey, file, { access: 'public', addRandomSuffix: false, contentType: file.type, token });
    return { url: blob.url, storageKey: blob.url };
  } else {
    throw new Error('Unsupported storage provider: ' + storageProvider);
  }
}

export async function deleteImage(storageKey: string): Promise<void> {
  const storageProvider = process.env.STORAGE_PROVIDER || 'r2';

  if (storageProvider === 'r2') {
    if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
      throw new Error('R2 storage credentials are not configured.');
    }
    await deleteFromR2(storageKey);
  } else if (storageProvider === 'vercel-blob') {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) throw new Error('Vercel Blob storage credentials are not configured.');
    await del(storageKey, { token });
  } else {
    throw new Error('Unsupported storage provider: ' + storageProvider);
  }
}
