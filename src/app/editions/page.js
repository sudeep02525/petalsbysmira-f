"use client";

import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategorySkeleton from "@/components/ui/skeleton/CategorySkeleton";
import Link from "next/link";
import ProductGridSkeleton from "../../components/ui/skeleton/ProductGridSkeleton";
import axiosInstance from "../../services/axiosInstance";
import ProductCard from "../../components/ui/ProductCard";

function EditionsContent() {
  // Fetch all categories
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/categories");
      return data.categories || data.data || data;
    },
  });

  // Fetch all active products
  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products", "all"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/products", { params: { limit: 100 } });
      return data.products || data.data || data;
    },
  });

  if (isCategoriesLoading || isProductsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32">
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  // Group products by category
  const productsByCategory = {};
  if (categories && products) {
    categories.forEach(category => {
      const categoryProducts = products.filter(
        p => p.category?._id === category._id || p.category?.slug === category.slug || p.category === category._id
      );
      if (categoryProducts.length > 0) {
        productsByCategory[category.name] = categoryProducts;
      }
    });
  }

  return (
    <main className="flex-1 pb-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 pt-32">
        
        {/* Header */}
        <div className="text-center mb-24 border-b border-[#222] pb-16">
          <h1 className={`text-3xl md:text-5xl text-[var(--color-gold)] mb-4 tracking-widest uppercase font-serif`}>
            The Editions
          </h1>
          <p className="text-[#A69B82] text-xs md:text-sm tracking-[0.3em] uppercase italic font-serif">
            Curated for those who know their worth.
          </p>
        </div>

        {/* Collections */}
        {Object.keys(productsByCategory).length === 0 ? (
          <div className="text-center py-24 border border-[#222]">
            <p className="text-[var(--color-gold)] text-sm tracking-widest uppercase">The collection is currently being curated.</p>
          </div>
        ) : (
          <div className="space-y-32">
            {Object.entries(productsByCategory).map(([categoryName, categoryProducts]) => (
              <section key={categoryName} className="flex flex-col">
                <div className="flex items-center justify-center mb-12 relative">
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)] opacity-30 to-transparent"></div>
                  <h2 className="relative z-10 bg-black px-6 text-[var(--color-gold)] text-sm md:text-base tracking-[0.3em] uppercase">
                    {categoryName}
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default function EditionsPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-[var(--color-gold)] selection:text-black">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <EditionsContent />
      </Suspense>
      <Footer />
    </div>
  );
}
