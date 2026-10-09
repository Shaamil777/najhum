"use client";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialsContentSchema } from "@/lib/validation/section-schemas";
import { TestimonialsContent } from "@/types/section";
import { ImageUploadField } from "@/components/admin/ui/ImageUploadField";
interface TestimonialsSectionFormProps {
  solutionId: string;
  defaultValues?: TestimonialsContent;
  onSubmit: (data: TestimonialsContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
export default function TestimonialsSectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: TestimonialsSectionFormProps) {
  const methods = useForm<TestimonialsContent>({
    resolver: zodResolver(testimonialsContentSchema),
    defaultValues: defaultValues || {
      testimonials: [
        { quote: "", author: "", role: "", company: "", avatar: "" },
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
    name: "testimonials",
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
                  Testimonial {index + 1}{" "}
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
                    Quote *{" "}
                  </label>{" "}
                  <textarea
                    {...register(`testimonials.${index}.quote` as const)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="This product changed our business..."
                  />{" "}
                  {errors.testimonials?.[index]?.quote && (
                    <p className="mt-1 text-sm text-red-600">
                      {" "}
                      {errors.testimonials[index]?.quote?.message}{" "}
                    </p>
                  )}{" "}
                </div>{" "}
                <div className="grid grid-cols-2 gap-3">
                  {" "}
                  <div>
                    {" "}
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {" "}
                      Author *{" "}
                    </label>{" "}
                    <input
                      type="text"
                      {...register(`testimonials.${index}.author` as const)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />{" "}
                    {errors.testimonials?.[index]?.author && (
                      <p className="mt-1 text-sm text-red-600">
                        {" "}
                        {errors.testimonials[index]?.author?.message}{" "}
                      </p>
                    )}{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {" "}
                      Role *{" "}
                    </label>{" "}
                    <input
                      type="text"
                      {...register(`testimonials.${index}.role` as const)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="CEO"
                    />{" "}
                    {errors.testimonials?.[index]?.role && (
                      <p className="mt-1 text-sm text-red-600">
                        {" "}
                        {errors.testimonials[index]?.role?.message}{" "}
                      </p>
                    )}{" "}
                  </div>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {" "}
                    Company *{" "}
                  </label>{" "}
                  <input
                    type="text"
                    {...register(`testimonials.${index}.company` as const)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Acme Corp"
                  />{" "}
                  {errors.testimonials?.[index]?.company && (
                    <p className="mt-1 text-sm text-red-600">
                      {" "}
                      {errors.testimonials[index]?.company?.message}{" "}
                    </p>
                  )}{" "}
                </div>{" "}
                <ImageUploadField
                  name={"testimonials." + index + ".avatar"}
                  label="Avatar (optional)"
                  solutionId={solutionId}
                  currentImageUrl={defaultValues?.testimonials[index]?.avatar}
                />{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
        <button
          type="button"
          onClick={() =>
            append({ quote: "", author: "", role: "", company: "", avatar: "" })
          }
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600"
        >
          {" "}
          + Add Testimonial{" "}
        </button>{" "}
        {errors.testimonials && (
          <p className="text-sm text-red-600">{errors.testimonials.message}</p>
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
