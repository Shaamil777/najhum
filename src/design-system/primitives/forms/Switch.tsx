"use client";

/**
 * Switch — design-system/primitives/forms/Switch.tsx
 *
 * CLIENT COMPONENT — justified by:
 * 1. Toggling aria-checked requires reading DOM state
 * 2. Framer Motion spring animation on the knob
 * 3. Controlled/uncontrolled toggle state management
 */

import { useState, useId, type InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Text } from "@/design-system/primitives/typography/Text";
import { FIELD_WRAPPER_STYLES, type FieldSize } from "./formFieldVariants";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SwitchProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "role"
  > {
  /** Visible label */
  label?: string;
  /** Optional description rendered below the label */
  hint?: string;
  /** Error message */
  error?: string;
  /** Size scale */
  size?: FieldSize;
  /**
   * Controlled checked value.
   * When provided, the component is controlled — manage state externally.
   */
  checked?: boolean;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Change handler — receives the new boolean state */
  onCheckedChange?: (checked: boolean) => void;
}

// ─── Size Config ──────────────────────────────────────────────────────────────

interface SwitchDimensions {
  track: string;
  knob: string;
  knobTranslate: number;
}

const SWITCH_SIZE_MAP: Record<FieldSize, SwitchDimensions> = {
  xs: { track: "w-7 h-4",   knob: "w-2.5 h-2.5", knobTranslate: 12 },
  sm: { track: "w-8 h-4.5", knob: "w-3   h-3",   knobTranslate: 14 },
  md: { track: "w-10 h-6",  knob: "w-4   h-4",   knobTranslate: 16 },
  lg: { track: "w-12 h-7",  knob: "w-5   h-5",   knobTranslate: 20 },
  xl: { track: "w-14 h-8",  knob: "w-6   h-6",   knobTranslate: 24 },
};

// ─── Spring Config ────────────────────────────────────────────────────────────

const SPRING = {
  type: "spring" as const,
  stiffness: 500,
  damping: 35,
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Switch
 *
 * A toggle control implementing the ARIA switch role.
 * Supports both controlled (checked + onCheckedChange) and uncontrolled usage.
 * Compatible with React Hook Form via onChange and name/value forwarding.
 *
 * The underlying <input type="checkbox"> is visually hidden but focusable,
 * ensuring full keyboard and screen reader accessibility without custom
 * focus management.
 *
 * The knob animation uses a Framer Motion spring — smooth, physical motion.
 *
 * @example
 * // Uncontrolled
 * <Switch id="notifications" label="Enable notifications" defaultChecked />
 *
 * @example
 * // Controlled
 * <Switch
 *   id="dark-mode"
 *   label="Dark mode"
 *   checked={isDark}
 *   onCheckedChange={setIsDark}
 * />
 *
 * @example
 * // React Hook Form
 * <Switch
 *   id="terms"
 *   label="I agree"
 *   {...register("terms")}
 * />
 */
export function Switch({
  label,
  hint,
  error,
  size = "md",
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  required,
  id: externalId,
  className,
  onChange,
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;

  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const hasError = error !== undefined && error.length > 0;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const { track, knob, knobTranslate } = SWITCH_SIZE_MAP[size];

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onCheckedChange?.(e.target.checked);
    onChange?.(e);
  }

  return (
    <div className={cn(FIELD_WRAPPER_STYLES, className)}>
      <div className="flex items-center gap-3">
        {/* Hidden native checkbox — keyboard & AT accessible */}
        <div className="relative shrink-0">
          <input
            type="checkbox"
            role="switch"
            id={id}
            checked={isChecked}
            disabled={disabled}
            required={required}
            aria-checked={isChecked}
            aria-invalid={hasError ? true : undefined}
            aria-describedby={
              hasError ? errorId : hint !== undefined ? hintId : undefined
            }
            onChange={handleChange}
            className="sr-only peer"
            {...props}
          />

          {/* Track */}
          <motion.label
            htmlFor={id}
            animate={{
              backgroundColor: isChecked
                ? "var(--color-dark)"
                : "var(--color-border-strong)",
            }}
            transition={{ duration: 0.15 }}
            className={cn(
              track,
              "flex items-center rounded-full px-0.5 cursor-pointer",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
              "peer-disabled:opacity-40 peer-disabled:cursor-not-allowed"
            )}
          >
            {/* Knob */}
            <motion.span
              className={cn(knob, "block rounded-full bg-white shadow-sm")}
              animate={{ x: isChecked ? knobTranslate : 0 }}
              transition={SPRING}
            />
          </motion.label>
        </div>

        {label !== undefined && (
          <label
            htmlFor={id}
            className={cn(
              "text-[length:var(--text-small)] font-medium leading-snug select-none",
              disabled
                ? "opacity-40 cursor-not-allowed"
                : "cursor-pointer text-foreground"
            )}
          >
            {label}
            {required && (
              <span className="text-danger ml-0.5" aria-hidden="true">
                {" "}*
              </span>
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
