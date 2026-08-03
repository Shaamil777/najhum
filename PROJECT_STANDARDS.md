# NAJHUM TECHNOLOGIES — PROJECT ARCHITECTURE & OPTIMIZATION STANDARDS

This document defines the authoritative engineering, performance, responsiveness, and architecture standards for **Najhum Technologies**. All developers, contributors, and AI coding agents working on this codebase **MUST strictly follow these specifications** when building new features, refactoring components, or optimizing user interfaces.

---

## 1. UNIVERSAL RESPONSIVE EXCELLENCE & FOUR-TIER DEVICE LAYOUT STANDARDS

Every section, component, card, and interactive element **MUST be meticulously optimized across four distinct device viewport tiers**. Never build desktop-only layouts or generic responsive fallbacks; all UI builds must feel custom-tailored for each screen size:

### A. Mobile Phones (`< sm:` under 640px)
- **High-Density Compact Bento & Grid Layouts**: Prevent endless vertical scrolling by converting tall stacked lists into compact horizontal bento grids (e.g., `grid-cols-2` or `grid-cols-3`) or swipable banners.
- **Touch-Friendly & Zero Hover Contamination**: Interactive elements must work cleanly on touch screens. Never use global `hover:` or `group-hover:` styles that cause sticky hover states on touch devices; always scope hover interactions to desktop using `lg:hover:` and `lg:group-hover:`.
- **Responsive Typography & Clamping**: Scale down headings and padding (`p-3 sm:p-5`), and use text clamping (`line-clamp-1`, `line-clamp-2`) for secondary descriptions on small screens.

### B. Tablets & iPads (`sm:` to `lg:` 640px – 1024px)
- **Balanced Multi-Column Structures**: Utilize 2-column or 3-column bento grids (`sm:grid-cols-2 md:grid-cols-3`) with harmonious spacing.
- **Touch Interaction Compliance**: Like mobile phones, tablets must use static, crisp card states without hover dependency (`lg:hover:` scoped only to desktop).
- **Orientation Harmony**: Ensure layouts look balanced in both portrait and landscape iPad/tablet orientations.

### C. Laptops & MacBooks (`lg:` 1024px – 1279px, `xl:` 1280px – 1535px)
- **Compact High-End Laptop Layouts**: Specifically tailored for 13", 14", and 15" MacBook and laptop screens (`1024px – 1440px`).
- **Controlled Proportions**: Keep main titles (`xl:text-5xl`), padding (`xl:py-24`), card widths (`xl:w-[75%]`), and spacing compact enough that sections never overflow, crowd, or require excessive vertical scrolling on laptop screens.
- **Desktop Interactive Hover**: Enable refined micro-animations, lateral slides, and glow borders using `lg:hover:` and `lg:group-hover:`.

### D. Windows Desktop Monitors & Full Screens (`2xl:` 1536px and wider)
- **Grand, Expansive Desktop Scale**: Standard 1080p monitors (at 100% or 125% DPI) and 4K displays must use dedicated `2xl:` utilities so they are not constrained by MacBook laptop sizing.
- **Restored Spacious Proportions**: Explicitly scale up section padding (`2xl:py-32 2xl:px-24`), grid spacing (`2xl:gap-28`), main headings (`2xl:text-6xl`), card widths (`2xl:w-[78%]`), and icon badges (`2xl:w-11 2xl:h-11`).
- **Command-Center Grids**: Maximize wide-screen real estate (`2xl:max-w-[1536px]`) to deliver a high-impact, cinematic industrial aesthetic.


---

## 2. PERFORMANCE, LAZY LOADING & CORE WEB VITALS

All code written for this project must prioritize performance, fast page loading, and minimal client bundle overhead.

### A. Lazy Loading & Dynamic Imports (`next/dynamic`)
- **Heavy Below-the-Fold Components**: Use Next.js dynamic imports (`dynamic(() => import(...), { ssr: false })`) for heavy interactive widgets, data charts, 3D graphics, modals, or below-the-fold analytical modules that are not required for initial page render.
- **Conditional Rendering**: Avoid rendering heavy DOM trees that are hidden via CSS (`hidden`) when possible; dynamically mount components only when required by the active breakpoint or user state.

### B. Media & Asset Optimization
- **Next.js Image Optimization (`next/image`)**: Always use `<Image />` with explicit `width`, `height`, `sizes`, and proper loading attributes:
  - Add `priority={true}` for above-the-fold Hero images or brand assets.
  - Use `loading="lazy"` for all below-the-fold graphics and cards.
- **Video Optimization**: For background videos, use HTML5 `<video>` tags with `preload="auto"` or `"metadata"`, `muted`, `playsInline`, and web-optimized MP4/WebM codecs.

### C. Zero Cumulative Layout Shift (CLS < 0.1)
- **Explicit Dimensions & Aspect Ratios**: Always assign explicit height, aspect-ratio (`aspect-video`, `aspect-square`), or container min-heights to media wrappers, marquee tracks, and card containers so the layout never jumps while assets load.
- **Font Optimization**: Leverage Next.js font optimization (`next/font`) to eliminate Flash of Unstyled Text (FOUT) and layout shifts.

### D. Hardware-Accelerated Animations
- **CSS Transitions**: Animate using GPU-accelerated properties (`transform: translate3d/scale`, `opacity`). Never animate layout-triggering properties (`width`, `height`, `margin`, `top`, `left`).
- **Marquee & Infinite Loops**: Optimize CSS `@keyframes` animations (such as auto-loop marquees) to execute smoothly at 60fps with zero CPU lag or memory leaks.

---

## 3. CODE STRUCTURE, TYPING & CLEAN ARCHITECTURE

- **Strict TypeScript**: Ensure 100% type safety for all components, props, and data structures. Avoid `any` types.
- **Modular & Reusable Components**: Break large UI sections into small, focused, maintainable `.tsx` components in `src/components/`.
- **Zero-Warning Builds**: Every commit and feature addition must compile cleanly (`npm run build` / Next.js Turbopack) with zero JSX syntax errors, missing closing tags, or unhandled hydration errors.
