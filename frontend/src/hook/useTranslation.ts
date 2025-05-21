import React from "react";
import tinyI18n from "tiny-i18n";
const { setDictionary, setLanguage, i18n } = tinyI18n;

import en from "../locales/en.json";
import uk from "../locales/uk.json";

setDictionary(en, "en");

setDictionary(uk, "uk");

setLanguage("en");

const useTranslation = () => {
  const [language_code, setLang] = React.useState("en");

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setLang(lang);
  };

  return {
    t: (key: string) => i18n(key),
    language_code,
    changeLanguage,
  };
};

export default useTranslation;
