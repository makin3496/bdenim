import StrapiImage from "@/components/ui/StrapiImage";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Homepage } from "@/lib/types";

interface Props {
  data: Homepage;
}

export default function Hero({ data }: Props) {
  return (
    <section className="mt-[60px] min-h-[calc(100vh-60px)] grid grid-cols-2 max-lg:grid-cols-1 items-center px-12 max-md:px-6 py-20 max-md:py-12 pb-10 gap-10 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="hero-glow hero-glow-accent" />
      <div className="hero-glow hero-glow-teal" />

      {/* Content */}
      <div className="max-w-[620px] max-lg:max-w-full relative z-10">
        <ScrollReveal delay={100}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-0.5 bg-accent shadow-[0_0_10px_rgba(231,76,60,0.5)]" />
            <span className="text-[13px] font-semibold tracking-[4px] uppercase text-accent">
              {data.heroTagline}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <h1 className="text-[clamp(36px,6vw,80px)] font-black leading-[1.05] tracking-tight uppercase mb-7">
            {data.heroTitle}
            <br />
            <span className="text-accent" style={{ textShadow: '0 0 40px rgba(231,76,60,0.3)' }}>
              {data.heroHighlight}
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="text-[15px] max-md:text-sm text-muted leading-[1.8] mb-9 max-w-[480px]">
            {data.heroDescription}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="flex gap-4 mb-12 flex-wrap max-sm:flex-col">
            <a href={data.heroPrimaryButtonLink} className="btn-primary max-sm:justify-center">{data.heroPrimaryButtonText}</a>
            <a href={data.heroSecondaryButtonLink} className="btn-secondary max-sm:justify-center">{data.heroSecondaryButtonText}</a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <div className="flex border-t border-border pt-7 max-sm:flex-col max-sm:gap-4">
            {data.heroStats?.map((stat, i) => (
              <div key={stat.id} className={`flex-1 ${i < (data.heroStats?.length || 0) - 1 ? "border-r border-border mr-6 pr-6 max-sm:border-r-0 max-sm:mr-0 max-sm:pr-0 max-sm:border-b max-sm:pb-4" : ""}`}>
                <div className="text-[32px] max-md:text-[28px] font-extrabold tracking-wider mb-1">{stat.value}</div>
                <div className="text-[11px] text-dim tracking-[3px] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Hero Image */}
      <ScrollReveal variant="scale" delay={300} className="flex justify-center items-center max-lg:hidden relative z-10">
        <div className="relative w-full max-w-[520px] aspect-[3/4] rounded-lg overflow-hidden float-animation">
          {/* Glow behind image */}
          <div className="absolute -inset-4 bg-gradient-to-br from-[#0a8b6a]/30 via-[#15c39a]/20 to-[#0d9b7a]/30 rounded-2xl blur-2xl" />
          
          <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-[#0a8b6a] via-[#15c39a] to-[#0d9b7a] shadow-[0_20px_80px_rgba(13,155,122,0.3)]">
            {data.heroImage ? (
              <StrapiImage image={data.heroImage} fill priority sizes="(max-width: 1024px) 0vw, 50vw" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[120px] opacity-15">👤</div>
            )}

            {/* Gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            <svg className="absolute top-5 right-5 z-[2]" width="32" height="32" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="3" fill="white" opacity="0.8" />
              <line x1="16" y1="6" x2="16" y2="10" stroke="white" strokeWidth="1.5" opacity="0.5" />
              <line x1="16" y1="22" x2="16" y2="26" stroke="white" strokeWidth="1.5" opacity="0.5" />
              <line x1="6" y1="16" x2="10" y2="16" stroke="white" strokeWidth="1.5" opacity="0.5" />
              <line x1="22" y1="16" x2="26" y2="16" stroke="white" strokeWidth="1.5" opacity="0.5" />
            </svg>

            {data.campaignBadgeText && (
              <div className="absolute bottom-5 right-5 glass-card px-5 py-2.5 text-[11px] font-semibold tracking-[3px] uppercase z-[2] rounded-sm">
                {data.campaignBadgeText}
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
