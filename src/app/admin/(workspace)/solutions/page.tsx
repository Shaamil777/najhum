import SolutionsList from "@/components/admin/solutions/SolutionsList";
export const metadata = { title: "Solutions | Admin Console", description: "Manage solution pages" };
export default async function AdminSolutionsPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const { filter } = await searchParams;
  const initialFilter = filter === "draft" || filter === "published" ? filter : "all";
  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold normal-case tracking-tight text-slate-900">Solutions</h1>
      <SolutionsList key={initialFilter} initialFilter={initialFilter} />
    </div>
  );
}
