"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCasesContentSchema } from "@/lib/validation/section-schemas";
import { UseCasesContent } from "@/types/section";
interface UseCasesSectionFormProps {
  solutionId: string;
  defaultValues?: UseCasesContent;
  onSubmit: (data: UseCasesContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
export default function UseCasesSectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: UseCasesSectionFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UseCasesContent>({
    resolver: zodResolver(useCasesContentSchema),
    defaultValues: defaultValues || {
      eyebrow: "11 USE CASES",
      heading: "From room to rooftop — every system covered",
      tabs: [
        {
          id: "smart-guest-environment",
          label: "Smart Guest Environment",
          solutionDetails:
            "Sensors: NI308 Indoor Ambience Sensor + NI201 Smart Thermostat",
          statValue: "30%",
          statDescription:
            "Reduction in HVAC energy through occupancy-linked automation",
          bullets: [
            "Real-time temp, humidity, CO2 & air quality per zone",
            "Occupancy-linked HVAC automation",
            "Proactive alerts before guests notice problems",
            "Centralised dashboard across all floors",
          ],
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "tabs" });
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
            placeholder="e.g. 11 USE CASES"
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
            placeholder="e.g. From room to rooftop — every system covered"
          />{" "}
          {errors.heading && (
            <p className="mt-1 text-sm text-red-600">
              {errors.heading.message}
            </p>
          )}{" "}
        </div>{" "}
      </div>{" "}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        {" "}
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Use Case Tabs
        </h3>{" "}
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-200 rounded-md">
            {" "}
            <div className="flex justify-between items-center mb-3">
              {" "}
              <h4 className="text-sm font-medium text-gray-700">
                {" "}
                Tab {index + 1}{" "}
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
              <div className="grid grid-cols-2 gap-4">
                {" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {" "}
                    Tab ID *{" "}
                  </label>{" "}
                  <input
                    type="text"
                    {...register(`tabs.${index}.id` as const)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. smart-guest"
                  />{" "}
                  {errors.tabs?.[index]?.id && (
                    <p className="mt-1 text-sm text-red-600">
                      {" "}
                      {errors.tabs[index]?.id?.message}{" "}
                    </p>
                  )}{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {" "}
                    Tab Label *{" "}
                  </label>{" "}
                  <input
                    type="text"
                    {...register(`tabs.${index}.label` as const)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Smart Guest Environment"
                  />{" "}
                  {errors.tabs?.[index]?.label && (
                    <p className="mt-1 text-sm text-red-600">
                      {" "}
                      {errors.tabs[index]?.label?.message}{" "}
                    </p>
                  )}{" "}
                </div>{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {" "}
                  Solution Details *{" "}
                </label>{" "}
                <textarea
                  {...register(`tabs.${index}.solutionDetails` as const)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Sensors: NI308 Indoor Ambience Sensor..."
                />{" "}
                {errors.tabs?.[index]?.solutionDetails && (
                  <p className="mt-1 text-sm text-red-600">
                    {" "}
                    {errors.tabs[index]?.solutionDetails?.message}{" "}
                  </p>
                )}{" "}
              </div>{" "}
              <div className="grid grid-cols-[120px_1fr] gap-4">
                {" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {" "}
                    Stat Value *{" "}
                  </label>{" "}
                  <input
                    type="text"
                    {...register(`tabs.${index}.statValue` as const)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 30%"
                  />{" "}
                  {errors.tabs?.[index]?.statValue && (
                    <p className="mt-1 text-sm text-red-600">
                      {" "}
                      {errors.tabs[index]?.statValue?.message}{" "}
                    </p>
                  )}{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {" "}
                    Stat Description *{" "}
                  </label>{" "}
                  <input
                    type="text"
                    {...register(`tabs.${index}.statDescription` as const)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Reduction in HVAC energy..."
                  />{" "}
                  {errors.tabs?.[index]?.statDescription && (
                    <p className="mt-1 text-sm text-red-600">
                      {" "}
                      {errors.tabs[index]?.statDescription?.message}{" "}
                    </p>
                  )}{" "}
                </div>{" "}
              </div>{" "}
              {/* Bullet Points */}{" "}
              <div className="space-y-2">
                {" "}
                <label className="block text-sm font-medium text-gray-700">
                  {" "}
                  Bullet Points *{" "}
                </label>{" "}
                {[0, 1, 2, 3].map((bulletIndex) => (
                  <div key={bulletIndex}>
                    {" "}
                    <input
                      type="text"
                      {...register(
                        `tabs.${index}.bullets.${bulletIndex}` as const,
                      )}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder={`Bullet point ${bulletIndex + 1}`}
                    />{" "}
                    {errors.tabs?.[index]?.bullets?.[bulletIndex] && (
                      <p className="mt-1 text-xs text-red-600">
                        {" "}
                        {
                          errors.tabs[index]?.bullets?.[bulletIndex]?.message
                        }{" "}
                      </p>
                    )}{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <button
        type="button"
        onClick={() =>
          append({
            id: "",
            label: "",
            solutionDetails: "",
            statValue: "",
            statDescription: "",
            bullets: ["", "", "", ""],
          })
        }
        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600"
      >
        {" "}
        + Add Tab{" "}
      </button>{" "}
      {errors.tabs && (
        <p className="text-sm text-red-600">{errors.tabs.message}</p>
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
