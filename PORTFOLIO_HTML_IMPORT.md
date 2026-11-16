# Portfolio HTML/ZIP publishing

## Supabase setup and permanent cutover

Run these files in order in the Supabase SQL Editor:

1. `database/portfolio-html-import.sql`: adds the HTML content marker, published-document pointer and private document table. Requires the existing PortfolioProject table from the portfolio setup.
2. `database/portfolio-html-reset.sql`: permanently deletes legacy projects that were published, including currently hidden projects with a previous publication date. No backup or archive is created. Never-published drafts, settings, solutions and products remain. New HTML imports are excluded on reruns.

The SQL has been prepared, not executed against Supabase. Run it before using the updated portfolio editor. Then restart/redeploy the app. Prisma Client has been regenerated locally for the new model; the normal deployment build also generates it.

Deleting database entries does not delete old R2/Blob images. SQL cannot safely decide which media files are shared elsewhere. The old pages disappear from the website once deleted; uploaded files may still exist at their own media URLs.

## Admin workflow

Go to `/admin/portfolio/new`. The same editor as solutions provides:

1. Project details: title, slug, card summary, client, industry, location and year.
2. Page and images: responsive HTML or ZIP upload, accompanying assets, individual image replacement and cover-image cropping.
3. SEO and links: separate SEO title, description, social image/alt text and platform tags.
4. Preview and publish: optional external-tab preview of the saved draft, Save draft, or direct Publish changes. Direct publication saves pending changes first; a failed save stops publication.

Uploads use the solution importer’s existing limits and supported formats. CSS and classic JavaScript animations are preserved. Use the project fonts and a single responsive HTML document. The website navbar/footer are supplied by the website; do not duplicate them in the upload.

One working draft and the current published document are retained. Saving replaces the prior draft; publishing removes the superseded live document. There is no selectable version history. Owned uploads that no retained project, solution or catalogue reference uses are cleaned up after replacement. Cleanup failures are logged without failing a completed save.

Hide/Show retains and restores the last published document without publishing pending edits. A never-published draft must first be published in the editor. Delete permanently removes the project and its database documents.

## Public pages

`/portfolio` keeps the existing card listing and filters, populated from published metadata. `/portfolio/[slug]` renders the uploaded HTML design, with CMS SEO and social metadata. Legacy structured-builder writes are retired; old builder components remain in source but are not used for creation, editing or public project rendering.

HTML import is restricted to trusted administrators. Preview runs in an authenticated external tab containing an opaque-origin sandbox. Published JavaScript has the same browser privileges as other website code, and is never executed on the server.
