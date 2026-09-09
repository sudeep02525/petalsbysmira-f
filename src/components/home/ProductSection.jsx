"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import ProductCard from "../ui/ProductCard";
import ProductGridSkeleton from "../ui/skeleton/ProductGridSkeleton";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fetchProducts = async (type, occasion, categoryId) => {
  const params = {};
  if (type === "featured") params.featured = true;
  if (type === "newArrival") params.newArrival = true;
  if (occasion) params.occasion = occasion;
  if (categoryId) params.collectionId = categoryId;
  
  const { data } = await axiosInstance.get("/products", { params });
  return data.products || data.data || data;
};

export default function ProductSection({ title, subtitle, type, occasion, categoryId }) {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products", type, occasion, categoryId],
    queryFn: () => fetchProducts(type, occasion, categoryId),
  });

  if (!isLoading && (!products || products.length === 0)) {
    return null; // Don't show empty sections
  }

  return (
    <section className="py-16 bg-black border-t border-[#222] font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 w-full mb-3">
            <div className="h-px bg-gradient-to-r from-transparent to-[var(--color-gold)] flex-1 max-w-[100px] opacity-50"></div>
            <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-gold)] tracking-widest uppercase px-4">
              {title}
            </h2>
            <div className="h-px bg-gradient-to-l from-transparent to-[var(--color-gold)] flex-1 max-w-[100px] opacity-50"></div>
          </div>
          
          {subtitle && (
            <p className="text-[10px] md:text-xs text-[var(--color-offwhite)] italic font-serif tracking-[0.2em] opacity-80">
              {subtitle}
            </p>
          )}
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[#111] animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            Failed to load collection.
          </div>
        ) : (
          <motion.div 
            className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 pb-8 md:pb-0 scrollbar-hide"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} // Hide scrollbar for standard browsers
          >
            {products?.slice(0, 5).map((product) => (
              <motion.div 
                key={product._id} 
                variants={itemVariants}
                className="w-[85vw] md:w-auto min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center shrink-0"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
