"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Package, Tag, Boxes } from "lucide-react";

export default function ProductForm({ 
  initialData = null,
  availableSolutions = []
}: { 
  initialData?: any;
  availableSolutions?: { slug: string, title: string }[];
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [brochureUrl, setBrochureUrl] = useState(initialData?.brochureUrl || "");
  const [platforms, setPlatforms] = useState<string[]>(initialData?.platforms || []);
  const [solutions, setSolutions] = useState<string[]>(initialData?.solutions || []);

  const PLATFORMS = [
    { id: "evoltics", label: "Evoltics Platform" },
    { id: "iotrics", label: "IoTRICS Platform" },
    { id: "cropifai", label: "CropifAI Platform" },
  ];

  const handleTogglePlatform = (platformId: string) => {
    if (platforms.includes(platformId)) {
      setPlatforms(platforms.filter(p => p !== platformId));
    } else {
      setPlatforms([...platforms, platformId]);
    }
  };

  const handleToggleSolution = (solutionId: string) => {
    if (solutions.includes(solutionId)) {
      setSolutions(solutions.filter(s => s !== solutionId));
    } else {
      setSolutions([...solutions, solutionId]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const url = initialData ? `/api/admin/products/${initialData.id}` : "/api/admin/products";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          imageUrl,
          brochureUrl,
          platforms,
          solutions,
          features: initialData?.features || [],
          details: initialData?.details || {},
        }),
      });

      if (!res.ok) throw new Error("Failed to save product");

      toast.success(`Product ${initialData ? "updated" : "created"} successfully`);
      router.refresh();
      router.push("/admin/products");
    } catch (err: any) {
      toast.error(err.message || "Failed to save product");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Product Name *
          </label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Description *
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Brochure PDF URL
          </label>
          <input
            type="url"
            value={brochureUrl}
            onChange={(e) => setBrochureUrl(e.target.value)}
            placeholder="https://.../brochure.pdf"
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        <div className="border-t border-slate-200 pt-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Tag size={16} className="text-primary" /> Showcase on Platform Pages
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Select which platform pages should showcase this product in their product carousel.
          </p>
          <div className="flex gap-4 flex-wrap">
            {PLATFORMS.map((platform) => (
              <label key={platform.id} className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${platforms.includes(platform.id) ? 'bg-primary/5 border-primary/30' : 'border-slate-200 hover:bg-slate-50'}`}>
                <input
                  type="checkbox"
                  checked={platforms.includes(platform.id)}
                  onChange={() => handleTogglePlatform(platform.id)}
                  className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                />
                <span className="text-sm font-medium text-slate-700">{platform.label}</span>
              </label>
            ))}
          </div>
        </div>

        {availableSolutions.length > 0 && (
          <div className="border-t border-slate-200 pt-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Boxes size={16} className="text-indigo-500" /> Link to Solutions
            </label>
            <p className="text-xs text-slate-500 mb-3">
              If you add a "Products Carousel" section to any of these Solutions, this product will appear there.
            </p>
            <div className="flex gap-3 flex-wrap max-h-60 overflow-y-auto p-1">
              {availableSolutions.map((sol) => (
                <label key={sol.slug} className={`flex items-center gap-2 p-2 px-3 border rounded-lg cursor-pointer transition-colors ${solutions.includes(sol.slug) ? 'bg-indigo-50 border-indigo-200' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input
                    type="checkbox"
                    checked={solutions.includes(sol.slug)}
                    onChange={() => handleToggleSolution(sol.slug)}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-600"
                  />
                  <span className="text-sm font-medium text-slate-700 line-clamp-1 max-w-[200px]">{sol.title}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 sticky bottom-0 bg-[#f6f8fc] p-4 -mx-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          disabled={isSaving}
          className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg disabled:opacity-50 transition-colors shadow-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 transition-colors shadow-sm flex items-center gap-2"
        >
          <Package size={16} />
          {isSaving ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
