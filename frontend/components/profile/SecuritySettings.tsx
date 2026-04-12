"use client";

import { FormEvent, ChangeEvent, useMemo } from "react";
import { Save, Loader2, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import { validatePasswordStrength, getPasswordStrength, getStrengthLabel } from "@/lib/passwordValidator";

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
  const passwordValidation = useMemo(() => {
    return validatePasswordStrength(passwordForm.newPassword);
  }, [passwordForm.newPassword]);

  const passwordStrength = useMemo(() => {
    return getPasswordStrength(passwordForm.newPassword);
  }, [passwordForm.newPassword]);

  const strengthLabel = getStrengthLabel(passwordStrength);

  const passwordsMatch = passwordForm.newPassword === passwordForm.confirmPassword && passwordForm.newPassword.length > 0;
  
  // Show validation errors immediately when user has typed something
  const showValidationErrors = passwordForm.newPassword.length > 0;

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
            <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-error flex gap-2">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {success && (
            <div className="p-4 bg-success/10 border border-success/20 rounded-xl text-success flex gap-2">
              <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
              <div>{success}</div>
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

              <div className="space-y-3">
                <label className="block text-sm font-medium text-text-primary">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={onPasswordChange}
                  placeholder="Enter new password"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    passwordForm.newPassword && !passwordValidation.isValid
                      ? "border-error focus:ring-error"
                      : "border-border focus:ring-primary"
                  } bg-background-muted text-text-primary focus:ring-2 focus:border-transparent outline-none transition-all`}
                />

                {passwordForm.newPassword && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">Password Strength:</span>
                      <span className={`text-xs font-semibold ${strengthLabel.color}`}>
                        {strengthLabel.label}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-background-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          passwordStrength === 1
                            ? "w-1/5 bg-error"
                            : passwordStrength === 2
                            ? "w-2/5 bg-orange-500"
                            : passwordStrength === 3
                            ? "w-3/5 bg-yellow-500"
                            : passwordStrength === 4
                            ? "w-4/5 bg-lime-500"
                            : "w-full bg-green-500"
                        }`}
                      />
                    </div>
                  </div>
                )}

                {passwordForm.newPassword && showValidationErrors && passwordValidation.errors.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {passwordValidation.errors.map((error, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-error">
                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    ))}
                  </div>
                )}

                {passwordForm.newPassword && passwordValidation.isValid && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 size={16} />
                    <span>Password meets all requirements</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-text-primary">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={onPasswordChange}
                  placeholder="Confirm new password"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    passwordForm.confirmPassword && !passwordsMatch
                      ? "border-error focus:ring-error"
                      : "border-border focus:ring-primary"
                  } bg-background-muted text-text-primary focus:ring-2 focus:border-transparent outline-none transition-all`}
                />
                {passwordForm.confirmPassword && passwordsMatch && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 size={16} />
                    <span>Passwords match</span>
                  </div>
                )}
                {passwordForm.confirmPassword && !passwordsMatch && (
                  <div className="flex items-center gap-2 text-sm text-error">
                    <AlertCircle size={16} />
                    <span>Passwords do not match</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading || !passwordValidation.isValid || !passwordsMatch || !passwordForm.currentPassword}
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
