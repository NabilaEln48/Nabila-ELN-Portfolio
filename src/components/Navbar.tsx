"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const mainPages = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "BLOG", href: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <>
      {/* MOBILE TOGGLE BUTTON: Placed outside to stay on top of everything */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden fixed top-8 right-8 z-[300] w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
        aria-label="Toggle Menu"
      >
        <motion.div 
          animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} 
          className="w-6 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
        />
        <motion.div 
          animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} 
          className="w-6 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
        />
      </button>

      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full z-[100] p-6 flex justify-center pointer-events-none"
      >
        <div className={`
          flex items-center justify-between pointer-events-auto w-full max-w-7xl
          ${scrolled && !isOpen ? "md:w-auto md:ml-auto md:mr-0 bg-black/60 backdrop-blur-3xl border border-white/10 px-3 py-2 rounded-full shadow-2xl" : ""}
          transition-all duration-500
        `}>
          
          {/* LOGO: Left side (Hidden when menu is open) */}
          {!isOpen && (
            <Link href="/" className="block">
              <Image src="/logo.png" alt="Logo" width={42} height={42} className="rounded-full" />
            </Link>
          )}

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-1">
            {mainPages.map((link) => (
              <Link key={link.name} href={link.href} className="px-6 py-2 text-[11px] font-black uppercase tracking-[0.4em] text-white/70 hover:text-white transition-all">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* FULLSCREEN MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center p-10"
          >
            {/* The ONLY Logo shown when menu is open */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="mb-16"
            >
              <Image src="/logo.png" alt="Menu Logo" width={80} height={80} className="rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
            </motion.div>

            <div className="flex flex-col items-center gap-10">
              {mainPages.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-black uppercase tracking-tighter text-white hover:text-purple-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}