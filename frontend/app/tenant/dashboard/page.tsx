"use client";

import ProtectedRoute from "@/components/home/ProtectedRoute";
import { useState, useEffect } from "react";
import { Home, CreditCard, AlertCircle, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { getProfile } from "@/services/user.services";
import { RoomInfo, Tenant } from "@/types/user";

interface QuickActionCardProps {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
  color: string;
  description: string;
}

function QuickActionCard({
  title,
  icon: Icon,
  onClick,
  color,
  description,
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 bg-background-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all group w-full text-center"
    >
      <div
        className={`p-4 rounded-full ${color}/10 mb-4 group-hover:scale-110 transition-transform`}
      >
        <Icon size={32} className={color} />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {title}
      </h3>
      <p className="text-sm text-text-secondary">{description}</p>
    </button>
  );
}

export default function TenantDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<Tenant | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch {
        const userData = localStorage.getItem("user");
        if (userData) setUser(JSON.parse(userData));
      }
    };

    fetchProfile();
  }, []);

  const room =
    user?.roomId && typeof user.roomId === "object"
      ? (user.roomId as RoomInfo)
      : null;

  const formatRent = (rent?: number) =>
    typeof rent === "number" ? `₹${rent.toLocaleString("en-IN")}` : "N/A";

  const formatFloor = (floor?: number) => {
    if (typeof floor !== "number") return "N/A";

    const suffix =
      floor === 1 ? "st" : floor === 2 ? "nd" : floor === 3 ? "rd" : "th";

    return `${floor}${suffix} Floor`;
  };

  const formatRoomType = (capacity?: number) => {
    if (typeof capacity !== "number") return "N/A";
    return capacity === 1
      ? "Private (Single Sharing)"
      : `Shared (${capacity} Sharing)`;
  };

  return (
    <ProtectedRoute allowedRoles={["tenant"]}>
      <div className="min-h-screen bg-background">
        <Navbar role="tenant" />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary">
              Hello, {user?.username || "Tenant"}!
            </h1>
            <p className="text-text-secondary mt-1">
              Welcome to your dashboard. Here&apos;s an overview of your stay.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-background-card rounded-2xl p-6 border border-border">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                    <Home className="text-primary" /> My Room
                  </h2>
                  <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                    {room ? "Active" : "Unassigned"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Info label="Room Number" value={room?.roomNumber || "Not assigned"} />
                  <Info label="Monthly Rent" value={formatRent(room?.rentAmount)} />
                  <Info label="Floor" value={formatFloor(room?.floor)} />
                  <Info label="Room Type" value={formatRoomType(room?.capacity)} />
                </div>
              </div>

              <div className="bg-warning/10 border border-warning/30 rounded-2xl p-6 flex gap-4">
                <AlertCircle className="text-warning mt-1" size={24} />
                <div>
                  <h3 className="text-lg font-bold text-warning">
                    Rent Due Soon
                  </h3>
                  <p className="text-warning/80 mt-1">
                    Please review your monthly payment details and pay on time.
                  </p>
                  <button
                    onClick={() => router.push("/tenant/payments")}
                    className="mt-4 px-4 py-2 bg-warning text-black rounded-lg text-sm font-semibold hover:opacity-90 transition"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-text-primary">
                Quick Actions
              </h2>
              <div className="grid gap-4">
                <QuickActionCard
                  title="Raise Complaint"
                  description="Facing an issue? Let us know."
                  icon={AlertCircle}
                  color="text-error"
                  onClick={() => router.push("/tenant/complaints")}
                />
                <QuickActionCard
                  title="Payment History"
                  description="View your past transactions."
                  icon={CreditCard}
                  color="text-primary"
                  onClick={() => router.push("/tenant/payments")}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="text-lg font-semibold text-text-primary">{value}</p>
    </div>
  );
}
