import { cn } from "@/lib/utils";

// ─── Shared Size Scale ────────────────────────────────────────────────────────

/**
 * Form field size scale — mirrors the Button size scale for visual consistency.
 * All heights and padding map to Tailwind spacing utilities (design token scale).
 */
export type FieldSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Field size → height + padding + text size.
 * Mirrors ButtonSize heights for visual consistency across the UI.
 */
export const FIELD_SIZE_STYLES: Record<FieldSize, string> = {
  xs: "h-7  px-2.5 text-xs",
  sm: "h-9  px-3   text-xs",
  md: "h-11 px-4   text-sm",
  lg: "h-12 px-4   text-sm",
  xl: "h-14 px-5   text-base",
};

// ─── Shared Base Styles ───────────────────────────────────────────────────────

/**
 * Base styles shared by Input, Textarea, and Select.
 * All colours and radii come from design token CSS variables.
 */
export const FIELD_BASE_STYLES = cn(
  // Layout
  "w-full flex items-center",
  // Shape — radius token
  "rounded-sm",
  // Typography
  "font-sans text-foreground",
  // Background & Border — design tokens
  "bg-surface border border-border",
  // Placeholder
  "placeholder:text-muted",
  // Transitions
  "transition-colors duration-150",
  // Focus ring — WCAG AA
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:border-primary",
  // Disabled
  "disabled:pointer-events-none disabled:opacity-40 disabled:bg-background-alt disabled:cursor-not-allowed",
  // Read-only
  "read-only:bg-background-alt read-only:cursor-default"
);

// ─── State Styles ─────────────────────────────────────────────────────────────

/**
 * Applied to the field element when an error message is present.
 * Overrides border colour to --color-danger.
 */
export const FIELD_ERROR_STYLES = "border-danger focus-visible:ring-danger focus-visible:border-danger";

/**
 * Applied to the wrapper when the field is in a valid, active state.
 */
export const FIELD_FOCUS_STYLES = "focus-within:border-border-strong";

// ─── Checkbox / Radio Base ────────────────────────────────────────────────────

/**
 * Shared base for Checkbox and Radio.
 * All colours from design tokens. No hardcoded values.
 */
export const CHOICE_BASE_STYLES = cn(
  // Size — consistent across xs→xl
  "shrink-0",
  // Appearance reset
  "appearance-none",
  // Border & Background — design tokens
  "border border-border bg-surface",
  // Transitions
  "transition-colors duration-150",
  // Checked state — uses CSS :checked pseudo-class
  "checked:bg-dark checked:border-dark",
  // Focus ring — WCAG AA
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  // Disabled
  "disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed",
  // Cursor
  "cursor-pointer"
);

/**
 * Choice element sizes (Checkbox and Radio).
 * Matches spacing scale.
 */
export const CHOICE_SIZE_STYLES: Record<FieldSize, string> = {
  xs: "w-3.5 h-3.5",
  sm: "w-4   h-4",
  md: "w-5   h-5",
  lg: "w-5.5 h-5.5",
  xl: "w-6   h-6",
};

// ─── Helper: Field Wrapper ─────────────────────────────────────────────────────

/**
 * Common wrapper spacing applied to every form field group (label + input + hint/error).
 * Provides vertical rhythm between form elements.
 */
export const FIELD_WRAPPER_STYLES = "flex flex-col gap-1.5";
