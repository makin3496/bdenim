"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const categories = [
  { name: "Hoodies", slug: "hoodie", emoji: "🧥", gradient: "from-[#1a1a2e] to-[#16213e]" },
  { name: "Tees", slug: "tee", emoji: "👕", gradient: "from-[#2d1b2e] to-[#1a1a2e]" },
  { name: "Denim", slug: "denim", emoji: "👖", gradient: "from-[#1b2d1b] to-[#1a2e1a]" },
  { name: "Pants", slug: "pants", emoji: "🩳", gradient: "from-[#2e2d1b] to-[#2e1a1a]" },
  { name: "Limited", slug: "limited", emoji: "🔥", gradient: "from-[#2e1a1a] to-[#1a1a2e]" },
  { name: "New Drops", slug: "all", emoji: "✦", gradient: "from-[#1a2e2e] to-[#1a1a2e]" },
];

export default function CategoryGrid() {
  const scrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="px-12 max-md:px-6 py-10 max-md:py-6">
      <ScrollReveal>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[12px] font-semibold tracking-[3px] uppercase" style={{ color: "var(--t-accent)" }}>Categories</span>
          <div className="flex-1 h-[1px]" style={{ background: "var(--t-border)" }} />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="grid grid-cols-6 gap-3 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              onClick={scrollToProducts}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group bg-gradient-to-br ${cat.gradient} border border-white/[0.04] transition-all duration-400 hover:border-white/[0.12] hover:scale-[1.03] hover:shadow-[0_8px_30px_var(--t-shadow)]`}
            >
              {/* Dot pattern */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "20px 20px"
              }} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
                <div className="text-[32px] max-md:text-[28px] transition-transform duration-400 group-hover:scale-110 group-hover:-translate-y-1">
                  {cat.emoji}
                </div>
                <h3 className="text-[13px] max-md:text-[12px] font-bold uppercase tracking-[3px] text-white">
                  {cat.name}
                </h3>
              </div>

              {/* Bottom accent on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: "var(--t-accent)" }} />
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
