'use client';
import { useEffect, useRef, useState } from 'react';

export default function HeroBackgroundVideo({ src }: { src: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!media.matches) void video.current?.play().catch(() => {});
    const reduce = () => { if (media.matches) video.current?.pause(); };
    media.addEventListener('change', reduce);
    return () => media.removeEventListener('change', reduce);
  }, [src]);
  return <><video ref={video} src={src} muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-hidden="true" /><button type="button" className="solution-hero-video-toggle" onClick={() => { if (playing) video.current?.pause(); else void video.current?.play().catch(() => {}); }}>{playing ? 'Pause background video' : 'Play background video'}</button></>;
}
