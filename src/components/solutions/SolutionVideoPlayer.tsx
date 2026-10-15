'use client';
import { useState } from 'react';
import { Play } from 'lucide-react';
import { embedVideoUrl, isSafeMediaUrl } from '@/lib/utils/content-url';
import { isPlaceholderMedia } from '@/lib/builder/media';
import MediaPlaceholder from './MediaPlaceholder';
import SolutionImage from './SolutionImage';

export default function SolutionVideoPlayer({ url = '', poster = '', title, dark = false }: { url?: string; poster?: string; title: string; dark?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const embed = embedVideoUrl('youtube', url) || embedVideoUrl('vimeo', url);
  const valid = !!url && isSafeMediaUrl(url);
  return <div className="solution-video-player relative w-full mx-auto aspect-video overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
    {!valid ? <MediaPlaceholder video dark={dark} fill /> : embed ? playing ? <iframe title={title.replace(/<[^>]*>/g, '')} src={`${embed}?autoplay=1`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full border-0" /> : <button type="button" aria-label={`Play ${title.replace(/<[^>]*>/g, '')}`} onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full">
      {!isPlaceholderMedia(poster) ? <SolutionImage src={poster} alt="Video cover" fill /> : <MediaPlaceholder video dark={dark} fill />}
      <span className="absolute inset-0 flex items-center justify-center"><span className="rounded-full bg-primary text-white p-4 shadow-lg"><Play size={24} fill="currentColor" /></span></span>
    </button> : <video src={url} poster={isPlaceholderMedia(poster) ? undefined : poster} controls playsInline preload="metadata" className="absolute inset-0 w-full h-full object-contain" />}
  </div>;
}
