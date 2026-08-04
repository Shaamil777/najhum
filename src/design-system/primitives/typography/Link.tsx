import NextLink from "next/link";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Link behaviour variant.
 *
 * - internal → uses Next.js <Link> with client-side navigation. No rel attribute.
 * - external → renders <a> with target="_blank" and rel="noopener noreferrer" for security.
 */
type LinkVariant = "internal" | "external";

/**
 * Underline display mode.
 *
 * - always  → always underlined (default — clearest affordance for accessibility)
 * - hover   → underline only on hover
 * - never   → no underline (use only when context makes link intent obvious)
 */
type LinkUnderline = "always" | "hover" | "never";

export interface LinkProps
  extends Omit<ComponentPropsWithoutRef<typeof NextLink>, "href"> {
  href: string;
  /** Whether this link navigates internally or externally */
  variant?: LinkVariant;
  /** Underline display mode */
  underline?: LinkUnderline;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

const UNDERLINE_MAP: Record<LinkUnderline, string> = {
  always: "underline underline-offset-2",
  hover:  "no-underline hover:underline hover:underline-offset-2",
  never:  "no-underline",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Link
 *
 * A typography primitive for hyperlinks.
 * Wraps Next.js <Link> for internal navigation and renders <a> for external links.
 * Handles security attributes, underline variants, and accessible hover styles.
 *
 * Server Component — no "use client" required.
 * Next.js <Link> is safe to use in Server Components.
 *
 * @example
 * // Internal navigation
 * <Link href="/about" underline="hover">About Najhum</Link>
 *
 * @example
 * // External link (adds target="_blank" + rel="noopener noreferrer" automatically)
 * <Link href="https://iotrics.io" variant="external" underline="always">
 *   Visit IoTRICS
 * </Link>
 */
export function Link({
  href,
  variant = "internal",
  underline = "hover",
  className,
  children,
  ...props
}: LinkProps) {
  const baseStyles = cn(
    "text-primary transition-colors duration-200",
    "hover:text-primary-hover",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm",
    UNDERLINE_MAP[underline],
    className
  );

  if (variant === "external") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseStyles}
        {...(props as ComponentPropsWithoutRef<"a">)}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={baseStyles} {...props}>
      {children}
    </NextLink>
  );
}
