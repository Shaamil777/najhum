import { siteConfig } from "@/config/site";
import { 
  Card, 
  CardBody, 
  Grid, 
  Heading, 
  Text,
  Link,
  Stack 
} from "@/design-system";
import { ChevronDown } from "lucide-react";
import NextLink from "next/link";

interface MegaMenuProps {
  title: string;
  items: { title: string; href: string; description?: string }[];
  parentHref: string;
}

/**
 * MegaMenu
 *
 * A CSS-only dropdown menu. Uses Tailwind's `group` and `group-hover`
 * to toggle visibility without JavaScript state, ensuring instant 
 * response and perfect SEO.
 */
export function MegaMenu({ title, items, parentHref }: MegaMenuProps) {
  return (
    <div className="relative group">
      {/* The trigger link */}
      <NextLink
        href={parentHref}
        className="flex items-center gap-1 text-sm font-semibold tracking-wide text-foreground px-1 py-2"
      >
        {title}
        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
      </NextLink>

      {/* The dropdown content (hidden by default, visible on group hover) */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto z-50">
        <Card variant="elevated" radius="md" className="w-[480px]">
          <CardBody padding="lg">
            <Grid cols={2} gap="lg">
              {items.map((item) => (
                <Stack key={item.title} gap="xs">
                  <Link href={item.href} underline="hover" className="font-bold text-sm">
                    {item.title}
                  </Link>
                  {item.description && (
                    <Text variant="caption">{item.description}</Text>
                  )}
                </Stack>
              ))}
            </Grid>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
