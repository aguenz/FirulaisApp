import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, Smartphone } from 'lucide-react';

export const AppSignupSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="app-signup" className="bg-[#0D1F16] grain-noche text-[#FAFAF7] relative overflow-hidden py-20">
      
      {/* Background glow */}
      <div className="absolute w-[28rem] h-[28rem] bg-[var(--c-loro)]/20 rounded-full blur-3xl -top-16 left-1/4 pointer-events-none -z-0" />
      <div className="absolute w-80 h-80 bg-[var(--c-sol)]/15 rounded-full blur-3xl -bottom-20 right-10 pointer-events-none -z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <span className="font-hand text-3xl text-[var(--c-sol)] rotate-[-2deg] inline-block mb-2 font-bold">
          ¡Únete a la manada caraqueña!
        </span>

        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
          Un solo pulso para cuidarla mejor.
        </h2>

        <p className="text-[#FAFAF7]/75 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
          Firulais está iniciando en Caracas. Ya puedes comprar medicamentos, comparar seguros y pedir tu Taxi Pet desde la web. Déjanos tu contacto para darte acceso prioritario a la app en iOS y Android con <strong>$5 de crédito inicial de bienvenida</strong>.
        </p>

        {submitted ? (
          <div className="bg-white/10 backdrop-blur-md border-2 border-[var(--c-loro)] p-6 rounded-3xl max-w-md mx-auto animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-10 h-10 text-[var(--c-loro)] mx-auto mb-2" />
            <h4 className="font-display font-bold text-lg text-white">¡Estás en la lista prioritaria!</h4>
            <p className="text-xs text-white/70 mt-1">
              Te avisaremos al correo <strong>{email}</strong> apenas liberemos la versión de pruebas en TestFlight y Google Play.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border-2 border-white/20 text-[#FAFAF7] placeholder:text-[#FAFAF7]/40 text-xs sm:text-sm focus:outline-none focus:border-[var(--c-loro)]"
            />
            <button
              type="submit"
              className="btn-pop px-7 py-3.5 bg-[var(--c-loro)] text-[#152018] font-bold text-xs sm:text-sm rounded-full border-2 border-white shadow-sticker-sm flex items-center justify-center gap-2 hover:bg-[var(--c-loro-dark)] hover:text-white transition-colors shrink-0"
            >
              <Smartphone className="w-4 h-4" /> Notificarme
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#FAFAF7]/50 mt-4 font-mono">
          📱 App Firulais en desarrollo para iOS & Android · Caracas, Venezuela
        </p>

      </div>
    </section>
  );
};
