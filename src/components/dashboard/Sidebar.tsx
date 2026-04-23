import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Workflow,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  { name: "Overview", icon: Home, href: "/overview" },
  { name: "Projects", icon: LayoutGrid, href: "/projects" },
  { name: "Workflows", icon: GitBranch, href: "/workflows" },
  { name: "Team Hub", icon: Users, href: "/team" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Data Core", icon: Database, href: "/data" },
  { name: "Automations", icon: Workflow, href: "/automations" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    if (setMobileOpen) setMobileOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin");
  };

  const getUserInitials = () => {
    if (!user?.displayName) return user?.email?.substring(0, 2).toUpperCase() || "AD";
    const firstName = user.displayName.split(" ")[0];
    return firstName.substring(0, 2).toUpperCase();
  };

  const sidebarContent = (
    <motion.aside
      initial={mobileOpen ? { x: -280 } : false}
      animate={{
        width: collapsed ? 80 : 280,
        x: 0
      }}
      exit={{ x: -280 }}
      className={`relative flex h-full flex-col border-r border-white/5 bg-background shadow-2xl lg:shadow-none lg:bg-surface/50 backdrop-blur-xl transition-all overflow-hidden z-[60]`}
    >
      <div className="flex pt-8 pb-4 items-center justify-between px-6 shrink-0">
        {!collapsed && (
          <Link to="/overview" className="flex items-center gap-3 text-xl font-bold text-white font-heading transition-opacity hover:opacity-80">
            <img
              src="/Logo-New.svg"
              alt="Buildorai Logo"
              className="h-12 w-auto"
            />
          </Link>
        )}
        {collapsed && (
          <Link to="/overview" className="mx-auto flex transition-opacity hover:opacity-80">
            <img
              src="/Favicon-New.svg"
              alt="Buildorai"
              className="h-12 w-auto"
            />
          </Link>
        )}

        {/* Desktop Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-10 h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-surface text-text-secondary hover:text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileOpen?.(false)}
          className="lg:hidden p-2 text-text-secondary hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      <nav className={`flex-1 space-y-2 ${collapsed ? "px-2" : "px-4"} py-8 overflow-y-auto scrollbar-thin`}>
        {menuItems.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center rounded-xl p-3 transition-all ${collapsed ? "justify-center" : "gap-3 px-4"} ${active
                ? "bg-primary/10 text-primary"
                : "text-text-secondary hover:bg-white/5 hover:text-white"
                }`}
            >
              <item.icon size={20} className="shrink-0" />
              {!collapsed && <span className="font-medium whitespace-nowrap">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4 p-4">
        <div className={`flex items-center gap-3 rounded-2xl p-2 transition-all ${collapsed ? 'justify-center bg-transparent' : 'bg-white/5 border border-white/5 shadow-lg'
          }`}>
          <div className="relative h-10 w-10 shrink-0">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 font-bold text-white shadow-lg overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || "User"} className="h-full w-full object-cover" />
              ) : (
                getUserInitials()
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0c0e14] bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]">
              <div className="h-full w-full rounded-full bg-success animate-ping opacity-75" />
            </div>
          </div>

          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col min-w-0"
            >
              <span className="truncate text-sm font-bold text-white">{user?.displayName || "User"}</span>
              <span className="truncate text-[10px] text-text-secondary uppercase tracking-widest font-mono">
                {user?.email?.split('@')[0] || "Architect"}
              </span>
            </motion.div>
          )}
        </div>

        <button
          onClick={handleSignOut}
          className={`flex w-full items-center rounded-xl p-3 text-danger/80 transition-all hover:bg-danger/10 hover:text-danger ${collapsed ? "justify-center" : "gap-3 px-4"}`}
        >
          <LogOut size={20} className="shrink-0" />
          {!collapsed && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-full">
        {sidebarContent}
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen?.(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Content Wrapper (needed to prevent width animation fighting with fixed pos) */}
            <div className="relative h-full w-[280px]">
              {sidebarContent}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
