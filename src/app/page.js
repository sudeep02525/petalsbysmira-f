import HeroSection from "../components/home/HeroSection";
import CategoriesSection from "../components/home/CategoriesSection";
import TrustSection from "../components/home/TrustSection";
import BannersSection from "../components/home/BannersSection";
import ProductSection from "../components/home/ProductSection";
import CampaignSection from "../components/home/CampaignSection";

export const metadata = {
  title: "Petals by Smira | Luxury Gifting",
  description: "Curated with love. Made to impress. Premium luxury gifting for birthdays, anniversaries, festivals, weddings, and milestones.",
};

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* 1. Hero Section with Featured Products */}
      <HeroSection />

      {/* Dynamic Campaign / Festival Offer Section */}
      <CampaignSection />
      
      {/* 2. Best Sellers - High priority product grid */}
      <div className="bg-[var(--color-offwhite)] pt-10">
        <ProductSection title="Trending Now ✨" type="featured" linkTo="/shop" />
      </div>

      {/* 3. Shop by Category (Editorial Layout) */}
      <CategoriesSection />
      
      {/* 4. Promotional Banner (Visual Break) */}
      <BannersSection />

      {/* 5. New Arrivals */}
      <div className="bg-white">
        <ProductSection title="Just Arrived" type="newArrival" linkTo="/shop?sort=newest" />
      </div>



      {/* 7. Why Choose Us (Trust Badges) */}
      <TrustSection />
    </div>
  );
}
