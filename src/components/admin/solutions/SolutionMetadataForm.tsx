"use client";

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, Image as ImageIcon, X, FolderOpen, Check } from 'lucide-react';
import { createSolutionSchema, type CreateSolutionData } from '@/lib/validation/solution-schemas';
import ImageBrowserModal from '../images/ImageBrowserModal';

interface SolutionMetadataFormProps {
  defaultValues?: Partial<CreateSolutionData>;
  onSubmit: (data: CreateSolutionData) => Promise<void>;
  submitButtonText?: string;
  isLoading?: boolean;
  solutionId?: string;
}

export default function SolutionMetadataForm({
  defaultValues,
  onSubmit,
  submitButtonText = 'Save',
  isLoading = false,
  solutionId,
}: SolutionMetadataFormProps) {
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [showImageBrowser, setShowImageBrowser] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      coverImage: defaultValues?.coverImage || '',
      platforms: defaultValues?.platforms || [],
    },
  });

  const title = watch('title');
  const coverImage = watch('coverImage');

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
    if (title && !watch('slug')) {
      setValue('slug', generateSlug(title), { shouldValidate: true });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingCover(true);

      const formData = new FormData();
      formData.append('file', file);
      if (solutionId) {
        formData.append('solutionId', solutionId);
      }

      const response = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload cover image');
      }

      const data = await response.json();
      if (data.url) {
        setValue('coverImage', data.url, { shouldValidate: true, shouldDirty: true });
      }
    } catch (err) {
      console.error('Error uploading cover image:', err);
      alert(err instanceof Error ? err.message : 'Cover image upload failed');
    } finally {
      setIsUploadingCover(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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

      {/* Solutions Cover Image Option */}
      <div className="pt-2 border-t border-gray-100">
        <label className="block text-sm font-semibold text-gray-900 mb-1">
          Carousel Cover Image
        </label>
        <p className="text-xs text-gray-500 mb-3">
          This image appears on the solution cards in the platform page carousels. Upload a high-res photo or enter an image URL.
        </p>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="space-y-3">
          {/* Action row: Upload / Browse / Paste URL */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingCover}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>{isUploadingCover ? 'Uploading...' : 'Upload Image'}</span>
            </button>

            {solutionId && (
              <button
                type="button"
                onClick={() => setShowImageBrowser(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FolderOpen className="w-4 h-4 text-gray-500" />
                <span>Browse Gallery</span>
              </button>
            )}

            {coverImage && (
              <button
                type="button"
                onClick={() => setValue('coverImage', '', { shouldDirty: true, shouldValidate: true })}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors ml-auto"
              >
                <X className="w-4 h-4" />
                <span>Remove</span>
              </button>
            )}
          </div>

          {/* URL text input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <ImageIcon className="w-4 h-4" />
            </div>
            <input
              type="text"
              {...register('coverImage')}
              placeholder="Or enter direct image URL (https://...)"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Image Preview */}
          {coverImage && (
            <div className="relative mt-2 p-2 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden max-w-md">
              <div className="relative w-full h-36 rounded-lg overflow-hidden bg-slate-200">
                <img
                  src={coverImage}
                  alt="Cover image preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 shadow-xs border border-white/80 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Carousel Card Preview
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Target Platforms Selection */}
      <div className="pt-2 border-t border-gray-100">
        <label className="block text-sm font-semibold text-gray-900 mb-1">
          Target Platform Pages (Featured Carousel)
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Tick the platforms where this solution should appear in their interactive solutions carousel.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'iotrics',
              name: 'IoTRICS',
              desc: 'Industrial IoT & Connectivity',
              accent: 'border-blue-500 bg-blue-50/50',
            },
            {
              id: 'evoltics',
              name: 'EVOLTICS',
              desc: 'EV Charging Infrastructure',
              accent: 'border-sky-500 bg-sky-50/50',
            },
            {
              id: 'cropifai',
              name: 'CropifAI',
              desc: 'Precision AgriTech',
              accent: 'border-indigo-500 bg-indigo-50/50',
            },
          ].map((platform) => {
            const currentPlatforms = watch('platforms') || [];
            const isChecked = currentPlatforms.includes(platform.id);

            return (
              <label
                key={platform.id}
                className={`flex items-start p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  isChecked
                    ? `${platform.accent} shadow-sm`
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...currentPlatforms, platform.id]
                      : currentPlatforms.filter((p) => p !== platform.id);
                    setValue('platforms', next, { shouldValidate: true, shouldDirty: true });
                  }}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-3">
                  <span className="block text-sm font-bold text-gray-900">
                    {platform.name}
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5">
                    {platform.desc}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Image Browser Modal */}
      {solutionId && (
        <ImageBrowserModal
          solutionId={solutionId}
          isOpen={showImageBrowser}
          onClose={() => setShowImageBrowser(false)}
          onSelect={(url) => {
            setValue('coverImage', url, { shouldValidate: true, shouldDirty: true });
          }}
          currentUrl={coverImage || undefined}
        />
      )}

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