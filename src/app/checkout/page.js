"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ShieldCheck, Truck, CreditCard, ChevronRight, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import axiosInstance from "../../services/axiosInstance";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

// Validation schema
const shippingSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required").matches(/^[0-9]{10}$/, "Must be exactly 10 digits"),
  addressLine1: yup.string().required("Address is required"),
  addressLine2: yup.string(),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  pincode: yup.string().required("Pincode is required").matches(/^[0-9]{6}$/, "Must be exactly 6 digits"),
});

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Load Razorpay Script
  useEffect(() => {
    const loadRazorpay = () => {
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
      }
    };
    loadRazorpay();
  }, []);

  const total = getCartTotal();

  // Redirect if cart empty
  useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      router.push("/cart");
    }
  }, [items, router, isProcessing]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(shippingSchema),
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    }
  });

  const onShippingSubmit = (data) => {
    setStep(2);
    // Keep shipping data in form context
  };

  const placeOrder = async (data) => {
    setIsProcessing(true);
    
    try {
      const orderData = {
        items: items.map(i => ({ productId: i.product, quantity: i.quantity })),
        shippingAddress: {
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          country: "India"
        },
        paymentMethod,
        guestEmail: !user ? data.email : undefined,
        notes: ""
      };

      const res = await axiosInstance.post("/orders", orderData);
      
      if (paymentMethod === "cod") {
        clearCart();
        toast.success("Order placed successfully!");
        router.push(`/order-confirmation/${res.data.order.orderNumber}`);
      } else if (paymentMethod === "razorpay") {
        const { order, razorpay } = res.data;
        
        const options = {
          key: razorpay.keyId,
          amount: razorpay.amount,
          currency: razorpay.currency,
          name: "Petals by Smira",
          description: "Luxury Gifting",
          order_id: razorpay.orderId,
          handler: async function (response) {
            try {
              // Verify payment on backend
              await axiosInstance.post("/payment/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              
              clearCart();
              toast.success("Payment successful!");
              router.push(`/order-confirmation/${order.orderNumber}`);
            } catch (err) {
              toast.error("Payment verification failed");
              setIsProcessing(false);
            }
          },
          prefill: {
            name: data.fullName,
            email: data.email,
            contact: data.phone,
          },
          theme: {
            color: "#0d2818",
          },
          modal: {
            ondismiss: function() {
              toast.error("Payment cancelled");
              setIsProcessing(false);
            }
          }
        };
        
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !isProcessing) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-primary-dark)] font-bold">
          Checkout
        </h1>
        
        {/* Progress Steps */}
        <div className="flex items-center mt-6 max-w-sm">
          <div className={`flex items-center ${step >= 1 ? "text-[var(--color-primary-dark)]" : "text-gray-400"}`}>
            <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step >= 1 ? "border-[var(--color-primary-dark)] bg-[var(--color-primary-dark)] text-white" : "border-gray-300"} font-semibold text-sm`}>
              1
            </span>
            <span className="ml-2 font-medium">Shipping</span>
          </div>
          <div className={`flex-1 h-1 mx-4 ${step >= 2 ? "bg-[var(--color-primary-dark)]" : "bg-gray-200"}`}></div>
          <div className={`flex items-center ${step >= 2 ? "text-[var(--color-primary-dark)]" : "text-gray-400"}`}>
            <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step >= 2 ? "border-[var(--color-primary-dark)] bg-[var(--color-primary-dark)] text-white" : "border-gray-300"} font-semibold text-sm`}>
              2
            </span>
            <span className="ml-2 font-medium">Payment</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Truck className="w-5 h-5 mr-3 text-[var(--color-gold)]" />
                Shipping Information
              </h2>
              
              <form id="shipping-form" onSubmit={handleSubmit(onShippingSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input {...register("fullName")} error={errors.fullName} placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input type="email" {...register("email")} error={errors.email} placeholder="john@example.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <Input {...register("phone")} error={errors.phone} placeholder="9876543210" />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                    <Input {...register("addressLine1")} error={errors.addressLine1} placeholder="Flat/House No, Building, Street" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                    <Input {...register("addressLine2")} error={errors.addressLine2} placeholder="Locality, Area" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <Input {...register("city")} error={errors.city} placeholder="Mumbai" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <Input {...register("state")} error={errors.state} placeholder="Maharashtra" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <Input {...register("pincode")} error={errors.pincode} placeholder="400001" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <Input value="India" disabled className="bg-gray-50" />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <Button type="submit" size="lg">
                    Continue to Payment
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-3 text-[var(--color-gold)]" />
                Payment Method
              </h2>
              
              <div className="space-y-4 mb-8">
                <label className={`block border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === "razorpay" ? "border-[var(--color-primary-dark)] bg-emerald-50/30" : "border-gray-200 hover:border-gray-300"}`}>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="razorpay" 
                      checked={paymentMethod === "razorpay"} 
                      onChange={() => setPaymentMethod("razorpay")}
                      className="h-5 w-5 text-[var(--color-gold)] focus:ring-[var(--color-gold)] border-gray-300"
                    />
                    <div className="ml-4 flex-1">
                      <span className="block font-medium text-gray-900">Pay Online (Razorpay)</span>
                      <span className="block text-sm text-gray-500 mt-1">UPI, Credit/Debit Cards, NetBanking, Wallets</span>
                    </div>
                    <ShieldCheck className="w-6 h-6 text-green-600 ml-4" />
                  </div>
                </label>
                
                <label className={`block border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === "cod" ? "border-[var(--color-primary-dark)] bg-emerald-50/30" : "border-gray-200 hover:border-gray-300"}`}>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod" 
                      checked={paymentMethod === "cod"} 
                      onChange={() => setPaymentMethod("cod")}
                      className="h-5 w-5 text-[var(--color-gold)] focus:ring-[var(--color-gold)] border-gray-300"
                    />
                    <div className="ml-4 flex-1">
                      <span className="block font-medium text-gray-900">Cash on Delivery</span>
                      <span className="block text-sm text-gray-500 mt-1">Pay when your order arrives</span>
                    </div>
                  </div>
                </label>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Back to Shipping
                </button>
                <Button 
                  onClick={handleSubmit(placeOrder)} 
                  size="lg" 
                  isLoading={isProcessing}
                >
                  {paymentMethod === "razorpay" ? "Proceed to Pay" : "Place Order"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sticky Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-28">
            <h2 className="font-serif text-lg font-semibold text-[var(--color-primary-dark)] mb-4 pb-4 border-b border-gray-100">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.product} className="flex gap-4">
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
            
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-end">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-2xl text-[var(--color-primary-dark)]">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
            
            {step === 2 && (
              <div className="mt-6 flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  By placing your order, you agree to Petals by Smira's <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                </p>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
