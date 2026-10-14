"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageSectionContentSchema } from "@/lib/validation/section-schemas";
import type { ImageSectionContent } from "@/types/section";
import { ImageUploadField } from "@/components/admin/ui/ImageUploadField";
import { Image as ImageIcon, Layout, Eye } from "lucide-react";

interface ImageSectionFormProps {
  solutionId: string;
  defaultValues?: ImageSectionContent;
  onSubmit: (data: ImageSectionContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ImageSectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: ImageSectionFormProps) {
  const methods = useForm<ImageSectionContent>({
    resolver: zodResolver(imageSectionContentSchema),
    defaultValues: {
      eyebrow: defaultValues?.eyebrow || "",
      heading: defaultValues?.heading || "",
      description: defaultValues?.description || "",
      imageUrl: defaultValues?.imageUrl || "",
      altText: defaultValues?.altText || "",
      caption: defaultValues?.caption || "",
      layout: defaultValues?.layout || "contained",
      aspectRatio: defaultValues?.aspectRatio || "16:9",
      rounded: defaultValues?.rounded ?? true,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const watchedImageUrl = watch("imageUrl");

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Header Text Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Eyebrow Tag (Optional)
            </label>
            <input
              type="text"
              {...register("eyebrow")}
              placeholder="e.g. Visual Overview"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Heading (Optional)
            </label>
            <input
              type="text"
              {...register("heading")}
              placeholder="e.g. High-Resolution Architecture Blueprint"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            {...register("description")}
            rows={2}
            placeholder="Add explanatory context below the heading..."
            className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload Area */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
          <label className="block text-sm font-semibold text-slate-900">
            Showcase Image <span className="text-red-500">*</span>
          </label>

          <ImageUploadField
            name="imageUrl"
            label="Upload Section Image"
            solutionId={solutionId}
            currentImageUrl={defaultValues?.imageUrl}
          />

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Or Direct Image URL
            </label>
            <input
              type="text"
              {...register("imageUrl")}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.imageUrl && (
              <p className="mt-1 text-xs text-red-600">{errors.imageUrl.message}</p>
            )}
          </div>
        </div>

        {/* Layout & Aspect Ratio */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Layout Style
            </label>
            <select
              {...register("layout")}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="contained">Contained (Default)</option>
              <option value="card">Card with Border</option>
              <option value="full-width">Full Width Banner</option>
              <option value="split-left">Split Text Left / Image Right</option>
              <option value="split-right">Split Image Left / Text Right</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Aspect Ratio
            </label>
            <select
              {...register("aspectRatio")}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="16:9">16:9 Landscape</option>
              <option value="4:3">4:3 Standard</option>
              <option value="21:9">21:9 Ultrawide</option>
              <option value="auto">Auto Height</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Alt Text
            </label>
            <input
              type="text"
              {...register("altText")}
              placeholder="Describe image for SEO"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Caption */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Image Caption (Optional overlay/tag)
          </label>
          <input
            type="text"
            {...register("caption")}
            placeholder="e.g. End-to-end edge compute architecture diagram"
            className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Live Preview */}
        {watchedImageUrl && (
          <div className="p-3 bg-slate-100 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Image Preview
            </span>
            <div className="max-h-48 overflow-hidden rounded-lg bg-white border border-slate-200">
              <img src={watchedImageUrl} alt="Preview" className="w-full h-44 object-cover" />
            </div>
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
            {isLoading ? "Saving..." : "Save Image Section"}
          </button>
        </div>

      </form>
    </FormProvider>
  );
}
