"use client";

import { Diamond, ShieldCheck, Gem, Gift } from "lucide-react";

export default function FeatureStrip() {
  return (
    <section className="bg-black py-16 border-t border-b border-[#333]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-[#333]/50">
          
          <div className="flex flex-col items-center justify-center px-4 pt-8 md:pt-0 first:pt-0">
            <Diamond className="w-8 h-8 text-[var(--color-gold)] mb-4" strokeWidth={1} />
            <h4 className="text-xs font-bold text-[var(--color-offwhite)] uppercase tracking-widest mb-2">Curated Luxury</h4>
            <p className="text-[10px] text-[var(--color-gold)] uppercase tracking-[0.2em] italic font-serif opacity-80">Handpicked for you</p>
          </div>

          <div className="flex flex-col items-center justify-center px-4 pt-8 md:pt-0">
            <Gem className="w-8 h-8 text-[var(--color-gold)] mb-4" strokeWidth={1} />
            <h4 className="text-xs font-bold text-[var(--color-offwhite)] uppercase tracking-widest mb-2">Limited Editions</h4>
            <p className="text-[10px] text-[var(--color-gold)] uppercase tracking-[0.2em] italic font-serif opacity-80">Not for everyone</p>
          </div>

          <div className="flex flex-col items-center justify-center px-4 pt-8 md:pt-0">
            <ShieldCheck className="w-8 h-8 text-[var(--color-gold)] mb-4" strokeWidth={1} />
            <h4 className="text-xs font-bold text-[var(--color-offwhite)] uppercase tracking-widest mb-2">Private Access</h4>
            <p className="text-[10px] text-[var(--color-gold)] uppercase tracking-[0.2em] italic font-serif opacity-80">Exclusively yours</p>
          </div>

          <div className="flex flex-col items-center justify-center px-4 pt-8 md:pt-0">
            <Gift className="w-8 h-8 text-[var(--color-gold)] mb-4" strokeWidth={1} />
            <h4 className="text-xs font-bold text-[var(--color-offwhite)] uppercase tracking-widest mb-2">Personal Experience</h4>
            <p className="text-[10px] text-[var(--color-gold)] uppercase tracking-[0.2em] italic font-serif opacity-80">Curated with care</p>
          </div>

        </div>
        
        <div className="mt-24 mb-8 text-center flex flex-col items-center justify-center px-4">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-[var(--color-gold)] to-transparent mb-10 opacity-50"></div>
          
          <p className="text-xl md:text-3xl italic font-serif text-[var(--color-offwhite)] font-light leading-relaxed max-w-2xl relative">
            <span className="text-[var(--color-gold)] text-3xl md:text-5xl absolute -top-4 -left-6 md:-left-10 opacity-80">“</span>
            Because your worth has no price tag.
            <span className="text-[var(--color-gold)] text-3xl md:text-5xl absolute -bottom-6 -right-6 md:-right-8 opacity-80">”</span>
          </p>
          
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="w-8 h-[1px] bg-[var(--color-gold)] opacity-50"></div>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)] font-sans font-medium">Petals By Smira</span>
            <div className="w-8 h-[1px] bg-[var(--color-gold)] opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
