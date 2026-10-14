import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import ProductDetailClient from "@/components/products/ProductDetailClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);

  const product = await prisma.product.findFirst({
    where: {
      OR: [
        { id: slug },
        { name: { equals: decoded.replace(/-/g, " "), mode: "insensitive" } },
        { name: { equals: decoded, mode: "insensitive" } },
      ],
    },
  });

  if (!product) {
    return {
      title: "Product Overview | Dexiko",
    };
  }

  return {
    title: `${product.name} | Dexiko Products`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);

  // Attempt to find product in database
  let dbProduct = null;
  try {
    dbProduct = await prisma.product.findFirst({
      where: {
        OR: [
          { id: slug },
          { name: { equals: decoded.replace(/-/g, " "), mode: "insensitive" } },
          { name: { equals: decoded, mode: "insensitive" } },
        ],
      },
    });
  } catch (err) {
    console.error("Failed to query product:", err);
  }

  // Default fallback specs and applications for hardware products
  const defaultSpecs = [
    { property: "Enclosure", value: "Industrial Aluminum", unit: "-", remarks: "IP65 rated" },
    { property: "Operating Temp", value: "-40 to +75", unit: "°C", remarks: "Industrial grade" },
    { property: "Power Input", value: "9 - 36", unit: "V DC", remarks: "Reverse polarity protected" },
    { property: "Connectivity", value: "Cellular / Ethernet / LoRa", unit: "-", remarks: "Global bands" },
  ];

  const defaultApplications = [
    "Industrial IoT Telemetry & Edge Control",
    "Energy Infrastructure & Smart Grid Automation",
    "Smart Agriculture & Precision Soil Monitoring",
    "EV Charging Network Monitoring & Load Management",
  ];

  if (!dbProduct) {
    // If not in DB, use standard default presentation
    const fallback = {
      id: slug,
      name: decoded.replace(/-/g, " "),
      model: "Industrial Hardware",
      shortDesc: "High-performance industrial connected hardware built for mission-critical industrial applications.",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
      ],
      brochureUrl: null,
      overview: "Designed for demanding deployment environments, this solution delivers robust connectivity, hardware-grade security, and seamless telemetry streaming into cloud dashboards.",
      features: [
        "Industrial-grade reliability and low-power edge compute.",
        "Secure cloud integration with end-to-end data encryption.",
        "Ruggedized enclosure suited for harsh outdoor environments.",
        "Remote OTA firmware updates and health monitoring.",
      ],
      specs: defaultSpecs,
      applications: defaultApplications,
      environment: [
        { label: "Operating Temp", value: "-40°C to +75°C" },
        { label: "Ingress Protection", value: "IP65 Rating" },
      ],
      reliability: ["MIL-STD-810G compliant", "MTBF > 250,000 hours"],
      downloads: [],
    };

    return <ProductDetailClient product={fallback} />;
  }

  // Parse features and details from JSON
  const featuresList = Array.isArray(dbProduct.features)
    ? (dbProduct.features as string[])
    : [
        "Industrial-grade edge computing and sensor integration.",
        "Continuous telemetry logging and cloud synchronization.",
        "Over-the-air firmware updates and diagnostics.",
      ];

  const productData = {
    id: dbProduct.id,
    name: dbProduct.name,
    model: dbProduct.platforms?.[0]?.toUpperCase() || "Industrial Equipment",
    shortDesc: dbProduct.description,
    images: dbProduct.imageUrl
      ? [dbProduct.imageUrl]
      : ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"],
    brochureUrl: dbProduct.brochureUrl,
    overview: dbProduct.description,
    features: featuresList,
    specs: defaultSpecs,
    applications: defaultApplications,
    environment: [
      { label: "Operating Temp", value: "-40°C to +75°C" },
      { label: "Ingress Protection", value: "IP65 Rating" },
    ],
    reliability: ["MIL-STD-810G compliant", "MTBF > 250,000 hours"],
    downloads: [],
  };

  return <ProductDetailClient product={productData} />;
}
