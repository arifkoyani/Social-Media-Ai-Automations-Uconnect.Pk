"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const USERS = [
  { email: "arifkoyani@gmail.com", password: "allah5121214" },
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
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
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
          <h1 className="text-3xl font-bold text-black">Welcome back</h1>
          <p className="mt-2 text-sm" style={{ color: "#454545" }}>
            Sign in to your account to continue.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleLogin}
          className="rounded-2xl p-6 space-y-5"
          style={{ backgroundColor: "#f9f9f9", border: "1.5px solid #e5e5e5" }}
        >
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest" style={{ color: "#454545" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl px-4 py-3 text-sm text-black outline-none transition-all duration-200"
              style={{ backgroundColor: "#ffffff", border: "1.5px solid #e5e5e5" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#e97d26")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest" style={{ color: "#454545" }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl px-4 py-3 pr-11 text-sm text-black outline-none transition-all duration-200"
                style={{ backgroundColor: "#ffffff", border: "1.5px solid #e5e5e5" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#e97d26")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors"
                style={{ color: "#454545" }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm font-medium rounded-xl px-4 py-2.5" style={{ color: "#e97d26", backgroundColor: "#e97d2610", border: "1px solid #e97d2630" }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-70"
            style={{ backgroundColor: "#e97d26" }}
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
