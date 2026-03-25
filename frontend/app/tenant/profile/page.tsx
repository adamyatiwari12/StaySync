"use client";
import Profile from "@/components/home/Profile";
import Navbar from "@/components/layout/Navbar";

export default function TenantProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Navbar at top */}
      <Navbar role="tenant" />

      {/* Profile content */}
      <Profile role="tenant" />
    </div>
  );
}