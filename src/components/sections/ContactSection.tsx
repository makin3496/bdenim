import { TelegramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { SiteSettings } from "@/lib/types";

interface Props {
  settings: SiteSettings;
}

export default function ContactSection({ settings }: Props) {
  return (
    <>
      <div className="gradient-divider" />
      <section className="section-padding bg-bg-secondary relative overflow-hidden" id="contact">
        {/* Ambient glow */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-telegram/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-whatsapp/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-16 max-md:gap-10 max-w-[1100px] relative z-10">
          <ScrollReveal variant="left">
            <div>
              <h2 className="text-4xl max-md:text-3xl font-extrabold uppercase mb-4">
                {settings.contactTitle || "Get in Touch"}
              </h2>
              <p className="text-[15px] max-md:text-sm text-muted leading-[1.8] mb-8">
                {settings.contactDescription || "Order directly through our messaging channels."}
              </p>

              <div className="flex flex-col gap-4">
                {settings.telegramUrl && (
                  <a href={settings.telegramUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 px-5 glass-card rounded-lg transition-all duration-300
                               hover:border-telegram/50 hover:shadow-[0_0_20px_rgba(0,136,204,0.1)] no-underline text-white active:scale-[0.98] group">
                    <div className="w-11 h-11 rounded-full bg-telegram/15 text-telegram flex items-center justify-center flex-shrink-0 group-hover:bg-telegram/25 transition-colors">
                      <TelegramIcon className="w-[22px] h-[22px]" />
                    </div>
                    <div>
                      <div className="text-[15px] font-medium">Telegram</div>
                      <div className="text-xs text-dim mt-0.5">Fastest way to order — instant replies</div>
                    </div>
                  </a>
                )}
                {settings.whatsappUrl && (
                  <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 px-5 glass-card rounded-lg transition-all duration-300
                               hover:border-whatsapp/50 hover:shadow-[0_0_20px_rgba(37,211,102,0.1)] no-underline text-white active:scale-[0.98] group">
                    <div className="w-11 h-11 rounded-full bg-whatsapp/15 text-whatsapp flex items-center justify-center flex-shrink-0 group-hover:bg-whatsapp/25 transition-colors">
                      <WhatsAppIcon className="w-[22px] h-[22px]" />
                    </div>
                    <div>
                      <div className="text-[15px] font-medium">WhatsApp</div>
                      <div className="text-xs text-dim mt-0.5">Send us a message anytime</div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="right" delay={200}>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 max-md:flex-col">
                <input type="text" placeholder="Name" className="form-input-mobile flex-1 px-[18px] py-3.5 bg-white/[0.03] border border-white/[0.06] rounded-md text-white text-sm outline-none transition-all focus:border-accent/50 focus:shadow-[0_0_15px_rgba(231,76,60,0.1)] placeholder:text-dim" />
                <input type="email" placeholder="Email" className="form-input-mobile flex-1 px-[18px] py-3.5 bg-white/[0.03] border border-white/[0.06] rounded-md text-white text-sm outline-none transition-all focus:border-accent/50 focus:shadow-[0_0_15px_rgba(231,76,60,0.1)] placeholder:text-dim" />
              </div>
              <input type="text" placeholder="Subject" className="form-input-mobile px-[18px] py-3.5 bg-white/[0.03] border border-white/[0.06] rounded-md text-white text-sm outline-none transition-all focus:border-accent/50 focus:shadow-[0_0_15px_rgba(231,76,60,0.1)] placeholder:text-dim" />
              <textarea placeholder="Your message..." className="form-input-mobile px-[18px] py-3.5 bg-white/[0.03] border border-white/[0.06] rounded-md text-white text-sm outline-none transition-all focus:border-accent/50 focus:shadow-[0_0_15px_rgba(231,76,60,0.1)] placeholder:text-dim min-h-[120px] resize-y" />
              <button className="btn-primary w-fit">Send Message</button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
