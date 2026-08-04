"use client";

/**
 * Button — design-system/primitives/actions/Button.tsx
 *
 * The foundational interactive primitive for all CTAs, form submissions,
 * and triggered actions throughout the application.
 *
 * This is a CLIENT COMPONENT — justified by:
 * 1. Framer Motion press animation (requires DOM event listeners)
 * 2. Loading spinner state management
 *
 * Everything that CAN be server-rendered IS server-rendered.
 * The variant/size maps live in buttonVariants.ts (importable by Server Components).
 */

import {
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  BASE_STYLES,
  VARIANT_STYLES,
  SIZE_STYLES,
  SPINNER_SIZE_STYLES,
  type ButtonVariant,
  type ButtonSize,
  type IconPosition,
} from "./buttonVariants";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size scale */
  size?: ButtonSize;
  /**
   * When true, renders a spinner and disables interaction.
   * The button remains in the DOM at its current dimensions — no layout shift.
   */
  isLoading?: boolean;
  /**
   * Accessible label for the loading state.
   * Read by screen readers when isLoading is true.
   * @default "Loading…"
   */
  loadingLabel?: string;
  /**
   * Icon element rendered adjacent to the label.
   * Pass any React node — SVG, Lucide icon, or custom component.
   * The icon is aria-hidden by default and should be purely decorative.
   */
  icon?: ReactNode;
  /** Position of the icon relative to the label */
  iconPosition?: IconPosition;
  /**
   * Renders the button at full container width.
   * Useful for mobile layouts and form actions.
   */
  fullWidth?: boolean;
  /**
   * Disables Framer Motion press animation.
   * Use for buttons where animation would be jarring (e.g. rapid-fire clicks).
   */
  disableAnimation?: boolean;
  /** Forward ref — React 19 compatible (ref as prop) */
  ref?: Ref<HTMLButtonElement>;
  /** Button label content */
  children?: ReactNode;
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

/**
 * Inline SVG spinner — no external dependency, no extra bundle cost.
 * Sized via the button's size token map.
 */
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Motion Config ────────────────────────────────────────────────────────────

/**
 * Press animation — subtle scale-down on tap/click.
 * Values sourced from motion token scale (duration 150ms, ease-standard).
 * Respects prefers-reduced-motion automatically via Framer Motion.
 */
const PRESS_ANIMATION: Pick<
  HTMLMotionProps<"button">,
  "whileTap" | "transition"
> = {
  whileTap: { scale: 0.97 },
  transition: {
    duration: 0.15,
    ease: [0.22, 1, 0.36, 1], // --ease-standard from motion token
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Button
 *
 * The foundational action primitive. Enterprise-grade interactive component
 * supporting 6 variants, 5 sizes, loading states, icon placement,
 * full-width layout, and accessible keyboard/motion behaviour.
 *
 * @example
 * // Primary CTA
 * <Button variant="primary" size="lg">Get Started</Button>
 *
 * @example
 * // Loading state
 * <Button isLoading loadingLabel="Submitting form…">Submit</Button>
 *
 * @example
 * // Icon left
 * <Button icon={<ArrowRight />} iconPosition="right" variant="outline">
 *   Learn More
 * </Button>
 *
 * @example
 * // Full-width mobile action
 * <Button fullWidth variant="primary" size="xl">Book a Demo</Button>
 */
export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  loadingLabel = "Loading…",
  icon,
  iconPosition = "left",
  fullWidth = false,
  disableAnimation = false,
  disabled,
  className,
  children,
  ref,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const buttonClass = cn(
    BASE_STYLES,
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {/* Loading overlay — screen reader accessible */}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner className={SPINNER_SIZE_STYLES[size]} />
          <span className="sr-only">{loadingLabel}</span>
        </span>
      )}

      {/* Button content — hidden from AT when loading, preserved for layout */}
      <span
        className={cn(
          "inline-flex items-center justify-center gap-[inherit]",
          isLoading && "invisible"
        )}
        aria-hidden={isLoading ? true : undefined}
      >
        {icon !== undefined && iconPosition === "left" && (
          <span aria-hidden="true" className="shrink-0">
            {icon}
          </span>
        )}

        {children !== undefined && (
          <span>{children}</span>
        )}

        {icon !== undefined && iconPosition === "right" && (
          <span aria-hidden="true" className="shrink-0">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  if (disableAnimation) {
    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        className={buttonClass}
        {...props}
      >
        {content}
      </button>
    );
  }

  return (
    <motion.button
      ref={ref}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      className={buttonClass}
      {...(!isDisabled ? PRESS_ANIMATION : {})}
      {...(props as HTMLMotionProps<"button">)}
    >
      {content}
    </motion.button>
  );
}
