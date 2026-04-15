import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Camera, Loader2, Check } from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Split displayName into first and last name
  const nameParts = (user?.displayName || '').split(' ');
  const initialFirstName = nameParts[0] || '';
  const initialLastName = nameParts.slice(1).join(' ') || '';

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const fullDisplayName = `${firstName} ${lastName}`.trim();
      await updateProfile(auth.currentUser, {
        displayName: fullDisplayName,
        photoURL: photoURL || null,
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0f1117] shadow-2xl"
          >
            {/* Top Accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-sky-400 to-primary" />

            <div className="p-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white font-heading">Update Profile</h3>
                <button
                  onClick={onClose}
                  className="rounded-lg bg-white/5 p-2 text-text-secondary hover:bg-white/10 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                {/* Photo Section */}
                <div className="flex flex-col items-center gap-4 mb-4">
                  <div className="relative group">
                    <div className="h-24 w-24 overflow-hidden rounded-2xl border-2 border-primary/20 bg-primary/5 shadow-xl transition-all group-hover:border-primary/50">
                      {photoURL ? (
                        <img
                          src={photoURL}
                          alt="Avatar Preview"
                          className="h-full w-full object-cover"
                          onError={() => setPhotoURL('')}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-primary/40">
                          <User size={40} />
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/30">
                      <Camera size={16} />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">Profile Image URL</label>
                    <input
                      type="url"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary/50 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">First Name</label>
                    <input
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Alex"
                      className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary/50 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-text-secondary">Last Name</label>
                    <input
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Rivera"
                      className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary/50 outline-none transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-danger/20 bg-danger/5 p-3 text-xs text-danger">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || success}
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white shadow-lg transition-all active:scale-[0.98] ${success ? 'bg-success shadow-success/20' : 'bg-primary shadow-primary/20 hover:brightness-110'
                    }`}
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : success ? (
                    <>
                      <Check size={18} /> Profile Updated
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
