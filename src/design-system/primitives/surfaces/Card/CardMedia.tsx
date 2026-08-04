import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * CardMedia
 *
 * Renders an edge-to-edge container for images, video, or maps inside a Card.
 * Use the AspectRatio primitive inside this for enforced media proportions.
 *
 * Card manages overflow-hidden, so CardMedia automatically respects Card radius.
 *
 * Server Component.
 *
 * @example
 * <Card>
 *   <CardMedia>
 *     <AspectRatio ratio="video">
 *       <Image src="/hero.jpg" alt="" fill className="object-cover" />
 *     </AspectRatio>
 *   </CardMedia>
 *   <CardBody>...</CardBody>
 * </Card>
 */
export function CardMedia({
  className,
  children,
  ...props
}: CardMediaProps) {
  return (
    <div
      className={cn("w-full flex-shrink-0 relative", className)}
      {...props}
    >
      {children}
    </div>
  );
}
