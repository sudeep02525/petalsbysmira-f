

export const metadata = {
  title: "Our Story | Petals by Smira",
  description: "The heritage, craftsmanship, and philosophy behind Petals by Smira's exclusive luxury collections.",
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-[var(--color-gold)] selection:text-black">

      
      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] md:h-[80vh] flex flex-col items-center justify-center border-b border-[#222]">
          <div className="absolute inset-0 bg-[url('/image.jpg')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className={`text-4xl md:text-7xl text-[var(--color-gold)] mb-6 font-serif tracking-wide`}>
              The Story
            </h1>
            <p className="text-[#A69B82] uppercase tracking-[0.3em] text-xs md:text-sm">A Legacy of Exclusivity</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-[1000px] mx-auto px-5 sm:px-6 lg:px-12 mt-24 space-y-32">
          
          {/* Section 1 */}
          <section className="flex flex-col md:flex-row gap-12 md:gap-24 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-[var(--color-gold)] uppercase tracking-[0.2em] text-xs mb-4">01 — The Beginning</h2>
              <h3 className={`text-3xl md:text-4xl text-[var(--color-offwhite)] mb-6 font-serif leading-tight`}>
                Born from a desire for the extraordinary.
              </h3>
              <p className="text-[#ccc] text-sm md:text-base leading-relaxed font-light">
                Petals by Smira began with a simple philosophy: true luxury is quiet, exclusive, and timeless. In a world of mass production, we sought to curate pieces that speak to those who understand the value of rarity.
              </p>
            </div>
            <div className="w-full md:w-1/2 aspect-[4/5] bg-[#111] border border-[#222] relative">
               <img 
                 src="https://res.cloudinary.com/tbllydoh/image/upload/f_auto,q_auto,w_800/v1788430564/petalsbysmira/story/jnirts88cjirunfzqjxo.jpg" 
                 alt="Craftsmanship" 
                 loading="lazy"
                 className="w-full h-full object-cover opacity-80" 
               />
            </div>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col md:flex-row-reverse gap-12 md:gap-24 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-[var(--color-gold)] uppercase tracking-[0.2em] text-xs mb-4">02 — Our Philosophy</h2>
              <h3 className={`text-3xl md:text-4xl text-[var(--color-offwhite)] mb-6 font-serif leading-tight`}>
                Luxury is an experience, not just a transaction.
              </h3>
              <p className="text-[#ccc] text-sm md:text-base leading-relaxed font-light">
                We believe that acquiring a luxury piece should be as memorable as wearing it. This is why we operate on a private access model. Our collections are not merely sold; they are placed with individuals who appreciate their heritage.
              </p>
            </div>
            <div className="w-full md:w-1/2 aspect-[4/5] bg-[#111] border border-[#222] relative">
               <img 
                 src="https://res.cloudinary.com/tbllydoh/image/upload/f_auto,q_auto,w_800/v1788430565/petalsbysmira/story/wpuv1zkryubcbejipq9h.jpg" 
                 alt="Philosophy" 
                 loading="lazy"
                 className="w-full h-full object-cover opacity-80" 
               />
            </div>
          </section>

          {/* Section 3 */}
          <section className="flex flex-col md:flex-row gap-12 md:gap-24 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-[var(--color-gold)] uppercase tracking-[0.2em] text-xs mb-4">03 — Craftsmanship</h2>
              <h3 className={`text-3xl md:text-4xl text-[var(--color-offwhite)] mb-6 font-serif leading-tight`}>
                Attention to detail in every facet.
              </h3>
              <p className="text-[#ccc] text-sm md:text-base leading-relaxed font-light">
                Every piece in The Editions has been rigorously selected for its design, quality, and legacy. From the cut of the stones to the precision of the mechanics, we settle for nothing less than perfection.
              </p>
            </div>
            <div className="w-full md:w-1/2 aspect-[4/5] bg-[#111] border border-[#222] relative">
               <img 
                 src="https://res.cloudinary.com/tbllydoh/image/upload/f_auto,q_auto,w_800/v1788430567/petalsbysmira/story/dpeig8s0t7neyd6z9afp.jpg" 
                 alt="Details" 
                 loading="lazy"
                 className="w-full h-full object-cover opacity-80" 
               />
            </div>
          </section>

          {/* Our Promise */}
          <section className="text-center max-w-2xl mx-auto py-24 border-t border-b border-[#222]">
            <h2 className="text-[var(--color-gold)] uppercase tracking-[0.2em] text-xs mb-8">Our Promise</h2>
            <h3 className={`text-3xl md:text-5xl text-[var(--color-offwhite)] mb-8 font-serif leading-tight`}>
              A personal and private experience, exclusively for you.
            </h3>
            <a 
              href="/request-access"
              className="inline-block mt-8 border border-[var(--color-gold)] text-[var(--color-gold)] px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[var(--color-gold)] hover:text-black transition-all"
            >
              Request Access
            </a>
          </section>

        </div>
      </main>


    </div>
  );
}
