import { DollarSign, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";

export default function EarningsView() {
  const performanceFeed = [
    { id: 1, video: "Finance Hacks #4", views: "1.2M", earned: "$120.00", date: "Today" },
    { id: 2, video: "Podcast Clip - Marketing", views: "450K", earned: "$45.00", date: "Yesterday" },
    { id: 3, video: "Tech Review Short", views: "890K", earned: "$89.00", date: "2 days ago" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-black">Earnings & Payouts</h1>
        <p className="mt-2 text-neutral-500">Track your performance and upcoming bi-weekly payouts.</p>
      </div>

      {/* Top Metrics */}
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Total Balance */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 relative overflow-hidden sm:col-span-2">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neutral-200 blur-[80px] opacity-50" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-center gap-2 text-black">
              <DollarSign className="h-5 w-5" />
              <span className="font-bold uppercase tracking-widest">Pending Payout</span>
            </div>
            <div className="mt-4">
              <span className="font-display text-6xl font-bold text-black">$254.00</span>
              <p className="mt-2 text-sm text-neutral-500">To be paid to your connected wallet.</p>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-neutral-500">
            <Calendar className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-widest">Next Payout</span>
          </div>
          <div className="mt-4">
            <span className="font-display text-4xl font-bold text-black">2 Days</span>
            <p className="mt-2 text-sm text-neutral-500 font-bold">Bi-Weekly Schedule</p>
          </div>
        </div>
      </div>

      {/* Performance Feed */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold uppercase tracking-widest text-black">
            <TrendingUp className="h-5 w-5" /> Recent Performance
          </h2>
          <button className="text-sm font-bold text-neutral-500 hover:text-black transition-colors">View All</button>
        </div>
        
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="grid grid-cols-4 gap-4 border-b border-neutral-200 bg-neutral-50 p-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
            <div className="col-span-2">Video</div>
            <div>Views</div>
            <div className="text-right">Earned</div>
          </div>
          <div className="divide-y divide-neutral-200">
            {performanceFeed.map((item) => (
              <div key={item.id} className="grid grid-cols-4 items-center gap-4 p-4 hover:bg-neutral-50 transition-colors">
                <div className="col-span-2">
                  <p className="font-bold text-black">{item.video}</p>
                  <p className="text-xs text-neutral-500">{item.date}</p>
                </div>
                <div className="flex items-center gap-1 font-bold text-neutral-700">
                  {item.views} <ArrowUpRight className="h-3 w-3 text-neutral-400" />
                </div>
                <div className="text-right font-bold text-black">
                  {item.earned}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
