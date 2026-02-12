"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

const InteractiveStarField = () => {
  const [stars, setStars] = useState<{ x: number; y: number; size: number }[]>([]);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generatedStars = [...Array(40)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 10,
    }));
    setStars(generatedStars);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => {
        const dx = mousePos.x - star.x;
        const dy = mousePos.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isNear = distance < 12;
        return (
          <motion.div
            key={i}
            animate={{ opacity: isNear ? 0.3 : 0, scale: isNear ? 1.1 : 0.8, color: "#0891b2" }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            style={{ left: `${star.x}%`, top: `${star.y}%`, fontSize: `${star.size}px`, position: "absolute" }}
            className="font-mono font-bold"
          >
            {"</>"}
          </motion.div>
        );
      })}
    </div>
  );
};

export default function About() {
  return (
    <section 
      id="about" 
      className="relative w-full py-32 pb-[200px] bg-white rounded-t-[80px] md:rounded-t-[150px] rounded-b-[80px] md:rounded-b-[150px] mt-[-100px] z-30 overflow-hidden shadow-2xl"
    >
      <InteractiveStarField />

      <div className="container relative z-20 mx-auto px-6 max-w-5xl">
        
        {/* 1. TITLE */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span 
            className="block text-cyan-600 text-[10px] md:text-[11px] uppercase tracking-[0.6em] md:tracking-[0.8em] font-bold mb-3"
          >
            The Architect behind the code
          </motion.span>
          <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter bg-gradient-to-b from-black to-cyan-700 bg-clip-text text-transparent">
            About Me
          </h2>
        </div>

        {/* 2. MAIN CONTENT */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 mb-20 md:mb-24">
          
          {/* LEFT SIDE: TEXT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-3/5 space-y-6 text-gray-600 leading-relaxed text-[13px] md:text-lg font-medium text-center md:text-left"
          >
            <p>
              I'm <span className="text-black font-bold underline underline-offset-4 md:underline-offset-8 decoration-cyan-500/30">Nabila "ELN"</span>, a Software Developer with hands-on experience building web applications from front-end to back-end. 
            </p>
            <p>
              My work focuses on writing clean, maintainable code and creating reliable, user-friendly systems. I have experience working with databases, APIs, and modern development tools, and I enjoy turning ideas into functional, well-structured applications. 
            </p>
            <p>
              I continuously improve my skills through real projects and practical problem-solving, always aiming for precision and performance in every line of code.
            </p>
          </motion.div>

          {/* RIGHT SIDE: CIRCULAR IMAGE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-full md:w-2/5 flex justify-center md:justify-end"
          >
            <div className="relative w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-cyan-100 shadow-xl">
              <img 
                src="/NabilaM.png" 
                alt="Nabila ELN" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105" 
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}