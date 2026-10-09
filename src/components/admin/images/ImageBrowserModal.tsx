"use client";
/** * ImageBrowserModal Component * * Modal dialog for browsing and selecting existing images from the gallery. * Can be integrated into ImageUploadField for reusing uploaded images. */ import { useState } from "react";
import ImageGallery from "./ImageGallery";
interface ImageBrowserModalProps {
  solutionId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
  currentUrl?: string;
}
export default function ImageBrowserModal({
  solutionId,
  isOpen,
  onClose,
  onSelect,
  currentUrl,
}: ImageBrowserModalProps) {
  const [selectedUrl, setSelectedUrl] = useState<string | undefined>(
    currentUrl,
  );
  if (!isOpen) return null;
  const handleSelect = (url: string) => {
    setSelectedUrl(url);
  };
  const handleConfirm = () => {
    if (selectedUrl) {
      onSelect(selectedUrl);
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {" "}
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {" "}
        <div className="p-6 border-b border-gray-200">
          {" "}
          <div className="flex items-center justify-between">
            {" "}
            <h3 className="text-lg font-semibold text-gray-900">
              {" "}
              Browse Images{" "}
            </h3>{" "}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              {" "}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />{" "}
              </svg>{" "}
            </button>{" "}
          </div>{" "}
          <p className="mt-1 text-sm text-gray-600">
            {" "}
            Select an image from your library to use in this section{" "}
          </p>{" "}
        </div>{" "}
        <div className="p-6 overflow-y-auto flex-1">
          {" "}
          <ImageGallery
            solutionId={solutionId}
            onSelect={handleSelect}
            selectedUrl={selectedUrl}
            showSelect={true}
            showDelete={false}
          />{" "}
        </div>{" "}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          {" "}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            {" "}
            Cancel{" "}
          </button>{" "}
          <button
            onClick={handleConfirm}
            disabled={!selectedUrl}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {" "}
            Use Selected Image{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
