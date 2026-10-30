"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-black)] text-[var(--color-offwhite)] pt-16 sm:pt-24 pb-10 border-t border-[var(--color-gold)]/20 font-sans relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[100px] bg-[var(--color-gold)] blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-x-6 sm:gap-x-8 gap-y-10 lg:gap-8 mb-16 sm:mb-20">
          
          {/* Brand Column - Left aligned across all breakpoints */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-4 sm:space-y-6 flex flex-col items-start text-left">
            <Link href="/" className="inline-block group">
              <img 
                src="/logo.jpg" 
                alt="Petals by Smira" 
                className="h-16 sm:h-20 w-auto object-contain transition-transform duration-700 group-hover:scale-105 -translate-x-[19%] origin-left"
                style={{ mixBlendMode: 'screen', filter: 'contrast(1.5)' }}
              />
            </Link>
            <p className="text-sm leading-relaxed opacity-75 italic font-serif max-w-sm text-left">
              &ldquo;A statement, not just a jewel.&rdquo;
            </p>
            <p className="text-xs opacity-50 max-w-sm font-light leading-relaxed text-left">
              Crafting timeless luxury and exquisite diamond creations for the modern connoisseur.
            </p>
          </div>

          {/* Navigation Links - Maison */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 text-left">
            <h3 className="font-sans text-xs font-semibold text-[var(--color-gold)] mb-5 lg:mb-8 tracking-[0.2em] uppercase">
              Maison
            </h3>
            <ul className="space-y-3.5 text-xs tracking-[0.1em] uppercase opacity-70">
              <li><Link href="/" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">Home</Link></li>
              <li><Link href="/our-story" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">Our Story</Link></li>
              <li><Link href="/editions" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">Collections</Link></li>
              <li><Link href="/experience" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">Experience</Link></li>
            </ul>
          </div>

          {/* Access Links - Clientele */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-left">
            <h3 className="font-sans text-xs font-semibold text-[var(--color-gold)] mb-5 lg:mb-8 tracking-[0.2em] uppercase">
              Clientele
            </h3>
            <ul className="space-y-3.5 text-xs tracking-[0.1em] uppercase opacity-70">
              <li><Link href="/request-access" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">Private Access</Link></li>
              <li><Link href="/corporate-gifting" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">Bespoke Services</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">Care Guide</Link></li>
              <li><Link href="/faq" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact - Concierge */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3 pt-6 sm:pt-8 md:pt-0 border-t border-white/10 md:border-t-0 text-left">
            <h3 className="font-sans text-xs font-semibold text-[var(--color-gold)] mb-5 lg:mb-8 tracking-[0.2em] uppercase">
              Concierge
            </h3>
            <ul className="space-y-4 text-xs opacity-70 tracking-wider font-light">
              <li className="flex items-start gap-3 group">
                <MapPin className="h-4 w-4 text-[var(--color-gold)] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed">Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone className="h-4 w-4 text-[var(--color-gold)] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed">
                  {process.env.NEXT_PUBLIC_CONCIERGE_PHONE || (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}` : "+91 99206 88099")}{" "}
                  <br />
                  <span className="text-[10px] opacity-75 mt-0.5 block">(Private Consultation)</span>
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="h-4 w-4 text-[var(--color-gold)] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:petalsbysmira@gmail.com" className="hover:text-[var(--color-gold)] transition-colors break-all">
                  petalsbysmira@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Left aligned on mobile, space-between on desktop */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-[10px] opacity-50 uppercase tracking-[0.2em] text-left order-2 md:order-1">
            © {new Date().getFullYear()} Petals by Smira. All Rights Reserved.
          </p>
          
          <div className="flex items-center space-x-4 order-1 md:order-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 text-white/70 flex items-center justify-center hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] hover:text-black transition-all font-sans text-[10px] uppercase tracking-widest" aria-label="Instagram">
              IG
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 text-white/70 flex items-center justify-center hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] hover:text-black transition-all font-sans text-[10px] uppercase tracking-widest" aria-label="Facebook">
              FB
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 text-white/70 flex items-center justify-center hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] hover:text-black transition-all font-sans text-[10px] uppercase tracking-widest" aria-label="Twitter">
              X
            </a>
          </div>

          <div className="flex space-x-6 text-[10px] opacity-50 uppercase tracking-[0.1em] text-left md:text-right order-3 md:order-3">
            <Link href="/privacy" className="hover:text-[var(--color-gold)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--color-gold)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
