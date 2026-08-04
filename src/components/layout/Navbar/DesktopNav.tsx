import { siteConfig } from "@/config/site";
import { Cluster } from "@/design-system";
import { NavItem } from "./NavItem";
import { MegaMenu } from "./MegaMenu";

/**
 * DesktopNav
 *
 * Renders the primary navigation links for desktop viewports.
 * Hidden on mobile.
 */
export function DesktopNav() {
  return (
    <nav aria-label="Main Navigation" className="hidden md:block">
      <Cluster gap="lg">
        <MegaMenu
          title="Platforms"
          parentHref="/platforms"
          items={siteConfig.footerNav.platforms.map((p) => ({
            ...p,
            description: "Explore our enterprise-grade digital solutions.",
          }))}
        />
        <NavItem title="Products" href="/products" />
        <NavItem title="Solutions" href="/solutions" />
        <NavItem title="Portfolio" href="/portfolio" />
        <NavItem title="About" href="/about" />
      </Cluster>
    </nav>
  );
}
