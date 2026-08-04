import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — Class Name utility
 *
 * Merges Tailwind CSS class names safely using clsx for conditionals
 * and tailwind-merge to resolve conflicts (e.g. p-4 + px-6 → px-6).
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-primary", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
