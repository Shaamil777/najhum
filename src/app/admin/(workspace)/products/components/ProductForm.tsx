"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Package,
  Tag,
  Boxes,
  Upload,
  FileText,
  Loader2,
  Plus,
  Trash2,
  ListChecks,
  TableProperties,
  Sparkles,
  Layers,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";

export interface SpecItem {
  property: string;
  value: string;
  unit: string;
  remarks: string;
}

export interface ProductInitialData {
  id?: string;
  name?: string;
  description?: string;
  imageUrl?: string | null;
  brochureUrl?: string | null;
  platforms?: string[];
  solutions?: string[];
  features?: unknown;
  details?: unknown;
  isDraft?: boolean;
  order?: number;
}

export default function ProductForm({
  initialData = null,
  availableSolutions = [],
}: {
  initialData?: ProductInitialData | null;
  availableSolutions?: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProduct = async () => {
    if (!initialData?.id) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name || "this product"}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/products/${initialData.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Failed to delete product");
      }

      toast.success(`"${name || "Product"}" has been deleted`);
      router.refresh();
      router.push("/admin/products");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  // Safely parse details
  const initialDetails =
    initialData?.details && typeof initialData.details === "object"
      ? (initialData.details as Record<string, unknown>)
      : {};

  // Form Fields
  const [name, setName] = useState(initialData?.name || "");
  const [model, setModel] = useState<string>(
    typeof initialDetails.model === "string" ? initialDetails.model : ""
  );
  const [description, setDescription] = useState(initialData?.description || "");
  const [overview, setOverview] = useState<string>(
    typeof initialDetails.overview === "string" ? initialDetails.overview : ""
  );
  const [isDraft, setIsDraft] = useState<boolean>(initialData?.isDraft ?? false);
  const [order, setOrder] = useState<number>(initialData?.order ?? 0);

  // Media
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [brochureUrl, setBrochureUrl] = useState(initialData?.brochureUrl || "");

  // Additional Gallery Images
  const initialAdditionalImages = Array.isArray(initialDetails.images)
    ? (initialDetails.images as unknown[]).filter((img): img is string => typeof img === "string")
    : [];
  const [additionalImages, setAdditionalImages] = useState<string[]>(initialAdditionalImages);

  // Features
  const initialFeatures = Array.isArray(initialData?.features)
    ? (initialData.features as unknown[]).filter((f): f is string => typeof f === "string")
    : [];
  const [features, setFeatures] = useState<string[]>(
    initialFeatures.length > 0 ? initialFeatures : [""]
  );

  // Specifications
  const initialSpecs: SpecItem[] = Array.isArray(initialDetails.specs)
    ? (initialDetails.specs as Record<string, unknown>[]).map((s) => ({
        property: String(s?.property || ""),
        value: String(s?.value || ""),
        unit: String(s?.unit || ""),
        remarks: String(s?.remarks || ""),
      }))
    : [];
  const [specs, setSpecs] = useState<SpecItem[]>(
    initialSpecs.length > 0
      ? initialSpecs
      : [{ property: "", value: "", unit: "", remarks: "" }]
  );

  // Target Applications
  const initialApplications = Array.isArray(initialDetails.applications)
    ? (initialDetails.applications as unknown[]).filter((a): a is string => typeof a === "string")
    : [];
  const [applications, setApplications] = useState<string[]>(
    initialApplications.length > 0 ? initialApplications : [""]
  );

  // Platforms & Solutions
  const [platforms, setPlatforms] = useState<string[]>(initialData?.platforms || []);
  const [solutions, setSolutions] = useState<string[]>(initialData?.solutions || []);

  // Upload States
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
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
    { id: "evoltics", label: "EVOLTICS Platform" },
    { id: "iotrics", label: "IoTRICs Platform" },
    { id: "cropifai", label: "cropifAI Platform" },
  ];

  const handleTogglePlatform = (platformId: string) => {
    if (platforms.includes(platformId)) {
      setPlatforms(platforms.filter((p) => p !== platformId));
    } else {
      setPlatforms([...platforms, platformId]);
    }
  };

  const handleToggleSolution = (solutionId: string) => {
    if (solutions.includes(solutionId)) {
      setSolutions(solutions.filter((s) => s !== solutionId));
    } else {
      setSolutions([...solutions, solutionId]);
    }
  };

  // Dynamic Feature Handlers
  const handleFeatureChange = (index: number, val: string) => {
    const updated = [...features];
    updated[index] = val;
    setFeatures(updated);
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Dynamic Application Handlers
  const handleApplicationChange = (index: number, val: string) => {
    const updated = [...applications];
    updated[index] = val;
    setApplications(updated);
  };

  const addApplication = () => {
    setApplications([...applications, ""]);
  };

  const removeApplication = (index: number) => {
    setApplications(applications.filter((_, i) => i !== index));
  };

  // Dynamic Specification Handlers
  const handleSpecChange = (index: number, field: keyof SpecItem, val: string) => {
    const updated = [...specs];
    updated[index] = { ...updated[index], [field]: val };
    setSpecs(updated);
  };

  const addSpec = () => {
    setSpecs([...specs, { property: "", value: "", unit: "", remarks: "" }]);
  };

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  // Additional Gallery Handlers
  const addGalleryImage = (url: string) => {
    if (!url.trim()) return;
    setAdditionalImages([...additionalImages, url.trim()]);
  };

  const removeGalleryImage = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Product name is required");
      return;
    }

    try {
      setIsSaving(true);
      const url = initialData?.id ? `/api/admin/products/${initialData.id}` : "/api/admin/products";
      const method = initialData?.id ? "PUT" : "POST";

      const cleanedFeatures = features.map((f) => f.trim()).filter(Boolean);
      const cleanedApplications = applications.map((a) => a.trim()).filter(Boolean);
      const cleanedSpecs = specs.filter(
        (s) => s.property.trim() !== "" || s.value.trim() !== ""
      );
      const cleanedAdditionalImages = additionalImages.map((img) => img.trim()).filter(Boolean);

      const payload = {
        name: name.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim() || null,
        brochureUrl: brochureUrl.trim() || null,
        platforms,
        solutions,
        features: cleanedFeatures,
        details: {
          ...initialDetails,
          model: model.trim() || null,
          overview: overview.trim() || null,
          applications: cleanedApplications,
          specs: cleanedSpecs,
          images: cleanedAdditionalImages,
        },
        isDraft,
        order: Number(order) || 0,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || "Failed to save product");
      }

      toast.success(`Product ${initialData?.id ? "updated" : "created"} successfully`);
      router.refresh();
      router.push("/admin/products");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl pb-16">
      
      {/* 1. General & Status Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Package className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-slate-800">Basic Information & Catalog Status</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Product Name *
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Najhum Wireless Smart Valve NQT02"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Model / SKU / Part Code
            </label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. NQT02 or IoT-500"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Publication Status
            </label>
            <select
              value={isDraft ? "draft" : "published"}
              onChange={(e) => setIsDraft(e.target.value === "draft")}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white"
            >
              <option value="published">Published (Visible on site)</option>
              <option value="draft">Draft (Hidden from public)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Display Sort Order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
              placeholder="0 (Lower numbers show first)"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Short Description / Card Excerpt *
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief 1-2 sentence overview shown on catalog cards and carousels..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Detailed System Overview (Optional)
          </label>
          <textarea
            rows={4}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            placeholder="Comprehensive description displayed in the 'System Overview' section on the product detail page..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
      </div>

      {/* 2. Media & Documentation Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ImageIcon className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-slate-800">Media & Brochure Documentation</h2>
        </div>

        {/* Main Product Image */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Primary Product Image
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... or upload image"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            <label className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium cursor-pointer shadow-sm shrink-0 transition-colors">
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
            <div className="mt-2 flex items-center justify-between gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-3 overflow-hidden">
                <img src={imageUrl} alt="Product preview" className="w-12 h-12 object-cover rounded shrink-0 border border-slate-200" />
                <span className="text-xs text-slate-600 truncate">{imageUrl}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setImageUrl("");
                  toast.info("Image unlinked from product. Save product to apply changes.");
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200 transition-colors shrink-0 shadow-sm"
                title="Remove primary image"
              >
                <Trash2 size={13} />
                <span>Remove Image</span>
              </button>
            </div>
          )}
        </div>

        {/* Additional Gallery Images */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Additional Gallery Thumbnails
          </label>
          <p className="text-xs text-slate-500 mb-2">
            Upload multiple images to enable interactive thumbnail gallery on the product overview page.
          </p>
          <div className="flex gap-2 mb-3">
            <label className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium cursor-pointer shadow-sm shrink-0 transition-colors">
              {uploadingGallery ? (
                <Loader2 size={16} className="animate-spin text-primary" />
              ) : (
                <Plus size={16} />
              )}
              <span>{uploadingGallery ? "Uploading..." : "Upload Gallery Image"}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingGallery}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleUpload(f, "products", addGalleryImage, setUploadingGallery);
                }}
              />
            </label>
          </div>
          {additionalImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {additionalImages.map((img, idx) => (
                <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-50 p-1">
                  <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-24 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-md opacity-90 hover:opacity-100 transition-opacity shadow-sm"
                    title="Remove image"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Brochure PDF */}
        <div className="border-t border-slate-100 pt-4">
          <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <FileText size={16} className="text-primary" /> Brochure PDF / Datasheet
          </label>
          <p className="text-xs text-slate-500 mb-2">
            When users click &quot;Download Brochure&quot; on the website, this PDF will be served upon verification.
          </p>
          <div className="flex gap-2">
            <input
              type="url"
              value={brochureUrl}
              onChange={(e) => setBrochureUrl(e.target.value)}
              placeholder="https://.../brochure.pdf or upload PDF"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            <label className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium cursor-pointer shadow-sm shrink-0 transition-colors">
              {uploadingBrochure ? (
                <Loader2 size={16} className="animate-spin text-primary" />
              ) : (
                <Upload size={16} />
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
            <div className="mt-2 flex items-center justify-between gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
              <div className="flex items-center gap-2 truncate">
                <FileText size={16} className="text-primary shrink-0" />
                <span className="truncate">{brochureUrl}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline flex items-center gap-1 px-2 py-1 rounded hover:bg-primary/5"
                >
                  <span>Preview</span>
                  <ExternalLink size={12} />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setBrochureUrl("");
                    toast.info("Brochure PDF unlinked from product. Save product to apply changes.");
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded border border-red-200 transition-colors shadow-sm"
                  title="Remove brochure PDF"
                >
                  <Trash2 size={13} />
                  <span>Remove PDF</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Features & Highlights Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="text-base font-bold text-slate-800">Key Features & Capabilities</h2>
              <p className="text-xs text-slate-500">
                Bulleted features rendered under &quot;Features & Capabilities&quot; and &quot;Key Highlights&quot;.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={addFeature}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <Plus size={14} />
            <span>Add Feature</span>
          </button>
        </div>

        <div className="space-y-2">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 w-5 text-right">{idx + 1}.</span>
              <input
                type="text"
                value={feat}
                onChange={(e) => handleFeatureChange(idx, e.target.value)}
                placeholder="e.g. Ultra-low power consumption with 5-year battery life"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              />
              <button
                type="button"
                onClick={() => removeFeature(idx)}
                disabled={features.length === 1 && !feat}
                className="p-2 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-30"
                title="Remove feature"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Technical Specifications Table Builder */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <TableProperties className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-base font-bold text-slate-800">Technical Specifications</h2>
              <p className="text-xs text-slate-500">
                Populates the structured technical specification table on the product page.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={addSpec}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <Plus size={14} />
            <span>Add Row</span>
          </button>
        </div>

        <div className="space-y-3">
          {specs.map((spec, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <input
                type="text"
                value={spec.property}
                onChange={(e) => handleSpecChange(idx, "property", e.target.value)}
                placeholder="Parameter (e.g. Ingress Protection)"
                className="flex-1 w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs sm:text-sm focus:ring-primary focus:border-primary"
              />
              <input
                type="text"
                value={spec.value}
                onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                placeholder="Value (e.g. IP67)"
                className="flex-1 w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs sm:text-sm focus:ring-primary focus:border-primary"
              />
              <input
                type="text"
                value={spec.unit}
                onChange={(e) => handleSpecChange(idx, "unit", e.target.value)}
                placeholder="Unit (e.g. mm, V, °C)"
                className="w-full sm:w-24 px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs sm:text-sm focus:ring-primary focus:border-primary"
              />
              <input
                type="text"
                value={spec.remarks}
                onChange={(e) => handleSpecChange(idx, "remarks", e.target.value)}
                placeholder="Notes (optional)"
                className="flex-1 w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs sm:text-sm focus:ring-primary focus:border-primary"
              />
              <button
                type="button"
                onClick={() => removeSpec(idx)}
                className="p-1.5 text-slate-400 hover:text-red-600 transition-colors self-end sm:self-center"
                title="Remove spec"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Target Applications Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="text-base font-bold text-slate-800">Target Applications</h2>
              <p className="text-xs text-slate-500">
                Industrial use cases rendered in the &quot;Target Applications&quot; section.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={addApplication}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <Plus size={14} />
            <span>Add Application</span>
          </button>
        </div>

        <div className="space-y-2">
          {applications.map((app, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 w-5 text-right">{idx + 1}.</span>
              <input
                type="text"
                value={app}
                onChange={(e) => handleApplicationChange(idx, e.target.value)}
                placeholder="e.g. Fuel tank level monitoring and theft detection"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              />
              <button
                type="button"
                onClick={() => removeApplication(idx)}
                disabled={applications.length === 1 && !app}
                className="p-2 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-30"
                title="Remove application"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Platforms & Linked Solutions */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <Tag size={16} className="text-primary" /> Showcase on Platform Pages
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Select which platform pages should showcase this product in their product carousel.
          </p>
          <div className="flex gap-4 flex-wrap">
            {PLATFORMS.map((platform) => (
              <label
                key={platform.id}
                className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                  platforms.includes(platform.id)
                    ? "bg-primary/5 border-primary/30"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
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
          <div className="border-t border-slate-100 pt-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Boxes size={16} className="text-indigo-500" /> Link to Solutions
            </label>
            <p className="text-xs text-slate-500 mb-3">
              If you add a &quot;Products Carousel&quot; section to any of these Solutions, this product will appear there.
            </p>
            <div className="flex gap-3 flex-wrap max-h-60 overflow-y-auto p-1">
              {availableSolutions.map((sol) => (
                <label
                  key={sol.slug}
                  className={`flex items-center gap-2 p-2 px-3 border rounded-lg cursor-pointer transition-colors ${
                    solutions.includes(sol.slug)
                      ? "bg-indigo-50 border-indigo-200"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={solutions.includes(sol.slug)}
                    onChange={() => handleToggleSolution(sol.slug)}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-600"
                  />
                  <span className="text-sm font-medium text-slate-700 line-clamp-1 max-w-[200px]">
                    {sol.title}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200 sticky bottom-0 bg-[#f6f8fc] p-4 -mx-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] rounded-b-xl z-20">
        <div>
          {initialData?.id && (
            <button
              type="button"
              onClick={handleDeleteProduct}
              disabled={isDeleting || isSaving}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg disabled:opacity-50 transition-colors shadow-sm"
            >
              {isDeleting ? <Loader2 size={16} className="animate-spin text-red-600" /> : <Trash2 size={16} />}
              <span>{isDeleting ? "Deleting..." : "Delete Product"}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            disabled={isSaving || isDeleting}
            className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg disabled:opacity-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving || isDeleting}
            className="px-6 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <Package size={16} />
            {isSaving ? "Saving..." : initialData?.id ? "Update Product" : "Save Product"}
          </button>
        </div>
      </div>
    </form>
  );
}
