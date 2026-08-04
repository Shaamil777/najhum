import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Card visual variants.
 *
 * - default     → Standard surface background, subtle or no border/shadow.
 * - elevated    → Uses shadow-card for depth.
 * - outlined    → Transparent or surface background with a border.
 * - filled      → Uses a slightly different background (e.g. surface-alt) to stand out against default background.
 * - interactive → Adds hover effects (lift + shadow) and focus rings for clickable cards.
 */
export type CardVariant =
  | "default"
  | "elevated"
  | "outlined"
  | "filled"
  | "interactive";

/**
 * Card padding scale.
 * Applies to Header, Body, and Footer components to maintain alignment.
 */
export type CardPadding = "none" | "sm" | "md" | "lg";

/**
 * Card radius scale.
 * Maps to design token radii.
 */
export type CardRadius = "none" | "sm" | "md" | "lg" | "xl";

// ─── Maps ─────────────────────────────────────────────────────────────────────

export const CARD_VARIANT_STYLES: Record<CardVariant, string> = {
  default: "bg-surface text-foreground",
  elevated: "bg-surface text-foreground shadow-card",
  outlined: "bg-surface text-foreground border border-border",
  filled: "bg-surface-alt text-foreground",
  interactive:
    "bg-surface text-foreground shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer",
};

export const CARD_PADDING_STYLES: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const CARD_RADIUS_STYLES: Record<CardRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

// ─── Base Styles ──────────────────────────────────────────────────────────────

export const CARD_BASE_STYLES = cn(
  "flex flex-col relative overflow-hidden w-full"
);
