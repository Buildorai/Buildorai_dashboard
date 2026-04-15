import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  MessageSquare, 
  CheckCircle2, 
  Zap, 
  Star,
  Activity,
  Award,
  X,
  Loader2,
  Shield,
  Cpu,
  Globe
} from 'lucide-react';
import Badge from '@/components/dashboard/Badge';

const INITIAL_MEMBERS = [
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

// --- Provision Modal Component ---

function ProvisionModal({ isOpen, onClose, onProvision }: { isOpen: boolean, onClose: () => void, onProvision: (member: any) => void }) {
  const [step, setStep] = useState<'form' | 'provisioning' | 'success'>('form');
  const [formData, setFormData] = useState({ name: '', role: 'AI Engineer' });
  const [progress, setProgress] = useState(0);

  const roles = ['AI Engineer', 'System Admin', 'Data Scientist', 'Security Analyst', 'Product Lead', 'Frontend Designer'];

  const handleStartProvisioning = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    
    setStep('provisioning');
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setStep('success'), 500);
      } else {
        setProgress(p);
      }
    }, 200);
  };

  const handleComplete = () => {
    const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    onProvision({
      name: formData.name,
      role: formData.role,
      status: 'active',
      efficiency: Math.floor(Math.random() * 20) + 80,
      tasks: 0,
      avatar: initials || '??'
    });
    setStep('form');
    setFormData({ name: '', role: 'AI Engineer' });
    setProgress(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step !== 'provisioning' ? onClose : undefined}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0c0e14] p-8 shadow-2xl"
          >
            {/* Background Glow */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />

            {step === 'form' && (
              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white font-heading">Provision Personnel</h3>
                    <p className="mt-1 text-sm text-text-secondary">Deploy a new member to the autonomous network.</p>
                  </div>
                  <button onClick={onClose} className="rounded-xl bg-white/5 p-2 text-text-secondary hover:bg-white/10 hover:text-white transition-all">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleStartProvisioning} className="space-y-6">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">Full Designation Name</label>
                    <input
                      autoFocus
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Cassandra Thorne"
                      className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-white placeholder-white/20 outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">Assigned Role & Vector</label>
                    <div className="grid grid-cols-2 gap-3">
                      {roles.map(role => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setFormData({ ...formData, role })}
                          className={`rounded-xl border px-4 py-3 text-left text-xs font-semibold transition-all ${
                            formData.role === role 
                              ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10' 
                              : 'border-white/5 bg-white/5 text-text-secondary hover:border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all"
                  >
                    <UserPlus size={18} />
                    Initialize Provisioning Sequence
                  </button>
                </form>
              </div>
            )}

            {step === 'provisioning' && (
              <div className="relative z-10 flex flex-col items-center py-12 text-center">
                <div className="relative mb-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="h-24 w-24 rounded-full border-2 border-primary/20 border-t-primary"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-primary">
                    <Cpu size={32} className="animate-pulse" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Syncing Neural Identity</h3>
                <p className="max-w-[280px] text-sm text-text-secondary mb-8">Establishing persistent connection and allocating resource vectors for <span className="text-white font-medium">{formData.name}</span>.</p>

                <div className="w-full max-w-xs">
                  <div className="mb-2 flex justify-between text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                    <span>Provisioning Status</span>
                    <span className="text-primary">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div 
                      className="h-full bg-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  <div className="mt-6 flex justify-center gap-6">
                    <div className="flex flex-col items-center gap-1">
                      <Shield size={14} className="text-success" />
                      <span className="text-[8px] uppercase text-text-secondary">Security Verified</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Globe size={14} className="text-info" />
                      <span className="text-[8px] uppercase text-text-secondary">Network Node Up</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="relative z-10 flex flex-col items-center py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-success/20 text-success border border-success/30"
                >
                  <CheckCircle2 size={48} />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2">Provisioning Successful</h3>
                <p className="max-w-[320px] text-sm text-text-secondary mb-8">
                  <span className="text-white font-medium">{formData.name}</span> has been integrated into the central management hub with full administrative privileges.
                </p>

                <button
                  onClick={handleComplete}
                  className="w-full rounded-2xl bg-success py-4 font-bold text-white shadow-lg shadow-success/20 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  Confirm Integration
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function Team() {
  const { user } = useAuth();
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setMembers(prev => prev.map(m => {
        if (m.name === 'Alex Rivera') {
          const initials = user.displayName 
            ? user.displayName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
            : user.email?.charAt(0).toUpperCase() || "U";
          return {
            ...m,
            name: user.displayName || user.email?.split('@')[0] || "User",
            avatar: initials
          };
        }
        return m;
      }));
    }
  }, [user]);

  const handleProvisionMember = (newMember: any) => {
    setMembers([newMember, ...members]);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading ">Team Hub </h2>
          <p className="mt-1 text-sm text-text-secondary">Personnel telemetry and collaborative performance monitoring.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-white transition-all hover:bg-primary-dark shadow-lg shadow-primary/20 active:scale-95"
        >
          <UserPlus size={18} className="group-hover:translate-x-0.5 transition-transform" />
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
           <AnimatePresence mode="popLayout">
           {members.map((member, i) => (
             <motion.div
               key={member.name}
               layout
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, scale: 0.9 }}
               transition={{ duration: 0.4, delay: i < 5 ? i * 0.1 : 0 }}
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
                            <motion.div 
                              className="h-full bg-primary" 
                              initial={{ width: 0 }}
                              animate={{ width: `${member.efficiency}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
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
           </AnimatePresence>
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

      <ProvisionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onProvision={handleProvisionMember}
      />
    </div>
  );
}
