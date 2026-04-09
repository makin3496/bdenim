"use client";

import { useState } from "react";
import StrapiImage from "@/components/ui/StrapiImage";
import { TelegramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { useCart } from "@/contexts/CartContext";
import type { Service, SiteSettings } from "@/lib/types";

interface Props {
  product: Service | null;
  settings: SiteSettings;
  onClose: () => void;
}

export default function ProductModal({ product, settings, onClose }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  if (!product) return null;
  const currency = settings.currency || "₽";

  function handleAddToCart() {
    if (!selectedSize || !selectedColor) { alert("Lütfen beden ve renk seçin!"); return; }
    addItem({
      id: product!.id || 0,
      name: product!.name,
      price: product!.price,
      size: selectedSize,
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      quantity,
      category: product!.categoryLabel,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleDirectOrder(platform: "telegram" | "whatsapp") {
    if (!selectedSize || !selectedColor) { alert("Lütfen beden ve renk seçin!"); return; }
    let msg = `Merhaba! ${settings.siteName}'den sipariş:\n\n🛍 ${product!.name}\n📏 Beden: ${selectedSize}\n🎨 Renk: ${selectedColor.name}\n📦 Adet: ${quantity}\n💰 ${currency} ${product!.price?.toLocaleString()}`;
    const encoded = encodeURIComponent(msg);
    if (platform === "telegram") window.open(`https://t.me/${settings.telegramUser}?text=${encoded}`, "_blank");
    else window.open(`https://wa.me/${settings.whatsappNumber}?text=${encoded}`, "_blank");
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-10 max-md:p-4" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="rounded-lg max-w-[960px] w-full max-h-[90vh] overflow-y-auto grid grid-cols-2 max-lg:grid-cols-1 max-lg:max-w-[500px] relative animate-slide-up glass-card">
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all cursor-pointer border-none text-xl hover:scale-110" style={{ background: "rgba(0,0,0,0.5)", color: "white" }}>✕</button>

        {/* Image */}
        <div className="aspect-[3/4] max-lg:aspect-square flex items-center justify-center relative overflow-hidden rounded-l-lg max-lg:rounded-t-lg max-lg:rounded-bl-none bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
          {product.image ? <StrapiImage image={product.image} fill sizes="50vw" /> : <div className="text-[80px] opacity-10">🧥</div>}
        </div>

        {/* Details */}
        <div className="p-10 max-md:p-6 flex flex-col gap-5">
          <span className="text-xs tracking-[3px] uppercase font-semibold" style={{ color: "var(--t-accent)" }}>{product.categoryLabel}</span>
          <h2 className="text-[28px] font-extrabold uppercase leading-tight" style={{ color: "var(--t-text)" }}>{product.name}</h2>
          <div className="text-[28px] font-bold" style={{ color: "var(--t-text)" }}>
            {currency} {product.price?.toLocaleString()}
            {product.oldPrice && <span className="text-lg line-through font-normal ml-3" style={{ color: "var(--t-text-dim)" }}>{currency} {product.oldPrice.toLocaleString()}</span>}
          </div>
          <p className="text-sm leading-[1.8]" style={{ color: "var(--t-text-muted)" }}>{product.description}</p>

          {/* Sizes */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--t-text-muted)" }}>Size <span className="font-normal ml-2" style={{ color: "var(--t-text)" }}>{selectedSize || "— select —"}</span></span>
            <div className="flex gap-2 flex-wrap">
              {product.sizes?.map((s) => (
                <button key={s.id} disabled={!s.available} onClick={() => setSelectedSize(s.label)}
                  className={`w-[52px] h-11 text-[13px] font-medium rounded-sm transition-all cursor-pointer border ${!s.available ? "opacity-30 cursor-not-allowed" : ""}`}
                  style={{
                    borderColor: selectedSize === s.label ? "var(--t-accent)" : "var(--t-border)",
                    color: selectedSize === s.label ? "var(--t-accent)" : "var(--t-text-muted)",
                    background: selectedSize === s.label ? "rgba(231,76,60,0.1)" : "transparent",
                  }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--t-text-muted)" }}>Color <span className="font-normal ml-2" style={{ color: "var(--t-text)" }}>{selectedColor?.name || "— select —"}</span></span>
            <div className="flex gap-2.5">
              {product.colors?.map((c) => (
                <button key={c.id} title={c.name} onClick={() => setSelectedColor({ name: c.name, hex: c.hex })}
                  className="w-9 h-9 rounded-full cursor-pointer transition-all relative outline-none border-2 border-transparent"
                  style={{
                    backgroundColor: c.hex,
                    boxShadow: selectedColor?.name === c.name ? `0 0 0 2px var(--t-bg), 0 0 0 4px var(--t-accent)` : "none",
                  }} />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--t-text-muted)" }}>Quantity</span>
            <div className="flex rounded-sm w-fit overflow-hidden" style={{ border: "1px solid var(--t-border)" }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-11 text-lg cursor-pointer bg-transparent border-none transition-colors hover:bg-white/5" style={{ color: "var(--t-text)" }}>−</button>
              <div className="w-[52px] h-11 flex items-center justify-center text-[15px] font-semibold" style={{ color: "var(--t-text)", borderLeft: "1px solid var(--t-border)", borderRight: "1px solid var(--t-border)" }}>{quantity}</div>
              <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="w-11 h-11 text-lg cursor-pointer bg-transparent border-none transition-colors hover:bg-white/5" style={{ color: "var(--t-text)" }}>+</button>
            </div>
          </div>

          {/* Add to Cart */}
          <button onClick={handleAddToCart}
            className={`w-full py-4 rounded-lg text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all border-none ${added ? "bg-green-500" : ""}`}
            style={{ background: added ? "#22c55e" : "var(--t-accent)", color: "#fff", boxShadow: `0 4px 20px var(--t-badge-shadow)` }}>
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>

          {/* Direct order */}
          <div className="flex gap-2">
            <button onClick={() => handleDirectOrder("telegram")} className="flex-1 py-2.5 rounded-lg text-xs font-medium cursor-pointer border-none flex items-center justify-center gap-1.5 transition-all hover:opacity-80" style={{ background: "var(--t-telegram)", color: "#fff" }}>
              <TelegramIcon className="w-3.5 h-3.5" /> Direct Order
            </button>
            <button onClick={() => handleDirectOrder("whatsapp")} className="flex-1 py-2.5 rounded-lg text-xs font-medium cursor-pointer border-none flex items-center justify-center gap-1.5 transition-all hover:opacity-80" style={{ background: "var(--t-whatsapp)", color: "#fff" }}>
              <WhatsAppIcon className="w-3.5 h-3.5" /> Direct Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
