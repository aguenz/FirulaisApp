import React, { useState } from 'react';
import { X, Camera, Sparkles, CheckCircle2, Loader2, FileText, Stethoscope } from 'lucide-react';
import { ResolvedProduct, PetProfile } from '../types';
import { VET_DOCTORS } from '../data/mockData';

interface RxModalProps {
  isOpen: boolean;
  product?: ResolvedProduct | null;
  pet: PetProfile;
  onClose: () => void;
  onConfirmUpload: (product: ResolvedProduct) => void;
}

export const RxModal: React.FC<RxModalProps> = ({
  isOpen,
  product,
  pet,
  onClose,
  onConfirmUpload
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<{
    vetName: string;
    mpps: string;
    clinic: string;
    detectedMed: string;
    detectedDose: string;
    date: string;
    matchScore: string;
  } | null>(null);

  if (!isOpen) return null;

  const currentMed = product || {
    id: 'p5',
    name: 'Apoquel Control Alergias & Picor',
    brand: 'Zoetis',
    activeIngredient: 'Oclacitinib maleato',
    cat: 'recipe',
    pet: pet.kind,
    rx: true,
    tag: '📋 Requiere récipe',
    img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&h=300&q=80',
    discount: '-20% con póliza',
    spec: 'Oclacitinib · 16mg x20',
    price: 36.00
  };

  const handleSimulateUpload = () => {
    setIsScanning(true);
    setScannedData(null);

    setTimeout(() => {
      const vet = VET_DOCTORS[Math.floor(Math.random() * VET_DOCTORS.length)];
      const today = new Date().toLocaleDateString('es-VE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      setScannedData({
        vetName: vet.name,
        mpps: vet.mpps,
        clinic: vet.clinic,
        detectedMed: currentMed.name,
        detectedDose: currentMed.spec,
        date: today,
        matchScore: '99.4% Coincidencia'
      });
      setIsScanning(false);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[90] flex items-center justify-center p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAFAF7] dark:bg-[#0D1F16] rounded-[2rem] border-2 border-[#152018] max-w-md w-full p-6 sm:p-7 shadow-sticker relative text-[#152018] dark:text-[#FAFAF7]"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-[var(--c-cielo)] text-white border-2 border-[#152018] flex items-center justify-center shrink-0 shadow-sticker-sm">
              <Camera className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">
                Subir Récipe Médica
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Verificación inteligente para {pet.name} ({pet.kind})
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

        {/* Instructions */}
        <p className="text-xs text-[#152018]/70 dark:text-[#FAFAF7]/70 mb-4 leading-relaxed">
          Para despachar <strong className="text-[#152018] dark:text-white">{currentMed.name}</strong>, adjunta una foto clara del récipe expedido por tu médico veterinario con sello y MPPS legible.
        </p>

        {/* Upload Box / Trigger */}
        {!scannedData && !isScanning && (
          <div
            onClick={handleSimulateUpload}
            className="border-2 border-dashed border-[var(--c-cielo)] rounded-2xl py-8 px-4 text-center cursor-pointer hover:bg-[var(--c-cielo-light)]/40 dark:hover:bg-[#0090C1]/10 transition-colors group"
          >
            <Camera className="w-8 h-8 text-[var(--c-cielo)] mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-bold text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)]">
              Toca para tomar foto o seleccionar archivo
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              JPG, PNG o PDF · Máx 10 MB
            </p>
          </div>
        )}

        {/* Scanning Loading State */}
        {isScanning && (
          <div className="bg-[var(--c-cielo-light)] dark:bg-[#132A1E] rounded-2xl p-8 text-center border border-[var(--c-cielo)]/30 space-y-3">
            <Loader2 className="w-8 h-8 text-[var(--c-cielo)] mx-auto animate-spin" />
            <p className="text-xs font-bold font-mono">Analizando récipe con IA y OCR...</p>
            <p className="text-[10px] text-muted-foreground">Extrayendo MPPS, principio activo y dosificación...</p>
          </div>
        )}

        {/* Scanned Verification Result */}
        {scannedData && (
          <div className="bg-[var(--c-loro-light)] dark:bg-[#132A1E] border-2 border-[var(--c-loro)]/40 rounded-2xl p-4 space-y-2.5 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between border-b border-[var(--c-loro)]/20 pb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--c-loro-dark)] dark:text-[var(--c-loro)]">
                <Sparkles className="w-3.5 h-3.5" /> Lectura Exitosa
              </span>
              <span className="text-[10px] font-mono font-bold bg-white/80 dark:bg-black/40 px-2 py-0.5 rounded-full text-[var(--c-loro-dark)] dark:text-[var(--c-loro)]">
                {scannedData.matchScore}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
              <span className="text-muted-foreground text-[11px]">Veterinario:</span>
              <span className="font-bold text-right truncate">{scannedData.vetName}</span>

              <span className="text-muted-foreground text-[11px]">Matrícula MPPS:</span>
              <span className="font-mono text-right font-semibold">{scannedData.mpps}</span>

              <span className="text-muted-foreground text-[11px]">Medicamento:</span>
              <span className="font-bold text-right truncate text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)]">
                {scannedData.detectedMed}
              </span>

              <span className="text-muted-foreground text-[11px]">Dosis indicada:</span>
              <span className="font-mono text-right font-semibold">{scannedData.detectedDose}</span>
            </div>

            <div className="pt-2 border-t border-[var(--c-loro)]/20 flex items-center gap-2 text-[11px] text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Dosis compatible con el perfil de {pet.name} ({pet.weight}).</span>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex gap-2 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-full text-xs font-bold border-2 border-[#152018]/20 hover:bg-black/5"
          >
            Cancelar
          </button>
          
          <button
            type="button"
            disabled={!scannedData}
            onClick={() => {
              if (scannedData) {
                onConfirmUpload(currentMed);
                onClose();
              }
            }}
            className={`flex-1 btn-pop py-3 rounded-full text-xs font-bold border-2 border-[#152018] shadow-sticker-sm flex items-center justify-center gap-1.5 ${
              scannedData
                ? 'bg-[var(--c-loro)] text-white hover:bg-[var(--c-loro-dark)]'
                : 'bg-black/10 text-muted-foreground opacity-50 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> Agregar al carrito
          </button>
        </div>

        <p className="text-[10px] text-muted-foreground text-center mt-3">
          *En producción, el farmacéutico del comercio aliado corrobora la receta físicamente antes de sellar el paquete.
        </p>

      </div>
    </div>
  );
};
