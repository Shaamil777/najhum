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

  let product = null;
  try {
    product = await prisma.product.findFirst({
      where: {
        OR: [
          { id: slug },
          { name: { equals: decoded.replace(/-/g, " "), mode: "insensitive" } },
          { name: { equals: decoded, mode: "insensitive" } },
        ],
      },
    });
  } catch (err) {
    console.error("Failed to query product for metadata:", err);
  }

  if (!product) {
    return {
      title: "Product Overview | Najhum",
    };
  }

  return {
    title: `${product.name} | Najhum Products`,
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

  if (!dbProduct) {
    notFound();
  }

  // Parse features and details from DB only (no mock defaults)
  const rawFeatures = dbProduct.features;
  const featuresList = Array.isArray(rawFeatures)
    ? rawFeatures.filter((f): f is string => typeof f === "string" && f.trim() !== "")
    : [];

  const rawDetails = (dbProduct.details && typeof dbProduct.details === "object")
    ? (dbProduct.details as Record<string, unknown>)
    : {};

  const specsList = Array.isArray(rawDetails.specs)
    ? (rawDetails.specs as Array<{ property: string; value: string; unit: string; remarks: string }>)
    : [];

  const applicationsList = Array.isArray(rawDetails.applications)
    ? rawDetails.applications.filter((a): a is string => typeof a === "string" && a.trim() !== "")
    : [];

  const overviewText = typeof rawDetails.overview === "string" && rawDetails.overview.trim() !== ""
    ? rawDetails.overview
    : "";

  const productData = {
    id: dbProduct.id,
    name: dbProduct.name,
    model: dbProduct.platforms?.[0]?.toUpperCase() || "Industrial Equipment",
    shortDesc: dbProduct.description,
    images: dbProduct.imageUrl ? [dbProduct.imageUrl] : [],
    brochureUrl: dbProduct.brochureUrl,
    overview: overviewText,
    features: featuresList,
    specs: specsList,
    applications: applicationsList,
    environment: [],
    reliability: [],
    downloads: [],
  };

  return <ProductDetailClient product={productData} />;
}
