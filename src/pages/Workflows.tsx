import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Clock, 
  Layers, 
  AlertCircle,
  Play,
  Share2
} from 'lucide-react';
import Badge from '@/components/dashboard/Badge';

const workflows = [
  { id: 'wf-1', name: 'Core Engine Sync', status: 'active', stability: 99.4, tasks: 24 },
  { id: 'wf-2', name: 'Model Training Pulse', status: 'pending', stability: 82.1, tasks: 12 },
  { id: 'wf-3', name: 'Infrastructure Scale', status: 'syncing', stability: 95.8, tasks: 8 }
];

export default function Workflows() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading underline underline-offset-8 decoration-primary/40">Workflow Orchestrator</h2>
          <p className="mt-1 text-sm text-text-secondary">Mapping task dependencies and automated execution paths.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 rounded-xl border border-white/5 bg-surface/30 px-4 py-2 text-xs font-semibold text-white hover:bg-white/5 transition-all">
             <Share2 size={14} />
             Export Map
           </button>
           <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
             <Play size={14} />
             Run Simulation
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Workflow Timeline (Gantt-style) */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-heading">Mission Timeline</h3>
            <div className="flex items-center gap-4 text-[10px] text-text-secondary uppercase font-mono">
               <div className="flex items-center gap-1.5 flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Done</div>
               <div className="flex items-center gap-1.5 text-text-secondary"><div className="h-1.5 w-1.5 rounded-full bg-white/20" /> Planned</div>
            </div>
          </div>

          <div className="space-y-8">
            {[
              { name: 'Initial Research', progress: 100, start: 0, width: 20 },
              { name: 'Architecture Design', progress: 100, start: 15, width: 25 },
              { name: 'AI Model Training', progress: 45, start: 35, width: 40 },
              { name: 'System Integration', progress: 0, start: 65, width: 30 }
            ].map((task, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="mb-2 flex justify-between text-xs font-medium">
                   <span className="text-white group-hover:text-primary transition-colors">{task.name}</span>
                   <span className="text-text-secondary">Week {Math.floor(task.start/10) + 1} - {Math.floor((task.start + task.width)/10) + 1}</span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-white/5">
                   <motion.div
                     initial={{ width: 0, left: `${task.start}%` }}
                     animate={{ width: `${task.width}%`, left: `${task.start}%` }}
                     transition={{ duration: 1, delay: i * 0.1 }}
                     className="absolute h-full rounded-full bg-primary/20 border border-primary/30"
                   >
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${task.progress}%` }}
                       className="h-full rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                     />
                   </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dependency Insights */}
        <div className="space-y-6">
           <div className="rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
              <h3 className="mb-4 text-lg font-bold text-white font-heading flex items-center gap-2">
                <GitBranch size={20} className="text-primary" />
                Active Workflows
              </h3>
              <div className="space-y-4">
                {workflows.map((wf) => (
                  <div key={wf.id} className="rounded-xl border border-white/5 bg-background/50 p-4 transition-all hover:bg-background/80">
                    <div className="mb-2 flex justify-between">
                       <p className="text-sm font-bold text-white">{wf.name}</p>
                       <span className="text-[10px] text-text-secondary font-mono">{wf.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <Badge status={wf.status as any} />
                       <div className="flex items-center gap-2">
                          <Layers size={14} className="text-text-secondary" />
                          <span className="text-xs text-text-secondary">{wf.tasks} Tasks</span>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6 backdrop-blur-md border border-dashed">
              <div className="flex items-start gap-4">
                 <div className="flex h-10 w-10 min-w-[40px] items-center justify-center rounded-xl bg-primary/20 text-primary">
                    <AlertCircle size={20} />
                 </div>
                 <div>
                    <h4 className="font-bold text-white">AI Suggestion</h4>
                    <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                      System detected a <span className="text-primary font-bold">circular dependency risk</span> between "Model Training" and "Integration". Automations are attempting to decouple.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
