"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSolutionSchema, type CreateSolutionData } from '@/lib/validation/solution-schemas';

interface SolutionMetadataFormProps {
  defaultValues?: Partial<CreateSolutionData>;
  onSubmit: (data: CreateSolutionData) => Promise<void>;
  submitButtonText?: string;
  isLoading?: boolean;
}

export default function SolutionMetadataForm({
  defaultValues,
  onSubmit,
  submitButtonText = 'Save',
  isLoading = false,
}: SolutionMetadataFormProps) {
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateSolutionData>({
    resolver: zodResolver(createSolutionSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      slug: defaultValues?.slug || '',
      metaDescription: defaultValues?.metaDescription || '',
    },
  });

  const title = watch('title');

  const generateSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/&/g, '-and-')      // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
      .replace(/\-\-+/g, '-');     // Replace multiple - with single -
  };

  const handleGenerateSlug = () => {
    if (title) {
      setIsGeneratingSlug(true);
      setTimeout(() => {
        setValue('slug', generateSlug(title), { shouldValidate: true });
        setIsGeneratingSlug(false);
      }, 300);
    }
  };

  const handleTitleBlur = () => {
    // Only auto-generate slug if it's currently empty
    if (title && !watch('slug')) {
      setValue('slug', generateSlug(title), { shouldValidate: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          {...register('title')}
          onBlur={handleTitleBlur}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="My Amazing Solution"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Slug Field */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={handleGenerateSlug}
            disabled={!title || isGeneratingSlug}
            className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingSlug ? 'Generating...' : 'Generate from title'}
          </button>
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
            /
          </span>
          <input
            type="text"
            id="slug"
            {...register('slug')}
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="my-amazing-solution"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          URL-safe identifier (lowercase letters, numbers, and hyphens only)
        </p>
        {errors.slug && (
          <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
        )}
      </div>

      {/* Meta Description Field */}
      <div>
        <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">
          Meta Description <span className="text-gray-500 text-xs">(Optional)</span>
        </label>
        <textarea
          id="metaDescription"
          {...register('metaDescription')}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Brief description for search engines (max 300 characters)"
        />
        {errors.metaDescription && (
          <p className="mt-1 text-sm text-red-600">{errors.metaDescription.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          {watch('metaDescription')?.length || 0} / 300 characters
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            submitButtonText
          )}
        </button>
      </div>
    </form>
  );
}