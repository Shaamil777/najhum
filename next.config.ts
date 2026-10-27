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
  async redirects() {
    return [
      { source: "/portfolio/:path*", destination: "/", permanent: false },
      { source: "/platforms", destination: "/", permanent: false },
      { source: "/platfoms", destination: "/", permanent: false },
      { source: "/images/elvotics/:path*", destination: "/images/evoltics/:path*", permanent: true },
      { source: "/images/evoltics/cpmsDahsboard.jpeg", destination: "/images/evoltics/cpms-dashboard.jpeg", permanent: true },
      { source: "/images/iotrics/dashboardiortics.webp", destination: "/images/iotrics/dashboard-iotrics.webp", permanent: true },
      { source: "/images/cropify/:path*", destination: "/images/cropifai/:path*", permanent: true },
      { source: "/images/cropifai/dashboardcropify.webp", destination: "/images/cropifai/dashboard-cropifai.webp", permanent: true },
      { source: "/images/performancce.webp", destination: "/images/performance.webp", permanent: true },
      { source: "/logo/elvotics_logo/:path*", destination: "/logo/evoltics/:path*", permanent: true },
    ];
  },
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
      {
        protocol: "https",
        hostname: "**.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
