import React from "react";

import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import { useLanguage } from "../i18n/LanguageContext";
import "../styles/Intro.css";
import FadeInSection from "./FadeInSection";
import ParticlePortrait from "./ParticlePortrait";

const Intro = () => {
  const { t, lang } = useLanguage();

  return (
    <div id="intro">
      <div className="intro-simulation">
        <ParticlePortrait />
      </div>
      <div className="intro-block">
        <Typist key={lang} avgTypingDelay={120}>
          <span className="intro-title">
            {t("intro.greeting")}
            <span className="intro-name">{t("intro.name")}</span>
            {t("intro.suffix")}
          </span>
        </Typist>
        <FadeInSection>
          <div className="intro-desc">{t("intro.desc")}</div>
          <a href="mailto:leavemehere00dat@gmail.com" className="intro-contact">
            <EmailRoundedIcon></EmailRoundedIcon>
            {t("intro.contact")}
          </a>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Intro;
