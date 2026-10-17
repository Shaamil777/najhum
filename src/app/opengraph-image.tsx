import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Najhum Technologies LLC — Intelligent connected infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const image = await readFile(path.join(process.cwd(), "public/og-image.png"));
  return new Response(image, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

