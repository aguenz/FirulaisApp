import React from 'react';

export const BrandMarquee: React.FC = () => {
  const brands = [
    'Bravecto (MSD)',
    'Royal Canin',
    "Hill's Prescription",
    'Zoetis',
    'NexGard Spectra',
    'Simparica Trio',
    'Boehringer Ingelheim',
    'Elanco',
    'Pro Plan',
    'Apoquel',
    'Seguros Venezuela',
    'Appa Pet',
    'Seguros Universitas'
  ];

  return (
    <div className="bg-[#152018] border-y-2 border-[#152018] overflow-hidden py-3 text-[#FAFAF7]">
      <div className="marquee-track">
        <div className="flex items-center gap-8 pr-8 shrink-0">
          <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest shrink-0">
            TRABAJAMOS CON:
          </span>
          {brands.map((brand, i) => (
            <React.Fragment key={`b1-${i}`}>
              <span className="font-display font-bold text-sm sm:text-base tracking-wide text-white/90">
                {brand}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-8 pr-8 shrink-0" aria-hidden="true">
          <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest shrink-0">
            TRABAJAMOS CON:
          </span>
          {brands.map((brand, i) => (
            <React.Fragment key={`b2-${i}`}>
              <span className="font-display font-bold text-sm sm:text-base tracking-wide text-white/90">
                {brand}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
