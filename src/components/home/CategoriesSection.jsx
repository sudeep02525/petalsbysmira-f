"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import { motion } from "framer-motion";
import CategorySkeleton from "../ui/skeleton/CategorySkeleton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

export default function CategoriesSection() {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/categories");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white font-sans">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-[#2c2c2c] mb-4">Shop By Category</h2>
            <div className="h-0.5 w-24 bg-[var(--color-gold)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <CategorySkeleton className="aspect-[3/4] lg:aspect-auto lg:h-[600px] lg:row-span-2" />
            <CategorySkeleton className="aspect-square lg:aspect-[3/4] lg:mt-12" />
            <CategorySkeleton className="aspect-square lg:aspect-[3/4] lg:mt-12" />
            <CategorySkeleton className="aspect-[3/4] lg:aspect-auto lg:h-[600px] lg:row-span-2" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !categories || categories.length === 0) {
    return null;
  }

  const activeCategories = categories.filter(c => c.isActive).slice(0, 4);

  return (
    <section className="py-20 bg-white font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl text-[#2c2c2c] mb-4">Shop By Category</h2>
          <div className="h-0.5 w-24 bg-[var(--color-gold)] mx-auto"></div>
        </motion.div>

        {/* Editorial Masonry Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {activeCategories.map((cat, index) => {
            // Make the first and fourth category taller, second and third shorter to simulate masonry
            const isTall = index === 0 || index === 3;
            
            return (
              <motion.div key={cat._id} variants={itemVariants} className={isTall ? 'lg:row-span-2' : ''}>
                <Link 
                  href={`/shop?category=${cat.slug}`} 
                  className={`group relative overflow-hidden block w-full h-full ${isTall ? 'aspect-[3/4] lg:aspect-auto lg:h-full' : 'aspect-square lg:aspect-[3/4] lg:mt-12'}`}
                >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500 z-10"></div>
                
                {cat.image ? (
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=800&auto=format&fit=crop";
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                ) : (
                  <img 
                    src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=800&auto=format&fit=crop" 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                )}
                
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
                  <h3 className="text-white font-serif text-2xl md:text-3xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {cat.name}
                  </h3>
                  <span className="text-white/0 group-hover:text-white text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors duration-500 delay-100">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
}
