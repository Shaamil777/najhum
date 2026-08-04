import { type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type StackDirection = "vertical" | "horizontal";
type StackAlign = "start" | "center" | "end" | "stretch";
type StackJustify = "start" | "center" | "end" | "between" | "around";
type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface StackProps extends HTMLAttributes<HTMLElement> {
  /**
   * Stack direction — vertical (column) or horizontal (row).
   */
  direction?: StackDirection;
  /**
   * Cross-axis alignment. Maps to align-items.
   */
  align?: StackAlign;
  /**
   * Main-axis justification. Maps to justify-content.
   */
  justify?: StackJustify;
  /**
   * Gap between children. Maps to spacing scale in theme.css.
   */
  gap?: StackGap;
  /**
   * Whether children wrap when they overflow.
   * Only applicable when direction is horizontal.
   */
  wrap?: boolean;
  /**
   * Polymorphic: render as any HTML element.
   * Use "ul" / "ol" for list-based stacks (e.g. nav items).
   */
  as?: ElementType;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

const directionMap: Record<StackDirection, string> = {
  vertical: "flex-col",
  horizontal: "flex-row",
};

const alignMap: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyMap: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

const gapMap: Record<StackGap, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Stack
 *
 * A one-dimensional Flexbox layout primitive.
 * Composes vertical and horizontal linear layouts with consistent spacing.
 * Replaces ad-hoc flex utility combinations across the codebase.
 *
 * @example
 * <Stack direction="horizontal" align="center" gap="md">
 *   <Logo />
 *   <Nav />
 *   <CTAButton />
 * </Stack>
 */
export function Stack({
  as: Component = "div",
  direction = "vertical",
  align = "stretch",
  justify = "start",
  gap = "md",
  wrap = false,
  className,
  children,
  ...props
}: StackProps) {
  return (
    <Component
      className={cn(
        "flex",
        directionMap[direction],
        alignMap[align],
        justifyMap[justify],
        gapMap[gap],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
