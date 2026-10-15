import React from 'react';

export default function Logo({ size = 'md', subtitle = 'WEALTH JOURNEY', onClick }) {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-xl', sub: 'text-[9px]' },
    md: { icon: 'w-8 h-8', text: 'text-2xl', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-4xl', sub: 'text-xs' },
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div 
      className={`flex items-center gap-3 cursor-pointer select-none group transition-opacity hover:opacity-95`}
      onClick={onClick}
    >
      {/* Precision SVG Brandmark matching the Mineral Noir & Botanical logo */}
      <svg className={`${currentSize.icon} flex-shrink-0 transition-transform group-hover:scale-105 duration-300`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Top Leaf - Obsidian Plum */}
        <path d="M46 16 C23 18 18 42 19 62 C34 56 46 44 46 16 Z" fill="#292330"/>
        {/* Center Seed/Coin - Oxidised Copper */}
        <circle cx="56" cy="36" r="9.5" fill="#B86F52"/>
        {/* Bottom Leaf - Celadon Mist Botanical Tone */}
        <path d="M30 70 C30 52 46 44 64 45 C65 67 56 82 30 70 Z" fill="#8FA68C"/>
      </svg>

      <div className="flex flex-col">
        <span className={`font-display font-medium tracking-tight text-[#292330] leading-none ${currentSize.text} lowercase`}>
          moneta
        </span>
        {subtitle && (
          <span className={`font-sans tracking-[0.2em] font-semibold text-[#292330]/60 uppercase ${currentSize.sub} mt-0.5`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
