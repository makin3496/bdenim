"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Service, SiteSettings } from "@/lib/types";

interface Props {
  services: Service[];
  settings: SiteSettings;
}

const CATEGORY_LABELS: Record<string, string> = {
  all: "Featured Drops",
  hoodie: "Oversized Hoodies",
  tee: "Graphic Tees",
  denim: "Straight & Wide Denim",
  pants: "Cargo & Utility Pants",
  limited: "Limited Editions",
};

export default function ServicesSection({ services, settings }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Service | null>(null);

  const categories = ["all", ...new Set(services.map((s) => s.category))];
  const filtered = activeCategory === "all" ? services : services.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* Gradient Divider */}
      <div className="gradient-divider" />

      {/* Categories */}
      <div className="flex px-12 max-md:px-6 h-14 border-b border-border overflow-x-auto scrollbar-hide category-bar-glow bg-bg-secondary/50">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-1 flex items-center justify-center text-xs font-medium tracking-[3px] uppercase
                       whitespace-nowrap px-4 min-w-fit border-r border-border last:border-r-0 cursor-pointer
                       transition-all duration-300 bg-transparent relative
                       ${activeCategory === cat
                         ? "text-accent after:content-[''] after:absolute after:bottom-0 after:left-1/4 after:right-1/4 after:h-[2px] after:bg-accent after:rounded-full after:shadow-[0_0_8px_rgba(231,76,60,0.5)]"
                         : "text-muted hover:text-white hover:bg-white/[0.02]"
                       }`}
          >
            {CATEGORY_LABELS[cat] || cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <section className="section-padding section-glow" id="products">
        <ScrollReveal>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl max-md:text-3xl font-extrabold uppercase tracking-wider">Latest Drop</h2>
              <p className="text-sm text-muted mt-2">
                {filtered.length} pieces — oversized fits, dark tones, statement silhouettes
              </p>
            </div>
            <a href="#" className="text-[13px] text-accent no-underline tracking-widest uppercase font-medium hover:text-accent-hover transition-colors max-md:hidden">
              View All →
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {filtered.map((item, i) => (
            <ScrollReveal key={item.id || i} delay={i * 80}>
              <ProductCard
                product={item}
                onSelect={() => setSelectedProduct(item)}
                currency={settings.currency}
                index={i}
              />
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted">No products found in this category.</div>
        )}
      </section>

      {selectedProduct && (
        <ProductModal product={selectedProduct} settings={settings} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
}
