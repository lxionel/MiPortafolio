import React from "react";
import { Hero } from "../components/Hero";
import { PageId } from "../types";

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      <Hero onNavigate={onNavigate} />
    </div>
  );
};
