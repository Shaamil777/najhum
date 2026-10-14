# Manual database setup for the expanded solution builder

No SQL has been run against your Supabase database by Codex.

## What changes are needed?

The application adds six section types: product cards, image cards, video cards,
comparison tables, graphs, and information/redirect buttons. PostgreSQL must
recognize their six `SectionType` enum labels before these sections can be published.

The existing `Section.content` JSON column stores their content. Drafts still use
`PageContent`. No new tables or columns are required. Product cards select existing
published products and link to `/products/<product ID>`; the project does not have
a product slug column.

## Steps for you

1. Back up your database and test on a staging Supabase project first.
2. Open that project's **SQL Editor**, create a new query, and paste the contents
   of `solution-builder-sections.sql` from this folder.
3. Run the script. It adds only enum labels and can be run again safely. Let the
   transaction commit before publishing pages with the new types.
4. Check the verification result contains `PRODUCT_CARDS`, `IMAGE_CARDS`,
   `VIDEO_CARDS`, `COMPARISON_TABLE`, `GRAPH`, and `INFO_BUTTONS`.
5. Repeat on your production project when ready. Deploy this duplicated project's
   code using your normal environment configuration and `npm run build`.
   The build regenerates the Prisma client; it does not alter the database.
6. Sign in to Admin → Solutions → Edit. Preview a section, add it, customize it,
   save a draft, and publish. Confirm the public page on mobile and desktop.

**Do not run `prisma db push`, `prisma migrate reset`, or an unrelated schema
migration just to enable these sections.** The supplied SQL is the targeted change.

## Product and media setup

Create/publish products in the existing Products admin page before selecting them
in a Product cards section. Samples appear in previews when no products exist;
you must choose at least one real published product before publishing that section.
Unpublished/deleted selected products cause an actionable publish error. On an
already-published page, unavailable products are omitted.

Image cards accept uploads or local/HTTPS URLs. Video cards accept the site's
existing MP4/WebM files, direct HTTPS video URLs, YouTube URLs, and Vimeo URLs.
Video file upload is not included; host the file and paste its URL. Embedded platforms may have their own privacy or
embedding restrictions. Replace the illustrative graph values and sample copy
before publishing.

## If you need to roll back

Keep the added enum labels; removing PostgreSQL enum labels requires rebuilding
the type and is unnecessary. Hide/remove the new sections and publish the change
before restoring older application code, so older renderers do not encounter
unsupported section types. Existing content is not modified by this SQL script.
