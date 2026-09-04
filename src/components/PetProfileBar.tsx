import React from 'react';
import { Scale, Cake, Sparkles, RefreshCw } from 'lucide-react';
import { PetProfile, PetWeight, PetAge } from '../types';

interface PetProfileBarProps {
  pet: PetProfile;
  onUpdatePet: (updated: Partial<PetProfile>) => void;
  onSwitchKind: (kind: 'perro' | 'gato') => void;
}

export const PetProfileBar: React.FC<PetProfileBarProps> = ({
  pet,
  onUpdatePet,
  onSwitchKind
}) => {
  const isDog = pet.kind === 'perro';

  return (
    <div id="pet-profile-bar" className="bg-white dark:bg-[#132A1E] border-2 border-[#152018]/10 dark:border-white/10 rounded-[1.75rem] p-5 sm:p-6 shadow-sm mb-8 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        
        {/* Left: Avatar & Identity */}
        <div className="flex items-center gap-4 min-w-[240px]">
          <div className="w-14 h-14 rounded-2xl bg-[var(--c-loro-light)] border-2 border-[#152018]/15 flex items-center justify-center text-3xl shrink-0 shadow-inner">
            {isDog ? '🐶' : '🐱'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] font-bold">
                PERFIL ACTIVO
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] bg-[var(--c-loro-light)] text-[var(--c-loro-dark)] px-2 py-0.5 rounded-full font-bold">
                <Sparkles className="w-3 h-3" /> Dosificación Inteligente
              </span>
            </div>
            <h3 className="font-display font-bold text-xl mt-0.5 text-[#152018] dark:text-[#FAFAF7] flex items-center gap-2">
              <span>{pet.name}</span>
              <button
                type="button"
                onClick={() => onSwitchKind(isDog ? 'gato' : 'perro')}
                className="text-xs font-normal text-muted-foreground opacity-60 hover:opacity-100 flex items-center gap-1 underline underline-offset-2"
                title="Cambiar entre perro y gato"
              >
                <RefreshCw className="w-3 h-3" /> {isDog ? 'Cambiar a Michi 🐱' : 'Cambiar a Firulais 🐶'}
              </button>
            </h3>
            <p className="text-xs text-[#152018]/60 dark:text-[#FAFAF7]/60 mt-0.5">
              Filtramos medicamentos según su peso y etapa biológica.
            </p>
          </div>
        </div>

        {/* Right: Selectors for Weight and Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 lg:max-w-xl">
          {/* Weight selector */}
          <div className="flex items-center gap-2.5 bg-[var(--c-loro-light)] dark:bg-[#0D1F16] border-2 border-[#152018]/15 dark:border-white/15 rounded-2xl px-3.5 py-2.5">
            <Scale className="w-4 h-4 text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] shrink-0" />
            <div className="flex-1">
              <label htmlFor="weight-select" className="block text-[9px] font-mono uppercase font-bold text-[#152018]/60 dark:text-white/60">
                Banda de Peso
              </label>
              <select
                id="weight-select"
                value={pet.weight}
                onChange={(e) => onUpdatePet({ weight: e.target.value as PetWeight })}
                className="w-full text-xs font-bold bg-transparent text-[#152018] dark:text-[#FAFAF7] focus:outline-none cursor-pointer"
              >
                <option value="toy" className="bg-white dark:bg-[#0D1F16]">Toy / Mini (&lt;5 kg)</option>
                <option value="small" className="bg-white dark:bg-[#0D1F16]">Pequeño (5–10 kg)</option>
                <option value="medium" className="bg-white dark:bg-[#0D1F16]">Mediano (10–25 kg)</option>
                <option value="large" className="bg-white dark:bg-[#0D1F16]">Grande (25–40 kg)</option>
                <option value="giant" className="bg-white dark:bg-[#0D1F16]">Gigante (+40 kg)</option>
              </select>
            </div>
          </div>

          {/* Age selector */}
          <div className="flex items-center gap-2.5 bg-[var(--c-loro-light)] dark:bg-[#0D1F16] border-2 border-[#152018]/15 dark:border-white/15 rounded-2xl px-3.5 py-2.5">
            <Cake className="w-4 h-4 text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] shrink-0" />
            <div className="flex-1">
              <label htmlFor="age-select" className="block text-[9px] font-mono uppercase font-bold text-[#152018]/60 dark:text-white/60">
                Etapa de Vida
              </label>
              <select
                id="age-select"
                value={pet.age}
                onChange={(e) => onUpdatePet({ age: e.target.value as PetAge })}
                className="w-full text-xs font-bold bg-transparent text-[#152018] dark:text-[#FAFAF7] focus:outline-none cursor-pointer"
              >
                <option value="cachorro" className="bg-white dark:bg-[#0D1F16]">
                  {isDog ? 'Cachorro (&lt;1 año)' : 'Gatito (&lt;1 año)'}
                </option>
                <option value="adulto" className="bg-white dark:bg-[#0D1F16]">Adulto (1–7 años)</option>
                <option value="senior" className="bg-white dark:bg-[#0D1F16]">Senior (+7 años)</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
