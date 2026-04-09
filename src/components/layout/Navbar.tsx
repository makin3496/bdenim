"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TelegramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import ThemeToggle from "@/components/ui/ThemeToggle";
import CartIcon from "@/components/cart/CartIcon";
import UserMenu from "@/components/auth/UserMenu";
import type { SiteSettings } from "@/lib/types";

interface Props {
  settings: SiteSettings;
}

export default function Navbar({ settings }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* EXPANDED NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled ? "pointer-events-none opacity-0 -translate-y-full" : "pointer-events-auto opacity-100 translate-y-0"}`}
        style={{ background: "var(--t-nav-bg)", backdropFilter: "blur(24px) saturate(1.4)", WebkitBackdropFilter: "blur(24px) saturate(1.4)", borderBottom: "1px solid var(--t-glass-border)" }}>

        <div className="flex items-center justify-between px-12 max-md:px-6 h-[52px]">
          <div className="w-[140px] max-md:w-auto">
            <div className={`hamburger ${menuOpen ? "active" : ""} md:invisible`} onClick={() => setMenuOpen(!menuOpen)}>
              <span></span><span></span><span></span>
            </div>
          </div>

          <Link href="/" className="text-[30px] max-md:text-[24px] font-black tracking-[6px] uppercase no-underline absolute left-1/2 -translate-x-1/2" style={{ color: "var(--t-text)" }}>
            <span style={{ color: "var(--t-accent)" }}>B</span>DENIM
          </Link>

          <div className="flex items-center gap-3">
            {settings.telegramUrl && (
              <a href={settings.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-[12px] flex items-center gap-1.5 max-md:hidden opacity-50 hover:opacity-100 transition-opacity" style={{ color: "var(--t-text-muted)" }}>
                <TelegramIcon className="w-3.5 h-3.5" /> Telegram
              </a>
            )}
            {settings.whatsappUrl && (
              <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[12px] flex items-center gap-1.5 max-md:hidden opacity-50 hover:opacity-100 transition-opacity" style={{ color: "var(--t-text-muted)" }}>
                <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp
              </a>
            )}
            <CartIcon />
            <UserMenu />
            <div style={{ color: "var(--t-text-muted)" }}><ThemeToggle /></div>
          </div>
        </div>

        <div className="flex justify-center gap-8 max-md:gap-5 pb-2.5 max-md:overflow-x-auto max-md:justify-start max-md:px-6 scrollbar-hide">
          {settings.navLinks?.map((link) => (
            <Link key={link.id} href={link.href} className="text-[13px] max-md:text-[12px] tracking-[2px] uppercase whitespace-nowrap opacity-50 hover:opacity-100 transition-all duration-300"
              style={{ color: "var(--t-text)" } as React.CSSProperties}>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* COMPACT NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-[1000] h-[48px] flex items-center justify-between px-12 max-md:px-6 transition-all duration-500 ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
        style={{ background: "var(--t-nav-bg-scrolled)", backdropFilter: "blur(24px) saturate(1.4)", WebkitBackdropFilter: "blur(24px) saturate(1.4)", borderBottom: "1px solid var(--t-glass-border)", boxShadow: "0 4px 30px var(--t-shadow)" }}>

        <Link href="/" className="text-[18px] font-extrabold tracking-[4px] uppercase no-underline" style={{ color: "var(--t-text)" }}>
          <span style={{ color: "var(--t-accent)" }}>B</span>DENIM
        </Link>

        <div className="flex gap-7 max-md:hidden">
          {settings.navLinks?.map((link) => (
            <Link key={link.id} href={link.href} className="text-[12px] tracking-[2px] uppercase opacity-50 hover:opacity-100 transition-all duration-300" style={{ color: "var(--t-text)" }}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <CartIcon />
          <UserMenu />
          <div style={{ color: "var(--t-text-muted)" }}><ThemeToggle /></div>
          <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-[2px] transition-all duration-100" style={{ width: `${scrollProgress}%`, background: "var(--t-accent)", boxShadow: `0 0 8px var(--t-badge-shadow)` }} />
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu-overlay ${menuOpen ? "active" : ""}`} onClick={closeMenu} />
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        {settings.navLinks?.map((link) => (<a key={link.id} href={link.href} onClick={closeMenu}>{link.label}</a>))}
        <a href="/cart" onClick={closeMenu}>🛒 Cart</a>
        <a href="/auth/login" onClick={closeMenu}>👤 Account</a>
        <div className="social-links">
          {settings.telegramUrl && <a href={settings.telegramUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Telegram</a>}
          {settings.whatsappUrl && <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>WhatsApp</a>}
        </div>
      </div>
    </>
  );
}
