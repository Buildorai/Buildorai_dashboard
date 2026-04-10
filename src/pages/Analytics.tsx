import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Zap, 
  Cpu, 
  Target,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const performanceMetrics = [
  { label: 'System Completion Rate', value: '84.2%', subValue: '+5.4% from last epoch', icon: Target, trend: 'up', color: 'primary' },
  { label: 'Timeline Efficiency', value: '92.8%', subValue: '+2.1% optimized', icon: Clock, trend: 'up', color: 'success' },
  { label: 'AI Model Confusion', value: '0.04', subValue: '-12.5% decrease', icon: Zap, trend: 'down', color: 'info' },
  { label: 'Compute Utilization', value: '78.5%', subValue: 'Nominal load', icon: Cpu, trend: 'neutral', color: 'warning' }
];

export default function Analytics() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white font-heading underline underline-offset-8 decoration-primary/40">Performance Telemetry</h2>
        <p className="mt-1 text-sm text-text-secondary">AI-driven insights into project orchestration efficiency.</p>
      </div>

      {/* Metrics Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => (
          <StatCard key={metric.label} {...(metric as any)} delay={index * 0.1} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Chart Card */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-heading text-primary">Task Execution Pulse</h3>
              <p className="text-xs text-text-secondary">Real-time task completion distribution across active nodes.</p>
            </div>
            <select className="rounded-lg border border-white/5 bg-background/50 px-3 py-1.5 text-xs text-white focus:outline-none">
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
            </select>
          </div>

          {/* Simulated Chart Area */}
          <div className="relative h-64 w-full">
            <div className="absolute inset-0 flex items-end justify-between gap-2 px-2">
              {[45, 60, 40, 75, 50, 85, 90, 65, 55, 70, 80, 45, 60, 40].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className="w-full rounded-t-md bg-gradient-to-t from-primary/20 via-primary/40 to-primary/80"
                />
              ))}
            </div>
            {/* Grid lines */}
            <div className="absolute inset-0 border-b border-white/5 flex flex-col justify-between">
               <div className="w-full border-t border-white/5" />
               <div className="w-full border-t border-white/5" />
               <div className="w-full border-t border-white/5" />
            </div>
          </div>
          
          <div className="mt-4 flex justify-between text-[10px] text-text-secondary font-mono tracking-widest uppercase">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:59</span>
          </div>
        </div>

        {/* Predictive Card */}
        <div className="rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md">
           <div className="mb-6">
              <h3 className="text-lg font-bold text-white font-heading text-success">AI Forecast</h3>
              <p className="text-xs text-text-secondary">Predictive completion analysis based on current velocity.</p>
           </div>

           <div className="space-y-6">
              <div>
                 <div className="mb-2 flex justify-between text-xs">
                    <span className="text-text-secondary">Alpha Timeline Confidence</span>
                    <span className="text-success font-medium">High (96%)</span>
                 </div>
                 <div className="h-1.5 w-full rounded-full bg-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '96%' }}
                      className="h-full rounded-full bg-success"
                    />
                 </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-background/50 p-4">
                 <p className="text-[11px] leading-relaxed text-text-secondary">
                   <span className="text-white font-bold">PROJECTION:</span> Core engine nodes are expected to complete 
                   <span className="text-primary font-medium"> 4.2 days ahead </span> 
                   of the original baseline due to automated resource redistribution.
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col rounded-xl border border-white/5 bg-background/30 p-3">
                    <span className="text-[10px] uppercase text-text-secondary">Optimized Gap</span>
                    <span className="text-lg font-bold text-white">+12.4 hrs</span>
                 </div>
                 <div className="flex flex-col rounded-xl border border-white/5 bg-background/30 p-3">
                    <span className="text-[10px] uppercase text-text-secondary">Risk Factor</span>
                    <span className="text-lg font-bold text-success">Low</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
