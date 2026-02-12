"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaChevronDown, FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// --- STAR BACKGROUND ---
const Star = ({ top, left, size, delay }: { top: string; left: string; size: number; delay: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay }}
    style={{ top, left, width: size, height: size }}
    className="absolute bg-white rounded-full shadow-[0_0_5px_white] z-0"
  />
);

const StarBackground = ({ count = 60 }: { count?: number }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} top={`${Math.random() * 100}%`} left={`${Math.random() * 100}%`} size={Math.random() * 2 + 1} delay={Math.random() * 5} />
      ))}
    </div>
  );
};

export default function BlogPage() {
  // Your original image list
  const drawings = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const marqueeItems = [...drawings, ...drawings]; // Doubled for infinite scroll

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden pt-20">
      <StarBackground />
      
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6"
          >
            ELN'S <span className="text-teal-400">BLOG</span>
          </motion.h1>
          <motion.p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light tracking-wide">
            My creative world of visuals, codes, and habits.
          </motion.p>
          <div className="mt-10 h-1 w-24 bg-teal-400 rounded-full animate-pulse"></div>
          <motion.a 
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12 text-teal-400 text-3xl cursor-pointer"
          >
            <FaChevronDown />
          </motion.a>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12"
          >
            <div className="w-full md:w-1/3 aspect-square relative overflow-hidden rounded-2xl border border-white/10 group">
              <Image 
                src="/img_blog/22.png" 
                alt="Nabila" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-4xl font-bold mb-6 uppercase tracking-tight">The <span className="text-teal-400">Creator</span></h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Hey, I’m <strong className="text-teal-400">Nabila “ELN”</strong>. This little corner of the internet is where I collect my favorite things: drawings and photos. 
                <br /><br />
                Most days you’ll find me experimenting with colors, snapping photos, or getting lost in a sketch. Other days, I’m chasing waves, learning tricks on a skateboard, or starting a new hobby just to see where it takes me.
              </p>
            </div>
          </motion.div>
        </section>

        {/* MARQUEE GALLERY SECTION */}
        <section id="gallery" className="py-20">
          <div className="max-w-6xl mx-auto px-6 mb-12">
            <h2 className="text-3xl font-bold text-white border-l-4 border-teal-400 pl-4 uppercase tracking-widest">Photography</h2>
            <p className="text-slate-500 font-mono text-sm mt-2">// What I capture in frames</p>
          </div>
          
          <div className="relative flex overflow-hidden py-10">
            <motion.div 
              className="flex gap-6 whitespace-nowrap"
              animate={{ x: [0, -2500] }} 
              transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
            >
              {marqueeItems.map((num, idx) => (
                <div key={idx} className="relative w-72 h-96 flex-shrink-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden p-2 group transition-transform hover:scale-105">
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <Image 
                      src={`/img_blog/${num}.jpg`} 
                      alt={`Artwork ${num}`} 
                      fill 
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-40 pb-20 border-t border-white/5 pt-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">
            <p>© 2026 NABILA M. ELN — ALL RIGHTS RESERVED</p>
            <div className="flex gap-10">
              <Link href="/" className="hover:text-teal-400">BACK TO HOME</Link>
              <p>CREATIVE BLOG MODULE</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}