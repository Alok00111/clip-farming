import { ArrowRight, Scissors } from "lucide-react";

interface LoginViewProps {
  onLogin: () => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 pt-20">
      {/* Background Effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
        <div className="h-[40rem] w-[40rem] rounded-full bg-neutral-300 blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-10 shadow-xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
            <Scissors className="h-8 w-8 text-accent" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold uppercase tracking-tight text-black">
            Clipper Portal
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Sign in to claim videos and track payouts.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Coming Soon
            </span>
          </div>
          <p className="text-center text-sm leading-relaxed text-neutral-500">
            We are currently building the ultimate portal for our network of clippers. 
            Check back later to access your personalized dashboard, claim videos, and track your payouts.
          </p>
        </div>
      </div>
    </div>
  );
}
