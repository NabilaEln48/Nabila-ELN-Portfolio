"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
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

const StarBackground = ({ count = 80 }: { count?: number }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
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

// --- PROJECT DATA ---
const pythonWebSections = [
  {
    id: "01",
    title: "Python & Security",
    featured: {
      title: "ARIS Engine",
      category: "04 — AUTOMATION",
      desc: "Advanced Python engine built for specialized data processing and automated workflow management.",
      tags: ["Python", "Automation", "DataEngine"],
      image: "/aris.png",
      github: "https://github.com/NabilaEln48",
    },
    others: [
      { title: "Job Application Tracker", category: "Productivity", desc: "Automate job searching and track application statuses using MongoDB and Scrapy.", tags: ["Python", "WebScraping", "MongoDB"], image: "/jobapptracker.png", github: "https://github.com/NabilaEln48/job-tracker" },
      { title: "Secure Document API", category: "Cybersecurity API", desc: "Python-based API for encrypted document storage featuring JWT and RBAC.", tags: ["Python", "API", "Security", "JWT"], image: "/2.png", github: "https://github.com/NabilaEln48/Secure-Document-Management-API" },
      { title: "E-commerce Backend", category: "Backend API", desc: "Scalable backend API for electronics platform with inventory and payment integration.", tags: ["Python", "Django", "REST-API", "PostgreSQL"], image: "/7.png", github: "#" },
    ]
  },
  {
    id: "02",
    title: "Web Development",
    featured: {
      title: "Fragrance E-Shop",
      category: "02 — E-COMMERCE UI",
      desc: "A modern, responsive e-commerce website designed for a luxury fragrance brand.",
      tags: ["HTML", "CSS", "JS", "PHP", "AWS"],
      image: "/Arise.png",
      github: "https://github.com/NabilaEln48/Fragrance-Website",
    },
    others: [
      { title: "Modern Portfolio", category: "Frontend & 3D", desc: "Professional portfolio featuring smooth animations and a 3D robot built with Spline.", tags: ["HTML", "CSS", "JavaScript", "Spline"], image: "/5.png", external: "https://elnabilam.com/" },
      { title: "Creative Blog Page", category: "Content & UI", desc: "Minimalist blog integration featuring responsive galleries for personal creative works.", tags: ["Photography", "UI-Design", "Responsive"], image: "/4.png", external: "https://elnabilam.com/blog" },
      { title: "Restaurant System", category: "Full-Stack", desc: "Complete restaurant management platform with online ordering and admin dashboard.", tags: ["PHP", "MySQL", "JavaScript", "OrderSystem"], image: "/8.png", github: "#" },
    ]
  }
];

const gridOnlySections = [
  {
    id: "03",
    title: "Java Enterprise",
    projects: [
      { title: "Fleet Management", category: "Enterprise", desc: "Robust system for tracking vehicle schedules and maintenance using DAO/DTO architecture.", tags: ["Java", "Servlets", "Maven"], image: "/1.png", github: "https://github.com/NabilaEln48/Public-Transit-Fleet-Management-System" },
      { title: "BookRegistryApp", category: "Backend", desc: "Enterprise-level CRUD application implementing Singleton and Factory patterns.", tags: ["Java", "JSP", "JDBC"], image: "/bookregistryapp.webp", github: "https://github.com/NabilaEln48/BookRegistryApp" },
      { title: "Student System", category: "Jakarta EE", desc: "Jakarta EE application designed for high-concurrency academic environments.", tags: ["JakartaEE", "Hibernate"], image: "/6.png", github: "https://github.com/NabilaEln48/Enterprise-Student-Information-System" },
    ]
  },
  {
    id: "04",
    title: "Game Development",
    projects: [
      { title: "Pacman", category: "Logic & AI", desc: "Logic-heavy implementation of Pacman featuring pathfinding AI for ghosts using Pygame.", tags: ["Python", "AI", "Pygame"], image: "/pacman.png", github: "https://github.com/NabilaEln48/Pacman_Game" },
      { title: "Flappy Bird ", category: "Game Design", desc: "Recreated the classic with a custom Java engine and a Unity version.", tags: ["Unity", "C#", "OOP"], image: "/Bird.png", github: "https://github.com/NabilaEln48/FlappyBird_Java" },
      { title: "TicTacToe ", category: "Algorithms", desc: "Python implementation featuring an unbeatable Minimax algorithm.", tags: ["Algorithms", "Python"], image: "/tictactoe.png", github: "https://github.com/NabilaEln48/TicTacToe_Java" },
    ]
  }
];

// --- COMPONENTS ---
const ProjectCard = ({ project, idx }: { project: any, idx: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0c14]/80 backdrop-blur-sm border border-white/5 rounded-3xl p-6 hover:border-cyan-400/30 transition-all duration-300 flex flex-col group z-10">
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/5 bg-black">
      <Image src={project.image} alt={project.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
    </div>
    <span className="text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-widest mb-2">{project.category}</span>
    <h4 className="text-xl font-bold mb-3 uppercase tracking-tight">{project.title}</h4>
    <p className="text-white/40 text-sm mb-6 line-clamp-3 leading-relaxed">{project.desc}</p>
    <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
      <div className="flex flex-wrap gap-2">
        {project.tags.slice(0, 2).map((tag: string) => <span key={tag} className="text-[10px] font-mono text-cyan-400/40">#{tag}</span>)}
      </div>
      {project.github && <Link href={project.github} target="_blank" className="text-white/50 hover:text-cyan-400"><FaGithub size={18} /></Link>}
    </div>
  </motion.div>
);

export default function ProjectsPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  return (
    <main onMouseMove={(e) => { mouseX.set(e.clientX - 250); mouseY.set(e.clientY - 250); }} className="relative min-h-screen bg-[#020205] text-white pt-48 pb-0 px-6 overflow-x-hidden">
      <StarBackground count={80} />
      <motion.div style={{ x: springX, y: springY }} className="fixed w-[500px] h-[500px] rounded-full bg-cyan-400/5 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Python & Web Sections */}
        {pythonWebSections.map((section) => (
          <section key={section.id} className="mb-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1 h-8 bg-cyan-400" />
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">{section.id} — {section.title}</h2>
            </div>
            <div className="relative w-full bg-[#0a0c14]/60 backdrop-blur-md border border-white/5 rounded-[2.5rem] overflow-hidden mb-10 group shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
                  <span className="text-cyan-400 font-mono text-xs font-bold mb-4 tracking-widest uppercase">{section.featured.category}</span>
                  <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">{section.featured.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">{section.featured.desc}</p>
                  {section.featured.github && <Link href={section.featured.github} target="_blank" className="text-white hover:text-cyan-400 transition-colors"><FaGithub size={28} /></Link>}
                </div>
                <div className="relative aspect-video lg:aspect-auto h-full overflow-hidden order-1 lg:order-2">
                  <Image src={section.featured.image} alt={section.featured.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {section.others.map((project, idx) => <ProjectCard key={idx} project={project} idx={idx} />)}
            </div>
          </section>
        ))}

        {/* Java & Game Sections */}
        {gridOnlySections.map((section) => (
          <section key={section.id} className="mb-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1 h-8 bg-cyan-400" />
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">{section.id} — {section.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {section.projects.map((project, idx) => <ProjectCard key={idx} project={project} idx={idx} />)}
            </div>
          </section>
        ))}

        {/* --- CONTACT & FOOTER SECTION --- */}
        <footer className="mt-60 pb-20 border-t border-white/5 pt-24"> 
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">
            <p>© 2026 NABILA M. ELN — ALL RIGHTS RESERVED</p>
            <div className="flex gap-10">
              <Link href="/" className="hover:text-cyan-400">BACK TO HOME</Link>
              <p>BUILT WITH NEXT.JS & FRAMER MOTION</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}