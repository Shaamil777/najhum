"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { methodologyContentSchema } from "@/lib/validation/section-schemas";
import { MethodologyContent } from "@/types/section";
interface MethodologySectionFormProps {
  solutionId: string;
  defaultValues?: MethodologyContent;
  onSubmit: (data: MethodologyContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
export default function MethodologySectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: MethodologySectionFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MethodologyContent>({
    resolver: zodResolver(methodologyContentSchema),
    defaultValues: defaultValues || {
      eyebrow: "THE METHODOLOGY",
      heading: "How we build intelligent solutions",
      bodyText:
        "We use a proven 3C methodology to transform physical data into actionable insights.",
      steps: [
        { title: "COLLECT", description: "Intelligent sensors capture data." },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "steps" });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {" "}
      <div className="space-y-4">
        {" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {" "}
            Eyebrow *{" "}
          </label>{" "}
          <input
            type="text"
            {...register("eyebrow")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. THE METHODOLOGY"
          />{" "}
          {errors.eyebrow && (
            <p className="mt-1 text-sm text-red-600">
              {errors.eyebrow.message}
            </p>
          )}{" "}
        </div>{" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {" "}
            Heading *{" "}
          </label>{" "}
          <input
            type="text"
            {...register("heading")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. How we transform your data"
          />{" "}
          {errors.heading && (
            <p className="mt-1 text-sm text-red-600">
              {errors.heading.message}
            </p>
          )}{" "}
        </div>{" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {" "}
            Body Text *{" "}
          </label>{" "}
          <textarea
            {...register("bodyText")}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a brief description..."
          />{" "}
          {errors.bodyText && (
            <p className="mt-1 text-sm text-red-600">
              {errors.bodyText.message}
            </p>
          )}{" "}
        </div>{" "}
      </div>{" "}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        {" "}
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Methodology Steps
        </h3>{" "}
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-200 rounded-md">
            {" "}
            <div className="flex justify-between items-center mb-3">
              {" "}
              <h4 className="text-sm font-medium text-gray-700">
                {" "}
                Step {index + 1}{" "}
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
                  {...register(`steps.${index}.title` as const)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. COLLECT"
                />{" "}
                {errors.steps?.[index]?.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {" "}
                    {errors.steps[index]?.title?.message}{" "}
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
                  {...register(`steps.${index}.description` as const)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe this step..."
                />{" "}
                {errors.steps?.[index]?.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {" "}
                    {errors.steps[index]?.description?.message}{" "}
                  </p>
                )}{" "}
              </div>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      {fields.length < 6 && (
        <button
          type="button"
          onClick={() => append({ title: "", description: "" })}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600"
        >
          {" "}
          + Add Step{" "}
        </button>
      )}{" "}
      {errors.steps && (
        <p className="text-sm text-red-600">{errors.steps.message}</p>
      )}{" "}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
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
