export const locales = [
  'en', 'sv', 'de', 'fr', 'it', 'es', 'nl', 'pl', 'pt', 'da', 'no', 'fi',
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  sv: 'Svenska',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
  nl: 'Nederlands',
  pl: 'Polski',
  pt: 'Português',
  da: 'Dansk',
  no: 'Norsk',
  fi: 'Suomi',
};

export const localeCountries: Record<Locale, string[]> = {
  en: ['GB', 'IE'],
  sv: ['SE'],
  de: ['DE', 'AT', 'CH'],
  fr: ['FR', 'BE', 'CH'],
  it: ['IT'],
  es: ['ES'],
  nl: ['NL', 'BE'],
  pl: ['PL'],
  pt: ['PT'],
  da: ['DK'],
  no: ['NO'],
  fi: ['FI'],
};
