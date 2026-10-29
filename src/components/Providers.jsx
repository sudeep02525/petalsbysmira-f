"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  useEffect(() => {
    const handleExpired = () => {
      toast.error("Your 24-hour private access has expired. Please request access again.", {
        duration: 5000,
        style: {
          background: "#111",
          color: "#fff",
          border: "1px solid #d4af37",
        },
      });
    };

    window.addEventListener("private-access-expired", handleExpired);
    return () => window.removeEventListener("private-access-expired", handleExpired);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
