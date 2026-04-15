import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Terminal as TerminalIcon, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  Zap,
  Globe
} from 'lucide-react';
import Badge from '@/components/dashboard/Badge';

const logs = [
  { id: 1, type: 'info', message: 'Allocating A100-80GB to Node Buildorai-Core', time: '12:04:22' },
  { id: 2, type: 'success', message: 'Sync complete: Global Node Cluster 7', time: '12:04:15' },
  { id: 3, type: 'alert', message: 'Anomaly detected in Timeline Optimizer #4', time: '12:03:55' },
  { id: 4, type: 'info', message: 'NVIDIA Isaac SDK initializing coordination pulse', time: '12:03:10' },
  { id: 5, type: 'success', message: 'Security integrity check: 100% Nominal', time: '12:02:45' },
];

export default function DataCore() {
  const [currentLogs, setCurrentLogs] = useState(logs);

  // Simulated live log feed
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        type: Math.random() > 0.8 ? 'alert' : (Math.random() > 0.5 ? 'success' : 'info'),
        message: [
          'Optimizing resource allocation for Node-B',
          'Syncing telemetry with NVIDIA Cloud',
          'Automated task dependency redistribution triggered',
          'Identity verification packet received',
          'Global data core heartbeat pulse: Nominal'
        ][Math.floor(Math.random() * 5)],
        time: new Date().toLocaleTimeString([], { hour12: false })
      };
      setCurrentLogs(prev => [newLog, ...prev.slice(0, 9)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading ">Data Core Telemetry</h2>
          <p className="mt-1 text-sm text-text-secondary">Low-latency system-level orchestration monitoring.</p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2">
           <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
           <span className="text-xs font-bold text-primary tracking-widest uppercase">NVIDIA Isaac SDK Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Resource Allocation Panel */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
            <h3 className="mb-6 text-lg font-bold text-white font-heading flex items-center gap-2">
              <Cpu size={20} className="text-primary" />
              Compute Cluster Load
            </h3>
            
            <div className="space-y-5">
              {[
                { label: 'GPU (A100 Tensor Core)', value: 72, color: 'bg-primary' },
                { label: 'Memory (High Bandwidth)', value: 45, color: 'bg-success' },
                { label: 'Storage (NVMe Array)', value: 88, color: 'bg-warning' },
                { label: 'Network Throughput', value: 34, color: 'bg-info' }
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-[11px] font-medium uppercase tracking-wider text-text-secondary">
                    <span>{item.label}</span>
                    <span className="text-white">{item.value}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
            <h3 className="mb-4 text-lg font-bold text-white font-heading flex items-center gap-2">
              <ShieldCheck size={20} className="text-success" />
              Security Protocol
            </h3>
            <div className="flex items-center justify-between rounded-xl bg-background/50 p-4 border border-white/5">
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-tighter">Encrypted Integrity</p>
                <p className="text-[10px] text-text-secondary">AES-256 Quantum Resistant</p>
              </div>
              <Badge status="nominal" />
            </div>
          </div>
        </div>

        {/* Live Command Stream */}
        <div className="xl:col-span-2 rounded-2xl border border-white/5 bg-surface/30 p-0 backdrop-blur-md flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-primary">
                <TerminalIcon size={18} />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Command Stream</h3>
            </div>
            <div className="flex gap-2">
               <div className="h-2 w-2 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
               <span className="text-[10px] font-mono text-success uppercase">Live Feed</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-black/20">
            <div className="space-y-2 font-mono text-[11px]">
              <AnimatePresence initial={false}>
                {currentLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-4 border-b border-white/[0.02] py-2 last:border-0"
                  >
                    <span className="text-text-secondary whitespace-nowrap">[{log.time}]</span>
                    <span className={`uppercase font-bold whitespace-nowrap ${
                      log.type === 'alert' ? 'text-danger' : (log.type === 'success' ? 'text-success' : 'text-primary')
                    }`}>
                      {log.type} //
                    </span>
                    <span className="text-white/80">{log.message}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="border-t border-white/5 bg-background/50 px-6 py-4 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                   <Globe size={14} className="text-text-secondary" />
                   <span className="text-[10px] text-text-secondary uppercase">Global Sync: 12ms</span>
                </div>
                <div className="flex items-center gap-2">
                   <Zap size={14} className="text-text-secondary" />
                   <span className="text-[10px] text-text-secondary uppercase">Throughput: 1.4 TB/s</span>
                </div>
              </div>
              <span className="text-[10px] text-text-secondary font-mono tracking-widest uppercase">Cluster Mode: Multi-Region</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
