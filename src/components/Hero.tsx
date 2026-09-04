import React from 'react';
import { PawPrint, Heart } from 'lucide-react';
import { PetProfile } from '../types';

interface HeroProps {
  pet: PetProfile;
  onSwitchPet: (kind: 'perro' | 'gato') => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAppSignup?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  pet,
  onSwitchPet,
  onNavigateSection
}) => {
  const isDog = pet.kind === 'perro';

  return (
    <section id="inicio" className="relative bg-[#0D1F16] text-[#FAFAF7] overflow-hidden min-h-[540px] sm:min-h-[580px] flex flex-col justify-center">
      {/* Background Pet Image with dynamic smooth crossfade */}
      <div className="absolute inset-0 z-0">
        <img
          src={
            isDog
              ? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1600&h=1200&q=80'
              : 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1600&h=1200&q=80'
          }
          alt={isDog ? 'Perro feliz Firulais' : 'Gato feliz Michi'}
          className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ objectPosition: isDog ? '65% 35%' : '60% 25%' }}
        />
        {/* Dark gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F16] via-[#0D1F16]/90 sm:via-[#0D1F16]/80 to-[#0D1F16]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F16] via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 sm:pt-14 sm:pb-18 relative z-10 w-full flex flex-col justify-between gap-10 lg:gap-14">
        
        {/* Top Grid: Headline on Left, Pet Companion Selector on Right */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Dynamic Headline & Subtitle */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                Cuidar a tu{' '}
                <span className="relative inline-block text-[var(--c-loro)] pb-1.5 sm:pb-2">
                  {isDog ? 'Firulais' : 'Michi'}
                  {/* Hand-drawn organic underline */}
                  <svg
                    className="absolute -bottom-1 sm:-bottom-2.5 -left-1 w-[105%] h-3 sm:h-4 text-[#FFA62B] pointer-events-none overflow-visible -rotate-1 origin-left"
                    viewBox="0 0 200 14"
                    fill="none"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 3 9.5 C 45 4.5, 120 3.5, 196 6.5"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 18 11.5 C 70 9, 140 8, 185 10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                  </svg>
                </span>
              </h1>
              <p className="font-hand italic text-4xl sm:text-6xl text-[#FFA62B] mt-2">
                sin líos.
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#FAFAF7]/90 max-w-xl leading-relaxed">
              Encuentra medicamentos y productos para su cuidado. Firulais busca disponibilidad entre aliados cercanos para ayudarte a conseguir lo que necesita.
            </p>
          </div>

          {/* Right Column: Companion Selector harmonized with brand aesthetic */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
            {/* Handwritten Question above the card box */}
            <div className="w-full max-w-md mb-2 pl-2 text-left">
              <span className="font-hand italic text-3xl sm:text-4xl text-[#FAFAF7] tracking-wide inline-block drop-shadow-md">
                ¿con quién compartes tu vida?
              </span>
            </div>

            <div className="w-full max-w-md bg-[var(--c-noche-card,#132A1E)]/80 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 border-2 border-[var(--c-noche-line,#1E3A29)] shadow-lift-dark text-[#FAFAF7]">
              
              {/* Selector Cards */}
              <div className="space-y-3">
                {/* 1. Firulais Card */}
                <button
                  type="button"
                  onClick={() => onSwitchPet('perro')}
                  className={`w-full group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl transition-all duration-300 text-left cursor-pointer ${
                    isDog
                      ? 'bg-gradient-to-r from-[var(--c-loro)]/20 to-[var(--c-loro)]/5 border-2 border-[var(--c-loro)] shadow-[0_0_20px_rgba(0,191,166,0.25)] ring-2 ring-[var(--c-loro)]/30 translate-x-1'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-[#FAFAF7]/70 hover:text-[#FAFAF7]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Dog Avatar */}
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      isDog
                        ? 'border-[var(--c-loro)] shadow-md ring-2 ring-[var(--c-loro)]/40 scale-105'
                        : 'border-white/20 group-hover:border-white/40'
                    }`}>
                      <img
                        src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&h=200&q=80"
                        alt="Firulais"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Name & Subtitle */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors ${
                          isDog ? 'text-[var(--c-loro)]' : 'text-[#FAFAF7]'
                        }`}>
                          Firulais
                        </span>
                        {isDog && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--c-loro)]/20 text-[var(--c-loro)] font-bold border border-[var(--c-loro)]/40">
                            ACTIVO
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#FAFAF7]/70 mt-0.5">
                        🐶 Canino · Dosis y cuidados para perros
                      </p>
                    </div>
                  </div>
                  {/* Dog Paw */}
                  <div className={`p-2.5 rounded-xl transition-all ${
                    isDog
                      ? 'bg-[var(--c-loro)] text-[#152018] shadow-sm scale-105'
                      : 'bg-white/5 text-[#FAFAF7]/40 group-hover:text-white group-hover:bg-white/10'
                  }`}>
                    <PawPrint className="w-5 h-5" />
                  </div>
                </button>

                {/* 2. Michi Card */}
                <button
                  type="button"
                  onClick={() => onSwitchPet('gato')}
                  className={`w-full group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl transition-all duration-300 text-left cursor-pointer ${
                    !isDog
                      ? 'bg-gradient-to-r from-[var(--c-mango)]/20 to-[var(--c-mango)]/5 border-2 border-[var(--c-mango)] shadow-[0_0_20px_rgba(255,159,28,0.25)] ring-2 ring-[var(--c-mango)]/30 translate-x-1'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-[#FAFAF7]/70 hover:text-[#FAFAF7]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Cat Avatar */}
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      !isDog
                        ? 'border-[var(--c-mango)] shadow-md ring-2 ring-[var(--c-mango)]/40 scale-105'
                        : 'border-white/20 group-hover:border-white/40'
                    }`}>
                      <img
                        src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&h=200&q=80"
                        alt="Michi"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Name & Subtitle */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors ${
                          !isDog ? 'text-[var(--c-mango)]' : 'text-[#FAFAF7]'
                        }`}>
                          Michi
                        </span>
                        {!isDog && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--c-mango)]/20 text-[var(--c-mango)] font-bold border border-[var(--c-mango)]/40">
                            ACTIVO
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#FAFAF7]/70 mt-0.5">
                        🐱 Felino · Dosis y cuidados para gatos
                      </p>
                    </div>
                  </div>
                  {/* Cat Paw */}
                  <div className={`p-2.5 rounded-xl transition-all ${
                    !isDog
                      ? 'bg-[var(--c-mango)] text-[#152018] shadow-sm scale-105'
                      : 'bg-white/5 text-[#FAFAF7]/40 group-hover:text-white group-hover:bg-white/10'
                  }`}>
                    <PawPrint className="w-5 h-5" />
                  </div>
                </button>
              </div>

              {/* Bottom helper info */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-center text-xs text-[#FAFAF7]/80">
                <svg
                  className="w-4 h-4 text-[var(--c-sol)] shrink-0 -rotate-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
                  <path d="m18 13 3-3-3-3" />
                </svg>
                <span>
                  Elige para adaptar catálogo y dosis{' '}
                  <span className={`font-bold ${isDog ? 'text-[var(--c-loro)]' : 'text-[var(--c-mango)]'}`}>
                    para tu {isDog ? 'perro 🐶' : 'gato 🐱'}
                  </span>
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};


