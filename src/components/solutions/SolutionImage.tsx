import Image from 'next/image';
import { isSafeMediaUrl } from '@/lib/utils/content-url';
import { isPlaceholderMedia, mediaRatios, type MediaRatio } from '@/lib/builder/media';
import MediaPlaceholder from './MediaPlaceholder';

export default function SolutionImage({ src, alt, ratio = '16:9', dark = false, fill = false }: { src?: string; alt: string; ratio?: MediaRatio; dark?: boolean; fill?: boolean }) {
  return <div className={`solution-card-media ${fill ? 'is-fill' : ''}`} style={fill ? undefined : { aspectRatio: mediaRatios[ratio].css }}>
    {isPlaceholderMedia(src) || !isSafeMediaUrl(src!) ? <MediaPlaceholder ratio={ratio} dark={dark} fill /> : <Image src={src!} alt={alt.replace(/<[^>]*>/g, '')} fill unoptimized className="object-cover" sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" />}
  </div>;
}
