"use client";

import ProtectedRoute from "@/components/home/ProtectedRoute";
import DashboardCharts from "@/components/admin/DashboardCharts";
import { useEffect, useState } from "react";
import { getRooms } from "@/services/room.services";
import { getComplaints } from "@/services/complaint.services";
import { getPayments } from "@/services/payment.services";
import { getTenants } from "@/services/user.services";
import {
  Building,
  Users,
  AlertCircle,
  TrendingUp,
  Plus,
  UserPlus,
  DollarSign,
  Activity
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    totalCapacity: 0,
    occupiedCount: 0,
    occupancyRate: 0,
    pendingIssues: 0,
    totalTenants: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    paidPayments: 0,
  });

  const [chartData, setChartData] = useState({
    occupancyData: [] as { name: string; value: number; color: string }[],
    revenueData: [] as { month: string; revenue: number; payments: number }[],
    paymentStatusData: [] as { name: string; value: number; color: string }[],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all data in parallel
        const [roomsRes, complaintsRes, paymentsRes, tenantsRes] = await Promise.all([
          getRooms(),
          getComplaints(),
          getPayments(),
          getTenants()
        ]);

        const rooms = roomsRes.data;
        const complaints = complaintsRes.data;
        const payments = paymentsRes.data;
        const tenants = tenantsRes.data;

        // Basic room stats
        const totalRooms = rooms.length;
        const availableRooms = rooms.filter((r) => r.isAvailable).length;
        const totalCapacity = rooms.reduce((acc, r) => acc + r.capacity, 0);
        const occupiedCount = rooms.reduce((acc, r) => acc + r.occupiedCount, 0);
        const occupancyRate = totalCapacity > 0 ? Math.round((occupiedCount / totalCapacity) * 100) : 0;

        // Complaints stats
        const pendingIssues = complaints.filter(
          (c) => c.status === "open" || c.status === "in_progress"
        ).length;

        // Payment stats
        const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);
        const pendingPayments = payments.filter(p => p.status === "pending").length;
        const paidPayments = payments.filter(p => p.status === "paid").length;

        // Tenants stats
        const totalTenants = tenants.length;

        setStats({
          totalRooms,
          availableRooms,
          totalCapacity,
          occupiedCount,
          occupancyRate,
          pendingIssues,
          totalTenants,
          totalRevenue,
          pendingPayments,
          paidPayments,
        });

        // Prepare chart data
        const occupancyData = [
          { name: "Occupied", value: occupiedCount, color: "#3b82f6" },
          { name: "Available", value: totalCapacity - occupiedCount, color: "#e5e7eb" }
        ];

        const paymentStatusData = [
          { name: "Paid", value: paidPayments, color: "#10b981" },
          { name: "Pending", value: pendingPayments, color: "#f59e0b" }
        ];

        // Monthly revenue data (last 6 months)
        const monthlyRevenue: Record<string, { revenue: number; payments: number }> = {};
        payments.forEach(payment => {
          const monthKey = `${payment.year}-${String(payment.month).padStart(2, '0')}`;
          if (!monthlyRevenue[monthKey]) {
            monthlyRevenue[monthKey] = { revenue: 0, payments: 0 };
          }
          monthlyRevenue[monthKey].revenue += payment.amount;
          monthlyRevenue[monthKey].payments += 1;
        });

        const revenueData = Object.entries(monthlyRevenue)
          .sort(([a], [b]) => a.localeCompare(b))
          .slice(-6)
          .map(([month, data]: [string, { revenue: number; payments: number }]) => ({
            month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
            revenue: data.revenue,
            payments: data.payments
          }));

        setChartData({
          occupancyData,
          revenueData,
          paymentStatusData,
        });

      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, accent, subValue, trend }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    accent: string;
    subValue?: string;
    trend?: string;
  }) => (
    <div className="bg-background-card rounded-xl p-6 border border-border hover:border-primary/50 transition group">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-text-primary">{value}</h3>
          {subValue && (
            <p className="text-xs text-text-muted mt-1">{subValue}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp size={14} className="text-success mr-1" />
              <span className="text-xs text-success font-medium">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${accent}/10 group-hover:bg-${accent}/20 transition`}>
          <Icon size={24} className={`text-${accent}`} />
        </div>
      </div>
    </div>
  );

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Navbar role="admin" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-text-secondary mt-1">
              Welcome back, here’s what’s happening today.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-border border-t-primary" />
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Rooms"
                  value={stats.totalRooms}
                  subValue={`${stats.availableRooms} Available`}
                  icon={Building}
                  accent="primary"
                />
                <StatCard
                  title="Active Residents"
                  value={stats.occupiedCount}
                  subValue={`${stats.totalTenants} Total Registered`}
                  icon={Users}
                  accent="secondary"
                  trend="+12% this month"
                />
                <StatCard
                  title="Total Revenue"
                  value={`₹${stats.totalRevenue.toLocaleString()}`}
                  subValue="All time earnings"
                  icon={DollarSign}
                  accent="success"
                  trend="+8% vs last month"
                />
                <StatCard
                  title="Pending Issues"
                  value={stats.pendingIssues}
                  subValue="Needs attention"
                  icon={AlertCircle}
                  accent="error"
                />
              </div>

              {/* Charts */}
              <DashboardCharts chartData={chartData} />

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => router.push("/admin/rooms")}
                  className="flex items-center justify-center gap-3 p-6 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 rounded-xl transition group"
                >
                  <Plus size={24} className="text-primary" />
                  <div className="text-left">
                    <h3 className="font-semibold text-primary">Add New Room</h3>
                    <p className="text-sm text-primary/80">Expand your property</p>
                  </div>
                </button>

                <button
                  onClick={() => router.push("/admin/payments/create")}
                  className="flex items-center justify-center gap-3 p-6 bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 hover:border-secondary/40 rounded-xl transition group"
                >
                  <UserPlus size={24} className="text-secondary" />
                  <div className="text-left">
                    <h3 className="font-semibold text-secondary">Create Payment</h3>
                    <p className="text-sm text-secondary/80">Bill a resident</p>
                  </div>
                </button>

                
              </div>

            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
