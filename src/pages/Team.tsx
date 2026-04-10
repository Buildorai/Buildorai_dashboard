import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  MessageSquare, 
  CheckCircle2, 
  Zap, 
  Star,
  Activity,
  Award
} from 'lucide-react';
import Badge from '@/components/dashboard/Badge';

const members = [
  { 
    name: 'Alex Rivera', 
    role: 'System Admin', 
    status: 'active', 
    efficiency: 98, 
    tasks: 4, 
    avatar: 'AR' 
  },
  { 
    name: 'Sarah Chen', 
    role: 'AI Engineer', 
    status: 'syncing', 
    efficiency: 94, 
    tasks: 7, 
    avatar: 'SC' 
  },
  { 
    name: 'Marcus Thorne', 
    role: 'DevOps Ops', 
    status: 'active', 
    efficiency: 91, 
    tasks: 3, 
    avatar: 'MT' 
  },
  { 
    name: 'Elena Vance', 
    role: 'Product Lead', 
    status: 'pending', 
    efficiency: 88, 
    tasks: 5, 
    avatar: 'EV' 
  }
];

const teamStats = [
  { label: 'Network Velocity', value: '4.8x', icon: Zap, color: 'text-primary' },
  { label: 'Mission Success', value: '92%', icon: CheckCircle2, color: 'text-success' },
  { label: 'Active Collaborators', value: '24', icon: Users, color: 'text-info' },
  { label: 'High Achievers', value: '6', icon: Award, color: 'text-warning' }
];

export default function Team() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading underline underline-offset-8 decoration-primary/40">Team Hub Hub</h2>
          <p className="mt-1 text-sm text-text-secondary">Personnel telemetry and collaborative performance monitoring.</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-white transition-all hover:bg-primary-dark shadow-lg shadow-primary/20">
          <UserPlus size={18} />
          Provision Member
        </button>
      </div>

      {/* Team Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {teamStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="rounded-2xl border border-white/5 bg-surface/30 p-5 backdrop-blur-md"
          >
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-background/50 border border-white/5 ${stat.color}`}>
               <stat.icon size={20} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">{stat.label}</p>
            <h3 className="mt-1 text-2xl font-bold text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Members List */}
        <div className="lg:col-span-2 space-y-4">
           <h3 className="text-lg font-bold text-white font-heading mb-4 px-2 flex items-center gap-2">
             <Activity size={20} className="text-primary" />
             Active Personnel Telemetry
           </h3>
           {members.map((member, i) => (
             <motion.div
               key={member.name}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.4, delay: i * 0.1 }}
               className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-surface/30 p-4 backdrop-blur-md hover:border-white/10 transition-all"
             >
                <div className="flex items-center gap-4">
                   <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-bold border border-primary/20">
                      {member.avatar}
                   </div>
                   <div>
                      <h4 className="font-bold text-white group-hover:text-primary transition-colors">{member.name}</h4>
                      <p className="text-[11px] text-text-secondary font-medium">{member.role}</p>
                   </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                   <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-text-secondary mb-1">Efficiency</span>
                      <div className="flex items-center gap-2">
                         <span className="text-sm font-bold text-white">{member.efficiency}%</span>
                         <div className="h-1 w-12 rounded-full bg-white/5 overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${member.efficiency}%` }} />
                         </div>
                      </div>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-text-secondary mb-1">Active Tasks</span>
                      <span className="text-sm font-bold text-white flex items-center gap-1.5 ">
                        {member.tasks} <span className="text-[10px] text-text-secondary font-normal">nodes</span>
                      </span>
                   </div>
                   <Badge status={member.status as any} />
                   <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-text-secondary hover:text-white transition-all">
                      <MessageSquare size={16} />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Team Highlights Card */}
        <div className="rounded-2xl border border-white/5 bg-surface/30 p-6 backdrop-blur-md h-fit">
           <h3 className="mb-4 text-lg font-bold text-white font-heading text-warning flex items-center gap-2">
             <Star size={20} />
             Top Performers
           </h3>
           <div className="space-y-6">
              {[
                { name: 'Sarah Chen', score: '99.2', achievement: 'Resource Optimization' },
                { name: 'Marcus Thorne', score: '98.5', achievement: 'Infrastructure Scaling' }
              ].map((perf, i) => (
                <div key={i} className="relative pl-4 border-l-2 border-primary/30">
                   <h4 className="text-sm font-bold text-white">{perf.name}</h4>
                   <p className="text-[11px] text-text-secondary mt-1">{perf.achievement}</p>
                   <div className="mt-2 text-[10px] font-bold text-primary italic">Score Index: {perf.score}</div>
                </div>
              ))}
              
              <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-4">
                 <p className="text-[11px] leading-relaxed text-text-secondary">
                   <span className="text-primary font-bold">INSIGHT:</span> Team efficiency has improved by <span className="text-white">12.4%</span> since the latest AI orchestration update.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
