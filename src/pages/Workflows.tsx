// === Dashboard: Workflows Page ===
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  Clock,
  Layers,
  Play,
  Pause,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Zap,
  TrendingUp,
  Activity,
  ChevronDown,
  Timer,
  Cpu,
  ArrowRight,
  RefreshCw,
  Trash2,
  Edit3,
  Copy,
  Eye,
  X,
  Terminal,
  AlertTriangle,
  Info,
  CheckCheck,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import Badge from '@/components/dashboard/Badge';

// ── Types ────────────────────────────────────────────────────────────────────

type WorkflowStatus = 'active' | 'pending' | 'halted' | 'syncing' | 'nominal';

interface Workflow {
  id: string;
  name: string;
  status: WorkflowStatus;
  stability: number;
  tasks: number;
  completedTasks: number;
  duration: string;
  lastRun: string;
  owner: string;
  initials: string;
  avatarColor: string;
  executions: number;
  successRate: number;
  tags: string[];
}

interface GanttTask {
  name: string;
  progress: number;
  start: number;
  width: number;
  status: 'done' | 'running' | 'planned' | 'blocked';
  owner: string;
  ownerInitials: string;
  due: string;
}

// ── Data ────────────────────────────────────────────────────────────────────

const WORKFLOWS: Workflow[] = [
  {
    id: 'wf-001',
    name: 'Core Engine Sync',
    status: 'active',
    stability: 99.4,
    tasks: 24,
    completedTasks: 21,
    duration: '4h 32m',
    lastRun: '2 min ago',
    owner: 'Alex Rivera',
    initials: 'AR',
    avatarColor: 'from-blue-500 to-primary',
    executions: 1248,
    successRate: 98.7,
    tags: ['core', 'sync'],
  },
  {
    id: 'wf-002',
    name: 'Model Training Pulse',
    status: 'pending',
    stability: 82.1,
    tasks: 12,
    completedTasks: 4,
    duration: '12h 00m',
    lastRun: '1 hr ago',
    owner: 'Sarah Chen',
    initials: 'SC',
    avatarColor: 'from-purple-500 to-pink-500',
    executions: 344,
    successRate: 79.2,
    tags: ['ml', 'training'],
  },
  {
    id: 'wf-003',
    name: 'Infrastructure Scale',
    status: 'syncing',
    stability: 95.8,
    tasks: 8,
    completedTasks: 5,
    duration: '1h 15m',
    lastRun: '18 min ago',
    owner: 'Marcus Webb',
    initials: 'MW',
    avatarColor: 'from-emerald-500 to-teal-500',
    executions: 876,
    successRate: 95.1,
    tags: ['infra', 'scaling'],
  },
  {
    id: 'wf-004',
    name: 'Data Core Integration',
    status: 'halted',
    stability: 61.3,
    tasks: 18,
    completedTasks: 7,
    duration: '—',
    lastRun: '3 hr ago',
    owner: 'Priya Nair',
    initials: 'PN',
    avatarColor: 'from-orange-500 to-red-500',
    executions: 522,
    successRate: 61.0,
    tags: ['data', 'integration'],
  },
  {
    id: 'wf-005',
    name: 'Auth Service Watchdog',
    status: 'nominal',
    stability: 100,
    tasks: 6,
    completedTasks: 6,
    duration: '0h 48m',
    lastRun: '5 min ago',
    owner: 'James Osei',
    initials: 'JO',
    avatarColor: 'from-green-500 to-emerald-400',
    executions: 3102,
    successRate: 99.8,
    tags: ['auth', 'monitoring'],
  },
];

const GANTT_TASKS: GanttTask[] = [
  {
    name: 'Initial Research',
    progress: 100,
    start: 0,
    width: 18,
    status: 'done',
    owner: 'Alex Rivera',
    ownerInitials: 'AR',
    due: 'Apr 5',
  },
  {
    name: 'Architecture Design',
    progress: 100,
    start: 14,
    width: 22,
    status: 'done',
    owner: 'Sarah Chen',
    ownerInitials: 'SC',
    due: 'Apr 12',
  },
  {
    name: 'AI Model Training',
    progress: 58,
    start: 33,
    width: 35,
    status: 'running',
    owner: 'Marcus Webb',
    ownerInitials: 'MW',
    due: 'Apr 28',
  },
  {
    name: 'System Integration',
    progress: 0,
    start: 62,
    width: 28,
    status: 'planned',
    owner: 'Priya Nair',
    ownerInitials: 'PN',
    due: 'May 10',
  },
  {
    name: 'QA & Stress Testing',
    progress: 0,
    start: 74,
    width: 20,
    status: 'blocked',
    owner: 'James Osei',
    ownerInitials: 'JO',
    due: 'May 18',
  },
];

const METRICS = [
  { label: 'Total Executions', value: '6,092', delta: '+14%', icon: Activity, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Avg Success Rate', value: '86.8%', delta: '+2.1%', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
  { label: 'Avg Duration', value: '3h 47m', delta: '-12m', icon: Timer, color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'CPU Utilization', value: '73%', delta: '-5%', icon: Cpu, color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

const EXECUTION_BARS = [42, 68, 55, 80, 73, 91, 78, 62, 85, 95, 70, 88, 76, 82];

const FILTER_OPTIONS: WorkflowStatus[] = ['active', 'pending', 'syncing', 'halted', 'nominal'];

const STATUS_COLORS: Record<WorkflowStatus, string> = {
  active: 'bg-primary',
  pending: 'bg-warning animate-pulse',
  syncing: 'bg-sky-400 animate-pulse',
  halted: 'bg-danger',
  nominal: 'bg-success',
};

const GANTT_STATUS_COLORS: Record<GanttTask['status'], string> = {
  done: 'bg-success/20 border-success/30',
  running: 'bg-primary/20 border-primary/30',
  planned: 'bg-white/5 border-white/10',
  blocked: 'bg-danger/10 border-danger/20',
};

const GANTT_FILL_COLORS: Record<GanttTask['status'], string> = {
  done: 'bg-gradient-to-r from-success/70 to-success',
  running: 'bg-gradient-to-r from-primary/70 to-primary shadow-[0_0_12px_rgba(59,130,246,0.4)]',
  planned: 'bg-white/20',
  blocked: 'bg-danger/40',
};

// ── Mock log data generator ──────────────────────────────────────────────────

type LogLevel = 'info' | 'success' | 'warning' | 'error';
interface LogEntry { id: number; time: string; level: LogLevel; message: string; }

function generateLogs(wfName: string): LogEntry[] {
  const now = new Date();
  const fmt = (d: Date) => d.toLocaleTimeString('en-US', { hour12: false });
  const offset = (s: number) => new Date(now.getTime() - s * 1000);
  return [
    { id: 1,  time: fmt(offset(3600)), level: 'info',    message: `[${wfName}] Workflow initialised — loading config from registry` },
    { id: 2,  time: fmt(offset(3580)), level: 'info',    message: 'Dependency graph resolved: 0 conflicts detected' },
    { id: 3,  time: fmt(offset(3550)), level: 'success', message: 'Agent pool warmed up — 8 workers online' },
    { id: 4,  time: fmt(offset(3500)), level: 'info',    message: 'Task #1 dispatched → core.sync.init' },
    { id: 5,  time: fmt(offset(3450)), level: 'success', message: 'Task #1 completed in 847ms ✓' },
    { id: 6,  time: fmt(offset(3400)), level: 'info',    message: 'Task #2 dispatched → core.sync.validate' },
    { id: 7,  time: fmt(offset(3350)), level: 'warning', message: 'Retry 1/3: downstream latency spike detected (p99=420ms)' },
    { id: 8,  time: fmt(offset(3300)), level: 'success', message: 'Task #2 completed after retry in 1.2s ✓' },
    { id: 9,  time: fmt(offset(3200)), level: 'info',    message: 'Running batch: tasks #3–#8 in parallel' },
    { id: 10, time: fmt(offset(3100)), level: 'success', message: 'Batch completed — 6/6 tasks passed' },
    { id: 11, time: fmt(offset(2800)), level: 'info',    message: 'Checkpoint saved → snapshot-v21.json' },
    { id: 12, time: fmt(offset(2500)), level: 'warning', message: 'CPU budget at 81% — scaling advisory issued' },
    { id: 13, time: fmt(offset(2200)), level: 'info',    message: 'AI Model sync pulse triggered' },
    { id: 14, time: fmt(offset(1800)), level: 'success', message: 'Model weights synchronised — delta: 0.003' },
    { id: 15, time: fmt(offset(1200)), level: 'error',   message: 'Circular dependency warning between task #14 ↔ #17 — auto-decouple applied' },
    { id: 16, time: fmt(offset(900)),  level: 'success', message: 'Dependency graph re-validated — no conflicts' },
    { id: 17, time: fmt(offset(600)),  level: 'info',    message: 'Finalising execution pipeline...' },
    { id: 18, time: fmt(offset(300)),  level: 'success', message: `[${wfName}] Execution cycle complete — 21/24 tasks done` },
    { id: 19, time: fmt(offset(120)),  level: 'info',    message: 'Next scheduled run in 30 minutes' },
    { id: 20, time: fmt(offset(10)),   level: 'success', message: 'Workflow state persisted to store ✓' },
  ];
}

// ── Run Now Modal ─────────────────────────────────────────────────────────────

const RUN_STEPS = [
  'Initialising agent pool',
  'Resolving dependency graph',
  'Dispatching task queue',
  'Executing parallel batch',
  'Syncing model weights',
  'Running integrity checks',
  'Persisting checkpoint',
  'Finalising pipeline',
];

function RunNowModal({ workflow, onClose }: { workflow: Workflow; onClose: () => void }) {
  const [phase, setPhase] = useState<'running' | 'success' | 'failed'>('running');
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    // tick elapsed seconds
    const ticker = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(ticker);
  }, []);

  useEffect(() => {
    if (phase !== 'running') return;
    const stepDuration = 900;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        setProgress(Math.round((next / RUN_STEPS.length) * 100));
        if (next >= RUN_STEPS.length) {
          clearInterval(interval);
          setTimeout(() => setPhase('success'), 500);
        }
        return next;
      });
    }, stepDuration);
    return () => clearInterval(interval);
  }, [phase]);

  const fmtElapsed = `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`;

  return (
    <AnimatePresence>
      {/* Outer scroll container — fills viewport, centers modal, scrolls if needed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={phase !== 'running' ? onClose : undefined}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Centering wrapper */}
        <div className="relative z-10 flex min-h-full items-center justify-center p-4 sm:p-6">
          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0f1117] shadow-2xl overflow-hidden my-auto"
        >
          {/* Top accent bar */}
          <div className={`h-0.5 w-full flex-shrink-0 ${
            phase === 'running' ? 'bg-gradient-to-r from-primary via-sky-400 to-primary' :
            phase === 'success' ? 'bg-success' : 'bg-danger'
          }`} />

          <div className="p-5 sm:p-6 overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${workflow.avatarColor} text-sm font-bold text-white`}>
                  {workflow.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{workflow.name}</p>
                  <p className="text-[11px] text-text-secondary mt-0.5 font-mono">{workflow.id}</p>
                </div>
              </div>
              {phase !== 'running' && (
                <button onClick={onClose} className="rounded-lg p-1.5 text-text-secondary hover:text-white hover:bg-white/10 transition-all">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Status icon */}
            <div className="flex justify-center mb-4">
              {phase === 'running' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  className="text-primary"
                >
                  <Loader2 size={44} strokeWidth={1.5} />
                </motion.div>
              )}
              {phase === 'success' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260 }}>
                  <CheckCheck size={44} strokeWidth={1.5} className="text-success" />
                </motion.div>
              )}
              {phase === 'failed' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260 }}>
                  <XCircle size={44} strokeWidth={1.5} className="text-danger" />
                </motion.div>
              )}
            </div>

            {/* Title */}
            <p className="text-center text-base font-bold text-white mb-1">
              {phase === 'running' ? 'Running Workflow…' : phase === 'success' ? 'Execution Complete' : 'Execution Failed'}
            </p>
            <p className="text-center text-xs text-text-secondary mb-4">
              {phase === 'running' ? `Elapsed: ${fmtElapsed}` : phase === 'success' ? `Completed in ${fmtElapsed} — all tasks passed` : 'An error occurred — check logs for details'}
            </p>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-[10px] text-text-secondary mb-1.5 font-mono">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full rounded-full ${
                    phase === 'success' ? 'bg-success' :
                    phase === 'failed'  ? 'bg-danger'  :
                    'bg-gradient-to-r from-primary to-sky-400'
                  }`}
                />
              </div>
            </div>

            {/* Step list */}
            <div className="space-y-1.5 mb-4">
              {RUN_STEPS.map((step, i) => {
                const done = i < currentStep;
                const active = i === currentStep && phase === 'running';
                return (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-center gap-2.5 text-xs rounded-lg px-3 py-2 transition-all ${
                      active ? 'bg-primary/10 border border-primary/20' :
                      done   ? 'opacity-60' : 'opacity-25'
                    }`}
                  >
                    <span className={`flex h-4 w-4 min-w-[16px] items-center justify-center rounded-full text-[9px] font-bold ${
                      done   ? 'bg-success/20 text-success' :
                      active ? 'bg-primary/20 text-primary' :
                               'bg-white/5 text-text-secondary'
                    }`}>
                      {done ? '✓' : i + 1}
                    </span>
                    <span className={done ? 'text-text-secondary line-through' : active ? 'text-white font-medium' : 'text-text-secondary'}>
                      {step}
                    </span>
                    {active && (
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="ml-auto text-[10px] text-primary font-mono"
                      >
                        running…
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer buttons */}
            {phase !== 'running' ? (
              <div className="flex gap-2">
                <button
                  onClick={() => { setPhase('running'); setCurrentStep(0); setProgress(0); setElapsed(0); }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-text-secondary hover:text-white hover:bg-white/10 transition-all"
                >
                  <RotateCcw size={13} /> Run Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-semibold text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Done
                </button>
              </div>
            ) : (
              <p className="text-center text-[10px] text-text-secondary/50 font-mono">Please wait — execution in progress</p>
            )}
          </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── View Logs Drawer ──────────────────────────────────────────────────────────

const LOG_LEVEL_STYLES: Record<LogLevel, { icon: React.ReactNode; badge: string; text: string }> = {
  info:    { icon: <Info size={11} />,          badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',      text: 'text-text-secondary' },
  success: { icon: <CheckCircle2 size={11} />,  badge: 'bg-success/10 text-success border-success/20',     text: 'text-white/80' },
  warning: { icon: <AlertTriangle size={11} />, badge: 'bg-warning/10 text-warning border-warning/20',     text: 'text-warning/80' },
  error:   { icon: <XCircle size={11} />,       badge: 'bg-danger/10 text-danger border-danger/20',        text: 'text-danger/80' },
};

import React from 'react';

function ViewLogsDrawer({ workflow, onClose }: { workflow: Workflow; onClose: () => void }) {
  const logs = generateLogs(workflow.name);
  const [filter, setFilter] = useState<LogLevel | 'all'>('all');
  const [search, setSearch] = useState('');
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const filtered = logs.filter((l) => {
    const matchLevel = filter === 'all' || l.level === filter;
    const matchSearch = l.message.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-stretch justify-end"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-white/10 bg-[#0d1017] shadow-2xl"
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Terminal size={15} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{workflow.name}</p>
                <p className="text-[10px] text-text-secondary font-mono mt-0.5">Execution Logs · {logs.length} entries</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Live
              </span>
              <button onClick={onClose} className="rounded-lg p-1.5 text-text-secondary hover:text-white hover:bg-white/10 transition-all">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3 flex-shrink-0 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[140px]">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search logs..."
                className="w-full rounded-lg border border-white/5 bg-white/[0.03] pl-7 pr-3 py-1.5 text-xs text-white placeholder-text-secondary focus:outline-none focus:border-primary/40 transition-all"
              />
            </div>
            {/* Level filters */}
            <div className="flex gap-1">
              {(['all', 'info', 'success', 'warning', 'error'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilter(lvl)}
                  className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-all ${
                    filter === lvl
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Log entries */}
          <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-xs space-y-1 scrollbar-thin scrollbar-thumb-white/10">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-text-secondary">
                <Search size={20} className="mb-2 opacity-30" />
                No logs match your filter.
              </div>
            ) : filtered.map((log, i) => {
              const style = LOG_LEVEL_STYLES[log.level];
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className={`flex items-start gap-2.5 rounded-lg px-3 py-2 transition-all hover:bg-white/[0.02] group`}
                >
                  {/* Time */}
                  <span className="text-text-secondary/50 flex-shrink-0 mt-px text-[10px]">{log.time}</span>
                  {/* Level badge */}
                  <span className={`flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-semibold uppercase flex-shrink-0 ${style.badge}`}>
                    {style.icon}
                    {log.level}
                  </span>
                  {/* Message */}
                  <span className={`leading-relaxed ${style.text} break-all`}>{log.message}</span>
                </motion.div>
              );
            })}
            <div ref={logsEndRef} />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/5 px-5 py-3 flex-shrink-0">
            <span className="text-[10px] text-text-secondary font-mono">{filtered.length} of {logs.length} entries shown</span>
            <button
              onClick={() => logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-[10px] font-medium text-text-secondary hover:text-white hover:bg-white/10 transition-all"
            >
              Scroll to bottom ↓
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function MetricCard({ item, delay }: { item: typeof METRICS[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-2xl border border-white/5 bg-surface/30 p-5 backdrop-blur-md flex items-center gap-4 hover:bg-surface/50 transition-all group"
    >
      <div className={`flex h-11 w-11 min-w-[44px] items-center justify-center rounded-xl ${item.bg} ${item.color} transition-transform group-hover:scale-110`}>
        <item.icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-text-secondary uppercase tracking-widest font-mono truncate">{item.label}</p>
        <p className="text-xl font-bold text-white mt-0.5 font-heading">{item.value}</p>
      </div>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.delta.startsWith('+') || item.delta.startsWith('-') && item.label === 'Avg Duration' ? 'bg-success/10 text-success' : item.delta.startsWith('-') ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'}`}>
        {item.delta}
      </span>
    </motion.div>
  );
}

function WorkflowRow({
  wf,
  index,
  onSelect,
  selected,
}: {
  wf: Workflow;
  index: number;
  onSelect: (id: string) => void;
  selected: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const taskPct = Math.round((wf.completedTasks / wf.tasks) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      onClick={() => onSelect(wf.id)}
      className={`group relative rounded-xl border p-4 transition-all cursor-pointer ${
        selected
          ? 'border-primary/40 bg-primary/5 shadow-[0_0_20px_rgba(59,130,246,0.08)]'
          : 'border-white/5 bg-background/40 hover:border-white/10 hover:bg-background/70'
      }`}
    >
      {selected && (
        <div className="absolute inset-y-0 left-0 w-0.5 rounded-full bg-gradient-to-b from-primary to-primary/0" />
      )}

      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={`flex h-9 w-9 min-w-[36px] items-center justify-center rounded-xl bg-gradient-to-br ${wf.avatarColor} text-[11px] font-bold text-white shadow-lg`}>
          {wf.initials}
        </div>

        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <p className="text-sm font-bold text-white truncate">{wf.name}</p>
              <div className="flex gap-1 flex-wrap">
                {wf.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/5 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-text-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge status={wf.status} />
              
            </div>
          </div>

          {/* Task progress bar */}
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[10px]">
              <span className="text-text-secondary font-mono">{wf.completedTasks}/{wf.tasks} tasks</span>
              <span className="text-text-secondary font-mono">{taskPct}%</span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${taskPct}%` }}
                transition={{ duration: 0.8, delay: index * 0.06 + 0.2 }}
                className={`h-full rounded-full ${STATUS_COLORS[wf.status]}`}
              />
            </div>
          </div>

          {/* Footer meta */}
          <div className="mt-3 flex items-center gap-4 text-[11px] text-text-secondary">
            <span className="flex items-center gap-1"><Clock size={11} />{wf.lastRun}</span>
            <span className="flex items-center gap-1"><Timer size={11} />{wf.duration}</span>
            <span className="flex items-center gap-1"><Layers size={11} />{wf.executions.toLocaleString()} runs</span>
            <span className={`ml-auto font-semibold ${wf.successRate >= 90 ? 'text-success' : wf.successRate >= 70 ? 'text-warning' : 'text-danger'}`}>
              {wf.successRate}% ✓
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Workflows() {
  const [activeFilter, setActiveFilter] = useState<WorkflowStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>('wf-001');
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [liveSeconds, setLiveSeconds] = useState(0);
  const [showRunModal, setShowRunModal] = useState(false);
  const [showLogsDrawer, setShowLogsDrawer] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Live timer
  useEffect(() => {
    const iv = setInterval(() => setLiveSeconds((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, []);

  // Close filter menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setShowFilterMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredWorkflows = WORKFLOWS.filter((wf) => {
    const matchesFilter = activeFilter === 'all' || wf.status === activeFilter;
    const matchesSearch = wf.name.toLowerCase().includes(searchQuery.toLowerCase()) || wf.tags.some(t => t.includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const selectedWorkflow = WORKFLOWS.find((wf) => wf.id === selectedId);

  const handleSimulation = () => {
    setSimulationRunning((p) => !p);
  };

  return (
    <div className="p-4 md:p-8 space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-3 mb-1">
           
            
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">Workflow Orchestrator</h2>
          <p className="mt-1 text-sm text-text-secondary">Mapping task dependencies and automated execution paths.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          
          <button
            onClick={handleSimulation}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all ${
              simulationRunning
                ? 'bg-warning/80 hover:bg-warning shadow-warning/20 border border-warning/30'
                : 'bg-primary hover:bg-primary/90 shadow-primary/20 border border-primary/30'
            }`}
          >
            {simulationRunning ? <Pause size={14} /> : <Play size={14} />}
            {simulationRunning ? 'Pause Simulation' : 'Run Simulation'}
          </button>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {METRICS.map((item, i) => (
          <MetricCard key={item.label} item={item} delay={i * 0.07} />
        ))}
      </div>

      {/* ── Mission Timeline (Gantt) ── */}
      <div className="rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-base font-bold text-white font-heading">Mission Timeline</h3>
            <p className="text-xs text-text-secondary mt-0.5">Task dependency map · Sprint Q2</p>
          </div>
          <div className="flex items-center gap-5 text-[10px] text-text-secondary uppercase font-mono">
            {(['done', 'running', 'planned', 'blocked'] as const).map((s) => {
              const colors: Record<string, string> = { done: 'bg-success', running: 'bg-primary', planned: 'bg-white/20', blocked: 'bg-danger/40' };
              return (
                <div key={s} className="flex items-center gap-1.5">
                  <div className={`h-1.5 w-3 rounded-full ${colors[s]}`} />
                  {s}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          {GANTT_TASKS.map((task, i) => (
            <motion.div
              key={task.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <div className="mb-2 flex items-center justify-between text-xs font-medium gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold text-white bg-gradient-to-br ${
                    task.status === 'done' ? 'from-success/70 to-success' :
                    task.status === 'running' ? 'from-primary/70 to-primary' :
                    task.status === 'blocked' ? 'from-danger/70 to-danger' :
                    'from-white/10 to-white/20'
                  }`}>
                    {task.ownerInitials}
                  </div>
                  <span className="text-white group-hover:text-primary transition-colors truncate">{task.name}</span>
                  {task.status === 'running' && (
                    <span className="flex items-center gap-1 text-primary text-[9px] font-mono">
                      <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                      running
                    </span>
                  )}
                  {task.status === 'blocked' && (
                    <span className="text-danger text-[9px] font-mono">⚠ blocked</span>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 text-text-secondary font-mono">
                  <span>{task.progress}%</span>
                  <span className="flex items-center gap-1"><Clock size={10} />{task.due}</span>
                </div>
              </div>
              <div className="relative h-3 w-full rounded-full bg-white/5 overflow-hidden">
                {/* Track bar */}
                <motion.div
                  initial={{ width: 0, left: `${task.start}%` }}
                  animate={{ width: `${task.width}%`, left: `${task.start}%` }}
                  transition={{ duration: 0.9, delay: i * 0.09, ease: 'easeOut' }}
                  className={`absolute h-full rounded-full border ${GANTT_STATUS_COLORS[task.status]}`}
                >
                  {/* Fill */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${task.progress}%` }}
                    transition={{ duration: 1, delay: i * 0.09 + 0.3 }}
                    className={`h-full rounded-full ${GANTT_FILL_COLORS[task.status]}`}
                  />
                  {/* Running shimmer */}
                  {task.status === 'running' && (
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                      style={{ width: '40%', left: 0 }}
                      className="absolute inset-y-0 rounded-full bg-white/10"
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Week markers */}
        <div className="mt-4 flex justify-between text-[9px] font-mono uppercase tracking-widest text-text-secondary/50 px-px">
          {['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8', 'Wk 9', 'Wk 10'].map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
      </div>

      {/* ── Bottom Grid: Workflow List + Right Panel ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Workflow List */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
          {/* List Header */}
          <div className="mb-5 flex items-center justify-between gap-3 flex-wrap">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <GitBranch size={17} className="text-primary" />
              Active Workflows
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-mono text-text-secondary">
                {filteredWorkflows.length}
              </span>
            </h3>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-36 rounded-xl border border-white/5 bg-background/40 pl-8 pr-3 py-1.5 text-xs text-white placeholder-text-secondary focus:outline-none focus:border-primary/40 focus:bg-background/70 transition-all"
                />
              </div>
              {/* Filter */}
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setShowFilterMenu((p) => !p)}
                  className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-background/40 px-3 py-1.5 text-xs text-text-secondary hover:text-white hover:bg-white/5 transition-all"
                >
                  <Filter size={12} />
                  {activeFilter === 'all' ? 'All' : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
                  <ChevronDown size={11} className={`transition-transform ${showFilterMenu ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showFilterMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-9 z-10 w-36 rounded-xl border border-white/10 bg-surface/90 backdrop-blur-lg p-1 shadow-2xl"
                    >
                      {(['all', ...FILTER_OPTIONS] as const).map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setActiveFilter(opt); setShowFilterMenu(false); }}
                          className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium capitalize transition-all hover:bg-white/5 ${
                            activeFilter === opt ? 'text-primary bg-primary/5' : 'text-text-secondary'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Workflow rows */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredWorkflows.length > 0 ? filteredWorkflows.map((wf, i) => (
                <WorkflowRow
                  key={wf.id}
                  wf={wf}
                  index={i}
                  onSelect={setSelectedId}
                  selected={selectedId === wf.id}
                />
              )) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center text-sm text-text-secondary"
                >
                  <Search size={24} className="mx-auto mb-3 opacity-30" />
                  No workflows match your filter.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-5">

          {/* Selected Workflow Detail */}
          <AnimatePresence mode="wait">
            {selectedWorkflow ? (
              <motion.div
                key={selectedWorkflow.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-white/5 bg-surface/30 p-5 backdrop-blur-md"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`flex h-10 w-10 min-w-[40px] items-center justify-center rounded-xl bg-gradient-to-br ${selectedWorkflow.avatarColor} text-sm font-bold text-white shadow-lg`}>
                    {selectedWorkflow.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{selectedWorkflow.name}</p>
                    <p className="text-[11px] text-text-secondary mt-0.5">by {selectedWorkflow.owner}</p>
                  </div>
                  <Badge status={selectedWorkflow.status} />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: 'Stability', value: `${selectedWorkflow.stability}%`, icon: TrendingUp },
                    { label: 'Success Rate', value: `${selectedWorkflow.successRate}%`, icon: CheckCircle2 },
                    { label: 'Total Runs', value: selectedWorkflow.executions.toLocaleString(), icon: RefreshCw },
                    { label: 'Duration', value: selectedWorkflow.duration, icon: Timer },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
                      <div className="flex items-center gap-1.5 text-text-secondary mb-1">
                        <Icon size={11} />
                        <span className="text-[10px] uppercase tracking-wider font-mono">{label}</span>
                      </div>
                      <p className="text-sm font-bold text-white">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Stability bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-[10px] text-text-secondary mb-1.5">
                    <span className="font-mono uppercase tracking-wider">Stability Index</span>
                    <span className={`font-semibold ${selectedWorkflow.stability >= 90 ? 'text-success' : selectedWorkflow.stability >= 70 ? 'text-warning' : 'text-danger'}`}>
                      {selectedWorkflow.stability}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5">
                    <motion.div
                      key={selectedWorkflow.id}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedWorkflow.stability}%` }}
                      transition={{ duration: 0.7 }}
                      className={`h-full rounded-full ${selectedWorkflow.stability >= 90 ? 'bg-gradient-to-r from-success/60 to-success' : selectedWorkflow.stability >= 70 ? 'bg-gradient-to-r from-warning/60 to-warning' : 'bg-gradient-to-r from-danger/60 to-danger'}`}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowRunModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/20"
                  >
                    <Play size={13} /> Run Now
                  </button>
                  <button
                    onClick={() => setShowLogsDrawer(true)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-xs font-semibold text-text-secondary hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                  >
                    <Eye size={13} /> View Logs
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Execution Pulse mini chart */}
          <div className="rounded-2xl border border-white/5 bg-surface/30 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-white font-heading">Execution Pulse</h4>
                <p className="text-[10px] text-text-secondary mt-0.5 font-mono">Last 14 cycles</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] text-text-secondary font-mono">LIVE</span>
              </div>
            </div>
            <div className="relative h-20 w-full">
              <div className="absolute inset-0 flex items-end justify-between gap-1 px-px">
                {EXECUTION_BARS.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.7, delay: i * 0.04, ease: 'easeOut' }}
                    className={`w-full rounded-t-sm cursor-pointer transition-opacity hover:opacity-80 ${
                      i === EXECUTION_BARS.length - 1
                        ? 'bg-gradient-to-t from-primary/40 via-primary/80 to-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                        : 'bg-gradient-to-t from-primary/10 via-primary/30 to-primary/60'
                    }`}
                    title={`${h} executions`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="w-full border-t border-white/[0.04]" />
                ))}
              </div>
            </div>
            <div className="mt-3 flex justify-between text-[9px] font-mono uppercase tracking-widest text-text-secondary/40">
              <span>-14</span>
              <span>-7</span>
              <span>Now</span>
            </div>
          </div>

          {/* AI Suggestion */}
          <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <Zap size={14} />
              </div>
              <span className="text-[10px] font-semibold text-primary uppercase tracking-widest font-mono">AI Suggestion</span>
            </div>
            <p className="text-xs leading-relaxed text-text-secondary">
              System detected a{' '}
              <span className="text-primary font-semibold">circular dependency risk</span>{' '}
              between <span className="text-white font-medium">"Model Training"</span> and{' '}
              <span className="text-white font-medium">"Integration"</span>. Automations are attempting to decouple modules.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <button className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                Apply Fix <ArrowRight size={13} />
              </button>
              <button className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-white transition-colors">
                Dismiss
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-2xl border border-white/5 bg-surface/30 p-5 backdrop-blur-md">
            <h4 className="text-sm font-bold text-white font-heading mb-4 flex items-center gap-2">
              <Activity size={15} className="text-primary" />
              System Status
            </h4>
            <div className="space-y-3">
              {[
                { label: 'Scheduler', value: 'Operational', color: 'text-success', dot: 'bg-success' },
                { label: 'Task Queue', value: '142 pending', color: 'text-warning', dot: 'bg-warning animate-pulse' },
                { label: 'Worker Nodes', value: '8 / 10 active', color: 'text-primary', dot: 'bg-primary' },
                { label: 'Dependency Solver', value: 'Warning', color: 'text-danger', dot: 'bg-danger animate-pulse' },
              ].map(({ label, value, color, dot }) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                    <span className="text-text-secondary">{label}</span>
                  </div>
                  <span className={`font-semibold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Run Now Modal ── */}
      {showRunModal && selectedWorkflow && (
        <RunNowModal workflow={selectedWorkflow} onClose={() => setShowRunModal(false)} />
      )}

      {/* ── View Logs Drawer ── */}
      {showLogsDrawer && selectedWorkflow && (
        <ViewLogsDrawer workflow={selectedWorkflow} onClose={() => setShowLogsDrawer(false)} />
      )}
    </div>
  );
}
