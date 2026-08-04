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

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Visible label text rendered adjacent to the radio */
  label?: string;
  /** Error message */
  error?: string;
  /** Hint text */
  hint?: string;
  /** Size scale */
  size?: FieldSize;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Radio
 *
 * A single option within a radio group.
 * Server Component — CSS :checked pseudo-class handles all visual state.
 * No JavaScript required.
 *
 * Group multiple Radio components with the same `name` attribute
 * for correct browser radio group behaviour.
 *
 * @example
 * <fieldset>
 *   <legend>Preferred contact method</legend>
 *   <Radio id="email" name="contact" value="email" label="Email" />
 *   <Radio id="phone" name="contact" value="phone" label="Phone" />
 * </fieldset>
 */
export function Radio({
  label,
  error,
  hint,
  size = "md",
  required,
  disabled,
  id,
  className,
  ...props
}: RadioProps) {
  const hasError = error !== undefined && error.length > 0;
  const errorId = id !== undefined ? `${id}-error` : undefined;
  const hintId = id !== undefined ? `${id}-hint` : undefined;

  return (
    <div className={FIELD_WRAPPER_STYLES}>
      <div className="flex items-start gap-2.5">
        <input
          type="radio"
          id={id}
          required={required}
          disabled={disabled}
          aria-invalid={hasError ? true : undefined}
          aria-describedby={
            hasError ? errorId : hintId !== undefined ? hintId : undefined
          }
          className={cn(
            CHOICE_BASE_STYLES,
            CHOICE_SIZE_STYLES[size],
            // Full radius for radio
            "rounded-full",
            // Filled circle indicator via SVG background on :checked
            "checked:bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='3'/%3E%3C/svg%3E\")] checked:bg-center checked:bg-no-repeat",
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
