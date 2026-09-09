"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function HeroSection() {
  return (
    <section className="relative w-full h-[100dvh] md:h-screen md:min-h-[700px] md:max-h-[1000px] bg-black flex items-center overflow-hidden border-b border-[#222]">
      {/* Background Image */}
      <div 
        className="absolute -inset-2 z-0 bg-cover bg-no-repeat bg-[position:90%_20%] sm:bg-[position:75%_center] md:bg-[position:right_center]"
        style={{ backgroundImage: "url('/image.png')" }}
      ></div>
      
      {/* Dark Gradient overlays for seamless blending */}
      {/* Mobile Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent md:hidden z-0"></div>

      {/* Desktop Gradients */}
      {/* Left heavy gradient for text */}
      <div className="hidden md:block absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-black via-black/85 to-transparent z-0"></div>
      
      {/* Right edge fading */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-[35%] bg-gradient-to-l from-black via-black/60 to-transparent z-0"></div>

      {/* Top and Bottom edge fading (all devices) */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/50 to-transparent z-0 pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/90 to-transparent z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full h-full flex flex-col justify-end pb-12 md:pb-0 md:justify-center pt-24 md:pt-16 lg:pt-20">
        
        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full relative h-auto md:h-full">
          
          {/* Left: Heading and CTA */}
          <div className="w-full lg:w-[55%] text-left lg:-translate-x-4">
            <motion.h1 
              className={`flex flex-col text-[var(--color-offwhite)] leading-[1.1] mb-6 font-serif`}
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.2 } }
              }}
            >
              <motion.span variants={itemVariants} className="text-3xl sm:text-5xl md:text-[68px] lg:text-[76px] font-light tracking-wide mb-1">
                Not everything
              </motion.span>
              <motion.span variants={itemVariants} className="text-3xl sm:text-5xl md:text-[68px] lg:text-[76px] font-light tracking-wide mb-2">
                extraordinary comes
              </motion.span>
              <motion.span variants={itemVariants} className={`text-5xl sm:text-7xl md:text-[85px] lg:text-[100px] text-[var(--color-gold)] font-medium mt-1 tracking-normal font-great-vibes`}>
                with a price tag.
              </motion.span>
            </motion.h1>

            {/* Lotus Divider Design */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex items-center w-full md:w-[70%] mb-8"
            >
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-gold)] opacity-50"></div>
              <div className="px-4 text-[var(--color-gold)] opacity-80">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c-4-4-6-8-6-12a6 6 0 0 1 12 0c0 4-2 8-6 12z" />
                  <path d="M12 22c-8-4-10-10-10-14a4 4 0 0 1 8 0" />
                  <path d="M12 22c8-4 10-10 10-14a4 4 0 0 0-8 0" />
                </svg>
              </div>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[var(--color-gold)] opacity-50"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 1 }}
              className="mt-4 flex flex-col items-start md:block w-full"
            >
              <div className={`mb-8 md:mb-10 text-[#A69B82] opacity-90 tracking-wider space-y-2 md:space-y-3 font-serif text-center md:text-left w-full md:w-auto`}>
                <p className="text-sm md:text-[17px]">
                  Luxury Editions from ₹4,999 to ₹1,00,000
                </p>
                <p className="text-sm md:text-[17px]">
                  Access is limited.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-center md:justify-start">
                <Link 
                  href="/editions" 
                  className="flex items-center justify-center border border-[var(--color-gold)] bg-[var(--color-gold)] text-black px-8 py-4 md:py-3 text-[11px] md:text-[10px] font-medium tracking-[0.25em] hover:bg-transparent hover:text-[var(--color-gold)] transition-all duration-300 w-full sm:w-auto"
                >
                  EXPLORE THE EDITIONS <span className="ml-3 opacity-70">&gt;</span>
                </Link>
                <Link 
                  href="/request-access" 
                  className="flex items-center justify-center border border-[var(--color-gold)]/50 text-[var(--color-gold)] px-8 py-4 md:py-3 text-[11px] md:text-[10px] font-medium tracking-[0.25em] hover:bg-[var(--color-gold)] hover:text-black transition-all duration-300 w-full sm:w-auto"
                >
                  REQUEST ACCESS
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right: Floating Quote */}
          <motion.div 
            className="hidden lg:block absolute right-[4%] top-[38%] max-w-[280px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <div className="relative text-right pr-4">
              {/* Left Quote Icon */}
              <span className={`absolute -top-4 -left-6 text-[var(--color-gold)] text-[60px] leading-none opacity-90 font-serif`}>“</span>
              <p className={`text-[26px] italic text-[var(--color-offwhite)] opacity-100 leading-[1.3] font-serif font-medium`}>
                A statement,<br/>not just a jewel.
              </p>
              {/* Right Quote Icon */}
              <span className={`absolute -bottom-6 -right-6 text-[var(--color-gold)] text-[60px] leading-none opacity-90 font-serif`}>”</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
