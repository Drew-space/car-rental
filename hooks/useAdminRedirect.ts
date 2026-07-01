"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export function useAdminRedirect() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const role = (user?.publicMetadata as { role?: string } | undefined)?.role;

  useEffect(() => {
    if (!isLoaded) return; // still loading
    if (!user || role !== "admin") {
      router.replace("/");
    }
  }, [isLoaded, user, role, router]);

  return { user, isLoaded, isAdmin: role === "admin" };
}
