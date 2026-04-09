"use client";

import StrapiImage from "@/components/ui/StrapiImage";
import type { Service } from "@/lib/types";

interface Props {
  product: Service;
  onSelect: (product: Service) => void;
  currency?: string;
  index?: number;
}

export default function ProductCard({ product, onSelect, currency = "₽", index = 0 }: Props) {
  const gradients = [
    "from-[#1a1a2e] via-[#16213e] to-[#0f1923]",
    "from-[#2d1b2e] via-[#1a1a2e] to-[#15101a]",
    "from-[#1b2d1b] via-[#1a2e1a] to-[#0f1a0f]",
    "from-[#2e2d1b] via-[#2e1a1a] to-[#1a1210]",
    "from-[#1a2e2e] via-[#1a1a2e] to-[#10151a]",
    "from-[#2e1a2e] via-[#1a1a2e] to-[#15101a]",
    "from-[#1a2e1b] via-[#2e2e1a] to-[#1a1a10]",
    "from-[#2e1b1b] via-[#1a1a2e] to-[#101015]",
  ];

  return (
    <div
      onClick={() => onSelect(product)}
      className="glass-card rounded-md cursor-pointer product-card-hover group overflow-hidden"
    >
      <div className={`w-full aspect-[3/4] flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]}`}>
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/[0.02]" />

        {product.badge && (
          <div className="absolute top-3 left-3 bg-accent text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-sm z-[1] badge-pulse shadow-[0_2px_10px_rgba(231,76,60,0.4)]">
            {product.badge}
          </div>
        )}

        {product.image ? (
          <StrapiImage image={product.image} fill sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw" className="transition-transform duration-700 ease-out group-hover:scale-110" />
        ) : (
          <div className="text-[56px] opacity-10 relative z-[1]">🧥</div>
        )}

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-all duration-400 max-md:hidden">
          <span className="px-7 py-3 bg-white/95 text-[#111] text-[13px] font-semibold tracking-widest uppercase rounded-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400 shadow-lg">
            View Details
          </span>
        </div>

        {/* Mobile tap indicator */}
        <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full items-center justify-center hidden max-md:flex">
          <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>

      <div className="p-5 max-md:p-4 border-t border-white/[0.04]">
        <h3 className="text-[15px] max-md:text-sm font-semibold mb-1.5 group-hover:text-accent transition-colors duration-300">{product.name}</h3>
        <p className="text-xs text-dim tracking-wider uppercase mb-3">{product.categoryLabel}</p>
        <div className="flex justify-between items-center">
          <div className="text-lg max-md:text-base font-bold">
            {currency} {product.price?.toLocaleString()}
            {product.oldPrice && (
              <span className="text-[13px] text-dim line-through font-normal ml-2">
                {currency} {product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
