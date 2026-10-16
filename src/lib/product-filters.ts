export interface FilterableProduct { platforms?: string[]; category?: string; categoryId?: string; }
export function matchesProductCategory(product: FilterableProduct, category: string) {
  const key = category.toLowerCase();
  if (key === "all") return true;
  if (["iotrics", "evoltics", "cropifai"].includes(key)) return product.platforms?.some(platform => platform.toLowerCase() === key) ?? false;
  return product.category?.toLowerCase() === key || product.categoryId?.toLowerCase() === key;
}
