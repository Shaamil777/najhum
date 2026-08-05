"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  Card, 
  CardBody, 
  Grid, 
  Text,
  Link as DesignLink,
  Stack 
} from "@/design-system";
import { ChevronDown } from "lucide-react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface MegaMenuProps {
  title: string;
  items: { title: string; href: string; description?: string }[];
  parentHref: string;
}

/**
 * MegaMenu
 *
 * A React-controlled dropdown menu with the "Magic Pill" hover effect.
 * Uses onMouseEnter/Leave with a timeout to debounce the dropdown state,
 * while utilizing Framer Motion's layoutId to share the background pill
 * with sibling NavItems.
 */
export function MegaMenu({ title, items, parentHref }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // 150ms delay before closing
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isParentActive = pathname === parentHref || (parentHref !== "/" && pathname?.startsWith(parentHref));

  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* The trigger link */}
      <NextLink
        href={parentHref}
        className={cn(
          "relative z-10 flex items-center gap-1 text-sm font-semibold tracking-wide px-4 py-2 transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md",
          isParentActive ? "text-primary" : "text-foreground"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {title}
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-200", 
            isOpen && "rotate-180"
          )} 
        />
      </NextLink>

      {/* Magic Pill Hover Effect */}
      <AnimatePresence>
        {isOpen && (
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

      {/* Active state pill */}
      {!isOpen && isParentActive && (
        <motion.div
          layoutId="desktop-nav-active-pill"
          className="absolute inset-0 bg-primary/5 rounded-md"
          transition={{ duration: 0.2 }}
        />
      )}

      {/* The dropdown content */}
      <div 
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 z-50",
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 translate-y-2 pointer-events-none"
        )}
      >
        <Card variant="elevated" radius="md" className="w-[480px]">
          <CardBody padding="lg">
            <Grid cols={2} gap="lg">
              {items.map((item) => {
                const isChildActive = pathname === item.href;
                return (
                  <Stack key={item.title} gap="xs">
                    <DesignLink 
                      href={item.href} 
                      underline="never" 
                      className={cn(
                        "font-bold text-sm",
                        isChildActive ? "text-primary" : "text-foreground"
                      )}
                    >
                      {item.title}
                    </DesignLink>
                    {item.description && (
                      <Text variant="caption">{item.description}</Text>
                    )}
                  </Stack>
                );
              })}
            </Grid>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
