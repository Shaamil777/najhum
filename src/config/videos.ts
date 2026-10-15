/**
 * Video Assets Configuration
 * Hosted on Cloudinary CDN for optimized streaming, low latency, and bandwidth savings.
 */

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/i3k4lg5p/video/upload";

export const HERO_VIDEOS = {
  /** Main homepage background video */
  home: `${CLOUDINARY_BASE_URL}/v1792047628/najhum/videos/hero-bg-video.mp4`,
  
  /** About page background video */
  about: `${CLOUDINARY_BASE_URL}/v1792047628/najhum/videos/hero-bg-video.mp4`,
  
  /** Evoltics platform background video */
  evoltics: `${CLOUDINARY_BASE_URL}/v1792047597/najhum/videos/elvotics_bg.mp4`,
  
  /** CropifAI platform background video */
  cropifai: `${CLOUDINARY_BASE_URL}/v1792047680/najhum/videos/cropifhero.mp4`,
  
  /** IoTRICS platform background video */
  iotrics: `${CLOUDINARY_BASE_URL}/v1792047642/najhum/videos/iotrics-bg.mp4`,
  
  /** Secondary hero video alternative */
  heroSecondary: `${CLOUDINARY_BASE_URL}/v1792047634/najhum/videos/hero-bg-video2.mp4`,
} as const;

export type HeroVideoKey = keyof typeof HERO_VIDEOS;
