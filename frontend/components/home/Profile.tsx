"use client";

import { useEffect, useState, FormEvent } from "react";
import ProtectedRoute from "@/components/home/ProtectedRoute";
import { getProfile, updateProfile } from "@/services/user.services";
import { UpdateProfileData } from "@/types/user";
import { AxiosError } from "axios";
import {
  User,
  Mail,
  Shield,
  Loader2,
  Save,
  LogOut,
  Smartphone,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  name?: string;
  phone?: string;
  role: string;
}

interface ProfileProps {
  role: "admin" | "tenant";
}

type TabType = "general" | "security";

export default function Profile({ role }: ProfileProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [user, setUser] = useState<UserProfile | null>(null);

  const [form, setForm] = useState<UpdateProfileData>({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
        setForm({
          name: res.data.name || "",
          email: res.data.email,
          phone: res.data.phone || "",
        });
      } catch {
        setError("Failed to load profile");
      }
    };
    fetchMe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await updateProfile(form);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              name: res.data.user.name,
              email: res.data.user.email,
              phone: res.data.user.phone,
            }
          : prev,
      );
      setSuccess("Profile updated successfully");
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Update failed");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/signin");
  };

  const getInitials = (name?: string) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "A";

  const TabButton = ({
    id,
    label,
    icon: Icon,
  }: {
    id: TabType;
    label: string;
    icon: any;
  }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
        activeTab === id
          ? "bg-primary text-white shadow-md shadow-primary/20"
          : "text-text-secondary hover:bg-background-muted"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        <span className="font-medium">{label}</span>
      </div>
      {activeTab === id && <ChevronRight size={16} />}
    </button>
  );

  return (
    <ProtectedRoute allowedRoles={[role]}>
      <div>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-10">
            <h1 className="text-3xl font-bold font-serif text-text-primary">
              Account Settings
            </h1>
            <p className="text-text-secondary mt-1">
              Manage your profile and security preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-background-card border border-border rounded-2xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {getInitials(user?.name)}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">
                    {user?.name || "User"}
                  </h3>
                  <p className="text-xs text-text-secondary capitalize">
                    {user?.role || role} Account
                  </p>
                </div>
              </div>

              <nav className="bg-background-card border border-border rounded-2xl p-2 shadow-sm space-y-1">
                <TabButton id="general" label="General" icon={User} />
                <TabButton id="security" label="Security" icon={Shield} />

                <div className="my-2 border-t border-border-muted mx-2"></div>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-error rounded-xl hover:bg-error/10"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {activeTab === "general" && (
                <div className="space-y-6">
                  <div className="bg-background-card border border-border rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-border bg-background-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                          <User size={32} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-text-primary">
                            Personal Information
                          </h2>
                          <p className="text-text-secondary mt-1">
                            Update your account details and contact information.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-8">
                      {error && (
                        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl flex items-center gap-3 text-error animate-in fade-in slide-in-from-top-2">
                          <Shield size={20} className="shrink-0" />
                          <p>{error}</p>
                        </div>
                      )}

                      {success && (
                        <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-xl flex items-center gap-3 text-success animate-in fade-in slide-in-from-top-2">
                          <Save size={20} className="shrink-0" />
                          <p>{success}</p>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-text-primary">
                              Username
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={user?.username || ""}
                                readOnly
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background-muted text-text-secondary cursor-not-allowed"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-muted">
                                <User size={16} />
                              </div>
                            </div>
                            <p className="text-xs text-text-secondary">
                              Username cannot be changed.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-text-primary">
                              Full Name
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background-muted text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-muted">
                                <User size={16} />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-text-primary">
                              Email Address
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background-muted text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-muted">
                                <Mail size={16} />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-text-primary">
                              Phone Number
                            </label>
                            <div className="relative">
                              <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background-muted text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-muted">
                                <Smartphone size={16} />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-text-primary rounded-xl font-bold transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading ? (
                              <>
                                <Loader2 size={20} className="animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save size={20} />
                                Save Changes
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="bg-background-card border border-border rounded-3xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold">Security Settings</h2>
                    <p className="text-sm text-text-secondary">
                      Manage password and security options.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
