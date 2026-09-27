'use server';

import { cookies, headers } from 'next/headers';

import { defaultLocale, type Locale, locales } from '@/i18n/config';

const COOKIE_NAME = 'LOCALE';

function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale.code === value);
}

function localeFromAcceptLanguage(value: string | null): Locale | undefined {
  const languages = value
    ?.split(',')
    .map((entry) => entry.split(';')[0]?.trim().toLowerCase())
    .filter(Boolean);

  if (languages?.some((language) => language === 'pt-br')) return 'pt-BR';
  if (languages?.some((language) => language?.startsWith('pt'))) return 'pt-BR';
  if (languages?.some((language) => language?.startsWith('es'))) return 'es';
  if (languages?.some((language) => language?.startsWith('en'))) return 'en';
}

export async function getUserLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get(COOKIE_NAME)?.value;

  if (isLocale(cookieLocale)) return cookieLocale;

  const requestHeaders = await headers();
  const country =
    requestHeaders.get('x-country-code') ??
    requestHeaders.get('x-vercel-ip-country');

  if (country?.toUpperCase() === 'BR') return 'pt-BR';

  return (
    localeFromAcceptLanguage(requestHeaders.get('accept-language')) ??
    defaultLocale
  );
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
