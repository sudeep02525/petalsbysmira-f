"use client";

import Link from "next/link";
import { cdnImg } from "../../utils/utils";

export default function ProductCard({ product }) {
  // Use product images or placeholder
  const rawImageUrl = (product?.images && product.images.length > 0) 
    ? product.images[0] 
    : "https://images.unsplash.com/photo-1599643478514-4a820cbf311e?q=80&w=800&auto=format&fit=crop";
  const imageUrl = cdnImg(rawImageUrl, 600);

  const hasPrivatePrice = product?.price !== null && product?.price !== undefined;
  const isGated = Boolean(product?.requestAccessEnabled);

  return (
    <div className="group relative flex flex-col h-full bg-[#0d0d0d] border border-[var(--color-gold)] border-opacity-40 rounded-sm overflow-hidden p-2 sm:p-3 pb-4 sm:pb-6 text-center hover:border-opacity-100 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] hover:-translate-y-1 transition-all duration-500 ease-out">
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-sm bg-[#111] mb-4 sm:mb-5">
        <Link href={`/editions/${product?.slug || product?._id}`} className="block w-full h-full">
          <img
            src={imageUrl}
            alt={product?.name || "Luxury Item"}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] opacity-90 group-hover:opacity-100"
          />
        </Link>
        
        {/* Badges */}
        {product?.limitedEdition && (
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <span className="bg-black/70 backdrop-blur-md text-[var(--color-gold)] border border-[var(--color-gold)]/40 text-[6px] sm:text-[7px] font-sans font-medium px-2 py-1.5 uppercase tracking-widest text-center shadow-lg flex flex-col items-center leading-[1.2]">
              <span>LIMITED</span>
              <span>EDITION</span>
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow items-center justify-between px-1">
        <div className="mb-3 sm:mb-4">
          <Link href={`/editions/${product?.slug || product?._id}`} className="block">
            <h3 className="font-serif text-[11px] sm:text-xs md:text-[13px] text-[var(--color-offwhite)] uppercase tracking-[0.15em] mb-1.5 line-clamp-2 min-h-[30px] sm:min-h-0 group-hover:text-[var(--color-gold)] transition-colors duration-500">
              {product?.name || "Premium Edition"}
            </h3>
          </Link>
          <p className="text-[9px] md:text-[10px] text-[#A69B82] font-serif italic tracking-[0.1em] opacity-80 line-clamp-1 mb-2">
            {product?.shortSubtitle || "A Legacy of Artistry"}
          </p>

          {/* Private Price when unlocked */}
          {hasPrivatePrice && (
            <div className="pt-1 flex items-center justify-center gap-1.5">
              <span className="text-[11px] sm:text-xs font-mono font-medium text-[var(--color-gold)]">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </span>
              {isGated && (
                <span className="text-[7px] uppercase tracking-widest text-emerald-400 font-sans border border-emerald-500/30 px-1 py-0.2 rounded-sm bg-emerald-950/20">
                  Unlocked
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Link */}
        <Link
          href={`/editions/${product?.slug || product?._id}`}
          className="inline-block border border-[var(--color-gold)] border-opacity-50 text-[var(--color-gold)] text-[8px] sm:text-[9px] tracking-[0.2em] font-sans uppercase px-3 sm:px-4 py-1.5 hover:bg-[var(--color-gold)] hover:text-black transition-all duration-300 w-full"
        >
          {isGated && !hasPrivatePrice ? "Unlock Pricing" : "View Piece"}
        </Link>
      </div>

    </div>
  );
}
