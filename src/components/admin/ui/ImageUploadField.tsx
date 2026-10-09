"use client";

import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ImageBrowserModal from '../images/ImageBrowserModal';

interface ImageUploadFieldProps {
  name: string;
  label: string;
  solutionId: string;
  required?: boolean;
  currentImageUrl?: string | null;
}

export function ImageUploadField({
  name,
  label,
  solutionId,
  required = false,
  currentImageUrl,
}: ImageUploadFieldProps) {
  const { setValue, formState: { errors } } = useFormContext();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [dragActive, setDragActive] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const errorMessage = errors[name]?.message as string | undefined;

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    try {
      setUploading(true);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Upload to API
      const formData = new FormData();
      formData.append('file', file);
      formData.append('solutionId', solutionId);
      
      const response = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }
      
      const data = await response.json();
      
      // Update form value with image URL
      setValue(name, data.url, { shouldValidate: true });
    } catch (error) {
      console.error('Image upload error:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload image');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrag = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    // Don't trigger file input if clicking browse button
    if ((event.target as HTMLElement).closest('.browse-button')) {
      return;
    }
    fileInputRef.current?.click();
  };

  const handleBrowseSelect = (imageUrl: string) => {
    setPreview(imageUrl);
    setValue(name, imageUrl, { shouldValidate: true });
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div 
        className={"border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors " + (dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400")}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {preview ? (
          <div className="space-y-4">
            <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
            <p className="text-sm text-gray-600">Click or drag to replace image</p>
          </div>
        ) : (
          <div className="space-y-2">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span>
              {' or drag and drop'}
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP up to 10MB</p>
          </div>
        )}
        {uploading && (
          <div className="mt-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-sm text-gray-600">Uploading...</p>
          </div>
        )}
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" 
          onChange={handleFileChange} 
          className="hidden" 
          disabled={uploading} 
        />
      </div>
      <button 
        type="button" 
        onClick={(e) => { e.preventDefault(); setShowBrowser(true); }} 
        className="browse-button w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Browse Library
      </button>
      {errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}
      {showBrowser && (
        <ImageBrowserModal 
          solutionId={solutionId} 
          isOpen={showBrowser} 
          onClose={() => setShowBrowser(false)} 
          onSelect={handleBrowseSelect} 
          currentUrl={preview || undefined} 
        />
      )}
    </div>
  );
}