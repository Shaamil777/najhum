"use client";
import PlatformCardCarousel from './PlatformCardCarousel';

const dummyProducts = [
  {
    id: 1,
    title: "AC Home Charger 7kW",
    category: "Residential",
    desc: "Smart, compact, and reliable AC charging for home use.",
    imagePlaceholder: "bg-slate-50",
  },
  {
    id: 2,
    title: "DC Fast Charger 60kW",
    category: "Commercial",
    desc: "High-speed charging solution for commercial fleets and public spaces.",
    imagePlaceholder: "bg-slate-50",
  },
  {
    id: 3,
    title: "Ultra-Fast DC 120kW",
    category: "Highway",
    desc: "Premium rapid charging for highway rest stops and heavy-duty EVs.",
    imagePlaceholder: "bg-slate-50",
  },
  {
    id: 4,
    title: "Fleet Management Node",
    category: "Enterprise",
    desc: "Centralized hardware node for managing multi-charger load balancing.",
    imagePlaceholder: "bg-slate-50",
  },
  {
    id: 5,
    title: "Cloud CSMP Gateway",
    category: "Software",
    desc: "Edge computing gateway connecting offline chargers to the cloud securely.",
    imagePlaceholder: "bg-slate-50",
  },
];

interface CarouselProduct {
  id: string | number;
  name?: string;
  title?: string;
  category?: string | null;
  description?: string | null;
  desc?: string;
  imageUrl?: string | null;
  imagePlaceholder?: string;
}

interface PlatformProductsCarouselProps {
  products?: CarouselProduct[];
  title?: string;
  eyebrow?: string;
  description?: string;
}

function formatProductTitle(str: string): string {
  if (!str) return "";
  if (/[a-z]/.test(str)) return str;

  const acronyms = new Set([
    "AI", "UV/IR", "GPS", "BLE", "IOT", "AC", "DC", "OCPP", "IP67", 
    "NTS600", "NT321", "NTGW4", "NT6000", "NQT02", "NUO3"
  ]);

  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      const upper = word.toUpperCase();
      if (acronyms.has(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export default function PlatformProductsCarousel({ products = dummyProducts, title, description = "Cutting-edge hardware built for reliability and scale." }: PlatformProductsCarouselProps) {
  const items = products.map(product => {
    const name = product.name || product.title || '';
    const slug = (product as { slug?: string }).slug || encodeURIComponent(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) || String(product.id);
    return { id: product.id, title: formatProductTitle(name), description: product.description || product.desc, imageUrl: product.imageUrl, imagePlaceholder: product.imagePlaceholder, href: `/products/${slug}` };
  });
  return <PlatformCardCarousel items={items} itemLabel="product" title={title || <>Explore Our <br className="hidden sm:block"/><span className="text-primary font-bold">Product Range</span></>} description={description}/>;
}
