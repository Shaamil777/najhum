import 'dotenv/config';
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import assert from 'node:assert/strict';
const manifestPath = new URL('../database/content/blog-generated-images.json',import.meta.url);
const manifest = JSON.parse(await readFile(manifestPath,'utf8'));
const originalPath = new URL('../database/content/journal-launch-articles.json',import.meta.url);
for (const article of manifest.articles) assert.equal(article.images.length,3,'Each article needs a cover and two supporting images.');
const originals = JSON.parse(await readFile(originalPath,'utf8'));
for (const article of manifest.articles) for (const image of article.images) await access(new URL(`../public${image.path}`,import.meta.url));
function updateContent(content, images) {
 return content.replace(/<img\b[^>]*>/gi, tag => {
  const src=tag.match(/\bsrc=["']([^"']*)["']/i)?.[1];
  const image=images.find(image=>image.role!=='cover' && image.previousPath===src);
  if(!image) return tag;
  const updated=tag.replace(/\bsrc=(["']).*?\1/i,`src="${image.path}"`);
  return /\balt=["']/i.test(updated) ? updated.replace(/\balt=(["']).*?\1/i,`alt="${image.alt}"`) : updated.replace(/>$/,` alt="${image.alt}">`);
 });
}
let connectionString=process.env.DATABASE_URL;
if(connectionString?.startsWith('prisma+postgres://')) connectionString=JSON.parse(Buffer.from(new URL(connectionString).searchParams.get('api_key'),'base64').toString()).databaseUrl;
const pool=new pg.Pool({connectionString,connectionTimeoutMillis:10000}); const db=new PrismaClient({adapter:new PrismaPg(pool)});
try {
 const posts=await db.blogPost.findMany({where:{slug:{in:manifest.articles.map(article=>article.slug)}}});
 if(!process.argv.includes('--apply')) { console.log(JSON.stringify({mode:'preview',articles:posts.map(post=>({slug:post.slug,isDraft:post.isDraft,images:manifest.articles.find(article=>article.slug===post.slug).images.length}))},null,2)); }
 else {
  const backup=new URL('../work/blog-image-backups/',import.meta.url);await mkdir(backup,{recursive:true});await writeFile(new URL(`before-generated-${Date.now()}.json`,backup),JSON.stringify(posts,null,2));
  const changes=await db.$transaction(async tx=>{
   const changes=[];
   for(const post of posts){
    const article=manifest.articles.find(article=>article.slug===post.slug),cover=article.images.find(image=>image.role==='cover');
    const content=updateContent(post.content,article.images);
    assert.equal(content.replace(/<img\b[^>]*>/gi,''),post.content.replace(/<img\b[^>]*>/gi,''),'Article writing must remain unchanged.');
    const replaceCover=post.coverImage===cover.previousPath;
    const data={...(content!==post.content?{content}:{}),...(replaceCover?{coverImage:cover.path,coverAlt:cover.alt}:{}),...(post.ogImage===cover.previousPath?{ogImage:cover.path}:{})};
    if(!Object.keys(data).length){changes.push({slug:post.slug,status:'already applied or custom images preserved'});continue;}
    const result=await tx.blogPost.updateMany({where:{id:post.id,updatedAt:post.updatedAt},data});
    if(result.count!==1) throw new Error(`Concurrent edit: ${post.slug}. No articles changed; rerun to retry.`);
    changes.push({slug:post.slug,status:'images updated',isDraft:post.isDraft,publishedAt:post.publishedAt});
   }
   return changes;
  });
  const prepared=originals.map(post=>{const article=manifest.articles.find(article=>article.slug===post.slug);if(!article)return post;const cover=article.images.find(image=>image.role==='cover');return {...post,content:updateContent(post.content,article.images),...(post.coverImage===cover.previousPath?{coverImage:cover.path,coverAlt:cover.alt}:{}),...(post.ogImage===cover.previousPath?{ogImage:cover.path}:{})};});
  await writeFile(originalPath,JSON.stringify(prepared,null,2)+'\n');console.log(JSON.stringify(changes,null,2));
 }
}finally{await db.$disconnect();await pool.end();}
