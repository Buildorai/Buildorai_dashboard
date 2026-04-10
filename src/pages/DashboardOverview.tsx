// === Dashboard: Overview Page ===
import React from "react";
import ProjectInputWidget from "@/components/dashboard/WidgetA_Input";
import WorkflowWidget from "@/components/dashboard/WidgetB_Workflow";
import MonitorWidget from "@/components/dashboard/WidgetC_Monitor";

export default function DashboardOverview() {
  return (
    <div className="flex-1 p-4 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white font-heading">Good morning, Alex</h2>
          <p className="text-text-secondary">Here's what's happening with your projects today.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/* Widget A: Project Input */}
          <div className="xl:col-span-1">
            <ProjectInputWidget />
          </div>

          {/* Widget B: Workflow Viewer */}
          <div className="xl:col-span-1">
            <WorkflowWidget />
          </div>

          {/* Widget C: System Monitor */}
          <div className="xl:col-span-2 xl:grid-cols-1">
            <MonitorWidget />
          </div>
        </div>

        {/* Placeholder for more widgets */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-surface/20 p-6 backdrop-blur-sm">
            <h4 className="mb-2 font-medium text-white text-sm">Active Nodes</h4>
            <div className="text-3xl font-bold text-primary">124</div>
            <div className="mt-2 h-1 w-full bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-primary" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-surface/20 p-6 backdrop-blur-sm">
            <h4 className="mb-2 font-medium text-white text-sm">GPU Utilization</h4>
            <div className="text-3xl font-bold text-success">88%</div>
            <div className="mt-2 h-1 w-full bg-success/20 rounded-full overflow-hidden">
              <div className="h-full w-[88%] bg-success" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-surface/20 p-6 backdrop-blur-sm">
            <h4 className="mb-2 font-medium text-white text-sm">Data Throughput</h4>
            <div className="text-3xl font-bold text-warning">1.2 GB/s</div>
            <div className="mt-2 h-1 w-full bg-warning/20 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-warning" />
            </div>
          </div>
        </div>
      </div>
  );
}
