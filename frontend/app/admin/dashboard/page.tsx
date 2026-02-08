"use client";

import Navbar from "@/components/layout/Navbar";
import { navLinks } from "@/components/data/navLinks";

const AdminDashboard = () => {
  return <Navbar navLinks={navLinks.admin} />
}

export default AdminDashboard
