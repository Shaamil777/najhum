import { describe, it, expect } from 'vitest';
import { generateSlug, validateSlug } from './slug';

describe('generateSlug', () => {
  it('converts title to lowercase', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
    expect(generateSlug('UPPERCASE TITLE')).toBe('uppercase-title');
    expect(generateSlug('MixedCase')).toBe('mixedcase');
  });

  it('replaces spaces with hyphens', () => {
    expect(generateSlug('hello world')).toBe('hello-world');
    expect(generateSlug('multiple   spaces')).toBe('multiple-spaces');
    expect(generateSlug('title with many words')).toBe('title-with-many-words');
  });

  it('replaces special characters with hyphens', () => {
    expect(generateSlug('hello@world')).toBe('hello-world');
    expect(generateSlug('my-great-solution!')).toBe('my-great-solution');
    expect(generateSlug('title#with$special%chars')).toBe('title-with-special-chars');
    expect(generateSlug('hello_world')).toBe('hello-world');
    expect(generateSlug('product & service')).toBe('product-service');
  });

  it('removes consecutive hyphens', () => {
    expect(generateSlug('hello--world')).toBe('hello-world');
    expect(generateSlug('product --- version')).toBe('product-version');
    expect(generateSlug('multiple----hyphens')).toBe('multiple-hyphens');
  });

  it('trims leading hyphens', () => {
    expect(generateSlug('-hello-world')).toBe('hello-world');
    expect(generateSlug('--leading')).toBe('leading');
  });

  it('trims trailing hyphens', () => {
    expect(generateSlug('hello-world-')).toBe('hello-world');
    expect(generateSlug('trailing--')).toBe('trailing');
  });

  it('handles combination of transformations', () => {
    expect(generateSlug('My Great Solution!')).toBe('my-great-solution');
    expect(generateSlug('Product -- Version 2.0')).toBe('product-version-2-0');
    expect(generateSlug('  Trimmed  Spaces  ')).toBe('trimmed-spaces');
    expect(generateSlug('!!!special###chars!!!')).toBe('special-chars');
  });

  it('preserves numbers', () => {
    expect(generateSlug('version 2.0')).toBe('version-2-0');
    expect(generateSlug('product123')).toBe('product123');
    expect(generateSlug('2024 roadmap')).toBe('2024-roadmap');
  });

  it('handles empty string', () => {
    expect(generateSlug('')).toBe('');
  });

  it('handles string with only special characters', () => {
    expect(generateSlug('!!!')).toBe('');
    expect(generateSlug('---')).toBe('');
    expect(generateSlug('@#$%')).toBe('');
  });

  it('ensures output matches regex ^[a-z0-9-]+$ or empty', () => {
    const testCases = [
      'Hello World',
      'My Great Solution!',
      'Product -- Version 2.0',
      'test@email.com',
      '2024 Roadmap',
    ];

    testCases.forEach((title) => {
      const slug = generateSlug(title);
      if (slug) {
        expect(slug).toMatch(/^[a-z0-9-]+$/);
      }
    });
  });
});

describe('validateSlug', () => {
  it('accepts valid slugs with lowercase letters and hyphens', () => {
    expect(validateSlug('hello-world')).toBe(true);
    expect(validateSlug('my-great-solution')).toBe(true);
    expect(validateSlug('simple')).toBe(true);
  });

  it('accepts valid slugs with numbers', () => {
    expect(validateSlug('product-123')).toBe(true);
    expect(validateSlug('version-2-0')).toBe(true);
    expect(validateSlug('2024-roadmap')).toBe(true);
    expect(validateSlug('123')).toBe(true);
  });

  it('accepts slugs with only hyphens between words', () => {
    expect(validateSlug('multi-word-slug-here')).toBe(true);
    expect(validateSlug('a-b-c-d-e')).toBe(true);
  });

  it('rejects slugs with uppercase letters', () => {
    expect(validateSlug('Hello-World')).toBe(false);
    expect(validateSlug('UPPERCASE')).toBe(false);
    expect(validateSlug('MixedCase')).toBe(false);
  });

  it('rejects slugs with spaces', () => {
    expect(validateSlug('hello world')).toBe(false);
    expect(validateSlug('my solution')).toBe(false);
    expect(validateSlug(' slug')).toBe(false);
    expect(validateSlug('slug ')).toBe(false);
  });

  it('rejects slugs with special characters', () => {
    expect(validateSlug('hello_world')).toBe(false);
    expect(validateSlug('hello@world')).toBe(false);
    expect(validateSlug('hello.world')).toBe(false);
    expect(validateSlug('hello!world')).toBe(false);
    expect(validateSlug('hello#world')).toBe(false);
    expect(validateSlug('hello$world')).toBe(false);
    expect(validateSlug('hello%world')).toBe(false);
    expect(validateSlug('hello&world')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(validateSlug('')).toBe(false);
  });

  it('rejects strings with only hyphens', () => {
    expect(validateSlug('-')).toBe(false);
    expect(validateSlug('--')).toBe(false);
    expect(validateSlug('---')).toBe(false);
  });

  it('rejects slugs with leading hyphens', () => {
    expect(validateSlug('-hello')).toBe(false);
    expect(validateSlug('--hello-world')).toBe(false);
  });

  it('rejects slugs with trailing hyphens', () => {
    expect(validateSlug('hello-')).toBe(false);
    expect(validateSlug('hello-world--')).toBe(false);
  });

  it('rejects slugs with consecutive hyphens', () => {
    expect(validateSlug('hello--world')).toBe(false);
    expect(validateSlug('product---version')).toBe(false);
  });

  it('validates generated slugs correctly', () => {
    const titles = [
      'Hello World',
      'My Great Solution',
      'Product Version 2.0',
      'Simple Title',
      '2024 Roadmap',
    ];

    titles.forEach((title) => {
      const slug = generateSlug(title);
      if (slug) {
        expect(validateSlug(slug)).toBe(true);
      }
    });
  });
});
