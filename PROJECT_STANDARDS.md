# NAJHUM TECHNOLOGIES — PROJECT ARCHITECTURE & OPTIMIZATION STANDARDS

This document defines the authoritative engineering, performance, responsiveness, and aesthetic standards for **Najhum Technologies**. All developers, contributors, and AI coding agents working on this codebase **MUST strictly follow these specifications** when building new features, refactoring components, or styling user interfaces.

---

## 1. CORE ARCHITECTURAL PHILOSOPHY & AESTHETIC EXCELLENCE

Najhum Technologies represents state-of-the-art **Industrial IoT, EV Platforms, Smart Energy, and Real-Time Operational Intelligence**. The user interface must reflect an authentic, high-precision **Engineering Command Center**.

- **High-Contrast Industrial Palettes**: Use deep blacks (`#0A0D14`, `bg-najhum-black`), clean architectural whites (`bg-white`), subtle structural borders (`border-white/20`, `border-neutral-200`), and curated high-contrast accent colors (`cyan-400`, `najhum-blue`, `emerald-400`, `teal-400`, `indigo-400`).
- **Zero-Gap & Architectural Grid Patterns**: Leverage 1px overlapping borders (`-ml-px -mt-px`) to create seamless, zero-gap blueprint grids. Use subtle CSS linear gradient backgrounds (`bg-[size:32px_32px]`) to evoke precision technical blueprints.
- **Micro-Animations & Telemetry Polish**: Incorporate subtle animated status indicators (`animate-pulse`), live system badges, and smooth hover illumination. Never use generic or basic UI layouts.

---

## 2. RESPONSIVE DESIGN & DEVICE-SPECIFIC LAYOUT STANDARDS

Every section and component **MUST be meticulously optimized across three core screen breakpoints**:

### A. Mobile Phones (`< sm:` under 640px)
- **High-Density Compact Layouts**: Avoid excessively long vertical pages. Use compact multi-column dashboards (e.g., `grid-cols-2`) for cards and metrics instead of stacking long single columns.
- **Touch-Friendly & No Hover Dependency**: Ensure all interactive elements, buttons, and status tags are legible and interactive on touch screens without relying on mouse hover states.
- **Responsive Typography & Spacing**: Use compact padding (`p-3.5 sm:p-6`) and prevent multi-line text wrapping on small screens by using responsive font sizing (`text-[8px] sm:text-xs`) and text clamping (`line-clamp-1`, `line-clamp-2`).

### B. Tablets & iPads (`sm:` to `lg:` 640px – 1024px)
- **Balanced Multi-Column Structures**: Utilize 2-column or 3-column grids (`sm:grid-cols-2 md:grid-cols-3`) with clean spacing.
- **Readable Architectural Cards**: Maintain crisp, high-contrast typography and ensure card backgrounds (white or dark glassmorphism) provide strong readability in both landscape and portrait orientations.

### C. Laptops, MacBooks & Desktops (`lg:`, `xl:`, `2xl:` 1024px+)
- **Command Center Layouts**: Enable full-screen immersive interfaces (`lg:h-screen`, `lg:grid-cols-12`) with advanced interactive Bento layouts and hover illumination.
- **Viewport Fitting**: Fit critical landing and hero experiences to viewport height (`h-screen` or `min-h-screen`) on laptop and MacBook resolutions so users see a complete, cohesive interface without awkward clipping.

---

## 3. PERFORMANCE, LAZY LOADING & CORE WEB VITALS

All code written for this project must prioritize performance, fast page loading, and minimal client bundle overhead.

### A. Lazy Loading & Dynamic Imports (`next/dynamic`)
- **Heavy Below-the-Fold Components**: Use Next.js dynamic imports (`dynamic(() => import(...), { ssr: false })`) for heavy interactive widgets, data charts, 3D graphics, modals, or below-the-fold analytical modules that are not required for initial page render.
- **Conditional Rendering**: Avoid rendering heavy DOM trees that are hidden via CSS (`hidden`) when possible; dynamically mount components only when required by the active breakpoint or user state.

### B. Media & Asset Optimization
- **Next.js Image Optimization (`next/image`)**: Always use `<Image />` with explicit `width`, `height`, `sizes`, and proper loading attributes:
  - Add `priority={true}` for above-the-fold Hero images or brand assets.
  - Use `loading="lazy"` for all below-the-fold graphics and cards.
- **Video Optimization**: For background videos, use HTML5 `<video>` tags with `preload="auto"` or `"metadata"`, `muted`, `playsInline`, and web-optimized MP4/WebM codecs. Use CSS transition opacity to swap background videos cleanly without flicker.

### C. Zero Cumulative Layout Shift (CLS < 0.1)
- **Explicit Dimensions & Aspect Ratios**: Always assign explicit height, aspect-ratio (`aspect-video`, `aspect-square`), or container min-heights to media wrappers, marquee tracks, and card containers so the layout never jumps while assets load.
- **Font Optimization**: Leverage Next.js font optimization (`next/font`) to eliminate Flash of Unstyled Text (FOUT) and layout shifts.

### D. Hardware-Accelerated Animations
- **CSS Transitions**: Animate using GPU-accelerated properties (`transform: translate3d/scale`, `opacity`). Never animate layout-triggering properties (`width`, `height`, `margin`, `top`, `left`).
- **Marquee & Infinite Loops**: Optimize CSS `@keyframes` animations (such as auto-loop marquees) to execute smoothly at 60fps with zero CPU lag or memory leaks.

---

## 4. CODE STRUCTURE, TYPING & CLEAN ARCHITECTURE

- **Strict TypeScript**: Ensure 100% type safety for all components, props, and data structures. Avoid `any` types.
- **Modular & Reusable Components**: Break large UI sections into small, focused, maintainable `.tsx` components in `src/components/`.
- **Zero-Warning Builds**: Every commit and feature addition must compile cleanly (`npm run build` / Next.js Turbopack) with zero JSX syntax errors, missing closing tags, or unhandled hydration errors.
