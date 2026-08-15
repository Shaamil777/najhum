"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

/**
 * Navbar
 *
 * The root navigation component.
 * Tracks scroll state to transition from transparent to blurred background.
 * Composes DesktopNav, MobileNav, and CTAButton.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold of 50px before transitioning background
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "bg-surface/95 backdrop-blur-lg border-border shadow-sm py-2 text-foreground"
          : "bg-transparent border-transparent py-4 text-white dark"
      )}
    >
      <div className="max-w-[var(--spacing-container)] mx-auto px-8 lg:px-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" 
          aria-label={siteConfig.name}
        >
          <Image
            src="/logo/logo.png"
            alt={siteConfig.name}
            width={160}
            height={53}
            priority
            className="h-12 w-auto object-contain transition-all duration-300 drop-shadow-sm"
          />
        </Link>

        {/* Center: Desktop Links */}
        <div className="hidden lg:flex flex-1 justify-center">
          <DesktopNav />
        </div>

        {/* Right: Actions & Mobile Toggle */}
        <div className="flex items-center justify-end gap-4 shrink-0">
          <CTAButton />
          <MobileNav />
        </div>
        
      </div>
    </header>
  );
}
