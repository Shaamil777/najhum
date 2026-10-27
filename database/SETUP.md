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

## Solution classification

Run `database/solution-classification.sql` in the Supabase SQL Editor before deploying
this change, then run `npm run build` to regenerate Prisma and build the application.
The SQL adds `Solution.classification` with `INDUSTRY`, `USE_CASE`, and `BOTH` values.
Existing solutions default to `INDUSTRY`; the five previously hardcoded use-case
solutions become `BOTH` to preserve navigation. Rerunning does not reset admin choices.
Alternatively, installations already managed with Prisma migrations can run
`npx prisma migrate deploy` to apply the checked-in migration through migration history.
Use one migration method; if applying SQL manually in a Prisma-managed database,
mark `20261026000000_add_solution_classification` applied with `prisma migrate resolve`.

Choose classification on Admin → Solutions → New, or in the existing solution builder's
page settings. Builder classification edits stay in the saved draft until Publish.
Published solutions appear under the selected navigation tabs on desktop and mobile,
and the public solutions catalog has a classification filter.

## Journal / blog setup

Run `database/blog.sql` in the Supabase SQL Editor before deploying the blog code.
The same SQL is checked into `prisma/migrations/20261027000000_add_blog/migration.sql`.
The script is rerunnable and inserts no articles. It creates BlogPost and BlogSettings,
with RLS enabled and no client policies. Continue using the existing server-side
Prisma PostgreSQL connection with the owner/service database role; do not expose it
to the browser. The existing image upload integration stores cover images in R2.

Run `npm run build`, then open Admin → Journal / Blogs. Create your first article,
save a draft, preview, and publish. Page design & SEO edits the /blogs introduction
and listing metadata. Article SEO fields include title, description, topic keywords,
social image, and noindex. Canonical URLs, BlogPosting structured data, and sitemap
entries are automatic. Drafts cannot be opened through public article URLs.

Published article edits go live using Update published article. Move to draft
unpublishes the article immediately. There is no separate draft revision of a live
article. Preview shows saved content only. Changing a slug changes the public URL;
retain published slugs if you need existing inbound links to continue working.
There is no newsletter form or sample post content.

If managing migration history with Prisma, use `prisma migrate deploy` through your
normal workflow instead of running the SQL separately. After manual SQL in a
Prisma-managed database, mark `20261027000000_add_blog` applied with
`prisma migrate resolve --applied 20261027000000_add_blog` before subsequent migrations.
