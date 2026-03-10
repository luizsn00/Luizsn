import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

const About = () => {
  const { t } = useLanguage();

  const tech_stack = ["Typescript", "React.js", "React Native", "Swift", "Java", "Javascript ES6+"];

  const bio = (
    <p>
      {t("about.bioPrefix")}
      <b>{t("about.bioRole")}</b>
      {t("about.bioAt")}
      <a
        href="https://superlogica.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("about.bioSuperlogica")}
      </a>
      {t("about.bioSuperlogicaSuffix")}
      <a
        href="https://play.google.com/store/apps/details?id=app.gruvi&hl=pt_BR"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("about.bioGruvi")}
      </a>
      {" ("}
      <a
        href="https://play.google.com/store/apps/details?id=app.gruvi&hl=pt_BR"
        target="_blank"
        rel="noopener noreferrer"
      >
        Play Store
      </a>
      {", "}
      <a
        href="https://apps.apple.com/br/app/gruvi/id1561610983"
        target="_blank"
        rel="noopener noreferrer"
      >
        App Store
      </a>
      {")"}
      {t("about.bioGruviSuffix")}
      {t("about.bioAnd")}
      {t("about.bioMasters")}
      {t("about.bioIn")}
    </p>
  );

  const hobbies = <p>{t("about.hobbies")}</p>;

  return (
    <div id="about">
      <FadeInSection>
        <div className="section-header ">
          <span className="section-title">{t("about.title")}</span>
        </div>
        <div className="about-content">
          <div className="about-description">
            {bio}
            {t("about.techIntro")}
            <ul className="tech-stack">
              {tech_stack.map(function (tech_item, i) {
                return (
                  <FadeInSection delay={`${i + 1}00ms`} key={i}>
                    <li>{tech_item}</li>
                  </FadeInSection>
                );
              })}
            </ul>
            {hobbies}
          </div>
          <div className="about-image">
            <img alt={t("about.imgAlt")} src={"/assets/me.jpeg"} />
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default About;
