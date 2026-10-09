"use client";

import { useEffect, useState , useCallback} from "react";
import { useRouter, useParams } from "next/navigation";
import SolutionMetadataForm from "@/components/admin/solutions/SolutionMetadataForm";
import SectionManager from "@/components/admin/sections/SectionManager";
import PublishControls from "@/components/admin/solutions/PublishControls";
import type { CreateSolutionData } from "@/lib/validation/solution-schemas";

interface Solution {
  id: string;
  title: string;
  slug: string;
  metaDescription: string | null;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
  sections?: unknown[];
}

export default function SolutionEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchSolution = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/solutions/${id}`, {
        credentials: "include",
      });
      if (!response.ok) {
        if (response.status === 404) {
          setError("Solution not found");
          setTimeout(() => router.push("/admin/solutions"), 2000);
          return;
        }
        throw new Error("Failed to fetch solution");
      }
      const data = await response.json();
      setSolution(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load solution");
    } finally {
      setLoading(false);
    }
  }, [id, router]);
  useEffect(() => {
    if (id) {
      // State updates occur after network I/O, not synchronously in the effect.

      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchSolution();
    }
  }, [id, fetchSolution]);



  const handleSubmit = async (data: CreateSolutionData) => {
    try {
      setIsUpdating(true);
      setError(null);
      const response = await fetch(`/api/admin/solutions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          setError(
            "A solution with this slug already exists. Please choose a different slug.",
          );
          return;
        }
        throw new Error(errorData.error || "Failed to update solution");
      }

      const updatedSolution = await response.json();
      setSolution(updatedSolution);
      // Show success notification
      console.log("Solution updated successfully");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update solution",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !solution) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="mt-4 text-lg font-medium text-red-800">{error}</p>
          <p className="mt-2 text-sm text-red-600">
            Redirecting to solutions list...
          </p>
        </div>
      </div>
    );
  }

  if (!solution) return null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">
                {solution.title}
              </h1>
              {solution.isDraft ? (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                  Draft
                </span>
              ) : (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Published
                </span>
              )}
            </div>
            <button
              onClick={() => router.push("/admin/solutions")}
              className="mt-2 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Solutions
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Solution Metadata
            </h2>
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
            <SolutionMetadataForm
              defaultValues={{
                title: solution.title,
                slug: solution.slug,
                metaDescription: solution.metaDescription || undefined,
              }}
              onSubmit={handleSubmit}
              submitButtonText="Update Solution"
              isLoading={isUpdating}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Page Sections
            </h2>
            <SectionManager solutionId={id} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <PublishControls
              solutionId={id}
              isDraft={solution.isDraft}
              slug={solution.slug}
              onPublish={fetchSolution}
              onUnpublish={fetchSolution}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
