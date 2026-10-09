"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { challengeContentSchema } from "@/lib/validation/section-schemas";
import { ChallengeContent } from "@/types/section";
interface ChallengeSectionFormProps {
  solutionId: string;
  defaultValues?: ChallengeContent;
  onSubmit: (data: ChallengeContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
export default function ChallengeSectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: ChallengeSectionFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChallengeContent>({
    resolver: zodResolver(challengeContentSchema),
    defaultValues: defaultValues || {
      heading: "EXPLORE THE EVOLTICS ECOSYSTEM",
      description:
        "Integrated solutions for smarter, scalable EV charging infrastructure.",
      challenges: [
        {
          title: "Energy Costs",
          description:
            "HVAC, lighting, kitchens & pools drive utility bills to 6% of revenue.",
          category: "Cost Reduction",
          exploreLink: "/platforms/iems",
        },
        {
          title: "Guest Experience",
          description: "Temperature & air quality directly impact reviews.",
          category: "Experience",
          exploreLink: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "challenges",
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {" "}
      <div className="space-y-4">
        {" "}
        <div>
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {" "}
            Section Heading *{" "}
          </label>{" "}
          <input
            type="text"
            {...register("heading")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. EXPLORE THE ECOSYSTEM"
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
            Section Description (Optional){" "}
          </label>{" "}
          <textarea
            {...register("description")}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Integrated solutions for smarter infrastructure."
          />{" "}
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}{" "}
        </div>{" "}
      </div>{" "}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        {" "}
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Challenge Items
        </h3>{" "}
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-200 rounded-md">
            {" "}
            <div className="flex justify-between items-center mb-3">
              {" "}
              <h4 className="text-sm font-medium text-gray-700">
                {" "}
                Card {index + 1}{" "}
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
                  {...register(`challenges.${index}.title` as const)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />{" "}
                {errors.challenges?.[index]?.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {" "}
                    {errors.challenges[index]?.title?.message}{" "}
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
                  {...register(`challenges.${index}.description` as const)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />{" "}
                {errors.challenges?.[index]?.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {" "}
                    {errors.challenges[index]?.description?.message}{" "}
                  </p>
                )}{" "}
              </div>{" "}
              <div className="grid grid-cols-2 gap-4">
                {" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {" "}
                    Category (Optional){" "}
                  </label>{" "}
                  <input
                    type="text"
                    {...register(`challenges.${index}.category` as const)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Charging Infrastructure"
                  />{" "}
                  {errors.challenges?.[index]?.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {" "}
                      {errors.challenges[index]?.category?.message}{" "}
                    </p>
                  )}{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {" "}
                    Explore Link (Optional){" "}
                  </label>{" "}
                  <input
                    type="text"
                    {...register(`challenges.${index}.exploreLink` as const)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. /platforms/evoltics"
                  />{" "}
                  {errors.challenges?.[index]?.exploreLink && (
                    <p className="mt-1 text-sm text-red-600">
                      {" "}
                      {errors.challenges[index]?.exploreLink?.message}{" "}
                    </p>
                  )}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <button
        type="button"
        onClick={() =>
          append({ title: "", description: "", category: "", exploreLink: "" })
        }
        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600"
      >
        {" "}
        + Add Challenge Item{" "}
      </button>{" "}
      {errors.challenges && (
        <p className="text-sm text-red-600">{errors.challenges.message}</p>
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
