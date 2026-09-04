import React from 'react';
import { PaletteId } from '../types';

interface PaletteSwitcherProps {
  currentPalette: PaletteId;
  onSelectPalette: (palette: PaletteId) => void;
}

export const PaletteSwitcher: React.FC<PaletteSwitcherProps> = ({ currentPalette, onSelectPalette }) => {
  const palettes: { id: PaletteId; label: string; conic: string }[] = [
    {
      id: 'a',
      label: 'Tropical vibrante (Caracas)',
      conic: 'conic-gradient(#FF9F1C 0 33%, #00BFA6 33% 66%, #FF3D8A 66% 100%)'
    },
    {
      id: 'b',
      label: 'Candy pastel',
      conic: 'conic-gradient(#8B7FF0 0 33%, #FF8C7A 33% 66%, #34D399 66% 100%)'
    },
    {
      id: 'c',
      label: 'Atardecer caraqueño',
      conic: 'conic-gradient(#E0218A 0 33%, #7C3AED 33% 66%, #FFD23F 66% 100%)'
    },
    {
      id: 'd',
      label: 'Verde salud + fucsia',
      conic: 'conic-gradient(#22C55E 0 33%, #FF2E93 33% 66%, #4C3FE0 66% 100%)'
    }
  ];

  return (
    <div
      id="palette-switcher"
      className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-[#152018] text-[#FAFAF7] rounded-full border-2 border-white/20 shadow-sticker px-3 py-1.5 flex items-center gap-2"
    >
      <span className="hidden sm:inline text-[10px] font-mono opacity-60 uppercase tracking-wider">Paleta:</span>
      <div className="flex items-center gap-1.5">
        {palettes.map((p) => {
          const isActive = currentPalette === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPalette(p.id)}
              title={p.label}
              className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                isActive ? 'border-white scale-110 shadow-sm ring-2 ring-white/40' : 'border-white/30 hover:border-white/70'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full" style={{ background: p.conic }} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
