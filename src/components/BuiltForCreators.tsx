import { Mic, MonitorPlay, Music, Tv, GraduationCap, UserCircle2, Briefcase, Gamepad2 } from "lucide-react";

const creators = [
  { name: "Podcasters", icon: Mic },
  { name: "YouTubers", icon: MonitorPlay },
  { name: "Music Artists", icon: Music },
  { name: "Movies & TV", icon: Tv },
  { name: "Educators", icon: GraduationCap },
  { name: "Public Figures", icon: UserCircle2 },
  { name: "Brands/Startups", icon: Briefcase },
  { name: "Gamers", icon: Gamepad2 },
];

export default function BuiltForCreators() {
  return (
    <section className="relative w-full bg-background pb-24 pt-12 overflow-hidden border-b-4 border-border">
      {/* Decorative orange border right-angle frame */}
      <div className="absolute bottom-12 right-12 h-32 w-48 border-b-8 border-r-8 border-accent z-0 pointer-events-none hidden md:block" />

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tight">
          <span className="text-white">Built For </span>
          <span className="text-accent">Creators.</span>
        </h2>
        <p className="mt-6 text-xl font-medium text-muted-foreground max-w-2xl">
          If you have long-form content, our clipper network can scale your reach.
        </p>

        <div className="mt-16 flex flex-wrap justify-center gap-4 max-w-5xl">
          {creators.map((creator, i) => {
            const Icon = creator.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 transition-colors hover:bg-white/10 hover:border-white/20 cursor-default"
              >
                <Icon className="h-5 w-5 text-white" />
                <span className="font-bold text-white tracking-wide">{creator.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
