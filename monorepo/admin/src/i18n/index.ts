import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

export const supportedLocales = [
  'en', 'de', 'fr', 'it', 'es', 'nl', 'pl', 'sv', 'pt', 'da', 'no', 'fi',
] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const localeNames: Record<SupportedLocale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
  nl: 'Nederlands',
  pl: 'Polski',
  sv: 'Svenska',
  pt: 'Português',
  da: 'Dansk',
  no: 'Norsk',
  fi: 'Suomi',
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: supportedLocales as unknown as string[],
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'docs', 'dashboard', 'pets', 'users', 'blog', 'verification', 'mating', 'health', 'feedback', 'notifications', 'settings', 'admin_users', 'categories', 'analytics'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'petfolioo_admin_locale',
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
