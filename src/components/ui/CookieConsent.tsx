import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already interacted with the consent
    const consent = localStorage.getItem("buildorai_cookie_consent");
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = () => {
    localStorage.setItem("buildorai_cookie_consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 md:left-16 z-[300] w-[calc(100%-3rem)] max-w-md sm:w-[400px]"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1121]/80 p-8 shadow-2xl backdrop-blur-2xl">
            {/* Ambient Background Glow */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-[80px]" />
            <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-blue-600/5 blur-[80px]" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary shadow-inner">
                  <Cookie size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading text-lg font-black tracking-widest text-white uppercase">
                    Cookie Intelligence
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    We use cookies to encrypt your experience and optimize our security protocols.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAction}
                  className="flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-blue-600 px-6 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:shadow-primary/30 active:scale-95"
                >
                  Authorize
                </button>
                <button
                  onClick={handleAction}
                  className="flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 text-xs font-black uppercase tracking-widest text-text-secondary transition-all hover:bg-white/10 hover:text-white active:scale-95"
                >
                  Decline
                </button>
              </div>
            </div>

            {/* Subtle Technical Grid Overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
