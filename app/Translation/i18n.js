// import '@formatjs/intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en/translation.json';
import arTranslations from './locales/ar/translation.json';



i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      ar: {
        translation: arTranslations
      }
    },
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    pluralSeparator: '_', 
  });

export default i18n;