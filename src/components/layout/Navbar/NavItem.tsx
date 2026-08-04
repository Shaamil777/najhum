import { Link } from "@/design-system";

export interface NavItemProps {
  title: string;
  href: string;
}

/**
 * NavItem
 *
 * A reusable primitive for standard navigation links.
 * Composes the design system Link primitive with specific underline behaviour
 * and padding to increase the hit area for touch targets.
 */
export function NavItem({ title, href }: NavItemProps) {
  return (
    <Link
      href={href}
      underline="hover"
      className="text-sm font-semibold tracking-wide text-foreground px-1 py-2"
    >
      {title}
    </Link>
  );
}
