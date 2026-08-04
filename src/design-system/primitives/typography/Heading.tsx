import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Semantic level maps to the rendered HTML element <h1>–<h6>.
 * Always set `level` correctly — screen readers use heading levels
 * to understand document structure.
 */
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Visual variant is decoupled from semantic level.
 * A <h2> can visually render as display-xl, or a <h1> can render as h3.
 * This supports marketing layouts where visual hierarchy diverges from DOM hierarchy.
 */
type HeadingVariant =
  | "display-xl"
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4";

type HeadingAlign = "left" | "center" | "right" | "justify";

type HeadingWeight = "regular" | "medium" | "semibold" | "bold" | "black";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Semantic heading level — controls the rendered HTML element.
   * Does NOT control visual size. Use `variant` for visual size.
   */
  level?: HeadingLevel;
  /**
   * Visual size variant — independent of semantic level.
   * All values map to design token CSS variables in theme.css.
   */
  variant?: HeadingVariant;
  /** Text alignment */
  align?: HeadingAlign;
  /** Font weight override */
  weight?: HeadingWeight;
  /**
   * When true, removes the uppercase text-transform applied by
   * the global typography.css base styles.
   */
  noUppercase?: boolean;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

const TAG_MAP: Record<HeadingLevel, "h1" | "h2" | "h3" | "h4" | "h5" | "h6"> =
  {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
  };

// All sizes map to CSS custom properties from theme.css —
// exposed as Tailwind utilities by the @theme inline block.
const VARIANT_MAP: Record<HeadingVariant, string> = {
  "display-xl": "text-[length:var(--text-display-xl)] leading-none tracking-tighter",
  display:      "text-[length:var(--text-display)] leading-none tracking-tighter",
  h1:           "text-[length:var(--text-h1)] leading-tight tracking-tight",
  h2:           "text-[length:var(--text-h2)] leading-tight tracking-tight",
  h3:           "text-[length:var(--text-h3)] leading-snug tracking-tight",
  h4:           "text-[length:var(--text-h4)] leading-snug",
};

const ALIGN_MAP: Record<HeadingAlign, string> = {
  left:    "text-left",
  center:  "text-center",
  right:   "text-right",
  justify: "text-justify",
};

const WEIGHT_MAP: Record<HeadingWeight, string> = {
  regular:  "font-normal",
  medium:   "font-medium",
  semibold: "font-semibold",
  bold:     "font-bold",
  black:    "font-black",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Heading
 *
 * A typography primitive for all heading levels.
 * Decouples semantic level from visual size — critical for accessible,
 * flexible marketing layouts.
 *
 * Uses design token sizes from theme.css.
 * All colours come from the inherited `text-foreground` set in typography.css.
 *
 * @example
 * // Semantic h2, visually display-xl
 * <Heading level={2} variant="display-xl" align="center">
 *   Enterprise IoT Platform
 * </Heading>
 *
 * @example
 * // Regular h1 at h3 visual size
 * <Heading level={1} variant="h3" weight="semibold">
 *   Overview
 * </Heading>
 */
export function Heading({
  level = 2,
  variant = "h2",
  align = "left",
  weight = "black",
  noUppercase = false,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = TAG_MAP[level];

  return (
    <Tag
      className={cn(
        // Color from design token via typography.css base styles
        "text-foreground",
        VARIANT_MAP[variant],
        ALIGN_MAP[align],
        WEIGHT_MAP[weight],
        noUppercase && "normal-case",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
