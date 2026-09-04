import React from 'react';
import { X, ShoppingBag, Send, Lock, Banknote, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';
import { BCV_EXCHANGE_RATE } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem
}) => {
  const subtotalUSD = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const subtotalVES = (subtotalUSD * BCV_EXCHANGE_RATE).toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    const orderLines = items
      .map(
        (i) =>
          `• ${i.qty}x ${i.name} (${i.spec}) — $${(i.price * i.qty).toFixed(2)} USD ${
            i.rx ? '📋 [Récipe médica adjunta]' : ''
          } ${i.subscribed ? '🔁 [Auto-reorden mensual]' : ''}`
      )
      .join('\n');

    const message = `Hola Firulais 🐾, quiero confirmar mi pedido de farmacia express:

${orderLines}

💰 Total: $${subtotalUSD.toFixed(2)} USD (~${subtotalVES} VES - Tasa BCV: ${BCV_EXCHANGE_RATE.toLocaleString('es-VE')} Bs/USD)
📍 Zona de entrega: Caracas
💳 Método preferido: [Pago Móvil / Zelle / Efectivo]`;

    window.open(`https://wa.me/584120000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[70] transition-opacity"
      />

      {/* Drawer */}
      <aside className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#FAFAF7] dark:bg-[#0D1F16] z-[80] shadow-2xl flex flex-col border-l-2 border-[#152018] dark:border-white/20 transition-transform">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-[#152018]/10 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[var(--c-mango)] flex items-center justify-center text-white font-bold text-sm">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <h3 className="font-display font-bold text-lg text-[#152018] dark:text-[#FAFAF7]">
              Carrito de compras ({items.reduce((s, i) => s + i.qty, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground hover:text-[#152018]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-1.5 px-5 py-3 border-b-2 border-[#152018]/10 dark:border-white/10 text-[10px] font-bold bg-[var(--c-loro-light)]/40 dark:bg-[#132A1E]">
          <span className="flex items-center gap-1 text-[var(--c-loro-dark)] dark:text-[var(--c-loro)]">
            <span className="w-4 h-4 rounded-full bg-[var(--c-loro)] text-white flex items-center justify-center text-[9px]">1</span>
            Revisas pedido
          </span>
          <div className="flex-1 h-0.5 bg-[#152018]/10 dark:bg-white/10" />
          <span className="flex items-center gap-1 text-[#152018]/40 dark:text-white/40">
            <span className="w-4 h-4 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-[9px]">2</span>
            Confirmas WhatsApp
          </span>
          <div className="flex-1 h-0.5 bg-[#152018]/10 dark:bg-white/10" />
          <span className="flex items-center gap-1 text-[#152018]/40 dark:text-white/40">
            <span className="w-4 h-4 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-[9px]">3</span>
            Recibes en &lt;45m
          </span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--c-loro-light)] dark:bg-[#132A1E] flex items-center justify-center text-muted-foreground">
                <ShoppingBag className="w-8 h-8 text-[var(--c-loro-dark)] opacity-60" />
              </div>
              <p className="font-display font-bold text-sm text-[#152018] dark:text-[#FAFAF7]">
                Tu carrito está vacío
              </p>
              <p className="text-xs text-[#152018]/50 dark:text-[#FAFAF7]/50 max-w-xs">
                Agrega medicamentos veterinarios, antiparasitarios o dietas clínicas del catálogo para comenzar.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 items-center border-2 border-[#152018]/10 dark:border-white/10 bg-white dark:bg-[#132A1E] rounded-2xl p-3 shadow-xs"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#152018]/10"
                />
                
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-xs sm:text-sm truncate text-[#152018] dark:text-[#FAFAF7]">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] font-mono truncate">
                    {item.spec}
                  </p>
                  <p className="text-xs font-bold text-[#152018] dark:text-[#FAFAF7] mt-0.5">
                    ${item.price.toFixed(2)}{' '}
                    <span className="text-[10px] text-muted-foreground font-normal">
                      c/u {item.rx ? '· 📋 con récipe' : ''} {item.subscribed ? '· 🔁 mensual' : ''}
                    </span>
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 shrink-0 bg-[#FAFAF7] dark:bg-[#0D1F16] border border-[#152018]/15 rounded-full px-2 py-1">
                  <button
                    onClick={() => onUpdateQty(item.id, -1)}
                    className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs hover:bg-black/5"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-5 text-center font-bold text-xs text-[#152018] dark:text-[#FAFAF7]">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => onUpdateQty(item.id, 1)}
                    className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs hover:bg-black/5"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  aria-label="Eliminar producto"
                  className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t-2 border-[#152018]/10 dark:border-white/10 space-y-3 bg-white dark:bg-[#132A1E]">
            <div className="flex items-center justify-between text-xs text-[#152018]/70 dark:text-[#FAFAF7]/70">
              <span>Subtotal productos:</span>
              <span className="font-mono font-bold">${subtotalUSD.toFixed(2)} USD</span>
            </div>
            
            <div className="flex items-center justify-between font-display font-bold text-lg pb-1 text-[#152018] dark:text-[#FAFAF7]">
              <span>Total a pagar:</span>
              <div className="text-right">
                <span>${subtotalUSD.toFixed(2)} USD</span>
                <span className="block text-[11px] font-mono text-[var(--c-loro-dark)] dark:text-[var(--c-loro)] font-normal">
                  ~{subtotalVES} VES (Tasa oficial BCV)
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              className="btn-pop w-full py-3.5 bg-[var(--c-loro)] text-white font-bold text-sm rounded-full border-2 border-[#152018] shadow-sticker-sm flex items-center justify-center gap-2 hover:bg-[var(--c-loro-dark)]"
            >
              <Send className="w-4 h-4" /> Continuar pedido por WhatsApp
            </button>

            <p className="text-[10px] text-center text-[#152018]/50 dark:text-white/50 leading-tight">
              Enviamos tu orden a la Pet Shop aliada más cercana con stock para despacho inmediato.
            </p>

            <div className="flex items-center justify-center gap-4 pt-1 flex-wrap text-[10px] text-muted-foreground font-semibold">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-[var(--c-loro)]" /> Compra protegida
              </span>
              <span className="flex items-center gap-1">
                <Banknote className="w-3 h-3 text-[var(--c-mango)]" /> Pago móvil / Zelle / Cash
              </span>
            </div>
          </div>
        )}

      </aside>
    </>
  );
};
