"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";
import axiosInstance from "../../../services/axiosInstance";

export default function PrivateAccessPage() {
  const { token } = useParams();
  const router = useRouter();
  const [status, setStatus] = useState("validating"); // validating, error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    const validateToken = async () => {
      try {
        const res = await axiosInstance.get(`/requests/private-access/validate/${token}`, {
          withCredentials: true,
        });

        if (res.data?.privateAccessToken) {
          localStorage.setItem("privateAccessToken", res.data.privateAccessToken);
          if (res.data?.expiresAt) {
            localStorage.setItem("privateAccessExpiresAt", res.data.expiresAt);
          }
          window.dispatchEvent(new Event("private-access-updated"));
        }

        const destination = res.data?.productSlug ? `/editions/${res.data.productSlug}` : "/editions";
        router.replace(destination);
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          error.response?.data?.message ||
            "Unable to validate your Private Access link. Please check your connection or request fresh access."
        );
      }
    };

    validateToken();
  }, [token, router]);

  const getErrorDetails = (msg) => {
    const lower = (msg || "").toLowerCase();
    if (lower.includes("revoked")) {
      return {
        title: "ACCESS REVOKED",
        description: "Your private access invitation has been revoked by the concierge. Please connect with our team if you need assistance.",
      };
    }
    if (lower.includes("invalid") || lower.includes("not found")) {
      return {
        title: "OUTDATED OR INVALID LINK",
        description: "This link is no longer valid. If a newer email or message was sent to you, please open the latest link provided, or request a fresh invitation below.",
      };
    }
    if (lower.includes("expired")) {
      return {
        title: "PRIVATE ACCESS EXPIRED",
        description: "Your 24-hour private access window has concluded. You may request fresh private access below.",
      };
    }
    return {
      title: "UNABLE TO VERIFY ACCESS",
      description: msg || "We encountered an issue validating your link. Please try again or contact our concierge.",
    };
  };

  if (status === "error") {
    const { title, description } = getErrorDetails(errorMessage);

    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[65vh] text-center px-5 py-16">
        <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center mb-6">
          <ShieldAlert className="w-6 h-6 text-red-400" />
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl text-red-400 mb-4 font-serif tracking-wide uppercase">
          {title}
        </h1>
        <p className="text-[#bbb] max-w-lg mx-auto leading-relaxed text-sm tracking-wide font-light mb-8">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/request-access"
            prefetch={false}
            className="w-full sm:w-auto px-8 py-3.5 bg-[var(--color-gold)] text-black text-xs font-semibold tracking-[0.2em] uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            Request Private Access <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            prefetch={false}
            className="w-full sm:w-auto px-8 py-3.5 border border-white/20 text-[var(--color-offwhite)] text-xs font-light tracking-[0.2em] uppercase hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all"
          >
            Concierge Support
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-3xl md:text-5xl text-[var(--color-gold)] mb-6 font-serif animate-pulse">
        VALIDATING ACCESS...
      </h1>
      <p className="text-[var(--color-offwhite)] max-w-md mx-auto leading-relaxed text-sm tracking-wide font-light">
        Please wait while we securely authenticate your link.
      </p>
    </div>
  );
}
