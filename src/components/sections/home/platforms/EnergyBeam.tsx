"use client";

import React, { useMemo } from "react";

interface EnergyBeamProps {
  /** SVG path d-string from center hub to card position */
  pathD: string;
  /** Platform accent hex color */
  accentColor: string;
  /** Stagger delay in seconds */
  delay: number;
  /** Unique beam identifier */
  beamId: string;
  /** Whether the beam is visible (for entrance animation) */
  isVisible: boolean;
}

/**
 * EnergyBeam
 *
 * Renders a translucent plasma-style SVG energy beam with flowing particles.
 * Uses SVG gradients for the beam glow and CSS offset-path for particle animation.
 */
export default function EnergyBeam({ pathD, accentColor, delay, beamId, isVisible }: EnergyBeamProps) {
  const particles = useMemo(() => [
    { size: 4, duration: 3, particleDelay: 0 },
    { size: 3, duration: 3.5, particleDelay: 0.8 },
    { size: 2.5, duration: 2.8, particleDelay: 1.6 },
    { size: 3.5, duration: 3.2, particleDelay: 2.4 },
    { size: 2, duration: 4, particleDelay: 0.4 },
  ], []);

  return (
    <g
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity 0.8s ease ${delay}s`,
      }}
    >
      {/* Gradient definition */}
      <defs>
        <linearGradient id={`beam-grad-${beamId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5FF" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#3EC7FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.3" />
        </linearGradient>
        <filter id={`beam-glow-${beamId}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer glow beam */}
      <path
        d={pathD}
        fill="none"
        stroke={accentColor}
        strokeWidth="6"
        strokeOpacity="0.08"
        filter={`url(#beam-glow-${beamId})`}
        strokeLinecap="round"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: isVisible ? 0 : 1000,
          transition: `stroke-dashoffset 1.5s ease ${delay}s`,
        }}
      />

      {/* Main beam line */}
      <path
        d={pathD}
        fill="none"
        stroke={`url(#beam-grad-${beamId})`}
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: isVisible ? 0 : 1000,
          transition: `stroke-dashoffset 1.5s ease ${delay}s`,
        }}
      />

      {/* Inner bright core */}
      <path
        d={pathD}
        fill="none"
        stroke="#BFEFFF"
        strokeWidth="0.5"
        strokeOpacity="0.5"
        strokeLinecap="round"
        className="animate-electric-flicker"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: isVisible ? 0 : 1000,
          transition: `stroke-dashoffset 1.5s ease ${delay}s`,
        }}
      />

      {/* Flowing particles */}
      {isVisible && particles.map((p, i) => (
        <circle
          key={i}
          r={p.size}
          fill={accentColor}
          opacity="0"
          style={{
            offsetPath: `path("${pathD}")`,
            animation: `flowParticle ${p.duration}s linear ${delay + 1.5 + p.particleDelay}s infinite`,
            filter: `drop-shadow(0 0 ${p.size * 2}px ${accentColor})`,
          }}
        />
      ))}
    </g>
  );
}
