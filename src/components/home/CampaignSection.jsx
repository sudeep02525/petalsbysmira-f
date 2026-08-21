"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import Skeleton from "../ui/skeleton/Skeleton";

export default function CampaignSection() {
  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ["active-campaigns"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/campaigns/active");
      return data.campaigns || [];
    }
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Hide if no active campaigns
  if (error || !campaigns || campaigns.length === 0) {
    return null;
  }

  // We only show the highest priority active campaign on the homepage
  const campaign = campaigns[0];

  // Helper to determine grid columns based on image count
  const getGridCols = (count) => {
    if (count === 1) return "grid-cols-1 md:w-3/4 mx-auto";
    if (count === 2) return "grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto";
    if (count === 3) return "grid-cols-1 sm:grid-cols-3";
    if (count % 4 === 0 || count > 6) return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
    return "grid-cols-2 md:grid-cols-3";
  };

  return (
    <section className="py-16 md:py-20 bg-white border-b border-gray-100 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Campaign Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-primary-dark)] mb-4 uppercase tracking-wide">
            {campaign.title}
          </h2>
          {campaign.subtitle && (
            <p className="text-gray-600 text-lg md:text-xl font-medium">
              {campaign.subtitle}
            </p>
          )}
          {campaign.description && (
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              {campaign.description}
            </p>
          )}
          <div className="h-0.5 w-24 bg-[var(--color-gold)] mx-auto mt-6"></div>
        </div>

        {/* Dynamic Image Grid */}
        <div className={`grid gap-4 sm:gap-6 ${getGridCols(campaign.images.length)}`}>
          {campaign.images.map((img, idx) => {
            const imageContent = (
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden group shadow-sm">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500 z-10"></div>
                <img 
                  src={img.url} 
                  alt={img.alt || campaign.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  loading={idx > 3 ? "lazy" : "eager"}
                />
                {img.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-20">
                    <p className="text-white font-medium">{img.title}</p>
                  </div>
                )}
              </div>
            );

            if (img.link) {
              return (
                <Link key={img._id || idx} href={img.link} className="block">
                  {imageContent}
                </Link>
              );
            }

            return <div key={img._id || idx}>{imageContent}</div>;
          })}
        </div>

        {/* Campaign CTA */}
        {campaign.cta?.enabled && (
          <div className="mt-12 text-center">
            <Link href={campaign.cta.link}>
              <Button size="lg" className="px-8 font-medium">
                {campaign.cta.text} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
