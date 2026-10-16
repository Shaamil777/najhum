"use client";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { challengeContentSchema } from "@/lib/validation/section-schemas";
import type { ChallengeContent } from "@/types/section";
import { 
  Layers, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from "lucide-react";

interface ChallengeSectionFormProps {
  solutionId: string;
  defaultValues?: ChallengeContent;
  onSubmit: (data: ChallengeContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ChallengeSectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: ChallengeSectionFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChallengeContent>({
    resolver: zodResolver(challengeContentSchema),
    defaultValues: defaultValues || {
      heading: "EXPLORE THE ECOSYSTEM",
      description: "Integrated solutions for smarter, scalable EV charging and infrastructure.",
      challenges: [
        {
          title: "Energy Costs",
          description: "HVAC, lighting, kitchens & pools drive utility bills to high percentages of revenue.",
          category: "Cost Reduction",
          exploreLink: "/platforms/iems",
        },
        {
          title: "Guest Experience",
          description: "Consistent temperature and air quality directly impact customer satisfaction and reviews.",
          category: "Experience",
          exploreLink: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "challenges",
  });

  const watchedValues = useWatch({ control });
  const headingVal = watchedValues?.heading || "";
  const descVal = watchedValues?.description || "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Banner Intro */}
      <div className="flex items-start gap-4 p-4 rounded-xl bg-[#4c3bcf]/5 border border-[#4c3bcf]/15">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4c3bcf] text-white shadow-sm">
          <Layers className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900">
            Challenge & Ecosystem Stack Cards
          </h3>
          <p className="mt-1 text-xs text-gray-600 leading-relaxed">
            Presents challenges and platform ecosystem modules in a high-engagement horizontal sticky card deck. Recommended: 3 to 6 cards. Text is strictly clamped to keep card heights uniform.
          </p>
        </div>
      </div>

      <fieldset disabled={isLoading} className="space-y-6">
        {/* Section Heading & Description */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-4">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center justify-between">
            <span>Section Header</span>
            <span className="text-xs font-normal text-gray-500">Strict word balance</span>
          </h4>

          {/* Heading */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700">
                Section Heading <span className="text-red-500">*</span>
              </label>
              <span className={`text-[11px] font-mono ${headingVal.length > 80 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                {headingVal.length} / 200 chars (optimal: 30-70)
              </span>
            </div>
            <input
              type="text"
              {...register("heading")}
              maxLength={200}
              placeholder="e.g. EXPLORE THE ECOSYSTEM"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none font-medium"
            />
            {errors.heading && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.heading.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700">
                Section Subtitle / Description (Optional)
              </label>
              <span className={`text-[11px] font-mono ${descVal.length > 200 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                {descVal.length} / 1000 chars (optimal: 60-160)
              </span>
            </div>
            <textarea
              {...register("description")}
              rows={2}
              maxLength={1000}
              placeholder="e.g. Integrated solutions engineered for scalable, resilient infrastructure."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none resize-none leading-relaxed"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* Challenge Cards List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4c3bcf]" />
              Stacked Cards ({fields.length})
            </h4>
            <span className="text-xs text-gray-500 font-mono">
              Max 12 cards (3-6 recommended)
            </span>
          </div>

          {fields.map((field, index) => {
            const cardTitleVal = watchedValues?.challenges?.[index]?.title || "";
            const cardDescVal = watchedValues?.challenges?.[index]?.description || "";

            return (
              <div 
                key={field.id} 
                className="p-4 rounded-xl border border-gray-200 bg-white space-y-4 relative shadow-xs"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[#4c3bcf]/10 text-[#4c3bcf] font-mono font-bold text-xs">
                      {String(index + 1).padStart(2, '0')}
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
                        Card Title <span className="text-red-500">*</span>
                      </label>
                      <span className={`text-[10px] font-mono ${cardTitleVal.length > 50 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                        {cardTitleVal.length} / 100 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      {...register(`challenges.${index}.title` as const)}
                      maxLength={100}
                      placeholder="e.g. Energy Consumption & Peak Load"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none font-medium"
                    />
                    {errors.challenges?.[index]?.title && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.challenges[index]?.title?.message}
                      </p>
                    )}
                  </div>

                  {/* Card Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-gray-700">
                        Card Description <span className="text-red-500">*</span>
                      </label>
                      <span className={`text-[10px] font-mono ${cardDescVal.length > 180 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                        {cardDescVal.length} / 500 chars (optimal: 60-180)
                      </span>
                    </div>
                    <textarea
                      {...register(`challenges.${index}.description` as const)}
                      rows={2}
                      maxLength={500}
                      placeholder="e.g. Heavy cooling, lighting, and unregulated equipment create peak-demand penalties."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none resize-none leading-relaxed"
                    />
                    {errors.challenges?.[index]?.description && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.challenges[index]?.description?.message}
                      </p>
                    )}
                  </div>

                  {/* Category and Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Category Tag (Optional)
                      </label>
                      <input
                        type="text"
                        {...register(`challenges.${index}.category` as const)}
                        maxLength={100}
                        placeholder="e.g. Cost Optimisation"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none"
                      />
                      {errors.challenges?.[index]?.category && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.challenges[index]?.category?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Explore Destination Link (Optional)
                      </label>
                      <input
                        type="text"
                        {...register(`challenges.${index}.exploreLink` as const)}
                        maxLength={200}
                        placeholder="e.g. /platforms/evoltics or /contact"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none"
                      />
                      {errors.challenges?.[index]?.exploreLink && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.challenges[index]?.exploreLink?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {fields.length < 12 && (
            <button
              type="button"
              onClick={() => append({ title: "", description: "", category: "", exploreLink: "" })}
              className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-[#4c3bcf] rounded-xl text-xs font-semibold text-gray-600 hover:text-[#4c3bcf] flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Another Challenge Card
            </button>
          )}

          {errors.challenges && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.challenges.message}
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
                Save Challenge Section
              </>
            )}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
