// === Dashboard: Header component ===
import { Bell, Search, User } from "lucide-react";

export default function Header({ title }: { title: string }) {
  return (
    <header className="flex pt-8 pb-4 items-center justify-between border-b border-white/5 bg-background/50 px-8 backdrop-blur-md">
      <div>
        <h1 className="text-xl font-bold text-white font-heading">{title}</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input
            type="text"
            placeholder="Search commands..."
            className="h-10 w-64 rounded-xl border border-white/5 bg-surface/50 pl-10 pr-4 text-sm text-white placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        <button className="relative rounded-xl border border-white/5 bg-surface/50 p-2 text-text-secondary transition-all hover:bg-white/5 hover:text-white">
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </button>

        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Alex Rivera</p>
            <p className="text-xs text-text-secondary">System Admin</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
