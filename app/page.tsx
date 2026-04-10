"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const USERS = [
  { email: "arifkoyani@gmail.com", password: "allah5121214" },
  { email: "ehsan@uconnect.pk", password: "uconect121214" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));

    const match = USERS.find(
      (u) => u.email === email.trim() && u.password === password
    );

    if (match) {
      login();
    } else {
      setError("Invalid email or password.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#0b141d" }}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="https://uconnect.pk/wp-content/uploads/2021/10/uConnect-logo.png"
            alt="uConnect Logo"
            width={180}
            height={48}
            style={{ objectFit: "contain" }}
            unoptimized
          />
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#ffffff" }}>Welcome back</h1>
          <p className="mt-2 text-sm" style={{ color: "#94a3b8" }}>
            Sign in to your account to continue.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleLogin}
          className="rounded-2xl p-6 space-y-5"
          style={{ backgroundColor: "#111827", border: "1px solid #1e293b" }}
        >
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
              style={{ backgroundColor: "#0f172a", border: "1.5px solid #1e293b", color: "#ffffff" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl px-4 py-3 pr-11 text-sm outline-none transition-all duration-200"
                style={{ backgroundColor: "#0f172a", border: "1.5px solid #1e293b", color: "#ffffff" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors"
                style={{ color: "#94a3b8" }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm font-medium rounded-xl px-4 py-2.5" style={{ color: "#f87171", backgroundColor: "#ef444415", border: "1px solid #ef444430" }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-70"
            style={{ backgroundColor: "#3b82f6" }}
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <LogIn size={15} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
