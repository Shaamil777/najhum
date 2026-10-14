"use client";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { featuresContentSchema } from "@/lib/validation/section-schemas";
import type { FeaturesContent } from "@/types/section";
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Cpu,
  Layers
} from "lucide-react";

interface FeaturesSectionFormProps {
  solutionId: string;
  defaultValues?: FeaturesContent;
  onSubmit: (data: FeaturesContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const COMMON_ICONS = ["cpu", "database", "shield", "zap", "activity", "lock", "cloud", "server", "wifi", "layers"];

export default function FeaturesSectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: FeaturesSectionFormProps) {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FeaturesContent>({
    resolver: zodResolver(featuresContentSchema),
    defaultValues: defaultValues || {
      eyebrow: "ARCHITECTURE SPECIFICATIONS",
      heading: "KEY CAPABILITIES & CORE FEATURES",
      subheading: "Engineered for maximum reliability, low-latency processing, and enterprise scalability.",
      features: [
        { 
          title: "Real-time Telemetry Processing", 
          description: "Sub-second event streaming and edge analytics designed to detect operational anomalies instantly.", 
          icon: "activity" 
        },
        { 
          title: "Decentralized Edge Intelligence", 
          description: "Local model inference ensures uninterrupted operations even during cloud connectivity outages.", 
          icon: "cpu" 
        },
        { 
          title: "Enterprise Security & Compliance", 
          description: "Hardware-level cryptographic validation and zero-trust data pipeline architecture.", 
          icon: "shield" 
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const watchedValues = useWatch({ control });
  const headingVal = watchedValues?.heading || "";
  const subheadingVal = watchedValues?.subheading || "";
  const eyebrowVal = watchedValues?.eyebrow || "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Banner Intro */}
      <div className="flex items-start gap-4 p-4 rounded-xl bg-[#4c3bcf]/5 border border-[#4c3bcf]/15">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4c3bcf] text-white shadow-sm">
          <Layers className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900">
            Features & Capabilities Grid
          </h3>
          <p className="mt-1 text-xs text-gray-600 leading-relaxed">
            Showcases core technical features in a balanced 3-column grid. Card titles and descriptions enforce strict line clamping to ensure uniform visual symmetry across all cards.
          </p>
        </div>
      </div>

      <fieldset disabled={isLoading} className="space-y-6">
        {/* Section Header Controls */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-4">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center justify-between">
            <span>Section Header</span>
            <span className="text-xs font-normal text-gray-500">Strict word balance</span>
          </h4>

          {/* Eyebrow */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700">
                Eyebrow Badge (Optional)
              </label>
              <span className={`text-[11px] font-mono ${eyebrowVal.length > 50 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                {eyebrowVal.length} / 60 chars
              </span>
            </div>
            <input
              type="text"
              {...register("eyebrow")}
              maxLength={60}
              placeholder="e.g. ARCHITECTURE SPECIFICATIONS"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none"
            />
          </div>

          {/* Heading */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700">
                Main Heading (Optional)
              </label>
              <span className={`text-[11px] font-mono ${headingVal.length > 80 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                {headingVal.length} / 150 chars (optimal: 30-70)
              </span>
            </div>
            <input
              type="text"
              {...register("heading")}
              maxLength={150}
              placeholder="e.g. KEY CAPABILITIES & CORE FEATURES"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none font-medium"
            />
          </div>

          {/* Subheading */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700">
                Subheading / Description (Optional)
              </label>
              <span className={`text-[11px] font-mono ${subheadingVal.length > 200 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                {subheadingVal.length} / 350 chars (optimal: 60-160)
              </span>
            </div>
            <textarea
              {...register("subheading")}
              rows={2}
              maxLength={350}
              placeholder="Provide a brief summary of how these capabilities serve enterprise operations."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Feature Cards List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#4c3bcf]" />
              Feature Cards ({fields.length})
            </h4>
            <span className="text-xs text-gray-500 font-mono">
              Max 12 cards (3, 6, or 9 recommended for 3-col balance)
            </span>
          </div>

          {fields.map((field, index) => {
            const cardTitle = watchedValues?.features?.[index]?.title || "";
            const cardDesc = watchedValues?.features?.[index]?.description || "";
            const currentIcon = watchedValues?.features?.[index]?.icon || "";

            return (
              <div 
                key={field.id} 
                className="p-4 rounded-xl border border-gray-200 bg-white space-y-4 shadow-xs"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[#4c3bcf]/10 text-[#4c3bcf] font-mono font-bold text-xs">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Feature {index + 1}
                    </span>
                  </div>

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {/* Title */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-gray-700">
                        Feature Title <span className="text-red-500">*</span>
                      </label>
                      <span className={`text-[10px] font-mono ${cardTitle.length > 50 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                        {cardTitle.length} / 100 chars (optimal: 20-50)
                      </span>
                    </div>
                    <input
                      type="text"
                      {...register(`features.${index}.title` as const)}
                      maxLength={100}
                      placeholder="e.g. Distributed Edge Intelligence"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none font-medium"
                    />
                    {errors.features?.[index]?.title && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.features[index]?.title?.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-gray-700">
                        Feature Description <span className="text-red-500">*</span>
                      </label>
                      <span className={`text-[10px] font-mono ${cardDesc.length > 180 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                        {cardDesc.length} / 500 chars (optimal: 60-180)
                      </span>
                    </div>
                    <textarea
                      {...register(`features.${index}.description` as const)}
                      rows={2}
                      maxLength={500}
                      placeholder="Explain the technical advantage or operational benefit in 2-3 concise lines."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none resize-none leading-relaxed"
                    />
                    {errors.features?.[index]?.description && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.features[index]?.description?.message}
                      </p>
                    )}
                  </div>

                  {/* Icon Selector / Input */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Icon Name or Keyword (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        {...register(`features.${index}.icon` as const)}
                        maxLength={50}
                        placeholder="e.g. cpu, database, shield, zap, cloud..."
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none"
                      />
                    </div>
                    {/* Quick suggestion pills */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] text-gray-400 mr-1">Suggestions:</span>
                      {COMMON_ICONS.map((iconName) => (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setValue(`features.${index}.icon`, iconName, { shouldDirty: true })}
                          className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                            currentIcon === iconName 
                              ? "bg-[#4c3bcf] text-white border-[#4c3bcf]" 
                              : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {iconName}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {fields.length < 12 && (
            <button
              type="button"
              onClick={() => append({ title: "", description: "", icon: "cpu" })}
              className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-[#4c3bcf] rounded-xl text-xs font-semibold text-gray-600 hover:text-[#4c3bcf] flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Another Feature Card
            </button>
          )}

          {errors.features && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.features.message}
            </p>
          )}
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
                Save Features Section
              </>
            )}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
