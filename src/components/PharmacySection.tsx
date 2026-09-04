import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Pill,
  Search,
  Camera,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Plus
} from 'lucide-react';
import { Product, ProductCategory, PetProfile, ResolvedProduct } from '../types';
import { PRODUCTS, BCV_EXCHANGE_RATE } from '../data/mockData';
import { PetProfileBar } from './PetProfileBar';

interface PharmacySectionProps {
  pet: PetProfile;
  onUpdatePet: (updated: Partial<PetProfile>) => void;
  onSwitchKind: (kind: 'perro' | 'gato') => void;
  onAddToCart: (product: ResolvedProduct) => void;
  onOpenRxModal: (product?: ResolvedProduct) => void;
}

export const PharmacySection: React.FC<PharmacySectionProps> = ({
  pet,
  onUpdatePet,
  onSwitchKind,
  onAddToCart,
  onOpenRxModal
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const gridRef = useRef<HTMLDivElement>(null);

  // Listen for quick discovery triggers
  useEffect(() => {
    const handleQuickSearch = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail !== undefined) {
        setSearchQuery(customEvent.detail);
        setActiveCategory('todos');
      }
    };

    const handleSelectCategory = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActiveCategory(customEvent.detail as ProductCategory);
      }
    };

    window.addEventListener('firulais-quick-search', handleQuickSearch);
    window.addEventListener('firulais-select-category', handleSelectCategory);

    return () => {
      window.removeEventListener('firulais-quick-search', handleQuickSearch);
      window.removeEventListener('firulais-select-category', handleSelectCategory);
    };
  }, []);

  // Helper to resolve variant specifications and prices based on current pet weight and age
  const resolveProduct = (p: Product): ResolvedProduct | null => {
    const ageGroups = p.ageGroups || ['cachorro', 'adulto', 'senior'];
    if (!ageGroups.includes(pet.age)) {
      return null;
    }

    let spec = p.spec || 'Dosis estándar';
    let price = p.price || 20.0;

    if (p.weightVariants) {
      const variant = p.weightVariants[pet.weight];
      if (!variant) return null;
      spec = variant.label;
      price = variant.price;
    }

    return {
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
      price,
      subscribed: false
    };
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PRODUCTS.map(resolveProduct)
      .filter((p): p is ResolvedProduct => p !== null)
      .filter((p) => {
        const matchesCategory = activeCategory === 'todos' || p.cat === activeCategory;
        const matchesPet = p.pet === 'ambos' || p.pet === pet.kind;
        const matchesQuery =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.activeIngredient.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q);
        return matchesCategory && matchesPet && matchesQuery;
      });
  }, [pet.kind, pet.weight, pet.age, activeCategory, searchQuery]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (gridRef.current) {
      const cardWidth = 280;
      gridRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth * 2 : cardWidth * 2,
        behavior: 'smooth'
      });
    }
  };

  const handleProductAction = (product: ResolvedProduct) => {
    if (product.rx) {
      onOpenRxModal(product);
    } else {
      onAddToCart(product);
    }
  };

  return (
    <section id="farmacia" className="bg-[var(--c-loro-light)]/70 dark:bg-[#0D1F16] border-y-2 border-[#152018]/10 dark:border-white/10 py-16 sm:py-24 relative overflow-hidden transition-colors">
      
      {/* Decorative background blob */}
      <div className="absolute w-96 h-96 bg-[var(--c-loro)]/20 rounded-full blur-3xl -top-10 right-0 pointer-events-none -z-0" />
      <div className="absolute w-80 h-80 bg-[var(--c-cielo)]/15 rounded-full blur-3xl -bottom-20 left-0 pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#152018] text-[var(--c-loro)] font-mono text-xs font-bold tracking-wide shadow-sticker-sm">
            <Pill className="w-4 h-4" /> FARMACIA VETERINARIA EXPRESS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mt-4 tracking-tight leading-[1.08] text-[#152018] dark:text-[#FAFAF7]">
            Encuentra lo que necesita{' '}
            <br className="hidden sm:block" />
            sin dar vueltas para conseguirlo.
          </h2>
          <p className="text-base text-[#152018]/75 dark:text-[#FAFAF7]/75 mt-4 leading-relaxed max-w-2xl">
            Firulais localiza en tiempo real el inventario entre farmacias y pet shops veterinarias aliadas en Caracas para que recibas en menos de 45 minutos.
          </p>
        </div>

        {/* 4-Step Express Fulfillment Process */}
        <div className="relative bg-white/95 dark:bg-[#132A1E] rounded-[2.25rem] border-2 border-[#152018] shadow-sticker p-6 sm:p-8 mb-12 overflow-hidden">
          <div className="hidden lg:block absolute left-[12%] right-[12%] top-[3.75rem] h-1 bg-gradient-to-r from-[var(--c-loro)] via-[var(--c-cielo)] via-[var(--c-mango)] to-[var(--c-sol)] rounded-full opacity-60" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div className="flex flex-col items-center text-center">
              <span className="w-12 h-12 rounded-full bg-[var(--c-loro)] text-white border-2 border-[#152018] shadow-sticker-sm flex items-center justify-center font-display font-bold text-lg">
                1
              </span>
              <p className="font-display font-bold text-sm mt-3 text-[#152018] dark:text-[#FAFAF7]">Pides online</p>
              <p className="text-xs text-[#152018]/60 dark:text-[#FAFAF7]/60 mt-1">Desde la web o confirmando por WhatsApp directo.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="w-12 h-12 rounded-full bg-[var(--c-cielo)] text-white border-2 border-[#152018] shadow-sticker-sm flex items-center justify-center font-display font-bold text-lg">
                2
              </span>
              <p className="font-display font-bold text-sm mt-3 text-[#152018] dark:text-[#FAFAF7]">Ubicamos el stock</p>
              <p className="text-xs text-[#152018]/60 dark:text-[#FAFAF7]/60 mt-1">En la farmacia o pet shop aliada más cercana.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="w-12 h-12 rounded-full bg-[var(--c-mango)] text-white border-2 border-[#152018] shadow-sticker-sm flex items-center justify-center font-display font-bold text-lg">
                3
              </span>
              <p className="font-display font-bold text-sm mt-3 text-[#152018] dark:text-[#FAFAF7]">Preparación y récipe</p>
              <p className="text-xs text-[#152018]/60 dark:text-[#FAFAF7]/60 mt-1">El comercio aliado valida y empaqueta el producto.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="w-12 h-12 rounded-full bg-[var(--c-sol)] text-[#152018] border-2 border-[#152018] shadow-sticker-sm flex items-center justify-center font-display font-bold text-lg">
                4
              </span>
              <p className="font-display font-bold text-sm mt-3 text-[#152018] dark:text-[#FAFAF7]">Despacho express</p>
              <p className="text-xs text-[#152018]/60 dark:text-[#FAFAF7]/60 mt-1">Llega a tu puerta en Caracas en &lt;45 minutos.</p>
            </div>
          </div>
        </div>

        {/* Prescription Upload Callout Banner */}
        <div className="bg-[var(--c-cielo-light)] dark:bg-[#132A1E] rounded-[2rem] border-2 border-[#152018] shadow-sticker p-6 sm:p-8 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="w-14 h-14 rounded-2xl bg-[var(--c-cielo)] text-white border-2 border-[#152018] flex items-center justify-center shrink-0 shadow-sticker-sm">
              <Camera className="w-7 h-7" />
            </span>
            <div>
              <h3 className="font-display font-bold text-xl text-[#152018] dark:text-[#FAFAF7]">
                ¿Ya tienes el récipe de tu veterinario?
              </h3>
              <p className="text-sm text-[#152018]/70 dark:text-[#FAFAF7]/70 mt-1">
                Sube la foto y nuestro sistema asistido por IA leerá el principio activo y dosis en segundos.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenRxModal()}
            className="btn-pop shrink-0 px-7 py-3.5 bg-[var(--c-cielo)] text-white rounded-full text-sm font-bold border-2 border-[#152018] shadow-sticker-sm flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" /> Subir foto del récipe
          </button>
        </div>

        {/* Dynamic Pet Profile Customizer Bar */}
        <PetProfileBar
          pet={pet}
          onUpdatePet={onUpdatePet}
          onSwitchKind={onSwitchKind}
        />

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative w-full">
            <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por marca o principio activo (ej: Bravecto, Apoquel, Simparica, Royal Canin)..."
              className="w-full pl-12 sm:pl-14 pr-24 sm:pr-28 py-3.5 sm:py-4 bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] rounded-full text-xs sm:text-sm md:text-base font-medium border-2 border-[#152018] shadow-sticker focus:border-[var(--c-loro)] focus:outline-none placeholder:text-[#152018]/50 dark:placeholder:text-white/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-[#152018] bg-black/5 dark:bg-white/10 px-3 py-1.5 rounded-full transition"
              >
                Limpiar
              </button>
            )}
          </div>
          <p className="text-xs font-mono text-[#152018]/60 dark:text-[#FAFAF7]/60 mt-2.5 ml-4">
            Ejemplos populares: &quot;Bravecto 500mg&quot;, &quot;Apoquel&quot;, &quot;Royal Canin Renal&quot;, &quot;Simparica Trio&quot;, &quot;Prednisona&quot;
          </p>
        </div>

        {/* Category Pills and Slider Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <button
              onClick={() => setActiveCategory('todos')}
              className={`btn-pop px-4 py-2 rounded-full border-2 border-[#152018] transition-all ${
                activeCategory === 'todos'
                  ? 'bg-[var(--c-loro)] text-[#152018] shadow-sticker-sm'
                  : 'bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] opacity-60 hover:opacity-100'
              }`}
            >
              Todos ({filteredProducts.length})
            </button>
            <button
              onClick={() => setActiveCategory('antiparasitarios')}
              className={`btn-pop px-4 py-2 rounded-full border-2 border-[#152018] transition-all ${
                activeCategory === 'antiparasitarios'
                  ? 'bg-[var(--c-loro)] text-[#152018] shadow-sticker-sm'
                  : 'bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] opacity-60 hover:opacity-100'
              }`}
            >
              🛡️ Antiparasitarios
            </button>
            <button
              onClick={() => setActiveCategory('recipe')}
              className={`btn-pop px-4 py-2 rounded-full border-2 border-[#152018] transition-all ${
                activeCategory === 'recipe'
                  ? 'bg-[var(--c-loro)] text-[#152018] shadow-sticker-sm'
                  : 'bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] opacity-60 hover:opacity-100'
              }`}
            >
              📋 Con récipe médica
            </button>
            <button
              onClick={() => setActiveCategory('alimentos')}
              className={`btn-pop px-4 py-2 rounded-full border-2 border-[#152018] transition-all ${
                activeCategory === 'alimentos'
                  ? 'bg-[var(--c-loro)] text-[#152018] shadow-sticker-sm'
                  : 'bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] opacity-60 hover:opacity-100'
              }`}
            >
              🥣 Dietas clínicas
            </button>
            <button
              onClick={() => setActiveCategory('higiene')}
              className={`btn-pop px-4 py-2 rounded-full border-2 border-[#152018] transition-all ${
                activeCategory === 'higiene'
                  ? 'bg-[var(--c-loro)] text-[#152018] shadow-sticker-sm'
                  : 'bg-white dark:bg-[#132A1E] text-[#152018] dark:text-[#FAFAF7] opacity-60 hover:opacity-100'
              }`}
            >
              🧴 Higiene clínica
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 self-end">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Anterior"
              className="btn-pop w-9 h-9 rounded-full border-2 border-[#152018] bg-white dark:bg-[#132A1E] flex items-center justify-center text-[#152018] dark:text-[#FAFAF7]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Siguiente"
              className="btn-pop w-9 h-9 rounded-full border-2 border-[#152018] bg-white dark:bg-[#132A1E] flex items-center justify-center text-[#152018] dark:text-[#FAFAF7]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products Carousel / Horizontal Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white/70 dark:bg-[#132A1E]/70 rounded-3xl p-12 text-center border-2 border-dashed border-[#152018]/20 my-6">
            <p className="text-lg font-bold text-[#152018] dark:text-[#FAFAF7]">
              No encontramos productos para {pet.name} con esos filtros.
            </p>
            <p className="text-xs text-[#152018]/60 dark:text-[#FAFAF7]/60 mt-1 max-w-md mx-auto">
              Intenta cambiando la categoría o ajustando la banda de peso en la barra de perfil arriba.
            </p>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pt-2 pb-6 -mx-4 px-4 no-scrollbar"
          >
            {filteredProducts.map((p) => {
              return (
                <article
                  key={p.id}
                  className="card-sticker relative bg-white dark:bg-[#132A1E] rounded-[1.75rem] p-4 border-2 border-[#152018]/15 dark:border-white/15 hover:border-[var(--c-loro)] flex flex-col justify-between shrink-0 snap-start w-[72%] xs:w-64 sm:w-64 shadow-sm"
                >
                  {/* Sticker tag */}
                  <span
                    className={`sticker-tag absolute top-2.5 left-2.5 z-10 ${
                      p.rx ? 'bg-[#152018] text-white' : 'bg-[var(--c-sol)] text-[#152018]'
                    } text-[10px] font-bold px-2.5 py-1 rounded-full border-2 border-[#152018] shadow-sticker-sm rotate-[-3deg]`}
                  >
                    {p.tag}
                  </span>

                  <div>
                    {/* Image */}
                    <div className="relative w-full h-36 sm:h-40 bg-[var(--c-loro-light)] dark:bg-[#0D1F16] rounded-2xl mb-3 overflow-hidden border border-[#152018]/10">
                      <img
                        src={p.img}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <span className="font-mono text-[10px] text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] font-bold block truncate">
                      {p.spec}
                    </span>
                    <h3 className="font-display font-bold text-sm mt-0.5 text-[#152018] dark:text-[#FAFAF7] leading-snug line-clamp-2">
                      {p.name}
                    </h3>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-3 pt-3 border-t-2 border-dashed border-[#152018]/10 dark:border-white/10">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="font-display text-lg font-bold text-[#152018] dark:text-[#FAFAF7]">
                          ${p.price.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-[#152018]/60 dark:text-white/60 block font-mono">
                          ~{(p.price * BCV_EXCHANGE_RATE).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} VES
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] bg-[var(--c-loro-light)] dark:bg-[#00BFA6]/20 px-2 py-0.5 rounded-full">
                        {p.discount}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleProductAction(p)}
                      className={`btn-pop w-full py-2.5 rounded-full text-xs font-bold border-2 border-[#152018] shadow-sticker-sm flex items-center justify-center gap-1.5 ${
                        p.rx
                          ? 'bg-[var(--c-cielo)] text-white hover:bg-[var(--c-cielo-dark)]'
                          : 'bg-[var(--c-loro)] text-white hover:bg-[var(--c-loro-dark)]'
                      }`}
                    >
                      {p.rx ? (
                        <>
                          <Camera className="w-3.5 h-3.5" /> Subir récipe
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" /> Agregar al carrito
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Marketplace Disclaimer footer */}
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-[11px] text-[#152018]/60 dark:text-[#FAFAF7]/60 leading-relaxed">
            Firulais es un marketplace hiperlocal: conectamos tu orden con Pet Shops y farmacias veterinarias aliadas en Caracas, cada una con licencia sanitaria propia. Medicamentos controlados son validados por regente farmacéutico antes del envío.
          </p>
        </div>

      </div>
    </section>
  );
};
