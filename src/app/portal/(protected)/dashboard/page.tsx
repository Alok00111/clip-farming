import { Play, Download, Upload, Clock } from "lucide-react";

export default function DashboardPage() {
  const availableProjects = [
    { id: 1, client: "Top Podcast", length: "45m Raw", reward: "$50 + CPM", tag: "Viral Potential" },
    { id: 2, client: "Fitness Brand", length: "10m Raw", reward: "$30 + CPM", tag: "Urgent" },
    { id: 3, client: "Tech Reviewer", length: "20m Raw", reward: "$40 + CPM", tag: "Standard" },
  ];

  const activeProjects = [
    { id: 4, client: "Finance Guru", status: "In Progress", due: "Tomorrow" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight">Dashboard</h1>
        <p className="mt-2 text-neutral-400">Welcome back. You have {availableProjects.length} new raw clips available to claim.</p>
      </div>

      {/* Active Projects */}
      <section>
        <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold uppercase tracking-widest text-accent">
          <Clock className="h-5 w-5" /> Active Edits
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeProjects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-accent/20 bg-accent/5 p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white">{project.client}</h3>
                  <p className="mt-1 text-sm text-neutral-400">Due: {project.due}</p>
                </div>
                <span className="rounded bg-accent/20 px-2 py-1 text-xs font-bold text-accent">{project.status}</span>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white/10 py-2 text-sm font-bold transition-colors hover:bg-white/20">
                  <Download className="h-4 w-4" /> Raw
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-accent py-2 text-sm font-bold text-black transition-colors hover:bg-accent/90">
                  <Upload className="h-4 w-4" /> Submit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Available Projects */}
      <section>
        <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-widest">Available to Claim</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {availableProjects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-white/5 bg-neutral-900/50 p-6 transition-colors hover:bg-neutral-800/50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white">{project.client}</h3>
                  <p className="mt-1 text-sm text-neutral-400">{project.length}</p>
                </div>
                <span className="rounded bg-white/10 px-2 py-1 text-xs font-bold text-neutral-300">{project.tag}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-accent">
                <span className="font-bold">{project.reward}</span>
              </div>
              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-bold text-black transition-colors hover:bg-neutral-200">
                <Play className="h-4 w-4" /> Claim Project
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
