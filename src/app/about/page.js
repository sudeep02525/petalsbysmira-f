export const metadata = {
  title: "About Us | Petals by Smira",
  description: "Learn about Petals by Smira, a luxury gifting brand curated with love and made to impress.",
};

export default function AboutPage() {
  return (
    <div className="font-sans pb-20">
      {/* Hero Banner */}
      <div className="bg-[var(--color-primary-dark)] text-center py-20 border-b-4 border-[var(--color-gold)] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/floral-motif.png')]"></div>
        <div className="relative z-10">
          <p className="text-[var(--color-gold)] text-sm tracking-[0.3em] uppercase mb-4 font-semibold">
            Our Story
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-offwhite)]">
            About Petals by Smira
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl text-[var(--color-primary-dark)] mb-6">Curated with love. Made to impress.</h2>
          <div className="w-16 h-1 bg-[var(--color-gold)] mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Welcome to Petals by Smira, where gifting becomes an art form. We believe that every milestone, every celebration, and every quiet moment of appreciation deserves to be commemorated with something truly extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="aspect-[4/5] bg-gray-100 rounded-t-full overflow-hidden border-4 border-[var(--color-cream)] shadow-xl relative">
            <img 
              src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800&auto=format&fit=crop" 
              alt="Luxury Gifting" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-[var(--color-primary-dark)] font-semibold">The Brand Philosophy</h3>
            <p className="text-gray-600 leading-relaxed">
              Founded on the belief that a gift is a physical manifestation of love and respect, Petals by Smira goes beyond mere commerce. We curate experiences. Our collections of luxury jewellery, bespoke accessories, and handcrafted hampers are meticulously selected to ensure they meet our exacting standards of beauty, quality, and uniqueness.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We understand that the presentation is just as important as the gift itself. That's why our signature packaging—featuring deep emerald hues and champagne gold accents—is designed to elicit a gasp of delight before the box is even opened.
            </p>
          </div>
        </div>

        <div className="bg-[var(--color-offwhite)] p-10 rounded-2xl border border-[var(--color-cream)] text-center">
          <h3 className="font-serif text-2xl text-[var(--color-primary-dark)] font-semibold mb-6">Our Commitment to Excellence</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 rounded-full bg-[var(--color-gold)] text-[var(--color-primary-dark)] flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h4 className="font-semibold text-gray-900 mb-2">Uncompromising Quality</h4>
              <p className="text-sm text-gray-600">Every item in our collection is rigorously inspected to ensure it meets our luxury standards.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-[var(--color-gold)] text-[var(--color-primary-dark)] flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h4 className="font-semibold text-gray-900 mb-2">Personalized Service</h4>
              <p className="text-sm text-gray-600">We offer bespoke recommendations and dedicated support to help you find the perfect gift.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-[var(--color-gold)] text-[var(--color-primary-dark)] flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure & Swift Delivery</h4>
              <p className="text-sm text-gray-600">Your precious gifts are packaged securely and delivered reliably across India.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
