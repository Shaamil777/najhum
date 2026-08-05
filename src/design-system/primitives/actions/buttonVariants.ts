import { cn } from "@/lib/utils";

// ─── Variant & Size Types ─────────────────────────────────────────────────────

/**
 * Button visual variants.
 *
 * - primary   → High-emphasis. Main CTA. Dark fill, white text.
 * - secondary → Medium-emphasis. Secondary actions. Surface fill.
 * - outline   → Low-emphasis. Bordered, transparent fill.
 * - ghost     → Minimal. No background or border. Hover reveals surface.
 * - danger    → Destructive actions only. Red fill.
 * - link      → Appears as inline text link. No background, no border.
 *
 * All colours read from design token CSS variables. No hardcoded values.
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "link";

/**
 * Button size scale.
 *
 * - xs → Compact UI (table actions, dense toolbars)
 * - sm → Secondary actions, sidebar buttons
 * - md → Default. The standard interactive size.
 * - lg → Hero CTAs, prominent actions
 * - xl → Marketing landing page CTAs
 */
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Icon position relative to button label.
 */
export type IconPosition = "left" | "right";

// ─── Variant Maps ─────────────────────────────────────────────────────────────

export const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-dark text-white",
    "hover:bg-dark-surface",
    "focus-visible:ring-dark",
    "border border-transparent",
    "shadow-md shadow-dark/20 inset-ring inset-ring-white/15"
  ),
  secondary: cn(
    "bg-surface text-foreground",
    "hover:bg-background-alt",
    "focus-visible:ring-foreground",
    "border border-border",
    "shadow-sm shadow-foreground/5 inset-ring inset-ring-white/50 dark:inset-ring-white/5"
  ),
  outline: cn(
    "bg-transparent text-foreground",
    "hover:bg-surface",
    "focus-visible:ring-foreground",
    "border border-border hover:border-border-strong"
  ),
  ghost: cn(
    "bg-transparent text-foreground",
    "hover:bg-surface",
    "focus-visible:ring-foreground",
    "border border-transparent"
  ),
  danger: cn(
    "bg-danger text-white",
    "hover:bg-danger/90",
    "focus-visible:ring-danger",
    "border border-transparent"
  ),
  link: cn(
    "bg-transparent text-primary underline-offset-4 hover:underline",
    "hover:text-primary-hover",
    "focus-visible:ring-primary",
    "border border-transparent",
    "h-auto! px-0! py-0!"
  ),
};

export const SIZE_STYLES: Record<ButtonSize, string> = {
  xs: "h-7 px-3 text-xs gap-1",
  sm: "h-9 px-4 text-xs gap-1.5",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-13 px-8 text-sm gap-2",
  xl: "h-14 px-10 text-base gap-2.5",
};

// Spinner size scales with button size — keeps proportions consistent
export const SPINNER_SIZE_STYLES: Record<ButtonSize, string> = {
  xs: "w-3 h-3",
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-4.5 h-4.5",
  xl: "w-5 h-5",
};

// ─── Base Styles ──────────────────────────────────────────────────────────────

export const BASE_STYLES = cn(
  // Layout
  "relative inline-flex items-center justify-center shrink-0",
  // Typography — reads from design tokens
  "font-semibold uppercase tracking-widest whitespace-nowrap",
  // Shape — from radius token
  "rounded-sm",
  // Transitions — maps to --ease-standard from motion token
  "transition-all duration-150",
  // Focus ring — WCAG AA compliant visible focus indicator
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  // Disabled
  "disabled:pointer-events-none disabled:opacity-40",
  // Cursor
  "cursor-pointer"
);
