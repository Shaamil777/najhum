import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { CARD_PADDING_STYLES, type CardPadding } from "./cardVariants";

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
}

/**
 * CardBody
 *
 * The main content area of the Card.
 * Typically contains primary text, forms, or data displays.
 *
 * Server Component.
 */
export function CardBody({
  padding = "md",
  className,
  children,
  ...props
}: CardBodyProps) {
  return (
    <div
      className={cn(
        "flex-1 w-full",
        CARD_PADDING_STYLES[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
