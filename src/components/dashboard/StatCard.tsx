import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  delay?: number;
}

const colorStyles = {
  primary: 'text-primary bg-primary/10 border-primary/20',
  success: 'text-success bg-success/10 border-success/20',
  warning: 'text-warning bg-warning/10 border-warning/20',
  danger: 'text-danger bg-danger/10 border-danger/20',
  info: 'text-info bg-info/10 border-info/20',
};

export default function StatCard({ 
  label, 
  value, 
  subValue, 
  icon: Icon, 
  trend, 
  color = 'primary',
  delay = 0 
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface/30 p-5 backdrop-blur-md transition-all hover:bg-surface/40 hover:border-white/10"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-text-secondary">{label}</p>
          <h3 className="mt-1 text-2xl font-bold text-white font-heading">{value}</h3>
          {subValue && (
            <p className="mt-1 flex items-center text-[11px] text-text-secondary">
              {trend === 'up' && <span className="mr-1 text-success">↑</span>}
              {trend === 'down' && <span className="mr-1 text-danger">↓</span>}
              {subValue}
            </p>
          )}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${colorStyles[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      
      {/* Decorative accent */}
      <div className="absolute -bottom-1 -right-1 h-12 w-12 bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
    </motion.div>
  );
}
