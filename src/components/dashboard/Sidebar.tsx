// === Dashboard: Sidebar component ===
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  LayoutGrid,
  Settings,
  Database,
  ChevronLeft,
  ChevronRight,
  LogOut,
  GitBranch,
  Users,
  Workflow
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Overview", icon: Home, href: "/overview" },
  { name: "Projects", icon: LayoutGrid, href: "/projects" },
  { name: "Workflows", icon: GitBranch, href: "/workflows" },
  { name: "Team Hub", icon: Users, href: "/team" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Data Core", icon: Database, href: "/data" },
  { name: "Automations", icon: Workflow, href: "/automations" },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      className="relative flex h-full flex-col border-r border-white/5 bg-surface/50 backdrop-blur-xl transition-all"
    >
      <div className="flex pt-8 pb-4 items-center justify-between px-6">
        {!collapsed && (
          <Link to="/overview" className="flex items-center gap-3 text-xl font-bold text-white font-heading transition-opacity hover:opacity-80">
            <img
              src="/Logo.svg"
              alt="Buildorai Logo"
              className="h-12 w-auto"
            />
            
          </Link>
        )}
        {collapsed && (
          <Link to="/overview" className="mx-auto flex transition-opacity hover:opacity-80">
            <img
              src="/favicon.svg"
              alt="Buildorai"
              className="h-12 w-auto"
            />
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-surface text-text-secondary hover:text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-8">
        {menuItems.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${active
                ? "bg-primary/10 text-primary"
                : "text-text-secondary hover:bg-white/5 hover:text-white"
                }`}
            >
              <item.icon size={20} />
              {!collapsed && <span className="font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-text-secondary transition-all hover:bg-white/5 hover:text-white">
          <Settings size={20} />
          {!collapsed && <span className="font-medium">Settings</span>}
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-danger/80 transition-all hover:bg-danger/10 hover:text-danger">
          <LogOut size={20} />
          {!collapsed && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
}
