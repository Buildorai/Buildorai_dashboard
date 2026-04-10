import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Users, 
  Calendar, 
  Activity, 
  Settings,
  MoreVertical,
  Layers
} from 'lucide-react';
import Badge from '@/components/dashboard/Badge';
import CommandDrawer from '@/components/dashboard/CommandDrawer';

const projects = [
  {
    id: 'node-001',
    name: 'Buildorai Core Engine',
    status: 'active',
    efficiency: 98.2,
    completion: 65,
    members: 12,
    deadline: 'Oct 24, 2026',
    category: 'Backend Architecture'
  },
  {
    id: 'node-002',
    name: 'Workflow Optimizer',
    status: 'syncing',
    efficiency: 94.5,
    completion: 40,
    members: 8,
    deadline: 'Nov 12, 2026',
    category: 'AI Model Training'
  },
  {
    id: 'node-003',
    name: 'Edge Nodes Deployment',
    status: 'halted',
    efficiency: 0,
    completion: 15,
    members: 4,
    deadline: 'Dec 05, 2026',
    category: 'Infrastucture'
  },
  {
    id: 'node-004',
    name: 'Telemetry Dashboard',
    status: 'active',
    efficiency: 99.1,
    completion: 85,
    members: 6,
    deadline: 'Oct 15, 2026',
    category: 'Front-end'
  }
];

export default function Projects() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading underline underline-offset-8 decoration-primary/40">Project Nodes</h2>
          <p className="mt-1 text-sm text-text-secondary">Orchestrating active mission parameters.</p>
        </div>
        
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="group flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        >
          <Plus size={18} className="transition-transform group-hover:rotate-90" />
          Initialize New Node
        </button>
      </div>

      {/* Control Bar */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input
            type="text"
            placeholder="Filter project nodes by ID or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-surface/30 px-10 py-2.5 text-sm text-white placeholder:text-text-secondary focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
        <div className="flex items-center gap-2">
           <button className="flex items-center gap-2 rounded-xl border border-white/5 bg-surface/30 px-4 py-2.5 text-xs font-medium text-text-secondary hover:text-white transition-all">
             <Filter size={14} />
             All Status
           </button>
           <button className="flex items-center gap-2 rounded-xl border border-white/5 bg-surface/30 px-4 py-2.5 text-xs font-medium text-text-secondary hover:text-white transition-all">
             <Layers size={14} />
             Categories
           </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {projects.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative flex flex-col rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md hover:border-white/10 transition-all"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                   <Activity size={20} />
                </div>
                <div>
                   <h4 className="font-bold text-white font-heading group-hover:text-primary transition-colors">{node.name}</h4>
                   <p className="text-[10px] text-text-secondary font-mono tracking-tighter uppercase">{node.id} // {node.category}</p>
                </div>
              </div>
              <button className="text-text-secondary hover:text-white">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex justify-between text-xs">
                 <span className="text-text-secondary">Node Efficiency</span>
                 <span className={node.efficiency > 90 ? "text-success" : "text-warning"}>{node.efficiency}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${node.efficiency}%` }}
                   transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                   className={`h-full rounded-full ${node.efficiency > 90 ? "bg-success" : "bg-warning"}`}
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
      </div>

      {/* Initialize New Node Drawer */}
      <CommandDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Initialize Node"
        subtitle="Provision a new project node into the Buildorai ecosystem."
      >
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">Node Architecture Name</label>
              <input 
                type="text" 
                placeholder="e.g. Project Antigravity"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">Compute Allocation (NVIDIA Cluster)</label>
              <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none">
                <option>A100 High Throughput</option>
                <option>H100 Performance Optimized</option>
                <option>L40S Efficiency Core</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">Mission Timeline</label>
              <input 
                type="date" 
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-[11px] leading-relaxed text-text-secondary">
              <strong className="text-primary">System Notice:</strong> Initializing a new node will trigger the AI orchestration engine to allocate 
              resources and define task dependencies based on the specified architecture.
            </p>
          </div>

          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="w-full rounded-xl bg-primary py-3.5 font-bold text-white transition-all hover:bg-primary-dark shadow-lg shadow-primary/20"
          >
            Deploy Node to Cluster
          </button>
        </form>
      </CommandDrawer>
    </div>
  );
}
