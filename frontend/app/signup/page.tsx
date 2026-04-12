"use client";

import { useState, FC, FormEvent, ChangeEvent } from "react";
import { signup } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SignupData } from "@/types/auth";
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { validatePasswordStrength, getPasswordStrength, getStrengthLabel } from "@/lib/passwordValidator";

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  code?: string;
}

const SignupPage: FC = () => {
  const router = useRouter();
  const [form, setForm] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
    code: "DEL01",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.code.trim()) newErrors.code = "Stay ID is required";

    if (!form.username.trim()) newErrors.username = "Username is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else {
      const validation = validatePasswordStrength(form.password);
      if (!validation.isValid) {
        newErrors.password = validation.errors.join(". ") + ".";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await signup(form);
      localStorage.setItem("token", res.data.token);
      router.push("/tenant/dashboard");
    } catch (error: unknown) {
      setApiError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-background-card rounded-2xl border border-border p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-text-secondary">Join StaySync</p>
          </div>

          {apiError && (
            <div className="mb-6 p-3 rounded-lg bg-error/10 border border-error/30 text-error text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-2">
                PG Code
              </label>
              <input
                type="text"
                name="code"
                value={form.code}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.code ? "border-error" : "border-border"
                } bg-background-muted`}
              />
              {errors.code && (
                <p className="mt-1 text-sm text-error">
                  {errors.code}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-text-muted" size={20} />
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    errors.username ? "border-error" : "border-border"
                  } bg-background-muted`}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-error">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-text-muted" size={20} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    errors.email ? "border-error" : "border-border"
                  } bg-background-muted`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-text-muted" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2 rounded-lg border ${
                    form.password && !validatePasswordStrength(form.password).isValid
                      ? "border-error focus:ring-error"
                      : "border-border focus:ring-primary"
                  } bg-background-muted focus:ring-2 focus:border-transparent outline-none transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {form.password && (
                <div className="space-y-3 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">Password Strength:</span>
                    <span className={`text-xs font-semibold ${getStrengthLabel(getPasswordStrength(form.password)).color}`}>
                      {getStrengthLabel(getPasswordStrength(form.password)).label}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-background-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        getPasswordStrength(form.password) === 1
                          ? "w-1/5 bg-error"
                          : getPasswordStrength(form.password) === 2
                          ? "w-2/5 bg-orange-500"
                          : getPasswordStrength(form.password) === 3
                          ? "w-3/5 bg-yellow-500"
                          : getPasswordStrength(form.password) === 4
                          ? "w-4/5 bg-lime-500"
                          : "w-full bg-green-500"
                      }`}
                    />
                  </div>

                  {validatePasswordStrength(form.password).errors.length > 0 && (
                    <div className="space-y-2 mt-3">
                      {validatePasswordStrength(form.password).errors.map((error, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-error">
                          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                          <span>{error}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Valid Password Indicator */}
                  {validatePasswordStrength(form.password).isValid && (
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <CheckCircle2 size={14} />
                      <span>Password meets all requirements</span>
                    </div>
                  )}
                </div>
              )}

              {errors.password && (
                <p className="mt-2 text-sm text-error">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary disabled:opacity-50 font-semibold py-2 rounded-lg"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-secondary text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-primary hover:underline font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-medium border border-primary/10">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Backend: Render Free Tier (may take a few seconds to wake up)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
