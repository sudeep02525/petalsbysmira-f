"use client";

import { Diamond, ShieldCheck, Gem, Gift } from "lucide-react";

const ICON_MAP = {
  diamond: Diamond,
  gem: Gem,
  shield: ShieldCheck,
  gift: Gift,
};

export default function FeatureStrip({ settings }) {
  const features = settings?.features?.length === 4 ? settings.features : [
    { icon: "diamond", title: "Curated Luxury", subtitle: "Handpicked for you" },
    { icon: "gem", title: "Limited Editions", subtitle: "Not for everyone" },
    { icon: "shield", title: "Private Access", subtitle: "Exclusively yours" },
    { icon: "gift", title: "Personal Experience", subtitle: "Curated with care" },
  ];

  const closingQuote = settings?.closingQuote || "Because your worth has no price tag.";
  const brandName = settings?.brandName || "Petals by Smira";

  return (
    <section className="bg-black py-16 border-t border-b border-[#333]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-[#333]/50">
          {features.map((feature, idx) => {
            const IconComponent = ICON_MAP[feature.icon] || Diamond;
            return (
              <div key={idx} className="flex flex-col items-center justify-center px-4 pt-8 md:pt-0 first:pt-0">
                <IconComponent className="w-8 h-8 text-[var(--color-gold)] mb-4" strokeWidth={1} />
                <h4 className="text-xs font-bold text-[var(--color-offwhite)] uppercase tracking-widest mb-2">
                  {feature.title}
                </h4>
                <p className="text-[10px] text-[var(--color-gold)] uppercase tracking-[0.2em] italic font-serif opacity-80">
                  {feature.subtitle}
                </p>
              </div>
            );
          })}
        </div>
        
        {closingQuote && (
          <div className="mt-24 mb-8 text-center flex flex-col items-center justify-center px-4">
            <p className="text-xl md:text-3xl italic font-serif text-[var(--color-offwhite)] font-light leading-relaxed max-w-2xl relative">
              <span className="text-[var(--color-gold)] text-3xl md:text-5xl absolute -top-4 -left-6 md:-left-10 opacity-80">“</span>
              {closingQuote}
              <span className="text-[var(--color-gold)] text-3xl md:text-5xl absolute -bottom-6 -right-6 md:-right-8 opacity-80">”</span>
            </p>
            
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="w-8 h-[1px] bg-[var(--color-gold)] opacity-50"></div>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)] font-sans font-medium">
                {brandName}
              </span>
              <div className="w-8 h-[1px] bg-[var(--color-gold)] opacity-50"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
