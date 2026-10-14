"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productsCarouselContentSchema } from "@/lib/validation/section-schemas";
import type { z } from "zod";
import { 
  Package, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink 
} from "lucide-react";
import Link from "next/link";

type ProductsCarouselData = z.infer<typeof productsCarouselContentSchema>;

interface ProductsCarouselSectionFormProps {
  defaultValues?: Partial<ProductsCarouselData>;
  solutionId: string;
  onSubmit: (data: ProductsCarouselData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ProductsCarouselSectionForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}: ProductsCarouselSectionFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductsCarouselData>({
    resolver: zodResolver(productsCarouselContentSchema),
    defaultValues: {
      heading: defaultValues?.heading || "Compatible Ecosystem Hardware",
      description: defaultValues?.description || "Field-proven edge appliances and devices engineered specifically to power this solution.",
    },
  });

  const watchedValues = useWatch({ control });
  const headingVal = watchedValues?.heading || "";
  const descVal = watchedValues?.description || "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Banner Intro */}
      <div className="flex items-start gap-4 p-4 rounded-xl bg-[#4c3bcf]/5 border border-[#4c3bcf]/15">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4c3bcf] text-white shadow-sm">
          <Package className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900">
            Products & Hardware Carousel
          </h3>
          <p className="mt-1 text-xs text-gray-600 leading-relaxed">
            Automatically queries and displays all active hardware products tagged to this solution slug. You can customize the section headline and descriptive copy below.
          </p>
        </div>
      </div>

      <fieldset disabled={isLoading} className="space-y-6">
        <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-4">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center justify-between">
            <span>Carousel Header Configuration</span>
            <span className="text-xs font-normal text-gray-500">Strict word balance</span>
          </h4>

          {/* Heading */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700">
                Section Heading (Optional)
              </label>
              <span className={`text-[11px] font-mono ${headingVal.length > 60 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                {headingVal.length} / 100 chars (optimal: 20-50)
              </span>
            </div>
            <input
              type="text"
              {...register("heading")}
              maxLength={100}
              placeholder="e.g. Compatible Ecosystem Hardware"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none font-medium"
            />
            {errors.heading && (
              <p className="mt-1 text-xs text-red-600">{errors.heading.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700">
                Section Subtitle / Description (Optional)
              </label>
              <span className={`text-[11px] font-mono ${descVal.length > 180 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                {descVal.length} / 300 chars (optimal: 40-140)
              </span>
            </div>
            <textarea
              {...register("description")}
              rows={2}
              maxLength={300}
              placeholder="e.g. Field-proven edge appliances engineered specifically to power this solution."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none resize-none leading-relaxed"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Product Assignment Helper Box */}
        <div className="p-4 rounded-xl border border-dashed border-gray-300 bg-gray-50/70 flex items-center justify-between">
          <div>
            <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
              Manage Associated Hardware
            </h5>
            <p className="text-xs text-gray-500 mt-0.5">
              Assign products to this solution in the Products workspace to have them appear in this carousel.
            </p>
          </div>
          <Link
            href="/admin/products"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4c3bcf] hover:underline"
          >
            <span>Products Workspace</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#4c3bcf] hover:bg-[#3d2eb3] rounded-lg shadow-sm shadow-[#4c3bcf]/25 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Save Carousel Header
              </>
            )}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
