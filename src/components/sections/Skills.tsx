"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

const allSkills = [
  { name: "Python", icon: "devicon-python-plain" },
  { name: "SQL", icon: "devicon-azuresqldatabase-plain" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
  { name: "MongoDB", icon: "devicon-mongodb-plain" },
  { name: "MySQL", icon: "devicon-mysql-plain" },
  { name: "FastAPI", icon: "devicon-fastapi-plain" },
  { name: "Node.js", icon: "devicon-nodejs-plain" },
  { name: "React", icon: "devicon-react-original" },
  { name: "Tailwind", icon: "devicon-tailwindcss-plain" },
  { name: "JavaScript", icon: "devicon-javascript-plain" },
  { name: "Figma", icon: "devicon-figma-plain" },
  { name: "Git", icon: "devicon-git-plain" },
  { name: "Docker", icon: "devicon-docker-plain" },
  { name: "Linux", icon: "devicon-linux-plain" },
  { name: "Playwright", icon: "devicon-playwright-plain" },
  { name: "Postman", icon: "devicon-postman-plain" },
];

export default function Skills() {
  const [mounted, setMounted] = useState(false);
  const duplicatedSkills = [...allSkills, ...allSkills];

  useEffect(() => { setMounted(true); }, []);

  return (
    <section 
      id="skills" 
      className="relative w-full py-20 md:py-32 bg-white rounded-t-[80px] md:rounded-t-[150px] rounded-b-[80px] md:rounded-b-[150px] mt-[-100px] z-30 shadow-2xl"
    >
      <div className="container relative z-20 mx-auto px-6 mb-12 md:mb-24 text-center">
        <span className="block text-cyan-600 text-[10px] md:text-[12px] uppercase font-bold mb-4 tracking-[0.8em]">Expertise</span>
        <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter bg-gradient-to-b from-black via-black/80 to-cyan-600 bg-clip-text text-transparent">
          Technical Stack
        </h2>
      </div>

      {/* MOBILE VIEW: COMPACT ALL-IN-ONE GRID */}
      <div className="md:hidden grid grid-cols-4 gap-y-8 gap-x-2 px-4 relative z-20">
        {allSkills.map((skill, idx) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            key={idx} 
            className="flex flex-col items-center justify-center text-center"
          >
            <i className={`${skill.icon} text-3xl text-black mb-2`}></i>
            <span className="text-[8px] font-bold uppercase tracking-tighter text-gray-500 truncate w-full px-1">
              {skill.name}
            </span>
          </motion.div>
        ))}
        
        {/* Languages simplified for the grid footer */}
        <div className="col-span-4 mt-8 pt-6 border-t border-gray-100 text-center">
           <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1">Fluency</p>
           <p className="text-[10px] font-black text-black uppercase">EN • FR • AR</p>
        </div>
      </div>

      {/* DESKTOP VIEW: HORIZONTAL TRAIN */}
      <div className="hidden md:flex relative overflow-hidden group z-20">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex gap-24 whitespace-nowrap px-8"
        >
          {duplicatedSkills.map((skill, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center min-w-[150px] group/item">
              <i className={`${skill.icon} text-7xl text-black transition-all duration-500 group-hover/item:text-cyan-600 group-hover/item:scale-110`}></i>
              <p className="mt-4 text-[11px] uppercase tracking-[0.4em] font-mono text-gray-400 font-bold opacity-0 group-hover/item:opacity-100 transition-opacity">
                {skill.name}
              </p>
            </div>
          ))}
        </motion.div>
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  );
}