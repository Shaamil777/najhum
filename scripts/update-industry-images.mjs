import 'dotenv/config';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
let connectionString = process.env.DATABASE_URL;
if (connectionString?.startsWith('prisma+postgres://')) { const key = new URL(connectionString).searchParams.get('api_key'); connectionString = JSON.parse(Buffer.from(key,'base64').toString()).databaseUrl; }
const pool = new pg.Pool({ connectionString });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
const patches = JSON.parse(await readFile(new URL('./industry-image-updates.json', import.meta.url), 'utf8'));
const apply = process.argv.includes('--apply');
try {
 await prisma.$queryRaw`SELECT 1`;
 const results = [];
 for (const slug of [...new Set(patches.map(patch => patch.slug))]) {
  results.push(await prisma.$transaction(async tx => {
   const solution = await tx.solution.findUniqueOrThrow({where:{slug},select:{id:true}});
   const draft = await tx.pageContent.findUnique({where:{slug:`__solution_builder__${solution.id}`}});
   if (!draft?.content?.document?.sections) return {slug,status:'no-builder-draft',changed:0};
   const content = structuredClone(draft.content);
   let changed = 0; const preserved = [];
   for (const patch of patches.filter(patch => patch.slug === slug)) {
    const section = content.document.sections.find(section => section.content.heading === patch.sectionHeading && section.content.layout === patch.layout);
    const target = patch.entryTitle ? section?.content.entries?.find(entry => entry.title === patch.entryTitle) : section?.content;
    if (target?.[patch.field] === patch.old) { target[patch.field] = patch.new; changed++; }
    else if (target?.[patch.field] !== patch.new) preserved.push(patch.entryTitle || patch.sectionHeading);
   }
   if (changed && apply) {
    const backup = new URL('../work/industry-import-backups/',import.meta.url);await mkdir(backup,{recursive:true});
    await writeFile(new URL(`${slug}-images-${Date.now()}.json`,backup),JSON.stringify(draft,null,2));
    content.version = Number(content.version || 0)+1;
    await tx.pageContent.update({where:{id:draft.id},data:{content}});
   }
   return {slug,status:apply?'applied':'preview',changed,preserved,version:apply?content.version:draft.content.version};
  },{isolationLevel:'Serializable',maxWait:30000,timeout:30000}));
 }
 console.log(JSON.stringify({mode:apply?'applied':'preview',results},null,2));
} finally {await prisma.$disconnect();await pool.end();}
