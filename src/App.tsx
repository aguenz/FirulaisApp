import React, { useState, useEffect } from 'react';
import {
  PetProfile,
  PaletteId,
  ResolvedProduct,
  CartItem,
  InsurancePlan
} from './types';
import { Navbar } from './components/Navbar';
import { PaletteSwitcher } from './components/PaletteSwitcher';
import { Hero } from './components/Hero';
import { QuickServices } from './components/QuickServices';
import { BrandMarquee } from './components/BrandMarquee';
import { ValueProps } from './components/ValueProps';
import { HowItWorks } from './components/HowItWorks';
import { PharmacySection } from './components/PharmacySection';
import { InsuranceSection } from './components/InsuranceSection';
import { TaxiPetSection } from './components/TaxiPetSection';
import { CommunitySection } from './components/CommunitySection';
import { FaqSection } from './components/FaqSection';
import { NosotrosSection } from './components/NosotrosSection';
import { AppSignupSection } from './components/AppSignupSection';
import { Footer } from './components/Footer';
import { MobileDock } from './components/MobileDock';
import { CartDrawer } from './components/CartDrawer';
import { RxModal } from './components/RxModal';
import { ZoneCheckerModal } from './components/ZoneCheckerModal';
import { InsuranceQuizModal } from './components/InsuranceQuizModal';
import { InsuranceModal } from './components/InsuranceModal';
import { AccountModal } from './components/AccountModal';
import { LegalModal } from './components/LegalModal';
import { SearchModal } from './components/SearchModal';

export default function App() {
  // Global State
  const [pet, setPet] = useState<PetProfile>(() => {
    const saved = localStorage.getItem('firulais_pet_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      kind: 'perro',
      name: 'Firulais',
      weight: 'medium',
      age: 'adulto',
      zone: 'Caracas'
    };
  });

  const [palette, setPalette] = useState<PaletteId>(() => {
    return (localStorage.getItem('firulais_palette') as PaletteId) || 'a';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('firulais_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('firulais_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [activeView, setActiveView] = useState<'home' | 'nosotros' | 'faq'>('home');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [rxProductTarget, setRxProductTarget] = useState<ResolvedProduct | null>(null);
  const [isZoneCheckerOpen, setIsZoneCheckerOpen] = useState(false);
  const [isInsuranceQuizOpen, setIsInsuranceQuizOpen] = useState(false);
  const [selectedInsurancePlan, setSelectedInsurancePlan] = useState<InsurancePlan | null>(null);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'terminos' | 'privacidad' | null>(null);

  // Sync palette and theme to <html> element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-palette', palette);
    localStorage.setItem('firulais_palette', palette);
  }, [palette]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('firulais_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('firulais_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('firulais_pet_profile', JSON.stringify(pet));
  }, [pet]);

  useEffect(() => {
    localStorage.setItem('firulais_cart', JSON.stringify(cart));
  }, [cart]);

  // Pet Switcher handler (Firulais vs Michi)
  const handleSwitchPetKind = (kind: 'perro' | 'gato') => {
    const defaultName = kind === 'perro' ? 'Firulais' : 'Michi';
    setPet((prev) => ({
      ...prev,
      kind,
      name: prev.name === 'Firulais' || prev.name === 'Michi' ? defaultName : prev.name
    }));
  };

  const handleUpdatePet = (updated: Partial<PetProfile>) => {
    setPet((prev) => ({ ...prev, ...updated }));
  };

  // Cart operations
  const handleAddToCart = (product: ResolvedProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.spec === product.spec);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.spec === product.spec
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === productId ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Navigation handler
  const handleNavigate = (view: 'home' | 'nosotros' | 'faq', sectionId?: string) => {
    setActiveView(view);
    if (view === 'home') {
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenRxModal = (product?: ResolvedProduct) => {
    setRxProductTarget(product || null);
    setIsRxModalOpen(true);
  };

  const handleOpenInsurancePurchase = (plan: InsurancePlan) => {
    setSelectedInsurancePlan(plan);
    setIsInsuranceModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 pb-20 md:pb-0">
      
      {/* Sticky Top Navigation */}
      <Navbar
        pet={pet}
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={() => setIsAccountModalOpen(true)}
        onOpenZoneChecker={() => setIsZoneCheckerOpen(true)}
        onSelectZone={(zoneId) => handleUpdatePet({ zone: zoneId })}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSwitchPet={handleSwitchPetKind}
        activeView={activeView}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            {/* Hero Section with Pet Switcher and Pillars */}
            <Hero
              pet={pet}
              onSwitchPet={handleSwitchPetKind}
              onNavigateSection={(id) => handleNavigate('home', id)}
              onOpenAppSignup={() => handleNavigate('home', 'app-signup')}
            />

            {/* Brand laboratory ticker */}
            <BrandMarquee />

            {/* Quick Access Services (¿Qué necesitas hoy?) placed cleanly below Hero */}
            <QuickServices
              onNavigateSection={(id) => handleNavigate('home', id)}
            />

            {/* Value Propositions for Venezuela */}
            <ValueProps />

            {/* 3-Step Process */}
            <HowItWorks
              pet={pet}
              onOpenAccount={() => setIsAccountModalOpen(true)}
            />

            {/* Pilar 1: Farmacia Veterinaria Express */}
            <PharmacySection
              pet={pet}
              onUpdatePet={handleUpdatePet}
              onSwitchKind={handleSwitchPetKind}
              onAddToCart={handleAddToCart}
              onOpenRxModal={handleOpenRxModal}
            />

            {/* Pilar 2: Comparador de Seguros y Asistencia */}
            <InsuranceSection
              pet={pet}
              onOpenInsuranceQuiz={() => setIsInsuranceQuizOpen(true)}
              onOpenInsurancePurchase={handleOpenInsurancePurchase}
            />

            {/* Pilar 3: Taxi Pet Especializado */}
            <TaxiPetSection
              pet={pet}
              onSwitchKind={handleSwitchPetKind}
            />

            {/* La Manada Community Stories */}
            <CommunitySection />

            {/* FAQ Preview */}
            <FaqSection />

            {/* App Waitlist / Early Access */}
            <AppSignupSection />
          </>
        )}

        {activeView === 'nosotros' && (
          <NosotrosSection />
        )}

        {activeView === 'faq' && (
          <div className="pt-6">
            <FaqSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenZoneChecker={() => setIsZoneCheckerOpen(true)}
      />

      {/* Bottom Floating Palette Switcher */}
      <PaletteSwitcher
        currentPalette={palette}
        onSelectPalette={(p) => setPalette(p)}
      />

      {/* Mobile Bottom Dock */}
      <MobileDock
        pet={pet}
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenAccount={() => setIsAccountModalOpen(true)}
      />

      {/* Interactive Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <RxModal
        isOpen={isRxModalOpen}
        product={rxProductTarget}
        pet={pet}
        onClose={() => {
          setIsRxModalOpen(false);
          setRxProductTarget(null);
        }}
        onConfirmUpload={handleAddToCart}
      />

      <ZoneCheckerModal
        isOpen={isZoneCheckerOpen}
        onClose={() => setIsZoneCheckerOpen(false)}
      />

      <InsuranceQuizModal
        isOpen={isInsuranceQuizOpen}
        pet={pet}
        onClose={() => setIsInsuranceQuizOpen(false)}
        onSelectPlan={handleOpenInsurancePurchase}
      />

      <InsuranceModal
        isOpen={isInsuranceModalOpen}
        plan={selectedInsurancePlan}
        pet={pet}
        onClose={() => {
          setIsInsuranceModalOpen(false);
          setSelectedInsurancePlan(null);
        }}
      />

      <AccountModal
        isOpen={isAccountModalOpen}
        pet={pet}
        onClose={() => setIsAccountModalOpen(false)}
        onSavePet={(updated) => setPet(updated)}
      />

      <LegalModal
        isOpen={legalModalType !== null}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        pet={pet}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => {
          if (prod.rx) {
            handleOpenRxModal(prod);
          } else {
            handleAddToCart(prod);
          }
        }}
        onNavigateSection={(secId) => handleNavigate('home', secId)}
      />

    </div>
  );
}
