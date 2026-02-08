"use client";

import Navbar from "@/components/layout/Navbar";
import { navLinks } from "@/components/data/navLinks";

const TenantDashboard = () => {
  return <Navbar navLinks={navLinks.tenant} />
}

export default TenantDashboard 