"use client";

import { Suspense, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import ProductCardSkeleton from "../../components/ui/skeleton/ProductCardSkeleton";
import axiosInstance from "../../services/axiosInstance";
import ProductCard from "../../components/ui/ProductCard";

function EditionsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Fetch all categories
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/categories");
      return data.categories || data.data || data;
    },
  });

  // Fetch active products with pagination
  const { data: productResponse, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/products", { params: { page, limit: 24 } });
      return data;
    },
  });

  const products = productResponse?.products || [];
  const totalPages = productResponse?.totalPages || 1;

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || 
                              product.category?._id === selectedCategory || 
                              product.category?.slug === selectedCategory || 
                              product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <main className="flex-1 pb-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 pt-32">
        
        {/* Page Header */}
        <div className="text-center mb-16 sm:mb-24">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[var(--color-gold)] font-sans mb-4 block">
            The Complete Atelier Collection
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[var(--color-offwhite)] tracking-wide mb-6">
            Private Editions
          </h1>
          <div className="w-16 h-[1px] bg-[var(--color-gold)] mx-auto opacity-60"></div>
        </div>

        {/* Layout Grid: Sidebar + Product Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Sidebar (Filters) */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
            
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search creations..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-[#111] border border-white/10 px-4 py-3 pl-10 text-xs tracking-wider text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-gold)] transition-colors"
              />
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Categories (Desktop) */}
            <div className="hidden lg:block space-y-6">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] border-b border-white/10 pb-3 font-serif">
                Collections
              </h3>
              {isCategoriesLoading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-white/5 animate-pulse w-3/4"></div>
                  <div className="h-4 bg-white/5 animate-pulse w-1/2"></div>
                  <div className="h-4 bg-white/5 animate-pulse w-2/3"></div>
                </div>
              ) : (
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => {
                        setSelectedCategory("all");
                        setPage(1);
                      }}
                      className={`text-sm tracking-widest uppercase transition-colors ${selectedCategory === "all" ? "text-[var(--color-gold)]" : "text-white/50 hover:text-[var(--color-gold)]"}`}
                    >
                      All Pieces
                    </button>
                  </li>
                  {categories?.map((cat) => (
                    <li key={cat._id}>
                      <button 
                        onClick={() => {
                          setSelectedCategory(cat._id);
                          setPage(1);
                        }}
                        className={`text-sm tracking-widest uppercase text-left transition-colors ${selectedCategory === cat._id ? "text-[var(--color-gold)]" : "text-white/50 hover:text-[var(--color-gold)]"}`}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Categories (Mobile Toggle) */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="flex items-center gap-2 text-[var(--color-gold)] text-xs uppercase tracking-[0.2em] border border-white/10 px-4 py-3 w-full justify-center hover:bg-white/5 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filter by Category
              </button>
              
              {isMobileFiltersOpen && (
                <div className="mt-4 p-4 border border-white/10 bg-black/50 backdrop-blur-sm">
                  <ul className="space-y-4">
                    <li>
                      <button 
                        onClick={() => { setSelectedCategory("all"); setIsMobileFiltersOpen(false); setPage(1); }}
                        className={`text-xs tracking-widest uppercase transition-colors ${selectedCategory === "all" ? "text-[var(--color-gold)]" : "text-white/50 hover:text-[var(--color-gold)]"}`}
                      >
                        All Pieces
                      </button>
                    </li>
                    {categories?.map((cat) => (
                      <li key={cat._id}>
                        <button 
                          onClick={() => { setSelectedCategory(cat._id); setIsMobileFiltersOpen(false); setPage(1); }}
                          className={`text-xs tracking-widest uppercase text-left transition-colors ${selectedCategory === cat._id ? "text-[var(--color-gold)]" : "text-white/50 hover:text-[var(--color-gold)]"}`}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {isProductsLoading ? "Loading pieces..." : `Showing ${filteredProducts.length} pieces`}
              </span>
            </div>

            {isProductsLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-12 sm:gap-x-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-24 border border-white/10 bg-black/40">
                <p className="text-[var(--color-gold)] text-sm tracking-widest uppercase">No pieces found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-12 sm:gap-x-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-16 pt-8 border-t border-white/10 flex justify-center items-center gap-4">
                    <button
                      disabled={page === 1}
                      onClick={() => {
                        setPage((p) => Math.max(1, p - 1));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-6 py-2.5 text-xs uppercase tracking-widest border border-white/20 text-white disabled:opacity-30 hover:border-[var(--color-gold)] transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-xs font-mono tracking-widest text-[var(--color-gold)]">
                      {page} / {totalPages}
                    </span>
                    <button
                      disabled={page === totalPages}
                      onClick={() => {
                        setPage((p) => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-6 py-2.5 text-xs uppercase tracking-widest border border-white/20 text-white disabled:opacity-30 hover:border-[var(--color-gold)] transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}

export default function EditionsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-black)] flex flex-col font-sans selection:bg-[var(--color-gold)] selection:text-black">
      <Suspense fallback={<div className="min-h-screen bg-[var(--color-black)]" />}>
        <EditionsContent />
      </Suspense>
    </div>
  );
}
