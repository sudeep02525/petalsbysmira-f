export const metadata = {
  title: "Privacy Policy | Petals by Smira",
  description: "Learn how Petals by Smira protects your personal data and confidentiality.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-[var(--color-gold)] selection:text-black">
      <main className="flex-1 pb-24">
        {/* Header */}
        <div className="relative w-full h-[40vh] flex flex-col items-center justify-center border-b border-[#222]">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
          <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
            <span className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs font-medium mb-3 block">
              Discretion & Trust
            </span>
            <h1 className="text-3xl md:text-5xl text-[var(--color-offwhite)] mb-3 font-serif tracking-wide">
              Privacy Policy
            </h1>
            <p className="text-[#a69b82] text-xs uppercase tracking-widest">
              Last Updated: October 2026
            </p>
          </div>
        </div>

        <div className="max-w-[850px] mx-auto px-5 sm:px-6 lg:px-8 mt-16 space-y-12 text-[#ccc] font-light text-sm leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-serif text-white tracking-wide border-b border-[#222] pb-2">
              1. Our Commitment to Confidentiality
            </h2>
            <p>
              At Petals by Smira, discretion and protection of personal dignity are fundamental to the luxury experience. We uphold rigorous confidentiality protocols regarding your personal identity, consultation history, and acquisition details.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-white tracking-wide border-b border-[#222] pb-2">
              2. Information We Collect
            </h2>
            <p>
              When you submit an access request, book a consultation, or acquire a piece, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#aaa]">
              <li>Contact coordinates (full name, verified email, direct telephone number).</li>
              <li>Delivery and recipient instructions for confidential gifting.</li>
              <li>Bespoke design specifications, sizing parameters, and private consultation notes.</li>
              <li>Technical diagnostics (such as secure cookie tokens used for encrypted private access sessions).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-white tracking-wide border-b border-[#222] pb-2">
              3. Purpose of Data Processing
            </h2>
            <p>
              Your data is solely used to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#aaa]">
              <li>Authenticate eligibility and issue temporary encrypted private access links.</li>
              <li>Deliver concierge customer service and coordinate secure white-glove transport.</li>
              <li>Fulfill statutory tax compliance and warranty registration for fine jewellery creations.</li>
            </ul>
            <p className="text-white font-medium pt-2">
              We never sell, rent, or trade your personal information to third-party commercial marketing networks.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-white tracking-wide border-b border-[#222] pb-2">
              4. Security Measures
            </h2>
            <p>
              All sensitive communications, token credentials, and client archives are protected by industry-grade encryption (TLS 1.3, SHA-256 hashed private tokens, and restricted admin role authorizations).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-white tracking-wide border-b border-[#222] pb-2">
              5. Contacting the Data Protection Officer
            </h2>
            <p>
              If you wish to review, update, or request the deletion of your records, you may write directly to our private concierge at{" "}
              <a href="mailto:concierge@petalsbysmira.in" className="text-[var(--color-gold)] hover:underline">
                concierge@petalsbysmira.in
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
