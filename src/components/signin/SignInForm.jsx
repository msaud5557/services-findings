"use client";
import { useState } from "react";
import SocialSignInButtons from "./SocialSignInButtons";

export default function SignInForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // TODO: Call your sign-in API here
    setTimeout(() => {
      setLoading(false);
      if (form.email === "" || form.password === "") {
        setError("Email and password are required.");
      } else {
        alert("Signed in! (Demo)");
      }
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="you@email.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="Your password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-colors text-lg disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <div className="my-4 flex items-center gap-2">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-400 text-xs">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <SocialSignInButtons />
    </form>
  );
} 