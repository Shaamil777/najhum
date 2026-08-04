import { type SelectHTMLAttributes } from "react";
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

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Visible field label */
  label?: string;
  /** Hint text below the field */
  hint?: string;
  /** Error message — overrides hint */
  error?: string;
  /** Field size scale */
  size?: FieldSize;
  /** Option list. Use native <option> children OR this prop — not both. */
  options?: SelectOption[];
  /** Placeholder option rendered as the first disabled option */
  placeholder?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Select
 *
 * A native dropdown field primitive.
 * Server Component — no JavaScript required.
 * Uses the native <select> element for maximum accessibility and
 * mobile OS integration (avoids custom dropdown focus traps).
 *
 * Accepts options via the `options` prop OR via native <option> children.
 *
 * @example
 * <Select
 *   id="country"
 *   label="Country"
 *   placeholder="Select a country…"
 *   options={[
 *     { value: "ae", label: "United Arab Emirates" },
 *     { value: "sa", label: "Saudi Arabia" },
 *   ]}
 *   required
 * />
 */
export function Select({
  label,
  hint,
  error,
  size = "md",
  options,
  placeholder,
  required,
  id,
  className,
  disabled,
  children,
  ...props
}: SelectProps) {
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

      <div className={cn(FIELD_FOCUS_STYLES, "relative rounded-sm")}>
        <select
          id={id}
          required={required}
          disabled={disabled}
          aria-invalid={hasError ? true : undefined}
          aria-describedby={
            hasError ? errorId : hintId !== undefined ? hintId : undefined
          }
          aria-required={required ? true : undefined}
          className={cn(
            FIELD_BASE_STYLES,
            FIELD_SIZE_STYLES[size],
            // Select-specific: hide native arrow, add custom via bg
            "appearance-none pr-10 cursor-pointer",
            hasError && FIELD_ERROR_STYLES,
            className
          )}
          {...props}
        >
          {placeholder !== undefined && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options !== undefined
            ? options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        {/* Custom chevron icon — replaces native OS arrow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
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
