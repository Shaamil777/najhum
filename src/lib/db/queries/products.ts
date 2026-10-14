import { prisma } from '../prisma';

export async function getPublishedProductById(id: string) {
  return prisma.product.findFirst({ where: { id, isDraft: false } });
}
