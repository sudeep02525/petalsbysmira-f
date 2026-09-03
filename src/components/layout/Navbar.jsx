"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const bgRef = useRef(null);
  const navContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    if (isScrolled) {
      // Smooth fade-in effect for the background
      gsap.to(bgRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      // Shrink the navbar height smoothly
      gsap.to(navContainerRef.current, {
        height: "5.5rem",
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      // Fade out
      gsap.to(bgRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
      // Expand back to original height
      gsap.to(navContainerRef.current, {
        height: "6rem",
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [isScrolled]);

  return (
    <header className="fixed top-0 z-50 w-full font-sans">
      
      {/* GSAP Animated Background layer */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 w-full h-full bg-black/70 backdrop-blur-md shadow-2xl border-b border-[#222]" 
        style={{ opacity: 0 }}
      ></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div ref={navContainerRef} className="flex justify-between items-center h-24">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link href="/" className="flex items-center justify-center group">
              <img 
                src="/logo.png" 
                alt="Petals by Smira" 
                className="h-12 object-contain scale-[1.7] transition-transform duration-500"
                style={{ mixBlendMode: 'screen', filter: 'contrast(2.5) brightness(0.8)' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 lg:space-x-12 items-center text-xs lg:text-sm font-medium tracking-widest uppercase text-[var(--color-offwhite)]">
            <Link href="/" className="relative group hover:text-[var(--color-gold)] transition-colors duration-300">
              Home
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--color-gold)] transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
            <Link href="/our-story" className="relative group hover:text-[var(--color-gold)] transition-colors duration-300">
              Our Story
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--color-gold)] transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
            <Link href="/editions" className="relative group hover:text-[var(--color-gold)] transition-colors duration-300">
              The Editions
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--color-gold)] transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
            <Link href="/experience" className="relative group hover:text-[var(--color-gold)] transition-colors duration-300">
              Experience
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--color-gold)] transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right CTA / Mobile Menu */}
          <div className="flex items-center space-x-5 flex-shrink-0 relative z-50">
            <Link 
              href="/request-access" 
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-[#0a0a0a]/60 backdrop-blur-md border border-[var(--color-gold)] text-[var(--color-gold)] text-[10px] font-medium uppercase tracking-[0.25em] hover:bg-[var(--color-gold)] hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              Request Access
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 -mr-2 text-[var(--color-gold)] md:hidden hover:opacity-70 transition-opacity z-50`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 flex flex-col justify-center items-center ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center space-y-8 text-center mt-10">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-[var(--color-offwhite)] hover:text-[var(--color-gold)] tracking-wide transition-colors">
            Home
          </Link>
          <Link href="/our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-[var(--color-offwhite)] hover:text-[var(--color-gold)] tracking-wide transition-colors">
            Our Story
          </Link>
          <Link href="/editions" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-[var(--color-offwhite)] hover:text-[var(--color-gold)] tracking-wide transition-colors">
            The Editions
          </Link>
          <Link href="/experience" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-[var(--color-offwhite)] hover:text-[var(--color-gold)] tracking-wide transition-colors">
            Experience
          </Link>
          
          <div className="pt-8 w-full px-8">
            <Link 
              href="/request-access" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center border border-[var(--color-gold)] text-[var(--color-gold)] px-8 py-4 text-xs font-sans tracking-[0.25em] uppercase hover:bg-[var(--color-gold)] hover:text-black transition-all"
            >
              REQUEST ACCESS
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
