"use client";

import { FormEvent, ChangeEvent } from "react";
import { Tenant, UpdateProfileData } from "@/types/user";
import { User, Mail, Save, Loader2, Shield, Smartphone } from "lucide-react";

interface GeneralSettingsProps {
  user: Tenant | null;
  form: UpdateProfileData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  loading: boolean;
  error: string;
  success: string;
}

export default function GeneralSettings({
  user,
  form,
  onChange,
  onSubmit,
  loading,
  error,
  success,
}: GeneralSettingsProps) {
  return (
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

          <form onSubmit={onSubmit} className="space-y-6">
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
                    onChange={onChange}
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
                    onChange={onChange}
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
                    value={form.phone || ""}
                    onChange={onChange}
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
  );
}
