export function isSafeLink(value: string) {
  return /^\/(?!\/)/.test(value) && !/[\\\s]/.test(value) || /^#[^\s]*$/.test(value) || /^(https?:|mailto:|tel:)/i.test(value) && URL.canParse(value);
}
export function isSafeMediaUrl(value: string) {
  return /^\/(?!\/)/.test(value) && !/[\\\s]/.test(value) || /^https?:\/\//i.test(value) && URL.canParse(value);
}
export function embedVideoUrl(source: string, value: string): string | null {
  try {
    const url = new URL(value);
    if (source === 'youtube' && ['youtube.com', 'www.youtube.com', 'youtu.be', 'www.youtube-nocookie.com'].includes(url.hostname)) {
      const id = url.hostname === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1];
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (source === 'vimeo' && ['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'].includes(url.hostname)) {
      const id = url.pathname.match(/(?:\/video)?\/(\d+)$/)?.[1];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch { /* Not an embeddable video link. */ }
  return null;
}
