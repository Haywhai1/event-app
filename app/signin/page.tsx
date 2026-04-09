"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin() {
    setLoading(true);
    setMessage("");

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false, // 🔥 IMPORTANT
    });

    if (res?.error) {
      setMessage("Invalid email or password");
      setLoading(false);
      return;
    }

    setMessage("Login successful 🎉");
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111]">
      <div className="w-full max-w-md rounded-2xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        <h1 className="text-2xl font-semibold text-white mb-6">
          Welcome Back
        </h1>

        <div className="space-y-4">
          <Input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>

        {/* ✅ MESSAGE */}
        {message && (
          <p className={`mt-4 text-sm ${message.includes("successful") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full h-12 rounded-xl bg-white text-black font-medium flex items-center justify-center"
        >
          {loading ? <Loader /> : "Sign In"}
        </button>

        {/* 🔗 LINK */}
        <p className="mt-6 text-sm text-gray-400 text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-white hover:underline">
            Register
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