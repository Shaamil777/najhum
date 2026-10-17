import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

async function generateOpenGraphImage() {
  const width = 1200;
  const height = 630;
  const logoPath = path.join(rootDir, "public/logo/logo.png");

  // Read and resize logo with high quality
  const logoBuffer = await sharp(logoPath)
    .resize({ width: 340, height: 92, fit: "inside" })
    .toBuffer();

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background linear gradient -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="45%" stop-color="#f8fbff" />
        <stop offset="100%" stop-color="#edf4fc" />
      </linearGradient>

      <!-- Glow gradients -->
      <radialGradient id="glowTopRight" cx="90%" cy="10%" r="58%">
        <stop offset="0%" stop-color="#2563eb" stop-opacity="0.14" />
        <stop offset="45%" stop-color="#38bdf8" stop-opacity="0.06" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="glowBottomLeft" cx="8%" cy="92%" r="48%">
        <stop offset="0%" stop-color="#0284c7" stop-opacity="0.10" />
        <stop offset="60%" stop-color="#60a5fa" stop-opacity="0.03" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </radialGradient>

      <!-- Grid pattern -->
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563eb" stroke-opacity="0.045" stroke-width="1"/>
      </pattern>

      <!-- Card gradients -->
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#f8fafc" stop-opacity="0.88" />
      </linearGradient>
      
      <!-- Headline gradient -->
      <linearGradient id="titleBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#167de4" />
        <stop offset="100%" stop-color="#0284c7" />
      </linearGradient>

      <!-- Filter for subtle dropshadow -->
      <filter id="shadow" x="-5%" y="-10%" width="115%" height="130%">
        <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.06" />
      </filter>
    </defs>

    <!-- Base Background -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />

    <!-- Ambient Glows -->
    <rect width="${width}" height="${height}" fill="url(#glowTopRight)" />
    <rect width="${width}" height="${height}" fill="url(#glowBottomLeft)" />

    <!-- Technical Grid Pattern -->
    <rect width="${width}" height="${height}" fill="url(#grid)" />

    <!-- Decorative Orbital Rings (Top-Right) -->
    <circle cx="1060" cy="110" r="160" fill="none" stroke="#2563eb" stroke-opacity="0.08" stroke-width="1.5" stroke-dasharray="6 6" />
    <circle cx="1060" cy="110" r="240" fill="none" stroke="#2563eb" stroke-opacity="0.05" stroke-width="1.5" />
    <circle cx="1060" cy="110" r="320" fill="none" stroke="#2563eb" stroke-opacity="0.03" stroke-width="1.5" stroke-dasharray="10 8" />

    <!-- Outer Framing Border -->
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="24" fill="none" stroke="#cbd5e1" stroke-opacity="0.65" stroke-width="1.5" />

    <!-- Top Right Location & Industry Badge -->
    <g transform="translate(730, 78)">
      <rect x="0" y="0" width="398" height="40" rx="20" fill="#ffffff" fill-opacity="0.9" stroke="#bfdbfe" stroke-width="1.2" filter="url(#shadow)" />
      <circle cx="24" cy="20" r="5" fill="#10b981" />
      <circle cx="24" cy="20" r="9" fill="#10b981" fill-opacity="0.25" />
      <text x="42" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="700" fill="#1e40af" letter-spacing="1">DUBAI · UAE | CONNECTED INFRASTRUCTURE</text>
    </g>

    <!-- Category Eyebrow -->
    <g transform="translate(72, 212)">
      <rect x="0" y="-12" width="28" height="3" rx="1.5" fill="#167de4" />
      <text x="38" y="-6" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="#167de4" letter-spacing="2.2">NEXT-GEN DIGITAL EXCELLENCE</text>
    </g>

    <!-- Main Headline -->
    <g transform="translate(72, 270)">
      <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="800" font-size="52" fill="#091426" letter-spacing="-1.5">
        <tspan x="0" y="0">Intelligent Connected</tspan>
        <tspan x="0" y="60" fill="url(#titleBlueGrad)">Infrastructure &amp; IoT Solutions.</tspan>
      </text>
    </g>

    <!-- Subtitle / Mission Statement -->
    <g transform="translate(72, 382)">
      <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="19" font-weight="400" fill="#475569" letter-spacing="-0.2">
        <tspan x="0" y="0">Regional enterprise technology empowering smart buildings, industrial telemetry,</tspan>
        <tspan x="0" y="27">EV mobility charging networks, and precision climate agriculture.</tspan>
      </text>
    </g>

    <!-- Three Platform Cards (IoTRICs, EVOLTICS, cropifAI) -->
    <g transform="translate(72, 452)">
      <!-- Card 1: IoTRICs -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="330" height="74" rx="14" fill="url(#cardGrad)" stroke="#bfdbfe" stroke-width="1.2" filter="url(#shadow)" />
        <rect x="14" y="14" width="46" height="46" rx="10" fill="#eff6ff" stroke="#dbeafe" stroke-width="1" />
        <!-- IoTRICs Radio/Telemetry Icon -->
        <g transform="translate(25, 25)" stroke="#1d4ed8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M4.93 19.07A10 10 0 0 1 12 2a10 10 0 0 1 7.07 17.07" />
          <path d="M7.76 16.24A6 6 0 0 1 12 6a6 6 0 0 1 4.24 10.24" />
          <circle cx="12" cy="18" r="1.5" fill="#1d4ed8" />
        </g>
        <text x="72" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="700" font-size="17" fill="#0f172a">IoTRICs</text>
        <text x="72" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="500" font-size="12" fill="#64748b">Industrial IoT &amp; Telemetry</text>
      </g>

      <!-- Card 2: EVOLTICS -->
      <g transform="translate(362, 0)">
        <rect x="0" y="0" width="330" height="74" rx="14" fill="url(#cardGrad)" stroke="#bfdbfe" stroke-width="1.2" filter="url(#shadow)" />
        <rect x="14" y="14" width="46" height="46" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1" />
        <!-- EVOLTICS Lightning Bolt Icon -->
        <g transform="translate(25, 25)" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#10b981" fill-opacity="0.15">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </g>
        <text x="72" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="700" font-size="17" fill="#0f172a">EVOLTICS</text>
        <text x="72" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="500" font-size="12" fill="#64748b">Smart EV Charging CSMP</text>
      </g>

      <!-- Card 3: cropifAI -->
      <g transform="translate(724, 0)">
        <rect x="0" y="0" width="332" height="74" rx="14" fill="url(#cardGrad)" stroke="#bfdbfe" stroke-width="1.2" filter="url(#shadow)" />
        <rect x="14" y="14" width="46" height="46" rx="10" fill="#ecfeff" stroke="#a5f3fc" stroke-width="1" />
        <!-- cropifAI Sprout / AgriTech Icon -->
        <g transform="translate(25, 25)" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#06b6d4" fill-opacity="0.15">
          <path d="M7 20h10" />
          <path d="M10 20c0-5 2-8 7-8" />
          <path d="M17 12c-3-3-3-7 0-9 3 2 4 6 0 9Z" />
          <path d="M14 14c-2.5-2.5-6-2.5-8 0 2 2.5 5.5 2.5 8 0Z" />
        </g>
        <text x="72" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="700" font-size="17" fill="#0f172a">cropifAI</text>
        <text x="72" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="500" font-size="12" fill="#64748b">Precision AgriTech AI</text>
      </g>
    </g>

    <!-- Bottom Footer Bar -->
    <g transform="translate(72, 566)">
      <line x1="0" y1="0" x2="1056" y2="0" stroke="#e2e8f0" stroke-width="1" />
      <text x="0" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">
        in5 Innovation Centre · Dubai Design District · UAE
      </text>
      <text x="1056" y="24" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="15" font-weight="700" fill="#167de4">
        najhumgroup.com ↗
      </text>
    </g>
  </svg>
  `;

  const svgBuffer = Buffer.from(svg);

  // Composite SVG with the logo
  const finalImage = await sharp(svgBuffer)
    .composite([
      {
        input: logoBuffer,
        top: 72,
        left: 72,
      },
    ])
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  // Save to public/og-image.png and public/opengraph-image.png
  const publicOgPath = path.join(rootDir, "public/og-image.png");
  const publicOpengraphPath = path.join(rootDir, "public/opengraph-image.png");

  await fs.writeFile(publicOgPath, finalImage);
  await fs.writeFile(publicOpengraphPath, finalImage);

  console.log(`Successfully generated:
- ${publicOgPath} (${finalImage.length} bytes)
- ${publicOpengraphPath} (${finalImage.length} bytes)`);
}

generateOpenGraphImage().catch(console.error);
