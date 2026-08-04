interface MetricCardProps {
  value: string;
  label: string;
  description?: string;
}

export default function MetricCard({ value, label, description }: MetricCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-neutral-50 border border-neutral-200 rounded-sm">
      <div className="text-4xl sm:text-6xl font-black tracking-tighter text-neutral-900 mb-2">
        {value}
      </div>
      <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-500">
        {label}
      </div>
      {description && (
        <div className="mt-4 text-xs text-neutral-400 max-w-[200px]">
          {description}
        </div>
      )}
    </div>
  );
}
