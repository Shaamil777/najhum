/**
 * Instrumentation for Next.js
 * 
 * This file runs once when the Next.js server starts, making it ideal for
 * environment validation and other startup tasks.
 * 
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  // Validate environment variables on startup
  // This will cause the application to exit with an error if validation fails
  const { validateEnv } = await import('./lib/env');
  
  validateEnv();
  
  console.log('✅ Environment variables validated successfully');
}
