import { expect, it, vi } from 'vitest';
const findFirst = vi.hoisted(() => vi.fn());
vi.mock('../prisma', () => ({ prisma: { product: { findFirst } } }));
import { getPublishedProductById } from './products';
it('resolves the exact product ID and excludes unpublished products', async () => {
 findFirst.mockResolvedValue(null);
 expect(await getPublishedProductById('selected-product')).toBeNull();
 expect(findFirst).toHaveBeenCalledWith({ where: { id: 'selected-product', isDraft: false } });
});
