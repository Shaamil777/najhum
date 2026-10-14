# Visual solution page builder

Implemented in this copied project. The original project folder was not edited.

## Use it

1. Start this copy with `npm run dev` (or `npm run dev:webpack`).
2. Sign in at `/admin/login` using the admin credentials configured for this project.
3. Open **Solutions → New solution**, enter the title and URL, and create it. Existing solutions open the same builder when edited.
4. Start from an Overview/Full Solution template or add sections individually. Each library card has a preview button: view its prefilled content on desktop/mobile before adding.
5. Drag a library thumbnail onto the canvas, or use its **+** button. Reorder using drag handles in the canvas/outline or the outline's up/down buttons.
6. Select a section and edit its headings, paragraphs, buttons, images, cards, tabs, and lists in **Content**. Changes render immediately.
7. Use **Design** for section background, heading/paragraph colors, alignment, spacing, device-specific heading sizes, and visibility.
8. Switch between desktop (1280px), tablet (768px), and mobile (390px). The preview uses a separate iframe viewport, so actual CSS breakpoints apply.
9. Save the draft, preview it, and press **Publish** to update the public `/solutions/[slug]` page.

The editor also provides section duplication, removal, hide/show, undo/redo, draft autosave, page title/slug/SEO settings, discard draft, and unpublish. Undo/redo history lasts for the current editor session; it is not a permanent revision archive.

## Drafts and Supabase

The existing tables and JSON columns are retained. **The six new section types require a manual enum update before publication:** follow `database/SETUP.md` and run `database/solution-builder-sections.sql` yourself. Codex has not applied this SQL to Supabase. Working documents are stored in the existing `PageContent` table under reserved `__solution_builder__<solution-id>` keys. They are excluded from the generic Pages listing.

Saving a draft does not update live `Solution` or `Section` records. Publishing validates the entire document and replaces the solution's sections and metadata in one serializable transaction. Section appearance is stored in each section's JSON `_design` property. Existing solutions are imported when first opened; no bulk migration or content reseeding is needed.

Saved document versions and fingerprints of the live solution reject stale edits from another tab or legacy editor. On a conflict, preserve any unsaved text and reload. Deleting a solution also removes its associated working document. Changing a published slug updates product associations and refreshes old/new paths; this release does not create redirects from old slugs.

The copy's `.env` still points to the original services. Copying files does not clone Supabase. Configure a separate database/storage destination if you want an independent staging site. No live Supabase or cloud-storage data was modified during implementation or testing.

## Sections and media

All 18 section types are available. The 12 existing types are: Hero, Introduction, Challenges, Features, Benefits, Testimonials, Use Cases, Methodology, SolaaS, Products, Call to Action, and Rich Content.

The six new types are **Product cards, Image cards, Video cards, Comparison table, Graph, and Information & buttons**. Every new section starts with editable sample values, images, actions, rows, or graph data. Sample numbers/copy are illustrative.

Use the eye button on any library card for a desktop/mobile preview, then **Add this section**. Product cards automatically select up to three available published products and provide a checkbox picker (up to 12 products). With no products, previews show labeled samples; publication requires choosing actual published products. Each card links to the exact product ID and its detail page now displays that product’s database content instead of a static example.

Image cards provide 2/3-column layouts, image uploads, editable captions/copy, redirect actions, and information popovers. Video cards support local or HTTPS MP4/WebM URLs, YouTube/Vimeo links, posters, descriptions, and redirects. Video file upload is not included; paste an existing video URL.

Comparison tables have 2–6 columns and up to 20 rows, automatic row alignment when adding/removing columns, row reorder, rich-text cells, and a highlighted column. On narrow screens the table scrolls horizontally. Graphs support bar, line, area, pie, and donut styles with up to 16 nonnegative data points, color, labels, units, value labels, and an accessible data table. Information & buttons provide editable information panels and destination links, including optional new-tab behavior.

Text controls offer bold, italic, underline, strikethrough, bullet/numbered lists, links, word color, and word size. Select text and choose a toolbar action; changes appear in the live canvas. Formatting is sanitized before rendering. Paragraph lists are available in copy fields; heading fields offer inline styling. Undo/redo also restores formatted text.

The original Products block shows published products associated with the solution; empty collections show an instructional placeholder while editing and are omitted publicly. The product section's saved heading and description now render on the website.

Images can be entered by URL, chosen from the existing solution library, or uploaded. The upload service now supports both the existing R2 implementation and Vercel Blob, matching the copied project's configured storage choice. It still validates image type, extension, size, and file headers before upload. Vercel uploads require a working public Blob store and `BLOB_READ_WRITE_TOKEN`; real external uploads were not performed during testing. The SDK integration was tested with mocked storage calls. AWS S3 remains outside this implementation.

## Security and rendering

- Admin APIs are authenticated centrally by the Next proxy; the builder handlers also check authentication directly.
- Cross-origin admin writes are rejected while accounting for the incoming public Host/protocol behind Next's internal URL reconstruction.
- Builder saves validate required content, collection bounds, safe destinations, style values, and unique section IDs.
- The editor canvas and public solution pages share `SolutionSection` and its responsive styling.
- Draft preview is local React state; no Supabase Realtime subscription is needed.
- Admin records and platform product data are loaded at request time rather than embedded during a build.

The builder edits structured sections and their content. Arbitrary element positioning, nested free-form layout creation, team roles, scheduled publication, and permanent revision history are not part of this release.

## Important files

| File | Purpose |
| --- | --- |
| `src/components/admin/builder/SolutionBuilder.tsx` | Canvas, dragging, section management, history, saving/publishing |
| `ContentInspector.tsx`, `DesignInspector.tsx` | Content and appearance controls |
| `PreviewFrame.tsx` | Isolated, resizable live preview |
| `src/lib/builder/catalog.ts` | Section library, defaults, templates, repeatable-item definitions |
| `src/lib/builder/document.ts` | Shared types and document validation |
| `src/lib/builder/server.ts` | Draft persistence, concurrency protection, atomic publication |
| `src/app/api/admin/solutions/[id]/builder/route.ts` | Authenticated draft API |
| `src/components/solutions/SolutionSection.tsx` | Shared public/editor renderer |
| `src/components/solutions/solution-builder.css` | Persisted responsive section styles |

## Verification

- 65 automated tests passed, including validation, draft/live separation, publish transaction calls, conflict handling, authentication, origin checks, and configured storage routing.
- Expanded-section browser checks verified pre-add desktop/mobile previews, all six new sections, comparison column/row controls, a saved donut-chart selection, italics/bullets/word size, information popovers, reload persistence, actual publication, and navigation to the selected product detail page. The manual SQL script was executed twice only against an isolated local test database.
- Browser tests exercised drag reorder, library-to-canvas insertion, content editing, mobile/desktop styles, duplicate/remove/undo, reload persistence, and the new-solution/template workflow.
- Actual API saves and publication were exercised against an isolated in-memory PostgreSQL server through the project's Prisma adapter. A public page retained its original heading after a draft save and changed only after publication.
- Mobile and desktop heading styles were checked in the iframe at 36px and 64px respectively.
- The production Webpack build passed, including compilation, TypeScript checks, static generation, and build traces. Targeted lint checks for the builder and its API/storage implementation passed.

For the tested production build command, use `npm run build -- --webpack`. Build verification used an unreachable local database URL after request-time rendering fixes, proving the build does not require live database content.

There is an optional development-only `/admin/solutions/preview-builder` route, enabled only with `BUILDER_LOCAL_PREVIEW=1` and `NODE_ENV=development`. It stores a sample document in browser storage and cannot publish to Supabase. Normal solution editing always uses the real authenticated database API.

Optional tooling variables:

- `NAJHUM_PREVIEW_DIST_DIR`: separate Next generated output directory; defaults to `.next`.
- `NAJHUM_DB_POOL_MAX`: database connection-pool limit; defaults to 10. The isolated PGlite test server required 1.
