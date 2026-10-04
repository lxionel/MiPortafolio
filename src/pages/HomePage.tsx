import React, { useState } from "react";
import { Hero } from "../components/Hero";
import { WhatIDo } from "../components/WhatIDo";
import { HumanSkills } from "../components/HumanSkills";
import { HomeProjectsPreview } from "../components/HomeProjectsPreview";
import { HomeCallToAction } from "../components/HomeCallToAction";
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
      <WhatIDo onNavigate={onNavigate} />
      <HumanSkills />
      <HomeProjectsPreview onNavigate={onNavigate} />
      <HomeCallToAction onNavigate={onNavigate} />
      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </div>
  );
};
