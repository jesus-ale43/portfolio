'use client';

import { useEffect, useState } from 'react';

import { defaultLocale, type Locale, locales } from '@/i18n/config';
import { getUserLocale, setUserLocale } from '@/services/locale';

export default function LocaleSwitcher() {
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    getUserLocale().then(setCurrentLocale);
  }, []);

  async function handleLocaleChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const locale = event.target.value as Locale;

    if (locale === currentLocale || isTransitioning) return;

    setIsTransitioning(true);

    try {
      await setUserLocale(locale);
      setCurrentLocale(locale);
    } finally {
      setIsTransitioning(false);
    }
  }

  return (
    <select
      value={currentLocale}
      onChange={handleLocaleChange}
      disabled={isTransitioning}
      aria-label="Change language"
    >
      {locales.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.label}
        </option>
      ))}
    </select>
  );
}
