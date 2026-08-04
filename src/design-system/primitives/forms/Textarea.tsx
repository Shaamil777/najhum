import { type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/design-system/primitives/typography/Label";
import { Text } from "@/design-system/primitives/typography/Text";
import {
  FIELD_BASE_STYLES,
  FIELD_ERROR_STYLES,
  FIELD_FOCUS_STYLES,
  FIELD_WRAPPER_STYLES,
} from "./formFieldVariants";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible field label */
  label?: string;
  /** Hint text below the field */
  hint?: string;
  /** Error message — overrides hint, turns border danger-red */
  error?: string;
  /**
   * Controls vertical resize behaviour.
   * - none     → fixed height (use rows prop to control)
   * - vertical → user can resize vertically (default)
   * - both     → user can resize in both axes
   */
  resize?: "none" | "vertical" | "both";
}

// ─── Resize Map ───────────────────────────────────────────────────────────────

const RESIZE_MAP: Record<"none" | "vertical" | "both", string> = {
  none:     "resize-none",
  vertical: "resize-y",
  both:     "resize",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Textarea
 *
 * A multi-line text field primitive.
 * Server Component — no client-side JavaScript required.
 * Compatible with React Hook Form via standard HTML attribute forwarding.
 *
 * Inherits all field styling from formFieldVariants — consistent with Input.
 *
 * @example
 * <Textarea
 *   id="message"
 *   label="Message"
 *   hint="Max 500 characters."
 *   rows={5}
 *   required
 * />
 */
export function Textarea({
  label,
  hint,
  error,
  resize = "vertical",
  required,
  id,
  className,
  disabled,
  readOnly,
  ...props
}: TextareaProps) {
  const hasError = error !== undefined && error.length > 0;
  const hintId = id !== undefined ? `${id}-hint` : undefined;
  const errorId = id !== undefined ? `${id}-error` : undefined;

  return (
    <div className={FIELD_WRAPPER_STYLES}>
      {label !== undefined && (
        <Label
          htmlFor={id}
          variant={hasError ? "error" : required ? "required" : "default"}
        >
          {label}
        </Label>
      )}

      <div className={cn(FIELD_FOCUS_STYLES, "rounded-sm")}>
        <textarea
          id={id}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={hasError ? true : undefined}
          aria-describedby={
            hasError ? errorId : hintId !== undefined ? hintId : undefined
          }
          aria-required={required ? true : undefined}
          className={cn(
            FIELD_BASE_STYLES,
            // Textarea-specific overrides
            "items-start py-3 min-h-24",
            RESIZE_MAP[resize],
            hasError && FIELD_ERROR_STYLES,
            className
          )}
          {...props}
        />
      </div>

      {hasError && (
        <Text
          as="span"
          id={errorId}
          variant="small"
          role="alert"
          aria-live="polite"
          className="text-danger"
        >
          {error}
        </Text>
      )}

      {!hasError && hint !== undefined && (
        <Text as="span" id={hintId} variant="small">
          {hint}
        </Text>
      )}
    </div>
  );
}
