
# Fortune 500 Project Quality Rules

Treat this project as production software for a Fortune 500 enterprise.
Every implementation must satisfy the following:

## Architecture
- Follow SOLID principles.
- Follow Clean Architecture.
- Follow Composition over Inheritance.
- Avoid unnecessary abstractions.
- Keep components highly reusable.

## Code
- Strict TypeScript.
- No any.
- No duplicated logic.
- No magic numbers.
- No inline styles.
- No hardcoded colors, spacing, or typography.
- No unnecessary client components.

## Performance
- Prefer Server Components.
- Avoid unnecessary re-renders.
- Lazy load when appropriate.
- Minimize JavaScript and keep bundle size small.

## Design System
- All values come from design tokens.
- No arbitrary Tailwind values.
- Components must support variants and responsive layouts.

## Accessibility
- WCAG AA compliant.
- Proper semantic HTML.
- Keyboard navigation and screen reader friendly.

## SEO
- Semantic HTML and proper heading hierarchy.
- Metadata friendly with no accessibility regressions.

## Developer Experience
- Clear folder structure, small focused components, self-documenting names, easy future maintenance.

## Task Completion Protocol
Every completed task must finish with:
1. Self-review
2. Architecture review
3. Performance review
4. Accessibility review
5. Suggestions for improvement
