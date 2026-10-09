"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";

// Recursive component to render a form for any JSON structure
function DynamicFieldEditor({ path, value, onChange, fieldName }: { path: string[], value: any, onChange: (val: any) => void, fieldName: string }) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Handle Strings
  if (typeof value === "string") {
    const isLongText = value.length > 80 || value.includes("<") || value.includes("\n");
    return (
      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 mb-1 capitalize">
          {fieldName.replace(/([A-Z])/g, ' $1').trim()}
        </label>
        {isLongText ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        )}
      </div>
    );
  }

  // Handle Numbers
  if (typeof value === "number") {
    return (
      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 mb-1 capitalize">
          {fieldName.replace(/([A-Z])/g, ' $1').trim()}
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
    );
  }

  // Handle Booleans
  if (typeof value === "boolean") {
    return (
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 text-primary border-slate-300 rounded focus:ring-primary"
        />
        <label className="ml-2 block text-sm font-semibold text-slate-700 capitalize">
          {fieldName.replace(/([A-Z])/g, ' $1').trim()}
        </label>
      </div>
    );
  }

  // Handle Arrays
  if (Array.isArray(value)) {
    return (
      <div className="mb-6 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
        <div 
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            <h3 className="font-semibold text-slate-800 capitalize">
              {fieldName.replace(/([A-Z])/g, ' $1').trim()} ({value.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              // Add a new empty item based on the structure of the first item
              const newItem = value.length > 0 ? (typeof value[0] === 'object' ? Object.keys(value[0]).reduce((acc: any, key) => { acc[key] = typeof value[0][key] === 'string' ? '' : (Array.isArray(value[0][key]) ? [] : {}); return acc; }, {}) : "") : "";
              onChange([...value, newItem]);
            }}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"
          >
            <Plus size={16} /> Add Item
          </button>
        </div>
        
        {isExpanded && (
          <div className="space-y-4 mt-4">
            {value.map((item, index) => (
              <div key={index} className="relative p-4 border border-slate-200 bg-white rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => {
                    const newArr = [...value];
                    newArr.splice(index, 1);
                    onChange(newArr);
                  }}
                  className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
                <div className="pt-2">
                  <DynamicFieldEditor 
                    path={[...path, index.toString()]} 
                    value={item} 
                    fieldName={`Item ${index + 1}`}
                    onChange={(newVal) => {
                      const newArr = [...value];
                      newArr[index] = newVal;
                      onChange(newArr);
                    }} 
                  />
                </div>
              </div>
            ))}
            {value.length === 0 && <p className="text-sm text-slate-500 italic">No items yet.</p>}
          </div>
        )}
      </div>
    );
  }

  // Handle Objects
  if (typeof value === "object" && value !== null) {
    // If it's the root object, don't show a collapsible header
    const isRoot = path.length === 0;
    
    const content = (
      <div className={isRoot ? "" : "pl-4 border-l-2 border-slate-100 mt-3 space-y-4"}>
        {Object.entries(value).map(([key, val]) => (
          <DynamicFieldEditor 
            key={key} 
            path={[...path, key]} 
            value={val} 
            fieldName={key}
            onChange={(newVal) => onChange({ ...value, [key]: newVal })} 
          />
        ))}
      </div>
    );

    if (isRoot) return content;

    return (
      <div className="mb-4">
        <div 
          className="flex items-center gap-2 cursor-pointer py-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronDown size={16} className="text-slate-500" /> : <ChevronRight size={16} className="text-slate-500" />}
          <h4 className="font-semibold text-slate-800 capitalize text-sm bg-slate-100 px-2 py-1 rounded">
            {fieldName.replace(/([A-Z])/g, ' $1').trim()}
          </h4>
        </div>
        {isExpanded && content}
      </div>
    );
  }

  return null;
}

export default function PageEditor({ page }: { page: any }) {
  const router = useRouter();
  const [contentObj, setContentObj] = useState<any>(() => {
    // Ensure content is parsed if it's a string from db
    return typeof page.content === 'string' ? JSON.parse(page.content) : page.content || {};
  });
  
  const [title, setTitle] = useState(page.title || "");
  const [metaTitle, setMetaTitle] = useState(page.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(page.metaDescription || "");
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      const res = await fetch(`/api/admin/pages/${page.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          metaTitle,
          metaDescription,
          content: contentObj,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save changes");
      }

      toast.success("Page updated successfully!");
      router.refresh();
      router.push("/admin/pages");
    } catch (err: any) {
      toast.error(err.message || "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* SEO & Meta Settings */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Page Settings & SEO</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Internal Title (Admin Only)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              SEO Meta Title
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="e.g. Evoltics - Smart EV Charging"
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              SEO Meta Description
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              placeholder="A brief summary of the page for search engines..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Content Builder */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Page Content Structure</h2>
        <div className="bg-white p-2 rounded-lg">
          <DynamicFieldEditor 
            path={[]} 
            value={contentObj} 
            fieldName="Content Root"
            onChange={setContentObj} 
          />
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 sticky bottom-0 bg-[#f6f8fc] p-4 -mx-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
        <button
          onClick={() => router.push("/admin/pages")}
          disabled={isSaving}
          className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg disabled:opacity-50 transition-colors shadow-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 transition-colors shadow-sm"
        >
          {isSaving ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
