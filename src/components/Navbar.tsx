import React, { useState } from 'react';
import {
  ShoppingCart,
  Moon,
  Sun,
  MessageCircle,
  MapPin,
  Search,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Shield,
  Pill,
  CarFront,
  HelpCircle,
  Heart
} from 'lucide-react';
import { PetProfile } from '../types';
import { CARACAS_ZONES, BCV_EXCHANGE_RATE } from '../data/mockData';

interface NavbarProps {
  pet: PetProfile;
  cartCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onOpenZoneChecker: () => void;
  onSelectZone: (zoneId: string) => void;
  onOpenSearch: () => void;
  onSwitchPet: (kind: 'perro' | 'gato') => void;
  activeView: 'home' | 'nosotros' | 'faq';
  onNavigate: (view: 'home' | 'nosotros' | 'faq', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  pet,
  cartCount,
  isDark,
  onToggleTheme,
  onOpenCart,
  onOpenAccount,
  onOpenZoneChecker,
  onSelectZone,
  onOpenSearch,
  activeView,
  onNavigate
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentZoneId = pet.zone || 'chacao';
  const currentZone = CARACAS_ZONES.find((z) => z.id === currentZoneId) || CARACAS_ZONES[0];

  const handleMobileNav = (view: 'home' | 'nosotros' | 'faq', sectionId?: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <>
      {/* 1. Top Utility Bar - Clean, uncluttered & high contrast */}
      <div className="bg-[#152018] text-[#FAFAF7] text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Left: Tasa Oficial BCV Actualizada */}
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/85">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-loro)] inline-block shrink-0" />
            <span className="hidden sm:inline">Tasa Oficial BCV:</span>
            <strong className="text-white">1 USD = {BCV_EXCHANGE_RATE.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} VES</strong>
          </span>

          {/* Right: Zone summary — opens the full zone checker instead of a free-form input */}
          <button
            onClick={onOpenZoneChecker}
            className="flex items-center gap-1.5 text-white/90 hover:text-white transition group"
          >
            <MapPin className="w-3.5 h-3.5 text-[var(--c-sol)] shrink-0" />
            <span className="font-semibold truncate max-w-[9rem] sm:max-w-none">
              {pet.zone ? pet.zone : 'Elige tu zona'}
            </span>
            <span className="text-[var(--c-loro)] underline font-semibold hidden sm:inline">
              Ver cobertura
            </span>
          </button>

        </div>
      </div>

      {/* 2. Main Navbar */}
      <header className="sticky top-0 z-50 bg-[#FAFAF7]/95 dark:bg-[#0D1F16]/95 backdrop-blur-md border-b border-[#152018]/10 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Mobile Menu Trigger & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
              className="md:hidden p-2 rounded-xl border border-[#152018]/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 text-[#152018] dark:text-[#FAFAF7]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo */}
            <button
              onClick={() => onNavigate('home', 'inicio')}
              className="flex items-center gap-2.5 text-left group shrink-0"
            >
              <span className="w-9 h-9 rounded-xl bg-[var(--c-loro)] flex items-center justify-center border-2 border-[#152018] dark:border-white shadow-sticker-sm group-hover:scale-105 transition-transform">
                <svg width="18" height="18" viewBox="0 0 24 12" fill="none">
                  <path d="M0 6H5L7 1L10 11L13 3L15 6H24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-display text-xl font-bold tracking-tight leading-none text-[#152018] dark:text-[#FAFAF7]">
                Firulais<span className="text-[var(--c-loro)]">.</span>
              </span>
            </button>
          </div>

          {/* Center Navigation Links (Clean & balanced) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <button
              onClick={() => onNavigate('home', 'inicio')}
              className={`hover:text-[var(--c-loro)] transition ${activeView === 'home' ? 'text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] font-bold' : 'text-[#152018]/80 dark:text-white/80'}`}
            >
              Inicio
            </button>
            <button
              onClick={() => onNavigate('home', 'farmacia')}
              className="text-[#152018]/80 dark:text-white/80 hover:text-[var(--c-loro)] transition"
            >
              Farmacia
            </button>
            <button
              onClick={() => onNavigate('home', 'seguros')}
              className="text-[#152018]/80 dark:text-white/80 hover:text-[var(--c-cielo)] transition"
            >
              Seguros
            </button>
            <button
              onClick={() => onNavigate('home', 'taxipet')}
              className="text-[#152018]/80 dark:text-white/80 hover:text-[var(--c-mango)] transition"
            >
              Taxi Pet
            </button>
            <button
              onClick={() => onNavigate('home', 'manada')}
              className="text-[#152018]/80 dark:text-white/80 hover:text-[var(--c-sol)] transition"
            >
              La Manada
            </button>
            <button
              onClick={() => onNavigate('faq')}
              className={`hover:text-[var(--c-loro)] transition ${activeView === 'faq' ? 'text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] font-bold' : 'text-[#152018]/80 dark:text-white/80'}`}
            >
              FAQ
            </button>
            <button
              onClick={() => onNavigate('nosotros')}
              className={`hover:text-[var(--c-loro)] transition ${activeView === 'nosotros' ? 'text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] font-bold' : 'text-[#152018]/80 dark:text-white/80'}`}
            >
              Nosotros
            </button>
          </nav>

          {/* Right Actions: Search, Pet Profile (kept intact), WhatsApp, Cart, Theme Toggle */}
          <div className="flex items-center gap-2">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Buscar en Firulais"
              className="p-2.5 rounded-xl border border-[#152018]/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 transition text-[#152018] dark:text-[#FAFAF7]"
              title="Buscar medicamentos, seguros..."
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Pet Profile Status (Kept exactly as original) */}
            <button
              onClick={onOpenAccount}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#152018]/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 transition text-xs font-bold"
              title="Ver perfil de tu mascota"
            >
              <span className="w-6 h-6 rounded-full bg-[var(--c-loro-light)] flex items-center justify-center text-sm">
                {pet.kind === 'perro' ? '🐶' : '🐱'}
              </span>
              <span className="text-left leading-tight">
                <span className="block text-[9px] uppercase tracking-wide opacity-60">Mi mascota</span>
                <span className="text-[#152018] dark:text-[#FAFAF7] font-extrabold">{pet.name}</span>
              </span>
            </button>

            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/584120000000?text=Hola%20Firulais%20%F0%9F%90%BE%2C%20tengo%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pop p-2.5 rounded-xl bg-[#25D366] text-white border-2 border-[#152018] flex items-center justify-center shadow-sticker-sm"
              title="Escríbenos por WhatsApp"
              aria-label="WhatsApp Firulais"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="Carrito de compras"
              className="btn-pop relative p-2.5 rounded-xl bg-[var(--c-mango)] text-white border-2 border-[#152018] flex items-center justify-center shadow-sticker-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--c-sol)] text-[#152018] text-[10px] font-bold border-2 border-[#FAFAF7] dark:border-[#0D1F16] flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Cambiar modo claro/oscuro"
              className="p-2.5 rounded-full border-2 border-[#152018]/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 transition text-[#152018] dark:text-[#FAFAF7]"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#152018]" />}
            </button>
          </div>

        </div>

        {/* 3. Mobile Navigation Drawer Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#152018]/10 dark:border-white/10 bg-[#FAFAF7] dark:bg-[#0D1F16] p-4 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
            
            {/* Quick search input in mobile drawer */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-[#132A1E] border-2 border-[#152018]/15 text-xs font-bold text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[var(--c-loro)]" />
                <span>Buscar productos, recetas, seguros...</span>
              </span>
              <span className="text-[10px] bg-[var(--c-loro)] text-white px-2 py-0.5 rounded-full">
                Buscar
              </span>
            </button>

            {/* Navigation links grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => handleMobileNav('home', 'inicio')}
                className="p-3 text-left rounded-xl bg-white dark:bg-[#132A1E] border border-[#152018]/10 flex items-center gap-2"
              >
                <span className="text-[var(--c-loro)] font-bold">🐾</span>
                <span>Inicio</span>
              </button>

              <button
                onClick={() => handleMobileNav('home', 'farmacia')}
                className="p-3 text-left rounded-xl bg-white dark:bg-[#132A1E] border border-[#152018]/10 flex items-center gap-2"
              >
                <Pill className="w-4 h-4 text-[var(--c-loro)]" />
                <span>Farmacia Express</span>
              </button>

              <button
                onClick={() => handleMobileNav('home', 'seguros')}
                className="p-3 text-left rounded-xl bg-white dark:bg-[#132A1E] border border-[#152018]/10 flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-[var(--c-cielo)]" />
                <span>Seguros & Pólizas</span>
              </button>

              <button
                onClick={() => handleMobileNav('home', 'taxipet')}
                className="p-3 text-left rounded-xl bg-white dark:bg-[#132A1E] border border-[#152018]/10 flex items-center gap-2"
              >
                <CarFront className="w-4 h-4 text-[var(--c-mango)]" />
                <span>Taxi Pet</span>
              </button>

              <button
                onClick={() => handleMobileNav('home', 'manada')}
                className="p-3 text-left rounded-xl bg-white dark:bg-[#132A1E] border border-[#152018]/10 flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-[var(--c-sol)]" />
                <span>La Manada</span>
              </button>

              <button
                onClick={() => handleMobileNav('faq')}
                className="p-3 text-left rounded-xl bg-white dark:bg-[#132A1E] border border-[#152018]/10 flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
                <span>Preguntas FAQ</span>
              </button>
            </div>

            {/* Mobile Zone Selector Card */}
            <div className="p-3.5 rounded-2xl bg-[var(--c-loro-light)] dark:bg-[#132A1E] border border-[var(--c-loro)]/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-[var(--c-loro-dark)] dark:text-[var(--c-loro)]">
                  <MapPin className="w-4 h-4" /> Zona de despacho en Caracas:
                </span>
                <span className="text-[10px] font-mono bg-white dark:bg-black/30 px-2 py-0.5 rounded-full">
                  ~{currentZone.avgDeliveryMin} min
                </span>
              </div>
              <select
                value={currentZoneId}
                onChange={(e) => onSelectZone(e.target.value)}
                className="w-full p-2 rounded-xl bg-white dark:bg-[#0D1F16] text-xs font-bold border border-[#152018]/20"
              >
                {CARACAS_ZONES.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name} (Mcpio. {z.municipio}) — ~{z.avgDeliveryMin} min
                  </option>
                ))}
              </select>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#152018]/10 dark:border-white/10 text-xs">
              <button
                onClick={() => handleMobileNav('nosotros')}
                className="text-muted-foreground hover:text-[#152018] dark:hover:text-white font-bold underline"
              >
                Quiénes somos
              </button>

              <a
                href="https://wa.me/584120000000?text=Hola%20Firulais%20%F0%9F%90%BE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] font-bold flex items-center gap-1 hover:underline"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp directo
              </a>
            </div>

          </div>
        )}

      </header>
    </>
  );
};
