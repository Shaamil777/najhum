"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { featuresContentSchema } from "@/lib/validation/section-schemas";
import { FeaturesContent } from "@/types/section";
interface FeaturesSectionFormProps {
  solutionId: string;
  defaultValues?: FeaturesContent;
  onSubmit: (data: FeaturesContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
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
    handleSubmit,
    formState: { errors },
  } = useForm<FeaturesContent>({
    resolver: zodResolver(featuresContentSchema),
    defaultValues: defaultValues || {
      features: [{ title: "", description: "", icon: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {" "}
      <div className="space-y-4">
        {" "}
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-200 rounded-md">
            {" "}
            <div className="flex justify-between items-center mb-3">
              {" "}
              <h4 className="text-sm font-medium text-gray-700">
                {" "}
                Feature {index + 1}{" "}
              </h4>{" "}
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  {" "}
                  Remove{" "}
                </button>
              )}{" "}
            </div>{" "}
            <div className="space-y-3">
              {" "}
              <div>
                {" "}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {" "}
                  Title *{" "}
                </label>{" "}
                <input
                  type="text"
                  {...register(`features.${index}.title` as const)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />{" "}
                {errors.features?.[index]?.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {" "}
                    {errors.features[index]?.title?.message}{" "}
                  </p>
                )}{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {" "}
                  Description *{" "}
                </label>{" "}
                <textarea
                  {...register(`features.${index}.description` as const)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />{" "}
                {errors.features?.[index]?.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {" "}
                    {errors.features[index]?.description?.message}{" "}
                  </p>
                )}{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {" "}
                  Icon (optional){" "}
                </label>{" "}
                <input
                  type="text"
                  {...register(`features.${index}.icon` as const)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Icon name or emoji"
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <button
        type="button"
        onClick={() => append({ title: "", description: "", icon: "" })}
        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600"
      >
        {" "}
        + Add Feature{" "}
      </button>{" "}
      {errors.features && (
        <p className="text-sm text-red-600">{errors.features.message}</p>
      )}{" "}
      <div className="flex justify-end gap-3 pt-4">
        {" "}
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
        >
          {" "}
          Cancel{" "}
        </button>{" "}
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
        >
          {" "}
          {isLoading ? "Saving..." : "Save"}{" "}
        </button>{" "}
      </div>{" "}
    </form>
  );
}
