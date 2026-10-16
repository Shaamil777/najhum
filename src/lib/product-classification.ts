import catalogue from "@/content/brochure-products.json";

interface ProductRecord { name: string; platforms: string[]; details?: unknown; }
/** The brochure catalogue corrects legacy blanket platform tags without changing the stored record. */
export function getProductClassification(product: ProductRecord) {
  const details = product.details && typeof product.details === "object" && !Array.isArray(product.details) ? product.details as Record<string, unknown> : {};
  const model = typeof details.model === "string" ? details.model.trim().toLowerCase() : "";
  const match = catalogue.find(item => item.name.toLowerCase() === product.name.toLowerCase() || (model && item.details?.model?.toLowerCase() === model));
  const explicitCategory = typeof details.category === "string" ? details.category : typeof details.type === "string" ? details.type : undefined;
  return { platforms: match?.platforms || product.platforms, category: explicitCategory || (match ? "Hardware" : "Other") };
}
