import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productsCarouselContentSchema } from "@/lib/validation/section-schemas";
import type { z } from "zod";

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
    handleSubmit,
    formState: { errors },
  } = useForm<ProductsCarouselData>({
    resolver: zodResolver(productsCarouselContentSchema),
    defaultValues: {
      heading: defaultValues?.heading || "Related Products",
      description: defaultValues?.description || "Explore the products that power this solution.",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Heading</label>
          <input
            {...register("heading")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
          />
          {errors.heading && (
            <p className="mt-1 text-sm text-red-600">{errors.heading.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register("description")}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
