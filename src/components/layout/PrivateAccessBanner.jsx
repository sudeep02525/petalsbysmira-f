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

    const handleExpired = () => setHasAccess(false);

    window.addEventListener("private-access-updated", checkAccess);
    window.addEventListener("private-access-expired", handleExpired);

    const interval = setInterval(checkAccess, 60000);
    return () => {
      window.removeEventListener("private-access-updated", checkAccess);
      window.removeEventListener("private-access-expired", handleExpired);
      clearInterval(interval);
    };
  }, []);

  if (!mounted || !hasAccess || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] max-w-[92vw] bg-[#0d0d0d]/95 backdrop-blur border border-[var(--color-gold)]/50 rounded-full px-4 py-2 text-[10px] sm:text-xs tracking-[0.18em] uppercase font-sans flex items-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.6)] text-[var(--color-gold)]">
      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
      <span>
        Private Access Active
        {remainingText && (
          <span className="opacity-75 font-mono ml-2 lowercase">({remainingText})</span>
        )}
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="ml-2 p-1 text-white/50 hover:text-white transition-colors"
        title="Dismiss"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

