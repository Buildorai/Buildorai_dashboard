import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Zap, 
  RefreshCcw, 
  Activity,
  Workflow
} from 'lucide-react';
import Badge from '@/components/dashboard/Badge';

const INITIAL_RULES = [
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

// --- Quantum Pulse Toggle Component ---

function QuantumToggle({ active, onClick }: { active: boolean, onClick: () => void }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="group relative flex h-9 w-16 items-center outline-none"
    >
      {/* Segmented Track */}
      <div className={`absolute inset-0 rounded-xl border transition-all duration-700 overflow-hidden ${
        active 
          ? 'border-primary/40 bg-primary/10 shadow-[inner_0_0_10px_rgba(59,130,246,0.2)]' 
          : 'border-white/5 bg-white/[0.02]'
      }`}>
        {/* Holographic Indices */}
        <div className="absolute inset-0 flex justify-around items-center px-1.5 opacity-20">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-1.5 w-[1px] ${active ? 'bg-primary' : 'bg-white/40'}`} />
          ))}
        </div>

        {/* Dynamic Glow Flow (Active Only) */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Track Glint */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Energy core / Knob */}
      <motion.div
        animate={{ 
          x: active ? 32 : 4,
          scale: isClicked ? 0.85 : 1
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          mass: 1.2
        }}
        className="relative z-10 flex h-7 w-7 items-center justify-center"
      >
        {/* Outer Aura (Active) */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-full bg-primary/30 blur-md"
            />
          )}
        </AnimatePresence>

        {/* The Core */}
        <div className={`h-full w-full rounded-full border transition-all duration-500 flex items-center justify-center p-[1px] ${
          active 
            ? 'border-white bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]' 
            : 'border-white/10 bg-white/5 backdrop-blur-md'
        }`}>
          {/* Inner Energy Point */}
          <div className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
            active ? 'bg-primary animate-pulse' : 'bg-white/20'
          }`} />
        </div>
      </motion.div>

      {/* Click Shockwave */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 rounded-xl bg-primary/20 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Automations() {
  const [rules, setRules] = useState(INITIAL_RULES);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === id 
        ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
        : rule
    ));
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white font-heading ">AI Orchestration Center</h2>
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
              <button className="text-[10px] font-bold text-primary hover:text-primary-dark transition-all uppercase tracking-[0.2em] border border-primary/20 bg-primary/5 px-4 py-2 rounded-lg hover:border-primary/50 shadow-lg shadow-primary/5 hover:shadow-primary/10 active:scale-95">
                Initialize Rule +
              </button>
           </div>
           
           <div className="space-y-4">
             {rules.map((rule, i) => (
               <motion.div
                 key={rule.id}
                 layout
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 className={`group relative overflow-hidden rounded-[2.5rem] border transition-all duration-700 p-8 backdrop-blur-xl ${
                   rule.status === 'active' 
                    ? 'border-primary/30 bg-primary/[0.05] shadow-[0_0_40px_rgba(59,130,246,0.05)]' 
                    : 'border-white/[0.03] bg-surface/20'
                 }`}
               >
                  {/* Holographic background grid (Active Only) */}
                  <AnimatePresence>
                    {rule.status === 'active' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.05 }}
                        className="absolute inset-0"
                        style={{ 
                          backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
                          backgroundSize: '24px 24px'
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                     <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                           <h4 className={`font-bold text-xl tracking-tight transition-colors duration-700 ${
                             rule.status === 'active' ? 'text-white' : 'text-white/40'
                           }`}>
                             {rule.name}
                           </h4>
                           <Badge status={rule.status as any} />
                        </div>
                        <p className={`text-sm leading-relaxed max-w-xl transition-colors duration-700 ${
                          rule.status === 'active' ? 'text-text-secondary' : 'text-text-secondary/40'
                        }`}>
                          {rule.description}
                        </p>
                        <div className="mt-6 flex items-center gap-6 text-[9px] uppercase font-mono tracking-[0.15em] text-text-secondary/60">
                          <span className="flex items-center gap-2">
                             <div className={`h-1 w-1 rounded-full ${rule.status === 'active' ? 'bg-primary animate-ping' : 'bg-white/20'}`} />
                             Last Pulse: {rule.lastPulse}
                          </span>
                          <span className="flex items-center gap-2"><RefreshCcw size={10} /> Logic: Nominal</span>
                        </div>
                     </div>
                     <div className="flex items-center">
                        <QuantumToggle 
                          active={rule.status === 'active'} 
                          onClick={() => toggleRule(rule.id)} 
                        />
                     </div>
                  </div>

                  {/* Active background aura */}
                  {rule.status === 'active' && (
                    <>
                      <div className="absolute -right-32 -top-32 h-64 w-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
                      <div className="absolute -left-32 -bottom-32 h-64 w-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
                    </>
                  )}
               </motion.div>
             ))}
           </div>
        </div>

        {/* Right Column: Engine Stats */}
        <div className="space-y-6">
           <div className="rounded-3xl border border-white/5 bg-surface/30 p-8 backdrop-blur-md relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-warning/5 blur-3xl rounded-full" />
              
              <h3 className="mb-8 text-lg font-bold text-white font-heading flex items-center gap-3 text-warning">
                <Cpu size={22} />
                Energy Performance
              </h3>
              
              <div className="space-y-8">
                 <div className="relative">
                    <div className="mb-3 flex justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary">
                       <span>Neural Latency</span>
                       <span className="text-white">14ms</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden p-[1px] border border-white/[0.03]">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '14%' }}
                        className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                       />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="group relative rounded-2xl bg-background/40 p-5 border border-white/5 hover:border-white/10 transition-all">
                       <p className="text-[9px] uppercase tracking-[0.2em] text-text-secondary mb-2">Decision Rate</p>
                       <p className="text-2xl font-bold text-white tracking-tight">1.4k<span className="text-xs text-text-secondary ml-1 font-mono">/s</span></p>
                       <div className="absolute bottom-2 right-4 h-1 w-1 rounded-full bg-primary" />
                    </div>
                    <div className="group relative rounded-2xl bg-background/40 p-5 border border-white/5 hover:border-white/10 transition-all">
                       <p className="text-[9px] uppercase tracking-[0.2em] text-text-secondary mb-2">AI Logic Load</p>
                       <p className="text-2xl font-bold text-success tracking-tight">LOW</p>
                       <div className="absolute bottom-2 right-4 h-1 w-1 rounded-full bg-success opacity-40" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 backdrop-blur-md relative group overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-[100px] pointer-events-none" />
              
              <h3 className="mb-6 text-[10px] font-bold text-white uppercase tracking-[0.3em] flex items-center gap-3 relative z-10">
                <Zap size={18} className="text-primary fill-primary" />
                Active Simulation
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-6 font-medium relative z-10">
                The AI engine is currently simulating <span className="text-white font-bold underline decoration-primary/30 underline-offset-4">42 alternative project paths</span> to find optimal task redistributions.
              </p>
              
              <div className="flex items-center gap-4 relative z-10">
                 <div className="flex -space-x-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-8 w-8 rounded-full border border-background/50 bg-[#0c0e14] backdrop-blur-md flex items-center justify-center shadow-lg">
                         <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.25}s`, opacity: 0.5 + (i * 0.1) }} />
                      </div>
                    ))}
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase animate-pulse">Telemetry Pulse</span>
                   <span className="text-[8px] font-mono text-text-secondary uppercase">Synchronizing...</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
