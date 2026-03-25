"use client";
import Profile from "@/components/home/Profile";
import Navbar from "@/components/layout/Navbar";

export default function AdminProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Navbar at top */}
      <Navbar role="admin" />

      {/* Profile content */}
      <Profile role="admin" />
    </div>
  );
}