"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
      // Fetch product details for the preview
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productSlug}`)
        .then(res => res.json())
        .then(data => {
          if (data && data._id) {
            setProductData(data);
          }
        })
        .catch(err => console.error(err));
    }
  }, [productSlug]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (!productData) {
      setStatus("error");
      setErrorMessage("No product selected. Please select a product from The Editions first.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productId: productData._id,
          collectionId: productData.collectionId || productData.category
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit request");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  };

  if (status === "success") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className={`text-3xl md:text-5xl text-[var(--color-gold)] mb-6 font-serif`}>REQUEST RECEIVED</h1>
        <p className="text-[var(--color-offwhite)] max-w-md mx-auto leading-relaxed text-sm tracking-wide">
          Thank you. Our private access team will contact you shortly to arrange your consultation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-5 py-24 md:py-32">
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
                  src={productData.images?.[0] || "/placeholder.jpg"} 
                  alt={productData.name} 
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
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-transparent border border-[#333] p-3 text-[var(--color-offwhite)] focus:border-[var(--color-gold)] outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#A69B82]">Preferred Contact Method</label>
              <select 
                name="preferredContactMethod"
                value={formData.preferredContactMethod}
                onChange={handleChange}
                className="bg-black border border-[#333] p-3 text-[var(--color-offwhite)] focus:border-[var(--color-gold)] outline-none transition-colors appearance-none"
              >
                <option value="Phone">Phone</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
              </select>
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
              disabled={status === "submitting" || !productData}
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
      <Navbar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center text-[var(--color-gold)]">Loading...</div>}>
        <RequestAccessForm />
      </Suspense>
      <Footer />
    </div>
  );
}
