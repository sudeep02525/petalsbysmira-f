import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4 font-sans selection:bg-[var(--color-gold)] selection:text-black">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em] mb-4">
          404 — Not Found
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-offwhite)] mb-6">
          The Piece is Elsewhere
        </h1>
        <p className="text-[#a69b82] text-sm leading-relaxed mb-8 font-light">
          The page or edition you are searching for does not exist, or has been moved to our private archives.
        </p>
        <Link
          href="/editions"
          className="border border-[var(--color-gold)] bg-[var(--color-gold)] text-black px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-medium hover:bg-transparent hover:text-[var(--color-gold)] transition-colors"
        >
          Explore The Editions
        </Link>
      </div>
    </div>
  );
}

