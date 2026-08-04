import { type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/design-system/primitives/typography/Label";
import { Text } from "@/design-system/primitives/typography/Text";
import {
  FIELD_BASE_STYLES,
  FIELD_ERROR_STYLES,
  FIELD_FOCUS_STYLES,
  FIELD_SIZE_STYLES,
  FIELD_WRAPPER_STYLES,
  type FieldSize,
} from "./formFieldVariants";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visible field label. Bound to the input via htmlFor/id. */
  label?: string;
  /** Hint text rendered below the field in a muted style. */
  hint?: string;
  /** Error message. Overrides hint. Turns field border danger-red. */
  error?: string;
  /** Field size scale — matches the Button size scale for visual consistency. */
  size?: FieldSize;
  /**
   * Marks the field as required. Adds * to label and sets the
   * HTML required attribute — both visually and semantically.
   */
  required?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Input
 *
 * A single-line text field primitive.
 * Server Component — no client-side JavaScript required.
 * Fully compatible with React Hook Form via standard HTML attribute forwarding.
 *
 * Reads all sizing, colours, and radii from design token CSS variables.
 * Label, hint, and error rendering is delegated to the Label and Text
 * typography primitives — no duplication.
 *
 * @example
 * <Input
 *   id="email"
 *   type="email"
 *   label="Email Address"
 *   hint="We'll never share your email."
 *   required
 * />
 *
 * @example
 * // With React Hook Form
 * <Input
 *   id="email"
 *   label="Email"
 *   error={errors.email?.message}
 *   {...register("email")}
 * />
 */
export function Input({
  label,
  hint,
  error,
  size = "md",
  required,
  id,
  className,
  disabled,
  readOnly,
  ...props
}: InputProps) {
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
        <input
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
            FIELD_SIZE_STYLES[size],
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
