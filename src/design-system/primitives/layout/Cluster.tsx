import { type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type ClusterAlign = "start" | "center" | "end" | "baseline";
type ClusterJustify = "start" | "center" | "end" | "between" | "around";
type ClusterGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface ClusterProps extends HTMLAttributes<HTMLElement> {
  /**
   * Cross-axis alignment. Maps to align-items.
   */
  align?: ClusterAlign;
  /**
   * Main-axis justification. Maps to justify-content.
   */
  justify?: ClusterJustify;
  /**
   * Gap between wrapped items. Maps to spacing scale.
   */
  gap?: ClusterGap;
  /**
   * Polymorphic: render as any HTML element.
   * Use "ul" for tag clouds, chip groups, link lists.
   */
  as?: ElementType;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

const alignMap: Record<ClusterAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
};

const justifyMap: Record<ClusterJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

const gapMap: Record<ClusterGap, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-6",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Cluster
 *
 * A wrapping Flexbox layout primitive for groups of inline items
 * (e.g. tags, badges, pills, icon+label combos, button groups).
 *
 * Unlike Stack — which is 1D and non-wrapping by design intent —
 * Cluster always wraps its children. It is the correct primitive
 * for any collection of items that may overflow their container.
 *
 * @example
 * <Cluster gap="sm" align="center">
 *   <Badge>IoT</Badge>
 *   <Badge>EV Charging</Badge>
 *   <Badge>Smart Mobility</Badge>
 * </Cluster>
 */
export function Cluster({
  as: Component = "div",
  align = "center",
  justify = "start",
  gap = "sm",
  className,
  children,
  ...props
}: ClusterProps) {
  return (
    <Component
      className={cn(
        "flex flex-wrap",
        alignMap[align],
        justifyMap[justify],
        gapMap[gap],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
