import { Play, Download, Upload, Clock, CheckCircle2, MessageSquare, AlertCircle, Video } from "lucide-react";

export default function DashboardPage() {
  // Mocking the "Assigned Squad" data model
  const squadAssignments = [
    { id: 1, client: "Top Podcast - Ep. 42", type: "Raw VOD", size: "45GB", proxy: "720p Proxy Available", reward: "$50 Base + Bonus", tag: "NEW ASSIGNMENT" },
    { id: 2, client: "Fitness Brand - Q3 Promo", type: "Raw A-Roll", size: "12GB", proxy: "Generating...", reward: "$30 Base", tag: "URGENT" },
  ];

  const inProgress = [
    { id: 3, client: "Tech Reviewer - Gadget Unboxing", due: "In 4 hours", progress: "Editing..." },
  ];

  const pendingReview = [
    { id: 4, client: "Finance Guru - Stock Tips", submitted: "2 hours ago", feedback: 2 },
  ];

  const approved = [
    { id: 5, client: "Top Podcast - Ep. 41", paid: "$65.00", date: "Yesterday" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-4xl font-black uppercase tracking-tight text-white">Squad Dashboard</h1>
        <p className="mt-2 text-neutral-400">Welcome to Alpha Squad. You have <span className="text-accent font-bold">{squadAssignments.length} new assignments</span> available.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        
        {/* Column 1: Squad Assignments */}
        <section className="bg-neutral-900/40 rounded-xl p-4 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold uppercase tracking-widest text-white">1. Assigned</h2>
            <span className="bg-white/10 text-white text-xs px-2 py-1 rounded font-bold">{squadAssignments.length}</span>
          </div>
          
          <div className="space-y-4">
            {squadAssignments.map((project) => (
              <div key={project.id} className="group rounded-lg border border-white/10 bg-black p-5 transition-colors hover:border-accent">
                <div className="flex items-start justify-between mb-3">
                  <span className="rounded bg-accent/10 px-2 py-1 text-[10px] font-black tracking-widest text-accent uppercase">{project.tag}</span>
                </div>
                <h3 className="font-bold text-white mb-1">{project.client}</h3>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                  <Video className="w-3 h-3" />
                  <span>{project.type} • {project.size}</span>
                </div>
                
                <div className="bg-neutral-900 rounded p-2 mb-4 border border-white/5">
                  <p className="text-xs text-neutral-300 flex items-center gap-1">
                    <Play className="w-3 h-3 text-accent" /> {project.proxy}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 border-t border-white/10 pt-4">
                  <span className="font-bold text-accent text-sm">{project.reward}</span>
                  <button className="flex items-center justify-center gap-2 rounded bg-white px-3 py-1.5 text-xs font-bold text-black transition-colors hover:bg-neutral-200">
                    Claim Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Column 2: In Progress */}
        <section className="bg-neutral-900/40 rounded-xl p-4 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold uppercase tracking-widest text-accent">2. In Progress</h2>
            <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded font-bold">{inProgress.length}</span>
          </div>
          
          <div className="space-y-4">
            {inProgress.map((project) => (
              <div key={project.id} className="rounded-lg border border-accent/30 bg-accent/5 p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
                <h3 className="font-bold text-white mb-1 mt-1">{project.client}</h3>
                <p className="text-xs text-neutral-400 flex items-center gap-1 mb-4">
                  <Clock className="w-3 h-3" /> Due: {project.due}
                </p>
                
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 rounded bg-white/10 py-2 text-xs font-bold text-white hover:bg-white/20 transition-colors">
                    <Download className="w-3 h-3" /> Raw 4K
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 rounded bg-accent py-2 text-xs font-bold text-black hover:bg-accent/90 transition-colors">
                    <Upload className="w-3 h-3" /> Submit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Column 3: Pending Review */}
        <section className="bg-neutral-900/40 rounded-xl p-4 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold uppercase tracking-widest text-yellow-500">3. In Review</h2>
            <span className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-1 rounded font-bold">{pendingReview.length}</span>
          </div>

          <div className="space-y-4">
            {pendingReview.map((project) => (
              <div key={project.id} className="rounded-lg border border-yellow-500/20 bg-black p-5">
                <h3 className="font-bold text-white mb-1">{project.client}</h3>
                <p className="text-xs text-neutral-400 mb-4">Submitted {project.submitted}</p>
                
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
                  <p className="text-xs text-yellow-500 flex items-center gap-2 font-bold">
                    <AlertCircle className="w-4 h-4" /> Client requested changes
                  </p>
                  <button className="mt-3 w-full flex items-center justify-center gap-2 rounded bg-yellow-500/20 py-1.5 text-xs font-bold text-yellow-500 hover:bg-yellow-500/30 transition-colors">
                    <MessageSquare className="w-3 h-3" /> View {project.feedback} Comments
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Column 4: Approved / Paid */}
        <section className="bg-neutral-900/40 rounded-xl p-4 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold uppercase tracking-widest text-green-500">4. Approved</h2>
            <span className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded font-bold">{approved.length}</span>
          </div>

          <div className="space-y-4">
            {approved.map((project) => (
              <div key={project.id} className="rounded-lg border border-green-500/20 bg-black p-5 opacity-75">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-sm truncate max-w-[120px]">{project.client}</h3>
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-3">
                  <span className="text-xs text-neutral-500">{project.date}</span>
                  <span className="text-sm font-bold text-green-500">{project.paid}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
