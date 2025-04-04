"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must log in to access the dashboard.");
          router.replace("/auth/login");
          return;
        }

        const decodedToken: DecodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          toast.error("Session expired. Please log in again.");
          router.replace("/auth/login");
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        toast.error("Invalid token. Please log in again.");
        router.replace("/auth/login");
      }
    };

    checkAuth();
  }, []); // Runs only once on mount

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return <div className="min-h-screen bg-gray-50">{isAuthenticated && children}</div>;
}
