"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import PriceDisplay from "../ui/PriceDisplay";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const productContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 }
  }
};

const productItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function HeroSection() {
  const { data: featuredProducts } = useQuery({
    queryKey: ["hero-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products", { params: { featured: true } });
      return res.data?.products?.slice(0, 2) || [];
    },
  });

  return (
    <section className="relative w-full min-h-screen bg-[#f0e9df] flex items-center overflow-hidden">
      {/* Background with light luxury overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-multiply"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000&auto=format&fit=crop')",
        }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#f0e9df] via-[#f0e9df]/80 to-transparent"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8 w-full pt-28 md:pt-32 pb-10 md:pb-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Left Text Content */}
          <motion.div 
            className="w-full lg:w-1/2 text-left mt-4 md:mt-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="flex flex-col text-[var(--color-primary-dark)] font-serif leading-tight">
              <motion.span variants={itemVariants} className="text-[10px] md:text-base uppercase tracking-[0.3em] text-[var(--color-gold)] mb-3 md:mb-4 block font-bold">
                The Luxury Collection
              </motion.span>
              <motion.span variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-light mb-1 md:mb-2">
                Elevate Your
              </motion.span>
              <motion.span variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl italic text-[var(--color-gold)] font-medium leading-[1.1] mb-5 md:mb-6 drop-shadow-sm">
                Gifting Experience
              </motion.span>
            </h1>
            <motion.p variants={itemVariants} className="text-sm md:text-lg text-gray-700 font-medium mb-8 md:mb-10 max-w-md leading-relaxed pr-4 md:pr-0">
              Discover our curated selection of premium hampers, exquisite jewelry, and timeless accessories designed for those who appreciate the finer things.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-5">
              <Link 
                href="/shop" 
                className="inline-flex items-center justify-center bg-black text-[var(--color-gold)] px-8 md:px-10 py-3.5 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--color-gold)] hover:text-black transition-colors w-full sm:w-auto"
              >
                Shop Collection
              </Link>
              <Link 
                href="/shop?occasion=wedding" 
                className="inline-flex items-center justify-center bg-transparent border border-black text-black px-8 md:px-10 py-3.5 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors w-full sm:w-auto"
              >
                Wedding Gifts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Aesthetic Image Composition (Desktop) */}
          <motion.div 
            className="hidden lg:flex w-full lg:w-1/2 relative h-[400px] md:h-[500px] mt-10 lg:mt-0 justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Background Accent Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-[var(--color-gold)] opacity-10 rounded-full blur-3xl"></div>
            
            {/* Primary Image - Gift Hamper */}
            <motion.div 
              className="absolute z-10 w-[60%] md:w-[280px] aspect-[4/5] right-[5%] md:right-[10%] top-[10%] md:top-[5%] shadow-2xl rounded-sm overflow-hidden border-2 border-white/50"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <img 
                src="/images/hero_hamper.jpg" 
                alt="Luxury Gift Hamper" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </motion.div>

            {/* Secondary Image - Kundan Jewelry */}
            <motion.div 
              className="absolute z-20 w-[50%] md:w-[240px] aspect-square left-[10%] md:left-[15%] bottom-[5%] md:bottom-[10%] shadow-2xl rounded-full overflow-hidden border-4 border-white"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <img 
                src="/images/hero_jewelry.jpg" 
                alt="Elegant Kundan Jewelry" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </motion.div>

            {/* Decorative Floating Text Badge */}
            <motion.div 
              className="absolute z-30 right-[15%] bottom-[20%] bg-white/80 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--color-primary-dark)] shadow-xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Premium Quality
            </motion.div>
          </motion.div>

          {/* Right Aesthetic Image Composition (Mobile Exclusive) */}
          <motion.div 
            className="lg:hidden w-full mt-12 mb-8 flex flex-col gap-4 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Main Mobile Image */}
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl border border-white/50 relative">
              <img 
                src="/images/hero_hamper.jpg" 
                alt="Luxury Gift Hamper" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary-dark)] shadow-lg rounded-sm">
                Premium Hampers
              </div>
            </div>

            {/* Secondary Mobile Image */}
            <div className="w-full aspect-[21/9] rounded-lg overflow-hidden shadow-xl border border-white/50 relative mt-2">
              <img 
                src="/images/hero_jewelry.jpg" 
                alt="Elegant Kundan Jewelry" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary-dark)] shadow-lg rounded-sm">
                Luxury Jewelry
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
