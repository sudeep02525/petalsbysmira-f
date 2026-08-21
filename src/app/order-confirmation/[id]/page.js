"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Package, Truck, Loader2 } from "lucide-react";
import axiosInstance from "../../../services/axiosInstance";
import { Button } from "../../../components/ui/Button";

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderNumber = params.id;

  const { data: order, isLoading, error } = useQuery({
    queryKey: ["order", orderNumber],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/orders/track/${orderNumber}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="h-10 w-10 animate-spin text-[var(--color-gold)]" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center font-sans">
        <h1 className="text-2xl text-red-500 mb-4">Could not load order details</h1>
        <p className="text-gray-600 mb-8">Please check your order number or contact support.</p>
        <Link href="/shop"><Button>Continue Shopping</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-primary-dark)] font-bold mb-4">
          Thank you for your order!
        </h1>
        <p className="text-gray-600">
          Order number: <span className="font-semibold text-gray-900">{order.orderNumber}</span>
        </p>
        <p className="text-gray-600 mt-2">
          We've received your order and will contact you as soon as your package is shipped.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[var(--color-primary-dark)] text-[var(--color-gold)] px-6 py-4 flex justify-between items-center">
          <h2 className="font-semibold tracking-wide uppercase text-sm">Order Summary</h2>
          <span className="bg-[var(--color-gold)]/20 px-3 py-1 rounded-full text-xs font-bold">
            {order.paymentStatus === "completed" ? "PAID" : "COD"}
          </span>
        </div>
        
        <div className="p-6">
          <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto">
            {order.items?.map((item) => (
              <div key={item.product} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 border border-gray-200">
                  {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                  <div className="flex justify-between mt-1 text-sm text-gray-500">
                    <span>Qty: {item.quantity}</span>
                    <span className="font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{order.itemsTotal?.toLocaleString("en-IN")}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount {order.couponCode && `(${order.couponCode})`}</span>
                <span>-₹{order.discount?.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>{order.shippingCharge === 0 ? "Free" : `₹${order.shippingCharge}`}</span>
            </div>
            <div className="flex justify-between items-end pt-4 mt-2 border-t border-gray-200">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-xl text-[var(--color-primary-dark)]">
                ₹{order.totalAmount?.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center">
            <Truck className="w-5 h-5 mr-2 text-[var(--color-gold)]" />
            Shipping Details
          </h3>
          <p className="text-sm text-gray-600">
            {order.shippingAddress?.addressLine1}<br/>
            {order.shippingAddress?.addressLine2 && <>{order.shippingAddress.addressLine2}<br/></>}
            {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}<br/>
            India
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2 text-[var(--color-gold)]" />
            Estimated Delivery
          </h3>
          <p className="text-sm text-gray-600">
            Usually delivered within 4-5 business days. You will receive an email with tracking details once shipped.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={`/track-order?order=${order.orderNumber}`}>
          <Button variant="outline" size="lg" className="w-full sm:w-auto border-[var(--color-primary-dark)] text-[var(--color-primary-dark)]">
            Track Order
          </Button>
        </Link>
        <Link href="/shop">
          <Button size="lg" className="w-full sm:w-auto">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
