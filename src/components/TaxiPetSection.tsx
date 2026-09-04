import React, { useState, useMemo } from 'react';
import {
  CarFront,
  Clock,
  Send,
  ShieldCheck,
  Heart,
  Sparkles,
  MapPin,
  Calendar,
  Zap
} from 'lucide-react';
import { PetProfile } from '../types';
import { CARACAS_ZONES, TAXI_NEEDS, BCV_EXCHANGE_RATE } from '../data/mockData';

interface TaxiPetSectionProps {
  pet: PetProfile;
  onSwitchKind: (kind: 'perro' | 'gato') => void;
}

export const TaxiPetSection: React.FC<TaxiPetSectionProps> = ({ pet }) => {
  const [pickupZoneId, setPickupZoneId] = useState<string>('chacao');
  const [dropoffZoneId, setDropoffZoneId] = useState<string>('las-mercedes');
  const [isAsap, setIsAsap] = useState<boolean>(true);
  const [scheduledDate, setScheduledDate] = useState<string>('2026-08-31');
  const [scheduledTime, setScheduledTime] = useState<string>('10:00');
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(['acompanante']);
  const [tutorNotes, setTutorNotes] = useState<string>('');

  const isDog = pet.kind === 'perro';

  // Calculate fare and duration
  const quote = useMemo(() => {
    const pickup = CARACAS_ZONES.find((z) => z.id === pickupZoneId) || CARACAS_ZONES[0];
    const dropoff = CARACAS_ZONES.find((z) => z.id === dropoffZoneId) || CARACAS_ZONES[1];

    let base = Math.max(pickup.baseFareUSD, dropoff.baseFareUSD);
    if (pickup.id !== dropoff.id) {
      base += 3.5;
    }

    const needsAddon = selectedNeeds.reduce((sum, needId) => {
      const opt = TAXI_NEEDS.find((n) => n.id === needId);
      return sum + (opt ? opt.priceAddonUSD : 0);
    }, 0);

    const totalUSD = base + needsAddon;
    const totalVES = (totalUSD * BCV_EXCHANGE_RATE).toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    const estimatedMinutes = Math.round((pickup.avgDeliveryMin + dropoff.avgDeliveryMin) / 2) + 10;

    return {
      pickupName: pickup.name,
      dropoffName: dropoff.name,
      totalUSD: totalUSD.toFixed(2),
      totalVES,
      estimatedMinutes
    };
  }, [pickupZoneId, dropoffZoneId, selectedNeeds]);

  const toggleNeed = (needId: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(needId) ? prev.filter((id) => id !== needId) : [...prev, needId]
    );
  };

  const handleRequestTaxi = (e: React.FormEvent) => {
    e.preventDefault();
    const needsLabels = selectedNeeds
      .map((id) => TAXI_NEEDS.find((n) => n.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const timeStr = isAsap ? '⚡ Lo antes posible (<30 min)' : `📅 Programado para el ${scheduledDate} a las ${scheduledTime}`;

    const text = `Hola Firulais 🐾, quiero solicitar un Taxi Pet para ${pet.name} (${isDog ? 'Perro' : 'Gato'}):
• Recogida: ${quote.pickupName}
• Destino: ${quote.dropoffName}
• Horario: ${timeStr}
• Requerimientos: ${needsLabels || 'Ninguno'}
• Notas del tutor: ${tutorNotes || 'Sin notas especiales'}
• Tarifa estimada: $${quote.totalUSD} USD (~${quote.totalVES} VES)`;

    window.open(`https://wa.me/584120000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="taxipet" className="bg-[var(--c-mango-light)]/45 dark:bg-[#0D1F16] border-b-2 border-[#152018]/10 dark:border-white/10 py-16 sm:py-24 relative overflow-hidden transition-colors">
      
      {/* Background decoration */}
      <div className="absolute w-96 h-96 bg-[var(--c-mango)]/20 rounded-full blur-3xl -top-16 -right-16 pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Context & Safety highlights */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#152018] text-[var(--c-mango)] font-mono text-xs font-bold rotate-[-1deg] shadow-sticker-sm">
              <CarFront className="w-3.5 h-3.5" /> TAXI PET ESPECIALIZADO EN CARACAS
            </span>

            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08] text-[#152018] dark:text-[#FAFAF7]">
              {pet.name} no viaja en{' '}
              <span className="relative inline-block text-[var(--c-mango)] pb-1 sm:pb-1.5">
                cualquier taxi.
                {/* Hand-drawn organic underline */}
                <svg
                  className="absolute -bottom-1 sm:-bottom-2 -left-1 w-[105%] h-2.5 sm:h-3.5 text-[var(--c-loro)] pointer-events-none overflow-visible -rotate-1 origin-left"
                  viewBox="0 0 200 14"
                  fill="none"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 3 9.5 C 45 4.5, 120 3.5, 196 6.5"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 18 11.5 C 70 9, 140 8, 185 10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </svg>
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#152018]/70 dark:text-[#FAFAF7]/70 leading-relaxed max-w-xl">
              Carros limpios y preparados para llevar a tu mascota cómodo y seguro: asientos protegidos, cinturón para perros, espacio para su jaula y conductores que aman a los animales y manejan con cuidado.
            </p>

            {/* Active pet tag */}
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-[#132A1E] rounded-2xl px-4 py-3 border-2 border-[#152018]/10 shadow-sticker-sm">
              <span className="text-2xl">{isDog ? '🐶' : '🐱'}</span>
              <div>
                <span className="text-xs font-bold text-[#152018] dark:text-[#FAFAF7] block">
                  Viaje adaptado para {pet.name} ({pet.weight})
                </span>
                <span className="text-[10px] text-[#152018]/50 dark:text-white/50">
                  {isDog ? 'Equipado con cinturón de seguridad para perro' : 'Espacio asegurado para su jaula transportadora'}
                </span>
              </div>
            </div>

            {/* Safety cards */}
            <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
              <div className="bg-white dark:bg-[#132A1E] rounded-2xl p-4 border-2 border-[#152018]/10 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[var(--c-mango)] mb-2" />
                <p className="font-bold text-sm text-[#152018] dark:text-[#FAFAF7]">
                  Conductores Pet Friendly
                </p>
                <p className="text-xs text-[#152018]/60 dark:text-[#FAFAF7]/60 mt-1">
                  Puntuales, pacientes y comprometidos con un viaje suave y sin apuros.
                </p>
              </div>

              <div className="bg-white dark:bg-[#132A1E] rounded-2xl p-4 border-2 border-[#152018]/10 shadow-sm">
                <Heart className="w-5 h-5 text-[var(--c-mango)] mb-2" />
                <p className="font-bold text-sm text-[#152018] dark:text-[#FAFAF7]">
                  Vehículos limpios y desinfectados
                </p>
                <p className="text-xs text-[#152018]/60 dark:text-[#FAFAF7]/60 mt-1">
                  Protección en asientos y limpieza adecuada después de cada recorrido.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Calculator Card */}
          <div className="lg:col-span-6 bg-white dark:bg-[#132A1E] p-6 sm:p-8 rounded-[2.25rem] border-2 border-[#152018] shadow-sticker space-y-5 transition-colors">
            
            <div className="flex items-center justify-between gap-4 border-b-2 border-[#152018]/10 dark:border-white/10 pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-mango-dark)] dark:text-[var(--c-mango)] font-bold">
                  COTIZADOR EN VIVO
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#152018] dark:text-[#FAFAF7]">
                  ¿A dónde llevamos a {pet.name}?
                </h3>
              </div>
              <span className="text-3xl">{isDog ? '🐶' : '🐱'}</span>
            </div>

            <form onSubmit={handleRequestTaxi} className="space-y-4">
              
              {/* Pickup & Dropoff selectors */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="pickup-zone" className="block text-xs font-bold text-[#152018]/70 dark:text-white/70 mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[var(--c-loro)]" /> Punto de recogida
                  </label>
                  <select
                    id="pickup-zone"
                    value={pickupZoneId}
                    onChange={(e) => setPickupZoneId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF7] dark:bg-[#0D1F16] text-[#152018] dark:text-[#FAFAF7] rounded-xl text-xs font-bold border-2 border-[#152018]/15 focus:border-[var(--c-mango)] focus:outline-none"
                  >
                    {CARACAS_ZONES.map((z) => (
                      <option key={`p-${z.id}`} value={z.id}>
                        {z.name} ({z.municipio})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="dropoff-zone" className="block text-xs font-bold text-[#152018]/70 dark:text-white/70 mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[var(--c-mango)]" /> Destino / Clínica
                  </label>
                  <select
                    id="dropoff-zone"
                    value={dropoffZoneId}
                    onChange={(e) => setDropoffZoneId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF7] dark:bg-[#0D1F16] text-[#152018] dark:text-[#FAFAF7] rounded-xl text-xs font-bold border-2 border-[#152018]/15 focus:border-[var(--c-mango)] focus:outline-none"
                  >
                    {CARACAS_ZONES.map((z) => (
                      <option key={`d-${z.id}`} value={z.id}>
                        {z.name} ({z.municipio})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Schedule Mode */}
              <div>
                <label className="block text-xs font-bold text-[#152018]/70 dark:text-white/70 mb-1.5">
                  ¿Cuándo lo necesitas?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAsap(true)}
                    className={`btn-pop py-2.5 px-3 rounded-xl border-2 border-[#152018] text-xs font-bold flex items-center justify-center gap-1.5 ${
                      isAsap
                        ? 'bg-[var(--c-mango)] text-white shadow-sticker-sm'
                        : 'bg-[#FAFAF7] dark:bg-[#0D1F16] text-[#152018] dark:text-[#FAFAF7] opacity-60'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" /> Lo antes posible (&lt;30m)
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAsap(false)}
                    className={`btn-pop py-2.5 px-3 rounded-xl border-2 border-[#152018] text-xs font-bold flex items-center justify-center gap-1.5 ${
                      !isAsap
                        ? 'bg-[var(--c-mango)] text-white shadow-sticker-sm'
                        : 'bg-[#FAFAF7] dark:bg-[#0D1F16] text-[#152018] dark:text-[#FAFAF7] opacity-60'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" /> Programar fecha
                  </button>
                </div>

                {!isAsap && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAFAF7] dark:bg-[#0D1F16] text-[#152018] dark:text-[#FAFAF7] rounded-xl text-xs font-semibold border-2 border-[#152018]/15"
                    />
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAFAF7] dark:bg-[#0D1F16] text-[#152018] dark:text-[#FAFAF7] rounded-xl text-xs font-semibold border-2 border-[#152018]/15"
                    />
                  </div>
                )}
              </div>

              {/* Special needs checkboxes */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#152018]/70 dark:text-white/70 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--c-mango)]" /> Comodidades del viaje
                  </label>
                  <span className="text-[10px] font-bold text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] bg-[var(--c-loro)]/10 px-2 py-0.5 rounded-full">
                    Incluidas sin costo extra
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TAXI_NEEDS.filter((n) => n.forPet === 'ambos' || n.forPet === pet.kind).map((need) => {
                    const isChecked = selectedNeeds.includes(need.id);
                    return (
                      <label
                        key={need.id}
                        className={`flex items-start gap-2 p-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                          isChecked
                            ? 'border-[var(--c-mango)] bg-[var(--c-mango-light)]/40 dark:bg-[var(--c-mango)]/20'
                            : 'border-[#152018]/10 bg-[#FAFAF7] dark:bg-[#0D1F16]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleNeed(need.id)}
                          className="mt-0.5 w-3.5 h-3.5 accent-[var(--c-mango)]"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-bold block leading-tight text-[#152018] dark:text-[#FAFAF7]">
                            {need.label}
                          </span>
                          <span className="text-[9px] text-[#152018]/60 dark:text-[#FAFAF7]/60 block leading-tight mt-0.5">
                            {need.description}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Tutor special notes */}
              <div>
                <label htmlFor="tutor-notes" className="block text-xs font-bold text-[#152018]/70 dark:text-white/70 mb-1">
                  Instrucciones o notas adicionales para el conductor
                </label>
                <input
                  id="tutor-notes"
                  type="text"
                  value={tutorNotes}
                  onChange={(e) => setTutorNotes(e.target.value)}
                  placeholder="Ej: Es un poco nervioso con autos ruidosos, avisar al llegar..."
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF7] dark:bg-[#0D1F16] text-[#152018] dark:text-[#FAFAF7] rounded-xl text-xs border-2 border-[#152018]/15 focus:border-[var(--c-mango)] focus:outline-none"
                />
              </div>

              {/* Live Fare Calculation Box */}
              <div className="bg-[var(--c-mango-light)] dark:bg-[#0D1F16] rounded-2xl border-2 border-[#152018] p-4 flex items-center justify-between shadow-sticker-sm">
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-[#152018]/70 dark:text-white/70 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[var(--c-mango)]" />
                    <span>Tiempo estimado</span>
                  </div>
                  <p className="font-display font-bold text-lg text-[#152018] dark:text-[#FAFAF7]">
                    ~{quote.estimatedMinutes} min
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#152018]/70 dark:text-white/70 font-semibold block">
                    Tarifa estimada
                  </span>
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="font-display font-bold text-2xl text-[var(--c-mango-dark)] dark:text-[var(--c-mango)]">
                      ${quote.totalUSD}
                    </span>
                    <span className="text-xs font-mono text-[#152018]/60 dark:text-white/60">
                      (~{quote.totalVES} VES)
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-pop w-full py-3.5 bg-[var(--c-mango)] text-white font-bold text-sm rounded-full border-2 border-[#152018] shadow-sticker-sm flex items-center justify-center gap-2 hover:bg-[var(--c-mango-dark)]"
              >
                <Send className="w-4 h-4" />
                <span>Solicitar Taxi Pet por WhatsApp</span>
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
