import HeroSection from "../components/home/HeroSection";
import DynamicCollections from "../components/home/DynamicCollections";
import FeatureStrip from "../components/home/FeatureStrip";

export const metadata = {
  title: "Petals by Smira | Exclusive Luxury Showcase",
  description: "Exceptional pieces. Reserved for those who know. Private access to limited edition jewelry, watches, and bags.",
};

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen text-[var(--color-offwhite)] font-sans">
      {/* 1. Luxury Hero Section */}
      <HeroSection />

      {/* 2. Dynamic Collections (The Editions, Watches, Bags) */}
      <DynamicCollections />

      {/* 3. Luxury Value/Feature Strip */}
      <FeatureStrip />
    </div>
  );
}
