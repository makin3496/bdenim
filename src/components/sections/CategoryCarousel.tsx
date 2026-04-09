"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";
import type { Service, SiteSettings } from "@/lib/types";

interface Props {
  title: string;
  products: Service[];
  settings: SiteSettings;
  onSelectProduct: (product: Service) => void;
}

export default function CategoryCarousel({ title, products, settings, onSelectProduct }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth / 4 + 24;
    const amount = direction === "left" ? -cardWidth : cardWidth;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <div className="mb-14 max-md:mb-10">
      {/* Title */}
      <div className="flex items-center justify-between mb-6 px-12 max-md:px-6">
        <h2 className="text-2xl max-md:text-xl font-bold uppercase tracking-wider" style={{ color: "var(--t-text)" }}>
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-105 border-none"
            style={{ background: "var(--t-glass-bg)", border: "1px solid var(--t-glass-border)", color: "var(--t-text)" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-105 border-none"
            style={{ background: "var(--t-glass-bg)", border: "1px solid var(--t-glass-border)", color: "var(--t-text)" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide px-12 max-md:px-6 scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((product, i) => (
            <div
              key={product.id || i}
              className="flex-shrink-0 w-[calc(25%-15px)] max-lg:w-[calc(33.33%-14px)] max-md:w-[calc(50%-10px)] max-sm:w-[75%]"
              style={{ scrollSnapAlign: "start" }}
            >
              <ProductCard
                product={product}
                onSelect={() => onSelectProduct(product)}
                currency={settings.currency}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
