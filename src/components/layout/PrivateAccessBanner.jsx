"use client";

import { useEffect, useState } from "react";
import { Sparkles, X, KeyRound } from "lucide-react";

export default function PrivateAccessBanner() {
  const [mounted, setMounted] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [remainingText, setRemainingText] = useState("");

  const checkAccess = () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("privateAccessToken");
    if (!token) {
      setHasAccess(false);
      return;
    }

    setHasAccess(true);
    const expiresAtStr = localStorage.getItem("privateAccessExpiresAt");
    if (expiresAtStr) {
      const diffMs = new Date(expiresAtStr).getTime() - Date.now();
      if (diffMs > 0) {
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        if (hours > 0) {
          setRemainingText(`${hours}h remaining`);
        } else {
          setRemainingText(`${mins}m remaining`);
        }
      } else {
        setRemainingText("expiring soon");
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    checkAccess();
    window.addEventListener("private-access-updated", checkAccess);
    window.addEventListener("private-access-expired", () => {
      setHasAccess(false);
    });

    const interval = setInterval(checkAccess, 60000);
    return () => {
      window.removeEventListener("private-access-updated", checkAccess);
      clearInterval(interval);
    };
  }, []);

  if (!mounted || !hasAccess || dismissed) return null;

  return (
    <div className="relative z-50 bg-[#0d0d0d] border-b border-[var(--color-gold)]/40 text-[var(--color-gold)] py-1.5 px-4 text-center text-[10px] sm:text-xs tracking-[0.2em] uppercase font-sans flex items-center justify-center gap-2">
      <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold)] animate-pulse" />
      <span>
        Private Access Active &bull; Exclusive Pricing Unlocked
        {remainingText && <span className="opacity-75 font-mono ml-2 lowercase">({remainingText})</span>}
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 p-1 text-white/50 hover:text-white transition-colors"
        title="Dismiss banner"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

