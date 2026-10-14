"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Users,
  Search,
  Download,
  Trash2,
  Phone,
  FileText,
  Mail,
  ExternalLink,
  Calendar,
  MessageCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  productName?: string | null;
  brochureUrl?: string | null;
  source: string;
  verified: boolean;
  createdAt: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterSource, setFilterSource] = useState<"all" | "brochure_download" | "contact_form">("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/customers");
      if (!res.ok) throw new Error("Failed to load customer leads");
      const data = await res.json();
      setCustomers(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error fetching customers";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete lead "${name}"?`)) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/admin/customers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete lead");
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      toast.success("Lead removed successfully");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error deleting lead";
      toast.error(msg);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.toLowerCase().includes(search.toLowerCase()) ||
        (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
        (c.productName && c.productName.toLowerCase().includes(search.toLowerCase()));

      const matchesSource =
        filterSource === "all" ? true : c.source === filterSource;

      return matchesSearch && matchesSource;
    });
  }, [customers, search, filterSource]);

  const stats = useMemo(() => {
    const total = customers.length;
    const brochures = customers.filter((c) => c.source === "brochure_download").length;
    const contact = customers.filter((c) => c.source === "contact_form").length;
    return { total, brochures, contact };
  }, [customers]);

  const exportToCSV = () => {
    if (filteredCustomers.length === 0) {
      toast.error("No customer records to export");
      return;
    }

    const headers = ["Name", "Phone", "Email", "Source", "Product / Solution", "Brochure URL", "Date"];
    const rows = filteredCustomers.map((c) => [
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.phone}"`,
      `"${c.email || ""}"`,
      `"${c.source === "brochure_download" ? "Brochure Download" : "Contact Enquiry"}"`,
      `"${(c.productName || "").replace(/"/g, '""')}"`,
      `"${c.brochureUrl || ""}"`,
      `"${new Date(c.createdAt).toLocaleString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `najhum-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported leads to CSV");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Users className="text-primary h-7 w-7" />
            Customers & Leads
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Verified leads who submitted their phone number for brochure downloads or contacted you.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchCustomers}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-primary" : ""} />
            Refresh
          </button>
          <button
            type="button"
            onClick={exportToCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Download size={14} />
            Export to CSV
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Leads</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats.total}</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Users size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Brochure Downloads</p>
            <p className="text-3xl font-extrabold text-emerald-600 mt-1">{stats.brochures}</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <FileText size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Contact Enquiries</p>
            <p className="text-3xl font-extrabold text-blue-600 mt-1">{stats.contact}</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Mail size={22} />
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, or product..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setFilterSource("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterSource === "all"
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All ({customers.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterSource("brochure_download")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterSource === "brochure_download"
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Brochures ({stats.brochures})
          </button>
          <button
            type="button"
            onClick={() => setFilterSource("contact_form")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterSource === "contact_form"
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Contact Enquiries ({stats.contact})
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 size={32} className="animate-spin text-primary" />
            <p className="text-sm">Loading customer leads...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center px-4">
            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <Users size={28} />
            </div>
            <h3 className="text-base font-semibold text-slate-800">No leads found</h3>
            <p className="text-sm text-slate-500 max-w-sm mt-1">
              {search
                ? "No customer matches your search filter."
                : "When visitors verify via WhatsApp to download brochures or submit contact forms, they will show up here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider font-semibold text-slate-400 border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Phone Number</th>
                  <th className="py-3.5 px-6">Source / Event</th>
                  <th className="py-3.5 px-6">Product / Brochure</th>
                  <th className="py-3.5 px-6">Date & Time</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredCustomers.map((lead) => {
                  const rawPhone = lead.phone.replace(/[^0-9]/g, "");
                  const whatsappLink = `https://wa.me/${rawPhone}`;

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary/20 to-blue-400/20 text-primary font-bold text-xs flex items-center justify-center uppercase shrink-0">
                            {lead.name.slice(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{lead.name}</p>
                            {lead.email && (
                              <p className="text-xs text-slate-400 truncate flex items-center gap-1 mt-0.5">
                                <Mail size={11} /> {lead.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Phone Number */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-800 text-xs font-semibold bg-slate-100 px-2.5 py-1 rounded-md">
                            {lead.phone}
                          </span>
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Chat on WhatsApp"
                            className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                          >
                            <MessageCircle size={15} />
                          </a>
                        </div>
                      </td>

                      {/* Source */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        {lead.source === "brochure_download" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            <FileText size={12} /> Brochure Download
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                            <Mail size={12} /> Contact Enquiry
                          </span>
                        )}
                      </td>

                      {/* Product */}
                      <td className="py-4 px-6">
                        {lead.productName ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-800 text-xs font-semibold truncate max-w-[180px]">
                              {lead.productName}
                            </span>
                            {lead.brochureUrl && (
                              <a
                                href={lead.brochureUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View Downloaded Brochure"
                                className="text-primary hover:text-primary/80"
                              >
                                <ExternalLink size={13} />
                              </a>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">General</span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 whitespace-nowrap text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-400" />
                          {new Date(lead.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-400">
                            {new Date(lead.createdAt).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleDelete(lead.id, lead.name)}
                          disabled={deletingId === lead.id}
                          title="Delete Lead"
                          className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {deletingId === lead.id ? (
                            <Loader2 size={15} className="animate-spin text-red-600" />
                          ) : (
                            <Trash2 size={15} />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
