import StrapiImage from "@/components/ui/StrapiImage";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Homepage } from "@/lib/types";

interface Props {
  data: Homepage;
}

export default function Lookbook({ data }: Props) {
  return (
    <section className="section-padding grid grid-cols-2 max-lg:grid-cols-1 gap-12 items-center relative overflow-hidden" id="about">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <ScrollReveal variant="left">
        <div className="aspect-[4/5] rounded-lg overflow-hidden relative group">
          {/* Glow behind */}
          <div className="absolute -inset-2 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative w-full h-full glass-card rounded-lg flex items-center justify-center overflow-hidden">
            {data.lookbookImage ? (
              <StrapiImage image={data.lookbookImage} fill sizes="(max-width: 1024px) 100vw, 50vw" className="group-hover:scale-105 transition-transform duration-700" />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-[1px] bg-dim" />
                <span className="text-sm tracking-[6px] text-dim font-semibold uppercase">LOOKBOOK</span>
                <div className="w-16 h-[1px] bg-dim" />
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
          </div>
        </div>
      </ScrollReveal>

      <div className="relative z-10">
        <ScrollReveal variant="right" delay={100}>
          <h2 className="text-[42px] max-md:text-[32px] font-extrabold uppercase leading-[1.1] mb-6">
            {data.lookbookTitle}<br />
            <em className="text-accent not-italic" style={{ textShadow: '0 0 30px rgba(231,76,60,0.2)' }}>
              {data.lookbookHighlight}
            </em>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="right" delay={200}>
          <p className="text-[15px] max-md:text-sm text-muted leading-[1.8] mb-8 max-w-[440px]">{data.lookbookDescription}</p>
        </ScrollReveal>

        <ScrollReveal variant="right" delay={300}>
          <div className="flex flex-col gap-4 mb-9">
            {data.lookbookFeatures?.map((feature) => (
              <div key={feature.id} className="flex items-center gap-3 text-sm text-muted group/feat hover:text-white transition-colors duration-300">
                <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 shadow-[0_0_6px_rgba(231,76,60,0.5)] group-hover/feat:shadow-[0_0_12px_rgba(231,76,60,0.8)] transition-all" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="right" delay={400}>
          <a href={data.lookbookButtonLink || "#products"} className="btn-primary">{data.lookbookButtonText || "Shop Now"}</a>
        </ScrollReveal>
      </div>
    </section>
  );
}
