"use client";

import { useState, useEffect , useCallback} from 'react';
import Image from 'next/image';

interface Image {
  id: string;
  url: string;
  altText: string | null;
  size: number;
  mimeType: string;
  solutionId: string;
}

interface ImageGalleryProps {
  solutionId: string;
  onSelect?: (url: string) => void;
  onDelete?: (id: string) => void;
  selectedUrl?: string | null;
  showSelect?: boolean;
  showDelete?: boolean;
}

export default function ImageGallery({
  solutionId,
  onSelect,
  onDelete,
  selectedUrl,
  showSelect = false,
  showDelete = true,
}: ImageGalleryProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/solutions/${solutionId}/images`);
      if (!res.ok) throw new Error('Failed to fetch images');
      const data = await res.json();
      setImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load images');
    } finally {
      setLoading(false);
    }
  }, [solutionId]);
  useEffect(() => {
    // State updates occur after network I/O, not synchronously in the effect.

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchImages();
  }, [fetchImages]);



  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const res = await fetch(`/api/admin/images/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete image');
      setImages(images.filter(img => img.id !== id));
      if (onDelete) onDelete(id);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error deleting image');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading library...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (images.length === 0) return <div className="p-8 text-center text-gray-500">No images uploaded yet.</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map(image => (
        <div 
          key={image.id}
          className={`relative group rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
            selectedUrl === image.url ? 'border-blue-500 shadow-md ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onSelect && onSelect(image.url)}
        >
          <div className="aspect-square relative bg-gray-50">
            <Image fill unoptimized 
              src={image.url}
              alt={image.altText || "Solution image"}
              className="object-contain w-full h-full"
            />
          </div>
          
          {showDelete && <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-start justify-end p-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={(e) => handleDelete(e, image.id)}
              className="bg-white text-red-600 rounded-full p-1.5 shadow hover:bg-red-50"
              title="Delete image"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>}
          
          <div className="p-2 text-xs text-gray-500 truncate bg-white border-t border-gray-100">
            {image.altText || "Solution image"}
          </div>
        </div>
      ))}
    </div>
  );
}