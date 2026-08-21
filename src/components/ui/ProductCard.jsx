"use client";

import Link from "next/link";
import { useCartStore } from "../../store/cartStore";
import { Button } from "./Button";
import PriceDisplay from "./PriceDisplay";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group relative bg-transparent flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f9f9f9]">
        <Link href={`/product/${product._id}`} className="block w-full h-full">
          {product.images && product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=800&auto=format&fit=crop";
              }}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=800&auto=format&fit=crop"
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            />
          )}
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.discountPrice && (
            <span className="bg-white text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-sm">
              Sale
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-black text-[var(--color-gold)] border border-[var(--color-gold)] text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-sm">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick Add Button (Slide Up on Hover) */}
        {!isOutOfStock && (
          <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="w-full bg-black/90 backdrop-blur-sm text-[var(--color-gold)] py-3.5 text-xs font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-black transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Quick Add
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="pt-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-1">
          <Link href={`/product/${product._id}`} className="block flex-1">
            <h3 className="font-serif text-base md:text-lg text-[#2c2c2c] group-hover:text-[var(--color-gold)] transition-colors line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
          {product.category?.name || "Premium Gift"}
        </p>
        
        <div className="mt-auto">
          <PriceDisplay 
            price={product.price} 
            discountPrice={product.discountPrice} 
            size="sm" 
          />
        </div>
      </div>
    </div>
  );
}
