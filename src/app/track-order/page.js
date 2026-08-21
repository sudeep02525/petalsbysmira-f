"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search, Package, Truck, CheckCircle2, Box } from "lucide-react";
import axiosInstance from "../../services/axiosInstance";
import Skeleton from "../../components/ui/skeleton/Skeleton";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const orderQuery = searchParams.get("order") || "";
  const [orderNumber, setOrderNumber] = useState(orderQuery);
  const [searchOrder, setSearchOrder] = useState(orderQuery);

  const { data: order, isLoading, error, refetch } = useQuery({
    queryKey: ["order-track", searchOrder],
    queryFn: async () => {
      if (!searchOrder) return null;
      const { data } = await axiosInstance.get(`/orders/track/${searchOrder}`);
      return data;
    },
    enabled: !!searchOrder,
    retry: 1
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setSearchOrder(orderNumber.trim());
    router.push(`/track-order?order=${orderNumber.trim()}`);
  };

  const statusSteps = [
    { id: "placed", label: "Order Placed", icon: <Package className="w-5 h-5" /> },
    { id: "confirmed", label: "Confirmed", icon: <CheckCircle2 className="w-5 h-5" /> },
    { id: "shipped", label: "Shipped", icon: <Truck className="w-5 h-5" /> },
    { id: "delivered", label: "Delivered", icon: <Box className="w-5 h-5" /> }
  ];

  const getStatusIndex = (currentStatus) => {
    const statuses = ["placed", "confirmed", "shipped", "delivered"];
    const idx = statuses.indexOf(currentStatus?.toLowerCase());
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans min-h-[70vh]">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-primary-dark)] font-bold mb-4">
          Track Your Order
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Enter your order number below to check the current status of your shipment.
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-16">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input 
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Enter Order Number (e.g. ORD-12345678)"
            className="flex-1 h-12"
          />
          <Button type="submit" size="lg" className="h-12 px-6">
            <Search className="w-5 h-5 mr-2" />
            Track
          </Button>
        </form>
      </div>

      {isLoading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="p-8">
            <Skeleton className="h-24 w-full mb-8" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      )}

      {error && (
        <div className="text-center py-12 bg-red-50 rounded-xl border border-red-100">
          <p className="text-red-600 font-medium text-lg">Order not found</p>
          <p className="text-gray-600 mt-2">Please check your order number and try again.</p>
        </div>
      )}

      {order && !isLoading && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Order Number</p>
              <p className="text-lg font-bold text-[var(--color-primary-dark)]">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium sm:text-right">Expected Delivery</p>
              <p className="text-lg font-bold text-gray-900 sm:text-right">
                {new Date(new Date(order.createdAt).getTime() + 5*24*60*60*1000).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric"
                })}
              </p>
            </div>
          </div>

          <div className="p-8">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-[1.35rem] sm:left-auto sm:top-5 top-0 bottom-0 sm:bottom-auto sm:right-0 sm:left-0 sm:h-1 w-1 sm:w-full bg-gray-200 -z-10 mx-auto sm:mx-10 lg:mx-16"></div>
              
              <div className="absolute left-[1.35rem] sm:left-auto sm:top-5 top-0 bottom-0 sm:bottom-auto sm:right-0 sm:left-0 sm:h-1 w-1 sm:w-full bg-[var(--color-primary-dark)] -z-10 mx-auto sm:mx-10 lg:mx-16 origin-left transition-all duration-1000"
                   style={{ 
                     height: 'auto', 
                     width: typeof window !== 'undefined' && window.innerWidth >= 640 
                       ? `${(getStatusIndex(order.orderStatus) / (statusSteps.length - 1)) * 100}%` 
                       : 'auto' 
                   }}>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-0 relative">
                {statusSteps.map((step, idx) => {
                  const isActive = getStatusIndex(order.orderStatus) >= idx;
                  const isCurrent = getStatusIndex(order.orderStatus) === idx;
                  
                  return (
                    <div key={step.id} className="flex sm:flex-col items-center sm:text-center relative z-10 gap-4 sm:gap-3 flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-500 ${
                        isActive 
                          ? "bg-[var(--color-primary-dark)] border-white text-[var(--color-gold)]" 
                          : "bg-white border-gray-200 text-gray-400"
                      } ${isCurrent ? "ring-4 ring-[var(--color-gold)]/30" : ""}`}>
                        {step.icon}
                      </div>
                      <div>
                        <h4 className={`font-semibold ${isActive ? "text-gray-900" : "text-gray-400"}`}>
                          {step.label}
                        </h4>
                        {isCurrent && (
                          <p className="text-xs text-[var(--color-gold)] font-medium uppercase tracking-wide mt-1">Current Status</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {order.shipping?.awbCode && (
              <div className="mt-8 bg-gray-50 border border-gray-200 p-4 rounded-lg flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Shipping Courier</p>
                  <p className="font-bold text-gray-900">{order.shipping.courierName || "Shiprocket Courier"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium sm:text-right">Tracking AWB</p>
                  <p className="font-bold text-[var(--color-primary-dark)] sm:text-right">{order.shipping.awbCode}</p>
                </div>
              </div>
            )}

            <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-100">
              <h3 className="font-medium text-gray-900 mb-4">Tracking History</h3>
              <div className="space-y-4">
                {order.shiprocketTracking?.shipment_track_activities?.length > 0 ? (
                  order.shiprocketTracking.shipment_track_activities.map((activity, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center mt-1">
                        <div className="w-3 h-3 bg-[var(--color-gold)] rounded-full"></div>
                        {idx !== order.shiprocketTracking.shipment_track_activities.length - 1 && <div className="w-0.5 h-full bg-gray-300 mt-1"></div>}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-medium text-gray-900">{activity.status}</p>
                        <p className="text-sm text-gray-600 mt-1">{activity.activity}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {activity.date} {activity.location ? `- ${activity.location}` : ""}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  order.statusHistory?.slice().reverse().map((history, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center mt-1">
                        <div className="w-3 h-3 bg-[var(--color-gold)] rounded-full"></div>
                        {idx !== order.statusHistory.length - 1 && <div className="w-0.5 h-full bg-gray-300 mt-1"></div>}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-medium text-gray-900 capitalize">{history.status}</p>
                        <p className="text-sm text-gray-600 mt-1">{history.note}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(history.date).toLocaleString("en-IN", {
                            day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><Skeleton className="h-40 w-full max-w-4xl" /></div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
