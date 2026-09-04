import React from 'react';
import { ShieldCheck, Truck, Zap, HeartHandshake } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const props = [
    {
      icon: ShieldCheck,
      color: 'bg-[var(--c-loro-light)] text-[var(--c-loro-dark)] border-[var(--c-loro)]/30',
      title: '100% Originales e INSAI',
      desc: 'Medicamentos y vacunas trazables con lote verificado y cadena de frío garantizada en Caracas.'
    },
    {
      icon: Truck,
      color: 'bg-[var(--c-cielo-light)] text-[var(--c-cielo-dark)] border-[var(--c-cielo)]/30',
      title: 'Entrega Express en <45 min',
      desc: 'Red descentralizada de farmacias veterinarias aliadas en los 5 municipios caraqueños.'
    },
    {
      icon: Zap,
      color: 'bg-[var(--c-mango-light)] text-[var(--c-mango-dark)] border-[var(--c-mango)]/30',
      title: 'Tasa Oficial BCV',
      desc: 'Precios en USD referencial y Bolívares a tasa del Banco Central. Pago Móvil, Zelle o Efectivo.'
    },
    {
      icon: HeartHandshake,
      color: 'bg-[var(--c-sol-light)] text-[var(--c-sol-dark)] border-[var(--c-sol)]/30',
      title: 'Comunidad & Respaldo',
      desc: 'Atención personalizada por WhatsApp y soporte post-compra con veterinarios aliados.'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {props.map((prop, idx) => {
          const Icon = prop.icon;
          return (
            <div
              key={idx}
              className="card-sticker rounded-3xl p-6 border-2 border-[#152018]/10 dark:border-white/10 bg-white dark:bg-[#132A1E] relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <span className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${prop.color} mb-5`}>
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="font-display font-bold text-lg text-[#152018] dark:text-[#FAFAF7]">
                  {prop.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#152018]/65 dark:text-[#FAFAF7]/65 mt-2 leading-relaxed">
                  {prop.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
