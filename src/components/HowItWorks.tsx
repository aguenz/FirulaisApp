import React from 'react';
import { PawPrint, MousePointerClick, CheckCircle2, ArrowRight } from 'lucide-react';
import { PetProfile } from '../types';

interface HowItWorksProps {
  pet: PetProfile;
  onOpenAccount: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ pet, onOpenAccount }) => {
  return (
    <section id="como-funciona" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] font-bold">
            CÓMO FUNCIONA FIRULAIS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-2 text-[#152018] dark:text-[#FAFAF7]">
            Cuidar a tu peludo ahora es mucho más fácil.
          </h2>
        </div>
        <button
          onClick={onOpenAccount}
          className="btn-pop self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#132A1E] border-2 border-[#152018] dark:border-white/20 text-xs font-bold shadow-sticker-sm"
        >
          <span>Personalizar perfil de {pet.name}</span>
          <ArrowRight className="w-4 h-4 text-[var(--c-loro)]" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {/* Step 1 */}
        <div className="card-sticker rounded-3xl p-7 border-2 border-[#152018]/10 dark:border-white/10 bg-white dark:bg-[#132A1E] relative overflow-hidden shadow-sm">
          <span className="font-mono text-xs font-bold text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] bg-[var(--c-loro-light)] dark:bg-[#00BFA6]/20 px-2.5 py-1 rounded-full border border-[var(--c-loro)]/30">
            PASO 01
          </span>
          <div className="w-13 h-13 rounded-2xl bg-[var(--c-loro-light)] flex items-center justify-center mt-6 border border-[var(--c-loro)]/30">
            <PawPrint className="w-6 h-6 text-[var(--c-loro-dark)]" />
          </div>
          <h3 className="font-display text-xl font-bold mt-5 text-[#152018] dark:text-[#FAFAF7]">
            Crea su perfil de salud
          </h3>
          <p className="text-sm text-[#152018]/65 dark:text-[#FAFAF7]/65 mt-2 leading-relaxed">
            Indica el peso, edad y especie de {pet.name}. Nuestro catálogo calculará automáticamente las dosis exactas y opciones compatibles.
          </p>
        </div>

        {/* Step 2 */}
        <div className="card-sticker rounded-3xl p-7 border-2 border-[#152018]/10 dark:border-white/10 bg-white dark:bg-[#132A1E] relative overflow-hidden shadow-sm">
          <span className="font-mono text-xs font-bold text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)] bg-[var(--c-cielo-light)] dark:bg-[#0090C1]/20 px-2.5 py-1 rounded-full border border-[var(--c-cielo)]/30">
            PASO 02
          </span>
          <div className="w-13 h-13 rounded-2xl bg-[var(--c-cielo-light)] flex items-center justify-center mt-6 border border-[var(--c-cielo)]/30">
            <MousePointerClick className="w-6 h-6 text-[var(--c-cielo-dark)]" />
          </div>
          <h3 className="font-display text-xl font-bold mt-5 text-[#152018] dark:text-[#FAFAF7]">
            Dinos qué necesita
          </h3>
          <p className="text-sm text-[#152018]/65 dark:text-[#FAFAF7]/65 mt-2 leading-relaxed">
            Busca medicamentos por principio activo, compara seguros veterinarios o programa un traslado Taxi Pet en minutos.
          </p>
        </div>

        {/* Step 3 */}
        <div className="card-sticker rounded-3xl p-7 border-2 border-[#152018]/10 dark:border-white/10 bg-white dark:bg-[#132A1E] relative overflow-hidden shadow-sm">
          <span className="font-mono text-xs font-bold text-[var(--c-mango-dark)] dark:text-[var(--c-mango)] bg-[var(--c-mango-light)] dark:bg-[#FF9F1C]/20 px-2.5 py-1 rounded-full border border-[var(--c-mango)]/30">
            PASO 03
          </span>
          <div className="w-13 h-13 rounded-2xl bg-[var(--c-mango-light)] flex items-center justify-center mt-6 border border-[var(--c-mango)]/30">
            <CheckCircle2 className="w-6 h-6 text-[var(--c-mango-dark)]" />
          </div>
          <h3 className="font-display text-xl font-bold mt-5 text-[#152018] dark:text-[#FAFAF7]">
            Coordinamos y despachamos
          </h3>
          <p className="text-sm text-[#152018]/65 dark:text-[#FAFAF7]/65 mt-2 leading-relaxed">
            Conectamos con la tienda aliada con stock más cercana. Pagas por Pago Móvil, Zelle o efectivo y recibes en tu puerta.
          </p>
        </div>
      </div>
    </section>
  );
};
