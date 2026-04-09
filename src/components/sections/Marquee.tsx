"use client";

export default function Marquee() {
  const items = [
    "OVERSIZED FITS", "★", "DARK AESTHETICS", "★", "LIMITED DROPS", "★",
    "STREETWEAR ESSENTIALS", "★", "ORDER VIA TELEGRAM", "★",
    "PREMIUM FABRICS", "★", "WORLDWIDE SHIPPING", "★",
  ];
  const content = items.join("   ");

  return (
    <div className="relative overflow-hidden py-3 select-none" style={{ background: "var(--t-marquee-bg)" }}>
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{ background: `linear-gradient(to right, var(--t-marquee-bg), transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{ background: `linear-gradient(to left, var(--t-marquee-bg), transparent)` }} />
      <div className="flex whitespace-nowrap animate-marquee">
        {[0,1,2].map(i => (
          <span key={i} className="text-[13px] font-semibold tracking-[4px] uppercase mx-4" style={{ color: "var(--t-marquee-text)" }}>
            {content}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
      `}</style>
    </div>
  );
}
