import { describe, expect, it } from 'vitest';
import { imageRecommendation, isPlaceholderMedia } from './media';

describe('solution media guidance', () => {
  it('recommends image sizes for heroes, overlays, avatars, and video covers', () => {
    expect(imageRecommendation('backgroundImage', 'HERO', 'hero-split')).toContain('4:3 · 1200 × 900 px');
    expect(imageRecommendation('image', 'CUSTOM', 'overlay-cards', '3:4')).toContain('3:4 · 900 × 1200 px');
    expect(imageRecommendation('avatar', 'TESTIMONIALS')).toContain('1:1 · 800 × 800 px');
    expect(imageRecommendation('posterUrl', 'VIDEO')).toContain('16:9 · 1600 × 900 px');
    expect(imageRecommendation('imageUrl', 'IMAGE', 'contained', 'auto')).toContain('original ratio');
  });
  it('recognizes sample artwork as neutral placeholder content without replacing customer images', () => {
    expect(isPlaceholderMedia('/builder-samples/energy.svg')).toBe(true);
    expect(isPlaceholderMedia('/builder-placeholders/image-4-3.svg')).toBe(true);
    expect(isPlaceholderMedia('')).toBe(true);
    expect(isPlaceholderMedia('/uploads/customer-building.jpg')).toBe(false);
  });
});
