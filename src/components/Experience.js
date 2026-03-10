import React from "react";
import JobList from "./JobList";
import "../styles/Experience.css";
import FadeInSection from "./FadeInSection";
import { useLanguage } from "../i18n/LanguageContext";

const Experience = () => {
  const { t } = useLanguage();

  return (
    <div id="experience">
      <FadeInSection>
        <div className="section-header ">
          <span className="section-title">{t("experience.title")}</span>
        </div>
        <JobList></JobList>
      </FadeInSection>
    </div>
  );
};

export default Experience;
