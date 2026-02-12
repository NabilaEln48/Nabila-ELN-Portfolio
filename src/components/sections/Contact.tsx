"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useState } from "react";

// --- REUSING HERO STAR LOGIC ---
const Star = ({ top, left, size, delay }: { top: string; left: string; size: number; delay: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay }}
    style={{ top, left, width: size, height: size }}
    className="absolute bg-white rounded-full shadow-[0_0_5px_white] z-0"
  />
);

const StarBackground = ({ count = 30 }: { count?: number }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <Star 
          key={i} 
          top={`${Math.random() * 100}%`} 
          left={`${Math.random() * 100}%`} 
          size={Math.random() * 2 + 1}
          delay={Math.random() * 5}
        />
      ))}
    </div>
  );
};

export default function ContactFooter() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  return (
    <footer 
      id="contact" 
      onMouseMove={(e) => { mouseX.set(e.clientX - 250); mouseY.set(e.clientY - 250); }}
      /* FIX: Changed z-50 to z-10 so it stays behind the Mobile Menu overlay */
      className="relative w-full bg-[#020205] text-white pt-32 pb-10 z-10 overflow-hidden"
    >
      {/* 1. HERO MATCHED BACKGROUND ELEMENTS */}
      <StarBackground count={30} />
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 blur-[150px] rounded-full" />
      <motion.div 
        style={{ x: springX, y: springY }} 
        className="absolute w-[400px] h-[400px] rounded-full bg-cyan-400/5 blur-[100px] pointer-events-none z-0" 
      />

      <div className="container relative z-10 mx-auto px-6">
        
        {/* 2. CONTACT CONTENT */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-32">
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-10 bg-gradient-to-b from-white via-white to-cyan-500 bg-clip-text text-transparent"
            >
              Let's <br /> Connect.
            </motion.h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-lg leading-relaxed italic">
              "Powered by curiosity, guided by coffee, and haunted by code."
            </p>
          </div>
          
          <div className="flex flex-col gap-8 text-left md:text-right w-full md:w-auto">
            <div className="group">
              <p className="text-[10px] uppercase tracking-[0.5em] text-cyan-400/80 mb-2 font-medium">Get in touch</p>
              <a 
                href="mailto:nabilaelnm@gmail.com" 
                className="text-2xl md:text-4xl font-bold text-white hover:text-cyan-400 transition-all duration-300"
              >
                Nabila M. "ELN"
              </a>
            </div>

            <div className="flex gap-8 md:justify-end font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">
              <a 
                href="https://linkedin.com/in/nabilaeln48/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-cyan-400 hover:line-through transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/NabilaEln48" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-cyan-400 hover:line-through transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://x.com/nabila_eln48" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-cyan-400 hover:line-through transition-colors"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>

        {/* 3. FOOTER STRIP */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
              © 2026 Nabila M. "ELN"
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
              Available for new projects
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}