/**
 * API Error Handling Utilities
 * 
 * Provides centralized error handling for API routes with consistent error responses.
 * Handles Zod validation errors, Prisma errors, and custom API errors.
 * 
 * Requirements: 10.16, 10.17, 12.5
 */

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

/**
 * Custom API Error class
 * Used for throwing errors with specific HTTP status codes
 */
export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(message: string, statusCode: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * Format Zod validation errors into a readable structure
 */
function formatZodError(error: ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));
}

/**
 * Handle Prisma-specific errors
 */
function handlePrismaError(error: Prisma.PrismaClientKnownRequestError): { status: number; message: string } {
  switch (error.code) {
    case 'P2002':
      // Unique constraint violation
      return {
        status: 409,
        message: 'A record with this value already exists',
      };
    case 'P2025':
      // Record not found
      return {
        status: 404,
        message: 'Record not found',
      };
    case 'P2003':
      // Foreign key constraint violation
      return {
        status: 400,
        message: 'Invalid reference to related record',
      };
    case 'P2014':
      // Required relation violation
      return {
        status: 400,
        message: 'The change would violate required relation',
      };
    default:
      return {
        status: 500,
        message: 'Database operation failed',
      };
  }
}

/**
 * Central error handler for API routes
 * Converts various error types into appropriate NextResponse objects
 * 
 * @param error - The error to handle
 * @returns NextResponse with appropriate status code and error message
 * 
 * Requirements: 10.16, 10.17, 12.5
 */
export function handleApiError(error: unknown): NextResponse {
  // Log error for debugging (server-side only)
  console.error('API Error:', error);

  // Handle custom ApiError instances
  if (error instanceof ApiError) {
    const responseBody: { error: string; details?: unknown } = {
      error: error.message,
    };
    if (error.details) {
      responseBody.details = error.details;
    }
    return NextResponse.json(responseBody, { status: error.statusCode });
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: formatZodError(error),
      },
      { status: 400 }
    );
  }

  // Handle Prisma known errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const { status, message } = handlePrismaError(error);
    return NextResponse.json(
      {
        error: message,
        code: error.code,
      },
      { status }
    );
  }

  // Handle Prisma validation errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json(
      {
        error: 'Invalid data provided to database',
      },
      { status: 400 }
    );
  }

  // Handle generic Error instances
  if (error instanceof Error) {
    // In production, don''t expose internal error messages
    const isProduction = process.env.NODE_ENV === 'production';
    return NextResponse.json(
      {
        error: isProduction ? 'Internal server error' : error.message,
      },
      { status: 500 }
    );
  }

  // Handle unknown error types
  return NextResponse.json(
    {
      error: 'An unexpected error occurred',
    },
    { status: 500 }
  );
}

/**
 * Helper function to create common API errors
 */
export const apiErrors = {
  unauthorized: (message = 'Unauthorized') => new ApiError(message, 401),
  forbidden: (message = 'Forbidden') => new ApiError(message, 403),
  notFound: (message = 'Not found') => new ApiError(message, 404),
  conflict: (message = 'Conflict') => new ApiError(message, 409),
  badRequest: (message = 'Bad request', details?: unknown) => new ApiError(message, 400, details),
  internal: (message = 'Internal server error') => new ApiError(message, 500),
};