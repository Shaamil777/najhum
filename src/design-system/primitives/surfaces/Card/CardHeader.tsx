import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { CARD_PADDING_STYLES, type CardPadding } from "./cardVariants";

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
}

/**
 * CardHeader
 *
 * Renders at the top of the Card.
 * Typically contains title (Heading), subtitle (Text), and optional actions (Cluster).
 *
 * Server Component.
 */
export function CardHeader({
  padding = "md",
  className,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 w-full",
        CARD_PADDING_STYLES[padding],
        // Remove bottom padding if CardBody follows
        "pb-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
