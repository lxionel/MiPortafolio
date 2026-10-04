import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { PageId } from "./types";

const getPageFromHash = (): PageId => {
  const hash = window.location.hash.toLowerCase().replace("#", "");
  if (hash === "proyectos") return "proyectos";
  if (hash === "sobre-mi" || hash === "perfil" || hash === "habilidades") return "sobre-mi";
  if (hash === "contacto") return "contacto";
  return "inicio";
};

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);

  // Sync with browser back/forward and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Dynamic document title update per page
  useEffect(() => {
    const titles: Record<PageId, string> = {
      inicio: "Lionel Aguirre | Sistemas e Informática (UTP)",
      proyectos: "Proyectos | Lionel Aguirre",
      "sobre-mi": "Sobre Mí | Lionel Aguirre",
      contacto: "Contacto | Lionel Aguirre",
    };
    document.title = titles[currentPage] || "Lionel Aguirre | Sistemas e Informática (UTP)";
  }, [currentPage]);

  const navigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === "inicio" ? "inicio" : page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0F172A] flex flex-col selection:bg-[#0284C7] selection:text-white font-sans">
      <Navbar currentPage={currentPage} onNavigate={navigate} />

      <main key={currentPage} className="flex-grow min-h-[calc(100vh-240px)] page-enter">
        {currentPage === "inicio" && <HomePage onNavigate={navigate} />}
        {currentPage === "proyectos" && <ProjectsPage onNavigate={navigate} />}
        {currentPage === "sobre-mi" && <AboutPage onNavigate={navigate} />}
        {currentPage === "contacto" && <ContactPage onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;