"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Button, Heading, Stack, Divider } from "@/design-system";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FocusLock from "react-focus-lock";
import { BASE_STYLES, VARIANT_STYLES, SIZE_STYLES } from "@/design-system/primitives/actions/buttonVariants";
import { cn } from "@/lib/utils";

/**
 * MobileNav
 *
 * Renders the hamburger toggle and the fullscreen overlay menu.
 * Uses Framer Motion for entrance/exit animations.
 * Client Component for state management and active route highlighting.
 * Uses react-focus-lock to trap focus inside the menu when open.
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <div className="lg:hidden flex items-center">
      {/* Toggle Button */}
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
        className="p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm transition-colors hover:bg-surface-alt"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Fullscreen Overlay */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <FocusLock>
                <motion.div
                  id="mobile-menu"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed inset-0 z-[100] bg-background flex flex-col pt-4 px-4 overflow-y-auto"
                >
                  {/* Header Area inside menu */}
                  <div className="flex items-center justify-between h-12 mb-8">
                    <Heading level={2} variant="h3" noUppercase className="tracking-tight">
                      Menu
                    </Heading>
                    <button
                      onClick={close}
                      aria-label="Close navigation menu"
                      className="p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm transition-colors hover:bg-surface-alt"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Links */}
                  <nav className="flex-1 flex flex-col gap-6 pb-24">
                    <Stack gap="lg" className="mb-4">
                      {siteConfig.mainNav.map((item) => {
                        const isActive =
                          pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={close}
                            className={cn(
                              "text-2xl font-black uppercase tracking-tighter transition-colors",
                              isActive ? "text-primary" : "text-foreground hover:text-primary/80"
                            )}
                          >
                            {item.title}
                          </Link>
                        );
                      })}
                    </Stack>

                    <Divider />

                    <Stack gap="md" className="mt-4">
                      {siteConfig.footerNav.platforms.map((item) => {
                        const isActive =
                          pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={close}
                            className={cn(
                              "text-lg font-semibold transition-colors",
                              isActive ? "text-primary" : "text-muted hover:text-primary/80"
                            )}
                          >
                            {item.title}
                          </Link>
                        );
                      })}
                    </Stack>

                    <div className="mt-auto pt-8">
                      <Link
                        href="/contact"
                        onClick={close}
                        className={cn(BASE_STYLES, VARIANT_STYLES["primary"], SIZE_STYLES["lg"], "w-full")}
                      >
                        Contact
                      </Link>
                    </div>
                  </nav>
                </motion.div>
              </FocusLock>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
