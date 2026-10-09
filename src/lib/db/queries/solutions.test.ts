/**
 * Unit tests for solution query functions
 * 
 * Tests CRUD operations, draft/publish workflows, and error handling
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getAllSolutions,
  getSolutionById,
  getSolutionBySlug,
  createSolution,
  updateSolution,
  deleteSolution,
  publishSolution,
  unpublishSolution,
} from './solutions';
import { prisma } from '../prisma';

describe('Solution Query Functions', () => {
  // Clean up test data after each test
  afterEach(async () => {
    await prisma.solution.deleteMany({
      where: {
        slug: {
          startsWith: 'test-',
        },
      },
    });
  });

  describe('createSolution', () => {
    it('should create a new solution with draft status', async () => {
      const solution = await createSolution({
        title: 'Test Solution',
        slug: 'test-solution',
        metaDescription: 'Test description',
      });

      expect(solution).toBeDefined();
      expect(solution.title).toBe('Test Solution');
      expect(solution.slug).toBe('test-solution');
      expect(solution.metaDescription).toBe('Test description');
      expect(solution.isDraft).toBe(true);
      expect(solution.id).toBeDefined();
      expect(solution.createdAt).toBeInstanceOf(Date);
      expect(solution.updatedAt).toBeInstanceOf(Date);
    });

    it('should create a solution without metaDescription', async () => {
      const solution = await createSolution({
        title: 'Test Solution No Meta',
        slug: 'test-solution-no-meta',
      });

      expect(solution.metaDescription).toBeNull();
    });

    it('should throw error for duplicate slug', async () => {
      await createSolution({
        title: 'First Solution',
        slug: 'test-duplicate-slug',
      });

      await expect(
        createSolution({
          title: 'Second Solution',
          slug: 'test-duplicate-slug',
        })
      ).rejects.toThrow('A solution with this slug already exists');
    });
  });

  describe('getAllSolutions', () => {
    it('should return all solutions ordered by updatedAt desc', async () => {
      // Create multiple solutions with delays to ensure different timestamps
      const solution1 = await createSolution({
        title: 'Solution 1',
        slug: 'test-solution-1',
      });

      await new Promise(resolve => setTimeout(resolve, 10));

      const solution2 = await createSolution({
        title: 'Solution 2',
        slug: 'test-solution-2',
      });

      const solutions = await getAllSolutions();

      // Should include both test solutions
      const testSolutions = solutions.filter(s => s.slug.startsWith('test-'));
      expect(testSolutions.length).toBeGreaterThanOrEqual(2);

      // Most recent should be first
      const testSolutionsSorted = testSolutions.slice(0, 2);
      expect(testSolutionsSorted[0].id).toBe(solution2.id);
      expect(testSolutionsSorted[1].id).toBe(solution1.id);
    });
  });

  describe('getSolutionById', () => {
    it('should return solution by id without sections', async () => {
      const created = await createSolution({
        title: 'Test Solution',
        slug: 'test-solution-by-id',
      });

      const solution = await getSolutionById(created.id);

      expect(solution).toBeDefined();
      expect(solution?.id).toBe(created.id);
      expect(solution?.title).toBe('Test Solution');
      expect(solution).not.toHaveProperty('sections');
    });

    it('should return solution by id with sections', async () => {
      const created = await createSolution({
        title: 'Test Solution',
        slug: 'test-solution-with-sections',
      });

      // Create a section for the solution
      await prisma.section.create({
        data: {
          solutionId: created.id,
          type: 'HERO',
          order: 0,
          content: { heading: 'Test Heading' },
        },
      });

      const solution = await getSolutionById(created.id, true);

      expect(solution).toBeDefined();
      expect(solution?.sections).toBeDefined();
      expect(solution?.sections?.length).toBe(1);
      expect(solution?.sections?.[0].type).toBe('HERO');
    });

    it('should return null for non-existent id', async () => {
      const solution = await getSolutionById('non-existent-id');
      expect(solution).toBeNull();
    });
  });

  describe('getSolutionBySlug', () => {
    it('should return solution by slug without draft filter', async () => {
      const created = await createSolution({
        title: 'Test Solution',
        slug: 'test-solution-by-slug',
      });

      const solution = await getSolutionBySlug('test-solution-by-slug');

      expect(solution).toBeDefined();
      expect(solution?.id).toBe(created.id);
      expect(solution?.slug).toBe('test-solution-by-slug');
    });

    it('should return published solution when publishedOnly is true', async () => {
      const created = await createSolution({
        title: 'Test Published Solution',
        slug: 'test-published-solution',
      });

      await publishSolution(created.id);

      const solution = await getSolutionBySlug('test-published-solution', true);

      expect(solution).toBeDefined();
      expect(solution?.isDraft).toBe(false);
    });

    it('should not return draft solution when publishedOnly is true', async () => {
      await createSolution({
        title: 'Test Draft Solution',
        slug: 'test-draft-solution',
      });

      const solution = await getSolutionBySlug('test-draft-solution', true);

      expect(solution).toBeNull();
    });

    it('should return null for non-existent slug', async () => {
      const solution = await getSolutionBySlug('non-existent-slug');
      expect(solution).toBeNull();
    });
  });

  describe('updateSolution', () => {
    it('should update solution metadata', async () => {
      const created = await createSolution({
        title: 'Original Title',
        slug: 'test-update-solution',
      });

      const updated = await updateSolution(created.id, {
        title: 'Updated Title',
        metaDescription: 'New description',
      });

      expect(updated.title).toBe('Updated Title');
      expect(updated.metaDescription).toBe('New description');
      expect(updated.slug).toBe('test-update-solution'); // Unchanged
      expect(updated.updatedAt.getTime()).toBeGreaterThan(created.updatedAt.getTime());
    });

    it('should throw error for non-existent solution', async () => {
      await expect(
        updateSolution('non-existent-id', { title: 'New Title' })
      ).rejects.toThrow('Solution not found');
    });

    it('should throw error for duplicate slug on update', async () => {
      await createSolution({
        title: 'Solution 1',
        slug: 'test-existing-slug',
      });

      const solution2 = await createSolution({
        title: 'Solution 2',
        slug: 'test-other-slug',
      });

      await expect(
        updateSolution(solution2.id, { slug: 'test-existing-slug' })
      ).rejects.toThrow('A solution with this slug already exists');
    });
  });

  describe('deleteSolution', () => {
    it('should delete a solution', async () => {
      const created = await createSolution({
        title: 'Solution to Delete',
        slug: 'test-delete-solution',
      });

      await deleteSolution(created.id);

      const deleted = await getSolutionById(created.id);
      expect(deleted).toBeNull();
    });

    it('should cascade delete sections and images', async () => {
      const created = await createSolution({
        title: 'Solution with Relations',
        slug: 'test-cascade-delete',
      });

      // Create section and image
      await prisma.section.create({
        data: {
          solutionId: created.id,
          type: 'HERO',
          order: 0,
          content: {},
        },
      });

      await prisma.image.create({
        data: {
          solutionId: created.id,
          url: 'https://example.com/image.jpg',
          storageKey: 'key',
        },
      });

      await deleteSolution(created.id);

      // Verify sections and images are deleted
      const sections = await prisma.section.findMany({
        where: { solutionId: created.id },
      });
      const images = await prisma.image.findMany({
        where: { solutionId: created.id },
      });

      expect(sections).toHaveLength(0);
      expect(images).toHaveLength(0);
    });

    it('should throw error for non-existent solution', async () => {
      await expect(
        deleteSolution('non-existent-id')
      ).rejects.toThrow('Solution not found');
    });
  });

  describe('publishSolution', () => {
    it('should publish a solution and enabled sections', async () => {
      const created = await createSolution({
        title: 'Solution to Publish',
        slug: 'test-publish-solution',
      });

      // Create enabled section (isDraft: false)
      await prisma.section.create({
        data: {
          solutionId: created.id,
          type: 'HERO',
          order: 0,
          isDraft: false,
          content: {},
        },
      });

      const published = await publishSolution(created.id);

      expect(published.isDraft).toBe(false);
      expect(published.sections).toBeDefined();
      expect(published.sections?.[0].isDraft).toBe(false);
    });

    it('should not publish disabled sections', async () => {
      const created = await createSolution({
        title: 'Solution with Disabled Section',
        slug: 'test-publish-disabled-section',
      });

      // Create disabled section (isDraft: true)
      await prisma.section.create({
        data: {
          solutionId: created.id,
          type: 'HERO',
          order: 0,
          isDraft: true,
          content: {},
        },
      });

      await publishSolution(created.id);

      const solution = await getSolutionById(created.id, true);
      expect(solution?.sections?.[0].isDraft).toBe(true);
    });

    it('should throw error for non-existent solution', async () => {
      await expect(
        publishSolution('non-existent-id')
      ).rejects.toThrow('Solution not found');
    });
  });

  describe('unpublishSolution', () => {
    it('should unpublish a published solution', async () => {
      const created = await createSolution({
        title: 'Solution to Unpublish',
        slug: 'test-unpublish-solution',
      });

      await publishSolution(created.id);
      const unpublished = await unpublishSolution(created.id);

      expect(unpublished.isDraft).toBe(true);
    });

    it('should throw error for non-existent solution', async () => {
      await expect(
        unpublishSolution('non-existent-id')
      ).rejects.toThrow('Solution not found');
    });
  });
});
