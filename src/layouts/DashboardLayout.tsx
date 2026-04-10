import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

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
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header title={getHeaderTitle()} setIsOpen={setIsMobileMenuOpen} />
        <main>
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
