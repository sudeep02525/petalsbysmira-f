export const metadata = {
  title: "Terms of Service | Petals by Smira",
  description: "Terms governing private access, commissions, acquisitions, and certificates of authenticity at Petals by Smira.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-[var(--color-gold)] selection:text-black">
      <main className="flex-1 pb-24">
        {/* Header */}
        <div className="relative w-full h-[40vh] flex flex-col items-center justify-center border-b border-[#222]">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
          <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
            <span className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs font-medium mb-3 block">
              Maison Protocols
            </span>
            <h1 className="text-3xl md:text-5xl text-[var(--color-offwhite)] mb-3 font-serif tracking-wide">
              Terms of Service
            </h1>
            <p className="text-[#a69b82] text-xs uppercase tracking-widest">
              Last Updated: October 2026
            </p>
          </div>
        </div>

        <div className="max-w-[850px] mx-auto px-5 sm:px-6 lg:px-8 mt-16 space-y-12 text-[#ccc] font-light text-sm leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-serif text-white tracking-wide border-b border-[#222] pb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing Petals by Smira websites, requesting private access, or ordering our bespoke luxury creations, you agree to be bound by these Maison Terms of Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-white tracking-wide border-b border-[#222] pb-2">
              2. Private Access Model & Invitations
            </h2>
            <p>
              Private access invitations and pricing previews are extended at the sole discretion of Petals by Smira. Access credentials and private pricing tokens are non-transferable and valid for the specific duration indicated (typically 24 hours). The Maison reserves the right to revoke access at any time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-white tracking-wide border-b border-[#222] pb-2">
              3. Bespoke Commissions & Authenticity
            </h2>
            <p>
              Each handcrafted piece is created using artisan metalwork, fine alloys, and ethically sourced stones. Minor variations in setting nuance reflect handcrafted authenticity. Each piece is issued with an individual serial-stamped Certificate of Authenticity.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-white tracking-wide border-b border-[#222] pb-2">
              4. Orders, Payment & Fulfillment
            </h2>
            <p>
              All prices are quoted in Indian Rupees (INR) unless otherwise specified. For high-value pieces and custom commissions, full clearance of funds or verified concierge advance deposit is required prior to artisan dispatch. Deliveries are executed via secure transit with adult verification.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-white tracking-wide border-b border-[#222] pb-2">
              5. Intellectual Property
            </h2>
            <p>
              All imagery, jewellery silhouettes, trademark signatures, packaging aesthetics, and text on this site are the exclusive intellectual property of Petals by Smira. Any reproduction or unauthorized commercial exploitation is strictly prohibited.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
