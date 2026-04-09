import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

interface Props {
  settings: SiteSettings;
}

export default function Footer({ settings }: Props) {
  return (
    <>
      <div className="gradient-divider" />
      <footer className="px-12 py-12 max-md:px-6 max-md:py-8 flex justify-between items-center max-md:flex-col max-md:gap-6 max-md:text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px]" style={{ background: `linear-gradient(to right, transparent, var(--t-accent), transparent)`, opacity: 0.2 }} />

        <div className="text-lg font-extrabold tracking-widest uppercase cursor-default">
          <span style={{ color: "var(--t-accent)" }}>B</span>
          <span style={{ color: "var(--t-text)" }}>{settings.siteName?.replace(/^B/i, "") || "DENIM"}</span>
        </div>

        <div className="text-xs max-md:order-3" style={{ color: "var(--t-text-dim)" }}>
          {settings.footerText || `© ${new Date().getFullYear()} BDENIM. All rights reserved.`}
        </div>

        <div className="flex gap-6 max-md:gap-4">
          {settings.footerLinks?.map((link) => (
            <Link key={link.id} href={link.href}
              className="text-xs no-underline tracking-wider uppercase transition-colors hover:text-[var(--t-text)]"
              style={{ color: "var(--t-text-dim)" }}>
              {link.label}
            </Link>
          ))}
        </div>
      </footer>
    </>
  );
}
