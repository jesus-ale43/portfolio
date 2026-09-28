'use server';

import { cookies, headers } from 'next/headers';

import { defaultLocale, type Locale, locales } from '@/i18n/config';

const COOKIE_NAME = 'LOCALE';

function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale.code === value);
}

const countryLocaleMap: Record<string, Locale> = {
  US: 'en',
  GB: 'en',
  CA: 'en',
  AU: 'en',
  IE: 'en',
  NZ: 'en',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  VE: 'es',
  EC: 'es',
  UY: 'es',
  PY: 'es',
  BO: 'es',
  BR: 'pt-BR',
  PT: 'pt-BR',
};

function localeFromCountry(value: string | null): Locale | undefined {
  if (!value) return undefined;
  return countryLocaleMap[value.toUpperCase()];
}

function localeFromAcceptLanguage(value: string | null): Locale | undefined {
  if (!value) return undefined;

  const languages = value
    .split(',')
    .map((entry) => {
      const [rawLang, rawQ] = entry.trim().split(';q=');
      return {
        lang: rawLang?.trim().toLowerCase(),
        q: rawQ ? parseFloat(rawQ) : 1,
      };
    })
    .filter((entry) => entry.lang)
    .sort((a, b) => b.q - a.q);

  for (const { lang } of languages) {
    if (lang === 'pt-br') return 'pt-BR';
    if (lang?.startsWith('pt')) return 'pt-BR';
    if (lang?.startsWith('es')) return 'es';
    if (lang?.startsWith('en')) return 'en';
  }

  return undefined;
}

export async function getUserLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get(COOKIE_NAME)?.value;

  if (isLocale(cookieLocale)) return cookieLocale;

  const requestHeaders = await headers();
  const country =
    requestHeaders.get('x-country-code') ??
    requestHeaders.get('x-vercel-ip-country');

  return (
    localeFromCountry(country) ??
    localeFromAcceptLanguage(requestHeaders.get('accept-language')) ??
    defaultLocale
  );
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
}
