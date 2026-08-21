"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import ProductCard from "../ui/ProductCard";
import ProductGridSkeleton from "../ui/skeleton/ProductGridSkeleton";
import Link from "next/link";
import { Button } from "../ui/Button";
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

const fetchProducts = async (type, occasion) => {
  const params = {};
  if (type === "featured") params.featured = true;
  if (type === "newArrival") params.newArrival = true;
  if (occasion) params.occasion = occasion;
  
  const { data } = await axiosInstance.get("/products", { params });
  return data.products || data.data || data;
};

export default function ProductSection({ title, type, occasion, linkTo }) {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products", type, occasion],
    queryFn: () => fetchProducts(type, occasion),
  });

  return (
    <section className="py-16 bg-[var(--color-offwhite)] font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10"
        >
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-primary-dark)] mb-4">{title}</h2>
            <div className="h-0.5 w-24 bg-[var(--color-gold)]"></div>
          </div>
          {linkTo && (
            <Link href={linkTo} className="hidden md:block">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          )}
        </motion.div>

        {isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            Failed to load products.
          </div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {products?.slice(0, 8).map((product) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
            
            {linkTo && (
              <div className="mt-8 text-center md:hidden">
                <Link href={linkTo}>
                  <Button variant="outline" className="w-full">View All</Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
