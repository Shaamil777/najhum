import { formatPublicCopy, formatPublicText } from "@/lib/public-copy";
import { notFound } from "next/navigation";
import { getPublishedProductBySlug } from "@/lib/published-product";
import { buildMetadata, pageSchema, plainSeoText, absoluteSiteUrl } from "@/lib/seo";
import { generateSlug } from "@/lib/utils/slug";
import StructuredData from "@/components/seo/StructuredData";
import ProductDetailClient from "@/components/products/ProductDetailClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);
  if (!product) return buildMetadata({title:"Product not found",description:"This product is not available.",path:`/products/${encodeURIComponent(slug)}`,noIndex:true});
  return buildMetadata({title:formatPublicText(product.name),description:formatPublicText(product.description),path:`/products/${generateSlug(product.name)||product.id}`,image:product.imageUrl,keywords:[formatPublicText(product.name),...product.platforms,"IoT hardware UAE","industrial sensors","Najhum products"]});
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const dbProduct = await getPublishedProductBySlug(slug);

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

  const additionalImages = Array.isArray(rawDetails.images)
    ? rawDetails.images.filter((img): img is string => typeof img === "string" && img.trim() !== "")
    : [];

  const allImages = Array.from(
    new Set([dbProduct.imageUrl, ...additionalImages].filter((img): img is string => Boolean(img && img.trim() !== "")))
  );

  const modelCode = typeof rawDetails.model === "string" && rawDetails.model.trim() !== ""
    ? rawDetails.model.trim()
    : dbProduct.platforms?.[0]?.toUpperCase() || "Industrial Equipment";

  const productData = {
    id: dbProduct.id,
    name: dbProduct.name,
    model: modelCode,
    shortDesc: dbProduct.description,
    images: allImages,
    brochureUrl: dbProduct.brochureUrl,
    overview: overviewText,
    features: featuresList,
    specs: specsList,
    applications: applicationsList,
    environment: [],
    reliability: [],
    downloads: [],
  };

  const seo = {title:formatPublicText(dbProduct.name),description:formatPublicText(dbProduct.description),path:`/products/${generateSlug(dbProduct.name)||dbProduct.id}`};
  return <><StructuredData data={pageSchema(seo,[],{"@type":"Product",name:seo.title,description:plainSeoText(seo.description),...(allImages.length?{image:allImages.map(image=>absoluteSiteUrl(image))}:{}),model:modelCode,brand:{"@type":"Brand",name:"Najhum"}})} /><ProductDetailClient product={formatPublicCopy(productData)} /></>;
}
