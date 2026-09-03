

export const metadata = {
  title: "Experience | Petals by Smira",
  description: "Luxury, curated differently. Discover the Petals by Smira private access experience.",
};

const ExperienceStep = ({ number, title, description, isLast }) => (
  <div className="flex flex-col md:flex-row gap-6 md:gap-12 py-12 md:py-20 border-b border-[#222]">
    <div className="md:w-1/4">
      <span className={`text-4xl md:text-6xl text-[var(--color-gold)] opacity-40 font-serif`}>
        {number}
      </span>
    </div>
    <div className="md:w-3/4 flex flex-col justify-center">
      <h3 className={`text-2xl md:text-4xl text-[var(--color-offwhite)] mb-4 font-serif`}>
        {title}
      </h3>
      <p className="text-[#ccc] text-sm md:text-base leading-relaxed font-light max-w-2xl">
        {description}
      </p>
    </div>
  </div>
);

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-[var(--color-gold)] selection:text-black">

      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-6 lg:px-12">
          
          <div className="text-center mb-24">
            <h1 className={`text-4xl md:text-6xl text-[var(--color-gold)] mb-6 font-serif tracking-wide`}>
              The Petals Experience
            </h1>
            <p className="text-[#A69B82] uppercase tracking-[0.3em] text-xs md:text-sm">
              Luxury, curated differently.
            </p>
          </div>

          <div className="flex flex-col border-t border-[#222]">
            <ExperienceStep 
              number="01"
              title="Discover"
              description="Explore carefully curated collections ranging from exceptional jewellery pieces to limited edition luxury watches and bags."
            />
            <ExperienceStep 
              number="02"
              title="Explore"
              description="Discover the details and craftsmanship behind every piece. We provide extensive editorial details to help you appreciate the true value of our collection."
            />
            <ExperienceStep 
              number="03"
              title="Private Access"
              description="Request access to selected editions. Rather than a standard cart experience, we prioritize personal connection for every acquisition."
            />
            <ExperienceStep 
              number="04"
              title="Personal Assistance"
              description="Connect directly with the Petals by Smira team. Once your request is received, our concierges will reach out to finalize the details securely and privately."
            />
            <ExperienceStep 
              number="05"
              title="Limited Collections"
              description="Discover pieces created for a select audience. Many of our editions are highly limited, ensuring your piece remains as exclusive as the day it was acquired."
            />
          </div>

          <div className="text-center mt-24">
            <a 
              href="/request-access"
              className="inline-block border border-[var(--color-gold)] text-black bg-[var(--color-gold)] px-10 py-5 text-xs tracking-[0.25em] uppercase hover:bg-transparent hover:text-[var(--color-gold)] transition-all"
            >
              Request Private Access
            </a>
          </div>

        </div>
      </main>


    </div>
  );
}
