import React from 'react';
import { BadgeCheck, FileHeart, Lock, MessageCircle, Heart } from 'lucide-react';

export const NosotrosSection: React.FC = () => {
  return (
    <section id="nosotros" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="font-hand text-3xl text-[var(--c-sol)] rotate-[-2deg] inline-block font-bold">
          quiénes somos
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#152018] dark:text-[#FAFAF7] mt-1">
          Somos nuevos, pero no improvisamos.
        </h2>
        <p className="text-sm sm:text-base text-[#152018]/70 dark:text-[#FAFAF7]/70 mt-4 leading-relaxed">
          Firulais recién empieza en Caracas. En lugar de inventar reseñas o fingir una historia de 20 años que no tenemos, te contamos con total honestidad cómo operamos y por qué existimos.
        </p>
      </div>

      {/* Story Narrative */}
      <div className="bg-white dark:bg-[#132A1E] rounded-[2.25rem] border-2 border-[#152018] shadow-sticker p-6 sm:p-10 mb-12 space-y-4 text-sm text-[#152018]/80 dark:text-[#FAFAF7]/80 leading-relaxed">
        <h3 className="font-display font-bold text-2xl text-[#152018] dark:text-[#FAFAF7] flex items-center gap-2">
          <Heart className="w-6 h-6 text-[var(--c-sol)] fill-current" /> Cómo nació Firulais
        </h3>
        
        <p>
          En Venezuela existen muchas tiendas de mascotas en línea, pero ninguna resolvía de raíz los tres dolores de cabeza reales de tener un perro o un gato en Caracas:
        </p>

        <ul className="grid sm:grid-cols-3 gap-3 my-4 list-none p-0">
          <li className="p-3.5 rounded-2xl bg-[var(--c-loro-light)] dark:bg-[#0D1F16] border border-[#152018]/10 text-xs font-semibold">
            <strong className="block text-sm text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] mb-1">1. Medicina urgente</strong>
            Conseguir medicamentos específicos sin tener que recorrer tres farmacias distintas.
          </li>
          <li className="p-3.5 rounded-2xl bg-[var(--c-cielo-light)] dark:bg-[#0D1F16] border border-[#152018]/10 text-xs font-semibold">
            <strong className="block text-sm text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)] mb-1">2. Seguros claros</strong>
            Entender qué cubre de verdad una póliza en clínicas caraqueñas.
          </li>
          <li className="p-3.5 rounded-2xl bg-[var(--c-mango-light)] dark:bg-[#0D1F16] border border-[#152018]/10 text-xs font-semibold">
            <strong className="block text-sm text-[var(--c-mango-dark)] dark:text-[var(--c-mango)] mb-1">3. Traslados seguros</strong>
            Mover a una mascota enferma o grande cuando los taxis convencionales la rechazan.
          </li>
        </ul>

        <p>
          No acumulamos inventario propio que se venza en un galpón: somos un <strong>marketplace hiperlocal tecnológico</strong>. Conectamos la necesidad de tu mascota con la red de Pet Shops, farmacias veterinarias y aseguradoras reguladas más cercanas a tu ubicación en Caracas.
        </p>
      </div>

      {/* 4 Pillars of Operation */}
      <h3 className="font-display font-bold text-2xl text-center mb-8 text-[#152018] dark:text-[#FAFAF7]">
        Nuestros 4 compromisos de confianza
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-[#132A1E] border-2 border-[#152018]/15 dark:border-white/15 rounded-2xl p-5 shadow-sm">
          <BadgeCheck className="w-6 h-6 text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] mb-3" />
          <p className="font-display font-bold text-sm text-[#152018] dark:text-[#FAFAF7] mb-1">
            Aliados con licencia sanitaria
          </p>
          <p className="text-xs text-[#152018]/60 dark:text-[#FAFAF7]/60 leading-relaxed">
            Cada farmacia y pet shop de nuestra red opera con permisos sanitarios vigentes en Venezuela.
          </p>
        </div>

        <div className="bg-white dark:bg-[#132A1E] border-2 border-[#152018]/15 dark:border-white/15 rounded-2xl p-5 shadow-sm">
          <FileHeart className="w-6 h-6 text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)] mb-3" />
          <p className="font-display font-bold text-sm text-[#152018] dark:text-[#FAFAF7] mb-1">
            Récipe médica validada
          </p>
          <p className="text-xs text-[#152018]/60 dark:text-[#FAFAF7]/60 leading-relaxed">
            La IA realiza la primera lectura, pero un profesional veterinario confirma cada prescripción antes del despacho.
          </p>
        </div>

        <div className="bg-white dark:bg-[#132A1E] border-2 border-[#152018]/15 dark:border-white/15 rounded-2xl p-5 shadow-sm">
          <Lock className="w-6 h-6 text-[var(--c-mango-dark)] dark:text-[var(--c-mango)] mb-3" />
          <p className="font-display font-bold text-sm text-[#152018] dark:text-[#FAFAF7] mb-1">
            Pagos venezolanos reales
          </p>
          <p className="text-xs text-[#152018]/60 dark:text-[#FAFAF7]/60 leading-relaxed">
            Pago Móvil, Zelle o efectivo contra entrega. Sin guardar datos bancarios ni cobrar cargos ocultos.
          </p>
        </div>

        <div className="bg-white dark:bg-[#132A1E] border-2 border-[#152018]/15 dark:border-white/15 rounded-2xl p-5 shadow-sm">
          <MessageCircle className="w-6 h-6 text-[var(--c-sol)] mb-3" />
          <p className="font-display font-bold text-sm text-[#152018] dark:text-[#FAFAF7] mb-1">
            Atención humana directa
          </p>
          <p className="text-xs text-[#152018]/60 dark:text-[#FAFAF7]/60 leading-relaxed">
            Cada pedido o consulta se confirma por WhatsApp con una persona real de nuestro equipo.
          </p>
        </div>

      </div>

    </section>
  );
};
