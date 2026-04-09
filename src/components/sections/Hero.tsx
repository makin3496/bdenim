import StrapiImage from "@/components/ui/StrapiImage";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Homepage } from "@/lib/types";

interface Props {
  data: Homepage;
}

export default function Hero({ data }: Props) {
  return (
    <section className="mt-[80px] max-md:mt-[70px] min-h-[calc(100vh-80px)] relative overflow-hidden flex items-center">
      {/* Background Image - full quality */}
      <div className="absolute inset-0 z-0">
        {data.heroImage ? (
          <StrapiImage image={data.heroImage} fill priority sizes="100vw" className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0a8b6a] via-[#15c39a] to-[#0d9b7a]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[200px] max-md:text-[120px] opacity-10">👤</div>
            </div>
          </div>
        )}
      </div>

      {/* Gradient - only left 55%, right stays clean */}
      <div className="absolute inset-0 z-[1] max-md:hidden" style={{
        background: "linear-gradient(to right, rgba(20,20,20,1) 0%, rgba(20,20,20,0.95) 15%, rgba(20,20,20,0.75) 30%, rgba(20,20,20,0.3) 48%, transparent 62%)"
      }} />

      {/* Mobile overlay */}
      <div className="absolute inset-0 z-[1] hidden max-md:block" style={{
        background: "linear-gradient(to bottom, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.6) 40%, rgba(20,20,20,0.4) 60%, rgba(20,20,20,0.7) 100%)"
      }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-[1]" style={{
        background: "linear-gradient(to top, var(--t-bg), transparent)"
      }} />

      {/* Content */}
      <div className="relative z-[2] w-full px-12 max-md:px-6 py-20 max-md:py-12">
        <div className="max-w-[560px]">
          <ScrollReveal delay={100}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-0.5" style={{ background: "var(--t-accent)", boxShadow: "0 0 10px var(--t-badge-shadow)" }} />
              <span className="text-[13px] font-semibold tracking-[4px] uppercase" style={{ color: "var(--t-accent)" }}>
                {data.heroTagline}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h1 className="text-[clamp(40px,7vw,88px)] font-black leading-[1.02] tracking-tight uppercase mb-7 text-white">
              {data.heroTitle}
              <br />
              <span style={{ color: "var(--t-accent)", textShadow: "0 0 60px var(--t-badge-shadow)" }}>
                {data.heroHighlight}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="text-[16px] max-md:text-sm leading-[1.8] mb-9 max-w-[440px] text-white/60">
              {data.heroDescription}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex gap-4 mb-14 flex-wrap max-sm:flex-col">
              <a href={data.heroPrimaryButtonLink} className="btn-primary max-sm:justify-center">{data.heroPrimaryButtonText}</a>
              <a href={data.heroSecondaryButtonLink} className="btn-secondary max-sm:justify-center border-white/20 text-white hover:border-white/40">{data.heroSecondaryButtonText}</a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <div className="flex pt-7 border-t border-white/10 max-sm:flex-col max-sm:gap-4">
              {data.heroStats?.map((stat, i) => (
                <div key={stat.id} className={`flex-1 ${i < (data.heroStats?.length || 0) - 1 ? "border-r border-white/10 mr-6 pr-6 max-sm:border-r-0 max-sm:mr-0 max-sm:pr-0 max-sm:border-b max-sm:border-white/10 max-sm:pb-4" : ""}`}>
                  <div className="text-[32px] max-md:text-[28px] font-extrabold tracking-wider mb-1 text-white">{stat.value}</div>
                  <div className="text-[11px] tracking-[3px] uppercase text-white/35">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Campaign Badge */}
      {data.campaignBadgeText && (
        <div className="absolute bottom-8 right-12 max-md:right-6 z-[2]">
          <div className="px-5 py-2.5 text-[11px] font-semibold tracking-[3px] uppercase rounded-sm text-white bg-black/40 backdrop-blur-md border border-white/10">
            {data.campaignBadgeText}
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2 opacity-40 max-md:hidden text-white/50">
        <span className="text-[10px] tracking-[3px] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
