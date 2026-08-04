import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Label intent variant.
 *
 * - default  → neutral label for form fields
 * - required → adds a visually distinct asterisk indicator (via CSS)
 * - optional → adds a muted "(optional)" indicator
 * - error    → text-danger colour — used for validation error messages
 */
type LabelVariant = "default" | "required" | "optional" | "error";

export interface LabelProps extends HTMLAttributes<HTMLElement> {
  /** Visual intent variant */
  variant?: LabelVariant;
  /**
   * The `for` attribute linking this label to an input element.
   * Passed as `htmlFor` per React convention.
   */
  htmlFor?: string;
  /**
   * When true, renders as a <label> element.
   * When false (default false, but auto-detected by htmlFor presence),
   * renders as a <span> — useful for non-form label text.
   *
   * Note: if `htmlFor` is provided, always renders as <label>.
   */
  asLabel?: boolean;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

const VARIANT_MAP: Record<LabelVariant, string> = {
  default:  "text-foreground",
  required: "text-foreground",
  optional: "text-muted",
  error:    "text-danger",
};

// Suffix text appended after the label content for required/optional variants.
const VARIANT_SUFFIX: Partial<Record<LabelVariant, string>> = {
  required: " *",
  optional: " (optional)",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Label
 *
 * A typography primitive for form labels and semantic inline labels.
 * Renders as <label> when `htmlFor` is provided (accessible form binding),
 * or as <span> when used decoratively.
 *
 * Required indicator uses text rather than CSS ::after pseudo-element
 * to ensure it is read by screen readers.
 *
 * @example
 * <Label htmlFor="email" variant="required">
 *   Email Address
 * </Label>
 *
 * @example
 * <Label variant="error">This field is required.</Label>
 */
export function Label({
  variant = "default",
  htmlFor,
  asLabel = false,
  className,
  children,
  ...props
}: LabelProps) {
  // Render as <label> if htmlFor is provided or asLabel is explicitly true
  const Tag = htmlFor !== undefined || asLabel ? "label" : "span";

  return (
    <Tag
      htmlFor={htmlFor}
      className={cn(
        "text-[length:var(--text-small)] font-semibold leading-none tracking-wide",
        VARIANT_MAP[variant],
        className
      )}
      {...props}
    >
      {children}
      {VARIANT_SUFFIX[variant] !== undefined && (
        <span
          aria-hidden={variant === "required" ? undefined : true}
          className={variant === "required" ? "text-danger ml-0.5" : "ml-1 font-normal"}
        >
          {VARIANT_SUFFIX[variant]}
        </span>
      )}
    </Tag>
  );
}
