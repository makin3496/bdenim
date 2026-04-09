"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all hover:bg-white/10 no-underline" style={{ color: "var(--t-text-muted)" }}>
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center text-white"
          style={{ background: "var(--t-accent)", boxShadow: "0 2px 8px var(--t-badge-shadow)" }}>
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </Link>
  );
}
