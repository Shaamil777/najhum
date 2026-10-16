/**
 * Video Assets Configuration
 * Hosted on Cloudinary CDN for optimised streaming, low latency, and bandwidth savings.
 */

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/i3k4lg5p/video/upload";

export const HERO_VIDEOS = {
  /** Main homepage background video */
  home: `${CLOUDINARY_BASE_URL}/v1792047628/najhum/videos/hero-bg-video.mp4`,
  
  /** About page background video */
  about: `${CLOUDINARY_BASE_URL}/v1792047628/najhum/videos/hero-bg-video.mp4`,
  
  /** EVOLTICS platform background video */
  evoltics: `${CLOUDINARY_BASE_URL}/v1792047597/najhum/videos/elvotics_bg.mp4`,
  
  /** cropifAI platform background video */
  cropifai: `${CLOUDINARY_BASE_URL}/c_fill,w_1920,h_1080,br_1000k,f_mp4,vc_h264,ac_none/v1792047680/najhum/videos/cropifhero.mp4`,
  
  /** IoTRICs platform background video */
  iotrics: `${CLOUDINARY_BASE_URL}/v1792047642/najhum/videos/iotrics-bg.mp4`,
  
  /** Secondary hero video alternative */
  heroSecondary: `${CLOUDINARY_BASE_URL}/v1792047634/najhum/videos/hero-bg-video2.mp4`,
  
  /** EVOLTICS mobile app demo video mockup */
  mobileMockup: `${CLOUDINARY_BASE_URL}/v1792096373/najhum/videos/mobile_mockup.mp4`,
} as const;

export type HeroVideoKey = keyof typeof HERO_VIDEOS;

/** Still frames are delivered as images; mobile never mounts the hero video. */
export const CROPIFAI_POSTERS = {
  desktop: `${CLOUDINARY_BASE_URL}/so_0,c_fill,w_1920,h_1080,q_80/v1792047680/najhum/videos/cropifhero.jpg`,
  mobile: `${CLOUDINARY_BASE_URL}/so_0,c_fill,w_768,h_1080,q_80/v1792047680/najhum/videos/cropifhero.jpg`,
} as const;
