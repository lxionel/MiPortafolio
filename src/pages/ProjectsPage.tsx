import React from "react";
import { Projects } from "../components/Projects";
import { PageId } from "../types";

interface ProjectsPageProps {
  onNavigate: (page: PageId) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full pt-16 md:pt-20">
      <Projects onNavigate={onNavigate} />
    </div>
  );
};
