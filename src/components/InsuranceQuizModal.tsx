import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PetProfile, InsurancePlan } from '../types';
import { INSURANCE_PLANS } from '../data/mockData';

interface InsuranceQuizModalProps {
  isOpen: boolean;
  pet: PetProfile;
  onClose: () => void;
  onSelectPlan: (plan: InsurancePlan) => void;
}

export const InsuranceQuizModal: React.FC<InsuranceQuizModalProps> = ({
  isOpen,
  pet,
  onClose,
  onSelectPlan
}) => {
  const [priority, setPriority] = useState<string>('emergencias');
  const [budget, setBudget] = useState<string>('equilibrado');
  const [careType, setCareType] = useState<string>('clinica');
  const [resultPlan, setResultPlan] = useState<InsurancePlan | null>(null);

  if (!isOpen) return null;

  const handleCalculateRecommendation = () => {
    let best = INSURANCE_PLANS[0];
    if (priority === 'digital' || budget === 'economico') {
      best = INSURANCE_PLANS[1]; // Appa Digital
    } else if (priority === 'red-amplia' || careType === 'clinica') {
      best = INSURANCE_PLANS[2]; // Universitas
    } else if (budget === 'minimo') {
      best = INSURANCE_PLANS[4]; // MiVeteOnline
    } else {
      best = INSURANCE_PLANS[0]; // Seguros Venezuela
    }
    setResultPlan(best);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[90] flex items-center justify-center p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAFAF7] dark:bg-[#0D1F16] rounded-[2rem] border-2 border-[#152018] max-w-lg w-full p-6 sm:p-8 shadow-sticker relative text-[#152018] dark:text-[#FAFAF7]"
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-[var(--c-sol)] text-[#152018] border-2 border-[#152018] flex items-center justify-center shrink-0 shadow-sticker-sm">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">
                Quiz de Seguros para {pet.name}
              </h3>
              <p className="text-[11px] text-muted-foreground">
                3 preguntas para encontrar la póliza ideal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!resultPlan ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="quiz-priority" className="block text-xs font-bold mb-1.5">
                1. ¿Qué tipo de cobertura te preocupa más?
              </label>
              <select
                id="quiz-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3.5 py-3 bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] rounded-xl text-xs font-semibold border-2 border-[#152018]/15"
              >
                <option value="emergencias">Emergencias, traumatismos e intoxicaciones repentinas</option>
                <option value="digital">Gestión 100% digital desde el celular con reembolso rápido</option>
                <option value="red-amplia">Red amplia de clínicas veterinarias en Caracas y chequeos</option>
                <option value="telemedicina">Orientación veterinaria 24/7 sin deducible ni copagos</option>
              </select>
            </div>

            <div>
              <label htmlFor="quiz-care-type" className="block text-xs font-bold mb-1.5">
                2. ¿Cómo prefieres recibir la atención de {pet.name}?
              </label>
              <select
                id="quiz-care-type"
                value={careType}
                onChange={(e) => setCareType(e.target.value)}
                className="w-full px-3.5 py-3 bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] rounded-xl text-xs font-semibold border-2 border-[#152018]/15"
              >
                <option value="clinica">En clínicas veterinarias aliadas directas</option>
                <option value="reembolso">Con mi veterinario de confianza y solicitar reembolso</option>
                <option value="hibrido">Indiferente, lo que resulte más rápido</option>
              </select>
            </div>

            <div>
              <label htmlFor="quiz-budget" className="block text-xs font-bold mb-1.5">
                3. ¿Qué presupuesto mensual prefieres considerar?
              </label>
              <select
                id="quiz-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3.5 py-3 bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] rounded-xl text-xs font-semibold border-2 border-[#152018]/15"
              >
                <option value="economico">Económico ($12 – $15 / mes)</option>
                <option value="equilibrado">Equilibrado con mayor cobertura ($15 – $20 / mes)</option>
                <option value="minimo">Solo telemedicina digital básica (&lt;$10 / mes)</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleCalculateRecommendation}
              className="btn-pop w-full mt-4 py-3.5 bg-[var(--c-sol)] text-[#152018] font-bold text-sm rounded-full border-2 border-[#152018] shadow-sticker-sm flex items-center justify-center gap-2"
            >
              <span>Ver recomendación para {pet.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="bg-[var(--c-loro-light)] dark:bg-[#132A1E] rounded-2xl p-5 border-2 border-[var(--c-loro)] shadow-sm space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--c-loro-dark)] dark:text-[var(--c-loro)]">
                ⭐ PLAN RECOMENDADO
              </span>
              
              <h4 className="font-display font-bold text-xl text-[#152018] dark:text-[#FAFAF7]">
                {resultPlan.name}
              </h4>
              <p className="text-xs font-mono font-semibold text-muted-foreground">
                Emite: {resultPlan.insurer} · {resultPlan.priceEstimate}
              </p>

              <p className="text-xs text-[#152018]/80 dark:text-[#FAFAF7]/80 leading-relaxed">
                {resultPlan.mainHighlight}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {resultPlan.tags.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-full bg-white dark:bg-black/30 text-[10px] font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setResultPlan(null)}
                className="flex-1 py-3 rounded-full text-xs font-bold border-2 border-[#152018]/20 hover:bg-black/5"
              >
                Reintentar
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectPlan(resultPlan);
                  onClose();
                }}
                className="flex-1 btn-pop py-3 bg-[var(--c-loro)] text-white font-bold text-xs rounded-full border-2 border-[#152018] shadow-sticker-sm flex items-center justify-center gap-1"
              >
                <span>Contratar este plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
