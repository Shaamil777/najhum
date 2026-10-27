import { permanentRedirect } from 'next/navigation';
export default async function BlogRedirect({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { permanentRedirect(`/blogs/${encodeURIComponent((await params).slug)}`); }
