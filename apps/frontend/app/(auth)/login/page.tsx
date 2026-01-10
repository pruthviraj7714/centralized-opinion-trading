"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, User, Lock, Loader2, EyeOff, Eye } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { password, username } = formData;
      const res = await signIn("credentials", {
        username,
        password,
        callbackUrl: "/dashboard",
      });

      if (res?.ok) {
        toast.success("Successfully Logged In!", { position: "top-center" });
      }

      if (res?.error) {
        toast.error(res.error || "Error while logging In");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
    <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg blur-md opacity-50" />
              <div className="relative bg-linear-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-zinc-100">
              Opinion<span className="text-transparent bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text">X</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-400 hidden sm:inline">
              Don't have an account?
            </span>
            <Link href="/register">
              <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 font-medium rounded-lg transition-all">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>

    <main className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-transparent to-pink-500/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl shadow-zinc-950/50 overflow-hidden">
          <div className="p-8 pb-6 text-center">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <div className="h-12 w-12 rounded-full bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
                <Lock className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-zinc-100 mb-2">Welcome Back</h1>
            <p className="text-zinc-400">Log in to access your trading dashboard</p>
          </div>

          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-100">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="trader123"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-zinc-100">Password</label>
                  <Link href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-purple-600 focus:ring-2 focus:ring-purple-500/20"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-zinc-400 cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-zinc-700 disabled:to-zinc-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30 disabled:shadow-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Logging In...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    <span>Log In</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="h-1 bg-linear-to-r from-purple-600 via-pink-600 to-purple-600" />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </main>
  </div>
  );
}
