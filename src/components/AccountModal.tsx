import React, { useState } from 'react';
import { X, User, Heart, Shield, Sparkles, Check } from 'lucide-react';
import { PetProfile, PetWeight, PetAge, PetKind } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  pet: PetProfile;
  onClose: () => void;
  onSavePet: (updated: PetProfile) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  pet,
  onClose,
  onSavePet
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'health'>('profile');
  const [petName, setPetName] = useState(pet.name);
  const [petKind, setPetKind] = useState<PetKind>(pet.kind);
  const [petWeight, setPetWeight] = useState<PetWeight>(pet.weight);
  const [petAge, setPetAge] = useState<PetAge>(pet.age);
  const [breed, setBreed] = useState(pet.breed || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePet({
      kind: petKind,
      name: petName.trim() || (petKind === 'perro' ? 'Firulais' : 'Michi'),
      weight: petWeight,
      age: petAge,
      breed
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[90] flex items-center justify-center p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAFAF7] dark:bg-[#0D1F16] rounded-[2rem] border-2 border-[#152018] max-w-md w-full p-6 sm:p-7 shadow-sticker relative text-[#152018] dark:text-[#FAFAF7]"
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-[var(--c-loro)] text-white border-2 border-[#152018] flex items-center justify-center shrink-0 shadow-sticker-sm text-lg">
              {petKind === 'perro' ? '🐶' : '🐱'}
            </span>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">
                Pasaporte de Salud
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Perfil de {petName || 'tu mascota'}
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

        {/* Tabs */}
        <div className="flex bg-[var(--c-loro-light)] dark:bg-[#132A1E] rounded-full p-1 mb-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 rounded-full transition-all ${
              activeTab === 'profile'
                ? 'bg-[var(--c-loro)] text-white shadow-sticker-sm'
                : 'text-[#152018]/60 dark:text-white/60'
            }`}
          >
            Datos de Mascota
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('health')}
            className={`flex-1 py-2 rounded-full transition-all ${
              activeTab === 'health'
                ? 'bg-[var(--c-loro)] text-white shadow-sticker-sm'
                : 'text-[#152018]/60 dark:text-white/60'
            }`}
          >
            Historial de Salud
          </button>
        </div>

        {activeTab === 'profile' ? (
          <form onSubmit={handleSave} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold mb-1">Nombre de la mascota</label>
              <input
                type="text"
                required
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Ej: Firulais, Michi, Toby..."
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#132A1E] text-xs font-bold rounded-xl border-2 border-[#152018]/15 focus:border-[var(--c-loro)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Especie</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPetKind('perro')}
                  className={`py-2 rounded-xl text-xs font-bold border-2 border-[#152018] ${
                    petKind === 'perro'
                      ? 'bg-[var(--c-loro)] text-white shadow-sticker-sm'
                      : 'bg-white dark:bg-[#132A1E] opacity-60'
                  }`}
                >
                  🐶 Perro (Canino)
                </button>
                <button
                  type="button"
                  onClick={() => setPetKind('gato')}
                  className={`py-2 rounded-xl text-xs font-bold border-2 border-[#152018] ${
                    petKind === 'gato'
                      ? 'bg-[var(--c-loro)] text-white shadow-sticker-sm'
                      : 'bg-white dark:bg-[#132A1E] opacity-60'
                  }`}
                >
                  🐱 Gato (Felino)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold mb-1">Banda de Peso</label>
                <select
                  value={petWeight}
                  onChange={(e) => setPetWeight(e.target.value as PetWeight)}
                  className="w-full px-3 py-2 bg-white dark:bg-[#132A1E] text-xs font-bold rounded-xl border-2 border-[#152018]/15"
                >
                  <option value="toy">Toy (&lt;5kg)</option>
                  <option value="small">Pequeño (5–10kg)</option>
                  <option value="medium">Mediano (10–25kg)</option>
                  <option value="large">Grande (25–40kg)</option>
                  <option value="giant">Gigante (+40kg)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Etapa de Vida</label>
                <select
                  value={petAge}
                  onChange={(e) => setPetAge(e.target.value as PetAge)}
                  className="w-full px-3 py-2 bg-white dark:bg-[#132A1E] text-xs font-bold rounded-xl border-2 border-[#152018]/15"
                >
                  <option value="cachorro">Cachorro / Gatito</option>
                  <option value="adulto">Adulto</option>
                  <option value="senior">Senior (+7 años)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Raza (Opcional)</label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="Ej: Golden Retriever, Mestizo, Siamés..."
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#132A1E] text-xs font-semibold rounded-xl border-2 border-[#152018]/15 focus:border-[var(--c-loro)] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="btn-pop w-full py-3.5 bg-[var(--c-loro)] text-white font-bold text-xs rounded-full border-2 border-[#152018] shadow-sticker-sm flex items-center justify-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" /> ¡Perfil actualizado!
                </>
              ) : (
                <span>Guardar y personalizar catálogo</span>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-3 text-xs">
            <div className="bg-white dark:bg-[#132A1E] p-3.5 rounded-2xl border-2 border-[#152018]/10 space-y-1.5">
              <span className="font-mono text-[10px] uppercase text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] font-bold">
                VACUNACIÓN & DESPARASITACIÓN
              </span>
              <p className="font-bold">Antirrábica + Séxtuple: Al día (Vence Nov 2026)</p>
              <p className="text-muted-foreground text-[11px]">Último Bravecto administrado hace 3 semanas.</p>
            </div>

            <div className="bg-white dark:bg-[#132A1E] p-3.5 rounded-2xl border-2 border-[#152018]/10 space-y-1.5">
              <span className="font-mono text-[10px] uppercase text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)] font-bold">
                PÓLIZA ASOCIADA
              </span>
              <p className="font-bold">Sin póliza activa actualmente</p>
              <p className="text-muted-foreground text-[11px]">Revisa la sección de Seguros para cotizar cobertura médica.</p>
            </div>

            <div className="bg-white dark:bg-[#132A1E] p-3.5 rounded-2xl border-2 border-[#152018]/10 space-y-1.5">
              <span className="font-mono text-[10px] uppercase text-[var(--c-mango-dark)] dark:text-[var(--c-mango)] font-bold">
                DIRECCIÓN FAVORITA EN CARACAS
              </span>
              <p className="font-bold">Altamira / Chacao, Caracas</p>
              <p className="text-muted-foreground text-[11px]">Tiempo promedio de entrega: 20-30 min.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
