# Design Document: Dynamic Solutions Page with Admin Console

## Introduction

This design document specifies the technical architecture for a dynamic solution page content management system. The system replaces static TypeScript content files with a database-backed admin console, enabling non-technical users to manage solution page content through a web interface. The architecture leverages Next.js 15 App Router, Prisma ORM with PostgreSQL, JWT authentication, and cloud-based image storage.

## Technology Stack

### Core Framework
- **Next.js 15**: App Router with Server Components, Server Actions, and API Routes
- **React 19**: UI component library
- **TypeScript 5**: Type-safe development

### Database & ORM
- **PostgreSQL**: Relational database for content persistence
- **Prisma ORM**: Type-safe database client with migrations
  - Rationale: Prisma provides excellent TypeScript integration, automatic migration generation, and intuitive query API

### Authentication
- **jsonwebtoken (jose)**: JWT token generation and verification
  - Rationale: Industry-standard token-based authentication, stateless, works seamlessly with Next.js middleware

### Image Storage
- **AWS S3** or **Vercel Blob**: Cloud object storage
  - Rationale: S3 provides enterprise-grade reliability and global CDN; Vercel Blob offers zero-config integration with Vercel deployments
  - Selection logic: Check for AWS credentials in environment; fallback to Vercel Blob if available

### Styling
- **Tailwind CSS 4**: Utility-first CSS framework
- Existing design system components from `/src/design-system`

### Validation
- **Zod**: Schema validation for API inputs and form data
  - Rationale: Type-safe validation with automatic TypeScript type inference

### Rate Limiting
- **Upstash Rate Limit** or **simple in-memory LRU cache**: Request rate limiting
  - Rationale: Upstash for production (distributed); in-memory for development

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  ┌────────────────────┐         ┌──────────────────────────┐   │
│  │  Public Solution   │         │    Admin Console         │   │
│  │  Pages (SSG)       │         │    (Client Components)   │   │
│  └────────────────────┘         └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                          │                      │
                          ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js Server Layer                        │
│  ┌────────────────────┐         ┌──────────────────────────┐   │
│  │  Public API        │         │    Admin API Routes      │   │
│  │  (Data Fetching)   │         │    (Protected)           │   │
│  └────────────────────┘         └──────────────────────────┘   │
│                                           │                      │
│  ┌────────────────────────────────────────┘                     │
│  │         Authentication Middleware                             │
│  │         (JWT Verification)                                    │
│  └──────────────────────────────────────────────────────────┐   │
└─────────────────────────────────────────────────────────────│───┘
                          │                                    │
                          ▼                                    ▼
┌─────────────────────────────────────────┐   ┌──────────────────────┐
│           PostgreSQL Database           │   │   Cloud Storage      │
│         (via Prisma Client)             │   │   (AWS S3 / Vercel)  │
│  ┌─────────────────────────────────┐   │   └──────────────────────┘
│  │ Solutions │ Sections │ Images   │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## Database Schema Design

### Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Solution {
  id              String    @id @default(cuid())
  slug            String    @unique
  title           String
  metaDescription String?
  isDraft         Boolean   @default(true)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  sections        Section[]
  images          Image[]
  
  @@index([slug])
  @@index([isDraft])
}

model Section {
  id         String   @id @default(cuid())
  solutionId String
  type       SectionType
  order      Int
  isDraft    Boolean  @default(false)
  content    Json
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  solution   Solution @relation(fields: [solutionId], references: [id], onDelete: Cascade)
  
  @@index([solutionId, order])
  @@index([solutionId, isDraft])
}

enum SectionType {
  HERO
  INTRO
  FEATURES
  BENEFITS
  TESTIMONIALS
  CTA
  CUSTOM
}

model Image {
  id         String   @id @default(cuid())
  solutionId String
  url        String
  altText    String?
  storageKey String
  createdAt  DateTime @default(now())
  
  solution   Solution @relation(fields: [solutionId], references: [id], onDelete: Cascade)
  
  @@index([solutionId])
}
```

### Schema Design Rationale

**Solution Model**:
- `cuid()` for IDs: Collision-resistant, URL-safe, sortable
- `slug` unique constraint: Ensures URL uniqueness
- `isDraft` flag: Enables draft/publish workflow
- Indexes on `slug` and `isDraft`: Optimizes common queries

**Section Model**:
- `Json` content field: Flexible storage for different section types
- `order` field: Explicit ordering (more reliable than array indices)
- Composite index on `(solutionId, order)`: Optimizes section retrieval and ordering
- `onDelete: Cascade`: Automatic cleanup when solution is deleted

**Image Model**:
- `storageKey`: Required for deletion from cloud storage
- Separate from sections: Images can be reused across sections

## Authentication Architecture

### JWT-Based Authentication Flow

```
┌──────────┐                                    ┌──────────┐
│  Admin   │                                    │  Server  │
│  Client  │                                    │          │
└────┬─────┘                                    └────┬─────┘
     │                                               │
     │ 1. POST /api/admin/auth/login                │
     │    { username, password }                    │
     ├──────────────────────────────────────────────▶
     │                                               │
     │                    2. Validate credentials    │
     │                       (env vars)              │
     │                                               │
     │                    3. Generate JWT            │
     │                       (24h expiration)        │
     │                                               │
     │ 4. Return JWT token                          │
     ◀──────────────────────────────────────────────┤
     │    { token }                                  │
     │                                               │
     │ 5. Store token in cookie/localStorage         │
     │                                               │
     │ 6. Include token in Authorization header      │
     │    for all admin API requests                │
     │                                               │
     │ 7. POST /api/admin/solutions                 │
     │    Authorization: Bearer {token}             │
     ├──────────────────────────────────────────────▶
     │                                               │
     │                    8. Verify JWT signature    │
     │                       and expiration          │
     │                                               │
     │ 9. Process request and return response        │
     ◀──────────────────────────────────────────────┤
     │                                               │
```

### Authentication Implementation

**JWT Token Structure**:
```typescript
{
  sub: string;        // Subject (admin user identifier)
  iat: number;        // Issued at (Unix timestamp)
  exp: number;        // Expiration (iat + 24 hours)
  type: 'admin';      // Token type
}
```

**Middleware Protection**:
```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      await verifyJWT(token);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

## API Routes Architecture

### Route Structure

```
/api
├── admin
│   ├── auth
│   │   └── login                    POST   - Authenticate admin user
│   ├── solutions
│   │   ├── /                        GET    - List all solutions (admin view)
│   │   ├── /                        POST   - Create new solution
│   │   ├── [id]                     GET    - Get solution with sections
│   │   ├── [id]                     PUT    - Update solution metadata
│   │   ├── [id]                     DELETE - Delete solution
│   │   ├── [id]/publish             POST   - Publish solution
│   │   ├── [id]/unpublish           POST   - Unpublish solution
│   │   ├── [id]/sections            POST   - Create new section
│   │   ├── [id]/sections/[sectionId] PUT   - Update section content
│   │   ├── [id]/sections/[sectionId] DELETE - Delete section
│   │   └── [id]/sections/reorder    PUT    - Reorder sections
│   └── upload                       POST   - Upload image to cloud storage
└── solutions
    └── [slug]                       GET    - Get published solution (public)
```

### API Request/Response Schemas

**POST /api/admin/auth/login**:
```typescript
Request: {
  username: string;
  password: string;
}

Response: {
  token: string;
  expiresAt: string; // ISO 8601
}

Errors:
  401: { error: "Invalid credentials" }
  429: { error: "Too many login attempts. Try again in 15 minutes." }
```

**POST /api/admin/solutions**:
```typescript
Request: {
  title: string;
  slug: string;
  metaDescription?: string;
}

Response: {
  id: string;
  slug: string;
  title: string;
  metaDescription: string | null;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

Errors:
  400: { error: "Validation failed", details: ZodError }
  401: { error: "Unauthorized" }
  409: { error: "A solution with this slug already exists" }
```

**POST /api/admin/solutions/[id]/sections**:
```typescript
Request: {
  type: 'HERO' | 'INTRO' | 'FEATURES' | 'BENEFITS' | 'TESTIMONIALS' | 'CTA' | 'CUSTOM';
  content: SectionContent; // Type-specific content
}

Response: {
  id: string;
  solutionId: string;
  type: string;
  order: number;
  isDraft: boolean;
  content: SectionContent;
  createdAt: string;
  updatedAt: string;
}
```

**PUT /api/admin/solutions/[id]/sections/reorder**:
```typescript
Request: {
  sectionIds: string[]; // Ordered array of section IDs
}

Response: {
  updatedCount: number;
}
```

**POST /api/admin/upload**:
```typescript
Request: FormData {
  file: File;
  solutionId: string;
  altText?: string;
}

Response: {
  id: string;
  url: string;
  altText: string | null;
  storageKey: string;
}

Errors:
  400: { error: "File too large. Maximum size is 10MB." }
  400: { error: "Invalid file type. Only images are allowed." }
  500: { error: "Upload failed. Please try again." }
```

## Component Architecture

### Admin Console Component Hierarchy

```
AdminLayout
├── AdminSidebar
│   ├── AdminNavItem (Dashboard)
│   ├── AdminNavItem (Solutions)
│   └── LogoutButton
└── AdminContent
    ├── DashboardPage
    │   ├── StatsCard (Total Solutions)
    │   ├── StatsCard (Published)
    │   └── StatsCard (Drafts)
    ├── SolutionsListPage
    │   ├── SolutionCard[]
    │   └── CreateSolutionButton
    └── SolutionEditorPage
        ├── SolutionMetadataForm
        │   ├── TitleInput
        │   ├── SlugInput
        │   └── MetaDescriptionTextarea
        ├── SectionManager
        │   ├── SectionList (Drag & Drop)
        │   │   └── SectionCard[]
        │   │       ├── SectionHeader
        │   │       ├── SectionContentForm (type-specific)
        │   │       └── SectionActions
        │   └── AddSectionButton
        └── PublishControls
            ├── SaveDraftButton
            ├── PublishButton
            └── DeleteButton
```

### Section Content Form Components

Each section type requires a custom form component:

```
SectionContentForm (polymorphic)
├── HeroSectionForm
│   ├── TextInput (heading)
│   ├── TextInput (subheading)
│   ├── ImageUploadField (backgroundImage)
│   ├── TextInput (ctaText)
│   └── TextInput (ctaLink)
├── IntroSectionForm
│   ├── TextInput (heading)
│   ├── RichTextEditor (bodyText)
│   └── ImageUploadField (image)
├── FeaturesSectionForm
│   └── RepeaterField[]
│       ├── TextInput (title)
│       ├── Textarea (description)
│       └── IconPicker (icon)
├── BenefitsSectionForm
│   └── RepeaterField[]
│       ├── TextInput (title)
│       ├── Textarea (description)
│       └── ImageUploadField (image)
├── TestimonialsSectionForm
│   └── RepeaterField[]
│       ├── Textarea (quote)
│       ├── TextInput (author)
│       ├── TextInput (role)
│       ├── TextInput (company)
│       └── ImageUploadField (avatar)
├── CTASectionForm
│   ├── TextInput (heading)
│   ├── Textarea (bodyText)
│   ├── TextInput (primaryButtonText)
│   ├── TextInput (primaryButtonLink)
│   ├── TextInput (secondaryButtonText)
│   └── TextInput (secondaryButtonLink)
└── CustomSectionForm
    ├── TextInput (heading)
    └── RichTextEditor (bodyHtml)
```

### Public Solution Page Component Hierarchy

```
SolutionPage (Server Component)
├── SolutionHead (metadata)
└── SectionRenderer[]
    ├── HeroSection (if type === 'HERO')
    ├── IntroSection (if type === 'INTRO')
    ├── FeaturesSection (if type === 'FEATURES')
    ├── BenefitsSection (if type === 'BENEFITS')
    ├── TestimonialsSection (if type === 'TESTIMONIALS')
    ├── CTASection (if type === 'CTA')
    └── CustomSection (if type === 'CUSTOM')
```

## State Management

### Admin Console State Management Strategy

**Local Component State (useState)**:
- Form inputs (controlled components)
- UI toggles (modals, dropdowns)
- Loading states for individual actions

**Server State (React Query / SWR)**:
- Not needed - using Server Actions and optimistic updates
- Alternatively: Simple fetch with revalidation

**Optimistic Updates Pattern**:
```typescript
async function handlePublish(solutionId: string) {
  // Optimistic UI update
  setSolution(prev => ({ ...prev, isDraft: false }));
  
  try {
    const result = await publishSolution(solutionId);
    // Success notification
    toast.success('Solution published successfully');
  } catch (error) {
    // Rollback optimistic update
    setSolution(prev => ({ ...prev, isDraft: true }));
    toast.error('Failed to publish solution');
  }
}
```

**Form State (React Hook Form + Zod)**:
```typescript
const form = useForm<SolutionFormData>({
  resolver: zodResolver(solutionSchema),
  defaultValues: solution,
});

const onSubmit = form.handleSubmit(async (data) => {
  await updateSolution(solutionId, data);
});
```

## Image Upload Implementation

### Upload Flow

```
┌──────────┐                                    ┌──────────┐
│  Admin   │                                    │  Server  │
│  Client  │                                    │          │
└────┬─────┘                                    └────┬─────┘
     │                                               │
     │ 1. User selects image file                   │
     │                                               │
     │ 2. Client-side validation                    │
     │    - File type (image/*)                     │
     │    - File size (<10MB)                       │
     │    - Show preview                            │
     │                                               │
     │ 3. POST /api/admin/upload                    │
     │    FormData: file, solutionId, altText       │
     ├──────────────────────────────────────────────▶
     │                                               │
     │                    4. Verify JWT              │
     │                                               │
     │                    5. Validate file           │
     │                       - Check file headers    │
     │                       - Verify image format   │
     │                                               │
     │                    6. Generate storage key    │
     │                       - {solutionId}/{uuid}.{ext}
     │                                               │
     │                    7. Upload to cloud         │
     │                       - AWS S3 / Vercel Blob  │
     │                                               │
     │                    8. Create Image record     │
     │                       - url, storageKey, etc  │
     │                                               │
     │ 9. Return image data                         │
     ◀──────────────────────────────────────────────┤
     │    { id, url, storageKey, altText }          │
     │                                               │
     │ 10. Update form field with URL               │
     │                                               │
```

### Image Service Implementation

```typescript
// lib/image-service.ts

interface UploadResult {
  url: string;
  storageKey: string;
}

export async function uploadImage(
  file: File,
  solutionId: string
): Promise<UploadResult> {
  // Generate unique storage key
  const extension = file.name.split('.').pop();
  const fileName = `${solutionId}/${crypto.randomUUID()}.${extension}`;
  
  // Determine storage provider
  if (process.env.AWS_ACCESS_KEY_ID) {
    return uploadToS3(file, fileName);
  } else if (process.env.BLOB_READ_WRITE_TOKEN) {
    return uploadToVercelBlob(file, fileName);
  } else {
    throw new Error('No image storage provider configured');
  }
}

export async function deleteImage(storageKey: string): Promise<void> {
  if (process.env.AWS_ACCESS_KEY_ID) {
    return deleteFromS3(storageKey);
  } else if (process.env.BLOB_READ_WRITE_TOKEN) {
    return deleteFromVercelBlob(storageKey);
  }
}

// AWS S3 implementation
async function uploadToS3(file: File, key: string): Promise<UploadResult> {
  const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  
  const buffer = await file.arrayBuffer();
  
  await s3.send(new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Body: Buffer.from(buffer),
    ContentType: file.type,
  }));
  
  const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  
  return { url, storageKey: key };
}

// Vercel Blob implementation
async function uploadToVercelBlob(file: File, path: string): Promise<UploadResult> {
  const blob = await put(path, file, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  });
  
  return { url: blob.url, storageKey: path };
}
```

## File and Folder Structure

```
najhum/
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── migrations/             # Auto-generated migrations
│   └── seed.ts                 # Optional: seed data for development
├── src/
│   ├── app/
│   │   ├── (website)/          # Public routes (existing)
│   │   │   └── solutions/
│   │   │       └── [slug]/
│   │   │           └── page.tsx      # Dynamic solution page
│   │   ├── admin/              # Admin routes
│   │   │   ├── layout.tsx            # Admin layout with sidebar
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # Login page
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Admin dashboard
│   │   │   └── solutions/
│   │   │       ├── page.tsx          # Solutions list
│   │   │       ├── new/
│   │   │       │   └── page.tsx      # Create solution form
│   │   │       └── [id]/
│   │   │           └── edit/
│   │   │               └── page.tsx  # Solution editor
│   │   └── api/
│   │       ├── admin/
│   │       │   ├── auth/
│   │       │   │   └── login/
│   │       │   │       └── route.ts  # POST login
│   │       │   ├── solutions/
│   │       │   │   ├── route.ts      # GET list, POST create
│   │       │   │   └── [id]/
│   │       │   │       ├── route.ts          # GET, PUT, DELETE
│   │       │   │       ├── publish/
│   │       │   │       │   └── route.ts      # POST publish
│   │       │   │       ├── unpublish/
│   │       │   │       │   └── route.ts      # POST unpublish
│   │       │   │       └── sections/
│   │       │   │           ├── route.ts      # POST create section
│   │       │   │           ├── [sectionId]/
│   │       │   │           │   └── route.ts  # PUT, DELETE
│   │       │   │           └── reorder/
│   │       │   │               └── route.ts  # PUT reorder
│   │       │   └── upload/
│   │       │       └── route.ts      # POST image upload
│   │       └── solutions/
│   │           └── [slug]/
│   │               └── route.ts      # GET public solution data
│   ├── components/
│   │   ├── admin/              # Admin console components
│   │   │   ├── layout/
│   │   │   │   ├── AdminLayout.tsx
│   │   │   │   ├── AdminSidebar.tsx
│   │   │   │   └── AdminHeader.tsx
│   │   │   ├── solutions/
│   │   │   │   ├── SolutionsList.tsx
│   │   │   │   ├── SolutionCard.tsx
│   │   │   │   ├── SolutionMetadataForm.tsx
│   │   │   │   └── DeleteSolutionButton.tsx
│   │   │   ├── sections/
│   │   │   │   ├── SectionManager.tsx
│   │   │   │   ├── SectionCard.tsx
│   │   │   │   ├── AddSectionButton.tsx
│   │   │   │   └── forms/
│   │   │   │       ├── HeroSectionForm.tsx
│   │   │   │       ├── IntroSectionForm.tsx
│   │   │   │       ├── FeaturesSectionForm.tsx
│   │   │   │       ├── BenefitsSectionForm.tsx
│   │   │   │       ├── TestimonialsSectionForm.tsx
│   │   │   │       ├── CTASectionForm.tsx
│   │   │   │       └── CustomSectionForm.tsx
│   │   │   ├── ui/
│   │   │   │   ├── ImageUploadField.tsx
│   │   │   │   ├── RichTextEditor.tsx
│   │   │   │   ├── RepeaterField.tsx
│   │   │   │   └── IconPicker.tsx
│   │   │   └── auth/
│   │   │       ├── LoginForm.tsx
│   │   │       └── LogoutButton.tsx
│   │   └── solutions/          # Public solution page components
│   │       ├── HeroSection.tsx
│   │       ├── IntroSection.tsx
│   │       ├── FeaturesSection.tsx
│   │       ├── BenefitsSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       ├── CTASection.tsx
│   │       └── CustomSection.tsx
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── jwt.ts          # JWT token functions
│   │   │   ├── middleware.ts   # Auth middleware helpers
│   │   │   └── rate-limit.ts   # Rate limiting logic
│   │   ├── db/
│   │   │   ├── prisma.ts       # Prisma client singleton
│   │   │   └── queries/
│   │   │       ├── solutions.ts    # Solution queries
│   │   │       ├── sections.ts     # Section queries
│   │   │       └── images.ts       # Image queries
│   │   ├── storage/
│   │   │   ├── image-service.ts    # Main image service
│   │   │   ├── s3.ts               # AWS S3 implementation
│   │   │   └── vercel-blob.ts      # Vercel Blob implementation
│   │   ├── validation/
│   │   │   ├── solution-schemas.ts # Zod schemas for solutions
│   │   │   ├── section-schemas.ts  # Zod schemas for sections
│   │   │   └── auth-schemas.ts     # Zod schemas for auth
│   │   └── utils/
│   │       ├── slug.ts         # Slug generation and validation
│   │       └── sanitize.ts     # Input sanitization
│   └── types/
│       ├── solution.ts         # Solution type definitions
│       ├── section.ts          # Section type definitions
│       └── api.ts              # API request/response types
├── scripts/
│   └── migrate-content.ts      # Migration script for static content
├── middleware.ts               # Next.js middleware for auth
├── .env.example                # Environment variable template
└── .env.local                  # Local environment variables (gitignored)
```

## Security Implementation

### Input Validation and Sanitization

**Zod Schemas for Validation**:
```typescript
// lib/validation/solution-schemas.ts

export const createSolutionSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string()
    .min(1, "Slug is required")
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  metaDescription: z.string().max(300).optional(),
});

export const updateSolutionSchema = createSolutionSchema.partial();

export const createSectionSchema = z.object({
  type: z.enum(['HERO', 'INTRO', 'FEATURES', 'BENEFITS', 'TESTIMONIALS', 'CTA', 'CUSTOM']),
  content: z.record(z.unknown()), // Validated per section type
});
```

**HTML Sanitization**:
```typescript
// lib/utils/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h2', 'h3', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
}
```

### Rate Limiting Implementation

```typescript
// lib/auth/rate-limit.ts

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

const loginRateLimit: RateLimitConfig = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
};

// Simple in-memory implementation (use Upstash in production)
const attempts = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(identifier: string, config: RateLimitConfig): boolean {
  const now = Date.now();
  const record = attempts.get(identifier);
  
  if (!record || now > record.resetAt) {
    attempts.set(identifier, {
      count: 1,
      resetAt: now + config.windowMs,
    });
    return true;
  }
  
  if (record.count >= config.maxAttempts) {
    return false;
  }
  
  record.count++;
  return true;
}
```

### Security Headers

```typescript
// middleware.ts

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval';"
  );
  
  return response;
}
```

## Migration Strategy

### Static Content Migration Script

```typescript
// scripts/migrate-content.ts

import { PrismaClient } from '@prisma/client';
import { readdir } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

interface StaticContent {
  title: string;
  slug: string;
  metaDescription: string;
  sections: Array<{
    type: string;
    content: Record<string, unknown>;
  }>;
}

async function migrateContent() {
  const contentDir = path.join(process.cwd(), 'src', 'content');
  const files = await readdir(contentDir);
  
  for (const file of files) {
    if (!file.endsWith('.ts')) continue;
    
    try {
      const content: StaticContent = await import(path.join(contentDir, file));
      
      // Check if already migrated (idempotency)
      const existing = await prisma.solution.findUnique({
        where: { slug: content.slug },
      });
      
      if (existing) {
        console.log(`Skipping ${content.slug} - already exists`);
        continue;
      }
      
      // Create solution with sections
      const solution = await prisma.solution.create({
        data: {
          title: content.title,
          slug: content.slug,
          metaDescription: content.metaDescription,
          isDraft: false, // Migrate as published
          sections: {
            create: content.sections.map((section, index) => ({
              type: section.type as any,
              order: index,
              isDraft: false,
              content: section.content,
            })),
          },
        },
      });
      
      console.log(`✓ Migrated ${content.slug}`);
    } catch (error) {
      console.error(`✗ Failed to migrate ${file}:`, error);
    }
  }
  
  await prisma.$disconnect();
}

migrateContent();
```

**Run migration**:
```bash
npm run migrate-content
```

## Public Solution Page Rendering

### Server Component Implementation

```typescript
// app/(website)/solutions/[slug]/page.tsx

import { prisma } from '@/lib/db/prisma';
import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/solutions/HeroSection';
import { IntroSection } from '@/components/solutions/IntroSection';
// ... other section imports

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const solutions = await prisma.solution.findMany({
    where: { isDraft: false },
    select: { slug: true },
  });
  
  return solutions.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const solution = await prisma.solution.findUnique({
    where: { slug, isDraft: false },
  });
  
  if (!solution) return {};
  
  return {
    title: solution.title,
    description: solution.metaDescription,
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  
  const solution = await prisma.solution.findUnique({
    where: { slug, isDraft: false },
    include: {
      sections: {
        where: { isDraft: false },
        orderBy: { order: 'asc' },
      },
    },
  });
  
  if (!solution) {
    notFound();
  }
  
  return (
    <main>
      {solution.sections.map((section) => {
        switch (section.type) {
          case 'HERO':
            return <HeroSection key={section.id} content={section.content} />;
          case 'INTRO':
            return <IntroSection key={section.id} content={section.content} />;
          case 'FEATURES':
            return <FeaturesSection key={section.id} content={section.content} />;
          case 'BENEFITS':
            return <BenefitsSection key={section.id} content={section.content} />;
          case 'TESTIMONIALS':
            return <TestimonialsSection key={section.id} content={section.content} />;
          case 'CTA':
            return <CTASection key={section.id} content={section.content} />;
          case 'CUSTOM':
            return <CustomSection key={section.id} content={section.content} />;
          default:
            return null;
        }
      })}
    </main>
  );
}

// Revalidate on-demand after publishing
export const revalidate = false;
```

### On-Demand Revalidation

```typescript
// app/api/admin/solutions/[id]/publish/route.ts

import { revalidatePath } from 'next/cache';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // ... JWT verification ...
  
  // Update solution and sections
  const solution = await prisma.solution.update({
    where: { id },
    data: {
      isDraft: false,
      sections: {
        updateMany: {
          where: { solutionId: id, isDraft: false },
          data: { isDraft: false },
        },
      },
    },
    include: { sections: true },
  });
  
  // Revalidate the solution page
  revalidatePath(`/solutions/${solution.slug}`);
  
  return Response.json(solution);
}
```

## Error Handling Patterns

### API Error Responses

```typescript
// lib/utils/api-error.ts

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
  }
}

export function handleApiError(error: unknown): Response {
  if (error instanceof ApiError) {
    return Response.json(
      { error: error.message, details: error.details },
      { status: error.statusCode }
    );
  }
  
  if (error instanceof z.ZodError) {
    return Response.json(
      { error: 'Validation failed', details: error.errors },
      { status: 400 }
    );
  }
  
  console.error('Unhandled API error:', error);
  
  return Response.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

### Client Error Handling

```typescript
// components/admin/solutions/SolutionMetadataForm.tsx

async function handleSubmit(data: SolutionFormData) {
  try {
    setLoading(true);
    const result = await updateSolution(solutionId, data);
    toast.success('Solution updated successfully');
  } catch (error) {
    if (error instanceof Response) {
      const body = await error.json();
      
      if (error.status === 409) {
        form.setError('slug', { message: body.error });
      } else if (error.status === 400 && body.details) {
        // Handle Zod validation errors
        Object.entries(body.details).forEach(([field, messages]) => {
          form.setError(field as any, { message: messages[0] });
        });
      } else {
        toast.error(body.error || 'Failed to update solution');
      }
    } else {
      toast.error('An unexpected error occurred');
    }
  } finally {
    setLoading(false);
  }
}
```

## Performance Optimizations

### Database Query Optimization

**Efficient Section Retrieval**:
```typescript
// Single query with join instead of N+1
const solution = await prisma.solution.findUnique({
  where: { slug, isDraft: false },
  include: {
    sections: {
      where: { isDraft: false },
      orderBy: { order: 'asc' },
    },
  },
});
```

**Connection Pooling**:
```typescript
// lib/db/prisma.ts

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### Image Optimization

```typescript
// components/solutions/IntroSection.tsx

import Image from 'next/image';

export function IntroSection({ content }: { content: IntroContent }) {
  return (
    <section>
      <h2>{content.heading}</h2>
      <div dangerouslySetInnerHTML={{ __html: content.bodyText }} />
      {content.image && (
        <Image
          src={content.image}
          alt={content.imageAlt || ''}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          loading="lazy"
        />
      )}
    </section>
  );
}
```

### Static Generation with ISR

```typescript
// app/(website)/solutions/[slug]/page.tsx

// Regenerate pages every 24 hours (86400 seconds)
export const revalidate = 86400;

// Or use on-demand revalidation only
export const revalidate = false;
```

## Environment Configuration

### Required Environment Variables

```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/najhum?schema=public"

# Admin Authentication
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-password"
JWT_SECRET="your-256-bit-secret-key-here"

# Image Storage - AWS S3 (Option 1)
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="najhum-solutions-images"

# Image Storage - Vercel Blob (Option 2)
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Environment Validation

```typescript
// lib/env.ts

import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  ADMIN_USERNAME: z.string().min(1),
  ADMIN_PASSWORD: z.string().min(8),
  JWT_SECRET: z.string().min(32),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
});

export function validateEnv() {
  const parsed = envSchema.safeParse(process.env);
  
  if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
  
  // Validate at least one storage provider is configured
  const hasS3 = parsed.data.AWS_ACCESS_KEY_ID && parsed.data.AWS_SECRET_ACCESS_KEY;
  const hasVercelBlob = parsed.data.BLOB_READ_WRITE_TOKEN;
  
  if (!hasS3 && !hasVercelBlob) {
    console.error('❌ No image storage provider configured. Set either AWS S3 or Vercel Blob credentials.');
    process.exit(1);
  }
  
  console.log('✓ Environment variables validated');
}

// Call at application startup
if (process.env.NODE_ENV === 'production') {
  validateEnv();
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Credential validation consistency

*For any* username and password pair submitted to the authentication service, the validation result (accept or reject) should be consistent and deterministic based on environment variable comparison.

**Validates: Requirements 1.2, 1.4**

### Property 2: JWT token expiration correctness

*For any* valid credentials that generate a JWT token, the token's expiration timestamp should be exactly 24 hours (86400 seconds) from the issued-at timestamp.

**Validates: Requirements 1.3**

### Property 3: Protected route access with valid token

*For any* valid JWT token and any admin route path (excluding /admin/login), the system should grant access without redirection.

**Validates: Requirements 1.5**

### Property 4: Slug generation from title

*For any* title string, the generated slug should contain only lowercase letters, numbers, and hyphens, and should be derived deterministically from the title.

**Validates: Requirements 2.4**

### Property 5: Draft state on solution creation

*For any* valid solution creation request, the created solution record should have isDraft set to true.

**Validates: Requirements 3.3, 7.1**

### Property 6: Solution metadata update persistence

*For any* valid solution metadata update (title, slug, metaDescription), the changes should be persisted to the database and retrievable in subsequent queries.

**Validates: Requirements 3.5**

### Property 7: Required field validation

*For any* solution creation or update request with empty required fields (title or slug), the system should return a validation error and prevent the operation.

**Validates: Requirements 3.8**

### Property 8: Invalid slug character rejection

*For any* slug string containing characters outside the set [a-z0-9-], the system should return a validation error with the message "Slug must contain only lowercase letters, numbers, and hyphens".

**Validates: Requirements 3.9**

### Property 9: Section ordering correctness

*For any* set of sections belonging to a solution, when retrieved for display, the sections should be ordered by their order field in ascending order.

**Validates: Requirements 4.1, 8.4**

### Property 10: New section order assignment

*For any* existing set of sections in a solution, when a new section is created, its order value should be one greater than the maximum existing order value (or 0 if no sections exist).

**Validates: Requirements 4.4**

### Property 11: Section deletion and reordering

*For any* section deletion operation, the remaining sections should have their order values updated to maintain a consecutive sequence starting from 0.

**Validates: Requirements 4.7**

### Property 12: Section drag-and-drop reordering

*For any* section reordering operation (moving a section from position A to position B), all affected sections should have their order values updated to reflect the new sequence.

**Validates: Requirements 4.8**

### Property 13: JSON content serialization round-trip

*For any* section content object, serializing to JSON and storing in the database, then retrieving and deserializing, should produce an equivalent object.

**Validates: Requirements 5.8**

### Property 14: Section type required field validation

*For any* section creation or update with missing required fields for its section type, the system should return a validation error listing the missing fields.

**Validates: Requirements 5.9**

### Property 15: Image upload return data

*For any* valid image file upload, the system should return an object containing url, storageKey, and id fields, where url is publicly accessible and storageKey can be used for deletion.

**Validates: Requirements 6.3, 6.4**

### Property 16: Image replacement cleanup

*For any* image field replacement operation, if a previous image exists with a storageKey, the system should delete the previous image from cloud storage using that storageKey.

**Validates: Requirements 6.11**

### Property 17: Draft and publish state transitions

*For any* solution in draft state (isDraft=true), invoking the publish action should set isDraft to false on both the solution and all its enabled sections; conversely, unpublishing should set isDraft to true.

**Validates: Requirements 7.2, 7.3, 7.8**

### Property 18: Public query filtering by draft state

*For any* public solution or section query (non-admin), the results should contain only records where isDraft is false.

**Validates: Requirements 7.4, 7.5, 8.1, 8.3**

### Property 19: Migration script idempotency

*For any* static content file, running the migration script multiple times should not create duplicate solution records in the database.

**Validates: Requirements 11.6**

### Property 20: Validation error message accuracy

*For any* validation error condition (empty required field, invalid slug format, duplicate slug, oversized image), the system should return an error message that accurately describes the specific validation failure.

**Validates: Requirements 12.1, 12.2, 12.3, 12.4**

### Property 21: Rate limiting enforcement

*For any* IP address making login attempts, after 5 failed attempts within a 15-minute window, subsequent login attempts should be rejected with a 429 status code until the window expires.

**Validates: Requirements 15.2**

### Property 22: Input sanitization for XSS prevention

*For any* custom section HTML content submitted by an admin user, the system should sanitize the HTML to remove potentially malicious scripts while preserving allowed formatting tags.

**Validates: Requirements 15.4**

## Implementation Phases

### Phase 1: Foundation (Database and Authentication)
1. Set up Prisma with PostgreSQL
2. Create database schema and run migrations
3. Implement JWT authentication service
4. Create auth middleware and login API route
5. Build login page UI

**Deliverable**: Admin users can authenticate and access protected routes

### Phase 2: Solution CRUD Operations
1. Implement solution API routes (create, read, update, delete)
2. Build admin solutions list page
3. Create solution metadata form
4. Implement validation with Zod schemas

**Deliverable**: Admin users can manage solution metadata

### Phase 3: Section Management
1. Implement section API routes
2. Create section type forms (hero, intro, features, etc.)
3. Build section drag-and-drop reordering
4. Implement section enable/disable toggle

**Deliverable**: Admin users can manage solution sections

### Phase 4: Image Upload
1. Choose and configure storage provider (S3 or Vercel Blob)
2. Implement image upload API route
3. Create ImageUploadField component
4. Implement image replacement and cleanup logic

**Deliverable**: Admin users can upload and manage images

### Phase 5: Publish Workflow
1. Implement publish/unpublish API routes
2. Create publish controls UI
3. Implement draft/published filtering in queries
4. Add on-demand revalidation

**Deliverable**: Admin users can publish solutions to make them public

### Phase 6: Public Solution Pages
1. Create dynamic solution page route
2. Implement section rendering components
3. Set up static generation and ISR
4. Optimize images with Next.js Image component

**Deliverable**: Visitors can view published solution pages

### Phase 7: Migration and Polish
1. Create migration script for static content
2. Run migration and verify data integrity
3. Implement error handling and user feedback (toasts, notifications)
4. Add loading states and optimistic updates
5. Security audit and testing

**Deliverable**: Production-ready system with migrated content

## Testing Strategy

### Unit Tests
- **Authentication**: Token generation, validation, expiration
- **Slug generation**: Various title inputs, special character handling
- **Validation schemas**: Field validation, error messages
- **Sanitization**: HTML sanitization for XSS prevention
- **Rate limiting**: Attempt counting, window expiration

### Integration Tests
- **API routes**: Request/response contracts, error handling
- **Database operations**: CRUD operations, cascade deletes, foreign keys
- **Image upload**: S3/Vercel Blob integration
- **Auth middleware**: Protected route access control

### Property-Based Tests (Fast-check)
- **Slug generation**: For all valid titles, generated slugs match regex pattern
- **Section ordering**: For all section sets, ordering is preserved and correct
- **Draft filtering**: For all queries, only published content is returned to public
- **JSON serialization**: For all section content objects, round-trip is equivalent
- **Validation errors**: For all invalid inputs, appropriate error messages are returned

### End-to-End Tests
- **Admin workflow**: Login → Create solution → Add sections → Upload images → Publish
- **Public rendering**: Verify published content appears on public pages
- **Migration**: Verify static content is correctly migrated to database

## Conclusion

This design provides a comprehensive architecture for a dynamic solution page management system that replaces static content files with a database-backed admin console. The system prioritizes:

- **Security**: JWT authentication, rate limiting, input sanitization, secure headers
- **Performance**: Static generation, ISR, optimized images, efficient database queries
- **Developer Experience**: Type-safe APIs with Prisma and Zod, clear component hierarchy
- **User Experience**: Intuitive admin interface, draft/publish workflow, visual feedback
- **Maintainability**: Modular architecture, separation of concerns, comprehensive error handling

The phased implementation approach ensures incremental delivery of value while maintaining system stability throughout development.
