"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Package, User, LogOut, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

import { useAuthStore } from "../../store/authStore";
import axiosInstance from "../../services/axiosInstance";
import { Button } from "../../components/ui/Button";
import OrderSkeleton from "../../components/ui/skeleton/OrderSkeleton";

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    // Basic protection
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/orders/my-orders");
      return data.orders || data.data || data;
    },
    enabled: isAuthenticated,
  });

  if (!isAuthenticated || !user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans min-h-[70vh]">
      <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-primary-dark)] font-bold mb-8">
        My Account
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm sticky top-28">
            <div className="bg-[var(--color-primary-dark)] text-[var(--color-gold)] p-6">
              <div className="w-16 h-16 bg-[var(--color-gold)] rounded-full flex items-center justify-center text-[var(--color-primary-dark)] text-2xl font-bold mb-4">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="font-semibold text-lg text-white">{user.name}</h2>
              <p className="text-sm opacity-80">{user.email}</p>
            </div>
            
            <nav className="p-2 space-y-1">
              <button 
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === "orders" ? "bg-[var(--color-cream)] text-[var(--color-primary-dark)]" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <Package className="w-5 h-5 mr-3" />
                My Orders
              </button>
              <button 
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === "profile" ? "bg-[var(--color-cream)] text-[var(--color-primary-dark)]" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <User className="w-5 h-5 mr-3" />
                Profile Details
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors mt-4"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-3/4">
          
          {activeTab === "orders" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Order History</h2>
              </div>
              
              <div className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    <OrderSkeleton />
                    <OrderSkeleton />
                    <OrderSkeleton />
                  </div>
                ) : !orders || orders.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                    <Link href="/shop">
                      <Button>Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-md">
                        <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-200">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Order Placed</p>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric", month: "long", year: "numeric"
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Total</p>
                            <p className="text-sm font-medium text-gray-900">₹{order.totalAmount?.toLocaleString("en-IN")}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Order #</p>
                            <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
                          </div>
                          <div className="ml-auto">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                              order.orderStatus === "delivered" ? "bg-green-100 text-green-800" :
                              order.orderStatus === "cancelled" ? "bg-red-100 text-red-800" :
                              "bg-blue-100 text-blue-800"
                            }`}>
                              {order.orderStatus}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex -space-x-4 flex-1">
                              {order.items?.slice(0, 3).map((item, idx) => (
                                <div key={idx} className="w-16 h-16 rounded-lg border-2 border-white shadow-sm overflow-hidden bg-gray-100 z-10" style={{ zIndex: 10 - idx }}>
                                  {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                                </div>
                              ))}
                              {order.items?.length > 3 && (
                                <div className="w-16 h-16 rounded-lg border-2 border-white shadow-sm overflow-hidden bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 z-0">
                                  +{order.items.length - 3}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Link href={`/track-order?order=${order.orderNumber}`}>
                                <Button variant="outline" size="sm">Track Package</Button>
                              </Link>
                              <Link href={`/order-confirmation/${order.orderNumber}`}>
                                <Button variant="ghost" size="sm" className="text-[var(--color-primary-dark)]">
                                  Details <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Profile Details</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="mt-1 text-lg text-gray-900">{user.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                  <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                  <p className="mt-1 text-lg text-gray-900">{user.phone || "Not provided"}</p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
