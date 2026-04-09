import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/strapi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings();
    return {
      title: `${settings.siteName || "BDENIM"} — Modern Streetwear Essentials`,
      description: "Dark, oversized silhouettes built for a sharper streetwear identity.",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    };
  } catch {
    return {
      title: "BDENIM — Modern Streetwear Essentials",
      description: "Dark, oversized silhouettes built for a sharper streetwear identity.",
    };
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let settings;

  try {
    settings = await getSiteSettings();
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    settings = {
      siteName: "BDENIM",
      logo: null,
      telegramUser: "",
      telegramUrl: "",
      whatsappNumber: "",
      whatsappUrl: "",
      navLinks: [
        { id: 1, label: "Hoodies", href: "#products" },
        { id: 2, label: "Tees", href: "#products" },
        { id: 3, label: "Denim", href: "#products" },
        { id: 4, label: "Pants", href: "#products" },
      ],
      footerText: `© ${new Date().getFullYear()} BDENIM. All rights reserved.`,
      footerLinks: [
        { id: 1, label: "Telegram", href: "#" },
        { id: 2, label: "WhatsApp", href: "#" },
        { id: 3, label: "Privacy", href: "#" },
      ],
      contactTitle: "Get in Touch",
      contactDescription: "Order directly through our messaging channels.",
      currency: "₽",
      mainMarket: "RU",
    };
  }

  return (
    <html lang="tr">
      <body>
        <Navbar settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />

        {/* Side label - hidden on mobile */}
        <div className="fixed left-0 bottom-1/2 -rotate-90 translate-x-1/2 origin-[left_bottom] text-[11px] tracking-[4px] text-dim font-medium z-50 uppercase pl-5 max-lg:hidden">
          {settings.siteName || "BDENIM"}
        </div>
      </body>
    </html>
  );
}
