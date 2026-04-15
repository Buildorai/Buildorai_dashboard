import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with the name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      navigate('/overview');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create account. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-[#020617] text-white font-sans selection:bg-primary/30 scrollbar-thin">
      {/* ── Intense Atmospheric Glow Background ──────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base Ambient Primary Hub */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.18),transparent_80%)]" />
        
        {/* Deep Primary Glow Orb 1 - Mirrored for SignUp */}
        <motion.div 
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[15%] -right-[15%] h-[80%] w-[80%] rounded-full bg-primary/25 blur-[150px]"
        />
        
        {/* Deep Primary Glow Orb 2 */}
        <motion.div 
          animate={{ 
            opacity: [0.5, 0.7, 0.5],
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -left-[10%] h-[70%] w-[70%] rounded-full bg-primary/35 blur-[120px]"
        />

        {/* Neural Grid Overlay with Primary Tint */}
        <div className="absolute inset-0 opacity-[0.2]" 
             style={{ 
               backgroundImage: `radial-gradient(circle at 2px 2px, #0EA5E9 1px, transparent 0)`,
               backgroundSize: '48px 48px'
             }} 
        />
        
        {/* Noise overlay for texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 flex min-h-full flex-col items-center justify-center py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[520px] "
        >
          {/* Logo Section */}
          <div className="mb-6 flex flex-col items-center text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="h-auto w-32 md:w-48"
            >
              <img src="/Logo.svg" alt="Buildorai" className="h-full w-full object-contain mt-2" />
            </motion.div>
            <h1 className="text-3xl font-bold tracking-tight text-white font-heading sm:text-4xl">
              Create Account
            </h1>
            <p className="mt-2 text-text-secondary max-w-sm">
              Initialize your unique identification within the system orchestration framework.
            </p>
          </div>

          {/* Registration Card */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 md:p-10 backdrop-blur-3xl shadow-2xl">
            {/* Gloss Highlight Edge */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200"
                  >
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary px-1">
                  Full Name
                </label>
                <div className="group relative">
                  <div className="absolute inset-y-0 left-4 flex items-center text-text-secondary group-focus-within:text-primary transition-colors">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="S. Thanushan"
                    className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-primary/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary px-1">
                  Neural Identity (Email)
                </label>
                <div className="group relative">
                  <div className="absolute inset-y-0 left-4 flex items-center text-text-secondary group-focus-within:text-primary transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@buildorai.com"
                    className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-primary/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary px-1">
                  Encryption Key (Password)
                </label>
                <div className="group relative">
                  <div className="absolute inset-y-0 left-4 flex items-center text-text-secondary group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-12 pr-12 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-primary/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-primary/10"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-text-secondary hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark disabled:opacity-70 group mt-4"
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                    />
                  ) : (
                    <motion.div
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      Establish Connection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              </motion.button>
            </form>
          </div>

          <div className="my-4 text-center text-sm">
            <span className="text-text-secondary">Already initialized? </span>
            <Link to="/signin" className="font-bold text-primary hover:text-white transition-colors underline decoration-primary/30 underline-offset-4 decoration-2">
              Sync Identity
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
