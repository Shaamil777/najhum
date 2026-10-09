/**
 * Slug generation and validation utilities for solution pages
 */

/**
 * Generates a URL-safe slug from a title
 * 
 * Converts title to lowercase, replaces spaces and special characters with hyphens,
 * removes consecutive hyphens, and trims leading/trailing hyphens.
 * 
 * @param title - The title to convert to a slug
 * @returns A URL-safe slug matching regex ^[a-z0-9-]+$
 * 
 * @example
 * generateSlug("Hello World") // "hello-world"
 * generateSlug("My Great Solution!") // "my-great-solution"
 * generateSlug("Product -- Version 2.0") // "product-version-2-0"
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]+/g, '-') // Replace spaces and special characters with hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
    .replace(/^-|-$/g, ''); // Trim leading/trailing hyphens
}

/**
 * Validates that a slug matches the required format
 * 
 * Ensures the slug contains only lowercase letters, numbers, and hyphens
 * and is not empty.
 * 
 * @param slug - The slug to validate
 * @returns true if the slug is valid, false otherwise
 * 
 * @example
 * validateSlug("hello-world") // true
 * validateSlug("my-solution-123") // true
 * validateSlug("Invalid Slug") // false (contains spaces and uppercase)
 * validateSlug("hello_world") // false (contains underscore)
 * validateSlug("") // false (empty)
 */
export function validateSlug(slug: string): boolean {
  // Check if slug matches pattern: lowercase letters, numbers, and hyphens only
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug);
}
