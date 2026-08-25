"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import axiosInstance from "../../../services/axiosInstance";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data } = await axiosInstance.get(`/products/${slug}`);
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-[var(--color-gold)]">
          Loading...
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-[var(--color-gold)]">
          <h1 className="text-3xl mb-4">Edition Not Found</h1>
          <a href="/editions" className="border border-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-widest hover:bg-[var(--color-gold)] hover:text-black transition-colors">
            Return to Editions
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-[var(--color-gold)] selection:text-black">
      <Navbar />
      
      <main className="flex-1 pt-24 md:pt-32 pb-24">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12 flex flex-col md:flex-row gap-12 lg:gap-24">
          
          {/* Left: Product Images */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <div className="aspect-square bg-[#111] border border-[#222] relative">
              <img 
                src={product.images?.[0] || "/placeholder.jpg"} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.limitedEdition && (
                <div className="absolute top-4 right-4 border border-[var(--color-gold)] text-[var(--color-gold)] text-[10px] uppercase tracking-widest px-3 py-1">
                  Limited Edition
                </div>
              )}
            </div>
            
            {/* Gallery thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1).map((img, idx) => (
                  <div key={idx} className="aspect-square bg-[#111] border border-[#222]">
                    <img src={img} alt={`${product.name} detail ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="mb-4">
              <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.2em]">
                {product.category?.name || "The Editions"}
              </span>
            </div>
            
            <h1 className={`text-3xl md:text-5xl text-[var(--color-offwhite)] mb-4 leading-tight font-serif`}>
              {product.name}
            </h1>
            
            {product.shortSubtitle && (
              <p className="text-[#A69B82] font-serif italic text-sm md:text-base tracking-wide mb-8">
                {product.shortSubtitle}
              </p>
            )}

            <div className="border-t border-b border-[#222] py-8 my-8 text-[#ccc] text-sm md:text-base leading-relaxed font-light">
              <p className="whitespace-pre-line">{product.description}</p>
            </div>

            <div className="mt-4">
              <a 
                href={`/request-access?product=${product.slug || product._id}`}
                className="inline-flex w-full md:w-auto items-center justify-center border border-[var(--color-gold)] bg-[var(--color-gold)] text-black px-8 py-5 text-xs font-medium uppercase tracking-[0.25em] hover:bg-transparent hover:text-[var(--color-gold)] transition-colors duration-300"
              >
                Request Private Access
              </a>
            </div>
            
            {/* Additional Brand Text */}
            <div className="mt-12 pt-8 border-t border-[#222]/50 text-xs text-[#666] uppercase tracking-widest space-y-4">
              <p>Personal Consultation Included</p>
              <p>Complimentary Secure Delivery</p>
              <p>Certificate of Authenticity</p>
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
