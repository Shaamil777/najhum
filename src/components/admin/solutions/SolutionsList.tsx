"use client";

import { useEffect, useState , useCallback} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Solution {
  id: string;
  title: string;
  slug: string;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

type FilterType = "all" | "draft" | "published";

export default function SolutionsList({ initialFilter = "all" }: { initialFilter?: FilterType }) {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const router = useRouter();

  const fetchSolutions = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/solutions", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch solutions");
      }
      const data = await response.json();
      setSolutions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load solutions");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    // State updates occur after network I/O, not synchronously in the effect.

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSolutions();
  }, [fetchSolutions]);



  const handleRowClick = (id: string) => {
    router.push(`/admin/solutions/${id}/edit`);
  };

  const filteredSolutions = solutions.filter((solution) => {
    if (filter === 'draft') return solution.isDraft;
    if (filter === 'published') return !solution.isDraft;
    return true;
  });

  const draftCount = solutions.filter(s => s.isDraft).length;
  const publishedCount = solutions.filter(s => !s.isDraft).length;

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 border-b border-gray-200 last:border-0">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (solutions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-lg shadow p-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No solutions yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first solution.</p>
          <div className="mt-6">
            <Link
              href="/admin/solutions/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Solution
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            All Solutions ({solutions.length})
          </h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
            <span>{draftCount} draft{draftCount !== 1 ? 's' : ''}</span>
            <span>•</span>
            <span>{publishedCount} published</span>
          </div>
        </div>
        <Link
          href="/admin/solutions/new"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create New Solution
        </Link>
      </div>

      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-8 min-w-max px-2">
          <button
            onClick={() => setFilter('all')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${filter === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            All
            <span className={`ml-2 py-0.5 px-2 rounded-full text-xs font-medium ${filter === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
              {solutions.length}
            </span>
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${filter === 'draft' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Drafts Only
            <span className={`ml-2 py-0.5 px-2 rounded-full text-xs font-medium ${filter === 'draft' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
              {draftCount}
            </span>
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${filter === 'published' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Published Only
            <span className={`ml-2 py-0.5 px-2 rounded-full text-xs font-medium ${filter === 'published' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
              {publishedCount}
            </span>
          </button>
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {filteredSolutions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No {filter === 'draft' ? 'draft' : 'published'} solutions found.
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSolutions.map((solution) => (
                <tr
                  key={solution.id}
                  onClick={() => handleRowClick(solution.id)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {solution.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 font-mono">
                      /{solution.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {solution.isDraft ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Draft
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Published
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(solution.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
