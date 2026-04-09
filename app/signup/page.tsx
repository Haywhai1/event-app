"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      // ✅ 1. CREATE ACCOUNT
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // ✅ 2. AUTO LOGIN
      const login = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (login?.error) {
        setMessage("Account created but login failed");
        setLoading(false);
        return;
      }

      // ✅ 3. REDIRECT TO HOME
      window.location.href = "/";
    } catch {
      setMessage("Network error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111]">
      <div className="w-full max-w-md rounded-2xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        <h1 className="text-2xl font-semibold text-white mb-6">
          Create Account
        </h1>

        <div className="space-y-4">
          <Input placeholder="Username" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>

        {/* MESSAGE */}
        {message && (
          <p className="mt-4 text-sm text-red-400">
            {message}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full h-12 rounded-xl bg-white text-black font-medium flex items-center justify-center"
        >
          {loading ? <Loader /> : "Sign Up"}
        </button>

        {/* LINK */}
        <p className="mt-6 text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <Link href="/signin" className="text-white hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

/* Loader */
function Loader() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-black rounded-full"
          animate={{ y: ["0%", "-80%", "0%"] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-white/20 transition"
    />
  );
}