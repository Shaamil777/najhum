import Link from "next/link";

const placeholderSolutions = [
  { name: "Smart Energy", href: "/solutions" },
  { name: "Fleet Management", href: "/solutions" },
  { name: "Predictive Maintenance", href: "/solutions" },
  { name: "Carbon Tracking", href: "/solutions" },
  { name: "Asset Monitoring", href: "/solutions" },
  { name: "EV Infrastructure", href: "/solutions" },
];

export default function ExploreMore() {
  return (
    <div className="w-full py-16 px-6 border-y border-neutral-200">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-8 text-center">
          Explore More
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {placeholderSolutions.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center justify-center p-6 border border-neutral-200 text-sm font-medium text-neutral-600 tracking-wide uppercase transition-colors hover:bg-neutral-50"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/solutions"
            className="px-6 py-3 border border-neutral-300 text-xs font-bold uppercase tracking-widest text-neutral-600 transition-colors hover:bg-neutral-100"
          >
            View All Solutions
          </Link>
        </div>
      </div>
    </div>
  );
}
