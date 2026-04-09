"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TelegramIcon, WhatsAppIcon } from "@/components/ui/Icons";
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
      setScrolled(window.scrollY > 50);

      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
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
      <nav className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-12 max-md:px-6 border-b transition-all duration-500 ${
        scrolled
          ? "h-[52px] bg-bg/95 backdrop-blur-2xl border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "h-[64px] bg-bg-secondary/95 backdrop-blur-xl border-border"
      }`}>
        {/* Logo */}
        <Link href="/" className={`font-extrabold tracking-widest uppercase no-underline text-white group transition-all duration-500 ${scrolled ? "text-[18px]" : "text-[22px]"}`}>
          <span className={`text-accent font-black mr-0.5 transition-all duration-500 inline-block group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(231,76,60,0.5)] ${scrolled ? "text-[22px]" : "text-[28px]"}`}>B</span>
          {settings.siteName?.replace(/^B/i, "") || "DENIM"}
        </Link>

        {/* Desktop Nav */}
        <ul className="flex gap-9 list-none max-md:hidden">
          {settings.navLinks?.map((link) => (
            <li key={link.id}>
              <Link href={link.href}
                className="text-muted text-sm font-normal tracking-wide transition-all duration-300 hover:text-white relative
                           after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px
                           after:bg-accent after:transition-all after:duration-300 hover:after:w-full
                           after:shadow-[0_0_4px_rgba(231,76,60,0.5)]">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Social */}
        <ul className="flex gap-5 list-none items-center max-md:hidden">
          {settings.telegramUrl && (
            <li>
              <a href={settings.telegramUrl} target="_blank" rel="noopener noreferrer"
                className="text-muted text-[13px] transition-all duration-300 hover:text-telegram flex items-center gap-1.5 hover:drop-shadow-[0_0_6px_rgba(0,136,204,0.4)]">
                <TelegramIcon className="w-4 h-4" /> Telegram
              </a>
            </li>
          )}
          {settings.whatsappUrl && (
            <li>
              <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="text-muted text-[13px] transition-all duration-300 hover:text-whatsapp flex items-center gap-1.5 hover:drop-shadow-[0_0_6px_rgba(37,211,102,0.4)]">
                <WhatsAppIcon className="w-4 h-4" /> WhatsApp
              </a>
            </li>
          )}
        </ul>

        {/* Hamburger */}
        <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-accent/80 transition-all duration-100 shadow-[0_0_8px_rgba(231,76,60,0.4)]"
          style={{ width: `${scrollProgress}%` }} />
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? "active" : ""}`} onClick={closeMenu} />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        {settings.navLinks?.map((link) => (
          <a key={link.id} href={link.href} onClick={closeMenu}>{link.label}</a>
        ))}
        <div className="social-links">
          {settings.telegramUrl && (
            <a href={settings.telegramUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Telegram</a>
          )}
          {settings.whatsappUrl && (
            <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>WhatsApp</a>
          )}
        </div>
      </div>
    </>
  );
}
