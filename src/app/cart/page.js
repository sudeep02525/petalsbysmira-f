"use client";

import Link from "next/link";
import { useCartStore } from "../../store/cartStore";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "../../components/ui/Button";
import PriceDisplay from "../../components/ui/PriceDisplay";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCartStore();

  const handleQuantityChange = (item, type) => {
    if (type === "dec" && item.quantity > 1) {
      updateQuantity(item.product, item.quantity - 1);
    } else if (type === "inc" && item.quantity < item.stock) {
      updateQuantity(item.product, item.quantity + 1);
    }
  };

  const total = getCartTotal();
  const shipping = total > 0 ? 0 : 0; // Free shipping as per top bar

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 font-sans text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="font-serif text-3xl text-[var(--color-primary-dark)] mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Discover our luxury collections and find the perfect gift.
        </p>
        <Link href="/shop">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-primary-dark)] mb-8 font-bold">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items List */}
        <div className="w-full lg:w-2/3">
          <div className="border-t border-gray-200">
            {items.map((item) => (
              <div key={item.product} className="flex flex-col sm:flex-row py-6 border-b border-gray-200 gap-6">
                <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link href={`/product/${item.product}`}>
                        <h3 className="font-serif text-xl font-medium text-[var(--color-primary-dark)] hover:text-[var(--color-gold)] transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <button 
                        onClick={() => removeFromCart(item.product)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <PriceDisplay price={item.price} size="sm" className="mt-2" />
                  </div>
                  
                  <div className="flex items-center mt-4 sm:mt-0">
                    <div className="flex items-center border border-gray-300 rounded-md h-9">
                      <button 
                        onClick={() => handleQuantityChange(item, "dec")}
                        className="w-9 h-full flex items-center justify-center text-gray-600 hover:text-[var(--color-primary-dark)] hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item, "inc")}
                        className="w-9 h-full flex items-center justify-center text-gray-600 hover:text-[var(--color-primary-dark)] hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="ml-auto font-bold text-lg text-[var(--color-primary-dark)]">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-[var(--color-offwhite)] rounded-xl p-6 border border-[var(--color-cream)] sticky top-28 shadow-sm">
            <h2 className="font-serif text-xl font-semibold text-[var(--color-primary-dark)] mb-6 border-b border-gray-200 pb-4">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-2xl text-[var(--color-primary-dark)]">
                  ₹{(total + shipping).toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-xs text-gray-500 text-right mt-1">Inclusive of all taxes</p>
            </div>
            
            <Link href="/checkout" className="block w-full">
              <Button size="lg" className="w-full group">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure checkout powered by Razorpay</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
