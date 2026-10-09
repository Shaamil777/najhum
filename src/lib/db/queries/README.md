# Database Query Functions

This directory contains database query functions organized by domain model.

## Solutions Query Functions

Located in `solutions.ts`, these functions provide CRUD operations for solution pages with proper error handling, draft/publish workflows, and cascading operations.

### Functions

#### `getAllSolutions(): Promise<Solution[]>`
Returns all solutions ordered by `updatedAt` descending. Used in the admin console for listing all solutions.

**Requirements:** 3.1, 13.6

#### `getSolutionById(id: string, includeSections?: boolean): Promise<SolutionWithSections | null>`
Gets a solution by ID with optional sections included. If `includeSections` is true, sections are ordered by their `order` field ascending.

**Parameters:**
- `id`: Solution ID (cuid)
- `includeSections`: Whether to include sections (default: false)

**Returns:** Solution with optional sections, or null if not found

**Requirements:** 3.4, 3.5, 13.6

#### `getSolutionBySlug(slug: string, publishedOnly?: boolean): Promise<SolutionWithSections | null>`
Gets a solution by slug with optional published-only filter. Used for public solution pages and admin editing.

**Parameters:**
- `slug`: Solution slug (URL-safe identifier)
- `publishedOnly`: If true, only return published solutions (default: false)

**Returns:** Solution with sections, or null if not found

**Requirements:** 7.4, 8.1, 8.2, 8.3, 13.6

#### `createSolution(data: { title: string; slug: string; metaDescription?: string }): Promise<Solution>`
Creates a new solution with draft status (`isDraft=true`).

**Parameters:**
- `data.title`: Solution title
- `data.slug`: URL-safe slug (must be unique)
- `data.metaDescription`: Optional meta description for SEO

**Returns:** Created solution

**Throws:** Error if slug already exists or database operation fails

**Requirements:** 2.1, 3.3, 7.1

#### `updateSolution(id: string, data: Partial<Solution>): Promise<Solution>`
Updates solution metadata. Allows partial updates of solution fields.

**Parameters:**
- `id`: Solution ID
- `data`: Partial solution data to update

**Returns:** Updated solution

**Throws:** Error if solution not found or database operation fails

**Requirements:** 3.5, 7.2

#### `deleteSolution(id: string): Promise<Solution>`
Deletes a solution and all associated sections and images (cascade). Prisma automatically handles cascade deletion due to `onDelete: Cascade` in the schema.

**Parameters:**
- `id`: Solution ID

**Returns:** Deleted solution

**Throws:** Error if solution not found or database operation fails

**Requirements:** 2.8, 3.6, 3.7

#### `publishSolution(id: string): Promise<SolutionWithSections>`
Publishes a solution by setting `isDraft=false` on the solution and all enabled sections (where `section.isDraft=false`). Uses a transaction to ensure atomicity.

**Parameters:**
- `id`: Solution ID

**Returns:** Updated solution with sections

**Throws:** Error if solution not found or database operation fails

**Requirements:** 7.3, 7.4, 7.5

#### `unpublishSolution(id: string): Promise<Solution>`
Unpublishes a solution by setting `isDraft=true` on the solution. This hides the solution from public view.

**Parameters:**
- `id`: Solution ID

**Returns:** Updated solution

**Throws:** Error if solution not found or database operation fails

**Requirements:** 7.8

### Error Handling

All functions implement proper error handling:
- Database connection errors are caught and logged
- Prisma-specific errors (P2002 for unique constraint, P2025 for not found) are handled with descriptive error messages
- All errors are logged to console with context
- User-friendly error messages are thrown

### Testing

Run the manual test script to verify all functions work correctly:

```bash
npx tsx scripts/test-solutions-queries.ts
```

Unit tests are available in `solutions.test.ts` (requires test framework setup).

### Usage Example

```typescript
import {
  createSolution,
  publishSolution,
  getSolutionBySlug,
} from '@/lib/db/queries/solutions';

// Create a new solution
const solution = await createSolution({
  title: 'My Solution',
  slug: 'my-solution',
  metaDescription: 'A great solution',
});

// Publish it
await publishSolution(solution.id);

// Retrieve for public display
const publicSolution = await getSolutionBySlug('my-solution', true);
```
