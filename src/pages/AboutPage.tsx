import React from "react";
import { About } from "../components/About";
import { PageId } from "../types";

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full pt-16 md:pt-20">
      <About onNavigate={onNavigate} />
    </div>
  );
};
