"use client";

import React from 'react';
import type { FeaturesContent } from '@/types/section';
import { 
  Sparkles, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Lock, 
  Cloud, 
  BarChart3, 
  Server, 
  CheckCircle2, 
  Layers, 
  Wifi, 
  Settings 
} from 'lucide-react';
import { Container } from '@/design-system/primitives/layout/Container';

interface FeaturesSectionProps {
  content: FeaturesContent;
}

// Icon resolver helper
function renderFeatureIcon(iconStr?: string, index: number = 0) {
  if (!iconStr) {
    const fallbackIcons = [Cpu, Zap, ShieldCheck, Database, Activity, BarChart3, Cloud, Server];
    const IconComp = fallbackIcons[index % fallbackIcons.length];
    return <IconComp className="w-5 h-5 text-primary group-hover:text-white transition-colors" />;
  }

  const normalized = iconStr.trim().toLowerCase();

  switch (normalized) {
    case 'cpu':
    case 'processor':
    case 'ai':
      return <Cpu className="w-5 h-5 text-primary group-hover:text-white transition-colors" />;
    case 'database':
    case 'data':
    case 'storage':
      return <Database className="w-5 h-5 text-primary group-hover:text-white transition-colors" />;
    case 'shield':
    case 'security':
    case 'shieldcheck':
      return <ShieldCheck className="w-5 h-5 text-primary group-hover:text-white transition-colors" />;
    case 'zap':
    case 'speed':
    case 'power':
    case 'fast':
      return <Zap className="w-5 h-5 text-primary group-hover:text-white transition-colors" />;
    case 'activity':
    case 'telemetry':
    case 'analytics':
      return <Activity className="w-5 h-5 text-primary group-hover:text-white transition-colors" />;
    case 'lock':
    case 'privacy':
      return <Lock className="w-5 h-5 text-primary group-hover:text-white transition-colors" />;
    case 'cloud':
      return <Cloud className="w-5 h-5 text-primary group-hover:text-white transition-colors" />;
    case 'server':
    case 'infrastructure':
      return <Server className="w-5 h-5 text-primary group-hover:text-white transition-colors" />;
    case 'wifi':
    case 'iot':
    case 'wireless':
      return <Wifi className="w-5 h-5 text-primary group-hover:text-white transition-colors" />;
    case 'layers':
    case 'platform':
      return <Layers className="w-5 h-5 text-primary group-hover:text-white transition-colors" />;
    case 'settings':
    case 'tools':
      return <Settings className="w-5 h-5 text-primary group-hover:text-white transition-colors" />;
    default:
      // If it's an emoji or 1-2 chars
      if (iconStr.length <= 4) {
        return <span className="text-xl">{iconStr}</span>;
      }
      return <Sparkles className="w-5 h-5 text-primary group-hover:text-white transition-colors" />;
  }
}

export default function FeaturesSection({ content }: FeaturesSectionProps) {
  const { features = [], heading, subheading } = content;

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-neutral-950 text-white border-b border-neutral-800">
      {/* Ambient Lighting & Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      </div>

      <Container className="relative z-10" size="xl">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-18 flex flex-col items-center">


          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.1] [text-wrap:balance]">
            {heading || 'KEY CAPABILITIES & CORE FEATURES'}
          </h2>

          {subheading && (
            <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed [text-wrap:pretty]">
              {subheading}
            </p>
          )}
        </div>

        {/* Features Symmetrical Grid */}
        <div className={`grid gap-6 lg:gap-8 ${
          features.length === 1 
            ? 'grid-cols-1 max-w-lg mx-auto'
            : features.length === 2 
            ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="h-full flex flex-col justify-between p-7 rounded-2xl border border-neutral-800/90 bg-neutral-900/60 backdrop-blur-md hover:border-primary/50 hover:bg-neutral-900/90 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle Corner Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/15 transition-all pointer-events-none" />

              <div>
                {/* Header Icon + Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm">
                    {renderFeatureIcon(feature.icon, index)}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-800/60">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title (Enforcing 2 lines clamp to keep row heights aligned) */}
                <h3 className="text-lg font-bold text-white uppercase tracking-tight line-clamp-2 leading-snug group-hover:text-primary-100 transition-colors">
                  {feature.title}
                </h3>

                {/* Description (Enforcing 4 lines clamp) */}
                <p className="mt-3 text-sm text-neutral-400 group-hover:text-neutral-300 leading-relaxed line-clamp-4">
                  {feature.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1.5 font-medium text-neutral-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  Enterprise Ready
                </span>
                <span className="font-mono text-[10px] uppercase text-neutral-600">
                  Standard
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}