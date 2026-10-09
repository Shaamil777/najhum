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
export function DesktopNav({ solutions = [] }: { solutions?: Array<{ title: string; slug: string; metaDescription: string | null }> }) {
  return (
    <nav aria-label="Main Navigation" className="hidden lg:block">
      <Cluster gap="lg">
        <MegaMenu
          title="Platforms"
          parentHref="/platforms"
          items={siteConfig.footerNav.platforms.map((p) => ({
            ...p,
            description: "Explore our enterprise-grade digital solutions.",
          }))}
        />
        {solutions.length ? <MegaMenu title="Solutions" parentHref="/solutions" items={solutions.slice(0, 6).map((solution) => ({ title: solution.title, href: `/solutions/${solution.slug}`, description: solution.metaDescription || 'Explore this solution.' }))} /> : <NavItem title="Solutions" href="/solutions" />}
        <NavItem title="Products" href="/products" />
        <NavItem title="About" href="/about" />
      </Cluster>
    </nav>
  );
}
