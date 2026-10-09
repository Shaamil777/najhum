"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PublishControlsProps {
  solutionId: string;
  isDraft: boolean;
  slug: string;
  onPublish?: () => void;
  onUnpublish?: () => void;
}

export default function PublishControls({
  solutionId,
  isDraft,
  slug,
  onPublish,
  onUnpublish,
}: PublishControlsProps) {
  const router = useRouter();
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePublish = async () => {
    try {
      setPublishing(true);
      setError(null);
      
      const res = await fetch(`/api/admin/solutions/${solutionId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDraft: !isDraft })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update publish status');
      }

      if (isDraft && onPublish) onPublish();
      if (!isDraft && onUnpublish) onUnpublish();
      
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating status');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Status</h3>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isDraft ? 'bg-yellow-400' : 'bg-green-500'}`} />
          <span className="text-sm font-medium text-gray-700">
            {isDraft ? 'Draft (Not visible to public)' : 'Published (Visible to public)'}
          </span>
        </div>
      </div>
      
      {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}
      
      <div className="space-y-3">
        <button
          onClick={togglePublish}
          disabled={publishing}
          className={`w-full py-2.5 px-4 rounded-md text-sm font-medium text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
            isDraft 
              ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
              : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
          }`}
        >
          {publishing 
            ? 'Updating...' 
            : isDraft 
              ? 'Publish Solution' 
              : 'Revert to Draft'
          }
        </button>
        
        {!isDraft && (
          <a
            href={`/solutions/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Live Page
          </a>
        )}
      </div>
    </div>
  );
}