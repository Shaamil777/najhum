"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productCardSectionContentSchema } from "@/lib/validation/section-schemas";
import type { ProductCardSectionContent } from "@/types/section";
import { Package, Check, Tag } from "lucide-react";

interface ProductCardSectionFormProps {
  solutionId: string;
  defaultValues?: ProductCardSectionContent;
  onSubmit: (data: ProductCardSectionContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

interface ProductItem {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  platforms?: string[];
}

export default function ProductCardSectionForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProductCardSectionFormProps) {
  const [availableProducts, setAvailableProducts] = useState<ProductItem[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const methods = useForm<ProductCardSectionContent>({
    resolver: zodResolver(productCardSectionContentSchema),
    defaultValues: {
      eyebrow: defaultValues?.eyebrow || "Compatible Hardware",
      heading: defaultValues?.heading || "Field-Proven Platform Products",
      description: defaultValues?.description || "Explore connected edge appliances and devices engineered to power this architecture.",
      displayMode: defaultValues?.displayMode || "solution-tagged",
      productIds: defaultValues?.productIds || [],
      columns: defaultValues?.columns || 3,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const displayMode = watch("displayMode");
  const selectedProductIds = watch("productIds") || [];

  // Fetch products from database
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoadingProducts(true);
        const res = await fetch("/api/admin/products", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setAvailableProducts(data.products || []);
        }
      } catch (err) {
        console.error("Failed to load products for form:", err);
      } finally {
        setLoadingProducts(false);
      }
    }
    loadProducts();
  }, []);

  const toggleProduct = (id: string) => {
    if (selectedProductIds.includes(id)) {
      setValue(
        "productIds",
        selectedProductIds.filter((p) => p !== id),
        { shouldDirty: true }
      );
    } else {
      setValue("productIds", [...selectedProductIds, id], { shouldDirty: true });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-sans">
        
        {/* Header Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Eyebrow Tag
            </label>
            <input
              type="text"
              {...register("eyebrow")}
              placeholder="e.g. Compatible Hardware"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              {...register("heading")}
              placeholder="e.g. Featured Products"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={2}
            className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Display Mode & Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Product Source Mode
            </label>
            <select
              {...register("displayMode")}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="solution-tagged">Automatically tagged with this solution</option>
              <option value="all">All published products</option>
              <option value="manual">Pick specific products manually</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Grid Columns
            </label>
            <select
              {...register("columns", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns (Recommended)</option>
              <option value={4}>4 Columns</option>
            </select>
          </div>
        </div>

        {/* Manual Product Selection Picker (if manual selected) */}
        {displayMode === "manual" && (
          <div className="space-y-3 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
            <label className="block text-sm font-bold text-slate-900">
              Select Products to Display ({selectedProductIds.length} selected)
            </label>
            {loadingProducts ? (
              <p className="text-xs text-slate-400">Loading product list...</p>
            ) : availableProducts.length === 0 ? (
              <p className="text-xs text-slate-400">No products found in the catalog.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto p-1">
                {availableProducts.map((p) => {
                  const isChecked = selectedProductIds.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleProduct(p.id)}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? "border-blue-500 bg-blue-50/50 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isChecked ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300"
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-xs font-bold text-slate-900 truncate">
                          {p.name}
                        </span>
                        <span className="block text-[10px] text-slate-500 truncate">
                          {p.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Product Card Section"}
          </button>
        </div>

      </form>
    </FormProvider>
  );
}
