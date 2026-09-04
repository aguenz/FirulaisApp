import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldPlus,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Stethoscope,
  Smartphone,
  Hospital,
  Video,
  CheckCircle2
} from 'lucide-react';
import { PetProfile, InsurancePlan } from '../types';
import { INSURANCE_PLANS } from '../data/mockData';

interface InsuranceSectionProps {
  pet: PetProfile;
  onOpenInsuranceQuiz: () => void;
  onOpenInsurancePurchase: (plan: InsurancePlan) => void;
}

export const InsuranceSection: React.FC<InsuranceSectionProps> = ({
  pet,
  onOpenInsuranceQuiz,
  onOpenInsurancePurchase
}) => {
  const [openPlanId, setOpenPlanId] = useState<string | null>('sv-mi-mascota');
  const [filterType, setFilterType] = useState<'todos' | 'seguro' | 'servicio'>('todos');

  const filteredPlans = INSURANCE_PLANS.filter((p) => {
    if (filterType === 'todos') return true;
    return p.type === filterType;
  });

  const getPlanIcon = (id: string) => {
    switch (id) {
      case 'sv-mi-mascota':
        return <Stethoscope className="w-4 h-4 text-[var(--c-cielo-dark)]" />;
      case 'appa-digital':
        return <Smartphone className="w-4 h-4 text-[var(--c-cielo-dark)]" />;
      case 'universitas-petcare':
        return <Hospital className="w-4 h-4 text-[var(--c-cielo-dark)]" />;
      case 'hispana-amigo-fiel':
        return <ShieldCheck className="w-4 h-4 text-[var(--c-cielo-dark)]" />;
      case 'mivete-online':
        return <Video className="w-4 h-4 text-[var(--c-mango-dark)]" />;
      default:
        return <ShieldPlus className="w-4 h-4 text-[var(--c-cielo-dark)]" />;
    }
  };

  return (
    <section id="seguros" className="bg-white dark:bg-[#0D1F16] border-b-2 border-[#152018]/10 dark:border-white/10 py-16 sm:py-24 relative overflow-hidden transition-colors">
      
      {/* Background glow */}
      <div className="absolute w-[32rem] h-[32rem] bg-[var(--c-cielo)]/15 rounded-full blur-3xl -top-24 -right-20 pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#152018] text-[var(--c-cielo)] font-mono text-xs font-bold rotate-[-1deg] shadow-sticker-sm">
            <ShieldPlus className="w-3.5 h-3.5" /> PROTECCIÓN + ASISTENCIA MÉDICA VETERINARIA
          </span>
          
          <h2 className="font-display text-3xl sm:text-5xl font-bold mt-4 tracking-tight leading-[1.06] text-[#152018] dark:text-[#FAFAF7]">
            Más opciones reales para proteger a{' '}
            <span className="relative inline-block text-[var(--c-cielo)] pb-1 sm:pb-1.5">
              {pet.name}
              {/* Hand-drawn organic underline */}
              <svg
                className="absolute -bottom-1 sm:-bottom-2 -left-1 w-[105%] h-2.5 sm:h-3.5 text-[#FFA62B] pointer-events-none overflow-visible -rotate-1 origin-left"
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
            </span>.
          </h2>

          <p className="text-sm sm:text-base text-[#152018]/70 dark:text-[#FAFAF7]/70 mt-4 leading-relaxed max-w-2xl mx-auto">
            En Venezuela la oferta de seguros para mascotas es limitada y confusa. Por eso reunimos pólizas formales y servicios de atención médica digital lado a lado, para que elijas con información transparente.
          </p>

          {/* Active Pet Pill */}
          <div className="mt-5 inline-flex items-center gap-2 bg-[var(--c-cielo-light)] dark:bg-[#132A1E] rounded-full px-4 py-2 border-2 border-[var(--c-cielo)]/25 shadow-sticker-sm text-xs font-bold text-[#152018] dark:text-[#FAFAF7]">
            <span className="text-base">{pet.kind === 'perro' ? '🐶' : '🐱'}</span>
            <span>Comparando coberturas para {pet.name}</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setFilterType('todos')}
            className={`btn-pop px-4 py-1.5 rounded-full border-2 border-[#152018] text-xs font-bold transition-all ${
              filterType === 'todos'
                ? 'bg-[var(--c-cielo)] text-white shadow-sticker-sm'
                : 'bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] opacity-60 hover:opacity-100'
            }`}
          >
            Todas las opciones ({INSURANCE_PLANS.length})
          </button>
          <button
            onClick={() => setFilterType('seguro')}
            className={`btn-pop px-4 py-1.5 rounded-full border-2 border-[#152018] text-xs font-bold transition-all ${
              filterType === 'seguro'
                ? 'bg-[var(--c-cielo)] text-white shadow-sticker-sm'
                : 'bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] opacity-60 hover:opacity-100'
            }`}
          >
            🛡️ Pólizas de Seguro (4)
          </button>
          <button
            onClick={() => setFilterType('servicio')}
            className={`btn-pop px-4 py-1.5 rounded-full border-2 border-[#152018] text-xs font-bold transition-all ${
              filterType === 'servicio'
                ? 'bg-[var(--c-mango)] text-white shadow-sticker-sm'
                : 'bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] opacity-60 hover:opacity-100'
            }`}
          >
            🩺 Telemedicina / Asistencia (1)
          </button>
        </div>

        {/* Insurance Interactive Grid / Decision Matrix */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          
          {/* Lead Card: "Empieza por aquí" / Quiz Launcher */}
          <div className="lg:col-span-1 rounded-[2.25rem] p-7 sm:p-8 border-2 border-[var(--c-cielo)]/30 bg-[var(--c-loro-light)] dark:bg-[#132A1E] shadow-sticker flex flex-col justify-between h-full">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)] font-mono text-[10px] uppercase tracking-wider font-bold">
                <Sparkles className="w-4 h-4" /> ASISTENTE DE COMPARACIÓN
              </span>
              
              <h3 className="font-display text-2xl sm:text-3xl font-bold mt-4 leading-tight text-[#152018] dark:text-[#FAFAF7]">
                ¿No sabes cuál plan le conviene a {pet.name}?
              </h3>

              <p className="text-sm text-[#152018]/70 dark:text-[#FAFAF7]/70 mt-3.5 leading-relaxed">
                Responde 3 preguntas breves sobre la edad de tu mascota, historial y presupuesto para recomendarte la cobertura ideal.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <button
                type="button"
                onClick={onOpenInsuranceQuiz}
                className="btn-pop w-full py-4 bg-[var(--c-sol)] text-[#152018] rounded-full text-sm font-bold border-2 border-[#152018] shadow-sticker-sm flex items-center justify-center gap-2"
              >
                <span>Hacer quiz de 1 minuto</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="bg-white/80 dark:bg-[#0D1F16]/60 rounded-2xl p-4 border border-[#152018]/10 text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#152018] dark:text-[#FAFAF7] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[var(--c-loro-dark)]" />
                  <span>Sin papeleos físicos engorrosos</span>
                </div>
                <div className="flex items-center gap-2 text-[#152018] dark:text-[#FAFAF7] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[var(--c-loro-dark)]" />
                  <span>Pago mensual o anual en USD / VES</span>
                </div>
                <div className="flex items-center gap-2 text-[#152018] dark:text-[#FAFAF7] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[var(--c-loro-dark)]" />
                  <span>Aseguradoras 100% reguladas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Column */}
          <div className="lg:col-span-2 space-y-4">
            {filteredPlans.map((plan) => {
              const isOpen = openPlanId === plan.id;
              const isService = plan.type === 'servicio';

              return (
                <div
                  key={plan.id}
                  className={`rounded-[1.75rem] border-2 transition-all p-5 sm:p-6 shadow-sticker-sm ${
                    isService
                      ? 'bg-[var(--c-mango-light)]/40 dark:bg-[#132A1E] border-[var(--c-mango)]/30 hover:border-[var(--c-mango)]'
                      : 'bg-white dark:bg-[#132A1E] border-[#152018]/15 dark:border-white/15 hover:border-[var(--c-cielo)]'
                  }`}
                >
                  <div
                    onClick={() => setOpenPlanId(isOpen ? null : plan.id)}
                    className="flex items-start justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)] uppercase font-bold tracking-wide">
                          {plan.type === 'seguro' ? `SEGURO · ${plan.insurer}` : `SERVICIO CLÍNICO · ${plan.insurer}`}
                        </span>
                        {plan.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-[var(--c-sol)] text-[#152018] text-[9px] font-bold border border-[#152018]/30">
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-lg sm:text-xl mt-1 text-[#152018] dark:text-[#FAFAF7]">
                        {plan.name}
                      </h3>

                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {plan.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-full bg-[var(--c-cielo-light)] dark:bg-[#0090C1]/20 text-[10px] font-bold text-[#152018] dark:text-[#FAFAF7]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="font-display font-bold text-sm text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)]">
                        {plan.priceEstimate}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#152018]/60 dark:text-white/60 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isOpen && (
                    <div className="mt-5 pt-4 border-t-2 border-[#152018]/10 dark:border-white/10 space-y-3">
                      <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAFAF7] dark:bg-[#0D1F16] border border-[#152018]/10">
                        {getPlanIcon(plan.id)}
                        <p className="text-xs text-[#152018]/80 dark:text-[#FAFAF7]/80 leading-relaxed">
                          <strong className="text-[#152018] dark:text-white">Lo más importante: </strong>
                          {plan.mainHighlight}
                        </p>
                      </div>

                      <p className="text-xs text-[#152018]/65 dark:text-[#FAFAF7]/65 leading-relaxed">
                        {plan.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
                        <div className="text-xs text-[#152018]/60 dark:text-[#FAFAF7]/60">
                          <span>Límite de cobertura: </span>
                          <strong className="text-[#152018] dark:text-white">{plan.coverageLimit}</strong>
                        </div>

                        <button
                          type="button"
                          onClick={() => onOpenInsurancePurchase(plan)}
                          className="btn-pop px-6 py-2.5 bg-[var(--c-cielo)] text-white rounded-full text-xs font-bold border-2 border-[#152018] shadow-sticker-sm flex items-center gap-1.5"
                        >
                          <span>Iniciar contratación</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Commercial Transparency Footer */}
        <div className="mt-12 rounded-[2rem] border-2 border-[#152018]/15 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#132A1E] p-6 sm:p-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)]">
                01. COMPARACIÓN TRANSPARENTE
              </span>
              <h4 className="font-display font-bold text-base mt-1 text-[#152018] dark:text-[#FAFAF7]">
                Compara lo importante
              </h4>
              <p className="text-xs text-[#152018]/65 dark:text-[#FAFAF7]/65 mt-1 leading-relaxed">
                Coberturas reales, exclusiones por edad y deducibles visibles antes de comprometerte con ninguna aseguradora.
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[var(--c-loro-dark)] dark:text-[var(--c-loro)]">
                02. CONTRATACIÓN ÁGIL
              </span>
              <h4 className="font-display font-bold text-base mt-1 text-[#152018] dark:text-[#FAFAF7]">
                Facilitación sin costo extra
              </h4>
              <p className="text-xs text-[#152018]/65 dark:text-[#FAFAF7]/65 mt-1 leading-relaxed">
                Inicias la solicitud desde Firulais; la comisión la asume la aseguradora aliada, no se le recarga al tutor.
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[var(--c-mango-dark)] dark:text-[var(--c-mango)]">
                03. RESPALDO OFICIAL
              </span>
              <h4 className="font-display font-bold text-base mt-1 text-[#152018] dark:text-[#FAFAF7]">
                Aseguradora identificada
              </h4>
              <p className="text-xs text-[#152018]/65 dark:text-[#FAFAF7]/65 mt-1 leading-relaxed">
                Firulais facilita la plataforma tecnológica; el contrato y póliza legal son emitidos formalmente por la compañía aseguradora.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
