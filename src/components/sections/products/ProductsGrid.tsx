"use client";

import { useState } from "react";
import { Container } from "@/design-system/primitives/layout/Container";
import { 
  ArrowRight, Search, ChevronDown, 
  LayoutGrid, Radio, Router, Monitor, Settings, Box, HeadphonesIcon 
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "All Products", icon: LayoutGrid, count: 24, id: "All" },
  { name: "Sensors", icon: Radio, count: 8, id: "Sensor" },
  { name: "Network Devices", icon: Router, count: 6, id: "Hardware" },
  { name: "Software", icon: Monitor, count: 4, id: "Software" },
  { name: "Services", icon: Settings, count: 3, id: "Services" },
  { name: "Accessories", icon: Box, count: 3, id: "Accessories" },
];

const dummyProducts = [
  { 
    id: 1, 
    name: "NUO3 Oil Level Sensor", 
    category: "SENSOR", 
    categoryId: "Sensor",
    description: "Ultrasonic liquid level monitoring for fuel tanks and storage containers.", 
    imageType: "sensor" 
  },
  { 
    id: 2, 
    name: "Edge Router X1", 
    category: "HARDWARE", 
    categoryId: "Hardware",
    description: "High-performance enterprise networking solution.", 
    imageType: "router" 
  },
  { 
    id: 3, 
    name: "Data Insights Pro", 
    category: "SOFTWARE", 
    categoryId: "Software",
    description: "Advanced analytics platform for your business needs.", 
    imageType: "software" 
  },
  { 
    id: 4, 
    name: "Cloud Migration", 
    category: "SERVICES", 
    categoryId: "Services",
    description: "Seamless transition to cloud infrastructure.", 
    imageType: "cloud" 
  },
  { 
    id: 5, 
    name: "Mounting Kit", 
    category: "ACCESSORIES", 
    categoryId: "Accessories",
    description: "Complete installation accessories.", 
    imageType: "cable" 
  },
  { 
    id: 6, 
    name: "Temperature Sensor", 
    category: "SENSOR", 
    categoryId: "Sensor",
    description: "Reliable temperature monitoring.", 
    imageType: "square_sensor" 
  },
];

// Helper to render placeholder visuals based on imageType
const renderPlaceholder = (type: string) => {
  switch (type) {
    case "sensor":
      return <div className="w-24 h-16 bg-neutral-800 rounded-md shadow-lg transform rotate-3"></div>;
    case "router":
      return (
        <div className="w-28 h-10 bg-neutral-800 rounded-sm shadow-md flex items-end justify-between px-2 pb-1 relative">
           <div className="absolute -top-6 left-4 w-1 h-6 bg-neutral-800"></div>
           <div className="absolute -top-6 right-4 w-1 h-6 bg-neutral-800"></div>
           <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
      );
    case "software":
      return (
        <div className="w-32 h-24 bg-white border border-neutral-200 rounded-md shadow-sm overflow-hidden flex flex-col">
           <div className="h-4 bg-neutral-800 w-full flex items-center px-1 gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
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
    case "cloud":
      return (
        <div className="text-blue-200">
           <svg width="80" height="60" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
             <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1332 20.177 10.2104 17.8687 10.0245C17.382 6.62143 14.4752 4 11 4C7.13401 4 4 7.13401 4 11C4 11.2335 4.01142 11.4645 4.03362 11.6917C2.2821 12.2981 1 13.9877 1 16C1 18.2091 2.79086 20 5 20H17.5V19Z"/>
           </svg>
        </div>
      );
    case "cable":
      return (
        <div className="w-20 h-20 border-[6px] border-neutral-800 rounded-full opacity-90 transform -rotate-12 scale-y-75"></div>
      );
    case "square_sensor":
      return <div className="w-20 h-20 bg-neutral-100 border border-neutral-200 rounded-xl shadow-inner flex items-center justify-center text-neutral-300 font-bold text-xl">N</div>;
    default:
      return <div className="w-20 h-20 bg-neutral-200 rounded-md"></div>;
  }
}

export default function ProductsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? dummyProducts 
    : dummyProducts.filter(p => p.categoryId === activeCategory);

  const activeCategoryName = categories.find(c => c.id === activeCategory)?.name || "All Products";

  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <Container size="full" className="px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-[260px] shrink-0 flex flex-col gap-10">
            {/* Categories */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4 px-3">Categories</h3>
              <ul className="flex flex-col gap-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <li key={cat.id}>
                      <button
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive 
                            ? "bg-[#eef2ff] text-primary" 
                            : "text-neutral-600 hover:bg-neutral-50 hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-neutral-500"}`} />
                          <span>{cat.name}</span>
                        </div>
                        <span className={`text-xs ${isActive ? "text-primary/70 font-semibold" : "text-neutral-400"}`}>
                          {cat.count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Need Help Card */}
            <div className="bg-[#f8faff] rounded-2xl p-6 flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary mb-4">
                <HeadphonesIcon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-foreground mb-2">Need Help?</h4>
              <p className="text-sm text-muted mb-4 leading-relaxed">
                Our team is here to help you find the right solution.
              </p>
              <Link href="/contact" className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline">
                Contact Us <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1">
            
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {activeCategoryName}
                </h2>
                <p className="text-muted text-sm">
                  Discover our complete product lineup.
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full md:w-[220px] pl-9 pr-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="relative">
                  <select className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer">
                    <option>Sort by</option>
                    <option>Name (A-Z)</option>
                    <option>Name (Z-A)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <span className="text-xs text-muted font-medium ml-2">{filteredProducts.length} Results</span>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group bg-white rounded-2xl p-6 border border-neutral-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    
                    {/* Top Tag */}
                    <div className="mb-4">
                       <span className="inline-block px-2.5 py-1 bg-[#eef2ff] text-primary text-[10px] font-bold tracking-wider uppercase rounded-md">
                         {product.category}
                       </span>
                    </div>

                    {/* Image Area */}
                    <div className="w-full h-40 flex items-center justify-center mb-6">
                       {renderPlaceholder(product.imageType)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col flex-1 mt-auto">
                      <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-muted text-xs leading-relaxed mb-6 flex-1">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Link 
                          href={`/products/${product.id}`}
                          className="text-primary text-sm font-semibold flex items-center gap-1.5 hover:underline"
                        >
                          Learn More <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        
                        <Link 
                          href={`/products/${product.id}`} 
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f8faff] text-primary group-hover:bg-primary group-hover:text-white transition-colors"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full py-24 flex flex-col items-center justify-center text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                <p className="text-muted mb-2">No products found in this category.</p>
                <button 
                  onClick={() => setActiveCategory("All")}
                  className="text-primary hover:underline font-medium text-sm"
                >
                  Clear Filters
                </button>
              </div>
            )}

          </div>
        </div>
      </Container>
    </section>
  );
}