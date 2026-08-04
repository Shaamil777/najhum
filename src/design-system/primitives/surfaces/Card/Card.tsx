import { type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import {
  CARD_BASE_STYLES,
  CARD_RADIUS_STYLES,
  CARD_VARIANT_STYLES,
  type CardRadius,
  type CardVariant,
} from "./cardVariants";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  radius?: CardRadius;
  /**
   * Polymorphic: render as any block-level HTML element.
   * Defaults to <article> for semantic content grouping, but can be
   * "section", "div", "li" (if inside a list), or "a" (if interactive).
   */
  as?: ElementType;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Card
 *
 * The root container for the Card compound component system.
 * Server Component — no client-side JavaScript required.
 *
 * Manages the visual container (background, border, shadow, radius).
 * Does NOT manage internal padding — use CardBody, CardHeader, CardFooter for that.
 *
 * @example
 * <Card variant="elevated" radius="lg">
 *   <CardHeader>...</CardHeader>
 *   <CardBody>...</CardBody>
 *   <CardFooter>...</CardFooter>
 * </Card>
 */
export function Card({
  as: Component = "article",
  variant = "default",
  radius = "lg",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        CARD_BASE_STYLES,
        CARD_VARIANT_STYLES[variant],
        CARD_RADIUS_STYLES[radius],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
