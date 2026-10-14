"use client";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { solaasContentSchema } from "@/lib/validation/section-schemas";
import type { SolaasContent } from "@/types/section";
import { defaultSolaasContent } from "@/content/solaas";
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  CreditCard,
  Layers
} from "lucide-react";

interface Props {
  solutionId?: string;
  defaultValues?: SolaasContent;
  onCancel: () => void;
  isLoading?: boolean;
  onSubmit: (data: SolaasContent) => Promise<void>;
}

export default function SolaasSectionForm({
  defaultValues,
  onCancel,
  isLoading = false,
  onSubmit,
}: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SolaasContent>({
    resolver: zodResolver(solaasContentSchema),
    defaultValues: { ...defaultSolaasContent, ...defaultValues },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "cards" });

  const watchedValues = useWatch({ control });
  const headingVal = watchedValues?.heading || "";
  const bodyTextVal = watchedValues?.bodyText || "";
  const eyebrowVal = watchedValues?.eyebrow || "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Banner Intro */}
      <div className="flex items-start gap-4 p-4 rounded-xl bg-[#4c3bcf]/5 border border-[#4c3bcf]/15">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4c3bcf] text-white shadow-sm">
          <CreditCard className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900">
            Solution-as-a-Service (SOLAAS) Model
          </h3>
          <p className="mt-1 text-xs text-gray-600 leading-relaxed">
            Explains the subscription and managed delivery model. Symmetrical card grid enforces strict card height balance.
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
                {eyebrowVal.length} / 100 chars
              </span>
            </div>
            <input
              type="text"
              {...register("eyebrow")}
              maxLength={100}
              placeholder="e.g. SOLAAS DELIVERY MODEL"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none"
            />
          </div>

          {/* Heading */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700">
                Main Heading <span className="text-red-500">*</span>
              </label>
              <span className={`text-[11px] font-mono ${headingVal.length > 80 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                {headingVal.length} / 200 chars (optimal: 30-70)
              </span>
            </div>
            <input
              type="text"
              {...register("heading")}
              maxLength={200}
              placeholder="e.g. SOLUTION AS A SERVICE (SOLAAS)"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none font-medium"
            />
            {errors.heading && (
              <p className="mt-1 text-xs text-red-600">{errors.heading.message}</p>
            )}
          </div>

          {/* Body Text */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700">
                Supporting Description <span className="text-red-500">*</span>
              </label>
              <span className={`text-[11px] font-mono ${bodyTextVal.length > 200 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                {bodyTextVal.length} / 2000 chars (optimal: 60-180)
              </span>
            </div>
            <textarea
              {...register("bodyText")}
              rows={3}
              maxLength={2000}
              placeholder="Explain how the subscription model eliminates upfront hardware costs and guarantees continuous updates."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none resize-none leading-relaxed"
            />
            {errors.bodyText && (
              <p className="mt-1 text-xs text-red-600">{errors.bodyText.message}</p>
            )}
          </div>
        </div>

        {/* SOLAAS Cards List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#4c3bcf]" />
              Model Pillars & Advantage Cards ({fields.length})
            </h4>
            <span className="text-xs text-gray-500 font-mono">
              Max 6 cards (3, 4, or 5 recommended)
            </span>
          </div>

          {fields.map((field, index) => {
            const cardTitle = watchedValues?.cards?.[index]?.title || "";
            const cardDesc = watchedValues?.cards?.[index]?.description || "";

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
                      Card {index + 1}
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
                  {/* Card Title */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-gray-700">
                        Pillar Title <span className="text-red-500">*</span>
                      </label>
                      <span className={`text-[10px] font-mono ${cardTitle.length > 50 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                        {cardTitle.length} / 100 chars (optimal: 20-50)
                      </span>
                    </div>
                    <input
                      type="text"
                      {...register(`cards.${index}.title` as const)}
                      maxLength={100}
                      placeholder="e.g. Minimal CAPEX & Predictable OPEX"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none font-medium"
                    />
                    {errors.cards?.[index]?.title && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.cards[index]?.title?.message}
                      </p>
                    )}
                  </div>

                  {/* Card Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-gray-700">
                        Pillar Description <span className="text-red-500">*</span>
                      </label>
                      <span className={`text-[10px] font-mono ${cardDesc.length > 180 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                        {cardDesc.length} / 500 chars (optimal: 60-180)
                      </span>
                    </div>
                    <textarea
                      {...register(`cards.${index}.description` as const)}
                      rows={2}
                      maxLength={500}
                      placeholder="Explain how this benefits client cash flow and guarantees system performance."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none resize-none leading-relaxed"
                    />
                    {errors.cards?.[index]?.description && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.cards[index]?.description?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {fields.length < 6 && (
            <button
              type="button"
              onClick={() => append({ title: "", description: "" })}
              className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-[#4c3bcf] rounded-xl text-xs font-semibold text-gray-600 hover:text-[#4c3bcf] flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Another SolaaS Card
            </button>
          )}

          {errors.cards && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.cards.message}
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
                Save SolaaS Section
              </>
            )}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
