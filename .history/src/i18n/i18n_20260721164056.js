import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import az from './locales/az.json';
import en from './locales/en.json';
import ru from './locales/ru.json';

const resources = {
  az: {
    translation: az
  },
  en: {
    translation: en
  },
  ru: {
    translation: ru
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'az', // default language
    fallbackLng: 'az',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
