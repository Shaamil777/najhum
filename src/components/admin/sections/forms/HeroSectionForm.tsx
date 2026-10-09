"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { heroContentSchema } from "@/lib/validation/section-schemas";
import { HeroContent } from "@/types/section";
import { ImageUploadField } from "@/components/admin/ui/ImageUploadField";
interface HeroSectionFormProps {
  solutionId: string;
  defaultValues?: HeroContent;
  onSubmit: (data: HeroContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
export default function HeroSectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: HeroSectionFormProps) {
  const methods = useForm<HeroContent>({
    resolver: zodResolver(heroContentSchema),
    defaultValues: defaultValues || {
      heading: "",
      subheading: "",
      backgroundImage: "",
      ctaText: "",
      ctaLink: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  return (
    <FormProvider {...methods}>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {" "}
            Heading <span className="text-red-500">*</span>{" "}
          </label>{" "}
          <input
            type="text"
            {...register("heading")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Welcome to Our Solution"
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
            Subheading <span className="text-red-500">*</span>{" "}
          </label>{" "}
          <input
            type="text"
            {...register("subheading")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Transform your business with our innovative approach"
          />{" "}
          {errors.subheading && (
            <p className="mt-1 text-sm text-red-600">
              {errors.subheading.message}
            </p>
          )}{" "}
        </div>{" "}
        <ImageUploadField
          name="backgroundImage"
          label="Background Image"
          solutionId={solutionId}
          currentImageUrl={defaultValues?.backgroundImage}
        />{" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {" "}
            CTA Button Text <span className="text-red-500">*</span>{" "}
          </label>{" "}
          <input
            type="text"
            {...register("ctaText")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Get Started"
          />{" "}
          {errors.ctaText && (
            <p className="mt-1 text-sm text-red-600">
              {errors.ctaText.message}
            </p>
          )}{" "}
        </div>{" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {" "}
            CTA Button Link <span className="text-red-500">*</span>{" "}
          </label>{" "}
          <input
            type="text"
            {...register("ctaLink")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="/contact"
          />{" "}
          {errors.ctaLink && (
            <p className="mt-1 text-sm text-red-600">
              {errors.ctaLink.message}
            </p>
          )}{" "}
        </div>{" "}
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
