import { Button } from "@/design-system";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import Link from "next/link";

/**
 * CTAButton
 *
 * The primary call-to-action button rendered in the Navbar.
 * Composes the Button primitive inside a NextLink for routing.
 * (Next.js Link wraps the Button primitive seamlessly because the Button primitive is a <button> not an <a>).
 *
 * Wait, actually, putting a <button> inside an <a> is invalid HTML and causes hydration mismatches.
 * The correct pattern is to use the Link primitive with the Button styles, OR
 * wait, the design system's Button primitive does not support `asChild`.
 * Since we need a link that looks like a button, we can use the `buttonVariants` directly.
 */
import { cn } from "@/lib/utils";
import { BASE_STYLES, VARIANT_STYLES, SIZE_STYLES } from "@/design-system/primitives/actions/buttonVariants";

export function CTAButton() {
  return (
    <Link
      href="/contact"
      className={cn(
        BASE_STYLES,
        VARIANT_STYLES["primary"],
        SIZE_STYLES["md"],
        "hidden md:inline-flex" // Hidden on mobile, MobileNav handles its own CTA
      )}
    >
      <span className="flex items-center gap-2">
        Contact
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}
