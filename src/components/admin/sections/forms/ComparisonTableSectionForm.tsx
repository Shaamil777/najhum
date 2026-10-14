"use client";

import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { comparisonTableContentSchema } from "@/lib/validation/section-schemas";
import type { ComparisonTableSectionContent } from "@/types/section";
import { Plus, Trash2, ArrowLeftRight } from "lucide-react";

interface ComparisonTableSectionFormProps {
  solutionId: string;
  defaultValues?: ComparisonTableSectionContent;
  onSubmit: (data: ComparisonTableSectionContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ComparisonTableSectionForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: ComparisonTableSectionFormProps) {
  const methods = useForm<ComparisonTableSectionContent>({
    resolver: zodResolver(comparisonTableContentSchema),
    defaultValues: {
      header: {
        leftTitle: defaultValues?.header?.leftTitle || "Traditional Setup",
        rightTitlePart1: defaultValues?.header?.rightTitlePart1 || "The Modern",
        rightTitlePart2: defaultValues?.header?.rightTitlePart2 || "Architecture",
        eyebrow: defaultValues?.header?.eyebrow || "Side-by-Side Comparison",
      },
      items: defaultValues?.items || [
        {
          id: "item-1",
          traditional: {
            title: "Fragmented Vendors",
            description: "High Integration Complexity",
            details: "Multi-vendor systems cause finger-pointing during network downtime and slow deployment cycles.",
          },
          solution: {
            title: "Unified Turnkey Stack",
            description: "Zero Integration Friction",
            details: "Pre-validated hardware, edge firmware, and cloud protocols deliver instant plug-and-play operation.",
          },
        },
        {
          id: "item-2",
          traditional: {
            title: "Manual Monitoring",
            description: "Reactive Maintenance",
            details: "Field technicians dispatched only after hardware fails, resulting in costly downtime.",
          },
          solution: {
            title: "Predictive Telemetry",
            description: "Autonomous Remediation",
            details: "Continuous edge diagnostics detect thermal and electrical anomalies before failures occur.",
          },
        },
        {
          id: "item-3",
          traditional: {
            title: "Proprietary Lock-in",
            description: "Expensive Upgrades",
            details: "Restricted protocols prevent interoperability and increase long-term total cost of ownership.",
          },
          solution: {
            title: "Open Industrial Standards",
            description: "Infinite Extensibility",
            details: "Full compliance with standard industrial APIs guarantees freedom and future-proof scaling.",
          },
        },
      ],
      footer: {
        leftLabel: defaultValues?.footer?.leftLabel || "Legacy System TCO:",
        leftValue: defaultValues?.footer?.leftValue || "+42% Higher Ongoing Costs",
        rightLabel: defaultValues?.footer?.rightLabel || "Estimated ROI:",
        rightValue: defaultValues?.footer?.rightValue || "< 9 Months Payback",
      },
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-sans">
        
        {/* Column Titles & Eyebrow */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
          <label className="block text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <ArrowLeftRight className="w-4 h-4 text-blue-600" />
            Comparison Column Headers
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Eyebrow Tag
              </label>
              <input
                type="text"
                {...register("header.eyebrow")}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Left Column Title (Traditional)
              </label>
              <input
                type="text"
                {...register("header.leftTitle")}
                placeholder="e.g. Traditional Infrastructure"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Right Column Title (Platform Solution)
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  {...register("header.rightTitlePart1")}
                  placeholder="The"
                  className="w-1/2 px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white"
                />
                <input
                  type="text"
                  {...register("header.rightTitlePart2")}
                  placeholder="Advantage"
                  className="w-1/2 px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white text-blue-600 font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Items List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-bold text-slate-900">
              Comparison Rows ({itemFields.length})
            </label>
            <button
              type="button"
              onClick={() =>
                appendItem({
                  id: `item-${Date.now()}`,
                  traditional: { title: "Legacy Aspect", description: "Traditional Issue", details: "Explanation of legacy downside." },
                  solution: { title: "Modern Aspect", description: "Our Solution Feature", details: "Explanation of our advantage." },
                })
              }
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
            >
              <Plus className="w-3.5 h-3.5" /> Add Comparison Row
            </button>
          </div>

          <div className="space-y-4">
            {itemFields.map((field, idx) => (
              <div key={field.id} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4 relative">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Row #{idx + 1}
                  </span>
                  {itemFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Traditional Side */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <span className="block text-[11px] font-bold text-slate-500 uppercase">
                      Traditional Side
                    </span>
                    <input
                      type="text"
                      {...register(`items.${idx}.traditional.title` as const)}
                      placeholder="Category Tag (e.g. Vendors)"
                      className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white"
                    />
                    <input
                      type="text"
                      {...register(`items.${idx}.traditional.description` as const)}
                      placeholder="Summary Headline"
                      className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white font-medium"
                    />
                    <textarea
                      {...register(`items.${idx}.traditional.details` as const)}
                      rows={2}
                      placeholder="Details"
                      className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white text-slate-600"
                    />
                  </div>

                  {/* Solution Side */}
                  <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2">
                    <span className="block text-[11px] font-bold text-blue-700 uppercase">
                      Solution Side
                    </span>
                    <input
                      type="text"
                      {...register(`items.${idx}.solution.title` as const)}
                      placeholder="Category Tag (e.g. Turnkey)"
                      className="w-full px-2.5 py-1 text-xs border border-blue-200 rounded-md bg-white text-blue-700 font-semibold"
                    />
                    <input
                      type="text"
                      {...register(`items.${idx}.solution.description` as const)}
                      placeholder="Summary Headline"
                      className="w-full px-2.5 py-1 text-xs border border-blue-200 rounded-md bg-white font-bold text-slate-900"
                    />
                    <textarea
                      {...register(`items.${idx}.solution.details` as const)}
                      rows={2}
                      placeholder="Details"
                      className="w-full px-2.5 py-1 text-xs border border-blue-200 rounded-md bg-white text-slate-700"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Left Column Footer Tag
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                {...register("footer.leftLabel")}
                placeholder="Label"
                className="w-1/2 px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white"
              />
              <input
                type="text"
                {...register("footer.leftValue")}
                placeholder="Value"
                className="w-1/2 px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Right Column Footer Tag
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                {...register("footer.rightLabel")}
                placeholder="Label"
                className="w-1/2 px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white"
              />
              <input
                type="text"
                {...register("footer.rightValue")}
                placeholder="Value"
                className="w-1/2 px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white text-blue-600 font-bold"
              />
            </div>
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
            {isLoading ? "Saving..." : "Save Comparison Table"}
          </button>
        </div>

      </form>
    </FormProvider>
  );
}
