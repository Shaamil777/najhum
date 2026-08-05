import { type SVGProps, useId } from "react";
import { cn } from "@/lib/utils";

export interface GridPatternProps extends SVGProps<SVGSVGElement> {
  /** The width of each grid square. @default 40 */
  width?: number;
  /** The height of each grid square. @default 40 */
  height?: number;
  /** X offset for the grid starting position. @default -1 */
  x?: number;
  /** Y offset for the grid starting position. @default -1 */
  y?: number;
  /** The color/opacity of the grid lines. Uses Tailwind classes. @default "stroke-black/5 dark:stroke-white/5" */
  strokeClassName?: string;
  /** 
   * Provides a radial mask so the grid fades out at the edges.
   * Format: CSS mask-image radial-gradient string.
   * @default "radial-gradient(100% 100% at top center, white, transparent)"
   */
  mask?: string;
}

/**
 * GridPattern
 *
 * A reusable background grid SVG. Used to give a premium, technical vibe
 * to hero sections and technical content areas.
 *
 * Server Component compatible (uses useId for unique pattern IDs, which is SSR safe in React 18+).
 */
export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeClassName = "stroke-foreground/5",
  mask = "radial-gradient(100% 100% at top center, white, transparent)",
  className,
  ...props
}: GridPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
      style={
        mask
          ? {
              maskImage: mask,
              WebkitMaskImage: mask,
            }
          : undefined
      }
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray="0"
            className={strokeClassName}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}
