// === Dashboard: WidgetC_Monitor component ===
"use client";

import { motion } from "framer-motion";
import { Zap, ShieldAlert, CheckCircle2, TrendingUp } from "lucide-react";

const stats = [
  { label: "AI Confidence", value: "98.4%", icon: TrendingUp, color: "text-primary" },
  { label: "Sync Status", value: "Nominal", icon: CheckCircle2, color: "text-success" },
  { label: "Security", value: "Locked", icon: Zap, color: "text-warning" },
  { label: "Alerts", value: "0", icon: ShieldAlert, color: "text-text-secondary" },
];

export default function MonitorWidget() {
  return (
    <div className="rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">System Monitor</h3>
        <p className="text-xs text-text-secondary">Core Service Telemetry</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="rounded-xl border border-white/5 bg-background/50 p-4"
          >
            <div className={`mb-2 flex items-center gap-2 ${stat.color}`}>
              <stat.icon size={16} />
              <span className="text-[10px] uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="text-xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-text-secondary">Resource Allocation</span>
            <span className="text-white">72%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark"
            />
          </div>
        </div>
        
        <div>
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-text-secondary">AI Computation Build</span>
            <span className="text-white">45%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "45%" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="h-full rounded-full bg-gradient-to-r from-success to-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
