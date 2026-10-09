/**
 * Environment Variable Validation
 * 
 * This module validates all required environment variables at application startup.
 * Ensures that the system fails fast with clear error messages if configuration is missing.
 */

import { z } from 'zod';

/**
 * Zod schema for environment variables validation
 */
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required for database connection'),

  // Authentication
  ADMIN_USERNAME: z.string().min(1, 'ADMIN_USERNAME is required for admin authentication'),
  ADMIN_PASSWORD: z.string().min(1, 'ADMIN_PASSWORD is required for admin authentication'),
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters long (256-bit minimum)'),

  // Application URL
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url('NEXT_PUBLIC_APP_URL must be a valid URL')
    .min(1, 'NEXT_PUBLIC_APP_URL is required for application base URL'),

  // Storage Provider
  STORAGE_PROVIDER: z.enum(['r2', 'aws-s3', 'vercel-blob']).optional().default('r2'),

  // Image Storage - Cloudflare R2 (Optional)
  R2_ACCOUNT_ID: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
  R2_BUCKET_NAME: z.string().optional(),
  R2_PUBLIC_URL: z.string().optional(),

  // Image Storage - AWS S3 (Optional)
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),

  // Image Storage - Vercel Blob (Optional)
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
}).refine(
  (data) => {
    // At least one storage provider must be fully configured
    const hasR2 = !!(
      data.R2_ACCOUNT_ID &&
      data.R2_ACCESS_KEY_ID &&
      data.R2_SECRET_ACCESS_KEY &&
      data.R2_BUCKET_NAME &&
      data.R2_PUBLIC_URL
    );
    const hasS3 = !!(
      data.AWS_ACCESS_KEY_ID &&
      data.AWS_SECRET_ACCESS_KEY &&
      data.AWS_REGION &&
      data.AWS_S3_BUCKET
    );
    const hasVercelBlob = !!data.BLOB_READ_WRITE_TOKEN;
    return hasR2 || hasS3 || hasVercelBlob;
  },
  {
    message:
      'At least one image storage provider must be configured:\n' +
      '    - Cloudflare R2: Requires R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, and R2_PUBLIC_URL\n' +
      '    - AWS S3: Requires AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and AWS_S3_BUCKET\n' +
      '    - Vercel Blob: Requires BLOB_READ_WRITE_TOKEN',
  }
);

/**
 * Type inference from Zod schema
 */
type EnvironmentConfig = z.infer<typeof envSchema>;

interface EnvironmentConfigWithOptionals extends EnvironmentConfig {
  R2_ACCOUNT_ID?: string;
  R2_ACCESS_KEY_ID?: string;
  R2_SECRET_ACCESS_KEY?: string;
  R2_BUCKET_NAME?: string;
  R2_PUBLIC_URL?: string;
  AWS_ACCESS_KEY_ID?: string;
  AWS_SECRET_ACCESS_KEY?: string;
  AWS_REGION?: string;
  AWS_S3_BUCKET?: string;
  BLOB_READ_WRITE_TOKEN?: string;
}

/**
 * Validates required environment variables at application startup
 * @throws Error if required environment variables are missing or invalid
 */
export function validateEnv(): EnvironmentConfigWithOptionals {
  try {
    // Validate using Zod schema
    const validatedEnv = envSchema.parse({
      DATABASE_URL: process.env.DATABASE_URL,
      ADMIN_USERNAME: process.env.ADMIN_USERNAME,
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
      JWT_SECRET: process.env.JWT_SECRET,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      STORAGE_PROVIDER: process.env.STORAGE_PROVIDER,
      R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
      R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
      R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
      R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
      R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_REGION: process.env.AWS_REGION,
      AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
      BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Check for warnings
    const warnings = checkWarnings();
    if (warnings.length > 0) {
      console.warn('??  Environment Configuration Warnings:');
      warnings.forEach((warning) => console.warn(`  - ${warning}`));
    }

    return validatedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = [
        '? Environment Configuration Error:',
        '',
        ...error.issues.map((err) => `  - ${err.path.join('.')}: ${err.message}`),
        '',
        'Please check your .env file and ensure all required variables are set.',
        'See .env.example for reference.',
      ].join('\n');

      console.error(errorMessage);
      
      // Removed process.exit to prevent Edge runtime crashes.
      throw new Error('Environment validation failed:\n' + errorMessage);
    }
    throw error;
  }
}

/**
 * Checks for configuration warnings
 */
function checkWarnings(): string[] {
  const warnings: string[] = [];

  // Partial R2 configuration warnings
  const r2Vars = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_PUBLIC_URL'];
  const configuredR2Vars = r2Vars.filter((varName) => !!process.env[varName]);

  if (configuredR2Vars.length > 0 && configuredR2Vars.length < 5) {
    warnings.push(
      `Partial Cloudflare R2 configuration detected. Missing: ${r2Vars
        .filter((v) => !process.env[v])
        .join(', ')}`
    );
  }

  // Partial S3 configuration warnings
  const s3Vars = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'AWS_S3_BUCKET'];
  const configuredS3Vars = s3Vars.filter((varName) => !!process.env[varName]);

  if (configuredS3Vars.length > 0 && configuredS3Vars.length < 4) {
    warnings.push(
      `Partial AWS S3 configuration detected. Missing: ${s3Vars
        .filter((v) => !process.env[v])
        .join(', ')}`
    );
  }

  // Multiple storage providers configured (informational)
  const hasR2Config = !!(
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET_NAME &&
    process.env.R2_PUBLIC_URL
  );
  const hasS3Config = !!(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_REGION &&
    process.env.AWS_S3_BUCKET
  );
  const hasVercelBlobConfig = !!process.env.BLOB_READ_WRITE_TOKEN;

  const configuredProviders = [
    hasR2Config ? 'Cloudflare R2' : null,
    hasS3Config ? 'AWS S3' : null,
    hasVercelBlobConfig ? 'Vercel Blob' : null,
  ].filter(Boolean);

  if (configuredProviders.length > 1) {
    warnings.push(
      `Multiple storage providers configured: ${configuredProviders.join(', ')}. Using ${process.env.STORAGE_PROVIDER || 'r2'} as primary.`
    );
  }

  return warnings;
}

/**
 * Returns the configured storage provider type
 */
export function getStorageProvider(): 'r2' | 'aws-s3' | 'vercel-blob' | null {
  const storageProvider = process.env.STORAGE_PROVIDER || 'r2';

  if (storageProvider === 'r2') {
    const hasR2Config = !!(
      process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET_NAME &&
      process.env.R2_PUBLIC_URL
    );
    return hasR2Config ? 'r2' : null;
  }

  if (storageProvider === 'aws-s3') {
    const hasS3Config = !!(
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_REGION &&
      process.env.AWS_S3_BUCKET
    );
    return hasS3Config ? 'aws-s3' : null;
  }

  if (storageProvider === 'vercel-blob') {
    const hasVercelBlobConfig = !!process.env.BLOB_READ_WRITE_TOKEN;
    return hasVercelBlobConfig ? 'vercel-blob' : null;
  }

  return null;
}

/**
 * Checks if a specific storage provider is configured
 */
export function hasStorageProvider(provider: 'r2' | 'aws-s3' | 'vercel-blob'): boolean {
  if (provider === 'r2') {
    return !!(
      process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET_NAME &&
      process.env.R2_PUBLIC_URL
    );
  }

  if (provider === 'aws-s3') {
    return !!(
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_REGION &&
      process.env.AWS_S3_BUCKET
    );
  }
  
  if (provider === 'vercel-blob') {
    return !!process.env.BLOB_READ_WRITE_TOKEN;
  }
  
  return false;
}

/**
 * Get the application base URL
 */
export function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

// Export environment configuration (validated on import)
export const env = validateEnv();
