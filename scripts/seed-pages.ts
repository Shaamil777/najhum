import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

import { evolticsContent } from '../src/content/evoltics';
import { iotricsContent } from '../src/content/iotrics';
import { cropifaiContent } from '../src/content/cropifai';
import { aboutContent } from '../src/content/about';
import { demoContent } from '../src/content/demo';
import { defaultSolaasContent } from '../src/content/solaas';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database with generic page content...');

  const pages = [
    { slug: 'evoltics', title: 'Evoltics Platform', content: evolticsContent },
    { slug: 'iotrics', title: 'IoTRICS Platform', content: iotricsContent },
    { slug: 'cropifai', title: 'CropifAI Platform', content: cropifaiContent },
    { slug: 'about', title: 'About Us', content: aboutContent },
    { slug: 'demo', title: 'Request a Demo', content: demoContent },
    { slug: 'solaas', title: 'SolaaS', content: defaultSolaasContent }
  ];

  for (const page of pages) {
    if (!page.content) {
      console.log(`Skipping ${page.title}, no content found in .ts file.`);
      continue;
    }

    const existingPage = await prisma.pageContent.findUnique({
      where: { slug: page.slug }
    });

    if (existingPage) {
      await prisma.pageContent.update({
        where: { id: existingPage.id },
        data: {
          title: page.title,
          content: page.content as any
        }
      });
      console.log(`Updated page: ${page.title}`);
    } else {
      await prisma.pageContent.create({
        data: {
          slug: page.slug,
          title: page.title,
          content: page.content as any
        }
      });
      console.log(`Created page: ${page.title}`);
    }
  }

  console.log('Finished seeding generic pages!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
