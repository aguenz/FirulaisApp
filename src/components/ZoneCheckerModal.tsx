import React, { useState } from 'react';
import { X, MapPin, CheckCircle2, Truck, CarFront, Search } from 'lucide-react';
import { CARACAS_ZONES } from '../data/mockData';

interface ZoneCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZoneCheckerModal: React.FC<ZoneCheckerModalProps> = ({ isOpen, onClose }) => {
  const [zoneInput, setZoneInput] = useState<string>('Caracas');

  if (!isOpen) return null;

  const matchedZone = CARACAS_ZONES.find((z) =>
    z.name.toLowerCase().includes(zoneInput.toLowerCase()) ||
    z.municipio.toLowerCase().includes(zoneInput.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[90] flex items-center justify-center p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAFAF7] dark:bg-[#0D1F16] rounded-[2rem] border-2 border-[#152018] max-w-md w-full p-6 sm:p-7 shadow-sticker relative text-[#152018] dark:text-[#FAFAF7]"
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-[var(--c-cielo)] text-white border-2 border-[#152018] flex items-center justify-center shrink-0 shadow-sticker-sm">
              <MapPin className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">
                Cobertura & Disponibilidad
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Servicio activo en toda la Gran Caracas y Altos Mirandinos
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

        <div className="space-y-4">
          <div>
            <label htmlFor="custom-zone-input" className="block text-xs font-bold mb-1.5">
              Ingresa tu urbanización, municipio o sector:
            </label>
            <div className="relative">
              <input
                id="custom-zone-input"
                type="text"
                value={zoneInput}
                onChange={(e) => setZoneInput(e.target.value)}
                placeholder="Ej. El Hatillo, Guatire, Chacao, San Antonio, Candelaria..."
                className="w-full pl-9 pr-3.5 py-3 bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] rounded-xl text-xs font-bold border-2 border-[#152018]/20 focus:border-[var(--c-cielo)] focus:outline-none"
              />
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Quick Suggestions Pills */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {['Chacao', 'Baruta', 'El Hatillo', 'Sucre', 'Libertador', 'Altos Mirandinos', 'Guarenas / Guatire'].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setZoneInput(name)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition ${
                  zoneInput.toLowerCase().includes(name.toLowerCase())
                    ? 'bg-[var(--c-loro)] text-[#152018] border-[#152018]'
                    : 'bg-black/5 dark:bg-white/5 border-[#152018]/10 hover:border-[#152018]/30'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Results Box */}
          <div className="bg-[var(--c-cielo-light)] dark:bg-[#132A1E] rounded-2xl border-2 border-[var(--c-cielo)]/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--c-loro)]" /> Cobertura Activa
              </span>
              <span className="text-[10px] font-mono font-bold bg-white dark:bg-black/40 px-2 py-0.5 rounded-full">
                {zoneInput || 'Tu zona'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="bg-white dark:bg-[#0D1F16] p-2.5 rounded-xl border border-[#152018]/10">
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-semibold">
                  <Truck className="w-3.5 h-3.5 text-[var(--c-loro)]" />
                  <span>Farmacia Express</span>
                </div>
                <p className="font-bold text-sm mt-0.5">
                  ~{matchedZone ? matchedZone.avgDeliveryMin : 30} - {matchedZone ? matchedZone.avgDeliveryMin + 15 : 45} min
                </p>
              </div>

              <div className="bg-white dark:bg-[#0D1F16] p-2.5 rounded-xl border border-[#152018]/10">
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-semibold">
                  <CarFront className="w-3.5 h-3.5 text-[var(--c-mango)]" />
                  <span>Taxi Pet</span>
                </div>
                <p className="font-bold text-sm mt-0.5">
                  Disponible con reserva
                </p>
              </div>
            </div>

            <p className="text-[11px] text-[#152018]/70 dark:text-[#FAFAF7]/70 leading-relaxed">
              Contamos con aliados veterinarios, farmacias autorizadas y unidades de traslado para cubrir <strong>{zoneInput || 'tu localidad'}</strong> sin restricciones.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-pop w-full py-3 bg-[var(--c-cielo)] text-white font-bold text-xs rounded-full border-2 border-[#152018] shadow-sticker-sm"
          >
            Guardar y continuar
          </button>
        </div>

      </div>
    </div>
  );
};
