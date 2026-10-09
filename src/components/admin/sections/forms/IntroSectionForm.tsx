"use client";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Plus, Trash2 } from "lucide-react";
import { introContentSchema } from "@/lib/validation/section-schemas";
import type { IntroContent } from "@/types/section";
import { ImageUploadField } from "@/components/admin/ui/ImageUploadField";
import IntroSection from "@/components/solutions/IntroSection";
interface IntroSectionFormProps {
  solutionId: string;
  defaultValues?: IntroContent;
  onSubmit: (data: IntroContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
type TextField =
  | "heading"
  | "eyebrow"
  | "summary"
  | "bodyText"
  | "imageAlt"
  | "imageCaption"
  | "buttonText"
  | "buttonLink";
const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#4c3bcf] focus:outline-none focus:ring-2 focus:ring-[#4c3bcf]/20";
const groupClass =
  "space-y-5 rounded-xl border border-gray-200 border-t-2 border-t-[#4c3bcf]/30 bg-white p-5";
const addClass =
  "inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50";
export default function IntroSectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: IntroSectionFormProps) {
  const methods = useForm<IntroContent>({
    resolver: zodResolver(introContentSchema),
    defaultValues: {
      heading: "",
      bodyText: "",
      image: "",
      eyebrow: "",
      summary: "",
      bodyFormat: defaultValues ? "html" : "text",
      imageAlt: "",
      imageCaption: "",
      imagePosition: "right",
      theme: "light",
      highlights: [],
      stats: [],
      buttonText: "",
      buttonLink: "",
      ...defaultValues,
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const highlights = useFieldArray({ control, name: "highlights" });
  const stats = useFieldArray({ control, name: "stats" });
  const preview = useWatch({ control }) as IntroContent;
  const field = (
    name: TextField,
    label: string,
    placeholder = "",
    rows?: number,
  ) => (
    <div>
      {" "}
      <label
        htmlFor={`intro-${name}`}
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>{" "}
      {rows ? (
        <textarea
          id={`intro-${name}`}
          {...register(name)}
          rows={rows}
          placeholder={placeholder}
          className={inputClass}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `intro-${name}-error` : undefined}
        />
      ) : (
        <input
          id={`intro-${name}`}
          {...register(name)}
          placeholder={placeholder}
          className={inputClass}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `intro-${name}-error` : undefined}
        />
      )}{" "}
      {errors[name] && (
        <p id={`intro-${name}-error`} className="mt-1 text-sm text-red-600">
          {errors[name]?.message}
        </p>
      )}{" "}
    </div>
  );
  return (
    <FormProvider {...methods}>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {" "}
        <div className="flex items-start gap-4 rounded-xl bg-[#4c3bcf]/5 p-5">
          {" "}
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#4c3bcf] text-white">
            <ArrowUpRight size={24} aria-hidden="true" />
          </span>{" "}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Tell your solution&apos;s story
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Bold typography, signature violet accents, and space for what
              makes your solution different.
            </p>
          </div>{" "}
        </div>{" "}
        <fieldset disabled={isLoading} className="space-y-5">
          {" "}
          <div className={groupClass}>
            {" "}
            <h4 className="font-semibold text-gray-900">Content</h4>{" "}
            {field("eyebrow", "Section label", "THE SOLUTION")}{" "}
            {field(
              "heading",
              "Heading *",
              "Smarter infrastructure. Greater possibilities.",
            )}{" "}
            {field(
              "summary",
              "Lead paragraph",
              "A short, compelling overview of your solution.",
              2,
            )}{" "}
            {field(
              "bodyText",
              "Description *",
              "Explain the problem you solve and the value you bring.",
              5,
            )}{" "}
            <div>
              <label
                htmlFor="intro-body-format"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Description format
              </label>
              <select
                id="intro-body-format"
                {...register("bodyFormat")}
                className={inputClass}
              >
                <option value="text">Plain text (preserves line breaks)</option>
                <option value="html">HTML (existing rich content)</option>
              </select>
            </div>{" "}
          </div>{" "}
          <div className={groupClass}>
            {" "}
            <h4 className="font-semibold text-gray-900">Image & layout</h4>{" "}
            <div className="grid gap-4 sm:grid-cols-2">
              {" "}
              <div>
                <label
                  htmlFor="intro-theme"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Appearance
                </label>
                <select
                  id="intro-theme"
                  {...register("theme")}
                  className={inputClass}
                >
                  <option value="light">Light / signature violet</option>
                  <option value="dark">Dark / luminous violet</option>
                </select>
              </div>{" "}
              <div>
                <label
                  htmlFor="intro-position"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Image placement
                </label>
                <select
                  id="intro-position"
                  {...register("imagePosition")}
                  className={inputClass}
                >
                  <option value="right">Image on the right</option>
                  <option value="left">Image on the left</option>
                </select>
              </div>{" "}
            </div>{" "}
            <ImageUploadField
              key={preview.image || "no-image"}
              name="image"
              label="Section image (optional)"
              solutionId={solutionId}
              currentImageUrl={preview.image}
            />{" "}
            {preview.image && (
              <button
                type="button"
                className={addClass}
                onClick={() =>
                  methods.setValue("image", "", {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                Remove image
              </button>
            )}{" "}
            {field(
              "imageAlt",
              "Image description",
              "Describe the image for screen readers",
            )}{" "}
            {field(
              "imageCaption",
              "Image caption",
              "Optional context beneath the image",
            )}{" "}
          </div>{" "}
          <div className={groupClass}>
            {" "}
            <div>
              <h4 className="font-semibold text-gray-900">Key highlights</h4>
              <p className="mt-1 text-sm text-gray-500">
                Add up to four reasons to choose this solution.
              </p>
            </div>{" "}
            {highlights.fields.map((item, index) => (
              <div
                key={item.id}
                className="space-y-3 rounded-lg border border-gray-200 p-4"
              >
                {" "}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Highlight {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => highlights.remove(index)}
                    aria-label={`Remove highlight ${index + 1}`}
                    className="rounded p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>{" "}
                <label className="block text-sm text-gray-700">
                  Title
                  <input
                    {...register(`highlights.${index}.title`)}
                    className={`${inputClass} mt-1`}
                    placeholder="Seamless integration"
                  />
                </label>{" "}
                {errors.highlights?.[index]?.title && (
                  <p className="text-sm text-red-600">
                    {errors.highlights[index]?.title?.message}
                  </p>
                )}{" "}
                <label className="block text-sm text-gray-700">
                  Description (optional)
                  <textarea
                    {...register(`highlights.${index}.description`)}
                    className={`${inputClass} mt-1`}
                    rows={2}
                    placeholder="Connect with the systems you already use."
                  />
                </label>{" "}
                {errors.highlights?.[index]?.description && (
                  <p className="text-sm text-red-600">
                    {errors.highlights[index]?.description?.message}
                  </p>
                )}{" "}
              </div>
            ))}{" "}
            <button
              type="button"
              onClick={() => highlights.append({ title: "", description: "" })}
              disabled={highlights.fields.length >= 4}
              className={addClass}
            >
              <Plus size={16} />
              Add highlight
            </button>{" "}
          </div>{" "}
          <div className={groupClass}>
            {" "}
            <div>
              <h4 className="font-semibold text-gray-900">Proof points</h4>
              <p className="mt-1 text-sm text-gray-500">
                Add up to three metrics using your own verified results.
              </p>
            </div>{" "}
            {stats.fields.map((item, index) => (
              <div
                key={item.id}
                className="rounded-lg border border-gray-200 p-4"
              >
                {" "}
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Metric {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => stats.remove(index)}
                    aria-label={`Remove metric ${index + 1}`}
                    className="rounded p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>{" "}
                <div className="grid gap-3 sm:grid-cols-2">
                  {" "}
                  <label className="block text-sm text-gray-700">
                    Value
                    <input
                      {...register(`stats.${index}.value`)}
                      className={`${inputClass} mt-1`}
                      placeholder="e.g. 30%"
                    />
                  </label>{" "}
                  <label className="block text-sm text-gray-700">
                    Label
                    <input
                      {...register(`stats.${index}.label`)}
                      className={`${inputClass} mt-1`}
                      placeholder="e.g. Less energy used"
                    />
                  </label>{" "}
                </div>{" "}
                {errors.stats?.[index]?.value && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.stats[index]?.value?.message}
                  </p>
                )}{" "}
                {errors.stats?.[index]?.label && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.stats[index]?.label?.message}
                  </p>
                )}{" "}
              </div>
            ))}{" "}
            <button
              type="button"
              onClick={() => stats.append({ value: "", label: "" })}
              disabled={stats.fields.length >= 3}
              className={addClass}
            >
              <Plus size={16} />
              Add metric
            </button>{" "}
          </div>{" "}
          <div className={groupClass}>
            {" "}
            <h4 className="font-semibold text-gray-900">
              Call to action (optional)
            </h4>{" "}
            {field("buttonText", "Button text", "Explore the solution")}{" "}
            {field(
              "buttonLink",
              "Button destination",
              "/contact or https://example.com",
            )}{" "}
          </div>{" "}
        </fieldset>{" "}
        <details
          open
          className="overflow-hidden rounded-xl border border-[#4c3bcf]/20"
        >
          {" "}
          <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-gray-900">
            Preview introduction
          </summary>{" "}
          <div className="pointer-events-none" inert>
            <IntroSection content={preview} />
          </div>{" "}
        </details>{" "}
        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          {" "}
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className={addClass}
          >
            Cancel
          </button>{" "}
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-[#4c3bcf] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#3e2db8] disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save introduction"}
          </button>{" "}
        </div>{" "}
      </form>{" "}
    </FormProvider>
  );
}
