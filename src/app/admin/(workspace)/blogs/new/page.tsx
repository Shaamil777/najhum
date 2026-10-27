import BlogEditor from '@/components/admin/blogs/BlogEditor';
import { blogInputSchema } from '@/lib/blog/schema';
export const metadata = { title: 'New journal article' };
export default function NewArticle() {
    const defaults = blogInputSchema.parse({ title: 'Untitled article', slug: 'untitled-article' });
    return <BlogEditor initialData={{ ...defaults, title: '', slug: '' }}/>;
}
