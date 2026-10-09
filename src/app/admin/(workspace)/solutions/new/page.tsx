"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SolutionMetadataForm from '@/components/admin/solutions/SolutionMetadataForm';
import type { CreateSolutionData } from '@/lib/validation/solution-schemas';

export default function NewSolutionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duplicateSlugError, setDuplicateSlugError] = useState(false);

  const handleSubmit = async (data: CreateSolutionData) => {
    try {
      setIsLoading(true);
      setError(null);
      setDuplicateSlugError(false);

      const response = await fetch('/api/admin/solutions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle duplicate slug error (409)
        if (response.status === 409) {
          setDuplicateSlugError(true);
          setError('A solution with this slug already exists. Please choose a different slug.');
          return;
        }
        
        // Handle validation errors (400)
        if (response.status === 400 && errorData.details) {
          const validationErrors = errorData.details.map((d: { message: string }) => d.message).join(', ');
          setError(`Validation error: ${validationErrors}`);
          return;
        }
        
        throw new Error(errorData.error || 'Failed to create solution');
      }

      const solution = await response.json();
      
      // Navigate to edit page
      router.push(`/admin/solutions/${solution.id}/edit`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create solution');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <button onClick={() => router.back()} className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Solutions
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Solution</h1>
          <p className="mt-1 text-sm text-gray-600">
            Add a new solution page to your site. You&apos;ll be able to add sections and content after creating.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <SolutionMetadataForm
          onSubmit={handleSubmit}
          submitButtonText="Create Solution"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
