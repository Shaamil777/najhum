import { describe, expect, it } from 'vitest';
import { createSolutionSchema, updateSolutionSchema } from './solution-schemas';

describe('solution classification validation', () => {
  it('defaults new solutions to industry and accepts each supported placement', () => {
    expect(createSolutionSchema.parse({ title: 'Example', slug: 'example' }).classification).toBe('INDUSTRY');
    for (const classification of ['INDUSTRY', 'USE_CASE', 'BOTH']) {
      expect(createSolutionSchema.parse({ title: 'Example', slug: 'example', classification }).classification).toBe(classification);
    }
  });
  it('rejects invalid classifications and keeps partial updates from resetting placement', () => {
    expect(updateSolutionSchema.safeParse({ classification: 'OTHER' }).success).toBe(false);
    expect(updateSolutionSchema.parse({ title: 'Renamed' })).not.toHaveProperty('classification');
  });
});
