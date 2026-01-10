import {
  TrendingUp,
  Shield,
  BarChart3,
  Users,
  Zap,
  ArrowRight,
  CheckCircle2,
  Globe,
  Lock,
  Sparkles,
  Activity,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg blur-md opacity-50" />
                <div className="relative bg-linear-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold text-zinc-100">
                Opinion
                <span className="text-transparent bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text">
                  X
                </span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#features"
                className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium"
              >
                How It Works
              </Link>
              <Link
                href="#markets"
                className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium"
              >
                Markets
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <button className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors">
                  Log In
                </button>
              </Link>
              <Link href="/register">
                <button className="px-5 py-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-purple-600/20">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-transparent to-pink-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-purple-300">
                Trade Opinions, Shape the Future
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-zinc-100">Predict the Future,</span>
              <br />
              <span className="text-transparent bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
                Profit from Insights
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 mb-10 leading-relaxed max-w-3xl mx-auto">
              Join the marketplace where knowledge becomes capital. Trade on
              real-world events, trends, and predictions with transparency and
              confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <button className="px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2">
                  Start Trading Free
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="#markets">
                <button className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
                  <Activity className="w-5 h-5" />
                  Explore Markets
                </button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Secure Trading</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Real-Time Markets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Low Fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                $2.5M+
              </div>
              <div className="text-zinc-400 text-sm">Trading Volume</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <div className="text-zinc-400 text-sm">Active Traders</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                1,000+
              </div>
              <div className="text-zinc-400 text-sm">Live Markets</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                99.9%
              </div>
              <div className="text-zinc-400 text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                Platform Features
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
              Why Trade With{" "}
              <span className="text-transparent bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text">
                OpinionX
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Professional tools and infrastructure for opinion trading
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10">
              <div className="w-12 h-12 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                Real-Time Trading
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Execute trades instantly with live market data and dynamic
                pricing algorithms
              </p>
            </div>

            <div className="group bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10">
              <div className="w-12 h-12 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                Bank-Level Security
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Encrypted transactions with multi-factor authentication and
                secure wallet infrastructure
              </p>
            </div>

            <div className="group bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10">
              <div className="w-12 h-12 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                Advanced Analytics
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Professional-grade charts and insights to make informed trading
                decisions
              </p>
            </div>

            <div className="group bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10">
              <div className="w-12 h-12 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                Community Driven
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Join thousands of traders sharing insights and strategies daily
              </p>
            </div>

            <div className="group bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10">
              <div className="w-12 h-12 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                Global Markets
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Trade on events worldwide with 24/7 access to diverse prediction
                markets
              </p>
            </div>

            <div className="group bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10">
              <div className="w-12 h-12 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                Transparent Fees
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Clear pricing structure with competitive fees and no hidden
                costs
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Start trading in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-600/30">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                  Create Account
                </h3>
                <p className="text-zinc-400">
                  Sign up in seconds and get access to all markets instantly
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-600/30">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                  Choose Markets
                </h3>
                <p className="text-zinc-400">
                  Browse diverse prediction markets and find topics you know
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-600/30">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                  Start Trading
                </h3>
                <p className="text-zinc-400">
                  Place trades and profit from your predictions and insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 via-pink-600/20 to-purple-600/20" />
        <div className="absolute inset-0 backdrop-blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-medium text-purple-200">
              Join 50,000+ Active Traders
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
            Join the future of prediction markets. Create your free account
            today and start trading in minutes.
          </p>

          <Link href="/register">
            <button className="px-8 py-4 bg-white hover:bg-zinc-100 text-zinc-900 font-bold rounded-lg transition-all shadow-xl shadow-white/20 hover:shadow-white/30 flex items-center justify-center gap-2 mx-auto">
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>

          <p className="mt-6 text-sm text-zinc-400">
            No credit card required • Start with $10,000 demo balance
          </p>
        </div>
      </section>
    </div>
  );
}
