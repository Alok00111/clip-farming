"use client";

import { useState } from "react";
import LoginView from "@/components/portal/LoginView";
import DashboardView from "@/components/portal/DashboardView";
import EarningsView from "@/components/portal/EarningsView";
import PortalSidebar from "@/components/portal/PortalSidebar";

export default function PortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTab, setCurrentTab] = useState("dashboard");

  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-neutral-50 text-neutral-900">
      <PortalSidebar 
        currentTab={currentTab} 
        onTabChange={setCurrentTab} 
        onLogout={() => {
          setIsAuthenticated(false);
          setCurrentTab("dashboard");
        }} 
      />
      
      <main className="flex-1 sm:ml-64 relative">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-end border-b border-neutral-200 bg-white/80 px-8 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-bold uppercase tracking-wider text-black">Clipper_09</div>
              <div className="text-xs text-accent">Pro Tier</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-neutral-200" />
          </div>
        </header>

        <div className="p-8 lg:p-12">
          {currentTab === "dashboard" && <DashboardView />}
          {currentTab === "earnings" && <EarningsView />}
        </div>
      </main>
    </div>
  );
}
