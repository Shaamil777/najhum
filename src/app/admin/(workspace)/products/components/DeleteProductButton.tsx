"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteProductButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${productName}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Failed to delete product");
      }

      toast.success(`"${productName}" has been deleted`);
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Error deleting product");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-colors shadow-sm disabled:opacity-50"
      title={`Delete ${productName}`}
    >
      {isDeleting ? (
        <Loader2 size={16} className="animate-spin text-red-600" />
      ) : (
        <Trash2 size={16} />
      )}
    </button>
  );
}
