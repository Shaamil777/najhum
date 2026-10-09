# Requirements Document

## Introduction

The Dynamic Solutions Page Admin System enables content management for solution pages through an administrative console. The system provides a database-backed content management interface with draft/publish workflows, section management, image uploads, and authentication-protected admin access. Content is stored in PostgreSQL via Prisma ORM and rendered dynamically on public solution pages.

## Glossary

- **Admin_Console**: The web-based administrative interface accessible at /admin route for managing solution page content
- **Content_Manager**: The backend service responsible for persisting, retrieving, and managing solution page content
- **Auth_Service**: The authentication service that validates admin credentials using JWT tokens
- **Section**: A discrete content block on a solution page (hero, intro, features, benefits, testimonials, CTA, or custom)
- **Solution_Page**: A dynamically rendered public page displaying solution content at routes like /solutions/[slug]
- **Draft_State**: Content state where changes are saved but not visible on public pages
- **Published_State**: Content state where changes are live and visible on public pages
- **Image_Service**: The service handling image uploads to cloud storage (AWS S3 or Vercel Blob)
- **Admin_User**: The authenticated user with credentials stored in environment variables
- **Section_Order**: The numerical position determining section display sequence on solution pages
- **Prisma_Client**: The Prisma ORM client for database operations
- **Database**: The PostgreSQL database storing all solution page content and metadata

## Requirements

### Requirement 1: Authentication and Authorization

**User Story:** As an admin user, I want to securely access the admin console using credentials, so that unauthorized users cannot modify solution page content.

#### Acceptance Criteria

1.1 WHEN an unauthenticated user navigates to /admin, THE Admin_Console SHALL redirect to /admin/login

1.2 WHEN a user submits login credentials at /admin/login, THE Auth_Service SHALL validate credentials against environment variable values

1.3 IF credentials match environment variable values, THEN THE Auth_Service SHALL generate a JWT token with 24-hour expiration

1.4 IF credentials do not match environment variable values, THEN THE Auth_Service SHALL return an error message and deny access

1.5 WHEN a valid JWT token is present, THE Admin_Console SHALL grant access to all admin routes

1.6 WHEN a JWT token expires, THE Admin_Console SHALL redirect to /admin/login and clear the expired token

1.7 THE Auth_Service SHALL read admin username from ADMIN_USERNAME environment variable

1.8 THE Auth_Service SHALL read admin password from ADMIN_PASSWORD environment variable

1.9 THE Auth_Service SHALL sign JWT tokens with secret key from JWT_SECRET environment variable

### Requirement 2: Database Schema and Data Persistence

**User Story:** As a system, I want to store solution page content in a PostgreSQL database using Prisma ORM, so that content persists across sessions and can be queried efficiently.

#### Acceptance Criteria

2.1 THE Database SHALL store solution page records with fields: id, slug, title, metaDescription, isDraft, createdAt, updatedAt

2.2 THE Database SHALL store section records with fields: id, solutionId, type, order, isDraft, content (JSON), createdAt, updatedAt

2.3 THE Database SHALL store image records with fields: id, solutionId, url, altText, storageKey, createdAt

2.4 WHEN a solution page is created, THE Content_Manager SHALL generate a unique slug from the title

2.5 THE Database SHALL enforce unique constraint on solution slug field

2.6 THE Database SHALL establish foreign key relationship from sections to solutions via solutionId

2.7 THE Database SHALL establish foreign key relationship from images to solutions via solutionId

2.8 WHEN a solution page is deleted, THE Database SHALL cascade delete all associated sections and images

2.9 THE Prisma_Client SHALL use connection string from DATABASE_URL environment variable

### Requirement 3: Solution Page CRUD Operations

**User Story:** As an admin user, I want to create, read, update, and delete solution pages, so that I can manage the full lifecycle of solution content.

#### Acceptance Criteria

3.1 WHEN an admin user navigates to /admin/solutions, THE Admin_Console SHALL display a list of all solution pages with title, slug, and status (draft/published)

3.2 WHEN an admin user clicks "Create New Solution", THE Admin_Console SHALL display a form with fields: title, slug, metaDescription

3.3 WHEN an admin user submits a new solution form, THE Content_Manager SHALL create a database record with isDraft set to true

3.4 WHEN an admin user clicks on a solution in the list, THE Admin_Console SHALL navigate to /admin/solutions/[id]/edit

3.5 WHEN an admin user updates solution metadata, THE Content_Manager SHALL persist changes to the database

3.6 WHEN an admin user clicks "Delete Solution", THE Admin_Console SHALL prompt for confirmation

3.7 IF admin user confirms deletion, THEN THE Content_Manager SHALL delete the solution and all associated sections and images from the database

3.8 THE Content_Manager SHALL return validation errors if required fields (title, slug) are empty

3.9 THE Content_Manager SHALL return validation errors if slug contains invalid characters (only alphanumeric and hyphens allowed)

### Requirement 4: Section Management

**User Story:** As an admin user, I want to add, edit, remove, enable/disable, and reorder sections within a solution page, so that I can control the content structure and presentation.

#### Acceptance Criteria

4.1 WHEN an admin user is editing a solution page, THE Admin_Console SHALL display all sections ordered by the order field

4.2 WHEN an admin user clicks "Add Section", THE Admin_Console SHALL display a dropdown with section types: hero, intro, features, benefits, testimonials, CTA, custom

4.3 WHEN an admin user selects a section type, THE Admin_Console SHALL display a type-specific form with appropriate fields

4.4 WHEN an admin user saves a new section, THE Content_Manager SHALL create a section record with order value one greater than the highest existing order

4.5 WHEN an admin user clicks "Edit Section", THE Admin_Console SHALL display a populated form with current section content

4.6 WHEN an admin user updates section content, THE Content_Manager SHALL persist changes to the content JSON field

4.7 WHEN an admin user clicks "Delete Section", THE Admin_Console SHALL remove the section and reorder remaining sections

4.8 WHEN an admin user drags a section to a new position, THE Content_Manager SHALL update order values for all affected sections

4.9 WHEN an admin user toggles section enabled/disabled, THE Content_Manager SHALL update the isDraft field (disabled sections have isDraft true)

4.10 THE Admin_Console SHALL display visual indicators for disabled sections (grayed out or labeled)

### Requirement 5: Section Content Fields

**User Story:** As an admin user, I want to input content specific to each section type, so that I can provide appropriate information for different content structures.

#### Acceptance Criteria

5.1 WHERE section type is hero, THE Admin_Console SHALL provide fields: heading, subheading, backgroundImage, ctaText, ctaLink

5.2 WHERE section type is intro, THE Admin_Console SHALL provide fields: heading, bodyText, image

5.3 WHERE section type is features, THE Admin_Console SHALL provide repeatable fields for each feature: title, description, icon

5.4 WHERE section type is benefits, THE Admin_Console SHALL provide repeatable fields for each benefit: title, description, image

5.5 WHERE section type is testimonials, THE Admin_Console SHALL provide repeatable fields for each testimonial: quote, author, role, company, avatar

5.6 WHERE section type is CTA, THE Admin_Console SHALL provide fields: heading, bodyText, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink

5.7 WHERE section type is custom, THE Admin_Console SHALL provide fields: heading, bodyHtml (rich text)

5.8 THE Content_Manager SHALL store all section content as JSON in the content field

5.9 THE Content_Manager SHALL validate required fields based on section type before saving

### Requirement 6: Image Upload and Management

**User Story:** As an admin user, I want to upload images with preview functionality, so that I can include visual content in solution pages.

#### Acceptance Criteria

6.1 WHEN an admin user clicks an image upload field, THE Admin_Console SHALL open a file picker accepting image formats: jpg, jpeg, png, webp, gif

6.2 WHEN an admin user selects an image file, THE Admin_Console SHALL display a preview of the selected image

6.3 WHEN an admin user confirms image upload, THE Image_Service SHALL upload the file to cloud storage

6.4 WHEN upload completes, THE Image_Service SHALL return the public URL and storage key

6.5 THE Content_Manager SHALL create an image record with url, altText, and storageKey

6.6 THE Admin_Console SHALL populate image fields with the returned URL

6.7 WHEN an image upload fails, THE Admin_Console SHALL display an error message and allow retry

6.8 THE Image_Service SHALL use AWS S3 if AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables are present

6.9 THE Image_Service SHALL use Vercel Blob if BLOB_READ_WRITE_TOKEN environment variable is present

6.10 THE Admin_Console SHALL display alt text input field below each image upload field

6.11 WHEN an admin user replaces an image, THE Image_Service SHALL delete the previous image from cloud storage using the storageKey

### Requirement 7: Draft and Publish Workflow

**User Story:** As an admin user, I want to save changes as drafts and publish them when ready, so that I can prepare content without immediately affecting the public site.

#### Acceptance Criteria

7.1 WHEN an admin user creates a new solution, THE Content_Manager SHALL set isDraft to true on the solution record

7.2 WHEN an admin user clicks "Save Draft", THE Content_Manager SHALL persist all changes with isDraft true

7.3 WHEN an admin user clicks "Publish", THE Content_Manager SHALL set isDraft to false on the solution and all enabled sections

7.4 WHEN querying for public display, THE Solution_Page SHALL retrieve only solutions where isDraft is false

7.5 WHEN rendering sections on public pages, THE Solution_Page SHALL display only sections where isDraft is false

7.6 THE Admin_Console SHALL display draft status badge on solution list and edit pages

7.7 WHEN an admin user edits a published solution, THE Content_Manager SHALL maintain isDraft false until explicitly saved as draft

7.8 THE Admin_Console SHALL provide "Unpublish" action to revert published content to draft state

### Requirement 8: Public Solution Page Rendering

**User Story:** As a site visitor, I want to view solution pages with dynamically rendered content, so that I can learn about solutions without seeing unpublished changes.

#### Acceptance Criteria

8.1 WHEN a visitor navigates to /solutions/[slug], THE Solution_Page SHALL query the database for a solution with matching slug and isDraft false

8.2 IF no published solution matches the slug, THEN THE Solution_Page SHALL return 404 status

8.3 WHEN rendering a solution page, THE Solution_Page SHALL retrieve all sections where solutionId matches and isDraft is false

8.4 THE Solution_Page SHALL order sections by the order field in ascending order

8.5 THE Solution_Page SHALL render each section using the appropriate component based on section type

8.6 THE Solution_Page SHALL pass section content JSON to the rendering component as props

8.7 THE Solution_Page SHALL set page title and meta description from solution metadata

8.8 THE Solution_Page SHALL use Next.js generateStaticParams to generate static pages for published solutions at build time

8.9 WHEN solution content changes, THE Solution_Page SHALL revalidate after deployment using on-demand revalidation or time-based revalidation

### Requirement 9: Admin Console User Interface

**User Story:** As an admin user, I want an intuitive interface consistent with the existing design system, so that content management is efficient and familiar.

#### Acceptance Criteria

9.1 THE Admin_Console SHALL use Tailwind CSS 4 classes matching the existing application styling

9.2 THE Admin_Console SHALL display a navigation sidebar with links: Dashboard, Solutions, Logout

9.3 WHEN an admin user clicks "Logout", THE Admin_Service SHALL clear the JWT token and redirect to /admin/login

9.4 THE Admin_Console SHALL display a header with the current page title and admin user indicator

9.5 THE Admin_Console SHALL use existing component patterns for forms, buttons, and inputs where available

9.6 THE Admin_Console SHALL display loading states during asynchronous operations (save, publish, upload)

9.7 THE Admin_Console SHALL display success notifications after successful operations

9.8 THE Admin_Console SHALL display error notifications with descriptive messages after failed operations

9.9 THE Admin_Console SHALL be responsive and functional on desktop screen sizes (minimum 1024px width)

### Requirement 10: API Routes and Data Transfer

**User Story:** As the system, I want secure API routes for admin operations, so that the client and server can communicate efficiently and safely.

#### Acceptance Criteria

10.1 THE Admin_Console SHALL communicate with backend via Next.js API routes under /api/admin/*

10.2 WHEN an API route is called, THE Auth_Service SHALL validate the JWT token from the Authorization header

10.3 IF JWT token is missing or invalid, THEN THE API SHALL return 401 status

10.4 THE API SHALL provide route POST /api/admin/auth/login accepting username and password

10.5 THE API SHALL provide route GET /api/admin/solutions returning all solutions for admin view

10.6 THE API SHALL provide route POST /api/admin/solutions creating a new solution

10.7 THE API SHALL provide route GET /api/admin/solutions/[id] returning solution details with sections

10.8 THE API SHALL provide route PUT /api/admin/solutions/[id] updating solution metadata

10.9 THE API SHALL provide route DELETE /api/admin/solutions/[id] deleting a solution

10.10 THE API SHALL provide route POST /api/admin/solutions/[id]/sections creating a new section

10.11 THE API SHALL provide route PUT /api/admin/solutions/[id]/sections/[sectionId] updating section content

10.12 THE API SHALL provide route DELETE /api/admin/solutions/[id]/sections/[sectionId] deleting a section

10.13 THE API SHALL provide route PUT /api/admin/solutions/[id]/sections/reorder updating section order

10.14 THE API SHALL provide route POST /api/admin/solutions/[id]/publish publishing a solution

10.15 THE API SHALL provide route POST /api/admin/upload handling image uploads

10.16 THE API SHALL return validation errors with 400 status and descriptive error messages

10.17 THE API SHALL return server errors with 500 status and sanitized error messages (no stack traces in production)

### Requirement 11: Migration from Static Content

**User Story:** As a developer, I want to migrate existing static content from src/content/*.ts to the database, so that current solutions remain available after system deployment.

#### Acceptance Criteria

11.1 THE Content_Manager SHALL provide a migration script that reads static content files from src/content/*.ts

11.2 WHEN the migration script runs, THE Content_Manager SHALL create solution records for each static content file

11.3 WHEN the migration script runs, THE Content_Manager SHALL create section records matching the structure of static content

11.4 THE migration script SHALL set isDraft to false for all migrated content

11.5 THE migration script SHALL log success or failure for each content file processed

11.6 THE migration script SHALL be idempotent (safe to run multiple times without duplicating data)

11.7 THE migration script SHALL be executable via npm script command

### Requirement 12: Error Handling and Validation

**User Story:** As an admin user, I want clear error messages and validation feedback, so that I can quickly correct mistakes and understand system issues.

#### Acceptance Criteria

12.1 WHEN an admin user submits a form with missing required fields, THE Admin_Console SHALL display field-level error messages

12.2 WHEN an admin user enters an invalid slug format, THE Admin_Console SHALL display error message "Slug must contain only lowercase letters, numbers, and hyphens"

12.3 WHEN an admin user attempts to create a solution with a duplicate slug, THE Content_Manager SHALL return error message "A solution with this slug already exists"

12.4 WHEN an image upload exceeds size limit (10MB), THE Image_Service SHALL return error message "Image size must be less than 10MB"

12.5 WHEN database connection fails, THE API SHALL return error message "Database connection error. Please try again later."

12.6 WHEN cloud storage upload fails, THE Image_Service SHALL return error message "Image upload failed. Please check your connection and try again."

12.7 THE Admin_Console SHALL display validation errors inline near the relevant form field

12.8 THE Admin_Console SHALL prevent form submission when validation errors exist

### Requirement 13: Performance and Optimization

**User Story:** As a site visitor, I want solution pages to load quickly, so that I can access information without delays.

#### Acceptance Criteria

13.1 THE Solution_Page SHALL use Next.js static generation for published solutions

13.2 THE Solution_Page SHALL implement on-demand revalidation when content is published

13.3 THE Solution_Page SHALL lazy-load images using Next.js Image component with appropriate sizes

13.4 THE Database SHALL create index on solution slug field for fast lookups

13.5 THE Database SHALL create index on section (solutionId, order) fields for efficient section queries

13.6 WHEN querying sections for a solution, THE Content_Manager SHALL fetch all sections in a single query

13.7 THE API SHALL implement connection pooling for database connections

13.8 THE Solution_Page SHALL have Largest Contentful Paint (LCP) under 2.5 seconds on 4G connections

### Requirement 14: Environment Configuration

**User Story:** As a developer, I want all sensitive configuration in environment variables, so that credentials and keys are not committed to version control.

#### Acceptance Criteria

14.1 THE System SHALL require DATABASE_URL environment variable for database connection

14.2 THE System SHALL require ADMIN_USERNAME environment variable for admin authentication

14.3 THE System SHALL require ADMIN_PASSWORD environment variable for admin authentication

14.4 THE System SHALL require JWT_SECRET environment variable for token signing

14.5 WHERE AWS S3 is used, THE System SHALL require AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and AWS_S3_BUCKET environment variables

14.6 WHERE Vercel Blob is used, THE System SHALL require BLOB_READ_WRITE_TOKEN environment variable

14.7 THE System SHALL provide .env.example file documenting all required environment variables

14.8 THE System SHALL validate required environment variables at application startup and exit with error if missing

### Requirement 15: Security Considerations

**User Story:** As a system administrator, I want security best practices implemented, so that the admin system is protected against common vulnerabilities.

#### Acceptance Criteria

15.1 THE Auth_Service SHALL hash passwords using bcrypt before comparison (even though stored in env, for future DB storage)

15.2 THE API SHALL implement rate limiting on /api/admin/auth/login to prevent brute force attacks (maximum 5 attempts per 15 minutes per IP)

15.3 THE API SHALL sanitize all user input to prevent SQL injection attacks

15.4 THE API SHALL validate and sanitize HTML content in custom sections to prevent XSS attacks

15.5 THE API SHALL set secure HTTP headers: X-Frame-Options, X-Content-Type-Options, Content-Security-Policy

15.6 THE API SHALL use HTTPS in production environments

15.7 THE Image_Service SHALL validate uploaded files are actual images (check file headers, not just extensions)

15.8 THE API SHALL implement CSRF protection for state-changing operations

15.9 THE System SHALL log all authentication attempts (success and failure) with timestamps and IP addresses

15.10 THE JWT tokens SHALL use HS256 algorithm with minimum 256-bit secret key
