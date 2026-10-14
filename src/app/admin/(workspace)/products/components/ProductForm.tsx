"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Package, Tag, Boxes, Upload, FileText, Loader2 } from "lucide-react";

interface ProductInitialData {
  id?: string;
  name?: string;
  description?: string;
  imageUrl?: string | null;
  brochureUrl?: string | null;
  platforms?: string[];
  solutions?: string[];
  features?: unknown;
  details?: unknown;
}

export default function ProductForm({ 
  initialData = null,
  availableSolutions = []
}: { 
  initialData?: ProductInitialData | null;
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

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingBrochure, setUploadingBrochure] = useState(false);

  const handleUpload = async (
    file: File,
    folder: string,
    onSuccess: (url: string) => void,
    setLoading: (b: boolean) => void
  ) => {
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      onSuccess(data.url);
      toast.success("Uploaded successfully to Cloudflare R2!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload file";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

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
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to save product");
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
            Product Image
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... or upload image"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            <label className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium cursor-pointer shadow-sm shrink-0">
              {uploadingImage ? (
                <Loader2 size={16} className="animate-spin text-primary" />
              ) : (
                <Upload size={16} />
              )}
              <span>{uploadingImage ? "Uploading..." : "Upload Image"}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingImage}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleUpload(f, "products", setImageUrl, setUploadingImage);
                }}
              />
            </label>
          </div>
          {imageUrl && (
            <div className="mt-2 flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
              <img src={imageUrl} alt="Product preview" className="w-12 h-12 object-cover rounded" />
              <span className="text-xs text-slate-600 truncate flex-1">{imageUrl}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Brochure PDF
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={brochureUrl}
              onChange={(e) => setBrochureUrl(e.target.value)}
              placeholder="https://.../brochure.pdf or upload PDF"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            <label className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium cursor-pointer shadow-sm shrink-0">
              {uploadingBrochure ? (
                <Loader2 size={16} className="animate-spin text-primary" />
              ) : (
                <FileText size={16} />
              )}
              <span>{uploadingBrochure ? "Uploading..." : "Upload PDF"}</span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                disabled={uploadingBrochure}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleUpload(f, "brochures", setBrochureUrl, setUploadingBrochure);
                }}
              />
            </label>
          </div>
          {brochureUrl && (
            <div className="mt-2 flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
              <FileText size={16} className="text-primary shrink-0" />
              <span className="truncate flex-1">{brochureUrl}</span>
              <a
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline shrink-0"
              >
                Preview PDF
              </a>
            </div>
          )}
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
              If you add a &quot;Products Carousel&quot; section to any of these Solutions, this product will appear there.
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
