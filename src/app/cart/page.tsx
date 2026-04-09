"use client";

import { useCart } from "@/contexts/CartContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { TelegramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [ordered, setOrdered] = useState(false);

  const currency = "₽";
  const telegramUser = "KULLANICI_ADIN"; // Strapi'den gelebilir
  const whatsappNumber = "905551234567";

  function buildOrderMessage() {
    const userName = session?.user?.name || "Misafir";
    const userEmail = session?.user?.email || "";

    let msg = `🛍 Yeni Sipariş — BDENIM\n\n`;
    msg += `👤 Müşteri: ${userName}\n`;
    if (userEmail) msg += `📧 Email: ${userEmail}\n`;
    msg += `\n📦 Ürünler:\n`;
    msg += `─────────────────\n`;

    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.name}\n`;
      msg += `   📏 Beden: ${item.size}\n`;
      msg += `   🎨 Renk: ${item.color}\n`;
      msg += `   📦 Adet: ${item.quantity}\n`;
      msg += `   💰 Fiyat: ${currency} ${(item.price * item.quantity).toLocaleString()}\n\n`;
    });

    msg += `─────────────────\n`;
    msg += `💰 Toplam: ${currency} ${totalPrice.toLocaleString()}\n`;

    if (message.trim()) {
      msg += `\n💬 Müşteri Notu: ${message}\n`;
    }

    return msg;
  }

  function orderViaTelegram() {
    const msg = encodeURIComponent(buildOrderMessage());
    window.open(`https://t.me/${telegramUser}?text=${msg}`, "_blank");
    setOrdered(true);
  }

  function orderViaWhatsApp() {
    const msg = encodeURIComponent(buildOrderMessage());
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
    setOrdered(true);
  }

  if (ordered) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-[100px]" style={{ background: "var(--t-bg)" }}>
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--t-text)" }}>Siparişiniz İletildi!</h1>
          <p className="text-sm mb-8" style={{ color: "var(--t-text-muted)" }}>
            Mesajınız gönderildi. En kısa sürede size dönüş yapacağız.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/" className="btn-primary">Ana Sayfa</Link>
            <button onClick={() => { clearCart(); setOrdered(false); }} className="btn-secondary">
              Yeni Sipariş
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-[100px]" style={{ background: "var(--t-bg)" }}>
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6 opacity-20">🛒</div>
          <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--t-text)" }}>Your cart is empty</h1>
          <p className="text-sm mb-8" style={{ color: "var(--t-text-muted)" }}>
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/#products" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-12 max-md:px-6 pt-[100px] pb-20" style={{ background: "var(--t-bg)" }}>
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2" style={{ color: "var(--t-text)" }}>
          Shopping Cart
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--t-text-muted)" }}>{totalItems} item(s)</p>

        {/* Cart Items */}
        <div className="flex flex-col gap-4 mb-8">
          {items.map((item, i) => (
            <div key={`${item.id}-${item.size}-${item.color}-${i}`}
              className="glass-card rounded-lg p-5 flex gap-5 max-md:flex-col">
              {/* Image placeholder */}
              <div className="w-24 h-24 max-md:w-full max-md:h-40 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                <span className="text-3xl opacity-20">🧥</span>
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold" style={{ color: "var(--t-text)" }}>{item.name}</h3>
                    <p className="text-xs mt-1" style={{ color: "var(--t-text-dim)" }}>{item.category}</p>
                  </div>
                  <button onClick={() => removeItem(item.id, item.size, item.color)}
                    className="text-lg opacity-30 hover:opacity-100 hover:text-red-400 transition-all cursor-pointer bg-transparent border-none"
                    style={{ color: "var(--t-text-muted)" }}>
                    ✕
                  </button>
                </div>

                <div className="flex gap-4 mt-3 text-xs" style={{ color: "var(--t-text-muted)" }}>
                  <span className="flex items-center gap-1.5">
                    Size: <span className="font-medium" style={{ color: "var(--t-text)" }}>{item.size}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    Color:
                    <span className="w-3.5 h-3.5 rounded-full inline-block border border-white/10" style={{ background: item.colorHex }} />
                    <span className="font-medium" style={{ color: "var(--t-text)" }}>{item.color}</span>
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  {/* Quantity */}
                  <div className="flex items-center rounded-md overflow-hidden" style={{ border: "1px solid var(--t-border)" }}>
                    <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                      className="w-9 h-9 flex items-center justify-center text-sm cursor-pointer bg-transparent border-none transition-colors hover:bg-white/5"
                      style={{ color: "var(--t-text)" }}>−</button>
                    <span className="w-10 h-9 flex items-center justify-center text-sm font-medium"
                      style={{ color: "var(--t-text)", borderLeft: "1px solid var(--t-border)", borderRight: "1px solid var(--t-border)" }}>
                      {item.quantity}
                    </span>
                    <button onClick={() => updateQuantity(item.id, item.size, item.color, Math.min(10, item.quantity + 1))}
                      className="w-9 h-9 flex items-center justify-center text-sm cursor-pointer bg-transparent border-none transition-colors hover:bg-white/5"
                      style={{ color: "var(--t-text)" }}>+</button>
                  </div>

                  {/* Price */}
                  <div className="text-lg font-bold" style={{ color: "var(--t-text)" }}>
                    {currency} {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="glass-card rounded-lg p-5 mb-6">
          <label className="text-xs font-medium tracking-wider uppercase mb-2 block" style={{ color: "var(--t-text-muted)" }}>
            Message (optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Any special requests or notes..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-y"
            style={{ background: "var(--t-input-bg)", border: "1px solid var(--t-input-border)", color: "var(--t-text)" }}
          />
        </div>

        {/* Summary & Order */}
        <div className="glass-card rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm" style={{ color: "var(--t-text-muted)" }}>Total ({totalItems} items)</span>
            <span className="text-2xl font-bold" style={{ color: "var(--t-text)" }}>{currency} {totalPrice.toLocaleString()}</span>
          </div>

          {!session && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: "var(--t-input-bg)", border: "1px solid var(--t-input-border)", color: "var(--t-text-muted)" }}>
              💡 <Link href="/auth/login" className="font-medium no-underline" style={{ color: "var(--t-accent)" }}>Sign in</Link> to save your order history
            </div>
          )}

          <div className="flex gap-3 max-md:flex-col">
            <button onClick={orderViaTelegram} className="btn-telegram rounded-lg">
              <TelegramIcon className="w-5 h-5" /> Order via Telegram
            </button>
            <button onClick={orderViaWhatsApp} className="btn-whatsapp rounded-lg">
              <WhatsAppIcon className="w-5 h-5" /> Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
