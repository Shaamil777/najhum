/** Formatting for published database copy; stable keys and URLs are left untouched. */
export function formatPublicText(text: string): string {
  const parts = text.split(/(https?:\/\/[^\s"'<>]+|["']\/[^"']+["'])/g);
  return parts.map((part, index) => {
    if (index % 2) return part;
    return part.replace(/\biotrics\b/gi, "IoTRICs").replace(/\bevoltics\b/gi, "EVOLTICS").replace(/\bcropifai\b/gi, "cropifAI")
      .replace(/\b(optimization|optimize|optimized|optimizing|centralized|monetize)\b/gi, word => {
        const uk = ({ optimization: "optimisation", optimize: "optimise", optimized: "optimised", optimizing: "optimising", centralized: "centralised", monetize: "monetise" } as Record<string, string>)[word.toLowerCase()];
        return word === word.toUpperCase() ? uk.toUpperCase() : word[0] === word[0].toUpperCase() ? uk[0].toUpperCase() + uk.slice(1) : uk;
      });
  }).join("");
}
export function formatPublicCopy<T>(value: T, key = ""): T {
  if (/^(id|slug|type|model|platforms|solutions|icon|iconName|className|_design)$|url|href|image|link|src/i.test(key)) return value;
  if (typeof value === "string") return (value.startsWith("/") || value.startsWith("http") ? value : formatPublicText(value)) as T;
  if (Array.isArray(value)) return value.map(item => formatPublicCopy(item)) as T;
  if (value && typeof value === "object" && !(value instanceof Date)) return Object.fromEntries(Object.entries(value).map(([k,v]) => [k, formatPublicCopy(v,k)])) as T;
  return value;
}
