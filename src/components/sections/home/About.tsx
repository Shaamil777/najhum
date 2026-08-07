"use client";

import React from "react";

export default function About() {
  return (
    <section className="relative w-full h-[100svh] min-h-[700px] bg-zinc-50 overflow-hidden flex flex-col justify-center z-10">
      
      {/* Content Overlay */}
      <div className="relative z-20 w-full max-w-[1700px] mx-auto px-6 lg:px-12 pointer-events-none grid grid-cols-1 lg:grid-cols-2 gap-12 h-full py-24 md:py-32">
        {/* Left Content */}
        <div className="w-full pointer-events-auto flex flex-col justify-center h-full">
          <p className="text-sm font-semibold tracking-widest text-neutral-500 mb-4">
            Who we are
          </p>
          <h2 className="text-[3.25rem] md:text-[3.75rem] lg:text-[4.25rem] font-bold tracking-tighter text-[#0f172a] mb-8 leading-[1.05]">
            Building intelligent<br />
            infrastructure<br />
            since 2017
          </h2>
          <p className="text-[#64748b] text-[17px] md:text-[18px] leading-relaxed max-w-[40rem]">
            We deliver intelligent IIoT solutions that connect physical assets, sensors, cloud infrastructure, and AI-driven analytics—transforming operational data into smarter decisions and measurable business outcomes.
          </p>
        </div>

        {/* Right Content / Dot Grid */}
        <div className="w-full relative h-full min-h-[400px] lg:min-h-0 pointer-events-auto overflow-hidden">
          {/* Base Dot Grid */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #94a3b8 1.5px, transparent 1.5px)',
              backgroundSize: '96px 96px',
              backgroundPosition: '0 0',
            }}
          />

          {(() => {
            const CELLS: [number, number, boolean?][] = [
              // Main center-left organic blob
              [1, 2], [2, 2], [2, 3], [3, 2, true], [3, 3], [4, 3, true], [4, 4], [5, 4],
              // Top right cascading cluster
              [0, 5], [0, 6, true], [1, 6], [1, 7], [2, 7],
              // Bottom left cluster
              [5, 2], [6, 2], [6, 3, true], [7, 3],
              // Scattered connecting satellites
              [1, 4], [3, 5, true], [4, 7], [6, 6, true]
            ];

            const hasCell = (r: number, c: number) => CELLS.some(([row, col]) => row === r && col === c);

            return CELLS.map(([row, col, isBlue], i) => {
              const emptyTop = !hasCell(row - 1, col);
              const emptyBottom = !hasCell(row + 1, col);
              const emptyLeft = !hasCell(row, col - 1);
              const emptyRight = !hasCell(row, col + 1);

              let cornerClasses = "";
              if (emptyTop && emptyLeft) cornerClasses += " rounded-tl-xl";
              if (emptyTop && emptyRight) cornerClasses += " rounded-tr-xl";
              if (emptyBottom && emptyLeft) cornerClasses += " rounded-bl-xl";
              if (emptyBottom && emptyRight) cornerClasses += " rounded-br-xl";

              const bgColorClass = isBlue 
                ? 'bg-blue-500' 
                : (row + col) % 2 === 0 ? 'bg-[#f8f7f4]' : 'bg-white';
              
              const hoverColorClass = isBlue ? 'hover:bg-blue-400' : 'hover:bg-white';

              return (
                <div 
                  key={i}
                  className={`absolute ${cornerClasses} transition-all duration-300 hover:-translate-y-1
                    shadow-[inset_1.5px_1.5px_2px_rgba(255,255,255,0.6),inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.06),0_6px_20px_-4px_rgba(0,0,0,0.05)]
                    hover:shadow-[inset_1.5px_1.5px_2px_rgba(255,255,255,0.9),inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.04),0_12px_30px_-4px_rgba(0,0,0,0.08)]
                    ${bgColorClass} ${hoverColorClass}
                  `}
                  style={{ 
                    top: `calc(48px + 96px * ${row})`, 
                    left: `calc(48px + 96px * ${col})`, 
                    width: '96px', 
                    height: '96px' 
                  }} 
                />
              );
            });
          })()}
        </div>
      </div>
    </section>
  );
}
