"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axiosInstance from "../../services/axiosInstance";
import { cdnImg } from "../../utils/utils";

function RequestAccessForm() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredContactMethod: "Phone",
    message: ""
  });
  
  const [productData, setProductData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (productSlug) {
      axiosInstance
        .get(`/products/${productSlug}`)
        .then((res) => {
          if (res.data && res.data._id) {
            setProductData(res.data);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [productSlug]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      await axiosInstance.post("/requests", {
        ...formData,
        ...(productData && {
          productId: productData._id,
          collectionId: productData.collectionId || productData.category,
        }),
      });

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.response?.data?.message || error.message || "Failed to submit request");
    }
  };

  if (status === "success") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] text-center px-5 py-24">
        <div className="border border-[var(--color-gold)]/30 p-12 md:p-16 bg-[#0a0a0a] max-w-2xl w-full flex flex-col items-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[var(--color-gold)] opacity-5 blur-[100px] pointer-events-none"></div>
          
          <div className="w-16 h-16 rounded-full border border-[var(--color-gold)] flex items-center justify-center mb-8 bg-[#111]">
            <svg className="w-6 h-6 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className={`text-3xl md:text-4xl text-[var(--color-gold)] mb-4 font-serif tracking-wide`}>REQUEST RECEIVED</h1>
          
          <div className="w-12 h-[1px] bg-[var(--color-gold)]/50 mb-6"></div>
          
          <p className="text-[#ccc] max-w-md mx-auto leading-relaxed text-sm font-light mb-10">
            Thank you for your interest in Petals by Smira. Our private access team will contact you shortly to arrange your exclusive consultation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/editions" 
              className="inline-flex items-center justify-center border border-[#333] bg-black text-[var(--color-offwhite)] px-8 py-3.5 text-[10px] font-sans tracking-[0.2em] uppercase hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-300 min-w-[200px]"
            >
              Continue Exploring
            </Link>
            <Link 
              href="/" 
              className="inline-flex items-center justify-center border border-[var(--color-gold)] bg-[var(--color-gold)] text-black px-8 py-3.5 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-[#b8952b] transition-all duration-300 min-w-[200px]"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-[1200px] mx-auto w-full px-5 py-24 md:py-32">
      <div className="text-center mb-12">
        <h1 className={`text-3xl md:text-5xl text-[var(--color-gold)] mb-4 font-serif`}>PRIVATE ACCESS</h1>
        <p className="text-[#A69B82] text-sm tracking-widest uppercase">Request a private consultation</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left: Product Preview */}
        <div className="w-full md:w-1/3 flex flex-col border border-[#222] p-6 bg-[#0a0a0a]">
          <h2 className="text-[var(--color-gold)] text-xs uppercase tracking-[0.2em] mb-6 border-b border-[#222] pb-4">Selected Piece</h2>
          
          {productData ? (
            <div className="flex flex-col gap-4">
              <div className="aspect-square relative w-full bg-black">
                <img 
                  src={cdnImg(productData.images?.[0], 400) || "/image.jpg"} 
                  alt={productData.name} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className={`text-[var(--color-offwhite)] text-lg font-serif`}>{productData.name}</h3>
                {productData.limitedEdition && (
                  <span className="inline-block mt-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] border border-[var(--color-gold)]/50 px-2 py-1">
                    Limited Edition
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#555] text-xs uppercase tracking-widest text-center">
              {productSlug ? "Loading piece..." : "No piece selected"}
            </div>
          )}
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-2/3">
          {status === "error" && (
            <div className="mb-6 p-4 border border-red-900 bg-red-950/20 text-red-400 text-sm">
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#A69B82]">Full Name *</label>
              <input 
                required 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-transparent border border-[#333] p-3 text-[var(--color-offwhite)] focus:border-[var(--color-gold)] outline-none transition-colors"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#A69B82]">Email Address *</label>
                <input 
                  required 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent border border-[#333] p-3 text-[var(--color-offwhite)] focus:border-[var(--color-gold)] outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#A69B82]">Phone Number *</label>
                <input 
                  required 
                  type="tel" 
                  name="phone"
                  pattern="[0-9+\s-]{10,15}"
                  title="Enter a valid phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-transparent border border-[#333] p-3 text-[var(--color-offwhite)] focus:border-[var(--color-gold)] outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#A69B82]">Preferred Contact Method</label>
              <div className="relative">
                <select 
                  name="preferredContactMethod"
                  value={formData.preferredContactMethod}
                  onChange={handleChange}
                  className="w-full bg-black border border-[#333] p-3 text-[var(--color-offwhite)] focus:border-[var(--color-gold)] outline-none transition-colors appearance-none pr-10"
                >
                  <option value="Phone">Phone</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Email">Email</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#A69B82]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#A69B82]">Message (Optional)</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="bg-transparent border border-[#333] p-3 text-[var(--color-offwhite)] focus:border-[var(--color-gold)] outline-none transition-colors resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={status === "submitting"}
              className="mt-4 bg-[var(--color-gold)] text-black font-medium text-xs uppercase tracking-[0.25em] py-4 px-8 hover:bg-[#b8952b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function RequestAccessPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">

      <Suspense fallback={<div className="flex-1 flex items-center justify-center text-[var(--color-gold)]">Loading...</div>}>
        <RequestAccessForm />
      </Suspense>

    </div>
  );
}
