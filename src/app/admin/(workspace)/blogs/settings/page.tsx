import BlogSettingsForm from '@/components/admin/blogs/BlogSettingsForm';
import { getBlogSettings } from '@/lib/blog/server';
export const metadata = { title: 'Journal page & SEO settings' };
export default async function Settings() {
    try {
        return <BlogSettingsForm initialData={await getBlogSettings()}/>;
    }
    catch {
        return <div className="blog-admin-notice error" role="alert">Could not load blog settings. Apply database/blog.sql in Supabase if this is your first setup, then reload.</div>;
    }
}
