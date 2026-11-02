import Link from "next/link";
import { HelpCircle, Sparkles, KeyRound, Truck, ShieldCheck, Mail } from "lucide-react";
import { getFaqs } from "../../lib/cms";

export const revalidate = 300;

export async function generateMetadata() {
  return {
    title: "Frequently Asked Questions | Petals by Smira",
    description:
      "Find answers regarding private access, bespoke gifting, shipping, and authentic craftsmanship at Petals by Smira.",
    alternates: { canonical: "/faq" },
  };
}

const getCategoryIcon = (category = "") => {
  const c = category.toLowerCase();
  if (c.includes("access") || c.includes("exclusiv") || c.includes("privat")) {
    return <KeyRound className="w-5 h-5 text-[var(--color-gold)]" />;
  }
  if (c.includes("bespoke") || c.includes("craft") || c.includes("commission")) {
    return <Sparkles className="w-5 h-5 text-[var(--color-gold)]" />;
  }
  if (c.includes("deliver") || c.includes("ship") || c.includes("transport")) {
    return <Truck className="w-5 h-5 text-[var(--color-gold)]" />;
  }
  if (c.includes("authent") || c.includes("certif") || c.includes("guarantee")) {
    return <ShieldCheck className="w-5 h-5 text-[var(--color-gold)]" />;
  }
  return <HelpCircle className="w-5 h-5 text-[var(--color-gold)]" />;
};

export default async function FAQPage() {
  const data = await getFaqs();
  const categories = data?.categories || [];

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-[var(--color-gold)] selection:text-black">
      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <div className="relative w-full h-[45svh] flex flex-col items-center justify-center border-b border-[#222]">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
          <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
            <span className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs font-medium mb-3 block">
              Inquiries & Guidance
            </span>
            <h1 className="text-4xl md:text-6xl text-[var(--color-offwhite)] mb-4 font-serif tracking-wide">
              Frequently Asked Questions
            </h1>
            <p className="text-[#a69b82] text-sm md:text-base font-light">
              Insights into our private access, maison standards, and concierge services.
            </p>
          </div>
        </div>

        <div className="max-w-[900px] mx-auto px-5 sm:px-6 lg:px-8 mt-16 space-y-16">
          {categories.map((section, idx) => (
            <div key={section.category || idx} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#222] pb-3">
                {getCategoryIcon(section.category)}
                <h2 className="text-lg md:text-xl font-serif text-white tracking-wide">
                  {section.category}
                </h2>
              </div>

              <div className="space-y-4">
                {(section.questions || []).map((faq, fIdx) => (
                  <div
                    key={faq._id || fIdx}
                    className="bg-[#0d0d0d] border border-[#222] rounded-xl p-6 hover:border-[var(--color-gold)]/30 transition-colors"
                  >
                    <h3 className="text-white font-medium text-base mb-2 font-serif flex items-start gap-2">
                      <span className="text-[var(--color-gold)] text-sm">Q.</span>
                      {faq.q}
                    </h3>
                    <p className="text-[#999] text-sm leading-relaxed font-light pl-5 whitespace-pre-line">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <div className="py-16 text-center text-[#666] text-sm">
              No frequently asked questions available at this time.
            </div>
          )}

          {/* Need help footer */}
          <div className="bg-[#0d0d0d] border border-[var(--color-gold)]/20 rounded-2xl p-8 text-center space-y-4">
            <h3 className="text-xl font-serif text-white">Have a question not addressed here?</h3>
            <p className="text-xs text-[#888] max-w-md mx-auto">
              Our concierge team is available to assist you personally with private consultations and special requests.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-2.5 bg-[var(--color-gold)] text-black text-xs font-semibold uppercase tracking-wider rounded hover:brightness-110 transition inline-flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" /> Contact Concierge
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
