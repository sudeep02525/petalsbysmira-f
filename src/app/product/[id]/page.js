"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, Truck, RefreshCw, Minus, Plus, ShoppingBag } from "lucide-react";
import axiosInstance from "../../../services/axiosInstance";
import { useCartStore } from "../../../store/cartStore";
import { Button } from "../../../components/ui/Button";
import PriceDisplay from "../../../components/ui/PriceDisplay";
import toast from "react-hot-toast";
import ProductDetailsSkeleton from "../../../components/ui/skeleton/ProductDetailsSkeleton";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id;
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/products/${id}`);
      return data.product || data.data || data;
    },
  });

  const handleQuantityChange = (type) => {
    if (type === "dec" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "inc" && product && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === "inc" && product && quantity >= product.stock) {
      toast.error(`Only ${product.stock} items available in stock`);
    }
  };

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Product not found or failed to load.
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const images = product.images?.length > 0 ? product.images : ["/placeholder.png"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
            {images[activeImage] && images[activeImage] !== "/placeholder.png" ? (
               <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Available</div>
            )}
            
            {product.discountPrice && (
              <span className="absolute top-4 left-4 bg-[var(--color-gold)] text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                SALE {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </span>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    activeImage === idx ? "border-[var(--color-gold)]" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                   <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <p className="text-sm text-[var(--color-gold)] font-medium mb-2 tracking-wide uppercase">
            {product.category?.name || "Premium Collection"}
          </p>
          
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--color-primary-dark)] mb-4 leading-tight">
            {product.name}
          </h1>
          
          <div className="mb-6">
            <PriceDisplay price={product.price} discountPrice={product.discountPrice} size="lg" />
            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>
          
          <div className="prose prose-sm text-gray-600 mb-8 max-w-none">
            <p>{product.description}</p>
          </div>

          <div className="mb-8 flex items-center gap-6">
            <div className="flex items-center border border-gray-300 rounded-md h-12">
              <button 
                onClick={() => handleQuantityChange("dec")}
                className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-[var(--color-primary-dark)] hover:bg-gray-100 transition-colors"
                disabled={isOutOfStock}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange("inc")}
                className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-[var(--color-primary-dark)] hover:bg-gray-100 transition-colors"
                disabled={isOutOfStock}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              {isOutOfStock ? (
                <span className="text-red-500 font-semibold">Out of Stock</span>
              ) : (
                <span>In Stock ({product.stock} available)</span>
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-1"
              disabled={isOutOfStock}
              onClick={() => addToCart(product, quantity)}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button 
              size="lg" 
              variant="primary" 
              className="flex-1"
              disabled={isOutOfStock}
              onClick={() => {
                addToCart(product, quantity);
                // In a real flow, redirect to checkout
                window.location.href = "/checkout";
              }}
            >
              Buy Now
            </Button>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--color-cream)] rounded-full text-[var(--color-primary-dark)]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--color-cream)] rounded-full text-[var(--color-primary-dark)]">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Easy Returns</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--color-cream)] rounded-full text-[var(--color-primary-dark)]">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
