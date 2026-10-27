import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync, writeFileSync } from 'node:fs';
vi.mock('next/navigation', () => ({ useRouter: () => ({ refresh() { }, replace() { } }) }));
const db = vi.hoisted(() => ({ posts: vi.fn(), count: vi.fn() }));
vi.mock('@/lib/db/prisma', () => ({ prisma: { blogPost: { findMany: db.posts, count: db.count } } }));
vi.mock('@/lib/blog/server', async () => {
    const { blogSettingsSchema } = await import('@/lib/blog/schema');
    return { publicBlogWhere: { isDraft: false, publishedAt: { not: null } }, getBlogSettings: async () => blogSettingsSchema.parse({}) };
});
import BlogsPage from '@/app/(website)/blogs/page';
import BlogEditor from '@/components/admin/blogs/BlogEditor';
import BlogArticle from './BlogArticle';
import { blogInputSchema } from '@/lib/blog/schema';
const sample = {
    id: 'visual-test', slug: 'visual-test', title: 'A clearer view of connected infrastructure.',
    excerpt: 'From individual signals to shared understanding. A perspective on the systems that help people make better decisions.',
    content: '<h2>Start with the right questions.</h2><p>Connected systems create value when people can see what matters. A well-designed platform makes that understanding accessible, useful, and easy to act on.</p><blockquote>Better decisions begin with a clearer perspective.</blockquote><p>This is a temporary visual verification fixture, never stored in the application database.</p>',
    author: 'Editorial team', category: 'Connected systems', coverImage: '', coverAlt: '', seoTitle: '', seoDescription: '', ogImage: '', tags: ['Technology'], noIndex: false, featured: true, isDraft: false,
    publishedAt: new Date('2026-10-27'), createdAt: new Date('2026-10-27'), updatedAt: new Date('2026-10-27'),
};
const target = process.env.BLOG_VISUAL_DIR;
function save(name: string, body: string, css: string) {
    if (!target)
        return;
    writeFileSync(`${target}/${name}.html`, `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;background:#f4f7fa}a{color:inherit;text-decoration:none}button,input,textarea,select{font:inherit}input,button{border:0;background:transparent}button{cursor:pointer}h1,h2,p{margin:0}header.preview-nav{height:78px;background:white;display:flex;align-items:center;justify-content:space-between;padding:0 5%;position:absolute;width:100%;border-bottom:1px solid #dde7ef;color:#102d46}header.preview-nav strong{font-size:23px;letter-spacing:-1px}header.preview-nav span{font-size:12px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}.mt-5{margin-top:20px}.mb-4{margin-bottom:16px}.mb-5{margin-bottom:20px}.mt-3{margin-top:12px}.mt-8{margin-top:32px}.flex{display:flex}.items-center{align-items:center}.justify-between{justify-content:space-between}.block{display:block}${css}</style></head><body>${body}</body></html>`);
}
describe('journal presentation', () => {
    it('renders real article links, search, category filters and pagination without dummy fallbacks', async () => {
        db.posts.mockImplementation(({ distinct }) => Promise.resolve(distinct ? [{ category: sample.category }] : [sample, ...['Energy systems in perspective.', 'Designing for the people behind the data.', 'Growing with connected intelligence.'].map((title, i) => ({ ...sample, id: String(i), slug: `visual-${i}`, title, featured: false }))]));
        db.count.mockResolvedValue(4);
        const html = renderToStaticMarkup(await BlogsPage({ searchParams: Promise.resolve({}) }));
        expect(html).toContain('/blogs/visual-test');
        expect(html).toContain('Article categories');
        expect(html).toContain('Search articles');
        expect(html).not.toContain('Subscribe Now');
        expect(html).not.toContain('journal-feature');
        expect(html.match(/class="journal-card"/g)).toHaveLength(4);
        const css = readFileSync(new URL('./blog.css', import.meta.url), 'utf8');
        save('blog-design', '<header class="preview-nav"><strong>najhum.</strong><span>Platforms　 Solutions　 Products　 Journal　 About</span></header>' + html, css);
        const articleHtml = renderToStaticMarkup(<BlogArticle post={sample}/>);
        expect(articleHtml).toContain('Table of contents');
        expect(articleHtml).toContain('href="#article-section-1"');
        save('blog-article-design', articleHtml, css);
        const editorCss = readFileSync(new URL('../admin/blogs/blog-admin.css', import.meta.url), 'utf8');
        save('blog-editor-design', '<main style="padding:36px;max-width:1450px;margin:auto">' + renderToStaticMarkup(<BlogEditor id={sample.id} initialData={blogInputSchema.parse(sample)}/>) + '</main>', editorCss);
    });
    it('shows an honest empty state with no sample stories', async () => {
        db.posts.mockResolvedValue([]);
        db.count.mockResolvedValue(0);
        const html = renderToStaticMarkup(await BlogsPage({ searchParams: Promise.resolve({}) }));
        expect(html).toContain('A new perspective is on its way.');
        expect(html).not.toContain('/blog/1');
    });
});
