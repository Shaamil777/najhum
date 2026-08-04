import { type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";
type SectionBackground = "default" | "alt" | "surface" | "dark";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /**
   * Vertical padding scale.
   * Maps to design tokens in theme.css.
   */
  spacing?: SectionSpacing;
  /**
   * Background colour variant.
   * Maps to semantic colour tokens — never hardcoded.
   */
  background?: SectionBackground;
  /**
   * Polymorphic: render as any block-level HTML element.
   * Defaults to <section> for correct semantic HTML / accessibility.
   */
  as?: ElementType;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

const spacingMap: Record<SectionSpacing, string> = {
  none: "py-0",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-20",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-[var(--spacing-section)]",
};

const backgroundMap: Record<SectionBackground, string> = {
  default: "bg-background",
  alt: "bg-background-alt",
  surface: "bg-surface",
  dark: "bg-dark text-white",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Section
 *
 * A semantic layout primitive for full-width page sections.
 * Handles vertical rhythm and background colour via design tokens.
 * Polymorphic — renders as <section> by default, can be overridden.
 *
 * @example
 * <Section spacing="xl" background="alt">
 *   <Container>...</Container>
 * </Section>
 */
export function Section({
  as: Component = "section",
  spacing = "lg",
  background = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        "w-full",
        spacingMap[spacing],
        backgroundMap[background],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
