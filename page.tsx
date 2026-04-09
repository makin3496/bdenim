import { getHomepage, getServices, getBlogPosts, getSiteSettings } from "@/lib/strapi";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import CategoryGrid from "@/components/sections/CategoryGrid";
import ServicesSection from "@/components/sections/ServicesSection";
import Lookbook from "@/components/sections/Lookbook";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";

export const revalidate = 60;

export default async function HomePage() {
  let homepage, services, blogPosts, settings;

  try {
    [homepage, services, blogPosts, settings] = await Promise.all([
      getHomepage(),
      getServices(),
      getBlogPosts({ pageSize: 3 }),
      getSiteSettings(),
    ]);
  } catch (error) {
    console.error("Failed to fetch data from Strapi:", error);

    return (
      <div className="mt-[60px] min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-extrabold uppercase mb-4"><span className="text-accent">B</span>DENIM</h1>
          <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
          <h2 className="text-xl font-semibold mb-4 text-muted">Strapi CMS Bağlantısı Bekleniyor</h2>
          <p className="text-sm text-dim leading-relaxed mb-6">Frontend hazır! Strapi backend&apos;ini başlatman gerekiyor.</p>
          <div className="bg-bg-card border border-border rounded-lg p-6 text-left mb-6">
            <div className="text-xs text-accent tracking-widest uppercase font-semibold mb-3">Kurulum Adımları</div>
            <ol className="text-sm text-muted space-y-2 list-decimal list-inside">
              <li>Strapi projesini oluştur ve content type&apos;ları ekle</li>
              <li><code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-xs">.env.local</code> dosyasına API URL ve token yaz</li>
              <li>Strapi&apos;de örnek içerik ekle</li>
              <li>Bu sayfayı yenile</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero data={homepage} />
      <Marquee />
      <CategoryGrid />
      <ServicesSection services={services.data} settings={settings} />
      <Lookbook data={homepage} />
      <BlogSection posts={blogPosts.data} homepage={homepage} />
      <ContactSection settings={settings} />
    </>
  );
}
