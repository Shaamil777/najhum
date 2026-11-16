# HTML solution publishing

## Required Supabase cutover (run manually)

1. Run `database/solution-html-import.sql` in the Supabase SQL Editor. It adds the HTML metadata columns and page-document storage table. It does not delete existing solutions.
2. Run `database/solution-html-reset.sql` to permanently delete old solution records, sections, image references and builder drafts. It creates no backup or archive and drops `LegacySolutionArchive` if a previous reset created it. Products, unrelated pages and media files remain; old product-to-solution links are cleared. New HTML revisions are excluded from this reset.
3. Deploy this code and run `npx prisma generate` during the build (already in the build script).
4. Open `/admin/solutions/new`, upload the package, save, preview, then publish. New solutions remain unpublished until publication. No sample page has been seeded to the database automatically.

The code intentionally does not execute either migration/reset against your Supabase account. Apply both before using the new editor. Public solution routes now require a published HTML revision. Legacy pages no longer render.

## Upload formats

- One `.zip` containing exactly one HTML file and supporting assets, preserving relative paths.
- Or one `.html` with CSS/JavaScript inside it, plus separately selected assets. For individually selected images the importer resolves unique matching filenames even if the HTML references a folder.
- Embedded base64 PNG/JPEG/WebP/GIF/AVIF images are extracted and deduplicated.
- Assets: PNG, JPEG, WebP, GIF, AVIF, drawing-only SVG, MP4, WOFF2. Bundled CSS and classic JavaScript files are supported; CDN script dependencies and ES modules must be bundled first.
- One responsive document only; no separate mobile file. Max compressed request: 4 MB, compatible with common serverless request ceilings. Max ZIP expanded size: 40 MB; max 150 entries; max individual expanded asset: 4 MB. Larger packages need a future direct-to-storage upload path.
- ZIP extraction is in memory: no paths are written to the server filesystem. Traversal, ambiguous/missing assets and invalid signatures reject the import.
- Unknown unsupported files in a ZIP (e.g. README/TSX alternatives) are ignored unless referenced; a ZIP with multiple HTML documents is rejected.
- CSS is scoped and keyframes namespaced. Root/body rules apply to the page wrapper. Google font links are removed; the Cold Storage sample's --display/--body tokens use the project's existing Outfit/Inter variables.
- Keep semantic headings, alt text, media dimensions, reduced-motion rules and a usable static fallback.

## JavaScript and trust

Code import is available only through existing authenticated admin routes with same-origin mutation checks. Uploaded JavaScript is parsed for syntax, never executed on the server. Published scripts run with website-level browser privileges; this is a deployment capability for trusted administrators, not a customer-upload feature or a security sandbox.

Preview is an opaque-origin iframe (`sandbox="allow-scripts"`, no same-origin flag); the script runs against its own document and cannot read the admin session. Preview is optional and does not enable or block publishing. Preview opens only the last saved draft and never saves changes automatically. Publish changes first saves pending edits, then publishes the saved draft; a failed save prevents publishing.

The live runtime retains original script logic and tracks its normal window/document listeners, RAFs, timers and observers for cleanup on navigation. Scripts that inject global CSS/DOM or register resources indirectly through third-party libraries must clean those up explicitly; arbitrary code cannot be automatically guaranteed harmless or perfectly reversible. Use page-local selectors and ordinary window/document event APIs. Module imports, inline event attributes and nested iframe/object/embed content are unsupported in this version. No silent removal of required scripts: import rejects unsupported cases with an error.

## Storage and database

The existing provider setting is reused: R2 (default) or Vercel Blob. New media uses UUID keys in `solutions/imports/`. Failed imports attempt to clean up only assets created by that attempt. The current draft and live page retain the assets they use. Superseded draft/live documents are removed on save/publish, and their owned uploads are deleted if no retained page or catalogue entry references them. Cleanup failures are logged without failing a successful save. Unreferenced files from abandoned, never-saved media uploads are not part of this cleanup.

The processed HTML/CSS/scripts, asset manifest, original entry filename, checksum, warnings and metadata are stored as JSONB in the existing `SolutionRevision` table. The table name is kept for compatibility; there is no version-history feature. Keep at most one working draft plus the last published document. Saving replaces the prior draft; publishing removes the superseded live document. The live document is retained even while hidden, so Show can restore it without publishing pending edits. Concurrent saves are protected by the current draft ID and a serializable transaction. No schema migration is required for this update.

Old history from the previous implementation is removed on the next save or publish for that solution; there is no archive. Product associations are no longer collected or synchronised. Product cards and links must be included in the uploaded HTML. Platform selection still controls platform-page placement.

## SEO/media

Menu title and SEO title are separate. Exact SEO title is preserved (no duplicate brand suffix). CMS metadata overrides the uploaded head. Use a 1200×630 public JPEG/PNG social-share image and descriptive alt text; choose a separate carousel cover. Uploads use the existing authenticated media endpoint. Custom menu SVGs must be drawing-only, without scripts, external references, embedded HTML or event handlers. Built-in menu icons are also available.

## Operator workflow

Upload → Save draft or Publish changes. Preview in a new tab is optional. Saving replaces the working draft and leaves the live page unchanged. Hide removes the published page from public routes and menus. Show restores the last published page; a solution which has never been published must be previewed and published in the editor first. List actions have separate edit, visibility and delete controls, with horizontal scrolling on narrow screens.

### Preview in a separate tab

Preview opens the last saved draft in a separate browser tab without modifying it. Save draft first to include pending edits. Allow pop-ups for the admin website if prompted. The preview fills that tab and does not publish the page. Publishing is available independently of preview, including when preview has not been opened or reports an error. Uploaded scripts remain inside a sandboxed frame on the authenticated preview page.
