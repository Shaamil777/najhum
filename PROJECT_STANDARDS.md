# NAJHUM TECHNOLOGIES — PROJECT ARCHITECTURE & OPTIMIZATION STANDARDS

This document defines the authoritative engineering, performance, responsiveness, and architecture standards for **Najhum Technologies**. All developers, contributors, and AI coding agents working on this codebase **MUST strictly follow these specifications** when building new features, refactoring components, or optimizing user interfaces.

---

## 1. RESPONSIVE DESIGN & DEVICE-SPECIFIC LAYOUT STANDARDS

Every section and component **MUST be meticulously optimized across three core screen breakpoints**:

### A. Mobile Phones (`< sm:` under 640px)
- **High-Density Compact Layouts**: Avoid excessively long vertical pages. Use compact multi-column layouts (e.g., `grid-cols-2`) for cards and metrics where appropriate instead of stacking long single columns.
- **Touch-Friendly & No Hover Dependency**: Ensure all interactive elements, buttons, and status tags are legible and interactive on touch screens without relying on mouse hover states.
- **Responsive Typography & Spacing**: Use compact padding (`p-3.5 sm:p-6`) and prevent multi-line text wrapping on small screens by using responsive font sizing (`text-[8px] sm:text-xs`) and text clamping (`line-clamp-1`, `line-clamp-2`).

### B. Tablets & iPads (`sm:` to `lg:` 640px – 1024px)
- **Balanced Multi-Column Structures**: Utilize 2-column or 3-column grids (`sm:grid-cols-2 md:grid-cols-3`) with clean spacing.
- **Readable Cards & Grids**: Ensure proper spacing, high readability, and clean alignment across both landscape and portrait orientations.

### C. Laptops, MacBooks & Desktops (`lg:`, `xl:`, `2xl:` 1024px+)
- **Structured Desktop Layouts**: Utilize full multi-column grid structures (`lg:grid-cols-12`) with proper padding and visual balance.
- **Viewport Fitting**: Ensure critical landing and hero experiences fit comfortably within standard laptop and desktop viewport heights (`min-h-screen` or `h-screen`) without awkward clipping.

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
