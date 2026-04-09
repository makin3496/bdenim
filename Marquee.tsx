"use client";

export default function Marquee() {
  const items = [
    "OVERSIZED FITS",
    "★",
    "DARK AESTHETICS",
    "★",
    "LIMITED DROPS",
    "★",
    "STREETWEAR ESSENTIALS",
    "★",
    "ORDER VIA TELEGRAM",
    "★",
    "PREMIUM FABRICS",
    "★",
    "WORLDWIDE SHIPPING",
    "★",
  ];

  const content = items.join("   ");

  return (
    <div className="relative overflow-hidden bg-accent py-3 select-none">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-accent to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-accent to-transparent z-10" />

      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-[13px] font-semibold tracking-[4px] uppercase text-white/90 mx-4">
          {content}
        </span>
        <span className="text-[13px] font-semibold tracking-[4px] uppercase text-white/90 mx-4">
          {content}
        </span>
        <span className="text-[13px] font-semibold tracking-[4px] uppercase text-white/90 mx-4">
          {content}
        </span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
