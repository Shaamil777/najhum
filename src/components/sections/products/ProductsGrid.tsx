"use client";

import { matchesProductCategory } from "@/lib/product-filters";
import { useState, useMemo } from "react";
import { Container } from "@/design-system/primitives/layout/Container";
import {
  ArrowRight, Search, ChevronDown,
  LayoutGrid, Radio, Router, Monitor, Box, HeadphonesIcon, Zap
} from "lucide-react";
import Link from "next/link";

export interface ProductItem {
  id: string | number;
  name: string;
  description: string;
  category?: string;
  categoryId?: string;
  imageUrl?: string | null;
  imageType?: string;
  platforms?: string[];
  solutions?: string[];
  brochureUrl?: string | null;
}

const fallbackProducts: ProductItem[] = [
  {
    id: "1",
    name: "NUO3 Oil Level Sensor",
    category: "SENSOR",
    categoryId: "Sensor",
    description: "Ultrasonic liquid level monitoring for fuel tanks and storage containers.",
    imageType: "sensor",
    platforms: ["iotrics"]
  },
  {
    id: "2",
    name: "Edge Router X1",
    category: "HARDWARE",
    categoryId: "Hardware",
    description: "High-performance enterprise networking solution for industrial telemetry.",
    imageType: "router",
    platforms: ["iotrics", "evoltics"]
  },
  {
    id: "3",
    name: "Data Insights Pro",
    category: "SOFTWARE",
    categoryId: "Software",
    description: "Advanced analytics platform for remote fleet monitoring.",
    imageType: "software",
    platforms: ["evoltics"]
  },
  {
    id: "4",
    name: "cropifAI Soil Probe Node",
    category: "SENSOR",
    categoryId: "Sensor",
    description: "Multi-depth volumetric soil moisture and temperature sensor node.",
    imageType: "square_sensor",
    platforms: ["cropifai"]
  },
  {
    id: "5",
    name: "AC Smart Wallbox 22kW",
    category: "HARDWARE",
    categoryId: "Hardware",
    description: "High-power connected smart AC charging station with OCPP 2.0.1.",
    imageType: "router",
    platforms: ["evoltics"]
  },
  {
    id: "6",
    name: "Gateway Hub IoT-500",
    category: "HARDWARE",
    categoryId: "Hardware",
    description: "LPWAN & Cellular industrial edge gateway.",
    imageType: "router",
    platforms: ["iotrics"]
  },
];

// Helper to render placeholder visuals based on imageType
const renderPlaceholder = (type?: string) => {
  switch (type) {
    case "sensor":
      return <div className="w-24 h-16 bg-neutral-800 rounded-md shadow-lg transform rotate-3"></div>;
    case "router":
      return (
        <div className="w-28 h-10 bg-neutral-800 rounded-sm shadow-md flex items-end justify-between px-2 pb-1 relative">
           <div className="absolute -top-6 left-4 w-1 h-6 bg-neutral-800"></div>
           <div className="absolute -top-6 right-4 w-1 h-6 bg-neutral-800"></div>
           <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        </div>
      );
    case "software":
      return (
        <div className="w-32 h-24 bg-white border border-neutral-200 rounded-md shadow-sm overflow-hidden flex flex-col">
           <div className="h-4 bg-neutral-800 w-full flex items-center px-1 gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
           </div>
           <div className="flex-1 bg-neutral-50 p-2 flex gap-2">
             <div className="w-1/3 h-full bg-neutral-200 rounded-sm"></div>
             <div className="w-2/3 h-full flex flex-col gap-1">
               <div className="w-full h-8 bg-blue-100 rounded-sm"></div>
               <div className="w-full flex-1 bg-neutral-100 rounded-sm"></div>
             </div>
           </div>
        </div>
      );
    case "square_sensor":
      return <div className="w-20 h-20 bg-neutral-100 border border-neutral-200 rounded-xl shadow-inner flex items-center justify-center text-neutral-400 font-bold text-xl">N</div>;
    default:
      return (
        <div className="w-20 h-20 bg-blue-50/80 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
          <Box className="w-8 h-8" />
        </div>
      );
  }
};

interface ProductsGridProps {
  initialProducts?: ProductItem[];
}

export default function ProductsGrid({ initialProducts }: ProductsGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc">("name-asc");

  const allProducts = useMemo(() => {
    if (initialProducts && initialProducts.length > 0) {
      return initialProducts;
    }
    return fallbackProducts;
  }, [initialProducts]);

  // Dynamic Categories calculation
  const categories = useMemo(() => {
    const list = [
      { name: "All Products", icon: LayoutGrid, id: "All" },
      { name: "IoTRICs", icon: Radio, id: "iotrics" },
      { name: "EVOLTICS", icon: Zap, id: "evoltics" },
      { name: "cropifAI", icon: Router, id: "cropifai" },
      { name: "Hardware", icon: Box, id: "Hardware" },
      { name: "Software", icon: Monitor, id: "Software" },
    ];

    return list.map(cat => {
      const count = allProducts.filter(product => matchesProductCategory(product, cat.id)).length;
      return { ...cat, count };
    });
  }, [allProducts]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Category filter
    if (activeCategory !== "All") result = result.filter(product => matchesProductCategory(product, activeCategory));

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    return [...result].sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
  }, [allProducts, activeCategory, searchQuery, sortBy]);

  const activeCategoryName = categories.find(c => c.id === activeCategory)?.name || "All Products";

  return (
    <section className="w-full bg-white py-12 lg:py-20 font-sans">
      <Container size="full" className="px-4 lg:px-12 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">

          {/* Left Sidebar */}
          <div className="w-full lg:w-[260px] shrink-0 flex flex-col gap-10">
            {/* Categories */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4 px-3">
                Categories & Platforms
              </h3>
              <ul className="flex flex-col gap-1.5">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <li key={cat.id}>
                      <button
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-neutral-400"}`} />
                          <span>{cat.name}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? "bg-blue-100 text-blue-700 font-bold" : "bg-neutral-100 text-neutral-500"}`}>
                          {cat.count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Need Help Card */}
            <div className="bg-[#f8faff] rounded-2xl p-6 border border-blue-50 flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <HeadphonesIcon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-neutral-900 mb-1">Need Help?</h4>
              <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
                Connect with our platform engineering team to find the right hardware & architecture.
              </p>
              <Link href="/contact" className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                Contact Us <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1">

            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  {activeCategoryName}
                </h2>
                <p className="text-neutral-500 text-sm mt-1">
                  Discover production-grade industrial equipment and connected platforms.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full md:w-[220px] pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "name-asc" | "name-desc")}
                    className="appearance-none pl-3 pr-8 py-2 bg-white border border-neutral-200 rounded-lg text-xs font-medium text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="name-asc">Sort: A-Z</option>
                    <option value="name-desc">Sort: Z-A</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <span className="text-xs text-neutral-400 font-medium ml-1">{filteredProducts.length} Products</span>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const productUrl = `/products/${product.id}`;
                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Image Area */}
                      <div className="w-full h-44 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 mb-4 overflow-hidden relative">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          renderPlaceholder(product.imageType)
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1">
                        <h3 className="text-base font-bold text-neutral-900 mb-1.5 leading-snug group-hover:text-blue-600 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-neutral-500 text-xs leading-relaxed mb-5 line-clamp-2 flex-1">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mt-auto">
                          <Link
                            href={productUrl}
                            className="text-blue-600 text-xs font-bold hover:underline"
                          >
                            Explore Product
                          </Link>

                          <Link
                            href={productUrl}
                            aria-label={`Explore ${product.name}`}
                            className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                <p className="text-neutral-500 text-sm mb-2">No products found matching your filter.</p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="text-blue-600 hover:underline font-semibold text-xs"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </div>
        </div>
      </Container>
    </section>
  );
}
