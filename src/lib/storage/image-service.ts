import { uploadToR2, deleteFromR2 } from './r2';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface UploadResult {
  url: string;
  storageKey: string;
}

export async function validateImageFile(file: File): Promise<void> {
  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed.');
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size must be less than 10MB.');
  }

  // Validate file extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || !['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension)) {
    throw new Error('Invalid file extension. Only .jpg, .jpeg, .png, .webp, and .gif files are allowed.');
  }

  // Validate file headers (magic numbers) for security
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  // Check magic numbers for common image formats
  const isPNG = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47;
  const isJPEG = bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF;
  const isGIF = bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46;
  const isWebP = bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;

  if (!isPNG && !isJPEG && !isGIF && !isWebP) {
    throw new Error('File header validation failed. The file does not appear to be a valid image.');
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
  } else {
    throw new Error('Unsupported storage provider: ' + storageProvider);
  }
}
