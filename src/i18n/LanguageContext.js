import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import { translations } from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const browserLang = navigator.language?.startsWith("pt") ? "pt" : "en";
  const [lang, setLang] = useState(browserLang);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en-US";
  }, [lang]);

  const t = useCallback(
    (key) => {
      const keys = key.split(".");
      let value = translations[lang];
      for (const k of keys) {
        value = value?.[k];
      }
      return value ?? key;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
