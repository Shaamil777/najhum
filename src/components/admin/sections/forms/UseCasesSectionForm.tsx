"use client";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCasesContentSchema } from "@/lib/validation/section-schemas";
import type { UseCasesContent } from "@/types/section";
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  FolderGit2,
  ListPlus
} from "lucide-react";

interface UseCasesSectionFormProps {
  solutionId: string;
  defaultValues?: UseCasesContent;
  onSubmit: (data: UseCasesContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UseCasesSectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: UseCasesSectionFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UseCasesContent>({
    resolver: zodResolver(useCasesContentSchema),
    defaultValues: defaultValues || {
      eyebrow: "ENTERPRISE DEPLOYMENTS",
      heading: "Targeted Solutions for Complex Operations",
      tabs: [
        {
          id: "cold-chain-monitoring",
          label: "Cold Chain Storage",
          solutionDetails: "Automated real-time ambient telemetry and compressor health diagnostics.",
          statValue: "35%",
          statDescription: "Reduction in thermal excursions and perishable inventory spoilage.",
          bullets: [
            "Continuous NIST-calibrated temperature logging",
            "Door open/close duration anomaly alerts",
            "Compressor run-time and current draw analytics",
            "Multi-site executive compliance dashboards",
          ],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "tabs" });

  const watchedValues = useWatch({ control });
  const headingVal = watchedValues?.heading || "";
  const eyebrowVal = watchedValues?.eyebrow || "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Banner Intro */}
      <div className="flex items-start gap-4 p-4 rounded-xl bg-[#4c3bcf]/5 border border-[#4c3bcf]/15">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4c3bcf] text-white shadow-sm">
          <FolderGit2 className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900">
            Interactive Use Cases Showcase
          </h3>
          <p className="mt-1 text-xs text-gray-600 leading-relaxed">
            Allows visitors to switch between specific deployment scenarios. Each tab features implementation architecture and quantified measurable impact.
          </p>
        </div>
      </div>

      <fieldset disabled={isLoading} className="space-y-6">
        {/* Section Header */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-4">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center justify-between">
            <span>Section Header</span>
            <span className="text-xs font-normal text-gray-500">Strict word balance</span>
          </h4>

          {/* Eyebrow */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700">
                Eyebrow Badge <span className="text-red-500">*</span>
              </label>
              <span className={`text-[11px] font-mono ${eyebrowVal.length > 50 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>
                {eyebrowVal.length} / 100 chars
              </span>
            </div>
            <input
              type="text"
              {...register("eyebrow")}
              maxLength={100}
              placeholder="e.g. ENTERPRISE DEPLOYMENTS"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none"
            />
            {errors.eyebrow && (
              <p className="mt-1 text-xs text-red-600">{errors.eyebrow.message}</p>
            )}
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
              placeholder="e.g. From room to rooftop — every system covered"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none font-medium"
            />
            {errors.heading && (
              <p className="mt-1 text-xs text-red-600">{errors.heading.message}</p>
            )}
          </div>
        </div>

        {/* Use Case Tabs List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4c3bcf]" />
              Use Case Tabs ({fields.length})
            </h4>
            <span className="text-xs text-gray-500 font-mono">
              Max 10 tabs (2-5 recommended)
            </span>
          </div>

          {fields.map((field, index) => {
            const currentTab = watchedValues?.tabs?.[index];
            const bullets = currentTab?.bullets || [];

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
                      Tab: {currentTab?.label || `Use Case ${index + 1}`}
                    </span>
                  </div>

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove Tab
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Tab Label & Identifier */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Tab Navigation Label <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register(`tabs.${index}.label` as const)}
                        maxLength={100}
                        placeholder="e.g. Smart Cold Chain"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none font-medium"
                      />
                      {errors.tabs?.[index]?.label && (
                        <p className="mt-1 text-xs text-red-600">{errors.tabs[index]?.label?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Tab ID (Slug / Key) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register(`tabs.${index}.id` as const)}
                        placeholder="e.g. smart-cold-chain"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none font-mono"
                      />
                      {errors.tabs?.[index]?.id && (
                        <p className="mt-1 text-xs text-red-600">{errors.tabs[index]?.id?.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Solution Details */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Architecture & Equipment Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register(`tabs.${index}.solutionDetails` as const)}
                      rows={2}
                      maxLength={1000}
                      placeholder="e.g. Sensors: NI308 Indoor Ambience Sensor + NI201 Smart Thermostat Controller"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none resize-none leading-relaxed"
                    />
                    {errors.tabs?.[index]?.solutionDetails && (
                      <p className="mt-1 text-xs text-red-600">{errors.tabs[index]?.solutionDetails?.message}</p>
                    )}
                  </div>

                  {/* Stat Value & Description */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Impact Stat <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register(`tabs.${index}.statValue` as const)}
                        maxLength={20}
                        placeholder="e.g. 30% or 4.5x"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none font-mono font-bold"
                      />
                      {errors.tabs?.[index]?.statValue && (
                        <p className="mt-1 text-xs text-red-600">{errors.tabs[index]?.statValue?.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Stat Explanation <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register(`tabs.${index}.statDescription` as const)}
                        maxLength={200}
                        placeholder="e.g. Reduction in HVAC energy through occupancy-linked automation"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none"
                      />
                      {errors.tabs?.[index]?.statDescription && (
                        <p className="mt-1 text-xs text-red-600">{errors.tabs[index]?.statDescription?.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Bullet Points Management */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-gray-700">
                        Capability Bullet Points ({bullets.length})
                      </label>
                      {bullets.length < 6 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newBullets = [...bullets, ""];
                            setValue(`tabs.${index}.bullets`, newBullets, { shouldDirty: true });
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4c3bcf] hover:underline"
                        >
                          <Plus className="w-3 h-3" />
                          Add Bullet
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {bullets.map((_, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4c3bcf] shrink-0" />
                          <input
                            type="text"
                            {...register(`tabs.${index}.bullets.${bIdx}` as const)}
                            maxLength={100}
                            placeholder="e.g. Real-time temperature, humidity & air quality per zone"
                            className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4c3bcf]/20 focus:border-[#4c3bcf] outline-none"
                          />
                          {bullets.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newBullets = bullets.filter((_, i) => i !== bIdx);
                                setValue(`tabs.${index}.bullets`, newBullets, { shouldDirty: true });
                              }}
                              className="text-gray-400 hover:text-red-600 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {fields.length < 10 && (
            <button
              type="button"
              onClick={() => append({
                id: `use-case-${fields.length + 1}`,
                label: `Scenario ${fields.length + 1}`,
                solutionDetails: "Hardware and software configurations deployed.",
                statValue: "25%",
                statDescription: "Quantified performance enhancement.",
                bullets: ["Capability point one", "Capability point two"],
              })}
              className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-[#4c3bcf] rounded-xl text-xs font-semibold text-gray-600 hover:text-[#4c3bcf] flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Another Use Case Tab
            </button>
          )}

          {errors.tabs && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.tabs.message}
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
                Save Use Cases Section
              </>
            )}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
