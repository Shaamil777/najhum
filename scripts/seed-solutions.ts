import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { evolticsContent } from '../src/content/evoltics';
import { iotricsContent } from '../src/content/iotrics';
import { cropifaiContent } from '../src/content/cropifai';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database with Evoltics, IoTRICS, and CropifAI content...');

  const pages = [
    { slug: 'evoltics', title: 'Evoltics', content: evolticsContent },
    { slug: 'iotrics', title: 'IoTRICS', content: iotricsContent },
    { slug: 'cropifai', title: 'CropifAI', content: cropifaiContent }
  ];

  for (const page of pages) {
    // Check if solution exists
    let solution = await prisma.solution.findUnique({
      where: { slug: page.slug }
    });

    if (!solution) {
      solution = await prisma.solution.create({
        data: {
          slug: page.slug,
          title: page.title,
          isDraft: false,
        }
      });
      console.log(`Created solution: ${page.title}`);
    } else {
      console.log(`Solution already exists: ${page.title}`);
    }

    // Upsert a CUSTOM section to hold the raw page data for now
    // We'll use the CUSTOM type since we don't have a RAW_JSON type yet
    const existingSections = await prisma.section.findMany({
      where: { solutionId: solution.id, type: 'CUSTOM' }
    });

    if (existingSections.length === 0) {
      await prisma.section.create({
        data: {
          solutionId: solution.id,
          type: 'CUSTOM',
          order: 0,
          isDraft: false,
          content: {
            heading: `${page.title} Data`,
            bodyHtml: 'This section holds the structured data. Do not edit HTML directly.',
            rawData: page.content // We inject the raw object here
          }
        }
      });
      console.log(`Created CUSTOM data section for ${page.title}`);
    } else {
      await prisma.section.update({
        where: { id: existingSections[0].id },
        data: {
          content: {
            heading: `${page.title} Data`,
            bodyHtml: 'This section holds the structured data. Do not edit HTML directly.',
            rawData: page.content
          }
        }
      });
      console.log(`Updated CUSTOM data section for ${page.title}`);
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
