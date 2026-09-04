import React from 'react';
import { X, ShieldAlert } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'terminos' | 'privacidad' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const isTerms = type === 'terminos';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[90] flex items-center justify-center p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAFAF7] dark:bg-[#0D1F16] rounded-[2rem] border-2 border-[#152018] max-w-md w-full p-6 sm:p-7 shadow-sticker relative text-[#152018] dark:text-[#FAFAF7]"
      >
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[var(--c-loro)]" />
            <h3 className="font-display font-bold text-lg">
              {isTerms ? 'Términos y Condiciones' : 'Política de Privacidad'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs text-[#152018]/80 dark:text-[#FAFAF7]/80 leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {isTerms ? (
            <>
              <p>
                <strong>1. Naturaleza del Servicio:</strong> Firulais es una plataforma tecnológica de marketplace hiperlocal. No operamos como farmacia ni aseguradora directa.
              </p>
              <p>
                <strong>2. Despacho de Medicamentos:</strong> Todo medicamento que requiera récipe médica es validado y expedido directamente por farmacias y pet shops veterinarias debidamente registradas y con regente sanitario en Venezuela.
              </p>
              <p>
                <strong>3. Pólizas de Seguro:</strong> La cobertura, términos de indemnización y exclusiones son emitidas formalmente por las compañías aseguradoras (Seguros Venezuela, Appa, Seguros Universitas, Hispana de Seguros). Firulais actúa exclusivamente como canal de cotización y facilitación.
              </p>
              <p>
                <strong>4. Servicio Taxi Pet:</strong> Los traslados se realizan en unidades vehiculares acondicionadas con sujeción y medidas de bioseguridad. El tutor es responsable de informar cualquier comportamiento agresivo previo.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Protección de Datos:</strong> Los datos personales y récipes médicas suministrados se utilizan exclusivamente para procesar tu orden, validar la prescripción con el comercio aliado y coordinar la entrega o póliza.
              </p>
              <p>
                <strong>2. Sin Almacenamiento Bancario:</strong> No almacenamos números de tarjetas de crédito ni credenciales bancarias. Todas las transferencias se realizan vía Pago Móvil, Zelle o efectivo directo.
              </p>
              <p>
                <strong>3. Confidencialidad Médica:</strong> Las fotos de recetas veterinarias no son públicas y son eliminadas una vez despachado el pedido.
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="btn-pop w-full mt-5 py-3 bg-[var(--c-loro)] text-white font-bold text-xs rounded-full border-2 border-[#152018] shadow-sticker-sm"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};
