"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { navLinks } from "@/components/data/navLinks";

const TenantDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      router.push("/signin");
      return;
    }

    const parsedUser = JSON.parse(user);
    if (parsedUser.role !== "tenant") {
      router.push("/signin");
      return;
    }
  }, [router]);

  return <Navbar navLinks={navLinks.tenant} />
}

export default TenantDashboard 