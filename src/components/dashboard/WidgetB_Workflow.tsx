// === Dashboard: WidgetB_Workflow component ===
"use client";

import { motion } from "framer-motion";
import { Activity, Clock } from "lucide-react";

const tasks = [
  { id: 1, name: "Core Architecture", progress: 90, start: 0, width: 60, status: "completed" },
  { id: 2, name: "AI Model Training", progress: 65, start: 40, width: 45, status: "active" },
  { id: 3, name: "Edge Deployment", progress: 0, start: 70, width: 25, status: "pending" },
  { id: 4, name: "Data Synchronization", progress: 20, start: 20, width: 35, status: "active" },
];

export default function WorkflowWidget() {
  return (
    <div className="rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Workflow Timeline</h3>
          <p className="text-xs text-text-secondary">AI-Optimized Schedule</p>
        </div>
        <div className="flex gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface/50 text-text-secondary">
            <Activity size={16} />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface/50 text-text-secondary">
            <Clock size={16} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/5 bg-background/50 p-4">
          {/* Vertical Guides */}
          <div className="absolute inset-0 flex justify-between px-4 opacity-20">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-full w-px bg-white/10" />
            ))}
          </div>

          <div className="relative z-10 space-y-4">
            {tasks.map((task, index) => (
              <div key={task.id} className="group">
                <div className="mb-1 flex justify-between text-[10px] font-medium uppercase tracking-widest text-text-secondary">
                  <span>{task.name}</span>
                  <span className={task.status === "completed" ? "text-success" : task.status === "active" ? "text-primary" : ""}>
                    {task.progress}%
                  </span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0, x: `${task.start}%` }}
                    animate={{ width: `${task.width}%`, x: `${task.start}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`absolute h-full rounded-full ${task.status === "completed"
                        ? "bg-success"
                        : task.status === "active"
                          ? "bg-primary"
                          : "bg-surface-hover"
                      }`}
                  >
                    {task.status === "active" && (
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-white/20"
                      />
                    )}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <motion.div
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-px bg-primary/50 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/5 bg-background/30 p-3">
            <p className="text-[10px] uppercase text-text-secondary">Efficiency</p>
            <p className="text-xl font-bold text-white">+14.2%</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-background/30 p-3">
            <p className="text-[10px] uppercase text-text-secondary">Resources</p>
            <p className="text-xl font-bold text-white">8/12</p>
          </div>
        </div>
      </div>
    </div>
  );
}
