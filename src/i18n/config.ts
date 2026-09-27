export const locales = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt-BR', label: 'Português (Brasil)' },
] as const;

export type Locale = (typeof locales)[number]['code'];

export const defaultLocale: Locale = 'en';
