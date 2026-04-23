import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Palette, 
  Shield, 
  Check, 
  Circle, 
  AlertCircle,
  Loader2,
  Camera,
  Eye,
  EyeOff
} from 'lucide-react';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

type SettingsTab = 'profile' | 'security' | 'preferences';

export default function Settings() {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Profile State
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

  // Security State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Preferences State (LocalStorage)
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('user_prefs_notifications');
    return saved ? JSON.parse(saved) : { email: true, push: true, marketing: false };
  });

  const passwordRequirements = [
    { id: 'length', label: '8+ characters', regex: /.{8,}/ },
    { id: 'uppercase', label: 'Uppercase letter', regex: /[A-Z]/ },
    { id: 'lowercase', label: 'Lowercase letter', regex: /[a-z]/ },
    { id: 'number', label: 'Number', regex: /[0-9]/ },
    { id: 'special', label: 'Special character', regex: /[^A-Za-z0-9]/ },
  ];

  const isPasswordValid = passwordRequirements.every(req => req.regex.test(newPassword));

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: photoURL || null
      });
      await refreshUser();
      setSuccess("Profile updated successfully");
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    if (!isPasswordValid) {
      setError("New password does not meet security requirements.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Re-authentication might be required
      if (currentPassword) {
        const credential = EmailAuthProvider.credential(user?.email || '', currentPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);
      }
      
      await updatePassword(auth.currentUser, newPassword);
      setSuccess("Password updated successfully");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      if (err.code === 'auth/requires-recent-login') {
        setError("For security, please re-authenticate by logging out and back in before changing your password.");
      } else {
        setError(err.message || "Failed to update password");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = () => {
    localStorage.setItem('user_prefs_notifications', JSON.stringify(notifications));
    setSuccess("Preferences saved locally");
  };

  const tabs: { id: SettingsTab; label: string; icon: any }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
  ];

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
        {/* Status Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 flex items-center gap-3 rounded-2xl border border-danger/20 bg-danger/10 p-4 text-sm text-danger"
            >
              <AlertCircle size={18} />
              <span>{error}</span>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 flex items-center gap-3 rounded-2xl border border-success/20 bg-success/10 p-4 text-sm text-success"
            >
              <Check size={18} />
              <span>{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Tabs */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="flex flex-row gap-2 lg:flex-col overflow-x-auto scrollbar-thin pb-2 lg:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 lg:shrink items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5'
                      : 'text-text-secondary hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-white/5 bg-surface/30 p-6 sm:p-8 backdrop-blur-xl"
            >
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Identity Details</h3>
                    <p className="text-sm text-text-secondary">Update your public identification within the orchestration framework.</p>
                  </div>

                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-8 items-start">
                      <div className="relative group">
                        <div className="h-24 w-24 overflow-hidden rounded-2xl border-2 border-primary/20 bg-primary/5 shadow-xl transition-all group-hover:border-primary/50">
                          {photoURL ? (
                            <img src={photoURL} alt="Avatar" className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-primary/40">
                              <User size={40} />
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-lg">
                          <Camera size={14} />
                        </div>
                      </div>

                      <div className="flex-1 space-y-4 w-full">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary px-1">Display Name</label>
                          <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary/50 outline-none transition-all"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary px-1">Profile Image URL</label>
                          <input
                            type="url"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary/50 outline-none transition-all"
                            placeholder="https://example.com/avatar.jpg"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary px-1">Email Address (Registry)</label>
                          <input
                            type="email"
                            disabled
                            value={user?.email || ''}
                            className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-text-secondary opacity-60 cursor-not-allowed outline-none"
                          />
                          <p className="text-[10px] text-text-secondary/50 px-1 italic mt-1">Managed via authentication provider.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:opacity-50"
                      >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Access Protocol</h3>
                    <p className="text-sm text-text-secondary">Manage your encryption keys and security parameters.</p>
                  </div>

                  <form onSubmit={handleUpdatePassword} className="space-y-6">
                    <div className="space-y-4 max-w-md">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary px-1">Current Access Key</label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary/50 outline-none transition-all"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white"
                          >
                            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary px-1">New Access Key</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary/50 outline-none transition-all"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white"
                          >
                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary px-1">Confirm Access Key</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary/50 outline-none transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    {/* Requirements */}
                    {newPassword.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                        {passwordRequirements.map((req) => {
                          const isMet = req.regex.test(newPassword);
                          return (
                            <div key={req.id} className="flex items-center gap-2">
                              {isMet ? (
                                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-success/20 text-success">
                                  <Check size={10} strokeWidth={3} />
                                </div>
                              ) : (
                                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/5 text-white/20">
                                  <Circle size={10} strokeWidth={3} />
                                </div>
                              )}
                              <span className={`text-[10px] ${isMet ? 'text-success/80' : 'text-text-secondary/60'}`}>{req.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="pt-4 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={loading || !isPasswordValid || newPassword !== confirmPassword}
                        className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:opacity-30"
                      >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
                        Update Key
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Environmental Params</h3>
                    <p className="text-sm text-text-secondary">Configure your interaction preferences and UI aesthetics.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Notifications</h4>
                      <div className="space-y-3">
                        {Object.entries(notifications).map(([key, val]) => (
                          <div key={key} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Bell size={16} />
                              </div>
                              <span className="text-sm text-white capitalize">{key} Alerts</span>
                            </div>
                            <button
                              onClick={() => setNotifications({ ...notifications, [key]: !val })}
                              className={`h-6 w-11 rounded-full p-1 transition-all ${val ? 'bg-primary' : 'bg-white/10'}`}
                            >
                              <div className={`h-4 w-4 rounded-full bg-white transition-all ${val ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <button
                        onClick={handleSavePreferences}
                        className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-8 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
                      >
                        <Globe size={18} />
                        Sync Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
