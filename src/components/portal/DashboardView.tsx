import { Play, Download, Upload, Clock } from "lucide-react";

export default function DashboardView() {
  const availableProjects = [
    { id: 1, client: "Top Podcast", length: "45m Raw", reward: "$50 + CPM", tag: "Viral Potential" },
    { id: 2, client: "Fitness Brand", length: "10m Raw", reward: "$30 + CPM", tag: "Urgent" },
    { id: 3, client: "Tech Reviewer", length: "20m Raw", reward: "$40 + CPM", tag: "Standard" },
  ];

  const activeProjects = [
    { id: 4, client: "Finance Guru", status: "In Progress", due: "Tomorrow" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-black">Dashboard</h1>
        <p className="mt-2 text-neutral-500">Welcome back. You have {availableProjects.length} new raw clips available to claim.</p>
      </div>

      {/* Active Projects */}
      <section>
        <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold uppercase tracking-widest text-black">
          <Clock className="h-5 w-5" /> Active Edits
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeProjects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-black" />
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-black">{project.client}</h3>
                  <p className="mt-1 text-sm text-neutral-500">Due: {project.due}</p>
                </div>
                <span className="rounded bg-neutral-100 px-2 py-1 text-xs font-bold text-black">{project.status}</span>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-neutral-100 py-2 text-sm font-bold text-black transition-colors hover:bg-neutral-200">
                  <Download className="h-4 w-4" /> Raw
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-black py-2 text-sm font-bold text-white transition-colors hover:bg-neutral-800">
                  <Upload className="h-4 w-4" /> Submit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Available Projects */}
      <section>
        <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-widest text-black">Available to Claim</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {availableProjects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 transition-colors hover:bg-neutral-50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-black">{project.client}</h3>
                  <p className="mt-1 text-sm text-neutral-500">{project.length}</p>
                </div>
                <span className="rounded bg-neutral-100 px-2 py-1 text-xs font-bold text-neutral-600">{project.tag}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-black">
                <span className="font-bold">{project.reward}</span>
              </div>
              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 py-3 text-sm font-bold text-white transition-colors hover:bg-black">
                <Play className="h-4 w-4" /> Claim Project
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
