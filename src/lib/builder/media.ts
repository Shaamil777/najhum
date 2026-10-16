export const mediaRatios = {
  '16:9': { css: '16 / 9', size: '1600 × 900 px' },
  '4:3': { css: '4 / 3', size: '1200 × 900 px' },
  '1:1': { css: '1 / 1', size: '800 × 800 px' },
  '3:4': { css: '3 / 4', size: '900 × 1200 px' },
  '21:9': { css: '21 / 9', size: '2100 × 900 px' },
} as const;
export type MediaRatio = keyof typeof mediaRatios;
export function isPlaceholderMedia(value?: string | null) {
  return !value || value.startsWith('/builder-samples/') || value.startsWith('/builder-placeholders/');
}
export function imageRecommendation(field: string, sectionType?: string, layout?: string, ratio?: string) {
  const recommended = field === 'avatar' ? '1:1' : sectionType === 'HERO' ? (layout === 'hero-split' ? '4:3' : layout === 'hero-editorial' ? '4:3' : '16:9') : field === 'posterUrl' || field === 'poster' || layout === 'video-cards' ? '16:9' : ratio && ratio in mediaRatios ? ratio as MediaRatio : sectionType === 'INTRO' || sectionType === 'BENEFITS' || layout === 'image-cards' || layout === 'faded-image-cards' || layout === 'split-stories' ? '4:3' : layout === 'overlay-cards' ? '3:4' : '16:9';
  return `${recommended} · ${mediaRatios[recommended].size} recommended. ${sectionType === 'IMAGE' && ratio === 'auto' ? 'Use the original ratio for diagrams; choose Contain to keep labels visible.' : 'Keep the main subject near the center; Cover crops edges to fit.'}`;
}
