import React, { useState, useMemo } from 'react';
import { Search, X, Pill, Shield, CarFront, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS, INSURANCE_PLANS, TAXI_NEEDS, CARACAS_ZONES } from '../data/mockData';
import { PetProfile, ResolvedProduct, ProductWeightVariant } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  pet: PetProfile;
  onClose: () => void;
  onSelectProduct: (product: ResolvedProduct) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  pet,
  onClose,
  onSelectProduct,
  onNavigateSection
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'farmacia' | 'seguros' | 'taxipet'>('all');

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        products: PRODUCTS.slice(0, 4),
        insurance: INSURANCE_PLANS.slice(0, 2),
        taxi: TAXI_NEEDS.slice(0, 2)
      };
    }

    const products = PRODUCTS.filter(
      (p) =>
        (activeFilter === 'all' || activeFilter === 'farmacia') &&
        (p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.activeIngredient.toLowerCase().includes(q) ||
          p.cat.toLowerCase().includes(q))
    );

    const insurance = INSURANCE_PLANS.filter(
      (i) =>
        (activeFilter === 'all' || activeFilter === 'seguros') &&
        (i.name.toLowerCase().includes(q) ||
          i.insurer.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q)) ||
          i.mainHighlight.toLowerCase().includes(q))
    );

    const taxi = TAXI_NEEDS.filter(
      (t) =>
        (activeFilter === 'all' || activeFilter === 'taxipet') &&
        (t.label.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    );

    return { products, insurance, taxi };
  }, [query, activeFilter]);

  if (!isOpen) return null;

  const totalMatches =
    filteredResults.products.length +
    filteredResults.insurance.length +
    filteredResults.taxi.length;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[90] flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAFAF7] dark:bg-[#0D1F16] rounded-[2rem] border-2 border-[#152018] dark:border-white/20 max-w-2xl w-full shadow-sticker overflow-hidden text-[#152018] dark:text-[#FAFAF7] animate-in fade-in zoom-in duration-200"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b-2 border-[#152018]/10 dark:border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar Bravecto, NexGard, seguro de accidentes, rampa taxi..."
            className="flex-1 bg-transparent border-none outline-none font-bold text-sm sm:text-base placeholder:text-[#152018]/40 dark:placeholder:text-[#FAFAF7]/40"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-xs text-muted-foreground"
            >
              Borrar
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Cerrar búsqueda"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-black/5 dark:bg-white/5 border-b border-[#152018]/10 dark:border-white/10 overflow-x-auto text-xs font-bold">
          <span className="text-[11px] text-muted-foreground shrink-0">Filtrar por:</span>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full transition-all shrink-0 ${
              activeFilter === 'all'
                ? 'bg-[var(--c-loro)] text-white shadow-sticker-sm'
                : 'bg-white dark:bg-[#132A1E] text-[#152018]/70 dark:text-white/70'
            }`}
          >
            Todo
          </button>
          <button
            onClick={() => setActiveFilter('farmacia')}
            className={`px-3 py-1 rounded-full transition-all shrink-0 flex items-center gap-1 ${
              activeFilter === 'farmacia'
                ? 'bg-[var(--c-loro)] text-white shadow-sticker-sm'
                : 'bg-white dark:bg-[#132A1E] text-[#152018]/70 dark:text-white/70'
            }`}
          >
            <Pill className="w-3 h-3" /> Farmacia ({filteredResults.products.length})
          </button>
          <button
            onClick={() => setActiveFilter('seguros')}
            className={`px-3 py-1 rounded-full transition-all shrink-0 flex items-center gap-1 ${
              activeFilter === 'seguros'
                ? 'bg-[var(--c-cielo)] text-white shadow-sticker-sm'
                : 'bg-white dark:bg-[#132A1E] text-[#152018]/70 dark:text-white/70'
            }`}
          >
            <Shield className="w-3 h-3" /> Seguros ({filteredResults.insurance.length})
          </button>
          <button
            onClick={() => setActiveFilter('taxipet')}
            className={`px-3 py-1 rounded-full transition-all shrink-0 flex items-center gap-1 ${
              activeFilter === 'taxipet'
                ? 'bg-[var(--c-mango)] text-white shadow-sticker-sm'
                : 'bg-white dark:bg-[#132A1E] text-[#152018]/70 dark:text-white/70'
            }`}
          >
            <CarFront className="w-3 h-3" /> Taxi Pet ({filteredResults.taxi.length})
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-5">
          {totalMatches === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-xs space-y-2">
              <Search className="w-8 h-8 mx-auto opacity-40" />
              <p className="font-bold text-sm">No encontramos resultados para "{query}"</p>
              <p>Prueba buscando "Bravecto", "Gastrointestinal", "Seguros Venezuela" o "Rampa".</p>
            </div>
          ) : (
            <>
              {/* Products section */}
              {filteredResults.products.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] flex items-center gap-1.5">
                      <Pill className="w-3.5 h-3.5" /> Medicamentos y Dietas Clínicas
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateSection('farmacia');
                      }}
                      className="text-[11px] font-bold underline hover:text-[var(--c-loro)]"
                    >
                      Ver todos
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {filteredResults.products.map((p) => {
                      const variants = p.weightVariants ? (Object.values(p.weightVariants) as ProductWeightVariant[]) : [];
                      const firstVariant = variants.length > 0 ? variants[0] : undefined;
                      const price = p.weightVariants
                        ? (p.weightVariants[pet.weight]?.price ?? firstVariant?.price ?? 30)
                        : (p.price ?? 25);
                      const spec = p.weightVariants
                        ? (p.weightVariants[pet.weight]?.label ?? firstVariant?.label ?? '')
                        : (p.spec ?? '');

                      return (
                        <div
                          key={p.id}
                          className="flex items-center gap-3 p-2.5 rounded-xl border border-[#152018]/10 dark:border-white/10 bg-white dark:bg-[#132A1E] hover:border-[var(--c-loro)] transition-colors group cursor-pointer"
                          onClick={() => {
                            onSelectProduct({
                              id: p.id,
                              name: p.name,
                              brand: p.brand,
                              activeIngredient: p.activeIngredient,
                              cat: p.cat,
                              pet: p.pet,
                              rx: p.rx,
                              tag: p.tag,
                              img: p.img,
                              discount: p.discount,
                              spec,
                              price
                            });
                            onClose();
                          }}
                        >
                          <img
                            src={p.img}
                            alt={p.name}
                            loading="lazy"
                            className="w-12 h-12 rounded-lg object-cover border border-[#152018]/10 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-xs truncate group-hover:text-[var(--c-loro-dark)] dark:group-hover:text-[var(--c-loro)]">
                              {p.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground truncate">{p.activeIngredient}</p>
                            <p className="text-xs font-mono font-bold mt-0.5 text-[#152018] dark:text-[#FAFAF7]">
                              ${price.toFixed(2)} USD
                            </p>
                          </div>
                          <span className="p-1.5 rounded-lg bg-[var(--c-loro-light)] text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] text-xs font-bold shrink-0">
                            + Agregar
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Insurance section */}
              {filteredResults.insurance.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)] flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" /> Pólizas y Planes de Asistencia
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateSection('seguros');
                      }}
                      className="text-[11px] font-bold underline hover:text-[var(--c-cielo)]"
                    >
                      Comparar todas
                    </button>
                  </div>
                  <div className="space-y-2">
                    {filteredResults.insurance.map((ins) => (
                      <div
                        key={ins.id}
                        onClick={() => {
                          onClose();
                          onNavigateSection('seguros');
                        }}
                        className="p-3 rounded-xl border border-[#152018]/10 dark:border-white/10 bg-white dark:bg-[#132A1E] hover:border-[var(--c-cielo)] transition-colors cursor-pointer flex items-center justify-between gap-3"
                      >
                        <div>
                          <p className="font-bold text-xs text-[#152018] dark:text-[#FAFAF7]">{ins.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {ins.insurer} · {ins.priceEstimate}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[var(--c-cielo-dark)] dark:text-[var(--c-cielo)] flex items-center gap-1">
                          Ver detalles <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Taxi Pet section */}
              {filteredResults.taxi.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--c-mango-dark)] dark:text-[var(--c-mango)] flex items-center gap-1.5">
                      <CarFront className="w-3.5 h-3.5" /> Servicios Taxi Pet
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateSection('taxipet');
                      }}
                      className="text-[11px] font-bold underline hover:text-[var(--c-mango)]"
                    >
                      Cotizar traslado
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {filteredResults.taxi.map((tx) => (
                      <div
                        key={tx.id}
                        onClick={() => {
                          onClose();
                          onNavigateSection('taxipet');
                        }}
                        className="p-2.5 rounded-xl border border-[#152018]/10 dark:border-white/10 bg-white dark:bg-[#132A1E] hover:border-[var(--c-mango)] transition-colors cursor-pointer"
                      >
                        <p className="font-bold text-xs text-[#152018] dark:text-[#FAFAF7]">{tx.label}</p>
                        <p className="text-[10px] text-muted-foreground line-clamp-1">{tx.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-black/5 dark:bg-white/5 border-t border-[#152018]/10 dark:border-white/10 px-5 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Pulsa sobre cualquier producto para agregarlo directamente al carrito.</span>
          <span className="font-mono text-[10px] font-bold">Esc para salir</span>
        </div>
      </div>
    </div>
  );
};
