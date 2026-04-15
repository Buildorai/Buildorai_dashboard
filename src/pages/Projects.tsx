import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Users,
  Calendar,
  Activity,
  MoreVertical,
  Layers,
  X,
} from 'lucide-react';
import Badge from '@/components/dashboard/Badge';
import CommandDrawer from '@/components/dashboard/CommandDrawer';

// ── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: string;
  name: string;
  status: 'active' | 'syncing' | 'halted';
  efficiency: number;
  completion: number;
  members: number;
  deadline: string;
  category: string;
}

// ── Initial dummy data ────────────────────────────────────────────────────────
const INITIAL_PROJECTS: Project[] = [
  {
    id: 'node-001',
    name: 'Buildorai Core Engine',
    status: 'active',
    efficiency: 98.2,
    completion: 65,
    members: 12,
    deadline: 'Oct 24, 2026',
    category: 'Backend Architecture',
  },
  {
    id: 'node-002',
    name: 'Workflow Optimizer',
    status: 'syncing',
    efficiency: 94.5,
    completion: 40,
    members: 8,
    deadline: 'Nov 12, 2026',
    category: 'AI Model Training',
  },
  {
    id: 'node-003',
    name: 'Edge Nodes Deployment',
    status: 'halted',
    efficiency: 0,
    completion: 15,
    members: 4,
    deadline: 'Dec 05, 2026',
    category: 'Infrastructure',
  },
  {
    id: 'node-004',
    name: 'Telemetry Dashboard',
    status: 'active',
    efficiency: 99.1,
    completion: 85,
    members: 6,
    deadline: 'Oct 15, 2026',
    category: 'Front-end',
  },
];

const STATUS_OPTIONS = ['All Status', 'active', 'syncing', 'halted'] as const;
const CATEGORY_OPTIONS = [
  'All Categories',
  'Backend Architecture',
  'AI Model Training',
  'Infrastructure',
  'Front-end',
];

const COMPUTE_OPTIONS = [
  'A100 High Throughput',
  'H100 Performance Optimized',
  'L40S Efficiency Core',
];

// ── Helper: next node id ──────────────────────────────────────────────────────
function nextId(projects: Project[]) {
  const nums = projects.map((p) => parseInt(p.id.replace('node-', ''), 10));
  return `node-${String(Math.max(...nums) + 1).padStart(3, '0')}`;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All Status');
  const [categoryFilter, setCategoryFilter] = useState<string>('All Categories');
  const [statusOpen, setStatusOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  // ── Form state ──────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    name: '',
    compute: COMPUTE_OPTIONS[0],
    deadline: '',
    category: CATEGORY_OPTIONS[1],
  });
  const [formError, setFormError] = useState('');

  // ── Filtered list ───────────────────────────────────────────────────────────
  const filtered = projects.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      q === '' ||
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    const matchStatus =
      statusFilter === 'All Status' || p.status === statusFilter;
    const matchCategory =
      categoryFilter === 'All Categories' || p.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
  });

  // ── Deploy handler ───────────────────────────────────────────────────────────
  const handleDeploy = () => {
    if (!form.name.trim()) {
      setFormError('Node Architecture Name is required.');
      return;
    }
    if (!form.deadline) {
      setFormError('Mission Timeline is required.');
      return;
    }
    setFormError('');

    const newProject: Project = {
      id: nextId(projects),
      name: form.name.trim(),
      status: 'syncing',
      efficiency: 0,
      completion: 0,
      members: 1,
      deadline: new Date(form.deadline).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      category: form.category,
    };

    setProjects((prev) => [newProject, ...prev]);
    setIsDrawerOpen(false);
    // Reset form
    setForm({ name: '', compute: COMPUTE_OPTIONS[0], deadline: '', category: CATEGORY_OPTIONS[1] });
  };

  return (
    <div className="p-4 md:p-8" onClick={() => { setStatusOpen(false); setCategoryOpen(false); }}>
      {/* ── Header ── */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading ">
            Project Nodes
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Orchestrating active mission parameters.
          </p>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setIsDrawerOpen(true); }}
          className="group flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        >
          <Plus size={18} className="transition-transform group-hover:rotate-90" />
          Initialize New Node
        </button>
      </div>

      {/* ── Control Bar ── */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input
            type="text"
            placeholder="Filter project nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-surface/30 px-10 py-2.5 text-sm text-white placeholder:text-text-secondary focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-row gap-3 w-full md:w-auto">
          {/* Status filter */}
          <div className="relative flex-1 md:flex-none" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => { setStatusOpen((v) => !v); setCategoryOpen(false); }}
              className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
                statusFilter !== 'All Status'
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-white/5 bg-surface/30 text-text-secondary hover:text-white'
              }`}
            >
              <Filter size={14} className="shrink-0" />
              <span className="truncate">{statusFilter}</span>
            </button>
            <AnimatePresence>
              {statusOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-white/10 bg-surface/95 backdrop-blur-xl shadow-xl overflow-hidden py-1"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setStatusFilter(opt); setStatusOpen(false); }}
                      className={`flex w-full items-center px-4 py-2 text-xs transition-all ${
                        statusFilter === opt
                          ? 'text-primary bg-primary/10'
                          : 'text-text-secondary hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Category filter */}
          <div className="relative flex-1 md:flex-none" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => { setCategoryOpen((v) => !v); setStatusOpen(false); }}
              className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
                categoryFilter !== 'All Categories'
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-white/5 bg-surface/30 text-text-secondary hover:text-white'
              }`}
            >
              <Layers size={14} className="shrink-0" />
              <span className="truncate">{categoryFilter === 'All Categories' ? 'Categories' : categoryFilter}</span>
            </button>
            <AnimatePresence>
              {categoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-white/10 bg-surface/95 backdrop-blur-xl shadow-xl overflow-hidden py-1"
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setCategoryFilter(opt); setCategoryOpen(false); }}
                      className={`flex w-full items-center px-4 py-2 text-xs transition-all ${
                        categoryFilter === opt
                          ? 'text-primary bg-primary/10'
                          : 'text-text-secondary hover:text-white hover:bg-white/5'
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

      {/* ── Results count ── */}
      {(searchQuery || statusFilter !== 'All Status' || categoryFilter !== 'All Categories') && (
        <p className="mb-4 text-xs text-text-secondary">
          Showing <span className="text-white font-medium">{filtered.length}</span> of {projects.length} nodes
        </p>
      )}

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
            <Search size={22} className="text-text-secondary" />
          </div>
          <p className="text-sm text-text-secondary">No nodes match your filters.</p>
          <button
            onClick={() => { setSearchQuery(''); setStatusFilter('All Status'); setCategoryFilter('All Categories'); }}
            className="text-xs text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
          <AnimatePresence>
            {filtered.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="group relative flex flex-col rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md hover:border-white/10 transition-all"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <Activity size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white font-heading group-hover:text-primary transition-colors">
                        {node.name}
                      </h4>
                      <p className="text-[10px] text-text-secondary font-mono tracking-tighter uppercase">
                        {node.id} // {node.category}
                      </p>
                    </div>
                  </div>
                  <button className="text-text-secondary hover:text-white">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-text-secondary">Node Efficiency</span>
                    <span className={node.efficiency > 90 ? 'text-success' : node.efficiency > 0 ? 'text-warning' : 'text-danger'}>
                      {node.efficiency}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${node.efficiency}%` }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.08 }}
                      className={`h-full rounded-full ${node.efficiency > 90 ? 'bg-success' : node.efficiency > 0 ? 'bg-warning' : 'bg-danger'}`}
                    />
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                  <Badge status={node.status as any} />
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-text-secondary">
                      <Users size={14} />
                      <span className="text-[11px] font-medium">{node.members}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-secondary">
                      <Calendar size={14} />
                      <span className="text-[11px] font-medium italic">{node.deadline}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── Initialize New Node Drawer ── */}
      <CommandDrawer
        isOpen={isDrawerOpen}
        onClose={() => { setIsDrawerOpen(false); setFormError(''); }}
        title="Initialize Node"
        subtitle="Provision a new project node into the Buildorai ecosystem."
      >
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleDeploy(); }}>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                Node Architecture Name
              </label>
              <input
                type="text"
                placeholder="e.g. Project Antigravity"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:border-primary focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                Project Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-white focus:border-primary focus:outline-none appearance-none"
              >
                {CATEGORY_OPTIONS.slice(1).map((c) => (
                  <option key={c} value={c} className="bg-surface text-white">{c}</option>
                ))}
              </select>
            </div>

            {/* Compute */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                Compute Allocation (NVIDIA Cluster)
              </label>
              <select
                value={form.compute}
                onChange={(e) => setForm((f) => ({ ...f, compute: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-white focus:border-primary focus:outline-none appearance-none"
              >
                {COMPUTE_OPTIONS.map((c) => (
                  <option key={c} value={c} className="bg-surface text-white">{c}</option>
                ))}
              </select>
            </div>

            {/* Deadline */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                Mission Timeline
              </label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Error */}
          {formError && (
            <p className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-2.5 text-xs text-danger">
              {formError}
            </p>
          )}

          {/* Notice */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-[11px] leading-relaxed text-text-secondary">
              <strong className="text-primary">System Notice:</strong> Initializing a new node will trigger
              the AI orchestration engine to allocate resources and define task dependencies based on the
              specified architecture.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3.5 font-bold text-white transition-all hover:bg-primary-dark shadow-lg shadow-primary/20"
          >
            Deploy Node to Cluster
          </button>
        </form>
      </CommandDrawer>
    </div>
  );
}
