import React from 'react';

type BadgeStatus = 'active' | 'pending' | 'halted' | 'syncing' | 'nominal' | 'alert';

interface BadgeProps {
  status: BadgeStatus;
  label?: string;
  className?: string;
}

const statusStyles = {
  active: 'bg-primary/10 text-primary border-primary/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  halted: 'bg-danger/10 text-danger border-danger/20',
  syncing: 'bg-info/10 text-info border-info/20',
  nominal: 'bg-success/10 text-success border-success/20',
  alert: 'bg-danger/20 text-danger border-danger/40 animate-pulse',
};

export default function Badge({ status, label, className = '' }: BadgeProps) {
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${statusStyles[status]} ${className}`}>
      <span className={`mr-1.5 h-1 w-1 rounded-full ${status === 'alert' ? 'bg-danger shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-current'}`} />
      {displayLabel}
    </span>
  );
}
