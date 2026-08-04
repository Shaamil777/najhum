import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Cluster } from "@/design-system/primitives/layout/Cluster";

export interface CardActionsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Action alignment.
   * - start   → Left aligned (default)
   * - end     → Right aligned (common in dialogs/footers)
   * - stretch → Full width buttons
   */
  align?: "start" | "end" | "stretch";
}

/**
 * CardActions
 *
 * Renders a grouped container for buttons inside a Card.
 * Typically placed inside CardFooter.
 * Composes the Cluster primitive to handle wrapping and gap spacing automatically.
 *
 * Server Component.
 *
 * @example
 * <CardFooter>
 *   <CardActions align="end">
 *     <Button variant="ghost">Cancel</Button>
 *     <Button variant="primary">Submit</Button>
 *   </CardActions>
 * </CardFooter>
 */
export function CardActions({
  align = "start",
  className,
  children,
  ...props
}: CardActionsProps) {
  const alignMap = {
    start: "justify-start w-full",
    end: "justify-end w-full",
    stretch: "w-full *:w-full *:flex-1",
  };

  return (
    <Cluster
      gap="md"
      className={cn(alignMap[align], className)}
      {...props}
    >
      {children}
    </Cluster>
  );
}
