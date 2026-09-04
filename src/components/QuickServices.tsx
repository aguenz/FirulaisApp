import React from 'react';
import { Pill, Shield, CarFront, ArrowRight } from 'lucide-react';

interface QuickServicesProps {
  onNavigateSection: (sectionId: string) => void;
}

export const QuickServices: React.FC<QuickServicesProps> = ({ onNavigateSection }) => {
  const services = [
    {
      id: 'farmacia',
      icon: Pill,
      title: 'Comprar medicamentos',
      desc: 'Antiparasitarios, vitaminas y medicamentos con receta: te los conseguimos y llevamos a tu puerta, sin vueltas.',
      cta: 'Ir a Farmacia',
      rotate: '-rotate-2',
      bg: 'bg-[var(--c-loro-light)] dark:bg-[var(--c-loro)]/10',
      border: 'border-[var(--c-loro)]/40 hover:border-[var(--c-loro)]',
      iconBg: 'bg-[var(--c-loro)]',
      ctaBg: 'bg-[var(--c-loro)] text-[#0D1F16] hover:bg-[var(--c-loro-dark)] hover:text-white'
    },
    {
      id: 'seguros',
      icon: Shield,
      title: 'Proteger a mi mascota',
      desc: 'Compara coberturas médicas, urgencias y pólizas de asistencia veterinaria.',
      cta: 'Ver Seguros',
      rotate: 'rotate-2',
      bg: 'bg-[var(--c-cielo-light)] dark:bg-[var(--c-cielo)]/10',
      border: 'border-[var(--c-cielo)]/40 hover:border-[var(--c-cielo)]',
      iconBg: 'bg-[var(--c-cielo)]',
      ctaBg: 'bg-[var(--c-cielo)] text-white hover:bg-[var(--c-cielo-dark)]'
    },
    {
      id: 'taxipet',
      icon: CarFront,
      title: 'Mover a mi mascota',
      desc: 'Un carro cómodo y seguro para tu peludo, con choferes que lo tratan como parte de la familia.',
      cta: 'Pedir Taxi Pet',
      rotate: '-rotate-2',
      bg: 'bg-[var(--c-mango-light)] dark:bg-[var(--c-mango)]/10',
      border: 'border-[var(--c-mango)]/40 hover:border-[var(--c-mango)]',
      iconBg: 'bg-[var(--c-mango)]',
      ctaBg: 'bg-[var(--c-mango)] text-[#0D1F16] hover:bg-[var(--c-mango-dark)] hover:text-white'
    }
  ];

  return (
    <section id="servicios" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-8 sm:mb-10">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] font-bold">
          ¿QUÉ NECESITAS HOY?
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2 text-[#152018] dark:text-[#FAFAF7]">
          Todo lo que tu peludo necesita, en un solo lugar.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onNavigateSection(s.id)}
              className={`card-sticker group relative flex flex-col justify-between text-left rounded-3xl p-6 sm:p-7 border-2 ${s.border} ${s.bg} shadow-sm hover:shadow-sticker overflow-hidden transition-all`}
            >
              {/* Oversized watermark icon for texture / personality */}
              <Icon className={`absolute -right-5 -bottom-6 w-32 h-32 text-[#152018]/[0.05] dark:text-white/[0.06] ${s.rotate} pointer-events-none`} strokeWidth={1.5} />

              {/* Icon badge (sticker style, rotates a bit more on hover) */}
              <span className={`sticker-tag ${s.rotate} w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 border-[#152018] shadow-sticker-sm text-white relative z-10 ${s.iconBg}`}>
                <Icon className="w-7 h-7" />
              </span>

              <div className="mt-6 relative z-10">
                <h3 className="font-display font-bold text-xl text-[#152018] dark:text-[#FAFAF7]">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#152018]/65 dark:text-[#FAFAF7]/70 mt-2 leading-relaxed max-w-[85%]">
                  {s.desc}
                </p>
              </div>

              <span className={`btn-pop mt-6 relative z-10 inline-flex items-center gap-1.5 self-start text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full border-2 border-[#152018] shadow-sticker-sm ${s.ctaBg}`}>
                {s.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
