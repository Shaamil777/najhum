/**
 * Cloudflare R2 Image Upload Service
 * 
 * R2 is S3-compatible, so we use the AWS SDK with R2 endpoints.
 * Provides upload and delete functions for image storage.
 * 
 * Requirements: 6.3, 6.8, 6.11
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

/**
 * Initialize S3 client configured for Cloudflare R2
 */
function getR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('R2 credentials not configured');
  }

  return new S3Client({
    region: 'auto',
    endpoint: 'https://' + accountId + '.r2.cloudflarestorage.com',
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

/**
 * Upload image to Cloudflare R2
 * 
 * @param file - File object to upload
 * @param key - Storage key (path) for the file
 * @returns Object with url and storageKey
 * @throws Error if upload fails
 */
export async function uploadToR2(
  file: File,
  key: string
): Promise<{ url: string; storageKey: string }> {
  try {
    const client = getR2Client();
    const bucket = process.env.R2_BUCKET_NAME;
    const publicUrl = process.env.R2_PUBLIC_URL;

    if (!bucket) {
      throw new Error('R2_BUCKET_NAME not configured');
    }

    if (!publicUrl) {
      throw new Error('R2_PUBLIC_URL not configured');
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    await client.send(command);

    // Construct public URL
    const url = publicUrl + '/' + key;

    return {
      url,
      storageKey: key,
    };
  } catch (error) {
    console.error('Failed to upload to R2:', error);
    throw new Error('Failed to upload image to storage');
  }
}

/**
 * Delete image from Cloudflare R2
 * 
 * @param key - Storage key of the file to delete
 * @throws Error if deletion fails
 */
export async function deleteFromR2(key: string): Promise<void> {
  try {
    const client = getR2Client();
    const bucket = process.env.R2_BUCKET_NAME;

    if (!bucket) {
      throw new Error('R2_BUCKET_NAME not configured');
    }

    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    await client.send(command);
  } catch (error) {
    console.error('Failed to delete from R2:', error);
    throw new Error('Failed to delete image from storage');
  }
}
