"use client";

import { useForm, useFieldArray, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { benefitsContentSchema } from "@/lib/validation/section-schemas";
import type { BenefitsContent } from "@/types/section";
import { ImageUploadField } from "@/components/admin/ui/ImageUploadField";
import { 
  TrendingUp, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Layers
} from "lucide-react";

interface BenefitsSectionFormProps {
  solutionId: string;
  defaultValues?: BenefitsContent;
  onSubmit: (data: BenefitsContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function BenefitsSectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: BenefitsSectionFormProps) {
  const methods = useForm<BenefitsContent>({
    resolver: zodResolver(benefitsContentSchema),
    defaultValues: defaultValues || {
      eyebrow: "BUSINESS IMPACT & MEASURED VALUE",
      heading: "TRANSFORMATIVE RESULTS FOR ENTERPRISE OPERATORS",
      subheading: "Validated operational efficiency and ROI delivered across multi-site deployments.",
      benefits: [
        { 
          title: "Substantial Energy OPEX Reduction", 
          description: "Smart load shedding and automated thermal throttling cut peak power demands by up to 35% without operational disruption.", 
          metricValue: "35%",
          metricLabel: "Peak OPEX Cut",
          image: "" 
        },
      ],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "benefits",
  });

  const watchedValues = useWatch({ control });
  const headingVal = watchedValues?.heading || "";
  const subheadingVal = watchedValues?.subheading || "";

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Banner Intro */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-[#4c3bcf]/5 border border-[#4c3bcf]/15">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4c3bcf] text-white shadow-sm">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900">
              Benefits & Measured Outcomes Showcase
            </h3>
            <p className="mt-1 text-xs text-gray-600 leading-relaxed">
              Showcases tangible business benefits in an alternating 2-column layout. Supports key metric callouts and R2 direct image uploads.
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
                placeholder="e.g. TRANSFORMATIVE RESULTS FOR ENTERPRISE OPERATORS"
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
                placeholder="Provide a brief introductory summary highlighting overall return on investment."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Benefits Items List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#4c3bcf]" />
                Benefit Outcomes ({fields.length})
              </h4>
              <span className="text-xs text-gray-500 font-mono">
                Max 8 items (2-4 recommended)
              </span>
            </div>

            {fields.map((field, index) => {
              const cardTitle = watchedValues?.benefits?.[index]?.title || "";
              const cardDesc = watchedValues?.benefits?.[index]?.description || "";
              const currentImg = watchedValues?.benefits?.[index]?.image || "";

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
                        Outcome {index + 1}
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

                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-gray-700">
                          Benefit Title <span className="text-red-500">*</span>
                        </label>
                        <span className={`text-[10px] font-mono ${cardTitle.length > 50 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                          {cardTitle.length} / 100 chars (optimal: 20-50)
                        </span>
                      </div>
                      <input
                        type="text"
                        {...register(`benefits.${index}.title` as const)}
                        maxLength={100}
                        placeholder="e.g. 40% Reduction in Idle Energy Loss"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none font-medium"
                      />
                      {errors.benefits?.[index]?.title && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.benefits[index]?.title?.message}
                        </p>
                      )}
                    </div>

                    {/* Metric Callout (Value + Label) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Key Metric Value (Optional)
                        </label>
                        <input
                          type="text"
                          {...register(`benefits.${index}.metricValue` as const)}
                          maxLength={30}
                          placeholder="e.g. +45% or 3.2x or 99.99%"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Metric Label (Optional)
                        </label>
                        <input
                          type="text"
                          {...register(`benefits.${index}.metricLabel` as const)}
                          maxLength={80}
                          placeholder="e.g. Energy Efficiency or Faster Deployment"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-gray-700">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <span className={`text-[10px] font-mono ${cardDesc.length > 200 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                          {cardDesc.length} / 500 chars (optimal: 60-180)
                        </span>
                      </div>
                      <textarea
                        {...register(`benefits.${index}.description` as const)}
                        rows={3}
                        maxLength={500}
                        placeholder="Detail the quantifiable operational or financial advantage for stakeholders."
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none resize-none leading-relaxed"
                      />
                      {errors.benefits?.[index]?.description && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.benefits[index]?.description?.message}
                        </p>
                      )}
                    </div>

                    {/* Media Upload */}
                    <div className="pt-2">
                      <ImageUploadField
                        name={`benefits.${index}.image`}
                        label="Outcome Visual Media (Optional)"
                        solutionId={solutionId}
                        currentImageUrl={currentImg}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {fields.length < 8 && (
              <button
                type="button"
                onClick={() => append({ title: "", description: "", metricValue: "", metricLabel: "", image: "" })}
                className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-[#4c3bcf] rounded-xl text-xs font-semibold text-gray-600 hover:text-[#4c3bcf] flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Another Benefit Outcome
              </button>
            )}

            {errors.benefits && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.benefits.message}
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
                  Save Benefits Section
                </>
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </FormProvider>
  );
}
