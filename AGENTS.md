<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# MANDATORY PROJECT ARCHITECTURE & OPTIMIZATION STANDARDS

You MUST strictly follow the specifications defined in [`PROJECT_STANDARDS.md`](file:///c:/Users/user/Desktop/Dexiko/Najhum/najhum/PROJECT_STANDARDS.md) for all coding, refactoring, and UI tasks in this project:
1. **Responsive Excellence**: Implement dedicated layouts for Mobile (`< sm:`, compact multi-column dashboards, touch-friendly, no hover dependencies), Tablets (`sm:` / `md:`), and Desktops (`lg:`, `xl:`, full command center grids).
2. **Performance & Lazy Loading**: Always use `next/dynamic` for heavy or below-the-fold interactive components, optimize media with `next/image` (`priority` for hero, `lazy` for below the fold), and ensure zero Cumulative Layout Shift (CLS < 0.1).

