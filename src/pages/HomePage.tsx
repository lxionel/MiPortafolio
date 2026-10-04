import React, { useState } from "react";
import { Hero } from "../components/Hero";
import { EngineeringKpis } from "../components/EngineeringKpis";
import { ArchitectureTerminal } from "../components/ArchitectureTerminal";
import { CvModal } from "../components/CvModal";
import { PageId } from "../types";

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [cvOpen, setCvOpen] = useState<boolean>(false);

  return (
    <div className="w-full">
      <Hero onNavigate={onNavigate} onOpenCv={() => setCvOpen(true)} />
      <EngineeringKpis />
      <ArchitectureTerminal onNavigate={onNavigate} />
      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </div>
  );
};
