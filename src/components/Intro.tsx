"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Intro() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulates the loading bar filling up
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Auto-hide the intro shortly after reaching 100%
          setTimeout(() => setIsVisible(false), 500); 
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Adjust this number to make the loading faster or slower

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => setIsVisible(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
        >
          {/* Logo Container with Glow */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative flex items-center justify-center w-40 h-40 mb-10"
          >
            {/* The background glow effect */}
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
            
            {/* Replace /logo.png with your actual file name in the public folder */}
            <Image 
              src="/logo.png" 
              alt="ELN Logo"
              width={140} 
              height={140}
              priority
              className="relative z-10 object-contain"
            />

            {/* Spinning decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-10px] border-t border-b border-cyan-400/20 rounded-full"
            />
          </motion.div>

          {/* Loading Bar */}
          <div className="w-64 h-[1px] bg-gray-900 mb-4 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>

          {/* Designation Text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-cyan-400 uppercase tracking-[0.4em] text-[10px] font-medium mb-12"
          >
            Software Engineer
          </motion.p>

          {/* Skip Button */}
          <button 
            onClick={handleSkip}
            className="group flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">Skip Intro</span>
            <div className="w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}