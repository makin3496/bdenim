"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session) {
    return (
      <Link href="/auth/login" className="flex items-center justify-center w-9 h-9 rounded-full transition-all hover:bg-white/10 no-underline" style={{ color: "var(--t-text-muted)" }}>
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </Link>
    );
  }

  const initials = session.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold cursor-pointer border-none transition-all hover:scale-105"
        style={{ background: "var(--t-accent)", color: "#fff" }}
      >
        {initials}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[998]" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-[calc(100%+8px)] w-[200px] glass-card rounded-lg overflow-hidden z-[999] py-2"
            style={{ boxShadow: "0 8px 30px var(--t-shadow)" }}>
            <div className="px-4 py-2 border-b" style={{ borderColor: "var(--t-border)" }}>
              <p className="text-sm font-medium truncate" style={{ color: "var(--t-text)" }}>{session.user?.name}</p>
              <p className="text-xs truncate" style={{ color: "var(--t-text-dim)" }}>{session.user?.email}</p>
            </div>
            <Link href="/cart" onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm no-underline transition-colors hover:bg-white/5"
              style={{ color: "var(--t-text-muted)" }}>
              🛒 My Cart
            </Link>
            <button
              onClick={() => { signOut({ callbackUrl: "/" }); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm cursor-pointer bg-transparent border-none transition-colors hover:bg-white/5"
              style={{ color: "var(--t-text-muted)" }}
            >
              🚪 Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
