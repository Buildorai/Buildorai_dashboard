// === Dashboard: Overview Page ===
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  GitBranch,
  Users,
  Cpu,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Zap,
  TrendingUp,
  Circle,
  RefreshCw,
  MoreHorizontal,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";

// ── Dummy Data ────────────────────────────────────────────────────────────────

const stats = [
  {
    label: "Active Projects",
    value: "24",
    subValue: "+3 this week",
    icon: LayoutGrid,
    trend: "up" as const,
    color: "primary" as const,
  },
  {
    label: "Running Workflows",
    value: "138",
    subValue: "+12 from yesterday",
    icon: GitBranch,
    trend: "up" as const,
    color: "success" as const,
  },
  {
    label: "Team Members",
    value: "47",
    subValue: "2 pending invites",
    icon: Users,
    trend: "neutral" as const,
    color: "warning" as const,
  },
  {
    label: "CPU Utilization",
    value: "73%",
    subValue: "-5% from peak",
    icon: Cpu,
    trend: "down" as const,
    color: "danger" as const,
  },
];

const CHART_BARS = [38, 55, 42, 70, 60, 88, 75, 50, 65, 80, 92, 68, 74, 85];

const ACTIVITIES = [
  {
    id: 1,
    user: "Alex Rivera",
    initials: "AR",
    action: "deployed",
    target: "Project Horizon v2.1",
    time: "2 min ago",
    status: "success",
  },
  {
    id: 2,
    user: "Sarah Chen",
    initials: "SC",
    action: "triggered workflow",
    target: "Auto-Scale Node Cluster",
    time: "9 min ago",
    status: "running",
  },
  {
    id: 3,
    user: "Marcus Webb",
    initials: "MW",
    action: "flagged issue in",
    target: "Data Core Sync",
    time: "25 min ago",
    status: "warning",
  },
  {
    id: 4,
    user: "Priya Nair",
    initials: "PN",
    action: "completed sprint in",
    target: "AI Pipeline Alpha",
    time: "1 hr ago",
    status: "success",
  },
  {
    id: 5,
    user: "James Osei",
    initials: "JO",
    action: "updated config for",
    target: "Workflow Orchestrator",
    time: "2 hr ago",
    status: "success",
  },
];

const PROJECTS = [
  {
    name: "Project Horizon",
    team: 8,
    progress: 78,
    status: "On Track",
    statusColor: "text-success",
    due: "Apr 28",
  },
  {
    name: "AI Pipeline Alpha",
    team: 5,
    progress: 55,
    status: "In Progress",
    statusColor: "text-primary",
    due: "May 10",
  },
  {
    name: "Data Core Sync",
    team: 3,
    progress: 32,
    status: "At Risk",
    statusColor: "text-warning",
    due: "Apr 22",
  },
  {
    name: "Node Cluster v3",
    team: 6,
    progress: 91,
    status: "Near Done",
    statusColor: "text-success",
    due: "Apr 18",
  },
  {
    name: "Automation Engine",
    team: 4,
    progress: 14,
    status: "Just Started",
    statusColor: "text-text-secondary",
    due: "Jun 01",
  },
];

const HEALTH = [
  { label: "API Gateway", value: 98, color: "bg-success" },
  { label: "ML Inference", value: 84, color: "bg-primary" },
  { label: "Data Pipeline", value: 71, color: "bg-warning" },
  { label: "Auth Service", value: 99, color: "bg-success" },
  { label: "Storage Cluster", value: 63, color: "bg-danger" },
];

const QUICK_ACTIONS = [
  { label: "New Project", icon: LayoutGrid, color: "bg-primary/10 text-primary hover:bg-primary/20" },
  { label: "Run Workflow", icon: GitBranch, color: "bg-success/10 text-success hover:bg-success/20" },
  { label: "Invite Member", icon: Users, color: "bg-warning/10 text-warning hover:bg-warning/20" },
  { label: "View Insights", icon: TrendingUp, color: "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20" },
];

// ── Status badge helper ───────────────────────────────────────────────────────
const ActivityDot = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    success: "bg-success",
    running: "bg-primary animate-pulse",
    warning: "bg-warning",
  };
  return (
    <span className={`mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full ${map[status] ?? "bg-text-secondary"}`} />
  );
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function DashboardOverview() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="p-4 md:p-8 space-y-8">

      {/* ── Welcome row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Hello Alex,
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Here's a live snapshot of your command center.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 self-start sm:self-auto rounded-xl border border-white/5 bg-surface/40 px-4 py-2 text-xs font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-all"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* ── Middle row: Chart + Activity ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Bar chart */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Workflow Execution Pulse
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Tasks completed per hour · today
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-text-secondary">Live</span>
            </div>
          </div>

          {/* Bars */}
          <div className="relative h-52 w-full">
            <div className="absolute inset-0 flex items-end justify-between gap-1.5 px-1">
              {CHART_BARS.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, delay: i * 0.04, ease: "easeOut" }}
                  className="w-full rounded-t-md bg-gradient-to-t from-primary/20 via-primary/50 to-primary/90 cursor-pointer hover:opacity-80 transition-opacity"
                  title={`${h} tasks`}
                />
              ))}
            </div>
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-full border-t border-white/5" />
              ))}
            </div>
          </div>

          <div className="mt-3 flex justify-between text-[10px] font-mono uppercase tracking-widest text-text-secondary">
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
            <span>Now</span>
          </div>

          {/* Summary pills */}
          <div className="mt-5 flex flex-wrap gap-4">
            {[
              { label: "Total Tasks", value: "1,248", icon: CheckCircle2, color: "text-success" },
              { label: "Avg / hr", value: "89", icon: Activity, color: "text-primary" },
              { label: "Peak", value: "148", icon: Zap, color: "text-warning" },
            ].map((kpi) => (
              <div key={kpi.label} className="flex items-center gap-2">
                <kpi.icon size={14} className={kpi.color} />
                <span className="text-xs text-text-secondary">{kpi.label}:</span>
                <span className="text-xs font-semibold text-white">{kpi.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md flex flex-col">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-heading">Recent Activity</h3>
            <button className="rounded-lg p-1.5 text-text-secondary hover:text-white hover:bg-white/5 transition-all">
              <MoreHorizontal size={16} />
            </button>
          </div>

          <div className="space-y-4 flex-1">
            {ACTIVITIES.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-3"
              >
                <ActivityDot status={a.status} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white leading-relaxed">
                    <span className="font-semibold">{a.user}</span>{" "}
                    <span className="text-text-secondary">{a.action}</span>{" "}
                    <span className="text-primary">{a.target}</span>
                  </p>
                  <p className="text-[11px] text-text-secondary/60 mt-0.5">{a.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="mt-5 w-full rounded-xl border border-white/5 py-2 text-xs text-text-secondary hover:text-white hover:bg-white/5 transition-all">
            View all activity →
          </button>
        </div>
      </div>

      {/* ── Bottom row: Projects table + Health + Quick Actions ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Projects table */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-heading">Active Projects</h3>
            <button className="flex items-center gap-1.5 rounded-xl border border-white/5 px-3 py-1.5 text-xs text-text-secondary hover:text-white hover:bg-white/5 transition-all">
              <ArrowUpRight size={13} /> View all
            </button>
          </div>

          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["Project", "Team", "Progress", "Status", "Due"].map((h) => (
                    <th
                      key={h}
                      className="pb-3 text-left text-[10px] font-medium uppercase tracking-widest text-text-secondary"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {PROJECTS.map((p, i) => (
                  <motion.tr
                    key={p.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 pr-4 font-medium text-white whitespace-nowrap">
                      {p.name}
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-1.5 text-text-secondary">
                        <Users size={13} />
                        <span>{p.team}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-6 w-32">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${p.progress}%` }}
                            transition={{ duration: 0.8, delay: i * 0.07 }}
                            className="h-full rounded-full bg-primary"
                          />
                        </div>
                        <span className="text-[11px] text-text-secondary w-8 text-right">
                          {p.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs font-medium ${p.statusColor}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-text-secondary whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {p.due}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column: System Health + Quick Actions */}
        <div className="flex flex-col gap-6">

          {/* System Health */}
          <div className="rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-heading">System Health</h3>
              <span className="flex items-center gap-1.5 text-xs text-success">
                <Circle size={8} className="fill-success" /> Operational
              </span>
            </div>

            <div className="space-y-4">
              {HEALTH.map((h, i) => (
                <div key={h.label}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-text-secondary">{h.label}</span>
                    <span
                      className={`font-semibold ${
                        h.value >= 90
                          ? "text-success"
                          : h.value >= 70
                          ? "text-primary"
                          : h.value >= 60
                          ? "text-warning"
                          : "text-danger"
                      }`}
                    >
                      {h.value}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${h.value}%` }}
                      transition={{ duration: 0.9, delay: i * 0.08 }}
                      className={`h-full rounded-full ${h.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insight */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">AI Insight</span>
            </div>
            <p className="text-xs leading-relaxed text-text-secondary">
              <span className="text-white font-semibold">3 workflows</span> are predicted to miss their deadlines.
              Auto-scaling is recommended for{" "}
              <span className="text-primary font-medium">Node Cluster v3</span> to recover{" "}
              <span className="text-success font-semibold">+18 hrs</span>.
            </p>
            <button className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary hover:underline transition-all">
              Apply recommendation <ArrowUpRight size={13} />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-white/5 bg-surface/30 p-5 backdrop-blur-md">
            <h3 className="mb-4 text-base font-bold text-white font-heading">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  className={`flex flex-col items-center gap-2 rounded-xl p-3 text-xs font-medium transition-all ${action.color}`}
                >
                  <action.icon size={18} />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
