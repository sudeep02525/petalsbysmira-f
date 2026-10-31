import Link from "next/link";
import { HelpCircle, Sparkles, KeyRound, Truck, ShieldCheck, Mail } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | Petals by Smira",
  description: "Find answers regarding private access, bespoke gifting, shipping, and authentic craftsmanship at Petals by Smira.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  const faqs = [
    {
      category: "Private Access & Exclusivity",
      icon: <KeyRound className="w-5 h-5 text-[var(--color-gold)]" />,
      questions: [
        {
          q: "Why are prices not visible publicly for certain pieces?",
          a: "Petals by Smira operates on a private access model for limited edition and high-jewellery creations. By requesting private access, qualified patrons receive a secure 24-hour invitation to view exclusive pricing, acquire pieces, and access personalized concierge service.",
        },
        {
          q: "How long does it take to receive private access approval?",
          a: "Our private client concierge reviews each request individually. Invitations are typically dispatched via email within 2 to 4 business hours.",
        },
        {
          q: "Can private access be shared with colleagues or family?",
          a: "Each private access link is unique to your private invitation and remains valid for 24 hours. We kindly ask that members of your circle submit their own request for access.",
        },
      ],
    },
    {
      category: "Bespoke Commissions",
      icon: <Sparkles className="w-5 h-5 text-[var(--color-gold)]" />,
      questions: [
        {
          q: "Do you offer personalized packaging for corporate or wedding occasions?",
          a: "Yes. Our bespoke atelier designs custom debossed presentation boxes, engraved personal initials, and custom-written wax-sealed calligraphy notes for VIP gifts and milestone celebrations.",
        },
        {
          q: "What is the lead time for bespoke editions?",
          a: "Curated gift assortments require 5 to 7 business days, while custom-commissioned fine jewellery designs require 2 to 3 weeks depending on the complexity of handcrafting.",
        },
      ],
    },
    {
      category: "Delivery & Authentication",
      icon: <Truck className="w-5 h-5 text-[var(--color-gold)]" />,
      questions: [
        {
          q: "How are orders securely transported?",
          a: "All shipments are delivered via insured high-security white-glove couriers with mandatory OTP and signature verification upon handover.",
        },
        {
          q: "Are Petals by Smira creations certified?",
          a: "Every jewel is accompanied by a registered Certificate of Authenticity specifying craftsmanship hallmarks, premium alloy purity, and gemstone specifications.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-[var(--color-gold)] selection:text-black">
      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <div className="relative w-full h-[45vh] flex flex-col items-center justify-center border-b border-[#222]">
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
          {faqs.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#222] pb-3">
                {section.icon}
                <h2 className="text-lg md:text-xl font-serif text-white tracking-wide">
                  {section.category}
                </h2>
              </div>

              <div className="space-y-4">
                {section.questions.map((faq, fIdx) => (
                  <div
                    key={fIdx}
                    className="bg-[#0d0d0d] border border-[#222] rounded-xl p-6 hover:border-[var(--color-gold)]/30 transition-colors"
                  >
                    <h3 className="text-white font-medium text-base mb-2 font-serif flex items-start gap-2">
                      <span className="text-[var(--color-gold)] text-sm">Q.</span>
                      {faq.q}
                    </h3>
                    <p className="text-[#999] text-sm leading-relaxed font-light pl-5">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

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
