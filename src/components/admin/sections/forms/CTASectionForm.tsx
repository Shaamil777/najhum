"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ctaContentSchema } from "@/lib/validation/section-schemas";
import { CTAContent } from "@/types/section";
interface CTASectionFormProps {
  solutionId: string;
  defaultValues?: CTAContent;
  onSubmit: (data: CTAContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
export default function CTASectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: CTASectionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CTAContent>({
    resolver: zodResolver(ctaContentSchema),
    defaultValues: defaultValues || {
      heading: "",
      bodyText: "",
      primaryButtonText: "",
      primaryButtonLink: "",
      secondaryButtonText: "",
      secondaryButtonLink: "",
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {" "}
      <div>
        {" "}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Heading *
        </label>{" "}
        <input
          type="text"
          {...register("heading")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />{" "}
        {errors.heading && (
          <p className="mt-1 text-sm text-red-600">{errors.heading.message}</p>
        )}{" "}
      </div>{" "}
      <div>
        {" "}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Body Text *
        </label>{" "}
        <textarea
          {...register("bodyText")}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />{" "}
        {errors.bodyText && (
          <p className="mt-1 text-sm text-red-600">{errors.bodyText.message}</p>
        )}{" "}
      </div>{" "}
      <div className="grid grid-cols-2 gap-4">
        {" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Button Text *
          </label>{" "}
          <input
            type="text"
            {...register("primaryButtonText")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />{" "}
          {errors.primaryButtonText && (
            <p className="mt-1 text-sm text-red-600">
              {errors.primaryButtonText.message}
            </p>
          )}{" "}
        </div>{" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Button Link *
          </label>{" "}
          <input
            type="text"
            {...register("primaryButtonLink")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />{" "}
          {errors.primaryButtonLink && (
            <p className="mt-1 text-sm text-red-600">
              {errors.primaryButtonLink.message}
            </p>
          )}{" "}
        </div>{" "}
      </div>{" "}
      <div className="grid grid-cols-2 gap-4">
        {" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secondary Button Text
          </label>{" "}
          <input
            type="text"
            {...register("secondaryButtonText")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />{" "}
        </div>{" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secondary Button Link
          </label>{" "}
          <input
            type="text"
            {...register("secondaryButtonLink")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />{" "}
        </div>{" "}
      </div>{" "}
      <div className="flex justify-end gap-3 pt-4">
        {" "}
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
        >
          Cancel
        </button>{" "}
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>{" "}
      </div>{" "}
    </form>
  );
}
