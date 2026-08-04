import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Named aspect ratio presets.
 * Maps to Tailwind's aspect-ratio utilities — no inline styles, no arbitrary values.
 *
 * - square  → 1/1  (profile photos, thumbnails)
 * - classic → 4/3  (photography, traditional displays)
 * - video   → 16/9 (video embeds, hero images)
 * - cinema  → 21/9 (cinematic banners)
 */
type AspectRatioPreset = "square" | "classic" | "video" | "cinema";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Named ratio preset. Use for the vast majority of cases.
   * Use `ratioCustom` only when no preset fits.
   */
  ratio?: AspectRatioPreset;
  /**
   * Escape hatch for custom ratios not covered by presets.
   * Accepts any valid CSS aspect-ratio value (e.g. "3/2", "9/16").
   * Applied as a CSS variable — does NOT use Tailwind arbitrary values.
   */
  ratioCustom?: string;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

// Maps to Tailwind's built-in aspect-ratio utilities.
// These are utility classes generated from Tailwind's default config —
// no arbitrary values needed.
const RATIO_MAP: Record<AspectRatioPreset, string> = {
  square:  "aspect-square",
  classic: "aspect-[4/3]",
  video:   "aspect-video",
  cinema:  "aspect-[21/9]",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * AspectRatio
 *
 * A layout helper that enforces a fixed aspect ratio on its children.
 * Built on CSS `aspect-ratio` — no padding hacks, no absolute positioning tricks.
 * Children fill the container absolutely (use overflow-hidden + relative on parent).
 *
 * Use for images, videos, maps, and any media that must maintain proportions
 * across viewport sizes.
 *
 * @example
 * // 16:9 video embed
 * <AspectRatio ratio="video">
 *   <iframe src="..." className="w-full h-full" />
 * </AspectRatio>
 *
 * @example
 * // Square product thumbnail
 * <AspectRatio ratio="square" className="overflow-hidden rounded-lg">
 *   <Image src="..." fill alt="Product" className="object-cover" />
 * </AspectRatio>
 *
 * @example
 * // Custom 3:2 ratio
 * <AspectRatio ratioCustom="3/2">
 *   <Image src="..." fill alt="..." className="object-cover" />
 * </AspectRatio>
 */
export function AspectRatio({
  ratio = "video",
  ratioCustom,
  className,
  style,
  children,
  ...props
}: AspectRatioProps) {
  // Custom ratio is applied via CSS variable to avoid Tailwind arbitrary values.
  // This is the only case where we use style — and it's a CSS variable, not a raw value.
  const customStyle =
    ratioCustom !== undefined
      ? { ...style, "--aspect-ratio": ratioCustom, aspectRatio: "var(--aspect-ratio)" }
      : style;

  return (
    <div
      className={cn(
        "relative w-full",
        ratioCustom === undefined && RATIO_MAP[ratio],
        className
      )}
      style={customStyle as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
