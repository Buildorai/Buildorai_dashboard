import { Bell, User, X, CheckCheck, LogOut, Settings, ChevronDown, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

// ── Types ────────────────────────────────────────────────────────────────────
interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
}

// ── Dummy data ────────────────────────────────────────────────────────────────
const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: "New Project Created",
    message: "Project \"AI Pipeline v2\" has been successfully created.",
    time: "2 min ago",
    read: false,
    type: "success",
  },
  {
    id: 2,
    title: "Workflow Alert",
    message: "Workflow #34 encountered an error during execution.",
    time: "18 min ago",
    read: false,
    type: "warning",
  },
  {
    id: 3,
    title: "Team Invite Accepted",
    message: "Sarah Chen accepted your team collaboration invite.",
    time: "1 hr ago",
    read: false,
    type: "info",
  },
  {
    id: 4,
    title: "Deployment Successful",
    message: "Build #112 deployed to production without issues.",
    time: "3 hr ago",
    read: true,
    type: "success",
  },
  {
    id: 5,
    title: "Data Sync Complete",
    message: "All data cores have been synchronised successfully.",
    time: "Yesterday",
    read: true,
    type: "info",
  },
];

// ── Dot colours per type ──────────────────────────────────────────────────────
const TYPE_COLORS: Record<Notification["type"], string> = {
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-primary",
};

// ── Hook: close on outside click ─────────────────────────────────────────────
function useOutsideClick(
  refs: React.RefObject<HTMLElement | null>[],
  handler: () => void
) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (refs.every((r) => r.current && !r.current.contains(e.target as Node))) {
        handler();
      }
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [refs, handler]);
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Header({ title, setMobileSidebarOpen }: { title: string; setMobileSidebarOpen?: (open: boolean) => void }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] =
    useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin");
  };

  // Close both dropdowns on outside click
  useOutsideClick([notifRef, profileRef], () => {
    setNotifOpen(false);
    setProfileOpen(false);
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const clearAll = () => setNotifications([]);

  const dismiss = (id: number) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <>
      <header className="flex pt-6 pb-4 items-center justify-between border-b border-white/5 bg-background/50 px-4 sm:px-8 backdrop-blur-md relative z-50">
      
      {/* ── Left: Menu Toggle + Page title ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileSidebarOpen?.(true)}
          className="lg:hidden p-2 -ml-2 text-text-secondary hover:text-white transition-colors"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-white font-heading truncate max-w-[150px] sm:max-w-none">
          {title}
        </h1>
      </div>

      {/* ── Right: actions ── */}
      <div className="flex items-center gap-4 sm:gap-6">

        {/* ── Bell ── */}
        <div className="relative" ref={notifRef}>
          <button
            id="notification-bell-btn"
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
            className="relative rounded-xl border border-white/5 bg-surface/50 p-2 text-text-secondary transition-all hover:bg-white/5 hover:text-white"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* ── Notification Dropdown ── */}
          {notifOpen && (
            <div
              id="notification-dropdown"
              className="fixed inset-x-4 top-20 sm:absolute sm:right-0 sm:top-full sm:mt-3 sm:w-[380px] rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden z-[100]"
              style={{ maxHeight: "calc(100vh - 120px)" }}
            >
              {/* Header row */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <div>
                  <p className="text-sm font-semibold text-white">Notifications</p>
                  {unreadCount > 0 && (
                    <p className="text-xs text-text-secondary mt-0.5">
                      {unreadCount} unread
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      id="mark-all-read-btn"
                      onClick={markAllRead}
                      title="Mark all as read"
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary hover:text-primary hover:bg-primary/10 transition-all"
                    >
                      <CheckCheck size={14} />
                      <span className="hidden sm:inline">Mark all read</span>
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      id="clear-all-notifications-btn"
                      onClick={clearAll}
                      title="Clear all"
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary hover:text-danger hover:bg-danger/10 transition-all"
                    >
                      <X size={14} />
                      <span className="hidden sm:inline">Clear all</span>
                    </button>
                  )}
                </div>
              </div>

              {/* List */}
              <div className="overflow-y-auto scrollbar-thin" style={{ maxHeight: "340px" }}>
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-12 text-center px-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                      <Bell size={22} className="text-text-secondary" />
                    </div>
                    <p className="text-sm text-text-secondary">
                      You're all caught up!
                    </p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`group relative flex gap-3 px-5 py-4 border-b border-white/5 last:border-0 transition-colors ${
                        notif.read ? "opacity-60" : "bg-white/[0.02]"
                      } hover:bg-white/5`}
                    >
                      {/* Type dot */}
                      <div className="mt-1.5 flex-shrink-0">
                        <span
                          className={`block h-2 w-2 rounded-full ${TYPE_COLORS[notif.type]}`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {notif.title}
                        </p>
                        <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="text-[11px] text-text-secondary/60 mt-1.5">
                          {notif.time}
                        </p>
                      </div>

                      {/* Dismiss button */}
                      <button
                        onClick={() => dismiss(notif.id)}
                        aria-label="Dismiss notification"
                        className="flex-shrink-0 self-start mt-0.5 rounded-md p-1 text-text-secondary opacity-0 group-hover:opacity-100 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Profile ── */}
        <div className="relative" ref={profileRef}>
          <button
            id="profile-menu-btn"
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex items-center gap-3 border-l border-white/10 pl-4 sm:pl-6 transition-opacity hover:opacity-80"
            aria-label="Profile menu"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">{user?.displayName || "User"}</p>
              <p className="text-xs text-text-secondary uppercase tracking-widest text-[10px]">
                {user?.email?.split('@')[0] || "Admin"}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || "User"} className="h-full w-full object-cover" />
              ) : (
                <User size={20} />
              )}
            </div>
            <ChevronDown
              size={15}
              className={`hidden sm:block text-text-secondary transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* ── Profile Dropdown ── */}
          {profileOpen && (
            <div
              id="profile-dropdown"
              className="absolute right-0 mt-3 w-64 rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden py-2"
            >
              {/* User info */}
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-sm font-semibold text-white">{user?.displayName || "User"}</p>
                <p className="text-xs text-text-secondary mt-0.5 truncate">
                  {user?.email}
                </p>
              </div>

                {/* Menu items */}
                <div className="py-1">
                  <button
                    id="profile-view-btn"
                    onClick={() => {
                      setProfileModalOpen(true);
                      setProfileOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-all"
                  >
                    <User size={16} />
                    Profile
                  </button>
                  
                </div>

              <div className="border-t border-white/5 py-1">
                <button
                  id="logout-btn"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-danger/80 hover:text-danger hover:bg-danger/10 transition-all font-medium"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </header>
      
      <ProfileModal 
        isOpen={profileModalOpen} 
        onClose={() => setProfileModalOpen(false)} 
      />
    </>
  );
}
