"use client";

import { useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { heroContentSchema } from "@/lib/validation/section-schemas";
import type { HeroContent } from "@/types/section";
import { ImageUploadField } from "@/components/admin/ui/ImageUploadField";
import { 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Layers, 
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Image from "next/image";

interface HeroSectionFormProps {
  solutionId: string;
  defaultValues?: HeroContent;
  onSubmit: (data: HeroContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function HeroSectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: HeroSectionFormProps) {
  const [showPreview, setShowPreview] = useState(true);

  const methods = useForm<HeroContent>({
    resolver: zodResolver(heroContentSchema),
    defaultValues: {
      heading: defaultValues?.heading || "",
      subheading: defaultValues?.subheading || "",
      badge: defaultValues?.badge || "",
      backgroundImage: defaultValues?.backgroundImage || "",
      ctaText: defaultValues?.ctaText || "Get Started",
      ctaLink: defaultValues?.ctaLink || "/contact",
      secondaryCtaText: defaultValues?.secondaryCtaText || "",
      secondaryCtaLink: defaultValues?.secondaryCtaLink || "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const watchedValues = useWatch({ control });
  const headingVal = watchedValues.heading || "";
  const subheadingVal = watchedValues.subheading || "";
  const bgImgVal = watchedValues.backgroundImage || "";
  const ctaTextVal = watchedValues.ctaText || "Get Started";
  const ctaLinkVal = watchedValues.ctaLink || "#";
  const secCtaTextVal = watchedValues.secondaryCtaText || "";
  const secCtaLinkVal = watchedValues.secondaryCtaLink || "";

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Banner Intro */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-[#4c3bcf]/5 border border-[#4c3bcf]/15">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4c3bcf] text-white shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                Hero Section Configuration
              </h3>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4c3bcf] hover:text-[#3d2eb3] bg-white px-2.5 py-1 rounded-md border border-[#4c3bcf]/20 shadow-xs transition-colors"
              >
                {showPreview ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> Hide Preview
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Show Live Preview
                  </>
                )}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-600 leading-relaxed">
              The high-impact opening banner of the solution. Keep headlines punchy (under 80 characters recommended) for optimal visual balance and symmetry.
            </p>
          </div>
        </div>

        {/* Live Mini Preview Box */}
        {showPreview && (
          <div className="rounded-xl border border-gray-800 bg-neutral-950 text-white overflow-hidden shadow-xl">
            <div className="px-4 py-2 border-b border-white/10 bg-neutral-900/80 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Preview (Scaled)
              </span>
              <span className="text-[11px] text-neutral-500">Dark luxury viewport</span>
            </div>

            <div className="relative p-6 sm:p-10 flex flex-col items-center justify-center text-center overflow-hidden min-h-[260px]">
              {/* Preview Background */}
              {bgImgVal && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={bgImgVal}
                    alt=""
                    fill
                    className="object-cover opacity-25"
                    unoptimized
                  />
                </div>
              )}

              {/* Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/25 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-transparent to-neutral-950/90 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 max-w-xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight leading-tight line-clamp-3 text-white">
                  {headingVal || "Headline text will appear here"}
                </h2>

                <p className="mt-2 text-xs text-neutral-300 line-clamp-3 max-w-md mx-auto leading-relaxed">
                  {subheadingVal || "Supporting description of the solution with clear benefits and enterprise capabilities."}
                </p>

                <div className="flex items-center justify-center gap-2.5 mt-5">
                  <span className="inline-flex items-center gap-1 bg-primary text-white text-[11px] font-semibold px-3 py-1.5 rounded-md shadow-sm">
                    {ctaTextVal}
                    <ArrowRight className="w-3 h-3" />
                  </span>

                  {secCtaTextVal && (
                    <span className="inline-flex items-center text-white border border-white/20 bg-white/10 text-[11px] font-medium px-3 py-1.5 rounded-md">
                      {secCtaTextVal}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <fieldset disabled={isLoading} className="space-y-6">
          {/* Heading & Subheading */}
          <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center justify-between">
              <span>Headline & Description</span>
              <span className="text-xs font-normal text-gray-500">Strict word balance enabled</span>
            </h4>

            {/* Heading */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-700">
                  Main Headline <span className="text-red-500">*</span>
                </label>
                <span className={`text-[11px] font-mono ${headingVal.length > 90 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                  {headingVal.length} / 150 chars (optimal: 40-80)
                </span>
              </div>
              <input
                type="text"
                {...register("heading")}
                maxLength={150}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none font-medium"
                placeholder="e.g. REVOLUTIONIZE INDUSTRIAL INFRASTRUCTURE WITH AI"
              />
              {errors.heading && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.heading.message}
                </p>
              )}
            </div>

            {/* Subheading */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-700">
                  Supporting Subheading <span className="text-red-500">*</span>
                </label>
                <span className={`text-[11px] font-mono ${subheadingVal.length > 220 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                  {subheadingVal.length} / 350 chars (optimal: 80-180)
                </span>
              </div>
              <textarea
                {...register("subheading")}
                rows={3}
                maxLength={350}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none resize-none leading-relaxed"
                placeholder="Provide a concise 2-3 line value proposition explaining the key advantages and capabilities."
              />
              {errors.subheading && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.subheading.message}
                </p>
              )}
            </div>
          </div>

          {/* Background Image Upload */}
          <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">
              Hero Background Media
            </h4>
            <p className="text-xs text-gray-500">
              Upload high-resolution landscape images directly to Cloudflare R2 storage. Automatic darkening overlays guarantee high text legibility.
            </p>
            <ImageUploadField
              name="backgroundImage"
              label="Background Image"
              solutionId={solutionId}
              currentImageUrl={defaultValues?.backgroundImage}
            />
          </div>

          {/* Call to Action Buttons */}
          <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">
              Action Buttons & Conversion Links
            </h4>

            {/* Primary CTA */}
            <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4c3bcf]">
                  Primary Button (Required)
                </span>
                <span className="text-[11px] font-mono text-gray-400">
                  {ctaTextVal.length} / 40 chars
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Button Label <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("ctaText")}
                    maxLength={40}
                    placeholder="e.g. Get Started"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none"
                  />
                  {errors.ctaText && (
                    <p className="mt-1 text-xs text-red-600">{errors.ctaText.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Destination URL or Anchor <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("ctaLink")}
                    placeholder="e.g. /contact or #features"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none"
                  />
                  {errors.ctaLink && (
                    <p className="mt-1 text-xs text-red-600">{errors.ctaLink.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Secondary CTA */}
            <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
                  Secondary Button (Optional)
                </span>
                <span className="text-[11px] font-mono text-gray-400">
                  {secCtaTextVal.length} / 40 chars
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    {...register("secondaryCtaText")}
                    maxLength={40}
                    placeholder="e.g. View Architecture or Learn More"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none"
                  />
                  {errors.secondaryCtaText && (
                    <p className="mt-1 text-xs text-red-600">{errors.secondaryCtaText.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Destination URL or Anchor
                  </label>
                  <input
                    type="text"
                    {...register("secondaryCtaLink")}
                    placeholder="e.g. #architecture or /platforms"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none"
                  />
                  {errors.secondaryCtaLink && (
                    <p className="mt-1 text-xs text-red-600">{errors.secondaryCtaLink.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
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
                  Save Hero Section
                </>
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </FormProvider>
  );
}
