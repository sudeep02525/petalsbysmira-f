"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import ProductSection from "./ProductSection";
import ProductGridSkeleton from "../ui/skeleton/ProductGridSkeleton";

const DEFAULT_ORDER = ["the-editions", "mens-luxury-watches", "luxury-bags"];

export default function DynamicCollections({ collectionOrder }) {
  const preferredOrder = collectionOrder?.length ? collectionOrder : DEFAULT_ORDER;

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/categories");
      const activeCats = res.data?.filter(c => c.isActive) || [];
      return activeCats.sort((a, b) => {
        const indexA = preferredOrder.indexOf(a.slug);
        const indexB = preferredOrder.indexOf(b.slug);
        const orderA = indexA === -1 ? 99 : indexA;
        const orderB = indexB === -1 ? 99 : indexB;
        return orderA - orderB;
      });
    },
  });

  if (isLoading) {
    return (
      <div className="py-16 bg-black border-t border-[#222]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGridSkeleton count={5} />
        </div>
      </div>
    );
  }

  // Fallback if no categories are found, just show a general section
  if (!categories || categories.length === 0) {
    return (
      <ProductSection 
        title="The Editions" 
        subtitle="Curated for those who know their worth." 
        type="featured" 
      />
    );
  }

  return (
    <>
      {categories.map((category) => (
        <ProductSection 
          key={category._id}
          title={category.name} 
          subtitle={category.description || "Curated for those who know their worth."} 
          categoryId={category._id} 
          type="featured"
        />
      ))}
    </>
  );
}
