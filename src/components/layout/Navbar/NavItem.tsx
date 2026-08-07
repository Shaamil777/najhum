"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Link as DesignLink } from "@/design-system";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface NavItemProps {
  title: string;
  href: string;
}

/**
 * NavItem
 *
 * A reusable primitive for standard navigation links.
 * Incorporates the "Magic Pill" Framer Motion shared layout effect.
 * As the user hovers across items, the background pill glides seamlessly.
 */
export function NavItem({ title, href }: NavItemProps) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  
  const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DesignLink
        href={href}
        underline="never"
        className={cn(
          "relative z-10 text-sm font-semibold tracking-wide px-4 py-2 transition-colors duration-200",
          isActive ? "text-primary" : "text-inherit hover:opacity-80"
        )}
      >
        {title}
      </DesignLink>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            layoutId="desktop-nav-hover-pill"
            className="absolute inset-0 bg-surface-alt rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
      </AnimatePresence>

      {/* Active state pill (rendered under the hover pill if hovered) */}
      {!isHovered && isActive && (
        <motion.div
          layoutId="desktop-nav-active-pill"
          className="absolute inset-0 bg-primary/5 rounded-md"
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  );
}
