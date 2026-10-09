"use client";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { benefitsContentSchema } from "@/lib/validation/section-schemas";
import { BenefitsContent } from "@/types/section";
import { ImageUploadField } from "@/components/admin/ui/ImageUploadField";
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
      benefits: [{ title: "", description: "", image: "" }],
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
  return (
    <FormProvider {...methods}>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {" "}
        <div className="space-y-4">
          {" "}
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 border border-gray-200 rounded-md"
            >
              {" "}
              <div className="flex justify-between items-center mb-3">
                {" "}
                <h4 className="text-sm font-medium text-gray-700">
                  {" "}
                  Benefit {index + 1}{" "}
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
                    {...register(`benefits.${index}.title` as const)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />{" "}
                  {errors.benefits?.[index]?.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {" "}
                      {errors.benefits[index]?.title?.message}{" "}
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
                    {...register(`benefits.${index}.description` as const)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />{" "}
                  {errors.benefits?.[index]?.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {" "}
                      {errors.benefits[index]?.description?.message}{" "}
                    </p>
                  )}{" "}
                </div>{" "}
                <ImageUploadField
                  name={"benefits." + index + ".image"}
                  label="Benefit Image (optional)"
                  solutionId={solutionId}
                  currentImageUrl={defaultValues?.benefits[index]?.image}
                />{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
        <button
          type="button"
          onClick={() => append({ title: "", description: "", image: "" })}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600"
        >
          {" "}
          + Add Benefit{" "}
        </button>{" "}
        {errors.benefits && (
          <p className="text-sm text-red-600">{errors.benefits.message}</p>
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
      </form>{" "}
    </FormProvider>
  );
}
