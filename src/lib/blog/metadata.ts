import { absoluteSiteUrl, buildMetadata, type PageSeo } from '@/lib/seo';
// Respect explicitly authored SEO titles and avoid labelling uploaded JPEG/WebP images as PNG.
export function blogMetadata(seo: PageSeo) {
    const metadata = buildMetadata(seo);
    return { ...metadata, title: { absolute: seo.title },
        openGraph: { ...metadata.openGraph, title: seo.title, ...(seo.image ? { images: [{ url: absoluteSiteUrl(seo.image), alt: seo.title }] } : {}) },
        twitter: { ...metadata.twitter, title: seo.title },
    };
}
