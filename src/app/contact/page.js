import Link from "next/link";
import { Mail, Phone, MapPin, Sparkles, MessageCircle, Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Concierge & Care Guide | Petals by Smira",
  description: "Connect with the Petals by Smira private concierge for bespoke commissions, private viewings, and jewellery care guidance.",
};

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919920688099";
  const conciergePhone = process.env.NEXT_PUBLIC_CONCIERGE_PHONE || "+91 99206 88099";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Petals by Smira Concierge, I would like to schedule a private consultation."
  )}`;

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-[var(--color-gold)] selection:text-black">
      <main className="flex-1 pb-24">
        {/* Hero Banner */}
        <div className="relative w-full h-[50vh] flex flex-col items-center justify-center border-b border-[#222]">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
          <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
            <span className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs font-medium mb-3 block">
              Private Concierge
            </span>
            <h1 className="text-4xl md:text-6xl text-[var(--color-offwhite)] mb-4 font-serif tracking-wide">
              At Your Service
            </h1>
            <p className="text-[#a69b82] text-sm md:text-base font-light leading-relaxed">
              Whether curating a bespoke gift or caring for your precious pieces, our concierge team is dedicated to your personal journey.
            </p>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-12 mt-16 space-y-20">
          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0c0c0c] border border-[#222] p-8 rounded-xl flex flex-col items-center text-center hover:border-[var(--color-gold)]/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center mb-5">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-white mb-2">Private Consultation</h3>
              <p className="text-xs text-[#888] mb-4">Dedicated direct phone assistance for private clientele</p>
              {conciergePhone ? (
                <a
                  href={`tel:${conciergePhone.replace(/\s+/g, "")}`}
                  className="text-sm font-medium text-[var(--color-gold)] hover:underline"
                >
                  {conciergePhone}
                </a>
              ) : (
                <Link
                  href="/request-access"
                  className="text-sm font-medium text-[var(--color-gold)] hover:underline"
                >
                  Request Consultation
                </Link>
              )}
            </div>

            <div className="bg-[#0c0c0c] border border-[#222] p-8 rounded-xl flex flex-col items-center text-center hover:border-[var(--color-gold)]/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center mb-5">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-white mb-2">WhatsApp Concierge</h3>
              <p className="text-xs text-[#888] mb-4">Direct bespoke inquiries and discreet private access</p>
              <a
                href={whatsappHref}
                {...(whatsappNumber ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-sm font-medium text-[var(--color-gold)] hover:underline"
              >
                Start Conversation
              </a>
            </div>

            <div className="bg-[#0c0c0c] border border-[#222] p-8 rounded-xl flex flex-col items-center text-center hover:border-[var(--color-gold)]/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center mb-5">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-white mb-2">Written Correspondence</h3>
              <p className="text-xs text-[#888] mb-4">Inquiries regarding corporate gifting and commissions</p>
              <a
                href="mailto:petalsbysmira@gmail.com"
                className="text-sm font-medium text-[var(--color-gold)] hover:underline"
              >
                petalsbysmira@gmail.com
              </a>
            </div>
          </div>

          {/* Care Guide Section */}
          <section className="bg-[#0c0c0c] border border-[#222] rounded-2xl p-8 md:p-12">
            <div className="max-w-2xl">
              <span className="text-[var(--color-gold)] uppercase tracking-[0.2em] text-xs mb-3 block">
                Preservation & Heritage
              </span>
              <h2 className="text-2xl md:text-3xl text-white font-serif mb-6">
                Jewellery Care Guide
              </h2>
              <p className="text-[#a69b82] text-sm leading-relaxed mb-8 font-light">
                Every creation by Petals by Smira is handcrafted to endure generations. To preserve their brilliance and delicate luster, observe these timeless principles:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-3 border-l border-[var(--color-gold)]/30 pl-6">
                <h4 className="text-white font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--color-gold)]" /> Delicate Cleaning
                </h4>
                <p className="text-[#999] text-xs leading-relaxed font-light">
                  Gently wipe with a soft lint-free microfiber cloth after every wear. Avoid harsh ultrasonic baths or chemical detergents on plated and hand-set gemstones.
                </p>
              </div>

              <div className="space-y-3 border-l border-[var(--color-gold)]/30 pl-6">
                <h4 className="text-white font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-gold)]" /> Safe Storage
                </h4>
                <p className="text-[#999] text-xs leading-relaxed font-light">
                  Store each piece separately in its original Petals by Smira velvet-lined protective case to avoid contact and surface abrasion.
                </p>
              </div>

              <div className="space-y-3 border-l border-[var(--color-gold)]/30 pl-6">
                <h4 className="text-white font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--color-gold)]" /> The Final Touch
                </h4>
                <p className="text-[#999] text-xs leading-relaxed font-light">
                  Perfumes, cosmetics, hairsprays, and moisture should always be applied before donning your jewellery. Allow all fragrances to dry completely.
                </p>
              </div>

              <div className="space-y-3 border-l border-[var(--color-gold)]/30 pl-6">
                <h4 className="text-white font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[var(--color-gold)]" /> Maison Inspection
                </h4>
                <p className="text-[#999] text-xs leading-relaxed font-light">
                  Complimentary inspection and gentle restoration are available upon request for registered private patrons through our concierge.
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-[#222] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#777]">Seeking a personalized private consultation?</span>
              <Link
                href="/request-access"
                className="px-6 py-2.5 bg-[var(--color-gold)] text-black text-xs font-semibold uppercase tracking-wider rounded hover:brightness-110 transition"
              >
                Request Private Access
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
