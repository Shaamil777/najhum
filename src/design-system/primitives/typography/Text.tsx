import { type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Visual text variant. Maps to size + colour tokens from theme.css.
 *
 * - body    → --text-body (1rem) / text-foreground
 * - lead    → --text-body-lg (1.125rem) / text-muted — used for sub-headings and intro paragraphs
 * - small   → --text-small (.875rem) / text-muted
 * - caption → text-xs / text-muted — metadata, timestamps, footnotes
 * - muted   → body size, text-muted — intentionally de-emphasised
 */
type TextVariant = "body" | "lead" | "small" | "caption" | "muted";

type TextAlign = "left" | "center" | "right" | "justify";

type TextWeight = "regular" | "medium" | "semibold" | "bold";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Visual text style */
  variant?: TextVariant;
  /** Text alignment */
  align?: TextAlign;
  /** Font weight */
  weight?: TextWeight;
  /**
   * Polymorphic: render as any inline or block text element.
   * Defaults to <p>. Use "span" for inline, "div" for block without paragraph semantics.
   */
  as?: ElementType;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

const VARIANT_MAP: Record<TextVariant, string> = {
  body:    "text-[length:var(--text-body)] leading-relaxed text-foreground",
  lead:    "text-[length:var(--text-body-lg)] leading-relaxed text-muted",
  small:   "text-[length:var(--text-small)] leading-normal text-muted",
  caption: "text-xs leading-normal text-muted",
  muted:   "text-[length:var(--text-body)] leading-relaxed text-muted",
};

const ALIGN_MAP: Record<TextAlign, string> = {
  left:    "text-left",
  center:  "text-center",
  right:   "text-right",
  justify: "text-justify",
};

const WEIGHT_MAP: Record<TextWeight, string> = {
  regular:  "font-normal",
  medium:   "font-medium",
  semibold: "font-semibold",
  bold:     "font-bold",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Text
 *
 * A polymorphic typography primitive for body copy.
 * All sizes and colours come from design tokens — no hardcoded values.
 *
 * @example
 * <Text variant="lead">
 *   Najhum Group delivers enterprise-grade IoT infrastructure.
 * </Text>
 *
 * @example
 * <Text as="span" variant="caption" className="ml-2">
 *   Last updated: Jan 2025
 * </Text>
 */
export function Text({
  as: Component = "p",
  variant = "body",
  align = "left",
  weight = "regular",
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        VARIANT_MAP[variant],
        ALIGN_MAP[align],
        WEIGHT_MAP[weight],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
