"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { videoSectionContentSchema } from "@/lib/validation/section-schemas";
import type { VideoSectionContent } from "@/types/section";
import { ImageUploadField } from "@/components/admin/ui/ImageUploadField";
import { Video, Play, ExternalLink } from "lucide-react";

interface VideoSectionFormProps {
  solutionId: string;
  defaultValues?: VideoSectionContent;
  onSubmit: (data: VideoSectionContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function VideoSectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: VideoSectionFormProps) {
  const methods = useForm<VideoSectionContent>({
    resolver: zodResolver(videoSectionContentSchema),
    defaultValues: {
      eyebrow: defaultValues?.eyebrow || "Live Demonstration",
      heading: defaultValues?.heading || "See The Architecture In Action",
      subheading: defaultValues?.subheading || "Watch our turnkey telemetry and deployment framework in real-world scenarios.",
      videoUrl: defaultValues?.videoUrl || "",
      posterUrl: defaultValues?.posterUrl || "",
      layout: defaultValues?.layout || "contained",
      caption: defaultValues?.caption || "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const watchedVideoUrl = watch("videoUrl");

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
              placeholder="e.g. Demonstration"
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
              placeholder="e.g. Platform Live Walkthrough"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Subheading
          </label>
          <textarea
            {...register("subheading")}
            rows={2}
            placeholder="Brief explanation of what the video demonstrates..."
            className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Video URL Input */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <label className="block text-sm font-semibold text-slate-900">
            Video Source URL <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-slate-500">
            Supports YouTube URLs (e.g. <code>https://youtube.com/watch?v=...</code>), Vimeo URLs, or direct MP4/WebM storage links.
          </p>
          <div className="relative">
            <input
              type="text"
              {...register("videoUrl")}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.videoUrl && (
            <p className="text-xs text-red-600">{errors.videoUrl.message}</p>
          )}
        </div>

        {/* Poster / Thumbnail Image */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <label className="block text-sm font-semibold text-slate-900">
            Custom Video Poster Thumbnail (Optional)
          </label>
          <ImageUploadField
            name="posterUrl"
            label="Upload Poster Image"
            solutionId={solutionId}
            currentImageUrl={defaultValues?.posterUrl}
          />
          <input
            type="text"
            {...register("posterUrl")}
            placeholder="Or direct poster image URL"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Layout & Caption */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Player Layout
            </label>
            <select
              {...register("layout")}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="contained">Contained (Rounded container)</option>
              <option value="cinema">Cinema (Edge-to-edge dark)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Bottom Caption (Optional)
            </label>
            <input
              type="text"
              {...register("caption")}
              placeholder="e.g. Filmed at Dexiko Testbed Lab"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

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
            {isLoading ? "Saving..." : "Save Video Section"}
          </button>
        </div>

      </form>
    </FormProvider>
  );
}
