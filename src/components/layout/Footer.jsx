"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary-dark)] text-[var(--color-offwhite)] pt-16 pb-8 border-t-[3px] border-[var(--color-gold)] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-serif font-bold text-[var(--color-gold)] mb-4 flex items-center gap-3">
                <img src="https://res.cloudinary.com/tbllydoh/image/upload/v1787316465/WhatsApp_Image_2026-08-21_at_6.01.28_PM.jpg" alt="Petals by Smira" className="h-10 w-auto rounded-md" />
                Petals by Smira
              </h2>
              <div className="text-[10px] tracking-[0.3em] font-light uppercase text-[var(--color-gold)] opacity-90 mt-1">
                Luxury Gifting
              </div>
            </Link>
            <p className="text-sm leading-relaxed opacity-80">
              Curated with love. Made to impress. Premium luxury gifting for birthdays, anniversaries, festivals, weddings, and milestones.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-black transition-colors font-bold text-sm">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-black transition-colors font-bold text-sm">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-black transition-colors font-bold text-sm">
                X
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[var(--color-gold)] mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-4 text-sm opacity-80">
              <li><Link href="/about" className="hover:text-[var(--color-gold)] transition-colors">About Us</Link></li>
              <li><Link href="/shop" className="hover:text-[var(--color-gold)] transition-colors">Shop All Gifts</Link></li>
              <li><Link href="/occasion/all" className="hover:text-[var(--color-gold)] transition-colors">Gift by Occasion</Link></li>
              <li><Link href="/corporate-gifting" className="hover:text-[var(--color-gold)] transition-colors">Corporate Gifting</Link></li>
              <li><Link href="/track-order" className="hover:text-[var(--color-gold)] transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[var(--color-gold)] mb-6 tracking-wide">Customer Care</h3>
            <ul className="space-y-4 text-sm opacity-80">
              <li><Link href="/shipping" className="hover:text-[var(--color-gold)] transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-[var(--color-gold)] transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/faqs" className="hover:text-[var(--color-gold)] transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-gold)] transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--color-gold)] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[var(--color-gold)] mb-6 tracking-wide">Get in Touch</h3>
            <ul className="space-y-4 text-sm opacity-80 mb-8">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                <span>+91 98765 43210 <br/><span className="text-xs opacity-75">(Mon-Sat, 10AM - 8PM)</span></span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-[var(--color-gold)] flex-shrink-0" />
                <span>petalsbysmira@gmail.com</span>
              </li>
            </ul>
            
            <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-2">Newsletter</label>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-transparent border border-gray-600 rounded-l-md px-4 py-2 w-full text-sm focus:outline-none focus:border-[var(--color-gold)]"
                />
                <button type="submit" className="bg-[var(--color-gold)] text-black px-4 py-2 rounded-r-md text-sm font-semibold hover:bg-opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-60">
          <p>© 2026 Petals by Smira. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span>Secure Checkout</span>
            <span>|</span>
            <span>100% Authentic</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
