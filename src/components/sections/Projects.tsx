"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Link from "next/link";

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

const StarBackground = ({ count = 40 }: { count?: number }) => {
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

export default function Projects() {
  return (
    <section 
      id="projects" 
      className="relative w-full py-24 pb-32 bg-[#020205] rounded-t-[80px] md:rounded-t-[150px] mt-[-100px] z-40 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
    >
      {/* 1. STARS ONLY - NO LIGHT GLOWS */}
      <StarBackground count={40} />

      <div className="container relative z-20 mx-auto px-6 max-w-7xl">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="block text-cyan-400/80 text-[10px] uppercase tracking-[0.6em] font-medium mb-3"
          >
            Featured Work
          </motion.span>
          
          {/* UPDATED: Applied gradient to the entire title block */}
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter bg-gradient-to-b from-white via-white/90 to-cyan-500 bg-clip-text text-transparent inline-block">
            Selected Projects
          </h2>
        </div>

        {/* FLAGSHIP PROJECT CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-12 gap-0 overflow-hidden bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/10 shadow-2xl relative"
        >
          {/* LEFT: Project Info */}
          <div className="col-span-12 md:col-span-5 p-10 md:p-14 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 relative z-10">
            <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest mb-4">
              04 — AUTOMATION
            </span>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase mb-6 leading-tight">
              ARIS Engine
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light italic">
              "Advanced Python engine built for specialized data processing and automated workflow management."
            </p>
            
            <div className="flex flex-wrap gap-3">
              {["#Python", "#Automation", "#DataEngine"].map(tag => (
                <span key={tag} className="text-[10px] font-mono text-gray-400 border border-white/10 px-3 py-1 rounded-full bg-white/5 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: Project Image */}
          <div className="col-span-12 md:col-span-7 bg-black/40 flex items-center justify-center p-6 md:p-10 group relative z-10">
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="/aris.png" 
                alt="ARIS Engine Preview" 
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
        </motion.div>

        {/* DISCOVER MORE BUTTON */}
        <div className="mt-16 flex justify-center">
          <Link 
            href="/projects" 
            className="px-10 py-4 bg-white text-black rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-cyan-400 transition-colors shadow-2xl"
          >
            Discover More Projects
          </Link>
        </div>

      </div>
    </section>
  );
}