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
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

        <div className="text-lg font-extrabold tracking-widest uppercase group cursor-default">
          <span className="text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(231,76,60,0.5)]">B</span>
          {settings.siteName?.replace(/^B/i, "") || "DENIM"}
        </div>

        <div className="text-xs text-dim max-md:order-3">
          {settings.footerText || `© ${new Date().getFullYear()} BDENIM. All rights reserved.`}
        </div>

        <div className="flex gap-6 max-md:gap-4">
          {settings.footerLinks?.map((link) => (
            <Link key={link.id} href={link.href}
              className="text-xs text-dim no-underline tracking-wider uppercase transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </footer>
    </>
  );
}
