import type { Metadata, Viewport } from "next";
import { Outfit, Inter, Poppins } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["300", "400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700", "800", "900"] });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", display: "swap", weight: ["300", "400", "500", "600", "700"] });

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  keywords: [
    "Najhum Group",
    "Industrial IoT",
    "Enterprise IoT Platform",
    "EV Charging Solutions",
    "Smart Mobility",
    "Sustainability Platform",
    "Digital Infrastructure",
    "Smart City Solutions",
    "Dubai Technology Company",
  ],
  category: "Technology",
  authors: [{ name: "Najhum Group" }],
  creator: "Najhum Group",
  publisher: "Najhum Group",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: "",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@najhum",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${inter.variable} ${poppins.variable} antialiased font-sans scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans overflow-x-hidden selection:bg-neutral-900 selection:text-white" suppressHydrationWarning>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
