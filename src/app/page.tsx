import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar"; 
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import QuickView from "@/components/sections/QuickView";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative bg-black">
      {/* 1. Global UI */}
      <Navbar />
      <Intro /> 

      {/* 2. Hero (Normal Flow) */}
      <Hero /> 
      
      {/* 3. The Stacking Deck Wrapper */}
      <div className="relative">
        
        {/* Card 1: Skills */}
        <section className="sticky top-0 min-h-screen w-full h-fit mb-[15vh] z-10">
          <Skills />
        </section>
        
        {/* Card 2: QuickView (Space/Dark) */}
        <section className="sticky top-0 min-h-screen w-full h-fit mb-[15vh] z-20">
          <QuickView /> 
        </section>

        {/* Card 3: About (White) */}
        <section className="sticky top-0 min-h-screen w-full h-fit mb-[15vh] z-30">
          <About /> 
        </section>

        {/* Card 4: Projects (Space/Dark) */}
        <section className="sticky top-0 min-h-screen w-full h-fit z-40">
          <Projects /> 
        </section>

      </div>
      
      {/* 4. Contact (End of Stack) */}
      <div className="relative z-50 bg-black">
        <Contact /> 
      </div>
    </main>
  );
}