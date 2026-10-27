import { ArrowUpRight, ArrowLeft, ArrowRight, Plus, Pencil, Eye, Settings2 } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import type { Prisma } from '@prisma/client';
import DeletePostButton from '@/components/admin/blogs/DeletePostButton';
export const metadata = { title: 'Journal workspace | Najhum' };
export default async function BlogsAdmin({ searchParams }: {
    searchParams: Promise<{
        q?: string;
        status?: string;
        page?: string;
    }>;
}) {
    const params = await searchParams;
    const q = (params.q || '').slice(0, 150);
    const status = params.status || 'all';
    const page = Math.max(1, Math.min(10000, Number.parseInt(params.page || '1') || 1));
    let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
    let counts = [0, 0, 0];
    let total = 0;
    let unavailable = false;
    try {
        const where: Prisma.BlogPostWhereInput = { ...(status === 'draft' ? { isDraft: true } : status === 'published' ? { isDraft: false } : {}), ...(q ? { title: { contains: q, mode: 'insensitive' } } : {}) };
        [posts, counts, total] = await Promise.all([prisma.blogPost.findMany({ where, orderBy: { updatedAt: 'desc' }, take: 20, skip: (page - 1) * 20 }), Promise.all([prisma.blogPost.count(), prisma.blogPost.count({ where: { isDraft: false } }), prisma.blogPost.count({ where: { isDraft: true } })]), prisma.blogPost.count({ where })]);
    }
    catch {
        unavailable = true;
    }
    const pageUrl = (value: number) => `/admin/blogs?${new URLSearchParams({ q, status, page: String(value) })}`;
    return <div className="blog-admin"><header className="blog-admin-head"><div><p className="blog-admin-eyebrow">The editorial desk</p><h1>A space for your ideas.</h1><p className="blog-admin-subtitle">Create perspectives, refine your stories, and share what comes next.</p></div><div className="blog-admin-actions"><Link href="/blogs" className="blog-admin-button" target="_blank">View journal <ArrowUpRight size={16}/></Link><Link href="/admin/blogs/settings" className="blog-admin-button"><Settings2 size={16}/>Page design & SEO</Link><Link href="/admin/blogs/new" className="blog-admin-button primary"><Plus size={16}/>New article</Link></div></header><div className="blog-admin-stats">{['All articles', 'Published', 'Drafts'].map((name, index) => <div className="blog-admin-stat" key={name}><span>{name}</span><strong>{unavailable ? '—' : counts[index]}</strong></div>)}</div>{unavailable ? <div className="blog-admin-notice error" role="alert">Could not load the journal. If this is the first setup, run database/blog.sql in Supabase, then reload. Otherwise check your database connection.</div> : <section className="blog-admin-panel"><form className="blog-admin-filter" action="/admin/blogs"><label className="sr-only" htmlFor="admin-blog-search">Search article titles</label><input id="admin-blog-search" type="text" name="q" defaultValue={q} placeholder="Find an article…"/><label className="sr-only" htmlFor="admin-blog-status">Publication status</label><select id="admin-blog-status" name="status" defaultValue={status}><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Drafts</option></select><button className="blog-admin-button" type="submit">Filter</button></form>{posts.length ? <><div className="overflow-x-auto"><table className="blog-admin-table"><thead><tr><th>Story</th><th>Status</th><th>Last edited</th><th>Actions</th></tr></thead><tbody>{posts.map(post => <tr key={post.id}><td><Link href={`/admin/blogs/${post.id}/edit`}>{post.title}</Link><small>{post.category} · {post.author}{post.featured ? ' · Featured' : ''}</small></td><td><span className={`blog-admin-badge ${post.isDraft ? '' : 'published'}`}>{post.isDraft ? 'Draft' : 'Published'}</span></td><td>{post.updatedAt.toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' })}</td><td><div className="blog-admin-actions"><Link className="blog-admin-button" href={`/admin/blogs/${post.id}/edit`}><Pencil size={15}/>Edit</Link><Link className="blog-admin-button" href={`/admin/blogs/${post.id}/preview`} target="_blank"><Eye size={16}/>Preview</Link><DeletePostButton id={post.id} title={post.title}/></div></td></tr>)}</tbody></table></div><nav aria-label="Admin article pages" className="blog-admin-actions mt-5">{page > 1 && <Link className="blog-admin-button" href={pageUrl(page - 1)}><ArrowLeft size={16}/>Previous</Link>}<span className="blog-admin-help">Page {page} of {Math.max(1, Math.ceil(total / 20))}</span>{page * 20 < total && <Link className="blog-admin-button" href={pageUrl(page + 1)}>Next <ArrowRight size={16}/></Link>}</nav></> : <div className="blog-admin-empty"><span className="blog-admin-eyebrow">Your journal starts here</span><h2>{q || status !== 'all' ? 'No matching articles.' : 'Make room for a great story.'}</h2><p>{q || status !== 'all' ? 'Change your filters to explore more articles.' : 'Start with a draft. Add your perspective. Publish when you are ready.'}</p><Link className="blog-admin-button primary" href="/admin/blogs/new">Create an article <ArrowUpRight size={16}/></Link></div>}</section>}</div>;
}
