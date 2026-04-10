import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Zap, 
  RefreshCcw, 
  Settings2, 
  ToggleRight, 
  ToggleLeft,
  Activity,
  Workflow
} from 'lucide-react';
import Badge from '@/components/dashboard/Badge';

const autopilotRules = [
  { 
    id: 'rule-alpha', 
    name: 'Dynamic Resource Scaling', 
    description: 'Auto-allocates GPU resources based on real-time task complexity.',
    status: 'active',
    lastPulse: '2m ago'
  },
  { 
    id: 'rule-beta', 
    name: 'Dependency Conflict Resolver', 
    description: 'Identifies and decouples circular task dependencies in mission timelines.',
    status: 'active',
    lastPulse: '15m ago'
  },
  { 
    id: 'rule-gamma', 
    name: 'Team Velocity Balancer', 
    description: 'Redistributes tasks among members to maintain optimal project velocity.',
    status: 'inactive',
    lastPulse: '1h ago'
  }
];

export default function Automations() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white font-heading underline underline-offset-8 decoration-primary/40">AI Orchestration Center</h2>
        <p className="mt-1 text-sm text-text-secondary">Managing autonomous scheduling and workflow optimization pulses.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Left Column: Rule Management */}
        <div className="xl:col-span-2 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <Workflow size={20} className="text-primary" />
                Active Autopilot Rules
              </h3>
              <button className="text-xs font-bold text-primary hover:text-primary-dark transition-colors uppercase tracking-widest">
                Create Rule +
              </button>
           </div>
           
           {autopilotRules.map((rule, i) => (
             <motion.div
               key={rule.id}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.4, delay: i * 0.1 }}
               className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md transition-all hover:border-primary/20"
             >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                         <h4 className="font-bold text-white text-lg">{rule.name}</h4>
                         <Badge status={rule.status as any} />
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
                        {rule.description}
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-[10px] uppercase font-mono tracking-widest text-text-secondary">
                        <span className="flex items-center gap-1.5"><Activity size={12} /> Last Pulse: {rule.lastPulse}</span>
                        <span className="flex items-center gap-1.5"><RefreshCcw size={12} /> Sync: Nominal</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-text-secondary hover:text-white transition-all">
                        <Settings2 size={18} />
                      </button>
                      <button className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                        rule.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-text-secondary'
                      }`}>
                         {rule.status === 'active' ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                      </button>
                   </div>
                </div>
                {/* Visual side accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/0 group-hover:bg-primary/40 transition-all" />
             </motion.div>
           ))}
        </div>

        {/* Right Column: Engine Stats */}
        <div className="space-y-6">
           <div className="rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
              <h3 className="mb-6 text-lg font-bold text-white font-heading flex items-center gap-2 text-warning">
                <Cpu size={20} />
                Engine Performance
              </h3>
              
              <div className="space-y-6">
                 <div>
                    <div className="mb-2 flex justify-between text-xs uppercase tracking-widest font-bold">
                       <span className="text-text-secondary">Scheduling Latency</span>
                       <span className="text-white">14ms</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                       <div className="h-full w-[14%] bg-primary" />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-background/50 p-4 border border-white/5">
                       <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">Decision Rate</p>
                       <p className="text-xl font-bold text-white">1.4k/s</p>
                    </div>
                    <div className="rounded-xl bg-background/50 p-4 border border-white/5">
                       <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">AI Logic Load</p>
                       <p className="text-xl font-bold text-success">Low</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="rounded-2xl border border-white/5 bg-primary/5 p-6 backdrop-blur-md">
              <h3 className="mb-4 text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Zap size={16} className="text-primary" />
                Active Simulation
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                The AI engine is currently simulating <span className="text-white font-bold">42 alternative project paths</span> to find optimal task redistributions for upcoming deadlines.
              </p>
              <div className="mt-4 flex items-center gap-3">
                 <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-6 w-6 rounded-full border border-background bg-surface flex items-center justify-center">
                         <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                      </div>
                    ))}
                 </div>
                 <span className="text-[10px] font-mono text-primary animate-pulse uppercase">Engine Pulsing...</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
