import 'dotenv/config';
import { readFile, writeFile, access, mkdir } from 'node:fs/promises';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import sanitizeHtml from 'sanitize-html';
const path = new URL('../database/content/journal-launch-articles.json', import.meta.url);
const originals = JSON.parse(await readFile(path, 'utf8'));
const imagePairs = [
  [['/solutions/details/industrial-materials.jpg','Conveyor carrying material through an industrial processing site.','Start with an asset and an operating question the team recognises.'],['/solutions/details/energy-metering.jpg','Electrical meters on industrial switchgear.','Record measurement units, locations, and responsibilities alongside the readings.']],
  [['/solutions/details/facility-water-systems.jpg','Facilities engineer inspecting pipework and pumps.','Connect water-system measurements to a clear investigation process.'],['/solutions/details/energy-metering.jpg','Meters installed on electrical distribution panels.','Use operating context to investigate unexpected equipment behaviour.']],
  [['/solutions/energy-monitoring.jpg','Engineer reviewing electrical switchgear in a plant room.','Choose metering boundaries that answer a defined operational question.'],['/solutions/details/energy-metering.jpg','Electrical meters with an engineer in the background.','Review readings against operating hours and the conditions recorded for the baseline.']],
  [['/solutions/details/hotel-ev-charging.jpg','Electric cars charging outside a hotel entrance.','The charging service should fit the way drivers use the site.'],['/solutions/expanded/ev-charging.jpg','Electric cars connected to charging stations under a shaded parking canopy.','Check the driver journey and support responsibilities before expanding.']],
  [['/images/cropifai/precision_farming.jpg','Soil probe connected to a field device between crop rows.','Select measurement locations and depths that suit the crop and soil.'],['/solutions/expanded/smart-irrigation.jpg','Irrigation infrastructure in a cultivated field.','Review irrigation events alongside field observations and the available measurements.']],
];
const prepared = originals.map((post,index) => {
  if (post.content.includes('<figure>')) return post;
  const headings = [...post.content.matchAll(/<h2>[\s\S]*?<\/h2>/g)].map(match=>match[0]);
  let content = post.content;
  [1,3].forEach((position,i) => {
    const [src,alt,caption] = imagePairs[index][i];
    const figure = `<figure><img src="${src}" alt="${alt}" loading="lazy"><figcaption>${caption}</figcaption></figure>\n`;
    content = content.replace(headings[position], figure + headings[position]);
  });
  return { ...post, content };
});
for (const pair of imagePairs) for (const [src] of pair) await access(new URL(`../public${src}`, import.meta.url));
let connectionString=process.env.DATABASE_URL;
if(connectionString?.startsWith('prisma+postgres://'))connectionString=JSON.parse(Buffer.from(new URL(connectionString).searchParams.get('api_key'),'base64').toString()).databaseUrl;
const pool=new pg.Pool({connectionString,connectionTimeoutMillis:10000});
const db=new PrismaClient({adapter:new PrismaPg(pool)});
const normalise = html => sanitizeHtml(html,{allowedTags:['p','h2','h3','h4','ul','ol','li','strong','em','blockquote','a','figure','img','figcaption'],allowedAttributes:{a:['href'],img:['src','alt']}}).replace(/\s+/g,' ').trim();
try {
 const records=await db.blogPost.findMany({where:{slug:{in:originals.map(post=>post.slug)}}});
 const backupDirectory = new URL('../work/blog-image-backups/', import.meta.url);
 await mkdir(backupDirectory, { recursive: true });
 await writeFile(new URL(`before-images-${Date.now()}.json`, backupDirectory),JSON.stringify(records.map(({id,slug,content,updatedAt,isDraft})=>({id,slug,content,updatedAt,isDraft})),null,2));
 const result=await db.$transaction(async tx=>{
  const changes=[];
  for(const record of records){
   if(record.content.includes('<figure>')) { changes.push({slug:record.slug,status:'preserved: inline images already present'});continue; }
   const index=originals.findIndex(post=>post.slug===record.slug);
   if(normalise(record.content)!==normalise(originals[index].content)){changes.push({slug:record.slug,status:'preserved: content differs from launch original'});continue;}
   const addedFigures = prepared[index].content.match(/<figure>[\s\S]*?<\/figure>/g);
   const headings=[...record.content.matchAll(/<h2>[\s\S]*?<\/h2>/g)].map(match=>match[0]);
   let content=record.content;[1,3].forEach((position,i)=>{content=content.replace(headings[position],addedFigures[i]+'\n'+headings[position]);});
   const updated=await tx.blogPost.updateMany({where:{id:record.id,content:record.content,updatedAt:record.updatedAt},data:{content}});
   changes.push({slug:record.slug,status:updated.count?'added two inline images':'preserved concurrent edit',isDraft:record.isDraft});
  }
  return changes;
 });
 await writeFile(path,JSON.stringify(prepared,null,2)+'\n');
 console.log(JSON.stringify(result,null,2));
} catch(error){console.error('Could not add supporting images:',error.code||error.name);process.exitCode=1;}
finally{await db.$disconnect();await pool.end();}
