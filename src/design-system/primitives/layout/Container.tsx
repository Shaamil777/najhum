import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Controls the maximum width of the container.
   * Maps directly to design token variables defined in theme.css.
   *
   * - sm  → max-w-2xl    (42rem)
   * - md  → max-w-4xl    (56rem)
   * - lg  → max-w-6xl    (72rem)
   * - xl  → max-w-screen-xl (1280px)
   * - full → max-w-[var(--spacing-container)]  (90rem — default container token)
   */
  size?: ContainerSize;
  /**
   * Whether to apply default horizontal padding.
   * Set to false when the parent already handles padding.
   */
  padded?: boolean;
}

// ─── Size Map ─────────────────────────────────────────────────────────────────

const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-screen-xl",
  full: "max-w-[var(--spacing-container)]",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Container
 *
 * A layout primitive that constrains its children to a maximum width
 * and centres them horizontally. Used as the outermost layout wrapper
 * on every page and section.
 *
 * @example
 * <Container size="xl">
 *   <HeroSection />
 * </Container>
 */
export function Container({
  size = "full",
  padded = true,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto",
        sizeMap[size],
        padded && "px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
