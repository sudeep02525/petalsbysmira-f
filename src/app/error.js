"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4 font-sans selection:bg-[var(--color-gold)] selection:text-black">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em] mb-4">
          Unexpected Error
        </span>
        <h1 className="text-3xl md:text-4xl font-serif text-[var(--color-offwhite)] mb-6">
          A Brief Interruption
        </h1>
        <p className="text-[#a69b82] text-sm leading-relaxed mb-8 font-light">
          An unexpected issue occurred while curating this view. Please try reloading or return to our collections.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="border border-[var(--color-gold)] bg-[var(--color-gold)] text-black px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#b8952b] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border border-[#333] text-[var(--color-offwhite)] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

