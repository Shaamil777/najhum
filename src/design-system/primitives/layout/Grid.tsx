import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;
type GridGap = "none" | "sm" | "md" | "lg" | "xl";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns at each breakpoint.
   * Unset breakpoints inherit from the previous (mobile-first).
   */
  cols?: GridColumns;
  colsSm?: GridColumns;
  colsMd?: GridColumns;
  colsLg?: GridColumns;
  colsXl?: GridColumns;
  /**
   * Gap between grid cells.
   * Maps to Tailwind gap utilities backed by spacing scale.
   */
  gap?: GridGap;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

const colsMap: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const colsSmMap: Record<GridColumns, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  12: "sm:grid-cols-12",
};

const colsMdMap: Record<GridColumns, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
};

const colsLgMap: Record<GridColumns, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  12: "lg:grid-cols-12",
};

const colsXlMap: Record<GridColumns, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
  6: "xl:grid-cols-6",
  12: "xl:grid-cols-12",
};

const gapMap: Record<GridGap, string> = {
  none: "gap-0",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Grid
 *
 * A responsive CSS Grid layout primitive.
 * Supports per-breakpoint column counts and token-based gap sizing.
 * All values map to Tailwind utilities — no arbitrary values.
 *
 * @example
 * <Grid cols={1} colsMd={2} colsLg={3} gap="lg">
 *   <Card />
 *   <Card />
 *   <Card />
 * </Grid>
 */
export function Grid({
  cols = 1,
  colsSm,
  colsMd,
  colsLg,
  colsXl,
  gap = "md",
  className,
  children,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        "grid",
        colsMap[cols],
        colsSm !== undefined && colsSmMap[colsSm],
        colsMd !== undefined && colsMdMap[colsMd],
        colsLg !== undefined && colsLgMap[colsLg],
        colsXl !== undefined && colsXlMap[colsXl],
        gapMap[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
