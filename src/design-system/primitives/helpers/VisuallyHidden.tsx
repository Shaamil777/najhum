import { type HTMLAttributes } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * When true, the element is completely removed from the visual render
   * but remains accessible to screen readers.
   *
   * When false, renders visibly. This allows conditional usage —
   * e.g. show text on desktop, hide it on mobile while keeping SR access.
   *
   * @default true
   */
  hidden?: boolean;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

/**
 * The canonical SR-only pattern (used by Tailwind's sr-only utility).
 * Applied as a static string — no runtime computation, no cn() overhead.
 *
 * This is intentionally NOT using Tailwind's `sr-only` utility class because:
 * 1. The class name `sr-only` may not be present in a project without explicit usage
 * 2. Keeping it explicit avoids any future Tailwind purge misconfiguration risk
 * 3. This is a zero-JS, zero-runtime primitive — the styles are statically embedded
 */
const SR_ONLY_CLASS =
  "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 clip-[rect(0,0,0,0)]";

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * VisuallyHidden
 *
 * Hides content visually while keeping it fully accessible to screen readers.
 * Essential for icon-only buttons, decorative skip links, and supplemental
 * context for assistive technology users.
 *
 * Follows the modern sr-only CSS pattern. Does NOT use `display:none` or
 * `visibility:hidden` which also hide content from screen readers.
 *
 * Server Component — zero JavaScript bundle contribution.
 *
 * @example
 * // Icon-only button with accessible label
 * <button aria-label="Close menu">
 *   <CloseIcon aria-hidden="true" />
 *   <VisuallyHidden>Close menu</VisuallyHidden>
 * </button>
 *
 * @example
 * // Skip navigation link (visible on focus via parent :focus-within)
 * <a href="#main-content" className="focus:not-sr-only">
 *   <VisuallyHidden>Skip to main content</VisuallyHidden>
 * </a>
 *
 * @example
 * // Conditionally hide label on small screens
 * <VisuallyHidden hidden className="md:not-sr-only md:static md:w-auto md:h-auto ...">
 *   Dashboard
 * </VisuallyHidden>
 */
export function VisuallyHidden({
  hidden = true,
  className,
  children,
  ...props
}: VisuallyHiddenProps) {
  return (
    <span
      className={hidden ? `${SR_ONLY_CLASS}${className ? ` ${className}` : ""}` : className}
      {...props}
    >
      {children}
    </span>
  );
}
