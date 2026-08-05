import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Navigation, type LucideIcon } from "lucide-react";

export interface MarketingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The text to display in the button */
  children: React.ReactNode;
  /** Optional custom icon to display in the circle. Defaults to an arrow. */
  icon?: LucideIcon;
}

/**
 * MarketingButton
 *
 * A highly styled, premium CTA button designed specifically for high-impact
 * marketing areas (like the Hero section).
 *
 * Features:
 * - Pill shape with deep drop shadows
 * - Glowing chromatic/gradient text effect
 * - A distinct, floating white icon circle on the right
 */
export const MarketingButton = forwardRef<HTMLButtonElement, MarketingButtonProps>(
  ({ children, className, icon: Icon = Navigation, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center gap-6 rounded-full pl-8 pr-2 py-2",
          // 3D Skeuomorphic Body: Dark gradient cylinder
          "bg-gradient-to-b from-[#2a2a2c] via-[#1a1a1b] to-[#0a0a0b]",
          // 1px border to contain it
          "border border-black/80",
          "transition-all duration-300 ease-out",
          // Hover state: deeper press and glow
          "hover:scale-[1.01] hover:brightness-110",
          "active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          // 3D Shadows: 
          // 1. Outer drop shadow
          // 2. Top white rim light (inset)
          // 3. Bottom dark shadow curve (inset)
          "shadow-[0_12px_24px_-4px_rgba(0,0,0,0.6),_inset_0_1px_1px_rgba(255,255,255,0.25),_inset_0_-4px_8px_rgba(0,0,0,0.8)]",
          className
        )}
        {...props}
      >
        {/* Text with subtle gradient/glow effect */}
        <span className="text-base font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {children}
        </span>

        {/* The 3D Skeuomorphic Icon Pearl */}
        <div 
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
            // White pearl gradient
            "bg-gradient-to-b from-white via-[#f0f0f0] to-[#d0d0d0]",
            // 3D Pearl Shadows: Top highlight, bottom inner shadow, outer drop shadow onto the button
            "shadow-[0_2px_8px_rgba(0,0,0,0.5),_inset_0_2px_4px_rgba(255,255,255,1),_inset_0_-3px_5px_rgba(0,0,0,0.2)]",
            "transition-transform duration-300 group-hover:translate-x-1"
          )}
        >
          <Icon className="h-4 w-4 text-[#007AFF] drop-shadow-sm rotate-45 ml-[-2px] mt-[2px]" strokeWidth={3.5} fill="#007AFF" />
        </div>
      </button>
    );
  }
);

MarketingButton.displayName = "MarketingButton";
