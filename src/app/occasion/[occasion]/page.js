"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ProductGridSkeleton from "../../../components/ui/skeleton/ProductGridSkeleton";
import axiosInstance from "../../../services/axiosInstance";
import ProductCard from "../../../components/ui/ProductCard";
import { Button } from "../../../components/ui/Button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function OccasionPage() {
  const params = useParams();
  const occasion = params.occasion;
  
  const title = typeof occasion === "string" ? (occasion === "all" ? "All Occasions" : occasion.replace("-", " ")) : "";

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products", "occasion", occasion],
    queryFn: async () => {
      const queryParams = occasion !== "all" ? { occasion: occasion } : {};
      const { data } = await axiosInstance.get("/products", { params: queryParams });
      return data.products || data.data || data;
    },
  });

  return (
    <div className="font-sans pb-16">
      {/* Hero Banner */}
      <div className="bg-[var(--color-primary-dark)] text-center py-16 md:py-24 border-b-4 border-[var(--color-gold)] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <p className="text-[var(--color-gold)] text-sm tracking-[0.3em] uppercase mb-4 font-semibold">
            Gifts Selected For
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-offwhite)] capitalize">
            {title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {isLoading ? (
          <ProductGridSkeleton count={8} />
        ) : error || !products ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">Failed to load gifts for this occasion.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[var(--color-cream)]">
            <h3 className="font-serif text-2xl text-[var(--color-primary-dark)] mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">We couldn&apos;t find any products for this occasion.</p>
            <Link href="/editions">
              <Button>Explore All Gifts</Button>
            </Link>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
