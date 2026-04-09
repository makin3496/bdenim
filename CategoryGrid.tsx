"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const categories = [
  {
    name: "Hoodies",
    slug: "hoodie",
    description: "Oversized & heavyweight",
    emoji: "🧥",
    gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
    accent: "rgba(15, 52, 96, 0.3)",
  },
  {
    name: "Tees",
    slug: "tee",
    description: "Graphic & minimal",
    emoji: "👕",
    gradient: "from-[#2d1b2e] via-[#1a1a2e] to-[#462255]",
    accent: "rgba(70, 34, 85, 0.3)",
  },
  {
    name: "Denim",
    slug: "denim",
    description: "Raw & washed cuts",
    emoji: "👖",
    gradient: "from-[#1b2d1b] via-[#1a2e1a] to-[#1a3a1a]",
    accent: "rgba(26, 58, 26, 0.3)",
  },
  {
    name: "Pants",
    slug: "pants",
    description: "Cargo & utility",
    emoji: "🩳",
    gradient: "from-[#2e2d1b] via-[#2e1a1a] to-[#3a2a1a]",
    accent: "rgba(58, 42, 26, 0.3)",
  },
];

export default function CategoryGrid() {
  const scrollToProducts = (slug: string) => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-accent/[0.04] rounded-full blur-[80px] pointer-events-none" />

      <ScrollReveal>
        <div className="text-center mb-12">
          <span className="text-[13px] font-semibold tracking-[4px] uppercase text-accent">Categories</span>
          <h2 className="text-4xl max-md:text-3xl font-extrabold uppercase tracking-wider mt-3">
            Shop by <span className="text-accent">Category</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {categories.map((cat, i) => (
          <ScrollReveal key={cat.slug} delay={i * 100}>
            <div
              onClick={() => scrollToProducts(cat.slug)}
              className={`relative aspect-[4/5] max-lg:aspect-[3/2] rounded-lg overflow-hidden cursor-pointer group bg-gradient-to-br ${cat.gradient} border border-white/[0.04] transition-all duration-500 hover:border-white/[0.1] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]`}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }} />

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                <div className="text-[64px] max-md:text-[48px] mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                  {cat.emoji}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest mb-1 transition-transform duration-500 group-hover:-translate-y-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted tracking-wider uppercase opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {cat.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
