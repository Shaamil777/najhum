import type { NextConfig } from "next";

let r2PublicUrl: URL | undefined;
if (process.env.R2_PUBLIC_URL) {
  try {
    const raw = process.env.R2_PUBLIC_URL.trim();
    if (raw) {
      const formatted = raw.startsWith('http://') || raw.startsWith('https://') ? raw : `https://${raw}`;
      r2PublicUrl = new URL(formatted);
    }
  } catch {
    r2PublicUrl = undefined;
  }
}

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      ...(r2PublicUrl ? [{
        protocol: r2PublicUrl.protocol.replace(':', '') as 'http' | 'https',
        hostname: r2PublicUrl.hostname,
        port: r2PublicUrl.port,
        pathname: `${r2PublicUrl.pathname.replace(/\/$/, '')}/**`,
      }] : []),
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
