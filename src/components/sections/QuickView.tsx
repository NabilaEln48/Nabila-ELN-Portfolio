"use client";
import { motion, cubicBezier, Variants } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: cubicBezier(0.215, 0.61, 0.355, 1),
    },
  }),
};

export default function QuickView() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      id="quickview"
      className="relative py-24 md:py-32 px-6 overflow-hidden rounded-t-[80px] md:rounded-t-[150px] rounded-b-[80px] md:rounded-b-[150px] z-30 shadow-2xl bg-[#020205] h-auto md:min-h-screen flex flex-col justify-center mt-[-100px]"
    >
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-cyan-600/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Interactive Flashlight */}
      <motion.div 
        className="absolute pointer-events-none z-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-full blur-[100px]"
        animate={{ x: mousePos.x - 250, y: mousePos.y - 250 }}
        transition={{ type: "tween", ease: "backOut", duration: 0.8 }}
      />

      <div className="container relative z-20 mx-auto max-w-6xl">
        
        {/* HEADER */}
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <motion.span className="block text-cyan-400 text-[10px] md:text-[12px] uppercase font-bold mb-3 tracking-[0.8em]">
            Capabilities
          </motion.span>
          <motion.h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter bg-gradient-to-b from-white via-white/90 to-cyan-500 bg-clip-text text-transparent inline-block">
            Core <span className="italic font-light">Architecture</span>
          </motion.h2>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min md:auto-rows-[250px]">
          
          {/* CARD 1: BACKEND */}
          <motion.div 
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="md:col-span-8 relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#020617] p-8 md:p-12 text-white border border-white/5 flex flex-col justify-center min-h-[220px] md:min-h-0"
          >
            <div className="relative z-10">
              <span className="text-[10px] text-cyan-400 font-bold tracking-[0.3em] uppercase mb-4 block">
                Server Side
              </span>
              <h3 className="text-2xl md:text-5xl font-black uppercase leading-none mb-4">
                Scalable <br className="hidden md:block" /> Logic.
              </h3>
              <p className="text-gray-400 text-[11px] md:text-sm font-medium leading-relaxed max-w-md">
                Building robust backends with Python & FastAPI. Expert in RESTful API design, asynchronous processing, and JWT security.
              </p>
            </div>
          </motion.div>

          {/* CARD 2: TERMINAL */}
          <motion.div 
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="md:col-span-4 bg-white/5 backdrop-blur-xl rounded-[40px] p-8 border border-white/10 flex flex-col justify-between min-h-[180px] md:min-h-0"
          >
            <div className="flex gap-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-red-500/40" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
              <div className="w-2 h-2 rounded-full bg-green-500/40" />
            </div>
            <div className="font-mono text-[10px] md:text-[12px] space-y-2">
              <p className="text-cyan-400 flex gap-2"><span>$</span><span>docker-compose up</span></p>
              <p className="text-purple-400 flex gap-2"><span>$</span><span>alembic upgrade</span></p>
              <p className="text-green-400 flex gap-2"><span>$</span><span>pytest -v</span></p>
            </div>
            <p className="text-white/20 text-[8px] font-mono uppercase mt-6 tracking-widest">
              Automation & DevOps
            </p>
          </motion.div>

          {/* CARD 3: HYBRID */}
          <motion.div 
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="md:col-span-12 bg-white rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between shadow-2xl overflow-hidden relative"
          >
            <div className="relative z-10 md:w-1/2 mb-6 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tighter leading-tight mb-3">
                Figma to Reality
              </h3>
              <p className="text-gray-600 text-[11px] md:text-sm font-medium max-w-sm">
                Translating complex wireframes into pixel-perfect responsive React interfaces with clean UI/UX fundamentals.
              </p>
            </div>

            <div className="relative z-10 md:w-1/2 grid grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-12">
              <div>
                <p className="text-[9px] font-bold text-cyan-600 uppercase tracking-widest mb-1">
                  Databases
                </p>
                <h4 className="text-black font-black uppercase text-[10px]">
                  PostgreSQL / Mongo / MySQL
                </h4>
              </div>
              <div>
                <p className="text-[9px] font-bold text-purple-600 uppercase tracking-widest mb-1">
                  Primary Stack
                </p>
                <h4 className="text-black font-black uppercase text-[10px]">
                  Python / JS / Tailwind
                </h4>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
