import React from "react";
import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";
import { useLanguage } from "../i18n/LanguageContext";

const Credits = () => {
  const { t } = useLanguage();

  return (
    <FadeInSection>
      <div id="credits">
        <div className="ending-credits">
          <div>{t("credits.built")}</div>
          <div>{t("credits.rights")}</div>
        </div>
      </div>
    </FadeInSection>
  );
};

export default Credits;
