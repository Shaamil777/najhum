import Link from "next/link";

interface CtaAction {
  label: string;
  href: string;
}

interface CtaBannerProps {
  title: string;
  description?: string;
  primaryAction: CtaAction;
  secondaryAction?: CtaAction;
}

export default function CtaBanner({
  title,
  description,
  primaryAction,
  secondaryAction,
}: CtaBannerProps) {
  return (
    <div className="w-full py-24 px-6 bg-neutral-900 text-white flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
          {title}
        </h2>
        
        {description && (
          <p className="mt-6 text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href={primaryAction.href}
            className="px-8 py-3 bg-white text-neutral-950 text-sm font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-sm w-full sm:w-auto"
          >
            {primaryAction.label}
          </Link>
          
          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className="px-8 py-3 bg-transparent border border-neutral-700 text-white text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-sm w-full sm:w-auto"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
