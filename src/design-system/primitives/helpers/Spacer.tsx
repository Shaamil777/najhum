import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Spacer size scale.
 *
 * Maps to Tailwind spacing utilities backed by the design token scale.
 * No inline styles, no arbitrary values, no hardcoded pixel values.
 *
 * Token reference (spacing.ts):
 * - xs  → spacing[2]  → 0.5rem  → 8px
 * - sm  → spacing[4]  → 1rem    → 16px
 * - md  → spacing[8]  → 2rem    → 32px
 * - lg  → spacing[16] → 4rem    → 64px
 * - xl  → spacing[24] → 6rem    → 96px
 * - 2xl → spacing[32] → 8rem    → 128px
 */
type SpacerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Spacer axis.
 * - vertical   → inserts vertical whitespace (affects block flow)
 * - horizontal → inserts horizontal whitespace (for flex/inline contexts)
 */
type SpacerAxis = "vertical" | "horizontal";

export interface SpacerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpacerSize;
  axis?: SpacerAxis;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

// Vertical axis uses display:block with height set via Tailwind h-* class.
// Horizontal axis uses display:inline-block with width set via Tailwind w-* class.
// All classes map to the design token scale — zero arbitrary values.
const SIZE_MAP: Record<SpacerAxis, Record<SpacerSize, string>> = {
  vertical: {
    xs:   "h-2",
    sm:   "h-4",
    md:   "h-8",
    lg:   "h-16",
    xl:   "h-24",
    "2xl":"h-32",
  },
  horizontal: {
    xs:   "w-2",
    sm:   "w-4",
    md:   "w-8",
    lg:   "w-16",
    xl:   "w-24",
    "2xl":"w-32",
  },
};

const DISPLAY_MAP: Record<SpacerAxis, string> = {
  vertical:   "block",
  horizontal: "inline-block",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Spacer
 *
 * An invisible layout helper that inserts whitespace between elements.
 * Prefer layout primitives (Stack gap, Grid gap) for consistent spacing.
 * Use Spacer only when you need one-off spacing that doesn't fit a repeating pattern.
 *
 * Renders as an aria-hidden <span> — invisible to assistive technologies.
 * Uses Tailwind spacing utilities backed by design tokens — no inline styles.
 *
 * @example
 * // Push content apart vertically
 * <Heading>Title</Heading>
 * <Spacer size="lg" />
 * <Text>Body</Text>
 *
 * @example
 * // Horizontal spacer in a flex row
 * <div className="flex">
 *   <Logo />
 *   <Spacer axis="horizontal" size="md" />
 *   <Nav />
 * </div>
 */
export function Spacer({
  size = "md",
  axis = "vertical",
  className,
  ...props
}: SpacerProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        DISPLAY_MAP[axis],
        SIZE_MAP[axis][size],
        className
      )}
      {...props}
    />
  );
}
