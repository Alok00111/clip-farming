import { LayoutDashboard, Wallet, Settings, LogOut, Scissors } from "lucide-react";
import Link from "next/link";

interface PortalSidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export default function PortalSidebar({ currentTab, onTabChange, onLogout }: PortalSidebarProps) {
  return (
    <aside className="fixed bottom-0 left-0 top-0 z-40 w-64 flex-col border-r border-white/10 bg-black/50 p-6 backdrop-blur-xl sm:flex hidden">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
          <Scissors className="h-5 w-5 text-accent" />
        </div>
        <span className="font-display font-bold uppercase tracking-widest text-white">ClipFarming</span>
      </div>

      <nav className="mt-12 flex flex-1 flex-col gap-2">
        <button 
          onClick={() => onTabChange("dashboard")}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors text-left ${currentTab === "dashboard" ? "bg-white/5 text-white" : "text-neutral-400 hover:bg-white/5 hover:text-white"}`}
        >
          <LayoutDashboard className="h-4 w-4" /> Dashboard
        </button>
        <button 
          onClick={() => onTabChange("earnings")}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors text-left ${currentTab === "earnings" ? "bg-white/5 text-white" : "text-neutral-400 hover:bg-white/5 hover:text-white"}`}
        >
          <Wallet className="h-4 w-4" /> Earnings & Payouts
        </button>
        <button 
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/5 hover:text-white text-left"
        >
          <Settings className="h-4 w-4" /> Settings
        </button>
      </nav>

      <div className="mt-auto border-t border-white/10 pt-6">
        <button 
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-400 transition-colors hover:bg-red-500/10 hover:text-red-500 text-left"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
        
        {/* Return to marketing site */}
        <Link 
          href="/"
          className="mt-2 flex w-full justify-center text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </aside>
  );
}
