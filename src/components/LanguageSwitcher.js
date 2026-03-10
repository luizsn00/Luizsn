import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${lang === "pt" ? "active" : ""}`}
        onClick={() => setLang("pt")}
        title="Portugues (BR)"
      >
        <span role="img" aria-label="Portugues">&#x1F1E7;&#x1F1F7;</span>
      </button>
      <button
        className={`lang-btn ${lang === "en" ? "active" : ""}`}
        onClick={() => setLang("en")}
        title="English (US)"
      >
        <span role="img" aria-label="English">&#x1F1FA;&#x1F1F8;</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
