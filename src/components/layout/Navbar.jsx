"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const pathname = usePathname();
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
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      // Mobile: skip height animation to prevent scroll jumps, only fade background
      gsap.to(bgRef.current, { opacity: isScrolled ? 1 : 0, duration: 0.3 });
      return;
    }

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
      
      {/* Background layer */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 w-full h-full bg-black shadow-2xl border-b border-[#222]" 
        style={{ opacity: 0 }}
      ></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={navContainerRef} className="flex justify-between items-center h-24 relative">
          
          {/* Mobile Menu Button (Left on Mobile, Hidden on Desktop) */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-[var(--color-gold)] hover:opacity-70 transition-opacity"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:-translate-x-4 lg:-translate-x-10 flex-shrink-0 flex items-center justify-center z-40 max-w-[58%]">
            <Link href="/" className="flex items-center justify-center group">
              <img 
                src="/logo.jpg" 
                alt="Petals by Smira" 
                className="object-contain transition-transform duration-500 rounded-sm scale-105 sm:scale-110 md:scale-110 lg:scale-110 h-12 sm:h-16 md:h-16 lg:h-16 max-w-full"
                style={{ mixBlendMode: 'screen', filter: 'contrast(1.5)' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 lg:space-x-12 items-center text-xs lg:text-sm font-medium tracking-widest uppercase text-[var(--color-offwhite)]">
            <Link href="/" className={`relative group transition-colors duration-300 ${pathname === "/" ? "text-[var(--color-gold)]" : "hover:text-[var(--color-gold)]"}`}>
              Home
              <span className={`absolute -bottom-2 left-0 h-[1px] bg-[var(--color-gold)] transition-all duration-300 ease-out ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </Link>
            <Link href="/editions" className={`relative group transition-colors duration-300 ${pathname.startsWith("/editions") ? "text-[var(--color-gold)]" : "hover:text-[var(--color-gold)]"}`}>
              Collections
              <span className={`absolute -bottom-2 left-0 h-[1px] bg-[var(--color-gold)] transition-all duration-300 ease-out ${pathname.startsWith("/editions") ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </Link>
            <Link href="/our-story" prefetch={false} className={`relative group transition-colors duration-300 ${pathname === "/our-story" ? "text-[var(--color-gold)]" : "hover:text-[var(--color-gold)]"}`}>
              Our Story
              <span className={`absolute -bottom-2 left-0 h-[1px] bg-[var(--color-gold)] transition-all duration-300 ease-out ${pathname === "/our-story" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </Link>
            <Link href="/experience" className={`relative group transition-colors duration-300 ${pathname === "/experience" ? "text-[var(--color-gold)]" : "hover:text-[var(--color-gold)]"}`}>
              Experience
              <span className={`absolute -bottom-2 left-0 h-[1px] bg-[var(--color-gold)] transition-all duration-300 ease-out ${pathname === "/experience" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </Link>
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center space-x-5 flex-shrink-0 relative z-50">
            <Link 
              href="/request-access" 
              className="items-center justify-center px-6 py-2.5 bg-[#0a0a0a]/60 backdrop-blur-md border border-[var(--color-gold)] text-[var(--color-gold)] text-[10px] font-medium uppercase tracking-[0.25em] hover:bg-[var(--color-gold)] hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              Request Access
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      <div 
        className={`md:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div 
        className={`md:hidden fixed top-0 left-0 bottom-0 w-[75%] max-w-[300px] z-40 bg-[#0d0d0d] border-r border-[#222] shadow-[20px_0_30px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex flex-col pt-28 px-8 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-start space-y-8">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-serif tracking-wide transition-colors ${pathname === "/" ? "text-[var(--color-gold)]" : "text-[var(--color-offwhite)] hover:text-[var(--color-gold)]"}`}>
            Home
          </Link>
          <Link href="/editions" onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-serif tracking-wide transition-colors ${pathname.startsWith("/editions") ? "text-[var(--color-gold)]" : "text-[var(--color-offwhite)] hover:text-[var(--color-gold)]"}`}>
            Collections
          </Link>
          <Link href="/our-story" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-serif tracking-wide transition-colors ${pathname === "/our-story" ? "text-[var(--color-gold)]" : "text-[var(--color-offwhite)] hover:text-[var(--color-gold)]"}`}>
            Our Story
          </Link>
          <Link href="/experience" onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-serif tracking-wide transition-colors ${pathname === "/experience" ? "text-[var(--color-gold)]" : "text-[var(--color-offwhite)] hover:text-[var(--color-gold)]"}`}>
            Experience
          </Link>
          
          <div className="pt-6 mt-4 w-full border-t border-[#222]">
            <Link 
              href="/request-access" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center border border-[var(--color-gold)] text-[var(--color-gold)] w-full py-3.5 text-[10px] font-sans tracking-[0.25em] uppercase hover:bg-[var(--color-gold)] hover:text-black transition-all"
            >
              REQUEST ACCESS
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
