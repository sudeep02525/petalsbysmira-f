import HeroSection from "../components/home/HeroSection";
import DynamicCollections from "../components/home/DynamicCollections";
import FeatureStrip from "../components/home/FeatureStrip";
import { getSettings } from "../lib/cms";

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata = {
  title: "Petals by Smira | Exclusive Luxury Showcase",
  description: "Exceptional pieces. Reserved for those who know. Private access to limited edition jewelry, watches, and bags.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <div className="bg-black min-h-screen text-[var(--color-offwhite)] font-sans">
      {/* 1. Luxury Hero Section */}
      <HeroSection settings={settings} />

      {/* 2. Dynamic Collections (The Editions, Watches, Bags) */}
      <DynamicCollections collectionOrder={settings?.collectionOrder} />

      {/* 3. Luxury Value/Feature Strip */}
      <FeatureStrip settings={settings} />
    </div>
  );
}
