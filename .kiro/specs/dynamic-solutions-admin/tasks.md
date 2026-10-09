# Implementation Plan: Dynamic Solutions Page with Admin Console

## Overview

This implementation plan builds a comprehensive database-backed content management system for solution pages. The system replaces static TypeScript content files with a PostgreSQL database, provides an authenticated admin console for content management, implements draft/publish workflows, enables section reordering with drag-and-drop, supports cloud-based image uploads, and renders dynamic public pages with static generation.

**Technology Stack**: Next.js 15 App Router, React 19, TypeScript 5, Prisma ORM, PostgreSQL, JWT authentication, AWS S3/Vercel Blob storage, Tailwind CSS 4.

**Implementation Approach**: Eight phases covering database setup, authentication, solution CRUD, section management with forms, image uploads, publish workflow, public rendering with SSG/ISR, and migration from static content.

## Tasks

- [x] 1. Phase 1: Database Foundation and Environment Setup
  - [x] 1.1 Install Prisma and initialize database schema
    - Install Prisma dependencies: `npm install @prisma/client` and `npm install -D prisma`
    - Initialize Prisma: `npx prisma init`
    - Create `prisma/schema.prisma` with PostgreSQL datasource and Prisma client generator
    - Define Solution model with fields: id (String, cuid), slug (String, unique), title (String), metaDescription (String?), isDraft (Boolean, default true), createdAt (DateTime), updatedAt (DateTime)
    - Define Section model with fields: id (String, cuid), solutionId (String), type (SectionType enum), order (Int), isDraft (Boolean, default false), content (Json), createdAt (DateTime), updatedAt (DateTime)
    - Define Image model with fields: id (String, cuid), solutionId (String), url (String), altText (String?), storageKey (String), createdAt (DateTime)
    - Define SectionType enum with values: HERO, INTRO, FEATURES, BENEFITS, TESTIMONIALS, CTA, CUSTOM
    - Add foreign key relations: Section→Solution, Image→Solution with onDelete: Cascade
    - Add indexes: Solution(slug), Solution(isDraft), Section(solutionId, order), Section(solutionId, isDraft), Image(solutionId)
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 2.6, 2.7, 2.8, 13.4, 13.5_
  
  - [x] 1.2 Configure environment variables and validation
    - Create `.env.example` file with all required environment variables documented
    - Add DATABASE_URL (PostgreSQL connection string)
    - Add ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET (minimum 32 characters)
    - Add AWS S3 variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET) or Vercel Blob (BLOB_READ_WRITE_TOKEN)
    - Add NEXT_PUBLIC_APP_URL for application base URL
    - Create `src/lib/env.ts` with Zod schema for environment validation
    - Implement `validateEnv()` function that validates all required variables at startup
    - Validate that at least one image storage provider (S3 or Vercel Blob) is configured
    - Call validation on application startup
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7, 14.8_
  
  - [x] 1.3 Create Prisma client singleton and run initial migration
    - Create `src/lib/db/prisma.ts` with Prisma client singleton pattern
    - Implement global caching for development hot-reload (prevent multiple instances)
    - Configure logging: query/error/warn in development, error only in production
    - Enable connection pooling configuration
    - Run `npx prisma migrate dev --name init` to create initial migration
    - Generate Prisma client: `npx prisma generate`
    - _Requirements: 2.9, 13.7_
  
  - [ ]* 1.4 Write unit tests for environment validation
    - Test validation passes with all required variables present
    - Test validation fails with missing DATABASE_URL
    - Test validation fails with missing auth credentials
    - Test validation fails when no storage provider configured
    - _Requirements: 14.8_

- [x] 2. Phase 2: Authentication System
  - [x] 2.1 Implement JWT token generation and verification
    - Install JWT library: `npm install jose`
    - Create `src/lib/auth/jwt.ts` with token functions
    - Implement `generateToken(payload)` function using HS256 algorithm
    - Set token expiration to 24 hours (86400 seconds)
    - Include payload fields: sub (admin identifier), iat, exp, type='admin'
    - Implement `verifyToken(token)` function that validates signature and expiration
    - Return decoded payload on success, throw error on failure
    - Use JWT_SECRET from environment variables (minimum 256-bit key)
    - _Requirements: 1.3, 1.9, 15.10_
  
  - [x] 2.2 Implement rate limiting service for login
    - Create `src/lib/auth/rate-limit.ts` with in-memory LRU cache implementation
    - Define RateLimitConfig interface with maxAttempts and windowMs
    - Implement `checkRateLimit(identifier, config)` function
    - Configure login rate limit: 5 attempts per 15 minutes per IP address
    - Track attempts with Map<string, { count: number; resetAt: number }>
    - Reset counter when window expires
    - Return true if within limit, false if exceeded
    - _Requirements: 15.2_
  
  - [x] 2.3 Create authentication API route for login
    - Install Zod for validation: `npm install zod`
    - Create `src/lib/validation/auth-schemas.ts` with login schema
    - Define loginSchema with username (string, required) and password (string, required) fields
    - Create `src/app/api/admin/auth/login/route.ts` with POST handler
    - Extract IP address from request headers (x-forwarded-for or connection.remoteAddress)
    - Apply rate limiting using IP address
    - Return 429 error if rate limit exceeded: "Too many login attempts. Try again in 15 minutes."
    - Validate credentials against ADMIN_USERNAME and ADMIN_PASSWORD environment variables
    - Generate JWT token on successful authentication
    - Return token with expiresAt timestamp (ISO 8601 format)
    - Return 401 error for invalid credentials: "Invalid credentials"
    - Log all authentication attempts with timestamp, IP, username, and result
    - _Requirements: 1.2, 1.3, 1.4, 1.7, 1.8, 10.4, 15.2, 15.9_
  
  - [x] 2.4 Create Next.js middleware for route protection
    - Create `src/middleware.ts` for authentication and security
    - Protect all `/admin/*` routes except `/admin/login`
    - Extract JWT token from cookie named `admin_token`
    - Verify token using `verifyToken()` function
    - Redirect to `/admin/login` if token is missing, invalid, or expired
    - Allow request to proceed if token is valid
    - Set security headers on all responses: X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin
    - Set Content-Security-Policy header with appropriate directives
    - Configure matcher to apply to `/admin/:path*` routes
    - _Requirements: 1.1, 1.5, 1.6, 15.5, 15.6_
  
  - [x] 2.5 Build login page and form component
    - Install React Hook Form: `npm install react-hook-form @hookform/resolvers`
    - Create `src/app/admin/login/page.tsx` as the login page route
    - Create `src/components/admin/auth/LoginForm.tsx` component
    - Use React Hook Form with Zod resolver for form validation
    - Implement form fields: username (text input), password (password input)
    - Add client-side validation: required fields
    - Handle form submission: POST to `/api/admin/auth/login`
    - Store returned JWT token in cookie (`admin_token`) with httpOnly and secure flags
    - Redirect to `/admin/dashboard` on successful login
    - Display inline error messages for validation failures
    - Display error notifications for invalid credentials (401) and rate limiting (429)
    - Apply Tailwind CSS 4 styling consistent with existing design system
    - Show loading spinner during authentication request
    - _Requirements: 1.2, 1.4, 9.1, 9.6, 12.1_
  
  - [x] 2.6 Create logout functionality
    - Create `src/components/admin/auth/LogoutButton.tsx` component
    - Implement click handler that clears `admin_token` cookie
    - Redirect to `/admin/login` after logout
    - Display in admin sidebar navigation
    - _Requirements: 9.3_
  
  - [ ]* 2.7 Write unit tests for JWT authentication
    - Test token generation creates valid JWT with correct expiration
    - Test token verification succeeds with valid token
    - Test token verification fails with expired token
    - Test token verification fails with invalid signature
    - Test rate limiting blocks after 5 failed attempts
    - Test rate limit resets after window expires
    - _Requirements: 1.3, 15.2_

- [~] 3. Phase 3: Solution CRUD Operations
  - [x] 3.1 Create validation schemas for solutions
    - Create `src/lib/validation/solution-schemas.ts`
    - Define `createSolutionSchema` with Zod: title (string, min 1, max 200), slug (string, min 1, max 100, regex ^[a-z0-9-]+$), metaDescription (string, max 300, optional)
    - Define `updateSolutionSchema` as partial of createSolutionSchema
    - Export TypeScript types using z.infer
    - Create custom error messages: "Title is required", "Slug must contain only lowercase letters, numbers, and hyphens"
    - _Requirements: 3.8, 3.9, 12.2_
  
  - [x] 3.2 Create slug generation utility
    - Create `src/lib/utils/slug.ts`
    - Implement `generateSlug(title: string): string` function
    - Convert title to lowercase
    - Replace spaces and special characters with hyphens
    - Remove consecutive hyphens
    - Trim leading/trailing hyphens
    - Ensure output matches regex: ^[a-z0-9-]+$
    - Implement `validateSlug(slug: string): boolean` for validation
    - _Requirements: 2.4, 3.9_
  
  - [x] 3.3 Create database query functions for solutions
    - Create `src/lib/db/queries/solutions.ts`
    - Import Prisma client from singleton
    - Implement `getAllSolutions()`: returns all solutions ordered by updatedAt desc
    - Implement `getSolutionById(id: string, includeSections?: boolean)`: returns solution with optional sections include
    - Implement `getSolutionBySlug(slug: string, publishedOnly?: boolean)`: returns solution by slug with isDraft filter
    - Implement `createSolution(data: { title, slug, metaDescription? })`: creates solution with isDraft=true
    - Implement `updateSolution(id: string, data: Partial<Solution>)`: updates solution metadata
    - Implement `deleteSolution(id: string)`: deletes solution (cascades to sections and images)
    - Implement `publishSolution(id: string)`: sets isDraft=false on solution and all enabled sections (where section.isDraft=false)
    - Implement `unpublishSolution(id: string)`: sets isDraft=true on solution
    - Add proper error handling and return types
    - _Requirements: 2.1, 3.3, 3.5, 3.7, 7.2, 7.3, 7.8, 13.6_
  
  - [x] 3.4 Create solution list API route
    - Create `src/app/api/admin/solutions/route.ts`
    - Implement GET handler for listing all solutions
    - Extract JWT token from Authorization header or cookies
    - Verify token using `verifyToken()`, return 401 if invalid
    - Call `getAllSolutions()` query function
    - Return JSON array of solutions with fields: id, title, slug, isDraft, createdAt, updatedAt
    - Wrap in try-catch with error handling
    - _Requirements: 3.1, 10.2, 10.3, 10.5_
  
  - [x] 3.5 Create solution creation API route
    - Add POST handler to `src/app/api/admin/solutions/route.ts`
    - Verify JWT token, return 401 if unauthorized
    - Parse and validate request body with `createSolutionSchema`
    - Return 400 with validation details if schema validation fails
    - Generate slug from title using `generateSlug()` if slug not provided
    - Call `createSolution()` query function
    - Handle Prisma unique constraint violation (P2002 error code) for duplicate slug
    - Return 409 error: "A solution with this slug already exists"
    - Return created solution with 201 status on success
    - _Requirements: 2.4, 2.5, 3.3, 10.6, 12.3_
  
  - [~] 3.6 Create solution detail API routes
    - Create `src/app/api/admin/solutions/[id]/route.ts`
    - Implement GET handler: verify JWT, call `getSolutionById(id, true)` with sections, return 404 if not found, return solution with sections
    - Implement PUT handler: verify JWT, validate body with `updateSolutionSchema`, call `updateSolution(id, data)`, handle duplicate slug (409 error), return updated solution
    - Implement DELETE handler: verify JWT, call `deleteSolution(id)`, return 204 on success
    - Use Next.js 15 async params: `{ params }: { params: Promise<{ id: string }> }`
    - _Requirements: 3.5, 3.6, 3.7, 10.7, 10.8, 10.9_
  
  - [~] 3.7 Create API error handling utilities
    - Create `src/lib/utils/api-error.ts`
    - Define `ApiError` class extending Error with statusCode, message, details properties
    - Implement `handleApiError(error: unknown): Response` function
    - Handle ApiError instances: return JSON with error and details, use statusCode
    - Handle Zod validation errors: return 400 with formatted error details
    - Handle Prisma errors: P2002 (unique constraint), P2025 (record not found)
    - Handle generic errors: log to console, return 500 with sanitized message (no stack traces in production)
    - _Requirements: 10.16, 10.17, 12.5_
  
  - [~] 3.8 Build admin solutions list page
    - Create `src/app/admin/solutions/page.tsx` as admin route
    - Create `src/components/admin/solutions/SolutionsList.tsx` component
    - Fetch solutions from GET `/api/admin/solutions` on component mount
    - Display solutions in table or grid layout
    - Show columns: title, slug, status badge (Draft in gray, Published in green)
    - Add "Create New Solution" button linking to `/admin/solutions/new`
    - Add click handler on each solution row to navigate to `/admin/solutions/[id]/edit`
    - Show loading skeleton while fetching data
    - Handle empty state: "No solutions yet. Create your first solution."
    - Apply Tailwind CSS styling
    - _Requirements: 3.1, 3.2, 9.6_
  
  - [~] 3.9 Build solution creation page
    - Create `src/app/admin/solutions/new/page.tsx`
    - Create `src/components/admin/solutions/SolutionMetadataForm.tsx` reusable form component
    - Use React Hook Form with `createSolutionSchema` Zod resolver
    - Implement form fields: title (text input), slug (text input, auto-generated but editable), metaDescription (textarea)
    - Add "Generate Slug" button that calls `generateSlug(title)` and populates slug field
    - Auto-generate slug from title on title field blur event
    - Display validation errors inline below each field
    - Implement form submission: POST to `/api/admin/solutions`
    - Handle 409 error (duplicate slug): show error on slug field
    - Show success toast notification on success
    - Navigate to `/admin/solutions/[id]/edit` on successful creation
    - Show loading spinner on submit button during request
    - _Requirements: 3.2, 3.8, 3.9, 9.7, 12.1, 12.2, 12.3_
  
  - [~] 3.10 Build solution edit page layout
    - Create `src/app/admin/solutions/[id]/edit/page.tsx`
    - Fetch solution data with sections: GET `/api/admin/solutions/[id]`
    - Display page header with solution title and draft/published badge
    - Render `SolutionMetadataForm` component with existing data as defaultValues
    - Add placeholder for section manager (to be implemented in Phase 4)
    - Add placeholder for publish controls (to be implemented in Phase 6)
    - Handle 404 error: redirect to solutions list with error message
    - Show loading state while fetching solution data
    - _Requirements: 3.4, 3.5, 7.6, 9.4_
  
  - [ ]* 3.11 Write unit tests for solution validation
    - Test slug validation accepts valid slugs (lowercase, numbers, hyphens)
    - Test slug validation rejects invalid characters (uppercase, spaces, special chars)
    - Test required field validation for title and slug
    - Test field length constraints (title max 200, slug max 100, metaDescription max 300)
    - Test slug generation from various title inputs
    - _Requirements: 3.8, 3.9_
  
  - [ ]* 3.12 Write integration tests for solution CRUD APIs
    - Test solution creation with valid data returns 201 and created solution
    - Test duplicate slug returns 409 error
    - Test solution retrieval by ID returns solution with sections
    - Test solution update persists changes
    - Test solution deletion cascades to sections and images
    - Test unauthorized requests return 401
    - _Requirements: 2.5, 3.3, 3.5, 3.7_

- [~] 4. Checkpoint - Verify authentication and solution CRUD
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Phase 4: Section Management
  - [~] 5.1 Create TypeScript types for section content
    - Create `src/types/section.ts`
    - Define `HeroContent` interface with fields: heading, subheading, backgroundImage, ctaText, ctaLink
    - Define `IntroContent` interface with fields: heading, bodyText, image
    - Define `FeaturesContent` interface with features array, each feature has: title, description, icon
    - Define `BenefitsContent` interface with benefits array, each benefit has: title, description, image
    - Define `TestimonialsContent` interface with testimonials array, each testimonial has: quote, author, role, company, avatar
    - Define `CTAContent` interface with fields: heading, bodyText, primaryButtonText, primaryButtonLink, secondaryButtonText?, secondaryButtonLink?
    - Define `CustomContent` interface with fields: heading, bodyHtml
    - Define union type: `SectionContent = HeroContent | IntroContent | FeaturesContent | BenefitsContent | TestimonialsContent | CTAContent | CustomContent`
    - Export SectionType enum matching Prisma schema
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_
  
  - [~] 5.2 Create validation schemas for sections
    - Create `src/lib/validation/section-schemas.ts`
    - Define Zod schemas for each section content type with required field validation
    - Define `heroContentSchema` with required heading, subheading, ctaText, ctaLink; optional backgroundImage
    - Define `introContentSchema` with required heading, bodyText; optional image
    - Define `featuresContentSchema` with required features array (min 1 item), each feature has title and description (icon optional)
    - Define `benefitsContentSchema` with required benefits array (min 1 item), each benefit has title and description (image optional)
    - Define `testimonialsContentSchema` with required testimonials array (min 1 item), each testimonial has quote, author, role, company (avatar optional)
    - Define `ctaContentSchema` with required heading, bodyText, primaryButtonText, primaryButtonLink; optional secondaryButtonText, secondaryButtonLink
    - Define `customContentSchema` with required heading and bodyHtml
    - Define `createSectionSchema` with type (enum) and content (discriminated union based on type)
    - Define `updateSectionSchema` as partial for content updates
    - Define `reorderSectionsSchema` with sectionIds array of strings
    - _Requirements: 5.9, 10.10, 10.13_
  
  - [~] 5.3 Create database query functions for sections
    - Create `src/lib/db/queries/sections.ts`
    - Implement `getSectionsBySolutionId(solutionId: string, publishedOnly?: boolean)`: returns sections filtered by isDraft if publishedOnly, ordered by order asc
    - Implement `createSection(solutionId: string, type: SectionType, content: SectionContent)`: gets max order value, creates section with order = maxOrder + 1 (or 0 if no sections)
    - Implement `updateSection(id: string, content: SectionContent)`: updates section content field
    - Implement `deleteSection(id: string)`: deletes section and reorders remaining sections (decrement order values for sections with higher order)
    - Implement `reorderSections(solutionId: string, orderedSectionIds: string[])`: updates order field for each section based on array index
    - Implement `toggleSectionDraft(id: string, isDraft: boolean)`: updates section isDraft field
    - Use Prisma transactions where appropriate for atomic operations
    - _Requirements: 4.1, 4.4, 4.6, 4.7, 4.8, 4.9_
  
  - [~] 5.4 Create section creation API route
    - Create `src/app/api/admin/solutions/[id]/sections/route.ts`
    - Implement POST handler for creating new section
    - Verify JWT token, return 401 if unauthorized
    - Parse request body and validate with appropriate section content schema based on type
    - Return 400 with validation errors if invalid
    - Call `createSection(solutionId, type, content)` to add section with next order value
    - Return created section with 201 status
    - _Requirements: 4.3, 4.4, 10.10_
  
  - [~] 5.5 Create section update and delete API routes
    - Create `src/app/api/admin/solutions/[id]/sections/[sectionId]/route.ts`
    - Implement PUT handler: verify JWT, validate content with appropriate schema, call `updateSection(sectionId, content)`, return updated section
    - Implement DELETE handler: verify JWT, call `deleteSection(sectionId)` with automatic reordering, return 204 on success
    - Handle 404 if section not found
    - _Requirements: 4.6, 4.7, 10.11, 10.12_
  
  - [~] 5.6 Create section reorder API route
    - Create `src/app/api/admin/solutions/[id]/sections/reorder/route.ts`
    - Implement PUT handler for reordering sections
    - Verify JWT token
    - Validate request body: array of section IDs in desired order
    - Call `reorderSections(solutionId, sectionIds)` to update order values
    - Return updated count and success message
    - _Requirements: 4.8, 10.13_
  
  - [~] 5.7 Build section manager component with drag-and-drop
    - Install drag-and-drop library: `npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`
    - Create `src/components/admin/sections/SectionManager.tsx`
    - Fetch sections for current solution on mount
    - Display list of sections ordered by order field
    - Implement drag-and-drop reordering using @dnd-kit/sortable
    - Show visual feedback during drag (lifted appearance, drop indicator)
    - Call reorder API (PUT `/api/admin/solutions/[id]/sections/reorder`) on drag end
    - Update UI optimistically, rollback on error
    - Add "Add Section" dropdown button with section type options (HERO, INTRO, FEATURES, BENEFITS, TESTIMONIALS, CTA, CUSTOM)
    - Handle section type selection: create new section with POST API
    - _Requirements: 4.1, 4.2, 4.8_
  
  - [~] 5.8 Build section card component
    - Create `src/components/admin/sections/SectionCard.tsx`
    - Display section type badge (colored label: Hero, Intro, Features, etc.)
    - Show preview of section content (heading or first field)
    - Add drag handle icon for reordering (use @dnd-kit useSortable hook)
    - Add "Edit" button that toggles edit mode (shows/hides section form)
    - Add "Delete" button with confirmation dialog ("Are you sure you want to delete this section?")
    - Add toggle switch for enable/disable (updates isDraft field)
    - Show grayed-out appearance when section is disabled (isDraft=true)
    - Add "Disabled" or "Draft" label for disabled sections
    - _Requirements: 4.5, 4.6, 4.7, 4.9, 4.10_
  
  - [~] 5.9 Create hero section form component
    - Create `src/components/admin/sections/forms/HeroSectionForm.tsx`
    - Use React Hook Form with `heroContentSchema` validation
    - Implement form fields: heading (text input), subheading (text input), backgroundImage (text input - placeholder for image upload), ctaText (text input), ctaLink (text input)
    - Add form submit handler: PUT `/api/admin/solutions/[id]/sections/[sectionId]`
    - Display validation errors inline below each field
    - Show "Save" and "Cancel" buttons
    - Show loading spinner on Save button during request
    - Close edit mode and show success toast on save success
    - _Requirements: 5.1, 5.8_
  
  - [~] 5.10 Create intro section form component
    - Create `src/components/admin/sections/forms/IntroSectionForm.tsx`
    - Use React Hook Form with `introContentSchema` validation
    - Implement form fields: heading (text input), bodyText (textarea - placeholder for rich text editor), image (text input - placeholder for image upload)
    - Follow same save/cancel pattern as hero form
    - _Requirements: 5.2, 5.8_
  
  - [~] 5.11 Create features section form component with repeater
    - Create `src/components/admin/ui/RepeaterField.tsx` reusable component for array fields
    - Implement add/remove functionality for repeater items
    - Create `src/components/admin/sections/forms/FeaturesSectionForm.tsx`
    - Use React Hook Form with `featuresContentSchema` validation
    - Use `useFieldArray` hook for managing features array
    - Implement repeatable feature items with fields: title (text input), description (textarea), icon (text input)
    - Add "Add Feature" button that appends new item to array
    - Add "Remove" button on each feature item
    - Require at least 1 feature (validation)
    - _Requirements: 5.3, 5.8_
  
  - [~] 5.12 Create benefits section form component
    - Create `src/components/admin/sections/forms/BenefitsSectionForm.tsx`
    - Use React Hook Form with `benefitsContentSchema` validation
    - Use `RepeaterField` component for benefit items
    - Implement fields for each benefit: title (text input), description (textarea), image (text input - placeholder)
    - Require at least 1 benefit
    - _Requirements: 5.4, 5.8_
  
  - [~] 5.13 Create testimonials section form component
    - Create `src/components/admin/sections/forms/TestimonialsSectionForm.tsx`
    - Use React Hook Form with `testimonialsContentSchema` validation
    - Use `RepeaterField` for testimonial items
    - Implement fields for each testimonial: quote (textarea), author (text input), role (text input), company (text input), avatar (text input - placeholder)
    - Require at least 1 testimonial
    - _Requirements: 5.5, 5.8_
  
  - [~] 5.14 Create CTA section form component
    - Create `src/components/admin/sections/forms/CTASectionForm.tsx`
    - Use React Hook Form with `ctaContentSchema` validation
    - Implement fields: heading (text input), bodyText (textarea), primaryButtonText (text input), primaryButtonLink (text input), secondaryButtonText (text input, optional), secondaryButtonLink (text input, optional)
    - _Requirements: 5.6, 5.8_
  
  - [~] 5.15 Create custom section form component
    - Create `src/components/admin/sections/forms/CustomSectionForm.tsx`
    - Use React Hook Form with `customContentSchema` validation
    - Implement fields: heading (text input), bodyHtml (textarea - will be upgraded to rich text editor in Phase 7)
    - _Requirements: 5.7, 5.8_
  
  - [~] 5.16 Integrate section forms into section card
    - Update `SectionCard` component to render appropriate form based on section.type
    - Use switch statement to select form component: HeroSectionForm, IntroSectionForm, etc.
    - Pass section data as defaultValues to forms
    - Toggle between view mode and edit mode based on edit state
    - Handle form save success: update parent component state, show success toast
    - Handle form errors: show error toast
    - _Requirements: 4.5, 4.6, 9.7, 9.8_
  
  - [ ]* 5.17 Write unit tests for section validation
    - Test required field validation for each section type
    - Test array min length validation for features, benefits, testimonials
    - Test section content JSON serialization and deserialization
    - _Requirements: 5.9, 5.8_
  
  - [ ]* 5.18 Write integration tests for section APIs
    - Test section creation assigns correct order value
    - Test section deletion reorders remaining sections
    - Test reorder API updates all section order values correctly
    - Test section toggle updates isDraft field
    - _Requirements: 4.4, 4.7, 4.8, 4.9_

- [ ] 6. Phase 5: Image Upload and Storage
  - [~] 6.1 Implement AWS S3 image upload service
    - Install AWS SDK: `npm install @aws-sdk/client-s3`
    - Create `src/lib/storage/s3.ts`
    - Import S3Client, PutObjectCommand, DeleteObjectCommand from AWS SDK
    - Implement `uploadToS3(file: File, key: string)` function
    - Create S3Client with credentials from environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION)
    - Convert file to buffer using arrayBuffer()
    - Send PutObjectCommand with Bucket, Key, Body, ContentType
    - Generate public URL: `https://${bucket}.s3.${region}.amazonaws.com/${key}`
    - Return { url, storageKey: key }
    - Implement `deleteFromS3(key: string)` function using DeleteObjectCommand
    - _Requirements: 6.3, 6.8, 6.11_
  
  - [~] 6.2 Implement Vercel Blob image upload service
    - Install Vercel Blob SDK: `npm install @vercel/blob`
    - Create `src/lib/storage/vercel-blob.ts`
    - Import { put, del } from '@vercel/blob'
    - Implement `uploadToVercelBlob(file: File, path: string)` function
    - Call put(path, file, { access: 'public', token: BLOB_READ_WRITE_TOKEN })
    - Return { url: blob.url, storageKey: path }
    - Implement `deleteFromVercelBlob(url: string)` function using del(url, { token })
    - _Requirements: 6.3, 6.9, 6.11_
  
  - [~] 6.3 Create unified image service with validation
    - Create `src/lib/storage/image-service.ts`
    - Implement `uploadImage(file: File, solutionId: string)` function
    - Validate file type: check MIME type starts with 'image/' and file extension is jpg, jpeg, png, webp, or gif
    - Validate file size: maximum 10MB (10 * 1024 * 1024 bytes)
    - Return appropriate error messages: "Invalid file type. Only images are allowed." or "File size must be less than 10MB."
    - Validate file headers (magic numbers) for security: check first bytes match image format
    - Generate unique storage key: `${solutionId}/${crypto.randomUUID()}.${extension}`
    - Detect storage provider: if AWS_ACCESS_KEY_ID exists use S3, else if BLOB_READ_WRITE_TOKEN exists use Vercel Blob
    - Route to appropriate upload function
    - Implement `deleteImage(storageKey: string)` function with same routing logic
    - _Requirements: 6.1, 6.3, 6.4, 6.8, 6.9, 12.4, 15.7_
  
  - [~] 6.4 Create database query functions for images
    - Create `src/lib/db/queries/images.ts`
    - Implement `createImage(data: { solutionId, url, altText, storageKey })`: creates image record in database
    - Implement `deleteImage(id: string)`: deletes image record from database and calls `deleteImage(storageKey)` to remove from storage
    - Implement `getImagesBySolutionId(solutionId: string)`: returns all images for a solution
    - _Requirements: 6.4, 6.5, 6.11_
  
  - [~] 6.5 Create image upload API route
    - Create `src/app/api/admin/upload/route.ts`
    - Implement POST handler for image uploads
    - Verify JWT token, return 401 if unauthorized
    - Parse multipart form data: extract file, solutionId, altText
    - Validate file type and size using image service
    - Return 400 with appropriate error message if validation fails
    - Call `uploadImage(file, solutionId)` from image service
    - Create image record in database with `createImage()`
    - Return image data: { id, url, storageKey, altText } with 201 status
    - Handle upload errors: return 500 with message "Image upload failed. Please check your connection and try again."
    - _Requirements: 6.1, 6.3, 6.4, 6.5, 6.7, 10.15, 12.4, 12.6, 15.7_
  
  - [~] 6.6 Build image upload field component
    - Create `src/components/admin/ui/ImageUploadField.tsx`
    - Accept props: solutionId, value (current image URL), onChange (callback), altText, onAltTextChange
    - Implement file input with accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
    - Show file picker on button click or drag-and-drop area
    - Implement client-side file validation (type and size)
    - Show image preview after file selection using FileReader API
    - Display alt text input field below image preview
    - Show upload progress indicator during upload
    - Call POST `/api/admin/upload` with FormData (file, solutionId, altText)
    - Handle image replacement: if previous image exists, delete it first using DELETE with storageKey
    - Emit uploaded image URL to parent via onChange callback
    - Display upload errors with retry button
    - Show success state with green checkmark
    - _Requirements: 6.1, 6.2, 6.3, 6.6, 6.7, 6.10, 6.11_
  
  - [~] 6.7 Integrate image upload into section forms
    - Update `HeroSectionForm`: replace backgroundImage text input with ImageUploadField component
    - Update `IntroSectionForm`: replace image text input with ImageUploadField component
    - Update `BenefitsSectionForm`: add ImageUploadField to each benefit item in repeater (replace text input)
    - Update `TestimonialsSectionForm`: add ImageUploadField for avatar in each testimonial item
    - Pass solutionId prop to all ImageUploadField components
    - Handle image URL updates in form state
    - _Requirements: 5.1, 5.2, 5.4, 5.5_
  
  - [ ]* 6.8 Write unit tests for image validation
    - Test file type validation accepts valid image formats (jpg, png, webp, gif)
    - Test file type validation rejects non-image files
    - Test file size validation accepts files under 10MB
    - Test file size validation rejects files over 10MB
    - Test magic number validation for security
    - _Requirements: 6.1, 12.4, 15.7_
  
  - [ ]* 6.9 Write integration tests for image upload
    - Test successful image upload to S3 returns URL and storageKey
    - Test successful image upload to Vercel Blob returns URL and storageKey
    - Test image database record creation
    - Test image deletion removes from storage and database
    - Test image replacement deletes old image
    - _Requirements: 6.3, 6.4, 6.11_

- [ ] 7. Phase 6: Publish Workflow
  - [~] 7.1 Create publish/unpublish API routes
    - Create `src/app/api/admin/solutions/[id]/publish/route.ts`
    - Implement POST handler for publishing solution
    - Verify JWT token
    - Call `publishSolution(id)` to set isDraft=false on solution and all enabled sections
    - Import `revalidatePath` from 'next/cache'
    - Trigger on-demand revalidation: `revalidatePath(`/solutions/${solution.slug}`)`
    - Return updated solution with 200 status
    - _Requirements: 7.3, 8.9, 10.14_
  
  - [~] 7.2 Create unpublish API route
    - Create `src/app/api/admin/solutions/[id]/unpublish/route.ts`
    - Implement POST handler for unpublishing solution
    - Verify JWT token
    - Call `unpublishSolution(id)` to set isDraft=true on solution
    - Return updated solution
    - _Requirements: 7.8_
  
  - [~] 7.3 Build publish controls component
    - Create `src/components/admin/solutions/PublishControls.tsx`
    - Accept props: solution data (id, isDraft, slug)
    - Display status badge: "Draft" (gray) or "Published" (green)
    - Add "Save Draft" button: saves current form state without publishing
    - Add "Publish" button with confirmation dialog: "Are you sure you want to publish this solution? It will be visible to the public."
    - Add "Unpublish" button (only shown when solution is published): "This will hide the solution from the public site."
    - Add "Delete Solution" button with confirmation dialog: "Are you sure you want to delete this solution? This action cannot be undone."
    - Disable buttons during API calls, show loading spinners
    - Handle button click: call appropriate API route
    - _Requirements: 7.1, 7.2, 7.3, 7.6, 7.8_
  
  - [~] 7.4 Integrate publish controls into solution editor
    - Update `src/app/admin/solutions/[id]/edit/page.tsx`
    - Add PublishControls component to page layout (in header or sidebar)
    - Pass solution data (id, isDraft, slug) to controls
    - Implement "Publish" handler: POST to `/api/admin/solutions/[id]/publish`
    - Implement "Unpublish" handler: POST to `/api/admin/solutions/[id]/unpublish`
    - Handle publish success: update solution state optimistically, show success toast
    - Handle publish errors: show error toast, rollback optimistic update
    - Refetch solution data after publish/unpublish to ensure UI is in sync
    - _Requirements: 7.3, 7.6, 9.7, 9.8_
  
  - [~] 7.5 Update solution list to show draft/published status
    - Modify `SolutionsList` component to display status badges
    - Use color coding: gray badge for drafts, green badge for published
    - Add filter buttons: "All", "Drafts Only", "Published Only"
    - Implement client-side filtering based on selected filter
    - Show count of drafts and published solutions
    - _Requirements: 3.1, 7.6_
  
  - [ ]* 7.6 Write integration tests for publish workflow
    - Test publish action sets isDraft=false on solution and enabled sections
    - Test unpublish action sets isDraft=true on solution
    - Test published solutions appear in public queries
    - Test draft solutions do not appear in public queries
    - Test disabled sections (isDraft=true) do not get published with solution
    - _Requirements: 7.3, 7.4, 7.5, 7.8_

- [~] 8. Checkpoint - Verify publish workflow and image uploads
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Phase 7: Public Solution Page Rendering
  - [~] 9.1 Create public hero section component
    - Create `src/components/solutions/HeroSection.tsx`
    - Accept content prop typed as HeroContent
    - Render section with heading (h1), subheading (p), background image, CTA button
    - Import Next.js Image component for background image optimization
    - Use Image with fill layout and object-fit cover for background
    - Apply Tailwind CSS styling for hero layout
    - Make CTA button link to ctaLink
    - _Requirements: 8.5, 8.6, 13.3_
  
  - [~] 9.2 Create public intro section component
    - Create `src/components/solutions/IntroSection.tsx`
    - Accept content prop typed as IntroContent
    - Render heading (h2), body text (with dangerouslySetInnerHTML for HTML content), and image
    - Use Next.js Image component with width/height and sizes for responsive loading
    - Enable lazy loading with loading="lazy" prop
    - Apply Tailwind CSS styling for two-column layout
    - _Requirements: 8.5, 8.6, 13.3_
  
  - [~] 9.3 Create public features section component
    - Create `src/components/solutions/FeaturesSection.tsx`
    - Accept content prop typed as FeaturesContent
    - Render features in grid layout (3 columns on desktop, 1 on mobile)
    - Display each feature with icon, title, and description
    - Use icon string as class name or image source
    - Apply Tailwind CSS grid styling
    - _Requirements: 8.5, 8.6_
  
  - [~] 9.4 Create public benefits section component
    - Create `src/components/solutions/BenefitsSection.tsx`
    - Accept content prop typed as BenefitsContent
    - Render benefits in grid or alternating row layout
    - Display each benefit with image, title, and description
    - Use Next.js Image component for benefit images with lazy loading
    - Apply Tailwind CSS styling
    - _Requirements: 8.5, 8.6, 13.3_
  
  - [~] 9.5 Create public testimonials section component
    - Create `src/components/solutions/TestimonialsSection.tsx`
    - Accept content prop typed as TestimonialsContent
    - Render testimonials in card layout (slider or grid)
    - Display each testimonial with quote, author, role, company, and avatar
    - Use Next.js Image component for avatars (circular crop)
    - Apply Tailwind CSS card styling
    - _Requirements: 8.5, 8.6, 13.3_
  
  - [~] 9.6 Create public CTA section component
    - Create `src/components/solutions/CTASection.tsx`
    - Accept content prop typed as CTAContent
    - Render heading, body text, and CTA buttons
    - Display primary button (prominent) and secondary button (outlined) if provided
    - Link buttons to respective URLs
    - Apply Tailwind CSS styling for centered CTA layout
    - _Requirements: 8.5, 8.6_
  
  - [~] 9.7 Create public custom section component
    - Create `src/components/solutions/CustomSection.tsx`
    - Accept content prop typed as CustomContent
    - Render heading and HTML body content using dangerouslySetInnerHTML
    - Apply Tailwind CSS prose classes for typography
    - Note: HTML is sanitized on admin side before storage
    - _Requirements: 8.5, 8.6_
  
  - [~] 9.8 Build dynamic solution page route
    - Create `src/app/(website)/solutions/[slug]/page.tsx` as server component
    - Use Next.js 15 async params: `{ params }: { params: Promise<{ slug: string }> }`
    - Import `notFound` from 'next/navigation'
    - Fetch solution by slug with `getSolutionBySlug(slug, true)` (publishedOnly=true)
    - Include sections where isDraft=false, ordered by order asc
    - Return `notFound()` if solution not found or isDraft=true
    - Render sections dynamically using switch statement on section.type
    - Map HERO → HeroSection, INTRO → IntroSection, FEATURES → FeaturesSection, etc.
    - Pass section.content as content prop to each component
    - Wrap page in main element with proper semantic HTML
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [~] 9.9 Implement static generation and metadata for solution pages
    - Add `generateStaticParams()` function to solution page
    - Query all published solutions: `prisma.solution.findMany({ where: { isDraft: false }, select: { slug: true } })`
    - Return array of `{ slug }` objects for static generation at build time
    - Add `generateMetadata()` async function
    - Fetch solution by slug
    - Return metadata object with title and description from solution record
    - Set appropriate Open Graph tags
    - Configure revalidation strategy: `export const revalidate = false` for on-demand only
    - _Requirements: 8.7, 8.8, 13.1_
  
  - [~] 9.10 Implement on-demand revalidation in publish action
    - Update `src/app/api/admin/solutions/[id]/publish/route.ts`
    - After successful publish, import and call `revalidatePath(`/solutions/${solution.slug}`)`
    - Ensure solution slug is available in response
    - This triggers immediate regeneration of static page
    - Test that published changes appear immediately on public page
    - _Requirements: 8.9, 13.2_
  
  - [ ]* 9.11 Write integration tests for public page rendering
    - Test published solution (isDraft=false) appears on public page
    - Test draft solution (isDraft=true) returns 404
    - Test sections render in correct order based on order field
    - Test only published sections (isDraft=false) appear on page
    - Test disabled sections (isDraft=true) do not render
    - Test page metadata (title, description) matches solution data
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.7_

- [ ] 10. Phase 8: Admin UI Polish and Content Migration
  - [~] 10.1 Create admin layout with sidebar navigation
    - Create `src/app/admin/layout.tsx` for admin route layout
    - Create `src/components/admin/layout/AdminLayout.tsx` wrapper component
    - Create `src/components/admin/layout/AdminSidebar.tsx` navigation component
    - Add navigation links: Dashboard (/admin/dashboard), Solutions (/admin/solutions)
    - Add LogoutButton component at bottom of sidebar
    - Highlight active route with different background color
    - Create `src/components/admin/layout/AdminHeader.tsx` with page title and admin user indicator
    - Make layout responsive for desktop (minimum 1024px width)
    - Apply Tailwind CSS styling matching existing design system
    - Use sticky sidebar on left, scrollable content on right
    - _Requirements: 9.2, 9.4, 9.9_
  
  - [~] 10.2 Create admin dashboard page
    - Create `src/app/admin/dashboard/page.tsx`
    - Create stats cards component showing metrics:
      - Total Solutions count (query: `prisma.solution.count()`)
      - Published Solutions count (query: `prisma.solution.count({ where: { isDraft: false } })`)
      - Draft Solutions count (query: `prisma.solution.count({ where: { isDraft: true } })`)
    - Display recent solutions list: last 5 created or updated (order by updatedAt desc, limit 5)
    - Add quick action buttons: "Create New Solution" linking to `/admin/solutions/new`
    - Show welcome message with admin username
    - Apply card-based layout with Tailwind CSS
    - _Requirements: 9.2_
  
  - [~] 10.3 Add toast notification system
    - Install toast library: `npm install sonner` (recommended) or `react-hot-toast`
    - Create toast wrapper in admin layout: `<Toaster />` component
    - Update all API call handlers to show toast notifications
    - Show success toasts: "Solution created", "Solution updated", "Section added", "Image uploaded", "Solution published"
    - Show error toasts: "Failed to create solution", "Upload failed", etc.
    - Use appropriate icons and colors for success (green) and error (red)
    - Set toast duration to 4 seconds
    - _Requirements: 9.7, 9.8_
  
  - [~] 10.4 Implement loading states across admin UI
    - Add loading spinners to form submit buttons (disable button, show spinner icon)
    - Add skeleton loaders for solution list while fetching data
    - Add skeleton loaders for solution editor while fetching solution
    - Disable interactive elements (buttons, inputs) during API calls
    - Show progress indicator for image uploads (percentage or spinner)
    - Create reusable Spinner and Skeleton components
    - _Requirements: 9.6_
  
  - [~] 10.5 Implement optimistic UI updates
    - In SolutionsList: optimistically add new solution to list after create, remove on delete
    - In SectionManager: optimistically reorder sections during drag, rollback on API error
    - In PublishControls: optimistically update isDraft badge, rollback on error
    - Use React state to track optimistic changes
    - Implement rollback logic for failed API calls
    - Show loading indicators during optimistic updates
    - _Requirements: 9.8_
  
  - [~] 10.6 Add rich text editor for custom sections
    - Install rich text editor library: `npm install @tiptap/react @tiptap/starter-kit`
    - Create `src/components/admin/ui/RichTextEditor.tsx` component
    - Configure TipTap editor with allowed extensions: Bold, Italic, Underline, Heading (H2, H3), BulletList, OrderedList, Link
    - Add toolbar with formatting buttons
    - Update `CustomSectionForm` to use RichTextEditor instead of textarea
    - Handle HTML output from editor, store in bodyHtml field
    - Apply Tailwind CSS styling to editor container
    - _Requirements: 5.7_
  
  - [~] 10.7 Implement HTML sanitization for custom sections
    - Install sanitization library: `npm install isomorphic-dompurify`
    - Create `src/lib/utils/sanitize.ts`
    - Implement `sanitizeHtml(html: string): string` function
    - Configure DOMPurify with allowed tags whitelist: p, br, strong, em, u, h2, h3, ul, ol, li, a
    - Configure allowed attributes: href, target, rel (for links only)
    - Apply sanitization on custom section save (server-side in API route)
    - Also apply sanitization on custom section update
    - _Requirements: 15.4_
  
  - [~] 10.8 Create static content migration script
    - Create `scripts/migrate-content.ts` TypeScript file
    - Import Prisma client
    - Define StaticContent interface matching structure of existing static files
    - Read static content files from `src/content/*.ts` using dynamic imports
    - For each file: parse content structure (title, slug, sections array)
    - Check for existing solution by slug (idempotency): `prisma.solution.findUnique({ where: { slug } })`
    - Skip if solution already exists
    - Create solution record with isDraft=false for migrated content
    - Create section records for each section in content, map section types to SectionType enum
    - Set order based on array index
    - Log success message for each file: "✓ Migrated {slug}"
    - Log skip message if already exists: "Skipping {slug} - already exists"
    - Handle errors gracefully: log error message, continue to next file
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_
  
  - [~] 10.9 Add migration npm script and run migration
    - Install tsx for TypeScript execution: `npm install -D tsx`
    - Update `package.json` scripts to include: `"migrate:content": "tsx scripts/migrate-content.ts"`
    - Document migration process in README.md
    - Execute migration script: `npm run migrate:content`
    - Verify all static content files are migrated to database
    - Check solution records in database using Prisma Studio: `npx prisma studio`
    - Verify section records, ordering, and content JSON
    - Verify all migrated solutions have isDraft=false
    - Test public pages render correctly with migrated data
    - _Requirements: 11.4, 11.7_
  
  - [~] 10.10 Implement CSRF protection
    - Install CSRF library or use built-in Next.js CSRF protection
    - Generate CSRF token on admin login
    - Store CSRF token in session or cookie
    - Add CSRF token to all admin forms as hidden field
    - Validate CSRF token on state-changing API routes (POST, PUT, DELETE)
    - Return 403 error if CSRF token is missing or invalid
    - _Requirements: 15.8_
  
  - [~] 10.11 Add comprehensive error boundaries
    - Create `src/components/admin/ui/ErrorBoundary.tsx` React error boundary component
    - Catch errors in admin sections and display user-friendly error messages
    - Provide recovery actions: "Try Again" button (reset error), "Go Back" button
    - Log errors to console for debugging
    - Wrap admin layout with error boundary
    - Wrap individual sections (solutions list, solution editor) with error boundaries
    - _Requirements: 12.5_
  
  - [~] 10.12 Implement authentication logging
    - Update login API route (`src/app/api/admin/auth/login/route.ts`)
    - Log all authentication attempts with: timestamp, IP address, username, success/failure
    - Create log entry object: `{ timestamp: new Date().toISOString(), ip, username, success: boolean }`
    - Option 1: Store logs in database (create AuthLog model)
    - Option 2: Log to external service (e.g., Logtail, Datadog)
    - Option 3: Write to file or stdout (for development)
    - Ensure logs don't expose sensitive information (don't log passwords)
    - _Requirements: 15.9_
  
  - [~] 10.13 Security audit and final testing
    - Test JWT token expiration: verify tokens expire after 24 hours
    - Test rate limiting: verify login is blocked after 5 failed attempts
    - Test input sanitization: submit custom section with script tags, verify XSS prevention
    - Test SQL injection prevention: Prisma should handle this automatically, verify with malicious inputs
    - Verify security headers in responses using browser DevTools Network tab
    - Test file upload validation: try uploading non-image file, verify rejection
    - Test magic number validation: rename .txt file to .jpg, verify rejection
    - Review error messages: ensure no sensitive information disclosure (stack traces, internal paths)
    - Test unauthorized access: access admin routes without token, verify redirect to login
    - Test all CRUD operations work correctly end-to-end
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.10_
  
  - [ ]* 10.14 Write end-to-end tests for complete admin workflow
    - Test complete workflow: login → create solution → add sections → upload images → publish
    - Test public page displays published content correctly
    - Test draft content doesn't appear on public page
    - Test section reordering persists and displays correctly
    - Test image replacement deletes old image
    - Test solution deletion cascades to sections and images
    - _Requirements: All requirements (integration verification)_

- [~] 11. Final checkpoint - Production readiness verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability via _Requirements: X.Y_ notation
- Checkpoints at phases 4, 8, and 11 ensure incremental validation of core functionality
- Implementation uses Next.js 15 with App Router and React 19 Server Components
- All TypeScript code uses strict type checking with proper interfaces and types
- Environment variables must be configured before running (use `.env.example` as reference)
- Run Prisma migrations before starting development server: `npx prisma migrate dev`
- Use existing Tailwind CSS design system components for consistency
- Image optimization uses Next.js Image component with appropriate sizes and lazy loading
- Public pages use static generation (SSG) with on-demand revalidation (ISR)
- Admin console is optimized for desktop (minimum 1024px width)
- Rate limiting uses in-memory cache for development; use Upstash or Redis in production
- Content migration script is idempotent and safe to run multiple times

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "1.4"] },
    { "id": 2, "tasks": ["2.1", "2.2", "3.1", "3.2"] },
    { "id": 3, "tasks": ["2.3", "2.4", "3.3"] },
    { "id": 4, "tasks": ["2.5", "2.6", "2.7", "3.4", "3.5", "3.6", "3.7"] },
    { "id": 5, "tasks": ["3.8", "3.9"] },
    { "id": 6, "tasks": ["3.10", "3.11", "3.12", "5.1", "5.2"] },
    { "id": 7, "tasks": ["5.3", "5.4", "5.5", "5.6"] },
    { "id": 8, "tasks": ["5.7", "5.8"] },
    { "id": 9, "tasks": ["5.9", "5.10", "5.11", "5.12", "5.13", "5.14", "5.15"] },
    { "id": 10, "tasks": ["5.16", "5.17", "5.18", "6.1", "6.2", "6.3"] },
    { "id": 11, "tasks": ["6.4", "6.5"] },
    { "id": 12, "tasks": ["6.6", "6.7", "6.8", "6.9"] },
    { "id": 13, "tasks": ["7.1", "7.2", "7.3"] },
    { "id": 14, "tasks": ["7.4", "7.5", "7.6"] },
    { "id": 15, "tasks": ["9.1", "9.2", "9.3", "9.4", "9.5", "9.6", "9.7"] },
    { "id": 16, "tasks": ["9.8", "9.9"] },
    { "id": 17, "tasks": ["9.10", "9.11"] },
    { "id": 18, "tasks": ["10.1", "10.2", "10.6", "10.7", "10.10"] },
    { "id": 19, "tasks": ["10.3", "10.4", "10.5", "10.8", "10.12"] },
    { "id": 20, "tasks": ["10.9", "10.11", "10.13", "10.14"] }
  ]
}
```
