"use client";

import React, { useMemo, useState, useEffect } from 'react';
import DottedMap from 'dotted-map';

export default function DottedWorldMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 60, grid: 'vertical' });

    // Mark GCC Countries in brand blue (#4c3bcf) by filling the region
    for (let lat = 16.5; lat <= 31.5; lat += 0.5) {
      for (let lng = 36.0; lng <= 60.0; lng += 0.5) {
        let isGCC = false;
        
        // Northern KSA & Kuwait
        if (lat >= 27.5 && lat <= 31.5 && lng >= 36.0 && lng <= 48.5) {
          if (lng > 39.0 || lat < 29.5) isGCC = true; // Exclude Jordan/Iraq
        }
        // Central/Western KSA
        if (lat >= 20.0 && lat <= 27.5 && lng >= 38.0 && lng <= 48.0) isGCC = true;
        // Southern KSA
        if (lat >= 17.0 && lat <= 20.0 && lng >= 41.5 && lng <= 47.5) isGCC = true;
        // Eastern KSA, Bahrain, Qatar
        if (lat >= 24.0 && lat <= 27.5 && lng >= 48.0 && lng <= 51.5) isGCC = true;
        // UAE & Empty Quarter
        if (lat >= 22.0 && lat <= 26.0 && lng >= 48.0 && lng <= 56.5) {
          if (lat < 25.5 || lng < 55.0) isGCC = true; // Avoid Iran
        }
        // Oman
        if (lat >= 16.5 && lat <= 24.5 && lng >= 52.0 && lng <= 60.0) {
          if (lat < 23.5 || lng > 55.0) isGCC = true;
        }

        if (isGCC) {
          map.addPin({
            lat,
            lng,
            svgOptions: { color: '#4c3bcf', radius: 0.52 } // Size > 0.5 removes grid gaps, creating a solid fill
          });
        }
      }
    }

    let svg = map.getSVG({
      radius: 0.28,
      color: '#a1a1aa', // Tailwind zinc-400 for better contrast
      shape: 'circle',
      backgroundColor: 'transparent',
    });
    
    // dotted-map doesn't natively render squares correctly in all versions, 
    // so we generate circles and convert them to rects for a perfect pixel grid
    svg = svg.replace(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)" fill="([^"]+)" \/>/g, 
      (_, cx, cy, r, fill) => {
        const x = parseFloat(cx) - parseFloat(r);
        const y = parseFloat(cy) - parseFloat(r);
        const size = parseFloat(r) * 2;
        return `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${fill}" />`;
      }
    );
    
    return svg;
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-full aspect-video md:aspect-square lg:aspect-[4/3] flex items-center justify-center scale-110 sm:scale-125 lg:scale-[1.4] pointer-events-none" />
    );
  }

  return (
    <div className="relative w-full aspect-video md:aspect-square lg:aspect-[4/3] flex items-center justify-center scale-110 sm:scale-125 lg:scale-[1.4] transform-origin-center pointer-events-none">
      <div 
        className="w-full h-full [&>svg]:w-full [&>svg]:h-full object-contain"
        dangerouslySetInnerHTML={{ __html: svgMap }}
      />
    </div>
  );
}

