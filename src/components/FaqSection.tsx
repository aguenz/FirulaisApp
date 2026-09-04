import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Search } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [activeFaqCat, setActiveFaqCat] = useState<'todos' | 'farmacia' | 'seguros' | 'taxipet' | 'general'>('todos');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return FAQ_ITEMS.filter((item) => {
      const matchCat = activeFaqCat === 'todos' || item.cat === activeFaqCat;
      const matchSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeFaqCat, searchQuery]);

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="font-hand text-3xl text-[var(--c-sol)] rotate-[-2deg] inline-block font-bold">
          ¿Tienes alguna duda?
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#152018] dark:text-[#FAFAF7] mt-1">
          Preguntas Frecuentes
        </h2>
        <p className="text-sm text-[#152018]/65 dark:text-[#FAFAF7]/65 mt-3">
          Todo sobre compras de farmacia, validación de récipes, seguros y Taxi Pet en Caracas explicado con honestidad.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar pregunta o tema..."
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] rounded-full text-xs font-semibold border-2 border-[#152018]/15 focus:border-[var(--c-loro)] focus:outline-none shadow-sm"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 text-xs font-bold mb-8 justify-center">
        <button
          onClick={() => setActiveFaqCat('todos')}
          className={`btn-pop px-4 py-1.5 rounded-full border-2 border-[#152018] transition-all ${
            activeFaqCat === 'todos'
              ? 'bg-[var(--c-loro)] text-white shadow-sticker-sm'
              : 'bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] opacity-60'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setActiveFaqCat('farmacia')}
          className={`btn-pop px-4 py-1.5 rounded-full border-2 border-[#152018] transition-all ${
            activeFaqCat === 'farmacia'
              ? 'bg-[var(--c-loro)] text-white shadow-sticker-sm'
              : 'bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] opacity-60'
          }`}
        >
          🛡️ Farmacia
        </button>
        <button
          onClick={() => setActiveFaqCat('seguros')}
          className={`btn-pop px-4 py-1.5 rounded-full border-2 border-[#152018] transition-all ${
            activeFaqCat === 'seguros'
              ? 'bg-[var(--c-cielo)] text-white shadow-sticker-sm'
              : 'bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] opacity-60'
          }`}
        >
          📋 Seguros
        </button>
        <button
          onClick={() => setActiveFaqCat('taxipet')}
          className={`btn-pop px-4 py-1.5 rounded-full border-2 border-[#152018] transition-all ${
            activeFaqCat === 'taxipet'
              ? 'bg-[var(--c-mango)] text-white shadow-sticker-sm'
              : 'bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] opacity-60'
          }`}
        >
          🚐 Taxi Pet
        </button>
        <button
          onClick={() => setActiveFaqCat('general')}
          className={`btn-pop px-4 py-1.5 rounded-full border-2 border-[#152018] transition-all ${
            activeFaqCat === 'general'
              ? 'bg-[var(--c-sol)] text-[#152018] shadow-sticker-sm'
              : 'bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] opacity-60'
          }`}
        >
          🐾 General
        </button>
      </div>

      {/* Accordion list */}
      <div className="space-y-3.5">
        {filteredFaqs.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className="bg-white dark:bg-[#132A1E] rounded-2xl border-2 border-[#152018]/10 dark:border-white/10 p-5 shadow-sm transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                className="w-full flex items-center justify-between gap-4 text-left font-display font-bold text-sm sm:text-base text-[#152018] dark:text-[#FAFAF7]"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform ${
                    isOpen ? 'rotate-180 text-[var(--c-loro)]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <p className="text-xs sm:text-sm text-[#152018]/75 dark:text-[#FAFAF7]/75 mt-3 pt-3 border-t border-[#152018]/10 dark:border-white/10 leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 text-sm text-[#152018]/50 dark:text-[#FAFAF7]/50">
            No hay preguntas que coincidan con la búsqueda.
          </div>
        )}
      </div>

      {/* Direct Contact Banner */}
      <div className="mt-12 text-center p-8 rounded-[2rem] bg-[var(--c-loro-light)] dark:bg-[#132A1E] border-2 border-[#152018] shadow-sticker">
        <HelpCircle className="w-8 h-8 text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] mx-auto mb-2" />
        <h3 className="font-display font-bold text-xl text-[#152018] dark:text-[#FAFAF7]">
          ¿Tienes una pregunta específica?
        </h3>
        <p className="text-xs text-[#152018]/70 dark:text-[#FAFAF7]/70 mt-1 max-w-md mx-auto">
          Escríbenos directamente por WhatsApp. Respondemos personas reales de nuestro equipo veterinario en minutos.
        </p>
        <a
          href="https://wa.me/584120000000?text=Hola%20Firulais%20%F0%9F%90%BE%2C%20tengo%20una%20pregunta%20sobre..."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pop mt-4 inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold text-xs rounded-full border-2 border-[#152018] shadow-sticker-sm"
        >
          <MessageCircle className="w-4 h-4" /> Hablar por WhatsApp
        </a>
      </div>

    </section>
  );
};
