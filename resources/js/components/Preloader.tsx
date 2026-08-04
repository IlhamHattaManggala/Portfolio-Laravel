import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Global variable in the module scope to track if the preloader has run during the current page lifespan.
// Full browser refreshes (F5) will reset this variable to false, while internal Inertia navigations will preserve it as true.
let hasRunPreloader = false;

const Preloader = () => {
  const [loading, setLoading] = useState(() => !hasRunPreloader);
  const [logs, setLogs] = useState<string[]>([]);
  
  const loadingSequence = useMemo(() => [
    "Starting system boot...",
    "Loading IHM core modules...",
    "Initializing Web & Flutter environments...",
    "Checking database connectivity...",
    "Establishing secure handshake...",
    "Mounting portfolio_v2.exe...",
    "System ready. Welcome, Visitor."
  ], []);

  useEffect(() => {
    if (!loading) return;

    let currentLog = 0;
    
    const interval = setInterval(() => {
      if (currentLog < loadingSequence.length) {
        setLogs(prev => [...prev, loadingSequence[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          hasRunPreloader = true;
        }, 300); // Snappier exit delay (300ms instead of 800ms)
      }
    }, 200); // Faster logging interval (200ms instead of 400ms)

    return () => clearInterval(interval);
  }, [loading, loadingSequence]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6"
        >
          <div className="w-full max-w-lg bg-[#0d1117] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm">
            {/* Header */}
            <div className="bg-[#161b22] px-4 py-3 border-b border-white/5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <span className="text-gray-500 text-[10px] uppercase tracking-widest ml-2">system_boot.sh</span>
            </div>
            
            {/* Body */}
            <div className="p-6 space-y-2 min-h-[240px]">
              {logs.map((log, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={index}
                  className="flex gap-3"
                >
                  <span className="text-green-500">➜</span>
                  <span className="text-gray-300">{log}</span>
                </motion.div>
              ))}
              {logs.length < loadingSequence.length && (
                <div className="flex gap-3 items-center">
                  <span className="text-green-500">➜</span>
                  <div className="w-2 h-4 bg-blue-500 animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-blue-500/5 px-4 py-2 border-t border-white/5 flex justify-between text-[9px] text-blue-500/50 uppercase tracking-widest">
              <span>Status: {logs.length === loadingSequence.length ? "Ready" : "Loading"}</span>
              <span>Memory: 1024KB</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
