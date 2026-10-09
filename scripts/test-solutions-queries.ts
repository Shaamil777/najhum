/**
 * Manual test script for solution query functions
 * Run with: npx tsx scripts/test-solutions-queries.ts
 */

import {
  getAllSolutions,
  getSolutionById,
  getSolutionBySlug,
  createSolution,
  updateSolution,
  deleteSolution,
  publishSolution,
  unpublishSolution,
} from '../src/lib/db/queries/solutions';
import { prisma } from '../src/lib/db/prisma';

async function testSolutionQueries() {
  console.log('🧪 Testing solution query functions...\n');

  try {
    // Test 1: Create a solution
    console.log('1️⃣  Creating a test solution...');
    const solution = await createSolution({
      title: 'Test Solution for Queries',
      slug: 'test-solution-queries',
      metaDescription: 'This is a test solution',
    });
    console.log('✅ Created:', solution.id, solution.title, `(isDraft: ${solution.isDraft})`);

    // Test 2: Get all solutions
    console.log('\n2️⃣  Getting all solutions...');
    const allSolutions = await getAllSolutions();
    console.log(`✅ Found ${allSolutions.length} solutions`);

    // Test 3: Get solution by ID
    console.log('\n3️⃣  Getting solution by ID...');
    const solutionById = await getSolutionById(solution.id);
    console.log('✅ Found:', solutionById?.title);

    // Test 4: Get solution by ID with sections
    console.log('\n4️⃣  Creating a section and fetching solution with sections...');
    await prisma.section.create({
      data: {
        solutionId: solution.id,
        type: 'HERO',
        order: 0,
        content: { heading: 'Test Heading', subheading: 'Test Subheading' },
      },
    });
    const solutionWithSections = await getSolutionById(solution.id, true);
    console.log('✅ Solution with sections:', {
      title: solutionWithSections?.title,
      sectionCount: solutionWithSections?.sections?.length,
    });

    // Test 5: Get solution by slug
    console.log('\n5️⃣  Getting solution by slug...');
    const solutionBySlug = await getSolutionBySlug('test-solution-queries');
    console.log('✅ Found:', solutionBySlug?.title);

    // Test 6: Update solution
    console.log('\n6️⃣  Updating solution...');
    const updated = await updateSolution(solution.id, {
      title: 'Updated Test Solution',
    });
    console.log('✅ Updated title:', updated.title);

    // Test 7: Publish solution
    console.log('\n7️⃣  Publishing solution...');
    const published = await publishSolution(solution.id);
    console.log('✅ Published:', `isDraft=${published.isDraft}`);

    // Test 8: Get published solution by slug
    console.log('\n8️⃣  Getting published solution by slug (publishedOnly=true)...');
    const publishedBySlug = await getSolutionBySlug('test-solution-queries', true);
    console.log('✅ Found published:', publishedBySlug?.title);

    // Test 9: Unpublish solution
    console.log('\n9️⃣  Unpublishing solution...');
    const unpublished = await unpublishSolution(solution.id);
    console.log('✅ Unpublished:', `isDraft=${unpublished.isDraft}`);

    // Test 10: Get solution by slug with publishedOnly (should return null)
    console.log('\n🔟 Getting draft solution with publishedOnly=true...');
    const draftSolution = await getSolutionBySlug('test-solution-queries', true);
    console.log('✅ Result:', draftSolution === null ? 'null (as expected)' : 'found (unexpected)');

    // Test 11: Delete solution
    console.log('\n1️⃣1️⃣  Deleting solution (will cascade to sections)...');
    await deleteSolution(solution.id);
    const deleted = await getSolutionById(solution.id);
    console.log('✅ Deleted:', deleted === null ? 'solution not found (as expected)' : 'still exists (unexpected)');

    console.log('\n✨ All tests completed successfully!\n');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testSolutionQueries();
