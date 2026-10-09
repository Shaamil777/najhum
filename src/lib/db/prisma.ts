import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

/**
 * Prisma Client Singleton
 * 
 * Implements global caching for development hot-reload to prevent multiple instances.
 * Configures logging based on environment (query/error/warn in dev, error only in prod).
 * Enables connection pooling configuration via DATABASE_URL.
 * 
 * For Prisma Postgres (prisma+postgres://), extracts the direct TCP connection from the API key.
 * For regular postgres:// URLs, uses the connection string directly.
 * 
 * Requirements: 2.9, 13.7
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: pg.Pool | undefined;
};

// Validate DATABASE_URL is present
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

/**
 * Extract the actual PostgreSQL connection string from prisma+postgres:// URLs
 */
function getConnectionString(url: string): string {
  if (url.startsWith('prisma+postgres://')) {
    // Extract API key from the URL
    const apiKeyMatch = url.match(/api_key=([^&]+)/);
    if (apiKeyMatch) {
      try {
        // Decode the base64-encoded JSON in the API key
        const apiKeyData = JSON.parse(Buffer.from(apiKeyMatch[1], 'base64').toString());
        return apiKeyData.databaseUrl;
      } catch (error) {
        console.error('Failed to decode Prisma Postgres API key:', error);
        throw new Error('Invalid Prisma Postgres API key format');
      }
    }
    throw new Error('No API key found in prisma+postgres:// URL');
  }
  return url;
}

// Configure logging based on environment
const logConfig = process.env.NODE_ENV === 'production'
  ? ['error'] // Production: error only
  : ['query', 'error', 'warn']; // Development: query/error/warn

const connectionString = getConnectionString(process.env.DATABASE_URL);

const prismaClientSingleton = () => {
  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: logConfig as Array<'query' | 'error' | 'warn' | 'info'>,
  });
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Export the Prisma Client type for use in other files
export type { PrismaClient } from '@prisma/client';
