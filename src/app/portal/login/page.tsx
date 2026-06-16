import Link from "next/link";
import { ArrowRight, Scissors } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      {/* Background Effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
        <div className="h-[40rem] w-[40rem] rounded-full bg-accent blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/5 bg-black/50 p-10 shadow-2xl backdrop-blur-xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
            <Scissors className="h-8 w-8 text-accent" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold uppercase tracking-tight text-white">
            Clipper Portal
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Sign in to claim videos and track payouts.
          </p>
        </div>

        <form className="flex flex-col gap-5">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-neutral-500">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-6 text-white placeholder-neutral-600 outline-none transition-colors focus:border-accent focus:bg-white/10"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-neutral-500">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-6 text-white placeholder-neutral-600 outline-none transition-colors focus:border-accent focus:bg-white/10"
              required
            />
          </div>

          <Link 
            href="/portal/dashboard"
            className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent px-8 font-bold uppercase tracking-wide text-black transition-colors hover:bg-accent/90"
          >
            Sign In <ArrowRight className="h-5 w-5" />
          </Link>
        </form>

        <p className="mt-8 text-center text-xs text-neutral-500">
          For demo purposes, clicking Sign In will bypass authentication.
        </p>
      </div>
    </div>
  );
}
