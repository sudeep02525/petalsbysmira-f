"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Building2, Briefcase, Gift, CheckCircle2 } from "lucide-react";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

const enquirySchema = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  contactName: yup.string().required("Contact person name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  quantity: yup.number().typeError("Must be a number").min(10, "Minimum 10 items required for corporate orders").required("Quantity is required"),
  budget: yup.string().required("Estimated budget is required"),
  message: yup.string().required("Please provide some details about your requirement"),
});

export default function CorporateGiftingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(enquirySchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call for enquiry
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      reset();
      toast.success("Enquiry submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans pb-20 bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-[var(--color-primary-dark)] text-center py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 px-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-offwhite)] mb-4">
            Corporate Gifting
          </h1>
          <p className="text-[var(--color-gold)] text-lg max-w-2xl mx-auto font-light">
            Elevate your corporate relationships with bespoke luxury gifts that leave a lasting impression.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-[var(--color-cream)] rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-[var(--color-primary-dark)]" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3">Client Appreciation</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Strengthen business relationships with premium gifts that show your clients how much you value their partnership.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-[var(--color-cream)] rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 text-[var(--color-primary-dark)]" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3">Employee Recognition</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Celebrate milestones, achievements, and festivals with curated hampers that make your team feel truly appreciated.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-[var(--color-cream)] rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-8 h-8 text-[var(--color-primary-dark)]" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3">Custom Branding</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We offer bespoke packaging options featuring your company logo and brand colors for a personalized touch.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-5/12 bg-[var(--color-primary-dark)] p-10 text-white flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-3xl text-[var(--color-gold)] mb-6">Get in Touch</h2>
                <p className="text-sm opacity-90 leading-relaxed mb-8">
                  Fill out the enquiry form, and our corporate gifting specialist will contact you within 24 hours to discuss your requirements.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-[var(--color-gold)] font-bold uppercase tracking-wider mb-1">Email</p>
                    <p className="text-sm">corporate@petalsbysmira.com</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-gold)] font-bold uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-sm">+91 98765 43211</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-gold)] font-bold uppercase tracking-wider mb-1">Minimum Order</p>
                    <p className="text-sm">10 pieces / ₹25,000 value</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-7/12 p-10">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-2">Enquiry Received</h3>
                  <p className="text-gray-600 mb-8">Thank you for your interest. Our corporate specialist will contact you shortly.</p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline">Submit Another Enquiry</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                      <Input {...register("companyName")} error={errors.companyName} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
                      <Input {...register("contactName")} error={errors.contactName} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <Input type="email" {...register("email")} error={errors.email} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <Input {...register("phone")} error={errors.phone} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Quantity *</label>
                      <Input type="number" {...register("quantity")} error={errors.quantity} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Budget Per Item (₹) *</label>
                      <select 
                        {...register("budget")} 
                        className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] ${errors.budget ? "border-red-500" : "border-gray-300 bg-white"}`}
                      >
                        <option value="">Select Budget Range</option>
                        <option value="500-1000">₹500 - ₹1,000</option>
                        <option value="1000-2500">₹1,000 - ₹2,500</option>
                        <option value="2500-5000">₹2,500 - ₹5,000</option>
                        <option value="5000+">Above ₹5,000</option>
                      </select>
                      {errors.budget && <p className="mt-1 text-sm text-red-500">{errors.budget.message}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requirements & Details *</label>
                    <textarea 
                      {...register("message")}
                      rows="4"
                      className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] ${errors.message ? "border-red-500" : "border-gray-300 bg-white"}`}
                      placeholder="Please tell us about the occasion and any specific requirements..."
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                    Submit Enquiry
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
