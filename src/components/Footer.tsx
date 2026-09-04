import React from 'react';
import { MapPin, MessageCircle, Heart, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'nosotros' | 'faq', sectionId?: string) => void;
  onOpenLegal: (type: 'terminos' | 'privacidad') => void;
  onOpenZoneChecker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLegal,
  onOpenZoneChecker
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAFAF7] dark:bg-[#0D1F16] border-t-2 border-[#152018]/10 dark:border-white/10 transition-colors text-[#152018] dark:text-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Col 1: Brand & Identity */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-[var(--c-loro)] flex items-center justify-center border-2 border-[#152018] dark:border-white text-white">
              <svg width="16" height="16" viewBox="0 0 24 12" fill="none">
                <path d="M0 6H5L7 1L10 11L13 3L15 6H24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="font-display text-xl font-bold">
              Firulais<span className="text-[var(--c-loro)]">.</span>
            </span>
          </div>
          <p className="text-xs text-[#152018]/60 dark:text-[#FAFAF7]/60 leading-relaxed mb-4">
            El pulso del cuidado veterinario en Venezuela: medicamentos express, comparador de seguros y traslados seguros para mascotas.
          </p>
          <button
            onClick={onOpenZoneChecker}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] underline"
          >
            <MapPin className="w-3.5 h-3.5" /> Ver zonas activas en Caracas
          </button>
        </div>

        {/* Col 2: Services */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider mb-3 text-[#152018]/50 dark:text-white/50 font-mono">
            Servicios Principales
          </h4>
          <ul className="space-y-2 text-xs font-bold">
            <li>
              <button
                onClick={() => onNavigate('home', 'farmacia')}
                className="hover:text-[var(--c-loro)] transition text-left"
              >
                Farmacia Veterinaria Express (&lt;45 min)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('home', 'seguros')}
                className="hover:text-[var(--c-cielo)] transition text-left"
              >
                Comparador de Seguros para Mascotas
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('home', 'taxipet')}
                className="hover:text-[var(--c-mango)] transition text-left"
              >
                Taxi Pet Especializado
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('home', 'manada')}
                className="hover:text-[var(--c-sol)] transition text-left"
              >
                Comunidad La Manada
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Company & Trust */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider mb-3 text-[#152018]/50 dark:text-white/50 font-mono">
            Plataforma & Transparencia
          </h4>
          <ul className="space-y-2 text-xs font-bold">
            <li>
              <button
                onClick={() => onNavigate('nosotros')}
                className="hover:text-[var(--c-loro)] transition text-left"
              >
                Quiénes somos (Sin historias inventadas)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('faq')}
                className="hover:text-[var(--c-loro)] transition text-left"
              >
                Preguntas Frecuentes (FAQ)
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenLegal('terminos')}
                className="hover:text-[var(--c-loro)] transition text-left opacity-70"
              >
                Términos y Condiciones
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenLegal('privacidad')}
                className="hover:text-[var(--c-loro)] transition text-left opacity-70"
              >
                Política de Privacidad
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Caracas */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider mb-3 text-[#152018]/50 dark:text-white/50 font-mono">
            Atención al Tutor
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[var(--c-loro)] shrink-0" />
              <span>Chacao, Las Mercedes, Altamira y Gran Caracas</span>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-[var(--c-mango)] shrink-0" />
              <a
                href="https://wa.me/584120000000?text=Hola%20Firulais%20%F0%9F%90%BE"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
              >
                WhatsApp Firulais (+58 412)
              </a>
            </li>
            <li className="pt-2">
              <span className="inline-block text-[10px] font-mono text-[#152018]/50 dark:text-white/50 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-full">
                Horario: Lun a Dom 8:00am – 9:00pm
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t-2 border-[#152018]/10 dark:border-white/10 py-5 px-4 text-center flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto text-[11px] text-[#152018]/60 dark:text-[#FAFAF7]/60">
        <p>
          © 2026 Firulais App. Firulais es un marketplace y facilitador tecnológico; no reemplaza la atención veterinaria médica de urgencia.
        </p>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1 font-bold hover:text-[var(--c-loro)] transition"
        >
          <span>Volver arriba</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
