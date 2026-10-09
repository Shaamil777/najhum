"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customContentSchema } from "@/lib/validation/section-schemas";
import { CustomContent } from "@/types/section";
interface CustomSectionFormProps {
  solutionId: string;
  defaultValues?: CustomContent;
  onSubmit: (data: CustomContent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
export default function CustomSectionForm({
  solutionId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: CustomSectionFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CustomContent>({
    resolver: zodResolver(customContentSchema),
    defaultValues: defaultValues || { heading: "", bodyHtml: "" },
  });

  const [rawJsonStr, setRawJsonStr] = useState("");
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    if (defaultValues && 'rawData' in defaultValues && defaultValues.rawData) {
      setRawJsonStr(JSON.stringify(defaultValues.rawData, null, 2));
    }
  }, [defaultValues]);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRawJsonStr(e.target.value);
    try {
      if (e.target.value.trim()) {
        const parsed = JSON.parse(e.target.value);
        setValue("rawData", parsed);
        setJsonError("");
      } else {
        setValue("rawData", undefined);
        setJsonError("");
      }
    } catch (err) {
      setJsonError("Invalid JSON format");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Heading *
        </label>
        <input
          type="text"
          {...register("heading")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.heading && (
          <p className="mt-1 text-sm text-red-600">{errors.heading.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          HTML Content *
        </label>
        <textarea
          {...register("bodyHtml")}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          placeholder="<p>Your HTML content here</p>"
        />
        {errors.bodyHtml && (
          <p className="mt-1 text-sm text-red-600">{errors.bodyHtml.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          HTML will be sanitized on the public page for security
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Raw Structured Data (JSON)
        </label>
        <textarea
          value={rawJsonStr}
          onChange={handleJsonChange}
          rows={12}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          placeholder='{"key": "value"}'
        />
        {jsonError && (
          <p className="mt-1 text-sm text-red-600">{jsonError}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Edit the structured data for this page directly in JSON format.
        </p>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || !!jsonError}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
