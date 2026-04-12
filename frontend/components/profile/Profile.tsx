"use client";

import { useEffect, useState, FormEvent } from "react";
import ProtectedRoute from "@/components/home/ProtectedRoute";
import GeneralSettings from "./GeneralSettings";
import SecuritySettings from "./SecuritySettings";
import { getProfile, updateProfile, changePassword } from "@/services/user.services";
import { Tenant, UpdateProfileData } from "@/types/user";
import { AxiosError } from "axios";
import { validatePasswordStrength } from "@/lib/passwordValidator";
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

interface ProfileProps {
  role: "admin" | "tenant";
}

type TabType = "general" | "security";

export default function Profile({ role }: ProfileProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [user, setUser] = useState<Tenant | null>(null);

  const [form, setForm] = useState<UpdateProfileData>({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError("All password fields are required.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords must match.");
      return;
    }

    // Validate password strength
    const validation = validatePasswordStrength(passwordForm.newPassword);
    if (!validation.isValid) {
      setPasswordError(validation.errors.join(". ") + ".");
      return;
    }

    if (passwordForm.newPassword === passwordForm.currentPassword) {
      setPasswordError("New password must be different from current password.");
      return;
    }

    setPasswordLoading(true);

    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordSuccess("Password updated successfully.");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
          setPasswordError(err.response.data.errors.join(". ") + ".");
        } else {
          setPasswordError(err.response?.data?.message || "Password update failed.");
        }
      } else {
        setPasswordError("Something went wrong.");
      }
    } finally {
      setPasswordLoading(false);
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
                <GeneralSettings
                  user={user}
                  form={form}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  loading={loading}
                  error={error}
                  success={success}
                />
              )}

              {activeTab === "security" && (
                <SecuritySettings
                  passwordForm={passwordForm}
                  onPasswordChange={handlePasswordChange}
                  onPasswordSubmit={handlePasswordSubmit}
                  loading={passwordLoading}
                  error={passwordError}
                  success={passwordSuccess}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
