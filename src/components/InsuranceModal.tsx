import React, { useState } from 'react';
import { X, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';
import { InsurancePlan, PetProfile } from '../types';

interface InsuranceModalProps {
  isOpen: boolean;
  plan: InsurancePlan | null;
  pet: PetProfile;
  onClose: () => void;
}

export const InsuranceModal: React.FC<InsuranceModalProps> = ({
  isOpen,
  plan,
  pet,
  onClose
}) => {
  const [tutorName, setTutorName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cedula, setCedula] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !plan) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `Hola Firulais 🐾, quiero iniciar la contratación de la póliza de salud para mi mascota:
• Plan: ${plan.name} (${plan.insurer})
• Mascota: ${pet.name} (${pet.kind}, ${pet.weight}, ${pet.age})
• Titular: ${tutorName}
• Cédula/ID: ${cedula}
• Teléfono: ${phone}
• Correo: ${email}`;

    setTimeout(() => {
      window.open(`https://wa.me/584120000000?text=${encodeURIComponent(message)}`, '_blank');
      setSubmitted(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[90] flex items-center justify-center p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAFAF7] dark:bg-[#0D1F16] rounded-[2rem] border-2 border-[#152018] max-w-lg w-full p-6 sm:p-8 shadow-sticker relative text-[#152018] dark:text-[#FAFAF7]"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)] font-bold">
              SOLICITUD DE CONTRATACIÓN
            </span>
            <h3 className="font-display text-2xl font-bold mt-1 text-[#152018] dark:text-[#FAFAF7]">
              {plan.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Emite: {plan.insurer} · {plan.priceEstimate}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="p-3 bg-[var(--c-cielo-light)] dark:bg-[#132A1E] rounded-xl border border-[var(--c-cielo)]/20 text-xs">
            <p className="font-semibold text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)]">
              Mascota asegurada: {pet.name} ({pet.kind === 'perro' ? 'Canino' : 'Felino'}, {pet.age})
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Nombre completo del tutor</label>
            <input
              type="text"
              required
              value={tutorName}
              onChange={(e) => setTutorName(e.target.value)}
              placeholder="Ej: Carlos Mendoza"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-[#132A1E] rounded-xl border-2 border-[#152018]/15 text-xs font-semibold focus:border-[var(--c-cielo)] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold mb-1">Cédula de Identidad</label>
              <input
                type="text"
                required
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                placeholder="V-18.450.210"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#132A1E] rounded-xl border-2 border-[#152018]/15 text-xs font-semibold focus:border-[var(--c-cielo)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Teléfono / WhatsApp</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0412-0000000"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#132A1E] rounded-xl border-2 border-[#152018]/15 text-xs font-semibold focus:border-[var(--c-cielo)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Correo electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-[#132A1E] rounded-xl border-2 border-[#152018]/15 text-xs font-semibold focus:border-[var(--c-cielo)] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="btn-pop w-full mt-4 py-3.5 bg-[var(--c-cielo)] text-white font-bold text-xs rounded-full border-2 border-[#152018] shadow-sticker-sm flex items-center justify-center gap-2"
          >
            {submitted ? (
              <span>Preparando solicitud...</span>
            ) : (
              <>
                <Send className="w-4 h-4" /> Continuar solicitud por WhatsApp
              </>
            )}
          </button>

          <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
            Firulais conecta tu solicitud con el corredor oficial de {plan.insurer} para la emisión legal de tu póliza.
          </p>
        </form>
      </div>
    </div>
  );
};
