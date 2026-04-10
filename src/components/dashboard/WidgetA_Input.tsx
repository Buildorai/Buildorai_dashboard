// === Dashboard: WidgetA_Input component ===
"use client";

import { useState } from "react";
import { Plus, Send, Calendar, Users } from "lucide-react";

export default function ProjectInputWidget() {
  const [projectName, setProjectName] = useState("");

  return (
    <div className="rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Initialize Project</h3>
        <div className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          AI Engine Ready
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-secondary">
            Project Codename
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="e.g. Project Antigravity"
            className="w-full rounded-xl border border-white/5 bg-background/50 px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-primary focus:outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-secondary">
              Deadline
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
              <input
                type="text"
                placeholder="Oct 24, 2026"
                className="w-full rounded-xl border border-white/5 bg-background/50 pl-10 pr-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-primary focus:outline-none transition-all"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-secondary">
              Team Size
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
              <input
                type="number"
                placeholder="12"
                className="w-full rounded-xl border border-white/5 bg-background/50 pl-10 pr-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-primary focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-secondary">
            Deployment Parameters
          </label>
          <textarea
            rows={3}
            placeholder="Define custom parameters for AI-driven scheduling..."
            className="w-full rounded-xl border border-white/5 bg-background/50 px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-primary focus:outline-none transition-all"
          />
        </div>

        <button className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20">
          Sync with AI Engine
          <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>
    </div>
  );
}
