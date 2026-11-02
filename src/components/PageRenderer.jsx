import Link from "next/link";
import { cdnImg } from "../utils/utils";

const Section = ({ s, index }) => {
  if (s.type === "imageText") {
    const isReverse = index % 2 === 1;
    return (
      <section className={`flex flex-col ${isReverse ? "md:flex-row-reverse" : "md:flex-row"} gap-10 md:gap-20 items-center`}>
        <div className="w-full md:w-1/2">
          {s.number && (
            <span className="text-[var(--color-gold)] uppercase tracking-[0.2em] text-xs mb-3 block font-medium">
              {s.number} {s.subheading ? `— ${s.subheading}` : ""}
            </span>
          )}
          {!s.number && s.subheading && (
            <span className="text-[var(--color-gold)] uppercase tracking-[0.2em] text-xs mb-3 block font-medium">
              {s.subheading}
            </span>
          )}
          {s.heading && (
            <h2 className="text-2xl md:text-4xl text-[var(--color-offwhite)] font-serif leading-tight mb-5">
              {s.heading}
            </h2>
          )}
          {s.body && (
            <p className="text-[#a69b82] text-sm md:text-base leading-relaxed font-light whitespace-pre-line">
              {s.body}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2 aspect-[4/5] bg-[#111] border border-[#222] relative overflow-hidden">
          {s.imageUrl ? (
            <img
              src={cdnImg(s.imageUrl, 900)}
              alt={s.heading || "Editorial"}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-85 transition-opacity hover:opacity-100"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#444] text-xs uppercase tracking-widest">
              Petals by Smira
            </div>
          )}
        </div>
      </section>
    );
  }

  if (s.type === "step") {
    return (
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 py-10 md:py-16 border-b border-[#222]">
        <div className="md:w-1/4">
          {s.number && (
            <span className="text-4xl md:text-6xl text-[var(--color-gold)] opacity-40 font-serif">
              {s.number}
            </span>
          )}
        </div>
        <div className="md:w-3/4 flex flex-col justify-center">
          {s.heading && (
            <h3 className="text-xl md:text-3xl text-[var(--color-offwhite)] mb-3 font-serif">
              {s.heading}
            </h3>
          )}
          {s.subheading && (
            <p className="text-[var(--color-gold)] text-xs uppercase tracking-[0.2em] mb-3">
              {s.subheading}
            </p>
          )}
          {s.body && (
            <p className="text-[#a69b82] text-sm md:text-base leading-relaxed font-light max-w-2xl whitespace-pre-line">
              {s.body}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (s.type === "card") {
    return (
      <div className="border border-[#222] bg-[#0d0d0d] p-6 md:p-8 rounded-sm hover:border-[var(--color-gold)]/30 transition-colors">
        {s.number && (
          <span className="text-[var(--color-gold)] font-serif text-2xl opacity-60 block mb-2">
            {s.number}
          </span>
        )}
        {s.heading && (
          <h3 className="text-white font-medium mb-2 text-base font-serif">
            {s.heading}
          </h3>
        )}
        {s.subheading && (
          <p className="text-[var(--color-gold)] text-xs uppercase tracking-[0.15em] mb-3">
            {s.subheading}
          </p>
        )}
        {s.body && (
          <p className="text-[#999] text-xs md:text-sm leading-relaxed font-light whitespace-pre-line">
            {s.body}
          </p>
        )}
      </div>
    );
  }

  if (s.type === "richText") {
    return (
      <section className="space-y-4">
        {s.heading && (
          <h2 className="text-xl font-serif text-white tracking-wide border-b border-[#222] pb-2">
            {s.heading}
          </h2>
        )}
        {s.subheading && (
          <p className="text-[var(--color-gold)] text-xs uppercase tracking-[0.2em]">
            {s.subheading}
          </p>
        )}
        {s.body && (
          <div className="text-[#ccc] text-sm md:text-base leading-relaxed whitespace-pre-line font-light">
            {s.body}
          </div>
        )}
      </section>
    );
  }

  // default: text
  return (
    <section className="text-center max-w-2xl mx-auto py-16 border-t border-b border-[#222]">
      {s.subheading && (
        <span className="text-[var(--color-gold)] uppercase tracking-[0.2em] text-xs mb-4 block">
          {s.subheading}
        </span>
      )}
      {s.heading && (
        <h2 className="text-2xl md:text-4xl text-[var(--color-offwhite)] mb-6 font-serif leading-tight">
          {s.heading}
        </h2>
      )}
      {s.body && (
        <p className="text-[#a69b82] text-sm md:text-base leading-relaxed whitespace-pre-line font-light">
          {s.body}
        </p>
      )}
    </section>
  );
};

export default function PageRenderer({ page, showAccessCta = true, customCta }) {
  const sections = [...(page?.sections || [])].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  const isRichPage = sections.some((s) => s.type === "richText");
  const isStepPage = sections.some((s) => s.type === "step");

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-[var(--color-gold)] selection:text-black">
      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <div className="relative w-full min-h-[45svh] flex flex-col items-center justify-center border-b border-[#222] overflow-hidden">
          {page?.heroImageUrl ? (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${page.heroImageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#080808] to-black" />
          )}

          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-16">
            <h1 className="text-4xl md:text-6xl text-[var(--color-gold)] mb-4 font-serif tracking-wide">
              {page?.title}
            </h1>
            {page?.subtitle && (
              <p className="text-[#a69b82] uppercase tracking-[0.3em] text-xs md:text-sm font-medium">
                {page.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Content Container */}
        <div
          className={`${
            isRichPage
              ? "max-w-[850px] space-y-12 mt-16"
              : isStepPage
              ? "max-w-[1000px] border-t border-[#222] mt-16"
              : "max-w-[1000px] space-y-24 mt-20"
          } mx-auto px-5 sm:px-6 lg:px-12`}
        >
          {sections.map((s, i) => (
            <Section key={s._id || i} s={s} index={i} />
          ))}

          {sections.length === 0 && (
            <div className="py-24 text-center text-[#666] text-sm">
              Content is currently being curated.
            </div>
          )}

          {/* Optional CTA */}
          {showAccessCta && (page?.slug === "our-story" || page?.slug === "experience") && (
            <div className="text-center pt-16">
              <Link
                href="/request-access"
                className="inline-block border border-[var(--color-gold)] text-black bg-[var(--color-gold)] px-10 py-5 text-xs tracking-[0.25em] uppercase hover:bg-transparent hover:text-[var(--color-gold)] transition-all font-semibold"
              >
                Request Private Access
              </Link>
            </div>
          )}

          {customCta && <div className="text-center pt-12">{customCta}</div>}
        </div>
      </main>
    </div>
  );
}
