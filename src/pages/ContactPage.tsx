import React from "react";
import { Contact } from "../components/Contact";
import { PageId } from "../types";

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full pt-16 md:pt-20">
      <Contact onNavigate={onNavigate} />
    </div>
  );
};
