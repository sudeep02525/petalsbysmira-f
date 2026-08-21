"use client";

import Link from "next/link";
import { ShoppingBag, User, Search, Menu, Gift, Truck, ShieldCheck } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const getCartCount = useCartStore((state) => state.getCartCount);
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${isHome ? 'fixed' : 'sticky'} top-0 z-50 w-full font-sans transition-none md:transition-all md:duration-500 ${isScrolled ? "shadow-xl" : ""}`}>

      {/* Main Navbar */}
      <div className={`transition-none md:transition-all md:duration-500 ease-in-out
        bg-black text-[var(--color-gold)] shadow-md
        md:border-none md:shadow-none
        ${(isScrolled || !isHome) 
          ? "md:bg-black md:shadow-lg md:bg-opacity-95 md:backdrop-blur-md md:text-[var(--color-gold)]" 
          : "md:bg-transparent md:text-[var(--color-primary-dark)]"
        }
      `}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center transition-none md:transition-all md:duration-500 h-16 md:h-24 md:data-[scrolled=true]:h-20" data-scrolled={isScrolled}>
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 -ml-2 text-[var(--color-gold)] md:text-inherit`}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none">
              <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
                <img 
                  src="https://res.cloudinary.com/tbllydoh/image/upload/v1787316465/WhatsApp_Image_2026-08-21_at_6.01.28_PM.jpg" 
                  alt="Petals by Smira" 
                  className="h-10 md:h-12 w-auto rounded-md transition-none md:transition-all md:duration-500 md:group-hover:scale-105" 
                />
                <span className={`font-serif font-bold tracking-tight hidden sm:block text-2xl transition-none md:transition-all md:duration-500 text-white ${(isScrolled || !isHome) ? 'md:text-white md:group-hover:text-[var(--color-gold)]' : 'md:text-[var(--color-primary-dark)]'}`}>
                  Petals by Smira
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center text-sm font-medium">
              <Link href="/" className="relative group hover:opacity-70 transition-opacity">
                Home
                <span className={`absolute -bottom-1.5 left-1/2 w-0 h-[2px] transition-all duration-300 group-hover:w-full group-hover:left-0 ${isScrolled || !isHome ? 'bg-[var(--color-gold)]' : 'bg-black'}`}></span>
              </Link>
              <Link href="/shop" className="relative group hover:opacity-70 transition-opacity">
                Shop
                <span className={`absolute -bottom-1.5 left-1/2 w-0 h-[2px] transition-all duration-300 group-hover:w-full group-hover:left-0 ${isScrolled || !isHome ? 'bg-[var(--color-gold)]' : 'bg-black'}`}></span>
              </Link>
              <Link href="/occasion/all" className="relative group hover:opacity-70 transition-opacity">
                Gift by Occasion
                <span className={`absolute -bottom-1.5 left-1/2 w-0 h-[2px] transition-all duration-300 group-hover:w-full group-hover:left-0 ${isScrolled || !isHome ? 'bg-[var(--color-gold)]' : 'bg-black'}`}></span>
              </Link>
              <Link href="/corporate-gifting" className="relative group hover:opacity-70 transition-opacity">
                Corporate Gifting
                <span className={`absolute -bottom-1.5 left-1/2 w-0 h-[2px] transition-all duration-300 group-hover:w-full group-hover:left-0 ${isScrolled || !isHome ? 'bg-[var(--color-gold)]' : 'bg-black'}`}></span>
              </Link>
              <Link href="/about" className="relative group hover:opacity-70 transition-opacity">
                About Us
                <span className={`absolute -bottom-1.5 left-1/2 w-0 h-[2px] transition-all duration-300 group-hover:w-full group-hover:left-0 ${isScrolled || !isHome ? 'bg-[var(--color-gold)]' : 'bg-black'}`}></span>
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-5 flex-shrink-0">
              <button className="hidden sm:block hover:opacity-70 md:transition-all md:duration-300 md:hover:scale-110 md:hover:-translate-y-0.5 text-[var(--color-primary-dark)] md:text-inherit">
                <Search className="h-5 w-5" />
              </button>
              
              {isAuthenticated ? (
                <Link href="/account" className="hidden sm:block hover:opacity-70 md:transition-all md:duration-300 md:hover:scale-105 text-[var(--color-primary-dark)] md:text-inherit">
                  <span className={`text-sm border px-3 py-1 rounded-full border-black ${(isScrolled || !isHome) ? 'md:border-[var(--color-gold)]' : ''}`}>
                    {user?.name?.split(" ")[0]}
                  </span>
                </Link>
              ) : (
                <Link href="/login" className="hidden sm:block hover:opacity-70 md:transition-all md:duration-300 md:hover:scale-110 md:hover:-translate-y-0.5 text-[var(--color-primary-dark)] md:text-inherit">
                  <User className="h-5 w-5" />
                </Link>
              )}
              
              <Link href="/cart" className="relative flex items-center hover:opacity-70 md:transition-all md:duration-300 md:hover:scale-110 md:hover:-translate-y-0.5 text-[var(--color-gold)] md:text-inherit">
                <ShoppingBag className="h-5 w-5" />
                <span className={`absolute -top-2 -right-2 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center transition-none md:transition-transform md:duration-300 md:group-hover:scale-110 shadow-sm
                  bg-[var(--color-gold)] text-black
                  md:bg-black md:text-[var(--color-gold)]
                  ${(isScrolled || !isHome) ? 'md:bg-[var(--color-gold)] md:text-black' : ''}
                `}>
                  {mounted ? getCartCount() : 0}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full bg-[var(--color-primary-light)] border-t border-[var(--color-primary-dark)] overflow-hidden shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-[var(--color-primary-dark)]">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-[var(--color-primary-dark)] rounded-md">
                Home
              </Link>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-[var(--color-primary-dark)] rounded-md">
                Shop
              </Link>
              <Link href="/occasion/all" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-[var(--color-primary-dark)] rounded-md">
                Occasions
              </Link>
              <Link href="/corporate-gifting" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-[var(--color-primary-dark)] rounded-md">
                Corporate Gifting
              </Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-[var(--color-primary-dark)] rounded-md">
                About Us
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-[var(--color-primary-dark)] rounded-md">
                    My Account
                  </Link>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium hover:bg-[var(--color-primary-dark)] rounded-md">
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-[var(--color-primary-dark)] rounded-md">
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
