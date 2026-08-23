"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product }) {
  // Use product images or placeholder
  const imageUrl = (product?.images && product.images.length > 0) 
    ? product.images[0] 
    : "https://images.unsplash.com/photo-1599643478514-4a820cbf311e?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="group relative flex flex-col h-full bg-black border border-[var(--color-gold)] border-opacity-30 rounded-sm overflow-hidden p-2 sm:p-3 pb-6 text-center hover:border-opacity-100 transition-colors duration-500">
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#111] mb-5">
        <Link href={`/editions/${product?.slug || product?._id}`} className="block w-full h-full">
          <img
            src={imageUrl}
            alt={product?.name || "Luxury Item"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] opacity-90 group-hover:opacity-100"
          />
        </Link>
        
        {/* Badges */}
        {product?.limitedEdition && (
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <span className="bg-transparent text-[var(--color-gold)] border border-[var(--color-gold)] text-[6px] sm:text-[7px] font-sans font-medium px-2 py-1 uppercase tracking-widest text-center shadow-sm flex flex-col items-center leading-[1.2]">
              <span>LIMITED</span>
              <span>EDITION</span>
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow items-center justify-between px-1 sm:px-2">
        <div className="mb-3 sm:mb-4">
          <Link href={`/editions/${product?.slug || product?._id}`} className="block">
            <h3 className="font-serif text-[11px] sm:text-xs md:text-sm text-[var(--color-offwhite)] uppercase tracking-wider mb-1 line-clamp-2 min-h-[32px] sm:min-h-0">
              {product?.name || "Premium Edition"}
            </h3>
          </Link>
          <p className="text-[9px] sm:text-[10px] md:text-[11px] text-[#A69B82] font-serif italic tracking-wide opacity-80 line-clamp-1">
            {product?.shortSubtitle || "A Legacy of Artistry"}
          </p>
        </div>
        
        {/* CTA Button */}
        <Link 
          href={`/request-access?product=${product?.slug || product?._id}`}
          className="mt-auto sm:mt-6 inline-flex items-center justify-center border border-[var(--color-gold)] border-opacity-50 text-[var(--color-gold)] px-2 sm:px-4 py-1.5 text-[7px] sm:text-[8px] md:text-[9px] font-sans uppercase tracking-[0.1em] sm:tracking-[0.2em] hover:bg-[var(--color-gold)] hover:text-black transition-all duration-300 w-full sm:w-auto min-w-0 sm:min-w-[120px]"
        >
          ACCESS LIMITED &nbsp;<span className="text-[8px] sm:text-[10px]">&gt;</span>
        </Link>
      </div>
    </div>
  );
}
