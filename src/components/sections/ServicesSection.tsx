"use client";

import { useState } from "react";
import CategoryCarousel from "./CategoryCarousel";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Service, SiteSettings } from "@/lib/types";

interface Props {
  services: Service[];
  settings: SiteSettings;
}

const CATEGORY_ORDER = [
  { key: "hoodie", label: "Hoodies" },
  { key: "tee", label: "Tees" },
  { key: "denim", label: "Denim" },
  { key: "pants", label: "Pants" },
  { key: "limited", label: "Limited Edition" },
];

export default function ServicesSection({ services, settings }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Service | null>(null);

  // Group products by category
  const grouped = CATEGORY_ORDER.map((cat) => ({
    ...cat,
    products: services.filter((s) => s.category === cat.key),
  })).filter((cat) => cat.products.length > 0);

  return (
    <>
      {/* Gradient Divider */}
      <div className="gradient-divider" />

      {/* Category Carousels */}
      <section className="py-16 max-md:py-10" id="products">
        <ScrollReveal>
          <div className="px-12 max-md:px-6 mb-10">
            <h2 className="text-4xl max-md:text-3xl font-extrabold uppercase tracking-wider" style={{ color: "var(--t-text)" }}>
              Latest Drop
            </h2>
            <p className="text-sm mt-2" style={{ color: "var(--t-text-muted)" }}>
              {services.length} pieces — oversized fits, dark tones, statement silhouettes
            </p>
          </div>
        </ScrollReveal>

        {grouped.map((cat, i) => (
          <ScrollReveal key={cat.key} delay={i * 100}>
            <CategoryCarousel
              title={cat.label}
              products={cat.products}
              settings={settings}
              onSelectProduct={setSelectedProduct}
            />
          </ScrollReveal>
        ))}
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          settings={settings}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
