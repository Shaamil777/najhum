import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type DividerOrientation = "horizontal" | "vertical";

/**
 * Visual weight of the divider line.
 *
 * - subtle  → uses --color-border (light, low contrast)
 * - default → uses --color-border (standard)
 * - strong  → uses --color-border-strong (high contrast)
 *
 * All values map to semantic token utilities — no hardcoded colors.
 */
type DividerVariant = "subtle" | "default" | "strong";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  /**
   * Optional accessible label for the divider.
   * Only needed when the divider has semantic meaning (e.g. "End of section").
   * Omit for purely decorative separators — aria-hidden is applied automatically.
   */
  label?: string;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

const VARIANT_MAP: Record<DividerVariant, string> = {
  subtle:  "border-border/40",
  default: "border-border",
  strong:  "border-border-strong",
};

const ORIENTATION_MAP: Record<DividerOrientation, string> = {
  horizontal: "w-full border-t",
  vertical:   "h-full border-l self-stretch",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Divider
 *
 * A semantic separator primitive. Renders as an <hr> element.
 * Supports horizontal and vertical orientations and three visual weights.
 *
 * Purely decorative dividers are hidden from assistive technologies
 * via aria-hidden. Dividers with semantic meaning can be labelled.
 *
 * All colours come from design token CSS variables — no hardcoded values.
 *
 * @example
 * // Decorative horizontal divider
 * <Divider />
 *
 * @example
 * // Vertical divider in a flex row
 * <Stack direction="horizontal" align="center">
 *   <span>Item A</span>
 *   <Divider orientation="vertical" variant="subtle" />
 *   <span>Item B</span>
 * </Stack>
 */
export function Divider({
  orientation = "horizontal",
  variant = "default",
  label,
  className,
  ...props
}: DividerProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      aria-label={label}
      // Decorative when no label — hidden from screen readers
      aria-hidden={label === undefined ? true : undefined}
      className={cn(
        "shrink-0 border-0",
        ORIENTATION_MAP[orientation],
        VARIANT_MAP[variant],
        className
      )}
      {...props}
    />
  );
}
