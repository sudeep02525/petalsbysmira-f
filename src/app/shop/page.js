"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Filter, SlidersHorizontal, Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../../services/axiosInstance";
import ProductCard from "../../components/ui/ProductCard";
import ProductGridSkeleton from "../../components/ui/skeleton/ProductGridSkeleton";
import { Button } from "../../components/ui/Button";

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

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // URL params state
  const categoryParam = searchParams.get("category") || "";
  const minPriceParam = searchParams.get("minPrice") || "";
  const maxPriceParam = searchParams.get("maxPrice") || "";
  const sortParam = searchParams.get("sort") || "newest";

  // Local state for filters
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState({ min: minPriceParam, max: maxPriceParam });
  const [sortBy, setSortBy] = useState(sortParam);

  // Fetch categories for sidebar
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/categories");
      return data.categories || data.data || data;
    },
  });

  // Fetch products
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products", selectedCategory, priceRange.min, priceRange.max, sortBy],
    queryFn: async () => {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (priceRange.min) params.minPrice = priceRange.min;
      if (priceRange.max) params.maxPrice = priceRange.max;
      if (sortBy) params.sort = sortBy;
      
      const { data } = await axiosInstance.get("/products", { params });
      return data.products || data.data || data;
    },
  });

  // Update URL when filters change
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (priceRange.min) params.set("minPrice", priceRange.min);
    if (priceRange.max) params.set("maxPrice", priceRange.max);
    if (sortBy && sortBy !== "newest") params.set("sort", sortBy);
    
    router.push(`/shop?${params.toString()}`);
    setIsMobileFiltersOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange({ min: "", max: "" });
    router.push("/shop");
    setIsMobileFiltersOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <div className="flex flex-col md:flex-row items-baseline justify-between border-b border-gray-200 pb-6 mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-[var(--color-primary-dark)]">
          All Products
        </h1>

        <div className="flex items-center mt-4 md:mt-0">
          <div className="relative inline-block text-left mr-4 md:mr-8">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                // We could apply immediately here, or let the user click apply. 
                // For sorting, immediate is better.
                const params = new URLSearchParams(searchParams.toString());
                params.set("sort", e.target.value);
                router.push(`/shop?${params.toString()}`);
              }}
              className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border-none bg-transparent focus:ring-0 cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          <button
            type="button"
            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <span className="sr-only">Filters</span>
            <Filter className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="font-medium text-[var(--color-primary-dark)] mb-4 uppercase tracking-wider text-sm">Categories</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === ""}
                    onChange={() => setSelectedCategory("")}
                    className="h-4 w-4 text-[var(--color-gold)] focus:ring-[var(--color-gold)] border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-600">All Categories</span>
                </label>
                {categories?.map((c) => (
                  <label key={c._id || c.slug} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === c.slug}
                      onChange={() => setSelectedCategory(c.slug)}
                      className="h-4 w-4 text-[var(--color-gold)] focus:ring-[var(--color-gold)] border-gray-300"
                    />
                    <span className="ml-3 text-sm text-gray-600">{c.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-medium text-[var(--color-primary-dark)] mb-4 uppercase tracking-wider text-sm">Price Range</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <Button onClick={applyFilters} className="w-full text-xs">Apply</Button>
              <Button variant="outline" onClick={clearFilters} className="w-full text-xs">Clear</Button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : !productsData || productsData.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={selectedCategory + priceRange.min + priceRange.max + sortBy}
            >
              {productsData.map((product) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile filter dialog */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 flex z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" onClick={() => setIsMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4 mb-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="px-4 space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Category</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="radio" checked={selectedCategory === ""} onChange={() => setSelectedCategory("")} className="h-4 w-4 text-[var(--color-gold)]" />
                    <span className="ml-3 text-sm text-gray-600">All</span>
                  </label>
                  {categories?.map((c) => (
                    <label key={c._id || c.slug} className="flex items-center">
                      <input type="radio" checked={selectedCategory === c.slug} onChange={() => setSelectedCategory(c.slug)} className="h-4 w-4 text-[var(--color-gold)]" />
                      <span className="ml-3 text-sm text-gray-600">{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} className="w-full border rounded-md px-3 py-1.5 text-sm" />
                  <span>-</span>
                  <input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} className="w-full border rounded-md px-3 py-1.5 text-sm" />
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
                <Button variant="outline" onClick={clearFilters} className="w-full">Clear</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8"><ProductGridSkeleton count={8} /></div>}>
      <ShopContent />
    </Suspense>
  );
}
