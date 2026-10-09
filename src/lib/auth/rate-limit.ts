export interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory LRU cache for rate limiting
const attempts = new Map<string, RateLimitRecord>();

// Login rate limit configuration: 5 attempts per 15 minutes
export const LOGIN_RATE_LIMIT: RateLimitConfig = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
};

/**
 * Checks if a request is within rate limit
 * @param identifier - Unique identifier (typically IP address)
 * @param config - Rate limit configuration
 * @returns true if within limit, false if exceeded
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): boolean {
  const now = Date.now();
  const record = attempts.get(identifier);

  // If no record exists or the window has expired, create a new record
  if (!record || now > record.resetAt) {
    attempts.set(identifier, {
      count: 1,
      resetAt: now + config.windowMs,
    });
    return true;
  }

  // Check if max attempts exceeded
  if (record.count >= config.maxAttempts) {
    return false;
  }

  // Increment attempt count
  record.count++;
  return true;
}

/**
 * Resets rate limit for a specific identifier (useful for testing)
 * @param identifier - Unique identifier to reset
 */
export function resetRateLimit(identifier: string): void {
  attempts.delete(identifier);
}

/**
 * Clears all rate limit records (useful for testing and cleanup)
 */
export function clearAllRateLimits(): void {
  attempts.clear();
}
