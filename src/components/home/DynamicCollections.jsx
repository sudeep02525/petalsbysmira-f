"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import ProductSection from "./ProductSection";

export default function DynamicCollections() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/categories");
      const activeCats = res.data?.filter(c => c.isActive) || [];
      // Enforce strict order: Editions -> Watches -> Bags
      return activeCats.sort((a, b) => {
        const order = {
          "the-editions": 1,
          "mens-luxury-watches": 2,
          "luxury-bags": 3
        };
        const orderA = order[a.slug] || 99;
        const orderB = order[b.slug] || 99;
        return orderA - orderB;
      });
    },
  });

  if (isLoading) return <div className="min-h-[50vh] bg-black"></div>;

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
