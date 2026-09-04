import React from 'react';
import { Home, Pill, Shield, CarFront, User } from 'lucide-react';
import { PetProfile } from '../types';

interface MobileDockProps {
  pet: PetProfile;
  activeView: 'home' | 'nosotros' | 'faq';
  onNavigate: (view: 'home' | 'nosotros' | 'faq', sectionId?: string) => void;
  onOpenAccount: () => void;
}

export const MobileDock: React.FC<MobileDockProps> = ({
  pet,
  onNavigate,
  onOpenAccount
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAFAF7]/95 dark:bg-[#0D1F16]/95 backdrop-blur-md border-t-2 border-[#152018]/10 dark:border-white/10 transition-colors shadow-lg">
      <div className="grid grid-cols-5 items-center px-2 py-2">
        
        <button
          onClick={() => onNavigate('home', 'inicio')}
          className="flex flex-col items-center gap-0.5 text-[var(--c-loro-dark)] dark:text-[var(--c-loro)]"
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-bold">Inicio</span>
        </button>

        <button
          onClick={() => onNavigate('home', 'farmacia')}
          className="flex flex-col items-center gap-0.5 text-[#152018]/70 dark:text-white/70 hover:text-[var(--c-loro)]"
        >
          <Pill className="w-4 h-4" />
          <span className="text-[9px] font-bold">Farmacia</span>
        </button>

        <button
          onClick={() => onNavigate('home', 'seguros')}
          className="flex flex-col items-center gap-0.5 text-[#152018]/70 dark:text-white/70 hover:text-[var(--c-cielo)]"
        >
          <Shield className="w-4 h-4" />
          <span className="text-[9px] font-bold">Seguros</span>
        </button>

        <button
          onClick={() => onNavigate('home', 'taxipet')}
          className="flex flex-col items-center gap-0.5 text-[#152018]/70 dark:text-white/70 hover:text-[var(--c-mango)]"
        >
          <CarFront className="w-4 h-4" />
          <span className="text-[9px] font-bold">Taxi Pet</span>
        </button>

        <button
          onClick={onOpenAccount}
          className="flex flex-col items-center gap-0.5 text-[#152018]/70 dark:text-white/70 hover:text-[var(--c-sol)]"
        >
          <span className="text-sm leading-4">{pet.kind === 'perro' ? '🐶' : '🐱'}</span>
          <span className="text-[9px] font-bold truncate max-w-[48px]">{pet.name}</span>
        </button>

      </div>
    </nav>
  );
};
