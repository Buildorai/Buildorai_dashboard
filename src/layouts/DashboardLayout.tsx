import React, { useEffect, useRef } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll content area back to top on every route change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  // Map routes to titles
  const getHeaderTitle = () => {
    switch (location.pathname) {
      case "/overview": return "Command Center Overview";
      case "/projects": return "Project Nodes";
      case "/workflows": return "Workflow Orchestrator";
      case "/team": return "Team Hub Telemetry";
      case "/analytics": return "Performance Telemetry";
      case "/data": return "Data Core Telemetry";
      case "/automations": return "AI Orchestration Center";
      default: return "Command Center";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      <Sidebar />
      <div ref={scrollRef} className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header title={getHeaderTitle()} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
