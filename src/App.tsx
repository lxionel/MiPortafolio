import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WorkstationSection } from "./components/WorkstationSection";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col selection:bg-white/20 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <WorkstationSection />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;