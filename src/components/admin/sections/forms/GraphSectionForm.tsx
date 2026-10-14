"use client";

import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { graphSectionContentSchema } from "@/lib/validation/section-schemas";
import type { GraphSectionContent } from "@/types/section";
import { Plus, Trash2, BarChart2, TrendingUp } from "lucide-react";

interface GraphSectionFormProps {
  solutionId: string;
  defaultValues?: GraphSectionContent;
  onSubmit: (data: GraphSectionContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function GraphSectionForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: GraphSectionFormProps) {
  const methods = useForm<GraphSectionContent>({
    resolver: zodResolver(graphSectionContentSchema),
    defaultValues: {
      eyebrow: defaultValues?.eyebrow || "Performance Metrics",
      heading: defaultValues?.heading || "Quantifiable Industrial Impact",
      description: defaultValues?.description || "Benchmarking telemetry and efficiency gains against traditional deployments.",
      chartType: defaultValues?.chartType || "bar",
      primaryLabel: defaultValues?.primaryLabel || "Our Architecture",
      secondaryLabel: defaultValues?.secondaryLabel || "Legacy Setup",
      dataPoints: defaultValues?.dataPoints || [
        { label: "Data Transmission Latency", value: 12, secondaryValue: 85, unit: "ms" },
        { label: "Energy Efficiency Factor", value: 94, secondaryValue: 62, unit: "%" },
        { label: "Uptime Availability SLA", value: 99.98, secondaryValue: 94.2, unit: "%" },
        { label: "Hardware Deployment Speed", value: 4, secondaryValue: 24, unit: "days" },
      ],
      metrics: defaultValues?.metrics || [
        { title: "Latency Reduction", value: "-85%", change: "12ms avg", isPositive: true },
        { title: "Annual Opex Savings", value: "38%", change: "+$120K", isPositive: true },
        { title: "System Reliability", value: "99.98%", change: "Field Verified", isPositive: true },
        { title: "Setup Turnaround", value: "6x Faster", change: "Plug & Play", isPositive: true },
      ],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const {
    fields: dataPointFields,
    append: appendDataPoint,
    remove: removeDataPoint,
  } = useFieldArray({
    control,
    name: "dataPoints",
  });

  const {
    fields: metricFields,
    append: appendMetric,
    remove: removeMetric,
  } = useFieldArray({
    control,
    name: "metrics",
  });

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
              placeholder="e.g. Telemetry Benchmark"
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
              placeholder="e.g. Quantified Performance"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={2}
            className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Labels for Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Series Label (Blue Bar)
            </label>
            <input
              type="text"
              {...register("primaryLabel")}
              placeholder="e.g. Our Solution"
              className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Secondary Series Label (Gray Benchmark Bar)
            </label>
            <input
              type="text"
              {...register("secondaryLabel")}
              placeholder="e.g. Legacy Industry Standard"
              className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm bg-white"
            />
          </div>
        </div>

        {/* Data Points List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-blue-600" />
              Chart Data Points ({dataPointFields.length})
            </label>
            <button
              type="button"
              onClick={() => appendDataPoint({ label: "New Metric", value: 50, secondaryValue: 20, unit: "%" })}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
            >
              <Plus className="w-3.5 h-3.5" /> Add Data Point
            </button>
          </div>

          <div className="space-y-2.5">
            {dataPointFields.map((field, idx) => (
              <div key={field.id} className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
                <div className="flex-1">
                  <input
                    type="text"
                    {...register(`dataPoints.${idx}.label` as const)}
                    placeholder="Metric Label"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-xs font-medium"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    step="any"
                    {...register(`dataPoints.${idx}.value` as const, { valueAsNumber: true })}
                    placeholder="Value"
                    className="w-full px-2 py-1.5 border border-slate-200 rounded-md text-xs text-blue-600 font-bold"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    step="any"
                    {...register(`dataPoints.${idx}.secondaryValue` as const, { valueAsNumber: true })}
                    placeholder="Benchmark"
                    className="w-full px-2 py-1.5 border border-slate-200 rounded-md text-xs text-slate-500"
                  />
                </div>
                <div className="w-16">
                  <input
                    type="text"
                    {...register(`dataPoints.${idx}.unit` as const)}
                    placeholder="Unit (ms, %)"
                    className="w-full px-2 py-1.5 border border-slate-200 rounded-md text-xs font-mono"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeDataPoint(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Top KPI Cards List */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Stat Highlight Cards (Optional)
            </label>
            <button
              type="button"
              onClick={() => appendMetric({ title: "Metric", value: "+45%", change: "High impact", isPositive: true })}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-md hover:bg-slate-200"
            >
              <Plus className="w-3.5 h-3.5" /> Add Stat Card
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {metricFields.map((field, idx) => (
              <div key={field.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                <button
                  type="button"
                  onClick={() => removeMetric(idx)}
                  className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <input
                  type="text"
                  {...register(`metrics.${idx}.title` as const)}
                  placeholder="Metric Title"
                  className="w-[85%] px-2.5 py-1 text-xs border border-slate-200 rounded-md bg-white font-medium"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    {...register(`metrics.${idx}.value` as const)}
                    placeholder="Value (e.g. 99.98%)"
                    className="w-1/2 px-2.5 py-1 text-xs font-bold text-slate-900 border border-slate-200 rounded-md bg-white"
                  />
                  <input
                    type="text"
                    {...register(`metrics.${idx}.change` as const)}
                    placeholder="Sub-label (e.g. +$120K)"
                    className="w-1/2 px-2.5 py-1 text-xs border border-slate-200 rounded-md bg-white"
                  />
                </div>
              </div>
            ))}
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
            {isLoading ? "Saving..." : "Save Graph Section"}
          </button>
        </div>

      </form>
    </FormProvider>
  );
}
