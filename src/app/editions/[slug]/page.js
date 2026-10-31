"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductDetailsSkeleton from "../../../components/ui/skeleton/ProductDetailsSkeleton";
import { cdnImg } from "../../../utils/utils";

import axiosInstance from "../../../services/axiosInstance";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const [selectedImage, setSelectedImage] = useState(0);

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
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col font-sans">

        <div className="flex-1 flex flex-col items-center justify-center text-[var(--color-gold)]">
          <h1 className="text-3xl mb-4">Edition Not Found</h1>
          <Link href="/editions" className="border border-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-widest hover:bg-[var(--color-gold)] hover:text-black transition-colors">
            Return to Editions
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-[var(--color-gold)] selection:text-black">

      
      <main className="flex-1 pt-24 md:pt-32 pb-24">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12 mb-8">
          <Link href="/editions" className="inline-flex items-center gap-2 text-[var(--color-gold)] text-[10px] uppercase tracking-widest hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Collections
          </Link>
        </div>
        
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12 flex flex-col md:flex-row gap-12 lg:gap-24">
          
          {/* Left: Product Images */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <div className="aspect-square bg-[#111] border border-[#222] relative overflow-hidden">
              <img 
                src={cdnImg(product.images?.[selectedImage] || product.images?.[0] || "/image.jpg", 1200)} 
                alt={product.name} 
                decoding="async"
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.limitedEdition && (
                <div className="absolute top-4 right-4 border border-[var(--color-gold)] text-[var(--color-gold)] text-[10px] uppercase tracking-widest px-3 py-1 bg-black/60 backdrop-blur-sm">
                  Limited Edition
                </div>
              )}
            </div>
            
            {/* Gallery thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-[#111] border cursor-pointer transition-all ${selectedImage === idx ? 'border-[var(--color-gold)]' : 'border-[#222] hover:border-[#444]'}`}
                  >
                    <img src={cdnImg(img, 300)} alt={`${product.name} thumbnail ${idx + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </button>
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

            <div className="border-t border-b border-[#222] py-8 my-8 flex flex-col gap-6">
              {product.shortDescription && (
                <p className="text-[#fff] text-base md:text-lg leading-relaxed font-serif tracking-wide">
                  {product.shortDescription}
                </p>
              )}
              <p className="text-[#ccc] text-sm md:text-base leading-relaxed font-light whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {product.price ? (
              <div className="mt-4 flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex flex-col">
                  <span className="text-[var(--color-gold)] text-[10px] tracking-widest uppercase mb-1">Exclusive Price</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl md:text-3xl text-white font-serif">
                      ₹{product.discountPrice ? product.discountPrice.toLocaleString('en-IN') : product.price.toLocaleString('en-IN')}
                    </span>
                    {product.discountPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
                <a 
                  href={`/request-access?product=${product.slug || product._id}`}
                  className="inline-flex w-full sm:w-auto items-center justify-center border border-[var(--color-gold)] bg-[var(--color-gold)] text-black px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] hover:bg-transparent hover:text-[var(--color-gold)] transition-colors duration-300"
                >
                  Enquire to Purchase
                </a>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                <span className="text-[var(--color-gold)] text-[10px] tracking-widest uppercase">Price on Request</span>
                <a 
                  href={`/request-access?product=${product.slug || product._id}`}
                  className="inline-flex w-full md:w-auto items-center justify-center border border-[var(--color-gold)] bg-[var(--color-gold)] text-black px-8 py-5 text-xs font-medium uppercase tracking-[0.25em] hover:bg-transparent hover:text-[var(--color-gold)] transition-colors duration-300"
                >
                  Request Private Access
                </a>
              </div>
            )}
            
            {/* Additional Brand Text */}
            <div className="mt-12 pt-8 border-t border-[#222]/50 text-xs text-[#666] uppercase tracking-widest space-y-4">
              <p>Personal Consultation Included</p>
              <p>Complimentary Secure Delivery</p>
              <p>Certificate of Authenticity</p>
            </div>
            
          </div>
        </div>
      </main>


    </div>
  );
}
