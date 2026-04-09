"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error?.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Auto sign in after registration
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      setLoading(false);

      if (signInRes?.error) {
        setError("Account created but sign in failed. Please login manually.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-[100px] pb-20" style={{ background: "var(--t-bg)" }}>
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="text-[28px] font-black tracking-[6px] uppercase no-underline" style={{ color: "var(--t-text)" }}>
            <span style={{ color: "var(--t-accent)" }}>B</span>DENIM
          </Link>
          <p className="text-sm mt-2" style={{ color: "var(--t-text-muted)" }}>Create your account</p>
        </div>

        {/* Form Card */}
        <div className="glass-card rounded-xl p-8">
          <h1 className="text-xl font-bold mb-6" style={{ color: "var(--t-text)" }}>Sign Up</h1>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm bg-red-500/10 border border-red-500/20 text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium tracking-wider uppercase mb-1.5 block" style={{ color: "var(--t-text-muted)" }}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                style={{ background: "var(--t-input-bg)", border: "1px solid var(--t-input-border)", color: "var(--t-text)" }}
              />
            </div>

            <div>
              <label className="text-xs font-medium tracking-wider uppercase mb-1.5 block" style={{ color: "var(--t-text-muted)" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                style={{ background: "var(--t-input-bg)", border: "1px solid var(--t-input-border)", color: "var(--t-text)" }}
              />
            </div>

            <div>
              <label className="text-xs font-medium tracking-wider uppercase mb-1.5 block" style={{ color: "var(--t-text-muted)" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                style={{ background: "var(--t-input-bg)", border: "1px solid var(--t-input-border)", color: "var(--t-text)" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px]" style={{ background: "var(--t-border)" }} />
            <span className="text-xs" style={{ color: "var(--t-text-dim)" }}>or</span>
            <div className="flex-1 h-[1px]" style={{ background: "var(--t-border)" }} />
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all hover:opacity-80"
            style={{ background: "var(--t-input-bg)", border: "1px solid var(--t-input-border)", color: "var(--t-text)" }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm mt-6" style={{ color: "var(--t-text-muted)" }}>
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium no-underline" style={{ color: "var(--t-accent)" }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
