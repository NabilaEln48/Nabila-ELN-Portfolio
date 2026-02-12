"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";

// --- STAR BACKGROUND COMPONENT ---
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

// --- MAGNETIC WRAPPER ---
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.3);
    y.set((clientY - (top + height / 2)) * 0.3);
  };

  return (
    <motion.div 
      style={{ x: springX, y: springY }} 
      ref={ref} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

// --- MAIN HERO ---
export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  return (
    <section 
      onMouseMove={(e) => { mouseX.set(e.clientX - 250); mouseY.set(e.clientY - 250); }}
      /* Using min-h-screen to ensure height on mobile, but md:h-screen for desktop desktop */
      className="relative min-h-screen md:h-screen w-full flex items-center justify-center bg-[#020205] overflow-hidden py-24 md:py-0"
    >
      <StarBackground count={40} />

      {/* Decorative Blur */}
      <div className="absolute top-[-5%] left-[-5%] w-[80%] md:w-[50%] h-[50%] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        style={{ x: springX, y: springY }} 
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-cyan-400/5 blur-[100px] pointer-events-none z-0" 
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* MOBILE: 20vw | DESKTOP: 12vw */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[20vw] md:text-[12vw] font-black tracking-[-0.05em] leading-[0.8] md:leading-[0.85] uppercase bg-gradient-to-b from-white via-white to-cyan-500 bg-clip-text text-transparent"
        >
          NABILA <br className="md:hidden" /> ELN
        </motion.h1>
        
        {/* MOBILE: text-xl | DESKTOP: text-xl */}
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3, duration: 0.8 }} 
          className="mt-8 md:mt-6 text-xl md:text-xl italic text-gray-400 font-light max-w-sm md:max-w-2xl px-4"
        >
          "Powered by curiosity, guided by coffee, and haunted by code."
        </motion.p>

        <div className="flex flex-col items-center mt-12 md:mt-10">
          <motion.h2 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5, duration: 0.8 }} 
            className="text-cyan-400/80 text-[11px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-medium mb-12 md:mb-10"
          >
            Software Engineer & Creative Developer
          </motion.h2>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
  <Magnetic>
    <Link href="/projects">
      <button className="px-12 py-5 md:px-10 md:py-4 bg-white text-black text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-cyan-400 transition-colors shadow-2xl">
        Explore Work
      </button>
    </Link>
  </Magnetic>
</motion.div>
        </div>
      </div>
    </section>
  );
}