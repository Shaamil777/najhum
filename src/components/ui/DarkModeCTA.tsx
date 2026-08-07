import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface DarkModeCTAProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  href: string;
}

export function DarkModeCTA({ label, href, className, ...props }: DarkModeCTAProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 rounded-full bg-[#0a0a0a] border border-zinc-800 hover:border-[#4c3bcf] hover:shadow-[0_0_20px_rgba(76,59,207,0.4)] overflow-hidden uppercase tracking-wider",
        className
      )}
      {...props}
    >
      {/* Moving Background Beam */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#4c3bcf]/30 to-transparent -translate-x-full group-hover:animate-[marquee_2s_linear_infinite]" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {label}
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
    </Link>
  );
}
