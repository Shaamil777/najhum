import type { NextConfig } from "next";

const r2PublicUrl = process.env.R2_PUBLIC_URL ? new URL(process.env.R2_PUBLIC_URL) : undefined;

const nextConfig: NextConfig = {
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
