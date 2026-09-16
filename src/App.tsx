import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WorkstationSection } from "./components/WorkstationSection";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/25 selection:text-cyan-200">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <WorkstationSection />
        <Projects />
        <About />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;