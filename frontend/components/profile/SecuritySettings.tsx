"use client";

import { FormEvent, ChangeEvent } from "react";
import { Save, Loader2, Shield } from "lucide-react";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface SecuritySettingsProps {
  passwordForm: PasswordForm;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordSubmit: (e: FormEvent) => void;
  loading: boolean;
  error: string;
  success: string;
}

export default function SecuritySettings({
  passwordForm,
  onPasswordChange,
  onPasswordSubmit,
  loading,
  error,
  success,
}: SecuritySettingsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-background-card border border-border rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8 border-b border-border bg-background-muted/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Shield size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">
                Security Settings
              </h2>
              <p className="text-text-secondary mt-1">
                Update your password and keep your account secure.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-error">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 bg-success/10 border border-success/20 rounded-xl text-success">
              {success}
            </div>
          )}

          <form onSubmit={onPasswordSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={onPasswordChange}
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background-muted text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={onPasswordChange}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background-muted text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={onPasswordChange}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background-muted text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
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
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Save Password
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
