import { type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Text } from "@/design-system/primitives/typography/Text";
import {
  CHOICE_BASE_STYLES,
  CHOICE_SIZE_STYLES,
  FIELD_WRAPPER_STYLES,
  type FieldSize,
} from "./formFieldVariants";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Visible label text rendered adjacent to the checkbox */
  label?: string;
  /** Error message */
  error?: string;
  /** Hint text below the field */
  hint?: string;
  /** Size scale */
  size?: FieldSize;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Checkbox
 *
 * A single boolean selection control.
 * Server Component — CSS :checked pseudo-class handles all visual state.
 * No JavaScript required.
 *
 * The checkmark is rendered via a CSS background-image SVG to avoid
 * the complexity of a positioned pseudo-element in Tailwind.
 *
 * @example
 * <Checkbox
 *   id="terms"
 *   label="I agree to the Terms of Service"
 *   required
 * />
 *
 * @example
 * // With React Hook Form
 * <Checkbox
 *   id="newsletter"
 *   label="Subscribe to newsletter"
 *   {...register("newsletter")}
 * />
 */
export function Checkbox({
  label,
  error,
  hint,
  size = "md",
  required,
  disabled,
  id,
  className,
  ...props
}: CheckboxProps) {
  const hasError = error !== undefined && error.length > 0;
  const errorId = id !== undefined ? `${id}-error` : undefined;
  const hintId = id !== undefined ? `${id}-hint` : undefined;

  return (
    <div className={FIELD_WRAPPER_STYLES}>
      <div className="flex items-start gap-2.5">
        <input
          type="checkbox"
          id={id}
          required={required}
          disabled={disabled}
          aria-invalid={hasError ? true : undefined}
          aria-describedby={
            hasError ? errorId : hintId !== undefined ? hintId : undefined
          }
          aria-required={required ? true : undefined}
          className={cn(
            CHOICE_BASE_STYLES,
            CHOICE_SIZE_STYLES[size],
            "rounded-sm",
            // Checkmark via SVG background — visible on :checked
            "checked:bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E\")] checked:bg-center checked:bg-no-repeat",
            hasError && "border-danger",
            className
          )}
          {...props}
        />

        {label !== undefined && (
          <label
            htmlFor={id}
            className={cn(
              "text-[length:var(--text-small)] font-medium leading-snug cursor-pointer",
              disabled && "opacity-40 cursor-not-allowed",
              hasError ? "text-danger" : "text-foreground"
            )}
          >
            {label}
            {required && (
              <span className="text-danger ml-0.5" aria-hidden="true"> *</span>
            )}
          </label>
        )}
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
