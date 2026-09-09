"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
        // The backend validation endpoint will set the httpOnly cookie upon success
        await axiosInstance.get(`/requests/private-access/validate/${token}`, {
          withCredentials: true, // Need this if backend sets cookie on a different domain, though Next.js rewrites might handle it.
        });
        
        // Success: Redirect to home page
        router.push("/");
      } catch (error) {
        setStatus("error");
        setErrorMessage(error.response?.data?.message || "Your Private Access link has expired. Please request Private Access again.");
      }
    };

    validateToken();
  }, [token, router]);

  if (status === "error") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className={`text-3xl md:text-5xl text-red-500 mb-6 font-serif`}>PRIVATE ACCESS EXPIRED</h1>
        <p className="text-[var(--color-offwhite)] max-w-md mx-auto leading-relaxed text-sm tracking-wide">
          {errorMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className={`text-3xl md:text-5xl text-[var(--color-gold)] mb-6 font-serif animate-pulse`}>
        VALIDATING ACCESS...
      </h1>
      <p className="text-[var(--color-offwhite)] max-w-md mx-auto leading-relaxed text-sm tracking-wide">
        Please wait while we securely authenticate your link.
      </p>
    </div>
  );
}
