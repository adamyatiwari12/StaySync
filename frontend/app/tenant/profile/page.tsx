"use client";
import Profile from "@/components/home/Profile";
import Navbar from "@/components/layout/Navbar";
import { navLinks } from "@/components/data/navLinks";

export default function TenantProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Navbar at top */}
      <Navbar navLinks={navLinks.tenant} />

      {/* Profile content */}
      <Profile role="tenant" />
    </div>
  );
}