"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-[var(--color-black)] text-[var(--color-offwhite)] pt-24 pb-8 border-t border-[var(--color-gold)]/20 font-sans relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[100px] bg-[var(--color-gold)] blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="inline-block group -ml-4 md:-ml-8">
              <img 
                src="/logo.jpg" 
                alt="Petals by Smira" 
                className="h-20 w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                style={{ mixBlendMode: 'screen', filter: 'contrast(1.5)' }}
              />
            </Link>
            <p className="text-sm leading-relaxed opacity-70 italic font-serif max-w-xs">
              &ldquo;A statement, not just a jewel.&rdquo;
            </p>
            <p className="text-xs opacity-50 max-w-xs font-light leading-loose">
              Crafting timeless luxury and exquisite diamond creations for the modern connoisseur.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-xs font-semibold text-[var(--color-gold)] mb-8 tracking-[0.2em] uppercase">Maison</h3>
            <ul className="space-y-4 text-xs tracking-[0.1em] uppercase opacity-70">
              <li><Link href="/" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">Home</Link></li>
              <li><Link href="/our-story" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">Our Story</Link></li>
              <li><Link href="/editions" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">Collections</Link></li>
              <li><Link href="/experience" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">Experience</Link></li>
            </ul>
          </div>

          {/* Access Links */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-xs font-semibold text-[var(--color-gold)] mb-8 tracking-[0.2em] uppercase">Clientele</h3>
            <ul className="space-y-4 text-xs tracking-[0.1em] uppercase opacity-70">
              <li><Link href="/request-access" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">Private Access</Link></li>
              <li><Link href="/corporate-gifting" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">Bespoke Services</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">Care Guide</Link></li>
              <li><Link href="/faq" className="hover:text-[var(--color-gold)] hover:translate-x-1 inline-block transition-all duration-300">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-xs font-semibold text-[var(--color-gold)] mb-8 tracking-[0.2em] uppercase">Concierge</h3>
            <ul className="space-y-6 text-xs opacity-70 tracking-wider font-light">
              <li className="flex items-start group">
                <MapPin className="h-4 w-4 mr-4 text-[var(--color-gold)] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed">Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-start group">
                <Phone className="h-4 w-4 mr-4 text-[var(--color-gold)] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>+91 98765 43210 <br/><span className="text-[10px] opacity-75 mt-1 block">(Private Consultation)</span></span>
              </li>
              <li className="flex items-center group">
                <Mail className="h-4 w-4 mr-4 text-[var(--color-gold)] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:concierge@petalsbysmira.in" className="hover:text-[var(--color-gold)] transition-colors">concierge@petalsbysmira.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] opacity-50 uppercase tracking-[0.2em] text-center md:text-left">
            © {new Date().getFullYear()} Petals by Smira. All Rights Reserved.
          </p>
          
          <div className="flex items-center space-x-4">
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

          <div className="flex space-x-6 text-[10px] opacity-50 uppercase tracking-[0.1em] text-center md:text-right">
            <Link href="/privacy" className="hover:text-[var(--color-gold)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--color-gold)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
