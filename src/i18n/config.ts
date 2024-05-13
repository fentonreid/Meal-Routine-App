import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

i18n.use(initReactI18next).init({
  lng: "en",
  compatibilityJSON: "v3",
  fallbackLng: "en",
  debug: true,
  resources: {
    ...en,
    ...fr,
  },
});

export default i18n;
