"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-black text-[var(--color-offwhite)] pt-20 pb-10 border-t border-[#333] font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-50"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="inline-block group">
              <img 
                src="/logo.jpg" 
                alt="Petals by Smira" 
                className="h-24 w-auto object-contain scale-[1.7] transition-transform duration-500 group-hover:scale-[1.75]"
                style={{ mixBlendMode: 'screen', filter: 'contrast(2.5) brightness(0.8)' }}
              />
            </Link>
            <p className="text-xs leading-relaxed opacity-70 italic font-serif">
              "A statement, not just a jewel."
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-black transition-colors font-sans text-[10px] uppercase tracking-widest">
                IG
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-black transition-colors font-sans text-[10px] uppercase tracking-widest">
                FB
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-sans text-xs font-semibold text-[var(--color-gold)] mb-6 tracking-[0.2em] uppercase">Explore</h3>
            <ul className="space-y-3 text-xs tracking-wider uppercase opacity-70">
              <li><Link href="/" className="hover:text-[var(--color-gold)] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[var(--color-gold)] transition-colors">Our Story</Link></li>
              <li><Link href="/shop" className="hover:text-[var(--color-gold)] transition-colors">The Editions</Link></li>
              <li><Link href="/experience" className="hover:text-[var(--color-gold)] transition-colors">Experience</Link></li>
            </ul>
          </div>

          {/* Access Links */}
          <div>
            <h3 className="font-sans text-xs font-semibold text-[var(--color-gold)] mb-6 tracking-[0.2em] uppercase">Private Client</h3>
            <ul className="space-y-3 text-xs tracking-wider uppercase opacity-70">
              <li><Link href="/access" className="hover:text-[var(--color-gold)] transition-colors">Request Access</Link></li>
              <li><Link href="/access" className="hover:text-[var(--color-gold)] transition-colors">Access Policy</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-gold)] transition-colors">Private Assistance</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans text-xs font-semibold text-[var(--color-gold)] mb-6 tracking-[0.2em] uppercase">Concierge</h3>
            <ul className="space-y-4 text-xs opacity-70 tracking-wider">
              <li className="flex items-start">
                <Phone className="h-4 w-4 mr-3 text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                <span>+91 98765 43210 <br/><span className="text-[10px] opacity-75">(Private Consultation)</span></span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-[var(--color-gold)] flex-shrink-0" />
                <span>concierge@petalsbysmira.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#222] pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] opacity-50 uppercase tracking-[0.2em]">
          <p>© 2026 Petals by Smira. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Exclusive Access</span>
            <span>|</span>
            <span>Curated Luxury</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
