import { ImageIcon, Video } from 'lucide-react';
import { mediaRatios, type MediaRatio } from '@/lib/builder/media';

export default function MediaPlaceholder({ ratio = '16:9', video = false, dark = false, fill = false }: { ratio?: MediaRatio; video?: boolean; dark?: boolean; fill?: boolean }) {
  const Icon = video ? Video : ImageIcon;
  return <div className={`solution-media-placeholder ${dark ? 'is-dark' : ''} ${fill ? 'is-fill' : ''}`} style={fill ? undefined : { aspectRatio: mediaRatios[ratio].css }} role="img" aria-label={`${video ? 'Video' : 'Image'} placeholder, ${ratio}`}>
    <Icon size={28} strokeWidth={1.3} aria-hidden="true" />
    <span>{video ? 'Add your video' : 'Add your image'}</span>
    <small>{ratio} · {mediaRatios[ratio].size}</small>
  </div>;
}
