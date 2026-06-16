import Link from "next/link";
import { Home, LayoutDashboard, Wallet, Settings, LogOut, Scissors } from "lucide-react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-white">
      {/* Sidebar */}
      <aside className="fixed bottom-0 left-0 top-0 z-40 w-64 flex-col border-r border-white/10 bg-black/50 p-6 backdrop-blur-xl sm:flex hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
            <Scissors className="h-5 w-5 text-accent" />
          </div>
          <span className="font-display font-bold uppercase tracking-widest">ClipFarming</span>
        </div>

        <nav className="mt-12 flex flex-1 flex-col gap-2">
          <Link 
            href="/portal/dashboard"
            className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10"
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <Link 
            href="/portal/earnings"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Wallet className="h-4 w-4" /> Earnings & Payouts
          </Link>
          <button 
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/5 hover:text-white text-left"
          >
            <Settings className="h-4 w-4" /> Settings
          </button>
        </nav>

        <div className="mt-auto border-t border-white/10 pt-6">
          <Link 
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-400 transition-colors hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 sm:ml-64 relative">
        {/* Header (Mobile menu placeholder & user profile) */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-end border-b border-white/10 bg-black/50 px-8 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-bold uppercase tracking-wider">Clipper_09</div>
              <div className="text-xs text-accent">Pro Tier</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-neutral-800" />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
