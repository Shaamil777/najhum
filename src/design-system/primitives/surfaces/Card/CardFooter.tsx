import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { CARD_PADDING_STYLES, type CardPadding } from "./cardVariants";

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
}

/**
 * CardFooter
 *
 * Renders at the bottom of the Card.
 * Typically contains metadata, tertiary information, or actions.
 *
 * Server Component.
 */
export function CardFooter({
  padding = "md",
  className,
  children,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center w-full mt-auto",
        CARD_PADDING_STYLES[padding],
        // Remove top padding since CardBody handles rhythm
        "pt-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
